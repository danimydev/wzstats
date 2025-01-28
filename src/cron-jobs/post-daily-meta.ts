import { ChannelType } from "discord.js";
import client from "../bot/client.ts";
import * as channelRepository from "../repositories/channel.ts";
import * as tierListRepositoy from "../repositories/tier-list.ts";
import * as weaponRepository from "../repositories/weapon.ts";
import buildWeaponEmbed from "../bot/utils/build-weapon-embed.ts";

export default async function postDailyMeta() {
  console.log("📤 Running post daily meta cron job...");
  if (!client.isReady()) {
    console.warn("Client was not ready");
    return;
  }

  console.log("Getting subscribed channels id...");
  const channelsId = (await channelRepository.getChannels()).map((c) => c.id);

  const channelsPromise = channelsId.map((channelId) =>
    client.channels.fetch(channelId)
  );

  console.log("Getting actual text channels...");
  const textChannels = (await Promise.all(channelsPromise))
    .filter((channel) =>
      channel !== null && channel.type === ChannelType.GuildText
    );

  if (textChannels.length === 0) {
    console.log("No subscribe text channels");
    return;
  }

  console.log("Getting ranked resurgense meta tier list...");
  const tierList = await tierListRepositoy.getTierList(
    "rankedResurgence",
    "META",
  );

  if (!tierList) {
    return;
  }

  const weaponsPromise = tierList.value
    .map((weaponId) => weaponRepository.getWeapon(weaponId));

  const weapons = (await Promise.all(weaponsPromise)).filter((w) => w !== null)
    .filter((w) => w.game === "bo6").slice(0, 6);

  const weaponsEmbed = weapons.map(buildWeaponEmbed);

  const messagesPromise = textChannels.map((channel) =>
    channel.send({
      content: "Warzone Meta",
      embeds: weaponsEmbed,
    })
  );

  console.log("Sending message to all text and subscribed channels...");
  await Promise.all(messagesPromise);
  console.log("🟢  Successfully ran post daily meta cron job");
}
