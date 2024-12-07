import { TierList } from "../repositories/tier-list.ts";

export default function validateTierListCategory(
  category: string,
): TierList["category"] {
  const tierListCategories = ["META", "A", "B", "C", "D"];
  if (!tierListCategories.includes(category)) {
    return "META";
  }
  return category as TierList["category"];
}
