# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based static site for "Vartijaksi" (vartijaksi.com) - a Finnish-language website about security guard careers, training, and employment in Finland.

## Technology Stack

- **Astro** (v5.x) - Static site generator
- **Tailwind CSS** via `@astrojs/tailwind` integration (npm package, tree-shaking)
- **Google Fonts**: Inter (weights: 400, 500, 600, 700, 900)
- **Icons**: Inline SVG (Lucide-style)
- **Sitemap**: Auto-generated via `@astrojs/sitemap`
- **Output**: Static HTML, deployable anywhere

## Project Structure

```
/
├── src/
│   ├── components/
│   │   ├── Header.astro          # Nav with theme toggle + mobile trigger
│   │   ├── Footer.astro          # 4-column footer
│   │   ├── MobileMenu.astro      # Mobile nav with focus trap
│   │   ├── ThemeToggle.astro     # Dark/light mode switcher
│   │   ├── SkipLink.astro        # Accessibility skip link
│   │   ├── SEO.astro             # Meta tags + JSON-LD
│   │   ├── Breadcrumbs.astro     # Breadcrumb navigation
│   │   ├── FAQ.astro             # Accordion (details/summary)
│   │   └── TOC.astro             # Table of contents with scroll spy
│   ├── layouts/
│   │   ├── BaseLayout.astro      # HTML wrapper, head, header, footer
│   │   └── ArticleLayout.astro   # Extends Base, adds TOC sidebar
│   ├── pages/
│   │   ├── index.astro           # Homepage → /
│   │   └── vartijakoulutus.astro # Training page → /vartijakoulutus
│   └── styles/
│       └── global.css            # Tailwind directives + custom CSS
├── public/
│   └── robots.txt                # SEO crawl directives
├── legacy/                       # Old static HTML (reference only)
├── astro.config.mjs              # Astro configuration
├── tailwind.config.mjs           # Tailwind configuration
└── package.json
```

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server at localhost:4321
npm run build        # Build to /dist
npm run preview      # Preview production build
```

## Design System

### Tailwind Configuration

Located in `tailwind.config.mjs`:

```javascript
colors: {
  "primary": "#136dec",
  "primary-hover": "#0f5bbd",
  "background-dark": "#111418",
  "surface-dark": "#1c2027",
  "surface-dark-lighter": "#282f39",
  "text-dim": "#9da8b9"
}
```

### Key Patterns

- Dark mode via `class` strategy (stored in localStorage)
- Language: Finnish (`lang="fi"`)
- Responsive breakpoints: sm (640px), md (768px), lg (1024px)
- Sticky navigation with backdrop blur
- Card-based layouts with hover transforms
- FAQ sections use native `<details>` elements

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
- Sitemap auto-generated at `/sitemap-index.xml`
