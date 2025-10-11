import { CacheType, CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import * as channelsRepository from "../../repositories/channel.ts";

export const command = new SlashCommandBuilder()
  .setName("unsubscribe")
  .setDescription("Unsubscribe this channel to wzstats daily message");

export async function handler(interaction: CommandInteraction<CacheType>) {
  const channel = interaction.channel;
  if (!channel) {
    return interaction.reply("No channel id found");
  }
  await channelsRepository.deleteChannel(channel.id);
  return interaction.reply("Channel unsubscribed 🔴");
}
