const kv = await Deno.openKv();

const BASE_KEY = "tier_lists";

type TierListId = "rankedResurgence" | "bo6" | "bo6Zombies" | "bo6Ranked";
type TierListCategory = "META" | "A" | "B" | "C" | "D";

export type TierList = {
  id: TierListId;
  category: TierListCategory;
  value: string[];
};

export async function getTierList(
  id: TierList["id"],
  category: TierList["category"],
) {
  return (await kv.get<TierList>([BASE_KEY, id, category])).value;
}

export async function addTierList(tierList: TierList) {
  await kv.set([BASE_KEY, tierList.id, tierList.category], tierList);
}
