# Leonhard Euler — Interactive Presentation

A single-page interactive website presenting Leonhard Euler's life, calculus contributions, and legacy. Built with **SvelteKit**, **TypeScript**, **GSAP**, **Lenis**, and **Leaflet**.

## Sections

- **Introduction** — portrait + biography
- **Who** — interests and unrelated occupations
- **Interactive Timeline** — scroll-driven life events
- **Calculus Contributions** — key textbooks and innovations
- **Gallery** — expandable cards (notation, Königsberg bridges, etc.)
- **Interactive Map** — Basel, Riehen, St. Petersburg, Berlin
- **Why** — motivations
- **Bibliography** — APA format

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build

```bash
npm run build
npm run preview
```

## GitHub Pages

1. Push to GitHub
2. Enable **Pages** → Source: **GitHub Actions**
3. The workflow deploys automatically on push to `main`

## Content

All presentation text lives in [`src/lib/data/euler.ts`](src/lib/data/euler.ts]