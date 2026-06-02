# AGENTS.md

## Project Shape
- This is a `packwiz` Minecraft modpack, not an app or library codebase.
- Run packwiz commands from the pack root, where `pack.toml` lives.
- `pack.toml` currently targets Minecraft `1.20.1`, Forge `47.4.20`, packwiz format `1.1.0`

## Packwiz Workflow
- After changing tracked pack content (`config/`, `mods/*.pw.toml`, quest files, etc.), run `packwiz refresh`; `index.toml` stores hashes and should not be edited by hand.
- Mods are `mods/*.pw.toml` metafiles; read `filename`, `name`, `project-id`, and `mod-id` from the TOML instead of inferring from the metafile name.
- Export the normal pack with `packwiz curseforge export -s client -o <output.zip>`.
- Export the server pack with `packwiz curseforge export -s server -o <output.zip>`.
- Use `packwiz list` to inspect installed packwiz mods.

## Heracles
- Heracles is a tree-style questing mod. Quest data can be distributed through the instance `config/` folder or saved server-side.
- The in-game UI opens through a keybind or the quest book item.
- The main screen is the Group View: groups appear in the left sidebar and the selected group's quest tree appears in the main panel.
- Edit Mode is available only with cheats, Creative mode, or OP access on servers.
- Keep Heracles quest data separate from FTB Quests data; Heracles uses its own files and formats.

### Heracles Files
- Group ordering is controlled by `config/heracles/groups.txt`; edit this file to change the order of group names in the left sidebar.
- Quest JSON files live under `config/heracles/quests/<sanitized-group-folder>/<quest-id>.json`; Heracles loads every JSON recursively under `config/heracles/quests/`.
- Heracles chooses sanitized group folders by lowercasing group names and stripping non-`[a-z0-9]` characters, e.g. `Cidade e Servicos` -> `cidadeeservicos`, `Agricultura e Alimentacao` -> `agriculturaealimentacao`.
- The first-open tutorial is `config/heracles/tutorial.html`; it is shown when `showTutorial` is true.
- `heracles_options.json` lives in the top-level Minecraft instance folder, not under `config/heracles/`.
- `heracles_options.json` options documented by Heracles are `pinnedIndex`, `showTutorial`, and `maxEditorHistory` (default `100`).
- Some quest features require direct JSON edits rather than the in-game editor, including task NBT, `heracles:composite` tasks, and `heracles:selectable` rewards.
- After editing Heracles files under `config/`, run `packwiz refresh` so `index.toml` gets the new hashes.

### Heracles Quest Editing
- A quest usually has three parts: overview/description, tasks, and rewards. They are not all strictly required.
- Top-level quest JSON fields are `display`, `settings`, `dependencies`, `tasks`, and `rewards`; defaults exist, so minimal quests can omit `settings` and `dependencies`.
- Quest IDs are the JSON filenames without `.json`; use stable lowercase snake-case IDs because commands and dependencies reference them.
- `display.title` and `display.subtitle` can be plain strings; `display.description` may be a string or list of strings.
- Player-facing Portuguese text in quest titles, subtitles, descriptions, tutorials, and group names should use proper accents and spelling (e.g. `Início`, `Profissões`, `você`, `não`, `produção`, `comércio`), while keeping technical IDs, filenames, item IDs, and dependency IDs stable and ASCII/snake-case where appropriate.
- Put quest positions in `display.groups.<group name>.position` as a two-int array, e.g. `[120, 0]`.
- Item quest icons use `display.icon = { "type": "heracles:item", "item": "minecraft:compass" }`; the `item` value can be a simple item ID string.
- Quest states in the default theme: darker = locked or dependencies incomplete; lighter = unlocked/in progress; orange = tasks done with unclaimed rewards; green = completed and rewards claimed.
- Quest settings include title, position, subtitle, icon, icon background, dependencies, delete, and edit quest settings.
- `Hidden Until` options: `Locked` = always display; `In Progress` = hide until dependencies are completed; `Completed` = hide until the quest itself is completed; `Parents Visible` = hide until dependencies are visible.
- In JSON, `settings.hidden` enum values are encoded as Heracles' serialized translation-like strings by default, but the codec also accepts enum constants; prefer letting defaults handle visibility unless needed.

