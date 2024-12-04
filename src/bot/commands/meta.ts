import { CacheType, CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import * as weaponRepository from "../repositories/weapon.ts";
import * as tierListRepositoy from "../repositories/tier-list.ts";
import buildWeaponEmbed from "../utils/build-weapon-embed.ts";

export const command = new SlashCommandBuilder()
  .setName("meta")
  .setDescription("Provides information about the current CoD meta.");

export async function handler(interaction: CommandInteraction<CacheType>) {
  const tierList = await tierListRepositoy.getTierList(
    "rankedResurgence",
    "META",
  );

  if (!tierList) {
    return interaction.reply({
      content: "Hmmm no meta was found",
    });
  }

  const weaponsPromise = tierList.value
    .map((weaponId) => weaponRepository.getWeapon(weaponId));

  const weapons = (await Promise.all(weaponsPromise)).filter((w) => w !== null)
    .filter((w) => w.game === "bo6");

  const weaponsEmbed = weapons.map(buildWeaponEmbed).slice(0, 6);

  return interaction.reply({ embeds: weaponsEmbed });
}
