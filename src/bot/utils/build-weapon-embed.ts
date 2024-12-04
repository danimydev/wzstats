import { EmbedBuilder } from "@discordjs/builders";
import { Weapon } from "../repositories/weapon.ts";

export default function buildWeaponEmbed(weapon: Weapon) {
  return new EmbedBuilder()
    .setTitle(weapon.name)
    .setFooter({ text: weapon.type })
    .setThumbnail(weapon.imageUrl);
}
