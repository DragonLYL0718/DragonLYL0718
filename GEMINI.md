# Project Overview

This directory contains a personal academic and portfolio website for Yilong Lin. It is built using the Jekyll static site generator and the Hydejack theme. The site showcases publications, projects, a résumé, and travel logs.

The content is written in Markdown, and the site's structure and data are managed through Jekyll's conventional directories (`_data`, `_includes`, `_layouts`, `_sass`, etc.) and configuration files.

## Key Technologies

*   **Static Site Generator:** Jekyll
*   **Theme:** Hydejack
*   **Language:** Ruby (for Jekyll), HTML, SCSS, JavaScript
*   **Content:** Markdown
*   **Deployment:** Netlify, Cloudflare Workers (inferred from `netlify.toml` and `wrangler.toml`)

## Building and Running

To work with this project locally, you will need Ruby and Bundler installed.

1.  **Install Dependencies:**
    Install the Ruby gems specified in the `Gemfile`.
    ```bash
    bundle install
    ```

2.  **Run the Local Development Server:**
    Build the site and serve it locally. The site will be accessible at `http://localhost:4000` and will automatically rebuild when changes are made.
    ```bash
    bundle exec jekyll serve
    ```

3.  **Build for Production:**
    To generate the static site for deployment, run the following command. The output will be placed in the `_site` directory.
    ```bash
    jekyll build
    ```
    *(Note: The `netlify.toml` file specifies this as the build command for production deployment.)*

## Development Conventions

*   **Content Creation:** New content pages (like projects or travel entries) are created as Markdown files within their respective directories (e.g., `projects/`, `travel/gallery/`).
*   **Configuration:** The main site configuration is managed in `_config.yml`. This includes the site title, author information, navigation menu, and theme settings.
*   **Styling:** Custom styles are centralized in `_sass/my-style.scss`. All inline `<style>` blocks from layouts have been moved here for better maintainability.
*   **JavaScript for Dynamic Content:** When adding JavaScript for pages that are dynamically loaded by Hydejack (via PJAX), ensure scripts are initialized using `window.addEventListener('hy:pjax:end', myFunction)` in addition to `document.addEventListener('DOMContentLoaded', myFunction)` to handle both full page loads and AJAX navigation. Avoid `//` comments within `<script>` tags in HTML files; use `/* ... */` instead.
*   **Data:** Site-wide data, such as author details and social media links, is stored in YAML files within the `_data` directory.
*   **Layouts:** The overall HTML structure and page templates are defined in the `_layouts` directory.
*   **Data-Driven Travel Galleries:** The travel gallery pages in `travel/gallery/` have been refactored to be data-driven.
    *   **Data Source:** Instead of hardcoding HTML in the markdown files, the gallery content is now generated from YAML front matter. The `images`, `films`, and `videos` keys in the front matter are used to populate the galleries.
    *   **Data Structure:**
        *   `images` and `films`: A list of objects, each with `url`, `thumbnail`, and `alt` properties.
        *   `videos`: A list of objects, each with a `url` property.
        *   `video_credits`: An object with `name` and `url` for video attributions.
    *   **Layout:** The `_layouts/pagefigure.html` layout is responsible for rendering the galleries from the front matter data. It preserves the tabbed navigation for "Digital Photo", "Film Photo", and "Video".
    *   **Helper Script:** The user's `ReadFiles.ipynb` notebook has been updated to generate the required YAML front matter for new galleries, streamlining the content creation process.
