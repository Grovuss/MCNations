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
  assets/           logo files
  components/       Navbar, Footer, Layout, PageTitle, shared UI (buttons, copy field)
    admin/          LoginForm, MonthlyCreatorEditor, ReferralManager (used only by /admin)
  config/site.ts    central site configuration — map URL, Discord link, server address, donation tiers
  lib/
    firebase.ts     Firebase client init (auth + Firestore), used only by /admin
    useAdminAuth.ts login state + admin custom-claim check
  pages/            one file per route (Home, MapPage, Rules, HowToJoin, AboutUs, Donate, AdminPage)
api/
  redirect.ts       Vercel serverless function behind /c/:slug — see "Admin dashboard & referral links" above
scripts/
  set-admin-claim.mjs   one-time script to grant the admin custom claim (see above)
firestore.rules     Firestore security rules to paste into the Firebase console
```

Routing is handled by `react-router-dom` in `src/App.tsx`. Every public page shares the same `Layout` (nav + footer); `/admin` deliberately does not, and is lazy-loaded so the Firebase SDK it needs never ships to regular visitors. The homepage's Monthly Creator section also avoids the Firebase SDK — it reads `config/home` via a plain `fetch` against the Firestore REST API instead, so the only place that actually downloads Firebase's client SDK is `/admin` itself.

## Deployment (GitHub + Vercel)

1. Push this project to a GitHub repository.
2. Import the repo in Vercel. Framework preset: **Vite**. Build command `npm run build`, output directory `dist` (Vercel usually detects both automatically).
3. `vercel.json` is already included with a rewrite rule so client-side routes (e.g. `/rules`, `/donate`) work on refresh and direct link.

No environment variables are required for the base site (Home, Map, Rules, How to Join, About, Donate). The admin dashboard and referral links **do** require environment variables — see the next section.

## Admin dashboard & referral links setup

The site has a hidden `/admin` page (not linked anywhere — reachable only if you go directly to `https://mcnations.online/admin`) for two things:

1. **Monthly Creator** — set who's featured on the homepage, or turn the section off entirely.
2. **Referral links** — create a `mcnations.online/c/<creator-name>` link per creator. Visiting it posts a message to a Discord webhook (`CreatorName` + current unique-referral count), then redirects the visitor to that creator's Discord invite.

This needs a Firebase project (free tier is enough) for login + storage, and a Discord webhook for notifications. Here's the full setup, start to finish.

> **Note on "subdomain":** you asked for `mcnations.online/admin`, which is what's built — a path on the same site, gated behind login. A true subdomain (`admin.mcnations.online`) would mean a separate DNS record and a second Vercel deployment for no real security benefit, since the page is already invisible to anyone without the password. If you do want a literal subdomain later, this same `AdminPage` component could be moved into its own small Vite app deployed separately — just say the word.

### 1. Create a Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com) → **Add project** → give it a name (e.g. `mcnations`) → finish the wizard (Google Analytics is optional, not needed here).
2. In the project, go to **Build → Firestore Database → Create database**. Choose **production mode** and pick a region close to your players.
3. Go to **Build → Authentication → Get started**. Under **Sign-in method**, enable **Email/Password**.
4. **Important:** in Authentication → **Settings → User actions**, uncheck **"Enable create (sign up)"** while leaving sign-in enabled. This stops anyone from registering a new account even by calling the Firebase SDK directly from a browser console — only accounts you create manually in the console can ever sign in.

### 2. Create the one admin account

In Authentication → **Users → Add user**, enter the email and password you want to log into `/admin` with. That's the only account that will ever exist, by design — there's no sign-up form anywhere in the app.

### 3. Get the web app config (public values)

In **Project settings → General → Your apps**, click the web icon (`</>`) to register a web app (any nickname). It'll show a `firebaseConfig` object — copy those values into these Vercel environment variables (Project Settings → Environment Variables):

