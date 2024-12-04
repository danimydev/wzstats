const kv = await Deno.openKv();

const BASE_KEY = "weapons";

export type Weapon = {
  id: string;
  name: string;
  type: string;
  game: "bo6" | "mw3" | "mw2";
  imageUrl: string;
};

export async function getWeapon(id: string) {
  return (await kv.get<Weapon>([BASE_KEY, id])).value;
}

export async function addWeapon(weapon: Weapon) {
  await kv.set([BASE_KEY, weapon.id], weapon);
}
