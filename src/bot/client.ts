import { Client, Events, GatewayIntentBits } from "npm:discord.js";
import config from "./config.ts";
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
      case "meta":
        meta.handler(interaction);
        break;

      case "subscribe":
        subscribe.handler(interaction);
        break;

      case "unsubscribe":
        unsubscribe.handler(interaction);
        break;

      case "help":
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
    name: "Call of Duty Warzone",
    type: 0,
  });
});

client.login(config.TOKEN);

export default client;
