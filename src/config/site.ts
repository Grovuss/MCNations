// Central configuration for MCNations.
// Edit the values below to update them site-wide.

export const site = {
  name: "MCNations",
  shortName: "MCN",
  headline: "Build Your Nation. Shape the World.",
  tagline: "A Minecraft nations server for building, diplomacy, and conquest.",

  // Server connection details
  serverAddressJava: "play.mcnations.online",
  serverAddressBedrock: "play.mcnations.online",
  bedrockPort: "25570",

  // Community
  discordUrl: "https://discord.gg/2Ph5Bd7Dqc",

  // Live world map (BlueMap). This is the single source of truth — the
  // header, footer, and Map page all read from here, so updating the
  // map link only ever needs to happen in this one place.
  //
  // Note: this URL is served over plain http://, while the site itself
  // deploys over https:// (Vercel). That's why it's opened in a new tab
  // rather than embedded in an <iframe> — browsers block http:// content
  // inside an https:// iframe ("mixed content"). Once BlueMap is served
  // over https:// (e.g. behind a Caddy/nginx/Cloudflare reverse proxy),
  // it could be embedded directly if that's ever wanted instead.
  mapUrl: "http://play.mcnations.online:8133",
};

export type SiteConfig = typeof site;

// Donation tiers shown on the Donate page. Each links straight to its
// CraftingStore package.
export const donationTiers = [
  {
    name: "Supporter",
    price: "$5",
    blurb: "Support MCN and receive the Supporter recognition rank in-game and in Discord.",
    url: "https://mcnations.craftingstore.net/package/1588308",
  },
  {
    name: "Contributor",
    price: "$25",
    blurb: "Show additional support for MCN and receive the Contributor recognition rank in-game and in Discord.",
    url: "https://mcnations.craftingstore.net/package/1588332",
  },
  {
    name: "Patron",
    price: "$50",
    blurb: "Become a Patron supporter and receive the Patron recognition rank in-game and in Discord.",
    url: "https://mcnations.craftingstore.net/package/1588335",
  },
];
