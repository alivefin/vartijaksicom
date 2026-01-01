# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static HTML/CSS design mockup project for "Vartijaksi" (vartijaksi.com) - a Finnish-language website about security guard careers, training, and employment in Finland. The purpose of this project is to finally build a full WordPress-site with vartijaksicom-theme.

## Technology Stack

- **Static HTML5** with embedded CSS and JavaScript
- **Tailwind CSS** via CDN (`cdn.tailwindcss.com` with forms and container-queries plugins)
- **Google Fonts**: Inter (weights: 400, 500, 600, 700, 900)
- **Icons**: Lucide Icons
- **No build system** - files are self-contained and viewable directly in browser

## Project Structure

```
/                           # Production site (root level)
├── index.html              # Homepage
├── vartijakoulutus.html    # Training details page
├── css/
│   └── styles.css          # Shared stylesheet
├── js/
│   └── main.js             # JavaScript (theme, mobile menu, TOC)
├── robots.txt              # SEO crawl directives
├── sitemap.xml             # XML sitemap
└── design/                 # Original design mockups (reference only)
    └── stitch_vartijaksi_koulutus_ja_ty/
        ├── vartijaksi_–_etusivu.../code.html
        └── vartijakoulutus_.../code.html
```

## Running the Project

Open `index.html` or `vartijakoulutus.html` directly in a web browser. No server or build process required.

## Design System

### Tailwind Configuration

```javascript
colors: {
  "primary": "#136dec",
  "background-light": "#f6f7f8",
  "background-dark": "#101822" / "#111418",
  "surface-dark": "#1e293b",
  "text-dim": "#9da8b9"
}
```

### Key Patterns

- Light/dark mode toggle (respects system preference, stores in localStorage)
- Language is Finnish (`lang="fi"`)
- Responsive breakpoints: sm (640px), md (768px), lg (1024px)
- Sticky navigation with backdrop blur
- Card-based layouts with hover transforms
- FAQ sections use native `<details>` elements
- Custom scrollbar styling for dark theme

## Accessibility (WCAG 2.1 AA)

- Skip to content link on every page
- Proper ARIA labels on interactive elements
- Focus visible indicators on all focusable elements
- Keyboard-accessible mobile menu with focus trap
- Semantic HTML structure (header, nav, main, article, section, footer)
- Color contrast meeting 4.5:1 ratio
- Reduced motion support via `prefers-reduced-motion`

## SEO & AI Discoverability

- JSON-LD structured data (Organization, WebSite, Article, FAQPage, BreadcrumbList)
- Open Graph and Twitter Card meta tags
- Semantic heading hierarchy (single h1 per page)
- Descriptive link text (no "click here")
- robots.txt allows all AI crawlers (GPTBot, Claude-Web, PerplexityBot, etc.)
- XML sitemap at `/sitemap.xml`
