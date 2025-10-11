import { CacheType, CommandInteraction } from "discord.js";
import {
  EmbedBuilder,
  SlashCommandBuilder,
  SlashCommandStringOption,
} from "@discordjs/builders";
import * as meta from "./meta.ts";
import * as subscribe from "./subscribe.ts";
import * as unsubscribe from "./unsubscribe.ts";

export const command = new SlashCommandBuilder()
  .setName("help")
  .setDescription("Get information about wzstats and its features")
  .addStringOption(
    new SlashCommandStringOption()
      .setName("command")
      .setDescription("The command name you want to get help on")
      .setChoices([
        { name: meta.command.name, value: meta.command.name },
        { name: subscribe.command.name, value: subscribe.command.name },
        { name: unsubscribe.command.name, value: unsubscribe.command.name },
      ]),
  );

export function handler(interaction: CommandInteraction<CacheType>) {
  const commandOption = interaction.options.get("command");

  if (!commandOption || !commandOption.value) {
    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Overview")
          .setDescription(
            `
            > **Helpers**
            > \`/${command.name}\` - ${command.description}
            > \`/${command.name} <command>\` - Shows command information

            > **Commands**
            > \`/${meta.command.name}\` - ${meta.command.description}
            > \`/${subscribe.command.name}\` - ${subscribe.command.description}
            > \`/${unsubscribe.command.name}\` - ${unsubscribe.command.description}

            > **Support**
            > :link: Website: https://wzstats.gg
            > :link: Discord Server: https://discord.gg/a5VAfsVr
            > :link: GitHub Repository: https://github.com/danimydev/wzstats
            `,
          ),
      ],
      ephemeral: true,
    });
  }

  const commandOverviewEmbed = new EmbedBuilder()
    .setTitle("Command Information");

  switch (commandOption.value) {
    case meta.command.name:
      commandOverviewEmbed.setDescription(
        `
        > **Usage**
        > \`/${meta.command.name}\`
        > \`/${meta.command.name} <game> - defaults to Warzone Resurgence\`
        > \`/${meta.command.name} <game> <tier> - defaults to META\`

        > **Description**
        > ${meta.command.description}
        `,
      );
      break;

    case subscribe.command.name:
      commandOverviewEmbed.setDescription(
        `
        > **Usage**
        > \`/${subscribe.command.name}\`

        > **Description**
        > ${subscribe.command.description}
        `,
      );
      break;

    case unsubscribe.command.name:
      commandOverviewEmbed.setDescription(
        `
        > **Usage**
        > \`/${unsubscribe.command.name}\`

        > **Description**
        > ${unsubscribe.command.description}
        `,
      );
      break;

    default:
      commandOverviewEmbed.setTitle(":red_circle: Command / Feature not found")
        .setColor([219, 59, 59]).setDescription(
          `> There's no command called \`/${commandOption.value}\``,
        );
      break;
  }

  return interaction.reply({
    embeds: [commandOverviewEmbed],
    ephemeral: true,
  });
}
