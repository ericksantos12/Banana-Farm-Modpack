const BORDER_CONFIG = {
    centerX: 0,
    centerZ: 0,
    initialDiameter: 16000,
    incrementDiameter: 16000,
    borderOpenSeconds: 1800,
    chunkyWorld: "minecraft:overworld",
    chunkyShape: "square",
    warningDistance: 256,
    warningTime: 30,
    damageBuffer: 5,
    damageAmount: 0.2,
};

const BORDER_DATA_KEYS = {
    currentDiameter: "kubejs_border_current_diameter",
    preparedDiameter: "kubejs_border_prepared_diameter",
};

function getRadius(diameter) {
    return diameter / 2;
}

function getPersistentNumber(server, key, fallback) {
    const value = Number(server.persistentData[key]);

    if (Number.isFinite(value) && value > 0) {
        return value;
    }

    return fallback;
}

function hasPersistentNumber(server, key) {
    const value = Number(server.persistentData[key]);

    return Number.isFinite(value) && value > 0;
}

function setPersistentNumber(server, key, value) {
    server.persistentData[key] = value;
}

function textJson(text, color) {
    return JSON.stringify({ text: text, color: color });
}

function tellAdmin(server, source, message, color) {
    server.runCommandSilent("tellraw " + source.getTextName() + " " + textJson(message, color));
}

function tellAll(server, message, color) {
    server.runCommandSilent("tellraw @a " + textJson(message, color));
}

function titleAll(server, title, subtitle) {
    server.runCommandSilent("title @a times 20 100 20");
    server.runCommandSilent("title @a title " + textJson(title, "gold"));
    server.runCommandSilent("title @a subtitle " + textJson(subtitle, "yellow"));
}

function configureWorldBorder(server, diameter, seconds) {
    server.runCommandSilent("worldborder center " + BORDER_CONFIG.centerX + " " + BORDER_CONFIG.centerZ);
    server.runCommandSilent("worldborder warning distance " + BORDER_CONFIG.warningDistance);
    server.runCommandSilent("worldborder warning time " + BORDER_CONFIG.warningTime);
    server.runCommandSilent("worldborder damage buffer " + BORDER_CONFIG.damageBuffer);
    server.runCommandSilent("worldborder damage amount " + BORDER_CONFIG.damageAmount);
    server.runCommandSilent("worldborder set " + diameter + " " + seconds);
}

function startChunkyPregen(server, radius) {
    server.runCommandSilent("chunky world " + BORDER_CONFIG.chunkyWorld);
    server.runCommandSilent("chunky shape " + BORDER_CONFIG.chunkyShape);
    server.runCommandSilent("chunky center " + BORDER_CONFIG.centerX + " " + BORDER_CONFIG.centerZ);
    server.runCommandSilent("chunky radius " + radius);
    server.runCommandSilent("chunky start");
}

function getCurrentDiameter(server) {
    return getPersistentNumber(server, BORDER_DATA_KEYS.currentDiameter, BORDER_CONFIG.initialDiameter);
}

function getPreparedDiameter(server, currentDiameter) {
    return getPersistentNumber(server, BORDER_DATA_KEYS.preparedDiameter, currentDiameter);
}

ServerEvents.commandRegistry(event => {
    const { commands: Commands } = event;

    event.register(Commands.literal("borderinitpregen")
        .requires(source => source.hasPermission(2))
        .executes(context => {
            const source = context.source;
            const server = source.server;

            if (hasPersistentNumber(server, BORDER_DATA_KEYS.currentDiameter)) {
                tellAdmin(server, source, "A borda ja foi inicializada. Use /borderstatus para ver o estado atual.", "red");
                return 0;
            }

            const diameter = BORDER_CONFIG.initialDiameter;
            const radius = getRadius(diameter);

            configureWorldBorder(server, diameter, 0);
            setPersistentNumber(server, BORDER_DATA_KEYS.currentDiameter, diameter);
            setPersistentNumber(server, BORDER_DATA_KEYS.preparedDiameter, diameter);
            startChunkyPregen(server, radius);

            tellAdmin(server, source, "Borda inicial configurada em " + diameter + " blocos de diametro. Pregeneration iniciada com raio " + radius + ".", "green");
            tellAll(server, "Pregeneration da borda inicial iniciada. A area de raio " + radius + " esta sendo preparada antes da abertura.", "gold");

            return 1;
        }));

    event.register(Commands.literal("borderprepare")
        .requires(source => source.hasPermission(2))
        .executes(context => {
            const source = context.source;
            const server = source.server;
            const currentDiameter = getCurrentDiameter(server);
            const nextDiameter = currentDiameter + BORDER_CONFIG.incrementDiameter;
            const nextRadius = getRadius(nextDiameter);

            setPersistentNumber(server, BORDER_DATA_KEYS.preparedDiameter, nextDiameter);
            startChunkyPregen(server, nextRadius);

            tellAdmin(server, source, "Proxima borda preparada: " + nextDiameter + " blocos de diametro, raio " + nextRadius + ". A borda ainda esta fechada.", "yellow");
            tellAll(server, "Chunky esta preparando a nova borda ate o raio " + nextRadius + ". A borda continua fechada ate um admin executar /borderopen.", "gold");

            return 1;
        }));

    event.register(Commands.literal("borderopen")
        .requires(source => source.hasPermission(2))
        .executes(context => {
            const source = context.source;
            const server = source.server;
            const currentDiameter = getCurrentDiameter(server);
            const preparedDiameter = getPreparedDiameter(server, currentDiameter);

            if (preparedDiameter <= currentDiameter) {
                tellAdmin(server, source, "Nao ha expansao preparada. Execute /borderprepare e aguarde o Chunky terminar antes de abrir a borda.", "red");
                return 0;
            }

            configureWorldBorder(server, preparedDiameter, BORDER_CONFIG.borderOpenSeconds);
            setPersistentNumber(server, BORDER_DATA_KEYS.currentDiameter, preparedDiameter);
            titleAll(server, "A borda esta expandindo", "Novo diametro: " + preparedDiameter + " blocos em " + BORDER_CONFIG.borderOpenSeconds + " segundos");
            tellAdmin(server, source, "Borda abrindo para " + preparedDiameter + " blocos de diametro ao longo de " + BORDER_CONFIG.borderOpenSeconds + " segundos.", "green");

            return 1;
        }));

    event.register(Commands.literal("borderstatus")
        .requires(source => source.hasPermission(2))
        .executes(context => {
            const source = context.source;
            const server = source.server;
            const currentDiameter = getCurrentDiameter(server);
            const preparedDiameter = getPreparedDiameter(server, currentDiameter);
            const currentRadius = getRadius(currentDiameter);
            const preparedRadius = getRadius(preparedDiameter);

            tellAdmin(server, source, "Status da borda: atual " + currentDiameter + " diametro / " + currentRadius + " raio; preparada " + preparedDiameter + " diametro / " + preparedRadius + " raio. Use /chunky progress para acompanhar a pregeneration.", "aqua");

            return 1;
        }));
});
