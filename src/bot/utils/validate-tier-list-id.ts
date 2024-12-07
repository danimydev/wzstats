import { TierList } from "../repositories/tier-list.ts";

export default function validateTierListId(id: string): TierList["id"] {
  const tierListCategories = [
    "rankedResurgence",
    "bo6",
    "bo6Zombies",
    "bo6Ranked",
  ];
  if (!tierListCategories.includes(id)) {
    return "rankedResurgence";
  }
  return id as TierList["id"];
}
