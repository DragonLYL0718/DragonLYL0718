# Assets Guide

This folder contains static assets used by the Jekyll site.

## 1. JavaScript
- Place custom scripts in `assets/js/`.
- Any DOM-binding logic must be PJAX-safe: initialize on `hy:pjax:end` and make init idempotent.
- When adding inline `<script>` tags in HTML, avoid `//` comments; use `/* ... */`.
- See `assets/readme.md` for Hydejack PJAX debugging notes.

## 2. Styles
- Most custom SCSS lives in `_sass/`; map styles live in `_sass/my-style.scss`.
- Prefer SCSS over inline styles where possible.

## 3. Images
- Use `assets/images/` or `assets/img/` and keep filenames stable to avoid broken links.
