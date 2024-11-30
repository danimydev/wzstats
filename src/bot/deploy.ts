import { REST } from "npm:@discordjs/rest";
import config from "./config.ts";
import metaCommand from "./commands/meta.ts";

const url = `applications/${config.APPLICATION_ID}/commands`;
const rest = new REST().setToken(config.TOKEN);

const commands = [
  metaCommand.command.toJSON(),
];

console.log(`Started refreshing ${commands.length} application (/) commands.`);

const data = await rest.put(
  `/${url}`,
  { body: commands },
) as {
  id: string;
  application_id: string;
  version: string;
  type: number;
  name: string;
  description: string;
  dm_permission: boolean;
  integration_types: number[];
  nsfw: boolean;
}[];

console.log(data.map((e) => e.name));
console.log(`Successfully reloaded ${data.length} application (/) commands.`);