### Heracles Quest JSON Shape
- Basic manual-check project quest shape:

```json
{
  "display": {
    "icon": {
      "type": "heracles:item",
      "item": "minecraft:compass"
    },
    "title": "Example Project",
    "subtitle": "Projeto produtivo",
    "description": [
      "<h1 color=\"green\" shadowed=\"true\">Example Project</h1>",
      "<p>Short project summary.</p>",
      "<hr color=\"green\"/>",
      "<h2 color=\"yellow\">Objetivo</h2>",
      "<ul color=\"green\"><li>First objective.</li><li>Second objective.</li></ul>",
      "<hint title=\"Impacto\" icon=\"minecraft:compass\" color=\"green\"><p>Useful note with <span bold=\"true\">emphasis</span>.</p></hint>",
      "<blockquote color=\"green\"><p>Inspirational quote.</p></blockquote>"
    ],
    "groups": {
      "Example Group": {
        "position": [0, 0]
      }
    }
  },
  "tasks": {
    "concluir": {
      "type": "heracles:check",
      "title": "Projeto concluido"
    }
  },
  "rewards": {
    "xp": {
      "type": "heracles:xp",
      "title": "Recompensa",
      "xptype": "POINTS",
      "amount": 50
    }
  }
}
```

### Heracles Tasks
- Documented task types: Changed Dimension, Structure, Experience, Dummy, Entity Integration, Biome, Item Interaction, Block Interaction, Kill Entity, Acquire Item, Advancement, Recipe, Check, and Stat.
- Registered task type IDs in Heracles 1.20.x include `heracles:composite`, `heracles:kill_entity`, `heracles:item`, `heracles:biome`, `heracles:structure`, `heracles:changed_dimension`, `heracles:advancement`, `heracles:recipe`, `heracles:item_interaction`, `heracles:item_use`, `heracles:block_interaction`, `heracles:check`, `heracles:dummy`, `heracles:xp`, `heracles:entity_interaction`, `heracles:location`, and `heracles:stat`.
- `heracles:check` is a UI-clickable task. If `nbt` is omitted, it uses `NbtPredicate.ANY`, so it works as a simple manual self-check task.
- Use `heracles:check` for SMP project completion when players should click to mark a build/project complete.
- `dummy` tasks are intentionally un-completable and are used to halt progress until the quest is completed manually with a command.
- Use direct quest JSON edits when a task target needs NBT.
- Entity interaction task with NBT example:

```json
{
  "traderjoe": {
    "type": "heracles:entity_interaction",
    "entity": "minecraft:villager",
    "nbt": {
      "VillagerData": {
        "profession": "cleric",
        "type": "taiga"
      }
    }
  }
}
```

- `heracles:composite` tasks must be written directly in quest JSON. They complete when any one child task completes, but have restrictions on allowed child task sets.

### Heracles Rewards
- Documented reward types: Item, Experience, Loot Table, Command, and Selectable.
- Registered reward type IDs in Heracles 1.20.x include `heracles:xp`, `heracles:item`, `heracles:loot`, `heracles:selectable`, and `heracles:command`.
- Item rewards can be chosen from item icons, item ID, tags, or the editor's held item.
- Experience rewards use `type: "heracles:xp"`, `amount`, and optional `xptype`; accepted enum constants include `POINTS` and `LEVEL`. Prefer `POINTS` for modest quest rewards.
- Keep reward titles simple as `Recompensa` unless the pack has a reason for custom reward naming.
- Loot Table rewards require a loot table ID.
- Command rewards run a command when claimed.
- `heracles:selectable` rewards must be written directly in quest JSON. Their inner `rewards` object has the same structure as the outer rewards object and defines the choices.
- Selectable reward shape:

