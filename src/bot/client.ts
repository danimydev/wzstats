import {
  ActivityType,
  Client,
  Events,
  GatewayIntentBits,
} from "npm:discord.js";
import * as meta from "./commands/meta.ts";
import * as subscribe from "./commands/subscribe.ts";
import * as unsubscribe from "./commands/unsubscribe.ts";
import * as help from "./commands/help.ts";

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.on("interactionCreate", (interaction) => {
  const isCommand = interaction.isCommand();
  if (isCommand) {
    switch (interaction.commandName) {
      case meta.command.name:
        meta.handler(interaction);
        break;

      case subscribe.command.name:
        subscribe.handler(interaction);
        break;

      case unsubscribe.command.name:
        unsubscribe.handler(interaction);
        break;

      case help.command.name:
        help.handler(interaction);
        break;

      default:
        break;
    }
  }
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  readyClient.user.setActivity({
    name: "📡 wzstats.gg",
    type: ActivityType.Custom,
  });
});

export default client;
