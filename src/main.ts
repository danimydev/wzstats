import { client } from "./bot/index.ts";
import config from "./bot/config.ts";
import * as channelsRepository from "./bot/channels/repository.ts";
import {
  buildFormattedWeapons,
  buildWeaponEmbeds,
} from "./bot/commands/meta.ts";

import ingestWzStats from "./wzstats/ingest.ts";

client.login(config.TOKEN);

Deno.cron("Ingest from wzstats", { minute: { every: 1 } }, async () => {
  console.log("Running cron job...");
  await ingestWzStats();
  console.log("Cron job ran successfully!");
});

Deno.cron("Daily meta post", { minute: { every: 1 } }, async () => {
  console.log("Running cron job...");
  console.log("Running daily meta post...");
  if (client.isReady()) {
    console.log("Client is ready!");
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
    const messagesPromise = textChannels.map((channel) => {
      console.log(`Sending message to channel ${channel.id}`, {
        id: channel.id,
        name: channel.name,
        type: channel.type,
      });
      return channel.send({
        content: "Warzone Meta",
        embeds: buildWeaponEmbeds(formattedWeapons.toSpliced(6)),
      })
    });
    await Promise.all(messagesPromise);
  }

  return console.log("Cron job ran successfully!");
});

Deno.serve(() => {
  return new Response("Hello World - wzstats");
});
