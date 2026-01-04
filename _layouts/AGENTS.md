# Layouts Guide

This folder contains Jekyll layouts (HTML + Liquid) used by the site.

## 1. PJAX-Safe Scripts
- Hydejack swaps content with PJAX; `DOMContentLoaded` does not run on internal navigation.
- If you add scripts in layouts, bind init to `hy:pjax:end` and make the init idempotent.
- Avoid `//` comments inside inline `<script>` tags; use `/* ... */`.

## 2. Layout Conventions
- Keep layout changes minimal and prefer `_includes/` for reusable blocks.
- If adding new layout files, ensure front matter and Liquid blocks are consistent with existing layouts.

## 3. Specific Layouts

### 3.1 `pagegallery.html` (Travel Map & List)
- **Purpose**: Main entry point for `/travel/`.
- **Features**: 
  - **Namespace**: `window.GalleryPage` (handles Map init, Filtering, Tab switching).
  - **Views**: Toggles between Map view (Leaflet) and List view (Grid).
  - **Filtering**: Client-side filtering by "Year" (tabs/dropdowns) and "Location Name" (search input).
  - **Dynamic Menu**: Automatically groups years into 5-year blocks (e.g. 2021-2025) and "Before 2021".

### 3.2 `pagefigure.html` (Photo Gallery)
- **Purpose**: Individual photo gallery pages (e.g., `/travel/liverpool2026`).
- **Features**:
  - **Grid**: `Masonry.js` for waterfall layout.
  - **Lightbox**: `lightbox-plus-jquery.js` for full-screen image viewing.
  - **Performance**: `lozad.js` for lazy loading images.

## 3. References
- PJAX debugging notes: `assets/readme.md`
