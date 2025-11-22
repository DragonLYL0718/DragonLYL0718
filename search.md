---
layout: page
title: Search
permalink: /search/
---

<style>
    .search-container {
        max-width: 800px;
        margin: 0 auto;
    }
    
    /* Search Input Styling */
    #searchInput {
        width: 100%;
        padding: 15px 20px;
        font-size: 1.1rem;
        margin-bottom: 30px;
        border: 2px solid var(--border-color, #ccc);
        border-radius: 8px;
        background-color: var(--body-bg, #fff);
        color: var(--body-color, #333);
        transition: all 0.3s ease;
    }
    
    #searchInput:focus {
        border-color: var(--accent-color, #4FB1BA);
        outline: none;
        box-shadow: 0 0 0 3px rgba(79, 177, 186, 0.2);
    }

    /* Search Result Item Styling - Mimicking .publication-item */
    .search-result-item {
        display: block;
        margin-bottom: 1.5rem;
        padding: 1.5rem;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.05); /* Glassmorphism base */
        border: 1px solid rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        text-decoration: none; /* Remove default link underline */
    }

    .search-result-title {
        font-size: 1.3rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: var(--heading-color, #333);
        display: block;
    }

    .search-result-excerpt {
        font-size: 0.95rem;
        line-height: 1.6;
        color: var(--body-color, #666);
        opacity: 0.9;
        margin: 0;
    }

    /* Dark mode adjustments - Support both media query and class */
    @media (prefers-color-scheme: dark) {
        .search-result-item {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .search-result-item:hover {
            background: rgba(255, 255, 255, 0.06);
        }
        .search-result-title {
            color: #f0f0f0 !important;
        }
        .search-result-excerpt {
            color: #ccc !important;
        }
        #searchInput {
            background-color: #2a2d2f;
            color: #f0f0f0;
            border-color: #444;
        }
    }

    body.dark-mode .search-result-item {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
    }
    body.dark-mode .search-result-item:hover {
        background: rgba(255, 255, 255, 0.06);
    }
    body.dark-mode .search-result-title {
        color: #f0f0f0 !important;
    }
    body.dark-mode .search-result-excerpt {
        color: #ccc !important;
    }
    body.dark-mode #searchInput {
        background-color: #2a2d2f;
        color: #f0f0f0;
        border-color: #444;
    }

    .search-result-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }
    
    /* Highlight styling */
    .search-highlight {
        background-color: rgba(79, 177, 186, 0.3);
        border-radius: 2px;
        padding: 0 2px;
    }
</style>

<div class="search-container">
    <input type="text" id="searchInput" placeholder="Type to search..." aria-label="Search">
    <div id="searchResults"></div>
</div>

<script>
    (function () {
        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');
        let searchIndex = [];

        // Fetch the search index
        fetch('{{ "/search.json" | relative_url }}')
            .then(response => response.json())
            .then(data => {
                searchIndex = data;
            })
            .catch(error => {
                console.error('Error loading search index:', error);
                searchResults.innerHTML = '<p style="text-align:center; color: var(--body-color);">Error loading search data.</p>';
            });

        searchInput.addEventListener('input', function () {
            const query = this.value.toLowerCase();
            searchResults.innerHTML = '';

            if (query.length < 2) return;

            if (!searchIndex.length) {
                searchResults.innerHTML = '<p style="text-align:center; color: var(--body-color);">Loading search data...</p>';
                return;
            }

            const results = searchIndex.filter(item => {
                return (item.title && item.title.toLowerCase().includes(query)) ||
                       (item.content && item.content.toLowerCase().includes(query));
            });

            if (results.length > 0) {
                results.forEach(item => {
                    // Create container link
                    const aContainer = document.createElement('a');
                    aContainer.href = item.url;
                    aContainer.className = 'search-result-item';
                    
                    // Create title element
                    const title = document.createElement('span');
                    title.className = 'search-result-title';
                    title.textContent = item.title || item.url;
                    
                    // Create excerpt element
                    const excerpt = document.createElement('p');
                    excerpt.className = 'search-result-excerpt';
                    excerpt.textContent = item.content;
                    
                    aContainer.appendChild(title);
                    aContainer.appendChild(excerpt);

                    searchResults.appendChild(aContainer);
                });
            } else {
                searchResults.innerHTML = '<p style="text-align:center; color: var(--body-color);">No results found.</p>';
            }
        });
    })();
</script>