```json
{
  "rewards": {
    "example select reward": {
      "type": "heracles:selectable",
      "amount": 1,
      "rewards": {}
    }
  }
}
```

### Heracles Commands
- Complete a quest for a player: `/heracles complete <quest id> <player>`
- Pin a quest: `/heracles pin <quest id>`
- Reset a quest for a player: `/heracles reset <quest id> <player>`
- Reset all quests for a player: `/heracles resetall <player>`

### Heracles Markdown
- Quest overviews support basic Markdown-like formatting.
- Supported examples: `# heading`, `## heading`, `- list item`, `> block quote`, `--italicized--`, `**bold**`, `__underline__`, `~~strikethrough~~`, and `||obfuscated||`.
- Do not mix Markdown-style and Hermes HTML-style formatting on the same line.
- For advanced HTML-like formatting, Heracles points to the Hermes documentation.

### Hermes Markup For Heracles Descriptions
- Hermes is the XML-like display markup language used by Heracles descriptions; prefer Hermes for polished quest pages instead of mixing it with Markdown.
- Do not mix Markdown-style and Hermes HTML-style formatting on the same description line. For consistency, prefer all-Hermes descriptions once any Hermes element is used.
- `description` can be a list of Hermes strings; each string can contain a complete Hermes element or compact nested elements.
- Useful Hermes elements for quest descriptions: `<h1>`, `<h2>`, `<p>`, `<hr/>`, `<ul>`, `<li>`, `<hint>`, `<blockquote>`, `<span>`, `<br/>`, `<item/>`, `<columns>`, `<column>`, and `<details>`.
- Text attributes supported by text-like elements include `bold`, `italic`, `underline`, `strikethrough`, `obfuscated`, `centered`, `shadowed`, and `color`.
- `color` accepts CSS-like named colors, `rainbow`, `#rrggbb`, and `0xrrggbb` forms. Use restrained colors per group/theme.
- `<h1>` is about 3x normal text size; `<h2>` is about 2x normal text size. Both inherit text attributes like `color` and `shadowed`.
- `<p>` is a paragraph and inherits text attributes.
- `<hr color="..."/>` creates a horizontal separator.
- `<ul color="...">` must contain only `<li>` children; `color` controls the bullet color.
- `<blockquote color="..."><p>...</p></blockquote>` creates a highlighted quote block with a colored left border. Use it for the final inspirational/citation line.
- `<hint title="..." icon="minecraft:item" color="..."><p>...</p></hint>` creates a callout box; the `icon` attribute is an item ID.
- `<span color="..." bold="true">...</span>` styles inline text inside text elements.
- `<item id="minecraft:item" scale="2.0"/>` displays an item stack in the description. Use sparingly so quest pages stay readable.
- `<details summary="..." open="true"><p>...</p></details>` can hide optional information behind an expandable section.
- `<columns>` can contain up to 3 `<column>` children; use only when a compact side-by-side layout is worth the complexity.
- Current project quest descriptions use this practical pattern: title (`<h1>`), summary (`<p>`), separator (`<hr/>`), objective heading (`<h2>`), objective list (`<ul>/<li>`), impact hint (`<hint>`), and final quote (`<blockquote>`).
- Avoid descriptions that dictate exact build style unless requested; focus on purpose, usage, economy, shared infrastructure, and completion criteria.

## Release Automation
- `.github/workflows/release-packwiz.yml` runs on pushes to `main` and `dev`.
- The workflow runs `packwiz refresh`, exports client and server CurseForge zips into `dist/`, then creates one GitHub Release per run.
- Releases from `dev` are marked prerelease; tags are `banana-farm-<version>-build-<run-number>` from `pack.toml` metadata.
- The release workflow needs `contents: write` for `GITHUB_TOKEN` so `gh release create` can publish releases and assets.
