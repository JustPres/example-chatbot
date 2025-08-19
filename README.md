# Simple Catalog Website

A lightweight, responsive catalog to showcase products/services. Built with HTML + TailwindCSS (CDN), no build step.

## Features
- Clean navigation: Home, Catalog, Contact/About
- Hero section with welcome/brand message
- Responsive product grid (≥ 6 items) with image, name, description, price
- Hover effects (zoom + shadow)
- Smooth scrolling and mobile-friendly layout
- Contact section with company details and optional form

## Structure
- `index.html` — Main site file
- `chatbot.json` — Project requirements spec (do not serve)

## Run Locally
Open directly:
- Double-click `index.html` or open it in your browser.

Or via a local server (recommended for testing):
- Python 3: `python -m http.server 8000` then visit http://localhost:8000/
- Node (serve): `npx serve .` then follow the URL shown

## Deploy
- GitHub Pages: push this folder to a repo, enable Pages (branch: `main`, folder: `/root`).
- Netlify: Drag-and-drop the folder in Netlify UI or connect the repo. Build command: none. Publish directory: `/`.
- Vercel: `vercel` from the folder or import the repo. Framework: Other. Output directory: `/`.

## Customize
- Edit catalog cards in the `#catalog` section of `index.html`.
- Replace images with your own URLs or local assets.
- Update company info in the Contact section.

## Compatibility
Tested to work on modern browsers: Chrome, Firefox, Edge, Safari.
