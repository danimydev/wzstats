import { EmbedBuilder } from "@discordjs/builders";
import { Weapon } from "../../repositories/weapon.ts";

const colors = [15844367, 12370112, 11027200];

export default function buildWeaponEmbed(weapon: Weapon, index: number) {
  return new EmbedBuilder()
    .setTitle(weapon.name)
    .setThumbnail(weapon.imageUrl)
    .addFields(
      {
        name: `#${index + 1}`,
        value: index % 2 === 0 ? "`Long range`" : "`Short range`",
        inline: true,
      },
      { name: "Type", value: `\`${weapon.type}\``, inline: true },
    )
    .setColor(colors[Math.floor(index / 2)]);
}
