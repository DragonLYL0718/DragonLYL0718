# Project Context & Agent Guide

This document provides context and guidelines for AI agents and developers working on the `DragonLYL0718` Jekyll site. It highlights specific architectural constraints and development patterns necessary to work effectively with the codebase.

## 1. Technology Stack
- **Static Site Generator**: Jekyll
- **Theme**: Hydejack (`jekyll-theme-hydejack`)
- **Languages**: HTML, SCSS/CSS, JavaScript, Markdown, Liquid

## 2. Critical Implementation Constraints

### 2.1 Dynamic Page Loading (PJAX/AJAX)
The Hydejack theme uses a dynamic loading mechanism (PJAX) to navigate between pages without a full reload. This has significant implications for JavaScript execution.

**The Problem:**
Standard events like `DOMContentLoaded` or `window.load` are **not** fired when navigating between pages via internal links. They only fire on the initial page load or a full refresh.

**The Solution:**
*   **Listen for `hy:pjax:end`**: You must listen for the `hy:pjax:end` event to detect when a new page has loaded via PJAX.
*   **Dual Listeners**: To ensure scripts work on both initial load and navigation, use a shared initialization function.

**Pattern:**
```javascript
function initMyFeature() {
  // Check if already initialized to prevent duplicates (idempotency)
  if (document.querySelector('.my-feature').dataset.initialized) return;
  
  // Implementation...
  document.querySelector('.my-feature').dataset.initialized = 'true';
}

// Initial load
document.addEventListener('DOMContentLoaded', initMyFeature);
// Navigation load
window.addEventListener('hy:pjax:end', initMyFeature);
```

### 2.2 Inline Script Comments
**Constraint:** Do not use `//` comments in inline `<script>` tags within HTML files.
**Reason:** The theme's minification or parsing process may break the script if `//` is used.
**Best Practice:** Always use block comments `/* ... */`.

### 2.3 Search Functionality
**Constraint:** The built-in search functionality may be disabled in the `development` environment by default to save build time.
**Workaround:** To test search locally, you may need to run the server with the production environment variable:
```bash
JEKYLL_ENV=production bundle exec jekyll serve
```

## 3. Development Workflow

### Useful Commands
*   **Start Local Server**: `bundle exec jekyll serve`
*   **Start Production Server (Locally)**: `JEKYLL_ENV=production bundle exec jekyll serve`

### Directory Structure Key
*   `_config.yml`: Main configuration (theme settings, navigation, plugins).
*   `assets/`: Static assets (JS, CSS, images).
    *   `assets/readme.md`: Contains detailed debugging notes for Hydejack scripts.
*   `_includes/`: HTML partials.
*   `_layouts/`: Page templates.

## 4. Reference
For deep dives into specific bugs (especially JS/PJAX issues), consult:
`assets/readme.md`
