<div align="center">

# Banana Farm

**Um modpack Forge 1.20.1 focado em fazenda, decoração, exploração leve, qualidade de vida e multiplayer casual.**

![Minecraft](https://img.shields.io/badge/Minecraft-1.20.1-62B47A?style=for-the-badge)
![Forge](https://img.shields.io/badge/Forge-47.4.20-F16436?style=for-the-badge)
![Packwiz](https://img.shields.io/badge/Packwiz-1.1.0-3D6FB6?style=for-the-badge)
![Release](https://img.shields.io/badge/Releases-client%20%2B%20server-8A2BE2?style=for-the-badge)

</div>

---

## Visao Geral

`Banana Farm` e um modpack mantido com [`packwiz`](https://packwiz.infra.link/) para Minecraft `1.20.1` usando Forge `47.4.20`.

O pack mistura mods de agricultura, animais, decoracao, performance, estruturas, transporte, armazenamento e ferramentas sociais para servidor.

| Area | Exemplos no pack |
| --- | --- |
| Fazenda e comida | Farmer's Delight, Pam's HarvestCraft 2 - Trees, Veggies Delight, Vintage Delight, Quality Food |
| Decoracao | Handcrafted, Beautify, Fantasy's Furniture, Refurbished Furniture, Wallpapers |
| Create e transporte | Create, Create: Steam 'n' Rails, Create Railways Navigator, Automobility, Via Romana |
| Animais e vida rural | Aquaculture 2, Better Beekeeping, Buzzier Bees, Critters and Companions, Realistic Horse Genetics, Working Dogs |
| Qualidade de vida | Jade, JEI, AppleSkin, Mouse Tweaks, Carry On, Construction Wand |
| Multiplayer | Simple Voice Chat, Simple Voice Radio, What Are They Up To, Skin Restorer |
| Performance e estabilidade | ModernFix, FerriteCore, Embeddium, Radium Reforged, Connectivity, Packet Fixer |

---

## Downloads

As releases do GitHub sao geradas automaticamente a cada push na branch `main`.

Cada release contem dois arquivos:

| Arquivo | Uso |
| --- | --- |
| `banana-farm-<versao>-client.zip` | Pack normal para cliente/launcher |
| `banana-farm-<versao>-server.zip` | Serverpack exportado pelo packwiz |

Baixe os arquivos pela aba **Releases** do repositorio. Nao use o `Source code.zip` do GitHub como modpack jogavel.

---

## Instalacao do Cliente

### CurseForge App

1. Baixe o arquivo `banana-farm-<versao>-client.zip` na release mais recente.
2. Abra o CurseForge App.
3. Va em Minecraft.
4. Escolha importar perfil/modpack.
5. Selecione o `.zip` baixado.
6. Aguarde o CurseForge resolver e baixar os mods.

### Launchers compativeis com CurseForge

Use o arquivo `client.zip` da release. O suporte de importacao depende do launcher usado.

---

## Instalacao do Servidor

1. Baixe o arquivo `banana-farm-<versao>-server.zip` na release mais recente.
2. Extraia o conteudo em uma pasta limpa do servidor.
3. Instale Java compativel com Minecraft `1.20.1`.
4. Siga o processo normal do Forge server para aceitar `eula.txt` e iniciar o servidor.
5. Use a mesma versao do client pack nos jogadores.

O serverpack e exportado com:

```sh
packwiz curseforge export -s server -o banana-farm-server.zip
```

---

## Desenvolvimento do Pack

Este repositorio nao e um projeto de codigo tradicional. Os arquivos principais sao:

| Caminho | Funcao |
| --- | --- |
| `pack.toml` | Metadados do pack, versao do Minecraft e loader |
| `index.toml` | Indice gerado pelo packwiz com hashes dos arquivos |
| `mods/*.pw.toml` | Metadados dos mods instalados |
| `.github/workflows/release-packwiz.yml` | Automacao de release client + server |

### Comandos uteis

Listar mods instalados:

```sh
packwiz list
```

Atualizar hashes depois de mudar arquivos do pack:

```sh
packwiz refresh
```

Exportar pack normal:

```sh
packwiz curseforge export -s client -o banana-farm-client.zip
```

Exportar serverpack:

```sh
packwiz curseforge export -s server -o banana-farm-server.zip
```

Adicionar mod do CurseForge:

```sh
packwiz curseforge add --addon-id <project-id>
```

Adicionar mod do Modrinth:

```sh
packwiz modrinth add --project-id <project-id>
```

---

## Workflow de Release

O workflow `.github/workflows/release-packwiz.yml` executa em todo push para `main`.

Ele faz:

1. Checkout do repositorio.
2. Instala o `packwiz` via Go.
3. Le `name` e `version` do `pack.toml`.
4. Executa `packwiz refresh`.
5. Exporta o pack client.
6. Exporta o serverpack.
7. Cria uma GitHub Release com os dois `.zip`.

As tags sao geradas no formato:

```text
banana-farm-<versao>-build-<numero-do-run>
```

---

## Cuidados ao Manter

- Nao edite `index.toml` manualmente; rode `packwiz refresh`.
- Nao confie no nome do arquivo `.pw.toml` para identificar um mod; leia `name`, `filename`, `project-id` ou `mod-id` dentro do TOML.

---

## Requisitos para Manutencao

| Ferramenta | Uso |
| --- | --- |
| `packwiz` | Gerenciar mods, atualizar indice e exportar packs |
| Go | Instalar `packwiz` no workflow do GitHub Actions |
| GitHub CLI (`gh`) | Criar releases no workflow do GitHub Actions |

---

## Estrutura Recomendada de Alteracao

Ao alterar mods ou metadados:

1. Rode o comando `packwiz add`, `packwiz remove` ou edite o metafile necessario.
2. Execute `packwiz refresh`.
3. Confira `packwiz list`.
4. Exporte localmente se quiser validar os zips.
5. Faça push para `main` para gerar a release automatica.

---

<div align="center">

**Banana Farm**  
Fazenda, decoracao, amigos e caos controlado em Forge 1.20.1.

</div>
