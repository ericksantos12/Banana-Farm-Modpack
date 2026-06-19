RecipeViewerEvents.removeEntries('item', event => {
    const itemsToHide = [
        'sophisticatedbackpacks:stack_upgrade_tier_4',
	    'sophisticatedbackpacks:stack_downgrade_tier_1',
	    'sophisticatedbackpacks:stack_downgrade_tier_2',
	    'sophisticatedbackpacks:stack_downgrade_tier_3',
	    /^dragnlivestock:(cabriolet|coupe|mower|plow|transport_cart|mining_cart|goods_cart|covered_wagon|livestock_wagon|lumber_wagon|chainmail_horse_armor|copper_horse_armor|quartz_horse_armor|emerald_horse_armor|netherite_horse_armor|obsidian_horse_armor|griffith_inspired_horse_armor|riot_horse_armor|minimal_leather_horse_armor|minimal_copper_horse_armor|minimal_iron_horse_armor|minimal_golden_horse_armor|minimal_quartz_horse_armor|minimal_emerald_horse_armor|minimal_diamond_horse_armor|minimal_netherite_horse_armor|minimal_griffith_inspired_horse_armor|minimal_obsidian_horse_armor|light_horse_armor_smithing_template|black_saddle|white_saddle|light_saddle|black_light_saddle|white_light_saddle|heavy_saddle|black_heavy_saddle|white_heavy_saddle|holiday_saddle|holiday_light_saddle|holiday_heavy_saddle|mane_scissors|tail_scissors|(?:white|orange|magenta|light_blue|yellow|lime|pink|gray|light_gray|cyan|purple|blue|brown|green|red|black)_(?:accented_saddle|accented_light_saddle|accented_heavy_saddle|grub_sweater)|(?:white|orange|magenta|light_blue|yellow|lime|pink|gray|light_gray|cyan|purple|blue|brown|green|red)_(?:accented_black_saddle|accented_black_light_saddle|accented_black_heavy_saddle)|(?:orange|magenta|light_blue|yellow|lime|pink|gray|light_gray|cyan|purple|blue|brown|green|red|black)_(?:accented_white_saddle|accented_white_light_saddle|accented_white_heavy_saddle)|(?:(?:white|orange|magenta|light_blue|yellow|lime|pink|gray|light_gray|cyan|purple|blue|brown|green|red|black)|(?:american|autumn|elderberry|peach|spring|summer|winter|pride|lesbian|bi|nonbinary|trans))_(?:medieval|modern|racing|western)_blanket)$/
    ]

    event.remove(itemsToHide)
})