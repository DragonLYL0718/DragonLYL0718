(function () {
    'use strict';

    var pageState = {
        resourcesLoaded: false,
        domReady: false,
        contentInitialized: false,
        masonry: {
            image: null,
            film: null
        },
        observers: {
            intersection: null
        }
    };

    // --- resource loading ---
    function loadMissingResources(callback) {
        let loadedCount = 0;
        const resources = [
            { check: () => typeof Masonry !== 'undefined', src: '/assets/js/masonry.pkgd.min.js' },
            { check: () => typeof imagesLoaded !== 'undefined', src: '/assets/js/imagesloaded.pkgd.min.js' },
            { check: () => typeof lozad !== 'undefined', src: '/assets/js/lozad.js' },
            { check: () => typeof lightbox !== 'undefined', src: '/assets/js/lightbox-plus-jquery.js' }
        ];

        function checkAllLoaded() {
            loadedCount++;
            if (loadedCount >= resources.length && callback) {
                pageState.resourcesLoaded = true;
                callback();
            }
        }

        resources.forEach(function (res) {
            if (!res.check()) {
                var script = document.createElement('script');
                script.src = res.src;
                script.onload = checkAllLoaded;
                script.onerror = checkAllLoaded; // Proceed even if one fails
                document.head.appendChild(script);
            } else {
                checkAllLoaded();
            }
        });
    }

    // --- Core Initialization ---
    function initPage() {
        document.body.classList.add('initialized');

        loadMissingResources(function () {
            var initialContent = handleInitialContent();
            setupButtonHandlers();
            updateNavigationButtons(
                initialContent.hasImage,
                initialContent.hasVideo,
                initialContent.hasFilm
            );

            // Initialize global lightbox options
            if (typeof lightbox !== 'undefined') {
                lightbox.option({
                    'resizeDuration': 200,
                    'wrapAround': true,
                    'fitImagesInViewport': true,
                    'disableScrolling': true
                });
            }

            // Init active section
            var activeSection = document.querySelector('.content-section.active');
            if (activeSection) {
                initSection(activeSection.id);
            }

            pageState.contentInitialized = true;
        });
    }

    function initSection(sectionId) {
        if (sectionId === 'image-section') {
            initMasonryGrid('.figure-grid', '.figure-grid-item', '.figure-grid-sizer', 'image');
        } else if (sectionId === 'film-section') {
            initMasonryGrid('.film-grid', '.film-grid-item', '.film-grid-sizer', 'film');
        } else if (sectionId === 'video-section') {
            observeMedia(document.getElementById('video-section'));
        }
    }

    // --- Masonry & Layout ---
    function initMasonryGrid(gridSelector, itemSelector, sizerSelector, type) {
        var grid = document.querySelector(gridSelector);
        if (!grid) return;

        // If already initialized, just layout
        if (pageState.masonry[type]) {
            pageState.masonry[type].layout();
            return;
        }

        // Check if Masonry data exists loosely
        if (typeof Masonry !== 'undefined') {
            var existing = Masonry.data(grid);
            if (existing) {
                pageState.masonry[type] = existing;
                existing.layout();
                return;
            }
        }

        try {
            var msnry = new Masonry(grid, {
                itemSelector: itemSelector,
                columnWidth: sizerSelector,
                percentPosition: true,
                transitionDuration: '0.3s'
            });

            pageState.masonry[type] = msnry;

            // Bind layout updates to image loads
            if (typeof imagesLoaded !== 'undefined') {
                imagesLoaded(grid).on('progress', function () {
                    msnry.layout();
                });
            }

            // Start observing lazy items in this grid
            observeMedia(grid);

        } catch (e) {
            console.warn('Masonry init failed', e);
        }
    }

    function updateActiveLayout() {
        // Debounce or requestAnimationFrame could be added here if called frequently
        requestAnimationFrame(function () {
            var activeSection = document.querySelector('.content-section.active');
            if (activeSection) {
                if (activeSection.id === 'image-section' && pageState.masonry.image) {
                    pageState.masonry.image.layout();
                } else if (activeSection.id === 'film-section' && pageState.masonry.film) {
                    pageState.masonry.film.layout();
                }
            }
        });
    }

    // --- Unified Lazy Loading ---
    function observeMedia(rootElement) {
        if (!rootElement) return;

        // Select all lazy targets
        // We look for .lozad, .film-lozad, or video[data-src]
        var targets = rootElement.querySelectorAll('img[data-src], video[data-src]');

        if (!pageState.observers.intersection) {
            pageState.observers.intersection = new IntersectionObserver(handleIntersection, {
                rootMargin: '200px', // Preload before coming into view
                threshold: 0
            });
        }

        targets.forEach(function (el) {
            if (!el.classList.contains('loaded') && !el.dataset.loading) {
                pageState.observers.intersection.observe(el);
            }
        });
    }

    function handleIntersection(entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var el = entry.target;
                loadMedia(el);
                observer.unobserve(el);
            }
        });
    }

    function loadMedia(el) {
        if (el.dataset.loading || el.classList.contains('loaded')) return;

        el.dataset.loading = 'true';
        var src = el.getAttribute('data-src');
        if (!src) return;

        // Visual fade-in prep
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.3s ease';

        if (el.tagName.toLowerCase() === 'video') {
            var poster = el.getAttribute('data-poster');
            if (poster) el.setAttribute('poster', poster);

            var source = el.querySelector('source');
            if (!source) {
                source = document.createElement('source');
                source.type = 'video/mp4';
                el.appendChild(source);
            }
            source.src = src;
            el.load();

            // For video, we assume 'loaded' when it can play or just immediately
            // Often purely setting src is enough to start buffering.
            stepLoaded(el);
        } else {
            // Image
            var img = new Image();
            img.onload = function () {
                el.src = src;
                stepLoaded(el);
            };
            img.onerror = function () {
                // Handle error if needed, essentially just stop loading state
                el.removeAttribute('data-loading');
            };
            img.src = src;
        }
    }

    function stepLoaded(el) {
        el.removeAttribute('data-src');
        el.removeAttribute('data-loading');
        el.classList.add('loaded');
        el.style.opacity = '1';
        el.style.visibility = 'visible';

        // Notify parent item for CSS styling
        var parentItem = el.closest('.figure-grid-item, .film-grid-item, .video-item');
        if (parentItem) parentItem.classList.add('loaded');

        // Trigger layout update
        updateActiveLayout();
    }


    // --- Dom & Content Handling ---
    function handleInitialContent() {
        var containers = document.querySelectorAll('[data-type]');
        var imageGrid = document.querySelector('.figure-grid');

        var content = {
            hasImage: !!(imageGrid && imageGrid.innerHTML.trim()),
            hasVideo: false,
            hasFilm: false
        };

        // Move scattered content into containers
        containers.forEach(function (container) {
            var type = container.getAttribute('data-type');
            if (type === 'video') {
                var vContainer = document.getElementById('video-container');
                if (vContainer) {
                    vContainer.appendChild(container.cloneNode(true));
                    content.hasVideo = true;
                }
            } else if (type === 'film') {
                var fContainer = document.getElementById('film-container');
                if (fContainer) {
                    fContainer.appendChild(container.cloneNode(true));
                    content.hasFilm = true;
                }
            }
            container.remove();
        });

        // Auto-switch tabs if image section is empty but others exist
        if (!content.hasImage) {
            if (content.hasVideo) {
                switchTab('video-section');
            } else if (content.hasFilm) {
                switchTab('film-section');
            }
        }

        return content;
    }

    function switchTab(targetId) {
        var targetBtn = document.querySelector('.nav-button[data-target="' + targetId + '"]');
        if (targetBtn) {
            // Simulate click or just manually trigger logic
            // Ideally we reuse the click handler logic defined in setupButtonHandlers
            targetBtn.click();
        } else {
            // Manual fallback
            document.querySelectorAll('.content-section').forEach(s => {
                s.classList.remove('active');
                s.style.display = 'none';
            });
            var sec = document.getElementById(targetId);
            if (sec) {
                sec.classList.add('active');
                sec.style.display = 'block';
            }
        }
    }

    function updateNavigationButtons(hasImage, hasVideo, hasFilm) {
        var nav = document.querySelector('.content-nav');
        if (!nav) return;

        var btnImage = document.querySelector('.image-button');
        var btnVideo = document.querySelector('.video-button');
        var btnFilm = document.querySelector('.film-button');

        if (btnImage) btnImage.style.display = hasImage ? 'inline-block' : 'none';
        if (btnVideo) btnVideo.style.display = hasVideo ? 'inline-block' : 'none';
        if (btnFilm) btnFilm.style.display = hasFilm ? 'inline-block' : 'none';

        var count = (hasImage ? 1 : 0) + (hasVideo ? 1 : 0) + (hasFilm ? 1 : 0);
        nav.style.display = count > 1 ? 'flex' : 'none';
    }

    function setupButtonHandlers() {
        var navButtons = document.querySelectorAll('.nav-button');
        navButtons.forEach(function (btn) {
            // Clone to remove old listeners (cleanup)
            var newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
        });

        // Re-select
        navButtons = document.querySelectorAll('.nav-button');
        navButtons.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                var target = this.getAttribute('data-target');

                // Update active state
                navButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                // Show section
                document.querySelectorAll('.content-section').forEach(function (bs) {
                    bs.classList.remove('active');
                    bs.style.display = 'none';
                });

                var targetSection = document.getElementById(target);
                if (targetSection) {
                    targetSection.classList.add('active');
                    targetSection.style.display = 'block';
                    initSection(target);
                }
            });
        });
    }


    // --- Lifecycle ---

    function detectContent() {
        var contentSection = document.getElementById('image-section');
        // Simple check if content is injected
        if (contentSection && contentSection.innerHTML.trim() !== '') {
            document.dispatchEvent(new CustomEvent('jekyll-content-ready'));
            initPage();
        } else {
            requestAnimationFrame(detectContent);
        }
    }

    // Observer for PJAX or dynamic content injection
    var mutationObserver = new MutationObserver(function (mutations) {
        var needed = false;
        for (var i = 0; i < mutations.length; i++) {
            if (mutations[i].addedNodes.length > 0) {
                needed = true;
                break;
            }
        }

        if (needed) {
            var contentSection = document.getElementById('image-section');
            if (contentSection && contentSection.innerHTML.trim() !== '' && !pageState.contentInitialized) {
                detectContent();
            }
        }
    });

    var container = document.getElementById('content-container') || document.body;
    mutationObserver.observe(container, { childList: true, subtree: true });

    // Initial check
    detectContent();

    // Export if needed for debugging
    window.GalleryOptimized = pageState;

})();
