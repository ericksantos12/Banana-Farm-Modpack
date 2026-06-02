<div align="center">

# Banana Farm

**Um modpack Forge 1.20.1 focado em fazenda, decoração, exploração leve, qualidade de vida e multiplayer casual.**

![Minecraft](https://img.shields.io/badge/Minecraft-1.20.1-62B47A?style=for-the-badge)
![Forge](https://img.shields.io/badge/Forge-47.4.20-F16436?style=for-the-badge)
![Packwiz](https://img.shields.io/badge/Packwiz-1.1.0-3D6FB6?style=for-the-badge)
[![Release](https://img.shields.io/badge/Releases-client%20%2B%20server-8A2BE2?style=for-the-badge)](https://github.com/ericksantos12/Banana-Farm-Modpack/releases)

</div>

---

## Visão Geral

O pack mistura mods de agricultura, animais, decoração, performance, estruturas, transporte, armazenamento, engenharia leve e ferramentas sociais para servidor.

| Área | Exemplos no pack |
| --- | --- |
| Fazenda e comida | Farmer's Delight, Create Slice & Dice, Pam's HarvestCraft 2 - Trees, Veggies Delight, Vintage Delight, Aquaculture Delight, Crabber's Delight, My Nether's Delight, Gensokyo Delight, Quality Food, FarmLife Remastered, Spice of Life Onion, Farmer's Respite, Brewin' And Chewin', Let's Do Bakery, Brewery, Farm & Charm, HerbalBrews, Meadow e Vinery |
| Decoração | Handcrafted, Beautify, Fantasy's Furniture, Refurbished Furniture, Let's Do Furniture, Rechiseled, Rechiseled: Create, Macaw's Doors, Macaw's Windows, Macaw's Fences and Walls, Macaw's Trapdoors, Macaw's Bridges, Wallpapers, Accents, Chimes |
| Create e transporte | Create, Create: Bells & Whistles, Create: Connected, Create Crafts & Additions, Create: Steam 'n' Rails, Create Railways Navigator, Create: Numismatics, Create: Pattern Schematics, Create: Some Assembly Required, Petrol's Parts, Automobility, Little Tractor, Via Romana, Simple Planes, Small Ships, AstikorCarts Redux, Gliders |
| Animais e vida rural | Aquaculture 2, Alex's Mobs, Better Beekeeping, Buzzier Bees, Critters and Companions, DragN's Livestock Overhaul, DragN's LO: Pets, Domestication Innovation Fixed, Adopt a Pet, Simply Cats, Working Dogs |
| Exploração e mundo | MVS - Moog's Voyager Structures, Towns and Towers, William Wythers' Overhauled Overworld, Let's Do WilderNature, Serene Seasons, Antique Atlas 4, Nature's Compass, Better Clouds, Passable Foliage |
| Ferramentas e progressão | Tinkers' Construct, Construction Wand, Effortless Structure, Tom's Simple Storage Mod, Functional Storage, Sophisticated Backpacks, Sophisticated Storage, Mob Lassos, Watering Cans [Dew Drop] |
| Qualidade de vida | Jade, JEI, AppleSkin, Mouse Tweaks, Carry On, Crafting Tweaks, BetterF3, Comforts, Inventory Tweaks: ReFoxed, Polymorph, Gravestone Mod, Panda's Falling Trees |
| Visual e imersão | Fresh Animations, Not Enough Animations, Sound Physics Remastered, Exposure, Particular Reforged, Continuity, Fusion, Entity Model Features, Entity Texture Features, Sodium/Embeddium Dynamic Lights |
| Multiplayer | Simple Voice Chat, Simple Voice Radio, Simple Create Radios, What Are They Up To, Skin Restorer, squaremap, WATERFrAMES, WATERViSION |
| Performance e estabilidade | ModernFix, FerriteCore, Embeddium, ImmediatelyFast, Entity Culling, Radium Reforged, Connectivity, Packet Fixer, Saturn, AllTheLeaks, spark |

---

# Para Jogadores

Esta seção é para quem quer baixar e jogar o Banana Farm.

## Downloads

Vá na aba [**Releases**](https://github.com/ericksantos12/Banana-Farm-Modpack/releases) do repositório e baixe os arquivos da release mais recente.

| Arquivo | Uso |
| --- | --- |
| `banana-farm-<versão>-curseforge.zip` | Pack para jogar no launcher |
| `banana-farm-<versão>-serverpack.zip` | Pack para hospedar servidor |

> **Não use** o `Source code.zip` do GitHub como modpack jogável.

## Instalação do Cliente

### CurseForge App

1. Baixe o arquivo `banana-farm-<versão>-curseforge.zip` na release mais recente.
2. Abra o CurseForge App.
3. Vá em Minecraft.
4. Escolha importar perfil/modpack.
5. Selecione o `.zip` baixado.
6. Aguarde o CurseForge resolver e baixar os mods.

### Prism Launcher

1. Baixe o arquivo `banana-farm-<versão>-curseforge.zip` na release mais recente.
2. Abra o Prism Launcher.
3. Clique em **Add Instance**.
4. Escolha **Import from zip**.
5. Selecione o `.zip` baixado.
6. Aguarde o Prism Launcher importar o pack e baixar os mods.

#### Atualizações automáticas com packwiz

A instância já inclui `packwiz-installer-bootstrap.jar`.

Para atualizar o modpack automaticamente antes de abrir o jogo, configure o **Pre-launch command** da instância no Prism Launcher:

```powershell
java -jar packwiz-installer-bootstrap.jar "https://raw.githubusercontent.com/ericksantos12/Banana-Farm-Modpack/main/pack.toml"
```

O Prism executará o installer antes do jogo abrir e sincronizará mods, configs, quests e scripts com o `pack.toml` publicado no GitHub.

### Outros launchers

Use o arquivo `.zip` da release. O suporte de importação depende do launcher usado.

## Instalação do Servidor

1. Baixe o arquivo `banana-farm-<versão>-serverpack.zip` na release mais recente.
2. Extraia o conteúdo em uma pasta limpa do servidor.
3. Instale Java compatível com Minecraft `1.20.1`.
4. Siga o processo normal do Forge server para aceitar `eula.txt` e iniciar o servidor.
5. Use a mesma versão do client pack nos jogadores.

---

# Para Desenvolvedores

Esta seção é para quem quer editar, manter ou contribuir com o modpack. O pack é gerenciado com [`packwiz`](https://packwiz.infra.link/).

## Estrutura do Repositório

| Caminho | Função |
| --- | --- |
| `pack.toml` | Metadados do pack, versão do Minecraft e loader |
| `index.toml` | Índice gerado pelo packwiz com hashes dos arquivos |
| `mods/*.pw.toml` | Metadados dos mods instalados |
| `.github/workflows/release-packwiz.yml` | Automação de release client + server |

## Comandos Úteis

Listar mods instalados:

```sh
packwiz list
```

Atualizar hashes depois de mudar arquivos do pack:

```sh
packwiz refresh
```

Adicionar mod do CurseForge:

```sh
packwiz curseforge add --addon-id <project-id>
```

Adicionar mod do Modrinth:

```sh
packwiz modrinth add --project-id <project-id>
```

Exportar pack normal:

```sh
packwiz curseforge export -s client -o banana-farm-client.zip
```

Exportar serverpack:

```sh
packwiz curseforge export -s server -o banana-farm-server.zip
```

## Teste local com Prism e packwiz serve

Para testar mudanças locais sem depender do GitHub, rode na raiz do repositório:

```powershell
packwiz serve
```

Depois configure o **Pre-launch command** da instância dev no Prism Launcher:

```powershell
java -jar packwiz-installer-bootstrap.jar "http://127.0.0.1:8080/pack.toml"
```

Com isso, o Prism usa o servidor local do packwiz para instalar ou atualizar mods, configs, quests e scripts antes de abrir o jogo.

## Cuidados ao Manter

- **Não edite** `index.toml` manualmente; rode `packwiz refresh`.
- **Não confie** no nome do arquivo `.pw.toml` para identificar um mod; leia `name`, `filename`, `project-id` ou `mod-id` dentro do TOML.

## Fluxo de Trabalho

1. Rode o comando `packwiz add`, `packwiz remove` ou edite o metafile necessário.
2. Execute `packwiz refresh`.
3. Confira `packwiz list`.
4. Exporte localmente se quiser validar os zips.
5. Faça push para `main` para gerar a release automática.

## Workflow de Release

O workflow `.github/workflows/release-packwiz.yml` executa em todo push para `main`.

Ele faz:

1. Checkout do repositório.
2. Instala o `packwiz` via Go.
3. Lê `name` e `version` do `pack.toml`.
4. Executa `packwiz refresh`.
5. Exporta o pack client.
6. Exporta o serverpack.
7. Cria uma GitHub Release com os dois `.zip`.

As tags são geradas no formato:

```text
banana-farm-<versão>-build-<número-do-run>
```

## Requisitos

| Ferramenta | Uso |
| --- | --- |
| `packwiz` | Gerenciar mods, atualizar índice e exportar packs |
| Go | Instalar `packwiz` no workflow do GitHub Actions |

---

<div align="center">

**Banana Farm**
Fazenda, decoração, amigos e caos controlado em Forge 1.20.1.

</div>
