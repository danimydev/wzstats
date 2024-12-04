import { CacheType, CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import * as channelsRepository from "../repositories/channel.ts";

export const command = new SlashCommandBuilder()
  .setName("subscribe")
  .setDescription("Subscribe this channel to wzstats daily message");

export async function handler(interaction: CommandInteraction<CacheType>) {
  const channel = interaction.channel;
  if (!channel) {
    return interaction.reply("No channel id found");
  }
  await channelsRepository.addChannel({
    id: channel.id,
    type: channel.type,
  });
  return interaction.reply("Channel subscribed 🟢");
}
