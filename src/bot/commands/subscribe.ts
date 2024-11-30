import { SlashCommandBuilder } from "npm:@discordjs/builders";
import { CacheType, CommandInteraction } from "npm:discord.js";
import * as channelsRepository from "../channels/repository.ts";

const command = new SlashCommandBuilder()
  .setName("subscribe")
  .setDescription("Subscribe this channel to wzstats daily message");

async function handler(interaction: CommandInteraction<CacheType>) {
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

export default {
  command,
  handler,
};
