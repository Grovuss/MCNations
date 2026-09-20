// Central config.

export const site = {
  name: "MCNations",
  shortName: "MCN",
  headline: "Build Your Nation. Shape the World.",
  tagline: "A Minecraft nations server for building, diplomacy, and conquest.",

  // Server connection details
  serverAddressJava: "play.mcnations.online",
  serverAddressBedrock: "play.mcnations.online",
  bedrockPort: "25565",

  // Community
  discordUrl: "https://discord.gg/2Ph5Bd7Dqc",

  // BlueMap
  mapUrl: "http://play.mcnations.online:8133",
};

export type SiteConfig = typeof site;

// CraftingStore
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
