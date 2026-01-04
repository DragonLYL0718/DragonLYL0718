# Includes Guide

This folder contains Liquid partials used in layouts.

## 1. Key Components

### 1.1 `body/menu.html` (Navbar, Search, & Language Switch)
- **Role**: Replaces the default sidebar navigation with a top navbar.
- **Search Implementation**:
  - **Logic**: Inline JavaScript for fetching `search.json`. Now includes bilingual search inputs (`#searchInput` and `#searchInputZh`).
  - **Styles**: Inline CSS for the search dropdown and highlighted results.
- **Language Switcher**:
  - **UI**: Added a toggle button with a custom mask-styled icon.
  - **Logic**: Handles language state detection, `<body>` class toggling, and `localStorage` persistence.
  - **Styles**: Includes `.en`/`.zh` visibility control rules.

### 1.2 `body/nav.html` & `body/sidebar-sticky.html` (Bilingual Sidebar)
- **Role**: Supports the theme's sidebar (hidden on most pages by `menu.html` but kept for layout consistency).
- **Localization**: Updated to support `title_zh` for menu items and bilingual site title/tagline.

## 2. Best Practices
- **Inline Scripts**: Use `/* comments */` to avoid PJAX minification issues.
- **Idempotency**: Any JS initialization here should be idempotent if it runs on PJAX transitions.
