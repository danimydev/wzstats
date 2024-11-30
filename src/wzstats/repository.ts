import * as v from "npm:valibot";
import config from "./config.ts";

const weaponSchema = v.object({
  id: v.string(),
  name: v.string(),
  type: v.string(),
});

const weaponsSchema = v.array(weaponSchema);

const tierListSchema = v.object({
  META: v.array(v.string()),
  A: v.array(v.string()),
  B: v.array(v.string()),
  C: v.array(v.string()),
  D: v.array(v.string()),
});

const tierListsSchema = v.object({
  rankedResurgence: tierListSchema,
  bo6: tierListSchema,
  bo6Zombies: tierListSchema,
  bo6Ranked: tierListSchema,
});

type TierLists = v.InferInput<typeof tierListsSchema>;
type TierListId = keyof TierLists;

export async function getWeapons() {
  const data = await Deno.readTextFile(config.WEAPONS_FILE_PATH);
  return v.parse(weaponsSchema, JSON.parse(data));
}

export async function getWeapon(id: string) {
  const weapons = await getWeapons();
  return weapons.find((weapon) => weapon.id === id);
}

export async function getTierLists() {
  const data = await Deno.readTextFile(config.TIER_LISTS_FILE_PATH);
  return v.parse(tierListsSchema, JSON.parse(data));
}

export async function getTierList(id: TierListId) {
  const tierLists = await getTierLists();
  return tierLists[id];
}
