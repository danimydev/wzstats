import { parseArgs } from "jsr:@std/cli/parse-args";
import { REST } from "npm:@discordjs/rest";
import metaCommand from "./commands/meta.ts";
import subscribeCommand from "./commands/subscribe.ts";
import unsubscribeCommand from "./commands/unsubscribe.ts";

const { id, token } = parseArgs(Deno.args, {
  string: ["id", "token"],
});

if (!id) {
  throw new Error("app id is required");
}

if (!token) {
  throw new Error("token is required");
}

const url = `applications/${id}/commands`;
const rest = new REST().setToken(token);

const commands = [
  metaCommand.command.toJSON(),
  subscribeCommand.command.toJSON(),
  unsubscribeCommand.command.toJSON(),
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
