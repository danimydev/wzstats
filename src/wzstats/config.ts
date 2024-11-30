const WEAPONS_AND_TIER_LISTS_URL =
  "https://app.wzstats.gg/wz2/weapons/meta/weapons-and-tier-lists/?streamerProfileId=wzstats&weaponGames%5B%5D=mw3&weaponGames%5B%5D=mw2&weaponGames%5B%5D=bo6&addConversionKit=true&weaponAttributes%5B%5D=game&weaponAttributes%5B%5D=name&weaponAttributes%5B%5D=type&weaponAttributes%5B%5D=isNew&weaponAttributes%5B%5D=updateMW2&weaponAttributes%5B%5D=updateWZ2&weaponAttributes%5B%5D=displayType&weaponAttributes%5B%5D=sniperSupportRank";
const STATIC_DATA_DIRNAME = "static-data";
const FILE_NAMES = { WEAPONS: "weapons", TIER_LISTS: "tier-lists" };
const WEAPONS_FILE_PATH =
  `src/wzstats/${STATIC_DATA_DIRNAME}/${FILE_NAMES.WEAPONS}.json`;
const TIER_LISTS_FILE_PATH =
  `src/wzstats/${STATIC_DATA_DIRNAME}/${FILE_NAMES.TIER_LISTS}.json`;

export default {
  WEAPONS_AND_TIER_LISTS_URL,
  WEAPONS_FILE_PATH,
  TIER_LISTS_FILE_PATH,
};
