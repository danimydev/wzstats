import { CacheType, CommandInteraction } from "discord.js";
import {
  SlashCommandBuilder,
  SlashCommandStringOption,
} from "@discordjs/builders";
import * as weaponRepository from "../repositories/weapon.ts";
import * as tierListRepositoy from "../repositories/tier-list.ts";
import validateTierListId from "../utils/validate-tier-list-id.ts";
import validateTierListCategory from "../utils/validate-tier-list-category.ts";
import buildWeaponEmbed from "../utils/build-weapon-embed.ts";

export const command = new SlashCommandBuilder()
  .setName("meta")
  .setDescription("Provides information about the current CoD meta.")
  .addStringOption(
    new SlashCommandStringOption()
      .setName("game")
      .setDescription("The game you want to get tier information on")
      .setChoices([
        { name: "Warzone Resurgense", value: "rankedResurgence" },
        { name: "Black Ops 6", value: "bo6" },
        { name: "Black Ops 6 Zombies", value: "bo6Zombies" },
        { name: "Black Ops 6 Ranked", value: "bo6Ranked" },
      ])
      .setRequired(false),
  )
  .addStringOption(
    new SlashCommandStringOption()
      .setName("tier")
      .setDescription("The tier you want to get information on")
      .setChoices([
        { name: "Meta", value: "META" },
        { name: "A", value: "A" },
        { name: "B", value: "B" },
        { name: "C", value: "C" },
        { name: "D", value: "D" },
      ])
      .setRequired(false),
  );

export async function handler(interaction: CommandInteraction<CacheType>) {
  const gameCommandOption = interaction.options.get("game");
  const tierCommandOption = interaction.options.get("tier");
  const game = validateTierListId(String(gameCommandOption?.value));
  const tier = validateTierListCategory(String(tierCommandOption?.value));

  const tierList = await tierListRepositoy.getTierList(game, tier);

  if (!tierList) {
    return interaction.reply({
      content: "Hmmm no tier list was found",
    });
  }

  const weaponsPromise = tierList.value
    .map((weaponId) => weaponRepository.getWeapon(weaponId));

  const weapons = (await Promise.all(weaponsPromise)).filter((w) => w !== null);

  return interaction.reply({
    content: `> ${game.toUpperCase()} - ${tier.toUpperCase()}`,
    embeds: weapons.map(buildWeaponEmbed).slice(0, 6),
    ephemeral: true,
  });
}
