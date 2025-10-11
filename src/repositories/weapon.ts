const kv = await Deno.openKv();

const BASE_KEY = "weapons";

export type Weapon = {
  id: string;
  name: string;
  type: string;
  game: "bo6" | "mw3" | "mw2";
  imageUrl: string;
};

export async function getWeapons() {
  const weaponsIterator = kv.list<Weapon>({ prefix: [BASE_KEY] });
  const weapons = [];
  for await (const e of weaponsIterator) {
    weapons.push(e.value);
  }
  return weapons;
}

export async function getWeapon(id: Weapon["id"]) {
  return (await kv.get<Weapon>([BASE_KEY, id])).value;
}

export async function saveWeapon(weapon: Weapon) {
  await kv.set([BASE_KEY, weapon.id], weapon);
}

export async function deleteWeapons() {
  const weapons = await getWeapons();
  for (let i = 0; i < weapons.length; i++) {
    await kv.delete([BASE_KEY, weapons[i].id]);
  }
}
