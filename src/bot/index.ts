import { Client, Events, GatewayIntentBits } from "npm:discord.js";
import config from "./config.ts";
import metaCommand, {
  buildFormattedWeapons,
  buildWeaponEmbeds,
} from "./commands/meta.ts";
import subscribeCommand from "./commands/subscribe.ts";
import unsubscribeCommand from "./commands/unsubscribe.ts";
import * as channelsRepository from "./channels/repository.ts";

const client = new Client({
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

Deno.cron("Run once every 12 hours", { hour: { every: 12 } }, async () => {
  console.log("Running cron job...");

  const ingestCommand = new Deno.Command(Deno.execPath(), {
    args: ["task", "ingest"],
    stdout: "piped",
    stdin: "piped",
    stderr: "piped",
  });

  const childProccess = ingestCommand.spawn();
  const { code, stderr, stdout, success } = await childProccess.output();

  const td = new TextDecoder();

  if (code === 0 && success) {
    console.log("Cron job ran successfully!");
    console.log(td.decode(stdout));
  } else {
    console.log("Cron job ran with errors!");
    console.log(td.decode(stderr));
  }
});

setInterval(async () => {
  if (client.isReady()) {
    const channelsId = (await channelsRepository.getChannels()).map((c) =>
      c.id
    );
    if (config.DEV_CHANNEL_ID) {
      channelsId.push(config.DEV_CHANNEL_ID);
    }
    const channelsPromise = channelsId.map((channelId) =>
      client.channels.fetch(channelId)
    );
    const textChannels = (await Promise.all(channelsPromise))
      .filter((channel) => channel !== null && channel.type === 0);
    const formattedWeapons = await buildFormattedWeapons();
    const messagesPromise = textChannels.map((channel) =>
      channel.send({
        content: "Warzone Meta",
        embeds: buildWeaponEmbeds(formattedWeapons.toSpliced(6)),
      })
    );
    await Promise.all(messagesPromise);
  }
}, 1000 * 60 * 60 * 24);