```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

These are safe to expose in the client bundle — they identify the project, they aren't secrets. Security comes from the Firestore rules in step 5 and the login screen, not from hiding these.

### 4. Get the service account key (secret values)

In **Project settings → Service accounts**, click **Generate new private key** — downloads a JSON file. From it, set these Vercel environment variables:

```
FIREBASE_PROJECT_ID       = project_id from the JSON
FIREBASE_CLIENT_EMAIL     = client_email from the JSON
FIREBASE_PRIVATE_KEY      = private_key from the JSON (keep the \n sequences as literal text, don't convert to real line breaks)
```

These are used only by the server-side `/api/redirect` function (the `/c/<slug>` handler) via the Firebase Admin SDK — never sent to the browser. **Don't** prefix them with `VITE_`, or they'd end up in the public client bundle.

Also generate a random string for hashing visitor IPs (so raw IPs are never stored):

```
REFERRAL_SALT = <output of: openssl rand -hex 32>
```

### 5. Set the Firestore security rules

In **Firestore Database → Rules**, replace the contents with what's in `firestore.rules` in this repo, then **Publish**. Summary of what it does:
- `config/home` (the Monthly Creator setting) is publicly readable — the homepage reads it directly — but only the admin can write it.
- `referrals/*` (the referral links and their counts) can only be read or written by the signed-in admin (via the dashboard) or the server-side redirect function (via the Admin SDK, which bypasses rules entirely). A random visitor's browser has no way to read or write them directly.

### 6. Grant the admin custom claim

The dashboard and rules check for an `admin: true` custom claim on the user, not just "is logged in" — this means even if Firebase Auth's sign-up were ever accidentally re-enabled, a new account still couldn't touch anything. Firebase Console can't set custom claims directly, so run the included script once:

```bash
cp .env.example .env
# fill in FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY in .env
npm install
node scripts/set-admin-claim.mjs your-admin-email@example.com
```

If you ever change the admin's password or create a replacement account, re-run this script for the new account.

### 7. Create a Discord webhook

In your Discord server: **Server Settings → Integrations → Webhooks → New Webhook**. Pick the channel you want referral notifications posted to, then **Copy Webhook URL**. Set it as:

```
DISCORD_WEBHOOK_URL = <the copied URL>
```

### 8. Redeploy

Once all the environment variables above are set in Vercel, redeploy (push a commit, or use Vercel's "Redeploy" button). Visit `/admin`, log in, and you should see the dashboard.

### How referral links work

- Admin enters a **creator name** and a **Discord link** (where that specific link should send people — this can be the same server invite every time, or a creator-specific one).
- A URL slug is auto-generated from the name (editable before creating) — the link is `mcnations.online/c/<slug>`.
- Visiting that link: looks up the creator server-side, hashes the visitor's IP (never stores the raw IP) to check if they're a new unique visitor, increments the count in Firestore if so, posts `**CreatorName**\nTotal unique referral count: **N**` to your Discord webhook, then 302-redirects to that creator's Discord link.
- Known bots/crawlers (Discord's own link-preview fetcher, Slack, Twitter, etc.) are detected by user agent and skipped from counting/webhook — otherwise just *pasting* a referral link in a chat would inflate the count, since Discord fetches the URL to build a preview embed.
- "Unique" is per hashed IP address. This is a reasonable proxy, not perfect — people sharing an IP (school, office, some mobile carriers/VPNs) will only count once; someone changing networks or using a VPN could count more than once. There's no cookie-based tracking involved.

## Notes

- The favicon (`public/favicon.png`) is generated from the crest mark on a dark background. Regenerate it from `src/assets/logo-mark.png` if the crest changes.
- Fonts (Cinzel for display, Inter for body) are loaded from Google Fonts in `index.html`.
- `prefers-reduced-motion` is respected globally (see `src/index.css`).
- The Rules page uses native `<details>`/`<summary>` elements for the accordion — no JS state or extra dependency needed, and it's keyboard/screen-reader accessible by default.
