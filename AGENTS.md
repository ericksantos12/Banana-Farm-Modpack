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

## FTB Quests
- Quest data lives under `config/ftbquests/quests/`; the mod rewrites chapters and quests with 16-character hex IDs, so preserve existing IDs instead of inventing readable IDs.
- Current quest chapters are the six hex-named files in `config/ftbquests/quests/chapters/`; `chapter_groups/community_projects.snbt` must reference chapter IDs, not old readable names.
- If using Item Filters in FTB Quests item tasks, tag filters are encoded as item stacks such as `{Count: 1b, id: "itemfilters:tag", tag: {value: "minecraft:logs"}}`.
- The questbook currently uses grid layouts by category; do not add `dependencies` just to draw lines unless explicitly asked.

## Release Automation
- `.github/workflows/release-packwiz.yml` runs on pushes to `main` and `dev`.
- The workflow runs `packwiz refresh`, exports client and server CurseForge zips into `dist/`, then creates one GitHub Release per run.
- Releases from `dev` are marked prerelease; tags are `banana-farm-<version>-build-<run-number>` from `pack.toml` metadata.
- The release workflow needs `contents: write` for `GITHUB_TOKEN` so `gh release create` can publish releases and assets.
