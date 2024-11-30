const APPLICATION_ID = "1312041573483151400";
const PERMISIONS_BITS = "380104792064";
//https://discord.com/api/oauth2/authorize?client_id=1312041573483151400&permissions=380104792064&scope=bot%20applications.commands
const DISCORD_INSTALL_URL =
  `https://discord.com/api/oauth2/authorize?client_id=${APPLICATION_ID}&permissions=${PERMISIONS_BITS}&scope=bot%20applications.commands`;
const PUBLIC_KEY =
  "6f1543d43ec33e4669dd4141476b25827c7ff3ba9ee025e50a11ba2b84b99213";
const TOKEN = Deno.env.get("DISCORD_BOT_TOKEN") || "";

export default {
  DISCORD_INSTALL_URL,
  APPLICATION_ID,
  PUBLIC_KEY,
  TOKEN,
};
