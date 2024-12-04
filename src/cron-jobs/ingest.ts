import * as weaponsRepository from "../bot/repositories/weapon.ts";
import * as tierListRepository from "../bot/repositories/tier-list.ts";

const WEAPONS_AND_TIER_LISTS_URL =
  "https://app.wzstats.gg/wz2/weapons/meta/weapons-and-tier-lists/?streamerProfileId=wzstats&weaponGames%5B%5D=mw3&weaponGames%5B%5D=mw2&weaponGames%5B%5D=bo6&addConversionKit=true&weaponAttributes%5B%5D=game&weaponAttributes%5B%5D=name&weaponAttributes%5B%5D=type&weaponAttributes%5B%5D=isNew&weaponAttributes%5B%5D=updateMW2&weaponAttributes%5B%5D=updateWZ2&weaponAttributes%5B%5D=displayType&weaponAttributes%5B%5D=sniperSupportRank";

type WzStatsWeapon = {
  id: string;
  name: string;
  type: string;
  game: "bo6" | "mw3" | "mw2";
};

type WzStatsTierListGame = {
  META: string[];
  A: string[];
  B: string[];
  C: string[];
  D: string[];
};

type WzStatsTierList = {
  streamerProfileId: string;
  rankedResurgence: WzStatsTierListGame;
  bo6: WzStatsTierListGame;
  bo6Zombies: WzStatsTierListGame;
  bo6Ranked: WzStatsTierListGame;
  createdAt: string;
  updatedAt: string;
};

export default async function ingest() {
  console.log("💾 Running ingest cron job...");

  console.log("Fetching data from wzstats.gg...");
  const response = await fetch(WEAPONS_AND_TIER_LISTS_URL);
  const { weapons, wzStatsTierList } = await response.json() as {
    weapons: WzStatsWeapon[];
    wzStatsTierList: WzStatsTierList;
  };
  console.log("Fetched data from wzstats.gg");

  const addWeaponPromises = weapons.map((weapon) =>
    weaponsRepository.addWeapon({
      ...weapon,
      imageUrl:
        `https://imagedelivery.net/BN5t48p9frV5wW3Jpe6Ujw/${weapon.id}/gunDisplayLoadouts`,
    })
  );

  console.log("Inserting data into Deno KV...");
  await Promise.all([
    ...addWeaponPromises,
    tierListRepository.addTierList({
      id: "rankedResurgence",
      category: "META",
      value: wzStatsTierList.rankedResurgence.META,
    }),
    tierListRepository.addTierList({
      id: "bo6",
      category: "META",
      value: wzStatsTierList.bo6.META,
    }),
    tierListRepository.addTierList({
      id: "bo6Zombies",
      category: "META",
      value: wzStatsTierList.bo6Zombies.META,
    }),
    tierListRepository.addTierList({
      id: "bo6Ranked",
      category: "META",
      value: wzStatsTierList.bo6Ranked.META,
    }),
  ]);

  console.log("Inserted data into Deno KV");

  console.log("🟢 Successfully ran ingest cron job");
}
