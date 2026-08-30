// Central configuration for MCNations.
// Edit the values below to update them site-wide.

export const site = {
  name: "MCNations",
  shortName: "MCN",
  tagline: "Build your nation. Shape the world.",

  // Server connection details
  serverAddressJava: "play.mcnations.online",
  serverAddressBedrock: "play.mcnations.online",
  bedrockPort: "25590",

  // Community
  discordUrl: "https://discord.gg/2Ph5Bd7Dqc",

  // Live map. Set `mapUrl` to a BlueMap/Dynmap URL to enable the embed
  // and the "Open Full Map" button. Leave as `null` to show the
  // placeholder state instead.
  mapUrl: null as string | null,
  // If the map can be embedded in an <iframe>, set this to true.
  // Some map hosts disallow iframe embedding and require opening in
  // a new tab instead.
  mapEmbeddable: false,

  // Server status API. Point this at a live status endpoint
  // (e.g. an mcsrvstat.us proxy or a self-hosted endpoint) that
  // returns JSON shaped like:
  //   { online: boolean, players: { online: number, max: number } }
  // Leave as `null` to keep the UI in its "not connected" state
  // rather than showing fabricated numbers.
  statusApiUrl: null as string | null,
};

export type SiteConfig = typeof site;
