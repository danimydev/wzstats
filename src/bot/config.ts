const APPLICATION_ID = Deno.env.get("APPLICATION_ID") || "";
const TOKEN = Deno.env.get("DISCORD_BOT_TOKEN") || "";
const DEV_CHANNEL_ID = Deno.env.get("DEV_CHANNEL_ID");
const DISCORD_INSTALL_URL =
  `https://discord.com/api/oauth2/authorize?client_id=${APPLICATION_ID}&permissions=380104792064&scope=bot%20applications.commands`;

export default {
  APPLICATION_ID,
  TOKEN,
  DEV_CHANNEL_ID,
  DISCORD_INSTALL_URL,
};
