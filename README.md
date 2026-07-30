# AO3 Reader — Landing Page

Landing page for **AO3 Reader**, an unofficial Archive of Our Own reader for iPhone and Android.

**Live site:** https://ao3-reader.github.io/

## Store links

- App Store: https://apps.apple.com/us/app/ao3-archive-reader-unofficial/id6772581092
- Google Play: https://play.google.com/store/apps/details?id=com.gpllc.ao3reader.app

## Deployment

This is a static site with no build step. It is deployed via **GitHub Pages, deploying from the `main` branch, root directory**. Pushing to `main` updates the live site automatically.

## File structure

```
.
├── index.html                 Page markup, SEO metadata, structured data
├── styles.css                 All styling
├── script.js                  Mobile menu + scroll-reveal enhancement
├── robots.txt
├── sitemap.xml
├── .nojekyll                  Disables Jekyll processing on GitHub Pages
├── README.md
└── assets/
    ├── icon/                  App icon + favicon/touch-icon variants
    ├── graphics/              Hero composition and Open Graph/social image
    └── screenshots/           In-app screenshots used across the page
```
