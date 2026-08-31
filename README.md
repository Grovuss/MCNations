# MCNations Website

A modern, static website for the MCNations Minecraft nations server. Built with React, TypeScript, Tailwind CSS, and Vite.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

Requires Node.js 18+.

## Editable site config

Everything you'll need to update after launch lives in `src/config/site.ts`:

- `discordUrl` — the Discord invite link used in the nav, footer, and How to Join page.
- `serverAddressJava` / `serverAddressBedrock` / `bedrockPort` — server connection details on Home and How to Join.
- `mapUrl` — the live BlueMap URL. This is the single source of truth: the header nav, footer, and Map page button all read from here, so it only ever needs to change in one place.

  **Currently:** `http://play.mcnations.online:8147/...`, served over plain `http://`. Since the site itself deploys over `https://`, the map always opens in a new tab (`target="_blank"`) rather than being embedded — browsers block `http://` content inside an `https://` iframe ("mixed content"). If BlueMap is ever put behind a reverse proxy with TLS (Caddy, nginx, or Cloudflare), it could be embedded directly on the Map page instead, but that's a template change, not just a config edit.

Donation tiers are exported separately from the same file as `donationTiers` — an array of `{ name, price, blurb, url }`. Each renders as a card on the Donate page with a "Support MCN" button that opens the CraftingStore link in a new tab. Add, remove, reprice, or relink tiers by editing this array; the Donate page has no hardcoded tier content.

## Content that's intentionally left as a placeholder

- **Rules → Nations & Conflict** (`src/pages/Rules.tsx`) — holds space for MCNations' actual nation/war rules once those are finalized. Explicitly noted as a placeholder in the UI rather than filled with invented policy.

Everything else on the site (features, About copy, donation tiers and prices, rules text) reflects real, current information rather than placeholder content.

## Project structure

```
src/
  assets/          logo files
  components/      Navbar, Footer, Layout, PageTitle, shared UI (buttons, copy field)
  config/site.ts   central site configuration — map URL, Discord link, server address, donation tiers
  pages/           one file per route (Home, MapPage, Rules, HowToJoin, AboutUs, Donate)
```

Routing is handled by `react-router-dom` in `src/App.tsx`. Every page shares the same `Layout` (nav + footer).

## Deployment (GitHub + Vercel)

1. Push this project to a GitHub repository.
2. Import the repo in Vercel. Framework preset: **Vite**. Build command `npm run build`, output directory `dist` (Vercel usually detects both automatically).
3. `vercel.json` is already included with a rewrite rule so client-side routes (e.g. `/rules`, `/donate`) work on refresh and direct link.

No environment variables or secrets are required — the map URL, Discord link, and donation links are all plain values in `src/config/site.ts`.

## Notes

- The favicon (`public/favicon.png`) is generated from the crest mark on a dark background. Regenerate it from `src/assets/logo-mark.png` if the crest changes.
- Fonts (Cinzel for display, Inter for body) are loaded from Google Fonts in `index.html`.
- `prefers-reduced-motion` is respected globally (see `src/index.css`).
- The Rules page uses native `<details>`/`<summary>` elements for the accordion — no JS state or extra dependency needed, and it's keyboard/screen-reader accessible by default.
