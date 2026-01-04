# Sass Guide

This folder contains SCSS partials used by the Jekyll build.

## 1. Styling Conventions
- Keep global tokens and variables consistent with existing patterns.
- Prefer editing existing partials over creating new ones, unless the change is clearly scoped.

## 2. Map Styles
- Travel map styles live in `_sass/my-style.scss` under the "Map Styles" section.
- Keep map-related styles together to avoid PJAX-specific regressions.

## 3. Inline Styles
- Avoid inline styles in layouts when possible; add SCSS here instead.

## 4. Component Styles

## 5. Search Styles
- **Location**: Inline within `_includes/body/menu.html`.
- **Why**: To keep the search component self-contained. Global variables are still used where applicable.

## 6. Localization Styles
- **Location**: Inline within `_includes/body/menu.html`.
- **Purpose**: High-priority utility rules (e.g., `body.lang-zh .en { display: none !important; }`) that toggle content visibility based on the selected language.
