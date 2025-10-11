const kv = await Deno.openKv();

const BASE_KEY = "tier_lists";

type TierListId = "rankedResurgence" | "bo6" | "bo6Zombies" | "bo6Ranked";
type TierListCategory = "META" | "A" | "B" | "C" | "D";

export type TierList = {
  id: TierListId;
  category: TierListCategory;
  value: string[];
};

export async function getTierLists() {
  const tierListsIterator = kv.list<TierList>({ prefix: [BASE_KEY] });
  const tierLists = [];
  for await (const e of tierListsIterator) {
    tierLists.push(e.value);
  }
  return tierLists;
}

export async function getTierList(
  id: TierList["id"],
  category: TierList["category"],
) {
  return (await kv.get<TierList>([BASE_KEY, id, category])).value;
}

export async function saveTierList(tierList: TierList) {
  await kv.set([BASE_KEY, tierList.id, tierList.category], tierList);
}

export async function deleteTierLists() {
  await kv.delete([BASE_KEY]);
}
