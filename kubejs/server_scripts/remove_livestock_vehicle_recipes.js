const DRAGNLIVESTOCK_DYE_COLORS = [
    "white", "orange", "magenta", "light_blue",
    "yellow", "lime", "pink", "gray",
    "light_gray", "cyan", "purple", "blue",
    "brown", "green", "red", "black",
];

const DRAGNLIVESTOCK_SPECIAL_BLANKET_PREFIXES = [
    "american", "autumn", "elderberry", "peach",
    "spring", "summer", "winter", "pride",
    "lesbian", "bi", "nonbinary", "trans",
];

const DRAGNLIVESTOCK_BLANKET_STYLES = [
    "medieval", "modern", "racing", "western",
];

function dragnLivestockItem(itemName) {
    return "dragnlivestock:" + itemName;
}

function addDyedItems(items, suffix) {
    DRAGNLIVESTOCK_DYE_COLORS.forEach(color => {
        items.push(dragnLivestockItem(color + suffix));
    });
}

function addDyedItemsExcept(items, suffix, excludedColor) {
    DRAGNLIVESTOCK_DYE_COLORS.forEach(color => {
        if (color !== excludedColor) {
            items.push(dragnLivestockItem(color + suffix));
        }
    });
}

function getDisabledDragnLivestockItems() {
    const items = [
        "dragnlivestock:cabriolet",
        "dragnlivestock:coupe",
        "dragnlivestock:mower",
        "dragnlivestock:plow",
        "dragnlivestock:transport_cart",
        "dragnlivestock:mining_cart",
        "dragnlivestock:goods_cart",
        "dragnlivestock:covered_wagon",
        "dragnlivestock:livestock_wagon",
        "dragnlivestock:lumber_wagon",
        "dragnlivestock:chainmail_horse_armor",
        "dragnlivestock:copper_horse_armor",
        "dragnlivestock:quartz_horse_armor",
        "dragnlivestock:emerald_horse_armor",
        "dragnlivestock:netherite_horse_armor",
        "dragnlivestock:obsidian_horse_armor",
        "dragnlivestock:griffith_inspired_horse_armor",
        "dragnlivestock:riot_horse_armor",
        "dragnlivestock:minimal_leather_horse_armor",
        "dragnlivestock:minimal_copper_horse_armor",
        "dragnlivestock:minimal_iron_horse_armor",
        "dragnlivestock:minimal_golden_horse_armor",
        "dragnlivestock:minimal_quartz_horse_armor",
        "dragnlivestock:minimal_emerald_horse_armor",
        "dragnlivestock:minimal_diamond_horse_armor",
        "dragnlivestock:minimal_netherite_horse_armor",
        "dragnlivestock:minimal_griffith_inspired_horse_armor",
        "dragnlivestock:minimal_obsidian_horse_armor",
        "dragnlivestock:light_horse_armor_smithing_template",
        "dragnlivestock:black_saddle",
        "dragnlivestock:white_saddle",
        "dragnlivestock:light_saddle",
        "dragnlivestock:black_light_saddle",
        "dragnlivestock:white_light_saddle",
        "dragnlivestock:heavy_saddle",
        "dragnlivestock:black_heavy_saddle",
        "dragnlivestock:white_heavy_saddle",
        "dragnlivestock:holiday_saddle",
        "dragnlivestock:holiday_light_saddle",
        "dragnlivestock:holiday_heavy_saddle",
        "dragnlivestock:mane_scissors",
        "dragnlivestock:tail_scissors",
    ];

    addDyedItems(items, "_accented_saddle");
    addDyedItems(items, "_accented_light_saddle");
    addDyedItems(items, "_accented_heavy_saddle");
    addDyedItemsExcept(items, "_accented_black_saddle", "black");
    addDyedItemsExcept(items, "_accented_black_light_saddle", "black");
    addDyedItemsExcept(items, "_accented_black_heavy_saddle", "black");
    addDyedItemsExcept(items, "_accented_white_saddle", "white");
    addDyedItemsExcept(items, "_accented_white_light_saddle", "white");
    addDyedItemsExcept(items, "_accented_white_heavy_saddle", "white");
    addDyedItems(items, "_grub_sweater");

    DRAGNLIVESTOCK_BLANKET_STYLES.forEach(style => {
        addDyedItems(items, "_" + style + "_blanket");

        DRAGNLIVESTOCK_SPECIAL_BLANKET_PREFIXES.forEach(prefix => {
            items.push(dragnLivestockItem(prefix + "_" + style + "_blanket"));
        });
    });

    return items;
}

const DISABLED_DRAGNLIVESTOCK_ITEMS = getDisabledDragnLivestockItems();

function logDisabledDragnLivestockItems() {
    console.info("[Banana Farm] Removing recipes for " + DISABLED_DRAGNLIVESTOCK_ITEMS.length + " DragN livestock disabled items.");

    if (typeof Item === "undefined" || typeof Item.exists !== "function") {
        console.warn("[Banana Farm] Item.exists is unavailable; skipping DragN livestock disabled item ID validation.");
        return;
    }

    DISABLED_DRAGNLIVESTOCK_ITEMS.forEach(itemId => {
        if (!Item.exists(itemId)) {
            console.warn("[Banana Farm] DragN livestock disabled item not found: " + itemId);
        }
    });
}

ServerEvents.recipes(event => {
    logDisabledDragnLivestockItems();

    DISABLED_DRAGNLIVESTOCK_ITEMS.forEach(itemId => {
        event.remove({ output: itemId });
        event.remove({ id: itemId });
    });
});
