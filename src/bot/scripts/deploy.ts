import { parseArgs } from "@std/cli/parse-args";
import { REST } from "@discordjs/rest";

import * as meta from "../commands/meta.ts";
import * as subscribe from "../commands/subscribe.ts";
import * as unsubscribe from "../commands/unsubscribe.ts";
import * as help from "../commands/help.ts";

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
  meta.command.toJSON(),
  subscribe.command.toJSON(),
  unsubscribe.command.toJSON(),
  help.command.toJSON(),
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

console.log(
  `Successfully reloaded ${data.length} application (/) commands.`,
  data.map((e) => e.name),
);
