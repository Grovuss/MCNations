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

Almost everything you'll need to update after launch lives in one file:

**`src/config/site.ts`**
- `discordUrl` — the Discord invite link used across the nav, home page, and footer
- `serverAddressJava` / `serverAddressBedrock` / `bedrockPort` — server connection details shown on Home and the How to Join page
- `mapUrl` — set this once a BlueMap/Dynmap (or similar) instance is live. Leave `null` to keep the polished "map coming soon" placeholder on the Map page.
- `mapEmbeddable` — set to `true` if the map host allows being embedded in an `<iframe>`; otherwise the Map page just links out via an "Open Full Map" button.
- `statusApiUrl` — point this at a live server-status JSON endpoint (`{ online, players: { online, max } }`) to enable the real player-count pill on Home. Left as `null` by default rather than showing fake numbers.

## Content that's intentionally left as a placeholder

- **Rules → Nations** (`src/pages/Rules.tsx`) — holds space for MCNations' actual nation/war rules.
- **About Us → "The team behind MCNations"** (`src/pages/AboutUs.tsx`) — reserved for real staff bios once you're ready to publish them.
- **Donate → Supporter ranks** (`src/pages/Donate.tsx`) — three tier cards (Supporter / Contributor / Patron) with no prices or payment links wired up. Rename, price, and link these once donation processing is set up. No payment link should be added without also linking real Discord role/rank automation, since the page promises supporter ranks are the only benefit.

## Project structure

```
src/
  assets/          logo files
  components/      Navbar, Footer, Layout, shared UI (buttons, section headings, copy field, server status)
  config/site.ts   central site configuration (see above)
  pages/           one file per route (Home, MapPage, Rules, HowToJoin, AboutUs, Donate)
```

Routing is handled by `react-router-dom` in `src/App.tsx`. Every page shares the same `Layout` (nav + footer).

## Deployment (GitHub + Vercel)

1. Push this project to a GitHub repository.
2. Import the repo in Vercel. Framework preset: **Vite**. Build command `npm run build`, output directory `dist` (Vercel usually detects both automatically).
3. `vercel.json` is already included with a rewrite rule so client-side routes (e.g. `/rules`, `/donate`) work on refresh and direct link.

No environment variables are required for the base site. If you wire up a live status API or map URL, those are plain config values in `src/config/site.ts`, not secrets — set them directly in code.

## Notes

- The favicon (`public/favicon.png`) is generated from the crest mark on a dark background. Regenerate it from `src/assets/logo-mark.png` if the crest changes.
- Fonts (Cinzel for display, Inter for body) are loaded from Google Fonts in `index.html`.
- `prefers-reduced-motion` is respected globally (see `src/index.css`).
