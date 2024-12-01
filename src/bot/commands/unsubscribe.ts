import { CacheType, CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "npm:@discordjs/builders";

import * as channelsRepository from "../channels/repository.ts";

const command = new SlashCommandBuilder()
  .setName("unsubscribe")
  .setDescription("Unsubscribe this channel to wzstats daily message");

async function handler(interaction: CommandInteraction<CacheType>) {
  const channel = interaction.channel;
  if (!channel) {
    return interaction.reply("No channel id found");
  }
  await channelsRepository.deleteChannel(channel.id);
  return interaction.reply("Channel unsubscribed 🔴");
}

export default {
  command,
  handler,
};
