# Layouts Guide

This folder contains Jekyll layouts (HTML + Liquid) used by the site.

## 1. PJAX-Safe Scripts
- Hydejack swaps content with PJAX; `DOMContentLoaded` does not run on internal navigation.
- If you add scripts in layouts, bind init to `hy:pjax:end` and make the init idempotent.
- Avoid `//` comments inside inline `<script>` tags; use `/* ... */`.

## 2. Layout Conventions
- Keep layout changes minimal and prefer `_includes/` for reusable blocks.
- If adding new layout files, ensure front matter and Liquid blocks are consistent with existing layouts.

## 3. References
- PJAX debugging notes: `assets/readme.md`
