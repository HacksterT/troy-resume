---
project: troy-resume
updated: 2026-05-26
description: "Static resume portfolio website for Troy E. Sybert, MD, deployed at www.troymd.com on GitHub Pages."
path: /Users/hackstert/Projects/web-sites/troy-resume/CONTEXT.md
---

## Overview

Static resume portfolio website for Troy E. Sybert, MD, MPH, CUA -- a physician executive with 23 years clinical and 20 years executive experience in healthcare transformation, clinical informatics, and AI. Deployed at www.troymd.com via GitHub Pages with a custom GoDaddy-managed domain. The site is a pure static HTML5/CSS3/vanilla JavaScript application with no frameworks, no package.json, and no build step beyond optional CSS minification. Content is data-driven: a minimal HTML shell is populated at runtime from six JSON data files fetched in parallel on page load.

## Architecture

- **Entry point:** `frontend/index.html` -- semantic HTML5 shell; all section content injected by JavaScript at `DOMContentLoaded`
- **ResumeManager** (`frontend/js/resume.js`, ~816 lines) -- orchestrates all data loading (`Promise.all` across six JSON files), section rendering (profile, technology, work experience, credentials, publications, volunteer), Gantt chart timeline, category filtering, modal system, hash-based navigation (`#summary`, `#technology`, `#work`, etc.), and scroll-based active nav highlighting
- **Chatbot** (`frontend/js/chatbot.js`, ~179 lines) -- client-side FAQ chatbot with keyword matching against `frontend/data/faq.json`; no backend dependency
- **CSS:** `frontend/css/styles.css` imports 8 modular files: `variables.css`, `base.css`, `header.css`, `sections.css`, `timeline.css`, `gantt.css`, `chatbot.css`, `responsive.css`. Production uses minified `styles.min.css`; dev uses `styles.css`
- **Data layer:** 8 JSON files in `frontend/data/` -- `profile.json`, `roles.json`, `credentials.json`, `publications.json`, `volunteer.json`, `technology.json`, `faq.json`, `projects.json`
- **Presentations:** PDF slide decks stored in `frontend/assets/presentations/`. Referenced via `slides_pdf` field in `publications.json` entries. Rendered by ResumeManager with `target="_blank"` (opens in browser viewer). Naming convention: no spaces, e.g. `August2022.pdf`, `Quillen_AI_2026.pdf`
- **Gantt chart:** Timeline visualization spanning 2000-2025. Position/width calculated from `gantt_position`/`gantt_width` metadata in `roles.json`. Formula: `gantt_value = (Year - 2000) + (Month - 1) / 12`. Documented in `docs/gantt-logic.md`
- **Work experience category color coding:** administrative (blue), clinical (green), academic (purple) -- defined as CSS variables
- **Hosting:** GitHub Pages, auto-deployed via GitHub Actions (`.github/workflows/deploy-github-pages.yml`) on push to `main` or manual `workflow_dispatch`; workflow uploads `frontend/` directly using `actions/upload-pages-artifact@v3` and `actions/deploy-pages@v4`
- **Cal.com integration:** Floating popup booking button embedded via Cal.com script with custom "Book a Chat" label

## Key Conventions

- All source files kept under 500 lines
- JSON keys use snake_case; JavaScript uses camelCase
- No external fonts -- system font stack only
- Semantic HTML5 elements (`header`, `nav`, `main`, `section`) with ARIA labels on interactive elements
- Hash-based navigation -- no router library
- Local dev requires a real web server (not `file://`) for JSON fetch to work: `python -m http.server 8000` or `npx serve` from `frontend/`
- Production HTML references `css/styles.min.css`; development references `css/styles.css`
- No tests, no linter, no CI validation step beyond deploy
- Presentation PDF filenames must have no spaces; use underscores (e.g. `Quillen_AI_2026.pdf`)

## Dependencies

- **GitHub Pages** -- hosting and TLS (Let's Encrypt)
- **GitHub Actions** -- CI/CD pipeline (`.github/workflows/deploy-github-pages.yml`)
- **GoDaddy DNS** -- custom domain `www.troymd.com` A records and CNAME pointing to GitHub Pages IPs
- **Cal.com** -- floating booking popup script (external CDN)
- **Node.js** (dev only) -- `minify-css.js` script for CSS minification; not required at runtime or deploy

## Active Work

- **Quillen AI presentation live pending deploy:** `Quillen_AI_2026.pdf` committed to `frontend/assets/presentations/`; entry added to `publications.json` matching Monarch pattern (`slides_pdf`, opens in browser viewer). Blocked on deploy.
- **GitHub Pages deploy pipeline broken:** `actions/upload-pages-artifact` (all versions) unavailable on GitHub's codeload CDN as of 2026-05-26. Workflow runs fail at "Set up job" before touching repo files. `workflow_dispatch` trigger added to workflow so manual re-run can be triggered from Actions tab once GitHub resolves the CDN issue.
- **Pending CLAUDE.md cleanup:** CLAUDE.md still references stale Azure migration pending actions (repo already renamed to `troy-resume`, Pages already configured). Low priority cleanup.
