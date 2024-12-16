const APPLICATION_ID = Deno.env.get("APPLICATION_ID") || "";
const TOKEN = Deno.env.get("DISCORD_BOT_TOKEN") || "";
const DISCORD_INSTALL_URL =
  `https://discord.com/api/oauth2/authorize?client_id=${APPLICATION_ID}&permissions=380104792064&scope=bot%20applications.commands`;

export default {
  APPLICATION_ID,
  TOKEN,
  DISCORD_INSTALL_URL,
};
