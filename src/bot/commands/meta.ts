import { EmbedBuilder, SlashCommandBuilder } from "npm:@discordjs/builders";
import { CacheType, CommandInteraction } from "npm:discord.js";
import * as wzstatsRepository from "../../wzstats/repository.ts";

// gold, silver, bronze
const colorMap = [15844367, 9807270, 11027200];

const command = new SlashCommandBuilder()
  .setName("meta")
  .setDescription("Provides information about the current CoD meta.");

async function handler(interaction: CommandInteraction<CacheType>) {
  const tierLists = await wzstatsRepository.getTierLists();
  const weapons = await wzstatsRepository.getWeapons();
  const formattedWeapons = tierLists.rankedResurgence.META
    .map((weaponId) => {
      const weapon = weapons.find((w) => w.id === weaponId);
      if (weapon) {
        return {
          ...weapon,
          imageUrl:
            `https://imagedelivery.net/BN5t48p9frV5wW3Jpe6Ujw/${weapon.id}/gunDisplayLoadouts`,
        };
      }
    })
    .filter((w) => typeof w !== "undefined");

  return interaction.reply({
    content: "Warzone Meta",
    embeds: buildWeaponEmbeds(formattedWeapons.toSpliced(6)),
  });
}

export async function buildFormattedWeapons() {
  const tierLists = await wzstatsRepository.getTierLists();
  const weapons = await wzstatsRepository.getWeapons();
  return tierLists.rankedResurgence.META
    .map((weaponId) => {
      const weapon = weapons.find((w) => w.id === weaponId);
      if (weapon) {
        return {
          ...weapon,
          imageUrl:
            `https://imagedelivery.net/BN5t48p9frV5wW3Jpe6Ujw/${weapon.id}/gunDisplayLoadouts`,
        };
      }
    })
    .filter((w) => typeof w !== "undefined");
}

export function buildWeaponEmbeds(weapons: {
  imageUrl: string;
  type: string;
  id: string;
  name: string;
}[]) {
  return weapons
    .map((weapon, index) => ({
      ...weapon,
      color: colorMap[Math.floor(index / 2)],
    }))
    .map(buildWeaponEmbed);
}

function buildWeaponEmbed(weapon: {
  imageUrl: string;
  type: string;
  id: string;
  name: string;
  color: number;
}) {
  const embed = new EmbedBuilder()
    .setTitle(weapon.name)
    .setFooter({ text: weapon.type })
    .setThumbnail(weapon.imageUrl)
    .setColor(weapon.color);

  return embed;
}

export default {
  command,
  handler,
};
