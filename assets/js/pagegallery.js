/* global L, lozad */
(function () {
  window.GalleryPage = window.GalleryPage || {};
  const GalleryPage = window.GalleryPage;

  const state = GalleryPage._state || {
    map: null,
    markerClusterGroup: null,
    currentYear: 'All',
    isMapVisible: true,
    galleryData: []
  };
  GalleryPage._state = state;

  const leafletCss = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
  const leafletCssIntegrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
  const leafletJs = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
  const leafletJsIntegrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
  const markerClusterCss = 'https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css';
  const markerClusterDefaultCss = 'https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css';
  const markerClusterJs = 'https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js';
  const lozadJs = '/assets/js/lozad.js';

  let leafletPromise = null;
  let lozadPromise = null;

  function loadStyleOnce(href, options) {
    return new Promise(function (resolve) {
      if (!href) {
        resolve();
        return;
      }

      const existing = document.querySelector('link[href="' + href + '"]');
      if (existing && document.head.contains(existing)) {
        resolve();
        return;
      }

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      if (options && options.integrity) {
        link.integrity = options.integrity;
      }
      if (options && options.crossOrigin) {
        link.crossOrigin = options.crossOrigin;
      }
      link.onload = resolve;
      link.onerror = resolve;
      document.head.appendChild(link);
    });
  }

  function loadScriptOnce(src, options) {
    return new Promise(function (resolve) {
      if (!src) {
        resolve();
        return;
      }

      const isReady = options && options.isReady;
      if (isReady && isReady()) {
        resolve();
        return;
      }

      const existing = document.querySelector('script[src="' + src + '"]');
      if (existing && document.head.contains(existing)) {
        if (isReady && isReady()) {
          resolve();
          return;
        }
        existing.addEventListener('load', function () { resolve(); }, { once: true });
        existing.addEventListener('error', function () { resolve(); }, { once: true });
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      if (options && options.integrity) {
        script.integrity = options.integrity;
      }
      if (options && options.crossOrigin) {
        script.crossOrigin = options.crossOrigin;
      }
      script.onload = function () {
        resolve();
      };
      script.onerror = function () { resolve(); };
      document.head.appendChild(script);
    });
  }

  function ensureLeafletAssets() {
    if (window.L && window.L.markerClusterGroup) {
      return Promise.resolve();
    }

    if (!leafletPromise) {
      leafletPromise = Promise.all([
        loadStyleOnce(leafletCss, { integrity: leafletCssIntegrity, crossOrigin: 'anonymous' }),
        loadStyleOnce(markerClusterCss),
        loadStyleOnce(markerClusterDefaultCss)
      ]).then(function () {
        if (!window.L) {
          return loadScriptOnce(leafletJs, {
            integrity: leafletJsIntegrity,
            crossOrigin: 'anonymous',
            isReady: function () { return typeof window.L !== 'undefined'; }
          });
        }
      }).then(function () {
        if (window.L && window.L.markerClusterGroup) {
          return;
        }
        return loadScriptOnce(markerClusterJs, {
          isReady: function () { return window.L && window.L.markerClusterGroup; }
        });
      }).then(function () { return; })
        .catch(function () { return; });
    }

    return leafletPromise;
  }

  function ensureLozad() {
    if (window.lozad) {
      return Promise.resolve();
    }

    if (!lozadPromise) {
      lozadPromise = loadScriptOnce(lozadJs, {
        isReady: function () { return typeof window.lozad !== 'undefined'; }
      });
    }

    return lozadPromise;
  }

  function readGalleryData() {
    const dataEl = document.getElementById('gallery-data');
    if (!dataEl) {
      return [];
    }

    const raw = dataEl.textContent || '';
    if (!raw.trim()) {
      return [];
    }

    try {
      return JSON.parse(raw);
    } catch (err) {
      return [];
    }
  }

  function getTabContainer() {
    return document.querySelector('.tab-container[data-gallery-page="true"]');
  }

  function initLozad() {
    if (typeof lozad === 'undefined') {
      return;
    }

    const observer = lozad('.lozad', {
      rootMargin: '200px',
      loaded: function (el) {
        el.style.opacity = 1;
      }
    });
    observer.observe();
  }

  GalleryPage.initMap = function () {
    if (state.map) {
      return;
    }

    const mapContainer = document.getElementById('map-container');
    if (!mapContainer) {
      return;
    }

    if (!window.L || !window.L.markerClusterGroup) {
      ensureLeafletAssets().then(function () {
        if (window.L && window.L.markerClusterGroup) {
          GalleryPage.initMap();
        }
      });
      return;
    }

    state.map = L.map('map-container').setView([20, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(state.map);

    state.markerClusterGroup = L.markerClusterGroup({
      maxClusterRadius: 50,
      iconCreateFunction: function (cluster) {
        const count = cluster.getChildCount();
        let size = 30;
        if (count > 10) {
          size = 40;
        }
        if (count > 50) {
          size = 50;
        }

        return L.divIcon({
          html: count,
          className: 'custom-marker-icon',
          iconSize: L.point(size, size),
          iconAnchor: [size / 2, size / 2]
        });
      }
    });

    GalleryPage.updateMapMarkers(state.currentYear);
    state.map.addLayer(state.markerClusterGroup);
  };

  GalleryPage.updateMapMarkers = function (yearOrList) {
    if (!state.markerClusterGroup) {
      return;
    }

    if (!state.galleryData || state.galleryData.length === 0) {
      state.galleryData = readGalleryData();
    }

    if (!state.galleryData || state.galleryData.length === 0) {
      return;
    }

    state.markerClusterGroup.clearLayers();

    const targetYears = yearOrList === 'All' ? ['All'] : yearOrList.split(',');

    state.galleryData.forEach(function (gallery) {
      const gYear = String(gallery.year);
      if (targetYears[0] === 'All' || targetYears.includes(gYear)) {
        if (gallery.items) {
          gallery.items.forEach(function (item) {
            if (item.lat && item.lng) {
              const customIcon = L.divIcon({
                html: '1',
                className: 'custom-marker-icon',
                iconSize: L.point(30, 30),
                iconAnchor: [15, 15]
              });
              const marker = L.marker([item.lat, item.lng], { icon: customIcon });
              const popupContent =
                '<div style="text-align:center;">' +
                '<a href="' + item.url + '" style="text-decoration:none; color:inherit;">' +
                '<img src="' + item.image + '" style="max-width:150px; border-radius:4px; display:block; margin-bottom:5px;" />' +
                '<strong>' + item.title + '</strong>' +
                '</a>' +
                '</div>';
              marker.bindPopup(popupContent);
              state.markerClusterGroup.addLayer(marker);
            }
          });
        }
      }
    });
  };

  GalleryPage.toggleMap = function (evt) {
    const mapDiv = document.getElementById('Map');
    const btn = document.getElementById('map-toggle-btn');

    if (!mapDiv) {
      return;
    }

    state.isMapVisible = !state.isMapVisible;

    if (state.isMapVisible) {
      mapDiv.style.display = 'block';
      if (btn) {
        btn.classList.add('active-map');
        btn.classList.add('active');
      }

      if (!state.map) {
        GalleryPage.initMap();
      } else {
        GalleryPage.updateMapMarkers(state.currentYear);
      }

      setTimeout(function () {
        if (state.map) {
          state.map.invalidateSize();
        }
      }, 100);
    } else {
      mapDiv.style.display = 'none';
      if (btn) {
        btn.classList.remove('active-map');
        btn.classList.remove('active');
      }
    }
  };

  GalleryPage.filterGalleries = function () {
    const searchInput = document.getElementById('searchInput');
    const searchInputZh = document.getElementById('searchInputZh');
    const galleryContent = document.getElementById('gallery-content');
    const searchResults = document.getElementById('search-results');

    if (!galleryContent || !searchResults) {
      return;
    }

    let filter = '';
    if (searchInput && getComputedStyle(searchInput).display !== 'none') {
      filter = searchInput.value.toLowerCase();
    } else if (searchInputZh && getComputedStyle(searchInputZh).display !== 'none') {
      filter = searchInputZh.value.toLowerCase();
    }

    if (filter.length > 0) {
      galleryContent.style.display = 'none';
      searchResults.innerHTML = '';

      const allCards = galleryContent.querySelectorAll('.card');
      let matchesFound = false;

      allCards.forEach(function (card) {
        const title = card.querySelector('.card-text');
        if (title) {
          const txtValue = title.textContent || title.innerText;
          if (txtValue.toLowerCase().indexOf(filter) > -1) {
            searchResults.appendChild(card.cloneNode(true));
            matchesFound = true;
          }
        }
      });

      if (!matchesFound) {
        searchResults.innerHTML = '<p style="text-align: center; width: 100%;">No locations found.</p>';
      }
      searchResults.style.display = 'grid';
    } else {
      galleryContent.style.display = 'block';
      searchResults.style.display = 'none';
      searchResults.innerHTML = '';
    }
  };

  GalleryPage.openYear = function (evt, yearName) {
    GalleryPage.openGroup(evt, yearName);
  };

  GalleryPage.openGroup = function (evt, yearListStr) {
    state.currentYear = yearListStr;

    const tabContainer = getTabContainer();
    if (!tabContainer) {
      return;
    }

    const tabcontent = tabContainer.getElementsByClassName('tab-content');
    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].classList.remove('is-visible');
      tabcontent[i].style.display = 'none';
    }

    const tablinks = tabContainer.getElementsByClassName('tab-btn');
    for (let i = 0; i < tablinks.length; i++) {
      if (!tablinks[i].classList.contains('active-map') && tablinks[i].id !== 'map-toggle-btn') {
        tablinks[i].classList.remove('active');
      }
    }

    if (evt && evt.target) {
      evt.target.classList.add('active');

      const parentDropdown = evt.target.closest('.dropdown');
      if (parentDropdown) {
        const dropbtn = parentDropdown.querySelector('.dropbtn');
        if (dropbtn) {
          dropbtn.classList.add('active');
        }
      }
    }

    const searchInput = document.getElementById('searchInput');
    const searchInputZh = document.getElementById('searchInputZh');

    if (state.isMapVisible) {
      if (!state.map) {
        GalleryPage.initMap();
      } else {
        GalleryPage.updateMapMarkers(yearListStr);
      }
    }

    if (yearListStr === 'All') {
      for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.add('is-visible');
        tabcontent[i].style.display = 'block';
      }
    } else {
      const targets = yearListStr.split(',');
      targets.forEach(function (y) {
        const targetElement = document.getElementById(y);
        if (targetElement) {
          targetElement.classList.add('is-visible');
          targetElement.style.display = 'block';
        }
      });
    }

    if (searchInput) searchInput.value = '';
    if (searchInputZh) searchInputZh.value = '';
    GalleryPage.filterGalleries();
  };

  function initGalleryPage() {
    const root = getTabContainer();
    if (!root || root.dataset.galleryInitialized) {
      return;
    }
    root.dataset.galleryInitialized = 'true';

    state.map = null;
    state.markerClusterGroup = null;
    state.currentYear = 'All';
    state.isMapVisible = true;
    state.galleryData = readGalleryData();

    const mapDiv = document.getElementById('Map');
    if (mapDiv) {
      mapDiv.style.display = 'block';
    }

    const mapBtn = document.getElementById('map-toggle-btn');
    if (mapBtn && state.isMapVisible) {
      mapBtn.classList.add('active-map');
      mapBtn.classList.add('active');
    }

    GalleryPage.initMap();

    const activeBtn = document.querySelector('.tab-btn.active');
    if (!activeBtn) {
      const allBtn = document.querySelector('.tab-btn[data-year="All"]');
      if (allBtn) {
        GalleryPage.openYear({ target: allBtn }, 'All');
      }
    }

    ensureLozad().then(function () {
      initLozad();
    });
  }

  const deferredInit = function () {
    requestAnimationFrame(initGalleryPage);
  };

  function bindInitEvents() {
    if (GalleryPage._eventsBound) {
      return;
    }
    GalleryPage._eventsBound = true;

    document.addEventListener('DOMContentLoaded', deferredInit, { once: true });
    window.addEventListener('hy:pjax:end', deferredInit);
    document.addEventListener('hy-push-state-load', deferredInit);
    document.addEventListener('hy-push-state-ready', deferredInit);
    document.addEventListener('hy-push-state-after', deferredInit);

    const pushStateEl = document.getElementById('_pushState');
    if (pushStateEl) {
      pushStateEl.addEventListener('hy-push-state-load', deferredInit);
      pushStateEl.addEventListener('hy-push-state-ready', deferredInit);
      pushStateEl.addEventListener('hy-push-state-after', deferredInit);
    }

    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      deferredInit();
    }
  }

  bindInitEvents();
})();
