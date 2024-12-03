import { Client, Events, GatewayIntentBits } from "npm:discord.js";

import config from "./config.ts";

import metaCommand from "./commands/meta.ts";
import subscribeCommand from "./commands/subscribe.ts";
import unsubscribeCommand from "./commands/unsubscribe.ts";

export const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.on("interactionCreate", (interaction) => {
  const isCommand = interaction.isCommand();
  if (isCommand) {
    switch (interaction.commandName) {
      case "meta":
        metaCommand.handler(interaction);
        break;

      case "subscribe":
        subscribeCommand.handler(interaction);
        break;

      case "unsubscribe":
        unsubscribeCommand.handler(interaction);
        break;

      default:
        break;
    }
  }
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  readyClient.user.setActivity({
    name: "Call of Duty Warzone",
    type: 0,
  });
});

client.login(config.TOKEN);
