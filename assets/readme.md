# Hydejack Theme JavaScript Debugging Notes

This document contains notes on issues and solutions related to custom JavaScript execution within the Hydejack Jekyll theme, particularly concerning its dynamic page loading (AJAX/PJAX) feature.

## Problem: Scripts Don't Run on Dynamic Navigation

When navigating to a page with custom scripts by clicking an internal link, the scripts may not execute as expected. However, they work correctly on a full page refresh (e.g., using Ctrl+R).

This can manifest in several ways:
-   Content that should be manipulated by JavaScript remains in its initial state (e.g., hidden tabs not showing).
-   Event listeners are not attached.
-   If scripts are re-executed multiple times on subsequent navigations, errors like `Identifier '...' has already been declared` can occur.

## Cause: AJAX/PJAX Page Loading

Hydejack uses a dynamic loading mechanism (PJAX) to create a faster, smoother navigation experience. The process is as follows:

1.  A user clicks an internal link.
2.  Hydejack intercepts the click.
3.  It fetches the new page's content via an AJAX request.
4.  It replaces a portion of the current page's DOM with the new content.

The crucial point is that this **does not trigger a full page reload**. Therefore, standard browser events like `DOMContentLoaded` or `window.load`, which many scripts rely on for initialization, are not fired.

## Solutions and Findings

### 1. Finding the Correct Event Listener

Standard events don't work for dynamic loading. We need to listen for a custom event that Hydejack fires after the new page content has been loaded and inserted into the DOM.

-   **Incorrect Events:** `turbo:load`, `turbolinks:load`, `hydejack:ready`, `hydejack:load`, `hy:load` were tried and did not work reliably.
-   **Correct Event (for Hydejack v9+):** The correct event to listen for is `hy:pjax:end`.

**Example Implementation:**
```javascript
function myInitializationFunction() {
  // Your setup code here
}

// For direct page loads/refreshes
document.addEventListener('DOMContentLoaded', myInitializationFunction);

// For dynamic navigation within Hydejack
window.addEventListener('hy:pjax:end', myInitializationFunction);
```

### 2. Script Syntax in HTML

-   **Issue:** It was observed that scripts inside `<script>` tags in HTML files failed to execute if they contained `//` style comments.
-   **Solution:** Always use `/* ... */` block comments for commenting inside `<script>` tags within HTML files to ensure maximum compatibility.

### 3. (Alternative) MutationObserver

A `MutationObserver` can be used as a more general solution if the specific theme event is unknown. It can watch for changes in the DOM (like new content being added) and trigger the initialization function. This is a powerful but often more complex solution than using the theme's provided custom event.

### 4. Ready-State Fallback After PJAX Swaps

-   Hydejack may inject new layouts via PJAX after `DOMContentLoaded` is finished, so inline scripts that listen only for that event never run on the first visit.
-   Gate the initializer with a `dataset` flag, re-use a shared `deferredInit` wrapper, and call it immediately when the document is already `interactive` or `complete` to cover PJAX replacements.
-   Example pattern:
    ```javascript
    function initGalleryPage() {
      const container = document.querySelector('.tab-container');
      if (!container || container.dataset.galleryInitialized) return;
      container.dataset.galleryInitialized = 'true';
      // setup handlers...
    }

    const deferredInit = () => requestAnimationFrame(initGalleryPage);

    document.addEventListener('DOMContentLoaded', deferredInit, { once: true });
    window.addEventListener('hy:pjax:end', deferredInit);
    window.addEventListener('hy:load', deferredInit);

    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      deferredInit();
    }
    ```
-   This prevents double-binding while ensuring the UI works on the first navigation without requiring a manual refresh.

