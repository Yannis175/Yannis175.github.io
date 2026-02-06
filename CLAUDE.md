# CLAUDE.md - Project Instructions

## Repository Overview

This is **Yannis's Blog** — a personal tech blog built with Hexo + Chic theme. This repository contains the **pre-built static output**, not the Hexo source files.

## Tech Stack

- **Static Generator**: Hexo (build output only, source files not included)
- **Theme**: [hexo-theme-Chic](https://github.com/Siricee/hexo-theme-Chic)
- **Styles**: CSS / SCSS
- **Scripts**: Vanilla JavaScript
- **Comments**: Gitalk (GitHub Issues-based)
- **Math**: MathJax 2.7.5
- **TOC**: tocbot
- **Analytics**: Busuanzi (不蒜子)

## Project Structure

```
├── index.html           # Homepage
├── about/               # About page
├── 2019/, 2020/         # Blog posts organized by date
├── archives/            # Archive pages
├── categories/          # Category pages
├── tags/                # Tag pages
├── css/                 # Stylesheets (style.css, base.css, layout.css, etc.)
├── js/                  # Scripts (script.js, main.js, tocbot, mathjax)
├── img/, image/         # Image assets
├── font/, fonts/        # Font files (including iconfont)
├── style.scss           # SCSS source (reference only, _scss/ not in this repo)
├── favicon.ico          # Site favicon
└── docs/                # Project documentation
```

## Key Conventions

- Blog posts follow the path pattern: `YYYY/MM/DD/title/index.html`
- All pages share a common header/footer structure with navigation
- Dark/light theme toggle is built into the navbar
- Mobile navigation uses a hamburger menu

## Development Notes

- **No build system in this repo** — this is pre-built output
- To preview locally: `npx serve .` or `python3 -m http.server 3000`
- CSS changes can be made directly in `css/` files
- `style.scss` is for reference only — `_scss/` directory is not in this repo, so SCSS cannot be compiled here
- To add new articles, use the Hexo source project and regenerate

## Important Paths

- `css/style.css` — Main compiled stylesheet
- `css/variable.css` — CSS custom properties
- `js/main.js` — Search functionality (fetch search.json, filter and render results)
- `js/script.js` — Theme toggle (dark/light mode) and DOM ready utility
