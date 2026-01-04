# Includes Guide

This folder contains Liquid partials used in layouts.

## 1. Key Components

### 1.1 `body/menu.html` (Navbar & Search)
- **Role**: Replaces the default sidebar navigation with a top navbar.
- **Search Implementation**:
  - **Logic**: Contains inline JavaScript for fetching `search.json`, filtering results, and rendering image previews.
  - **Styles**: Contains inline CSS for the search dropdown and highlighted results (scoped to `#search-input` and related elements).
  - **Reason for Inline**: Kept self-contained for easy portability and to avoid scattered dependencies for this specific feature.

### 1.2 `body/nav.html` (Legacy Sidebar)
- **Status**: Currently unused/bypassed in favor of `menu.html`.
- **Note**: Modifying this file will not affect the live site's navigation if `menu.html` is the active include in the layout.

## 2. Best Practices
- **Inline Scripts**: Use `/* comments */` to avoid PJAX minification issues.
- **Idempotency**: Any JS initialization here should be idempotent if it runs on PJAX transitions.
