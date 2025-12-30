# Galleries Guide

Files here provide data for the travel gallery and map.

## 1. File Format
- Each file is a YAML front matter document with `year` and `items`.
- Each item should include: `title`, `image`, `url`, `lat`, `lng`.
- `lat` and `lng` must be decimal numbers; these power the map markers.

## 2. Conventions
- Use absolute URLs for `image` (current assets are hosted on a CDN).
- Keep `url` under `/travel/...` to match gallery pages.
- Preserve item order for display (newest items typically go first).
