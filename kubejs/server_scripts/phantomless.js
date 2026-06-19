// source: CABIN 1.20
ServerEvents.recipes(event => {
    // phantom membrane replacements
    if (Platform.isLoaded("railways")) {
        event.recipes.create.filling("railways:track_phantom", ["create:track", Fluid.of("create:potion", 50, '{Potion:"minecraft:invisibility"}')])
        event.recipes.create.filling("railways:track_phantom", ["create:track", Fluid.of("create:potion", 50, '{Potion:"minecraft:long_invisibility"}')])
        event.recipes.create.filling("railways:track_phantom", ["create:track", Fluid.of("cofh_core:potion", 50, '{Potion:"minecraft:invisibility"}')])
        event.recipes.create.filling("railways:track_phantom", ["create:track", Fluid.of("cofh_core:potion", 50, '{Potion:"minecraft:long_invisibility"}')])
    }
})

ServerEvents.loaded(event => {
    if (!event.server.persistentData.insomniaDisabled) {
        event.server.runCommandSilent("/gamerule doInsomnia false")
        event.server.persistentData.insomniaDisabled = true;
    }
})
