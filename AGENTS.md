# AGENTS.md

## Project Shape
- This is a `packwiz` Minecraft modpack, not an app or library codebase.
- Run packwiz commands from the pack root, where `pack.toml` lives.
- `pack.toml` currently targets Minecraft `1.20.1` with Forge `47.4.20`.

## Packwiz Workflow
- After changing pack files or metadata, run `packwiz refresh`; `index.toml` stores hashes and should not be edited by hand.
- Mods are `mods/*.pw.toml` metafiles; read `filename`, `name`, `project-id`, and `mod-id` from the TOML instead of inferring from the metafile name.
- Export the normal pack with `packwiz curseforge export -s client -o <output.zip>`.
- Export the server pack with `packwiz curseforge export -s server -o <output.zip>`.
- Use `packwiz list` to inspect installed packwiz mods.

## Release Automation
- `.github/workflows/release-packwiz.yml` runs on every push to `main`.
- The workflow creates one GitHub Release per run and uploads both client and server CurseForge zip exports.
- The release workflow needs `contents: write` for `GITHUB_TOKEN` so `gh release create` can publish releases and assets.
