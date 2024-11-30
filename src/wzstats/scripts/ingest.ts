import config from "../config.ts";

console.log("Running ingest...");
console.log(
  `Fetching weapons and tier lists from ${config.WEAPONS_AND_TIER_LISTS_URL}`,
);

const response = await fetch(config.WEAPONS_AND_TIER_LISTS_URL);
const data = await response.json();

console.log(`Writing weapons file at ${config.WEAPONS_FILE_PATH}`);

const ingestWeapons = Deno.writeTextFile(
  config.WEAPONS_FILE_PATH,
  JSON.stringify(data.weapons),
);

console.log(`Writing tier lists file at ${config.TIER_LISTS_FILE_PATH}`);

const ingestTierLists = Deno.writeTextFile(
  config.TIER_LISTS_FILE_PATH,
  JSON.stringify(data.wzStatsTierList),
);

await Promise.all([ingestTierLists, ingestWeapons]);

console.log("Successfully ran ingest!");
