<p align="center"><img src="icon.png" height="250" alt="Banana Farm Logo"></p>
<h1 align="center">Banana Farm</h1>
<p align="center"><b><i>Um modpack Forge 1.20.1 sobre fazenda, cidade, comércio, Create, exploração e multiplayer casual.</i></b></p>
<h1 align="center">
    <a href="LICENSE"><img src="https://img.shields.io/github/license/ericksantos12/Banana-Farm-Modpack?style=for-the-badge&logo=github" alt="License"></a>
    <img src="https://img.shields.io/badge/Minecraft-1.20.1-62B47A?style=for-the-badge" alt="Minecraft 1.20.1">
    <img src="https://img.shields.io/badge/Forge-47.4.20-F16436?style=for-the-badge" alt="Forge 47.4.20">
    <br>
    <a href="https://github.com/ericksantos12/Banana-Farm-Modpack/releases"><img src="https://img.shields.io/github/downloads/ericksantos12/Banana-Farm-Modpack/total?style=for-the-badge&labelColor=grey&logo=github&label=+" alt="GitHub Downloads"></a>
    <a href="https://github.com/ericksantos12/Banana-Farm-Modpack/actions/workflows/release-packwiz.yml"><img src="https://img.shields.io/github/actions/workflow/status/ericksantos12/Banana-Farm-Modpack/release-packwiz.yml?branch=main&style=for-the-badge&label=Release" alt="Release Workflow"></a>
</h1>

## Recursos

- Fazenda, comida, animais e profissões rurais para um servidor casual e social.
- Create, logística, trens, pacotes, combustíveis líquidos e automação sem transformar o pack em fábrica hardcore.
- Cidade, comércio, lojas, bancos, segurança, decoração e projetos produtivos feitos por jogadores.
- Heracles como livro de quests, guias e profissões. Aperte `U` dentro do jogo para abrir.
- Exploração leve com estruturas, melhorias de mundo, espaço, End melhorado e progressão final mais interessante.
- Ferramentas de construção, decoração e qualidade de vida para facilitar bases, vilas, lojas e áreas públicas.
- Performance e estabilidade com ajustes voltados para multiplayer em Forge 1.20.1.

## Instalação

Baixe o modpack pela aba [Releases](https://github.com/ericksantos12/Banana-Farm-Modpack/releases).

Use os arquivos da release mais recente:

- `banana-farm-<versão>-curseforge.zip` para jogar no launcher.
- `banana-farm-<versão>-serverpack.zip` para hospedar servidor.

Não use o `Source code.zip` do GitHub como modpack jogável.

### CurseForge App

1. Baixe `banana-farm-<versão>-curseforge.zip` na release mais recente.
2. Abra o CurseForge App.
3. Vá em Minecraft.
4. Escolha importar perfil/modpack.
5. Selecione o `.zip` baixado.
6. Aguarde o launcher resolver e baixar os mods.

### Prism Launcher

1. Baixe `banana-farm-<versão>-curseforge.zip` na release mais recente.
2. Abra o Prism Launcher.
3. Clique em **Add Instance**.
4. Escolha **Import from zip**.
5. Selecione o `.zip` baixado.
6. Aguarde o Prism importar o pack e baixar os mods.

### Atualizações Automáticas com Prism Launcher

A instância já inclui `packwiz-installer-bootstrap.jar`.

Para o Prism atualizar o modpack automaticamente antes de abrir o jogo, configure o **Pre-launch command** da instância com:

```powershell
java -jar packwiz-installer-bootstrap.jar "https://raw.githubusercontent.com/ericksantos12/Banana-Farm-Modpack/main/pack.toml"
```

Com isso, o Prism executa o installer antes do jogo abrir e sincroniza mods, configs, quests e scripts com o `pack.toml` publicado no GitHub.

## Instalação de Servidor Dedicado

1. Baixe `banana-farm-<versão>-serverpack.zip` na release mais recente.
2. Extraia o conteúdo em uma pasta limpa do servidor.
3. Instale Java compatível com Minecraft `1.20.1`.
4. Instale/inicie o servidor Forge `47.4.20` conforme o fluxo normal do Forge.
5. Aceite o `eula.txt`.
6. Inicie o servidor novamente.
7. Use a mesma versão do pack no client e no servidor.

## Desenvolvimento

Banana Farm é gerenciado com [`packwiz`](https://packwiz.infra.link/). Rode os comandos a partir da raiz do repositório, onde fica `pack.toml`.

Listar mods instalados:

```sh
packwiz list
```

Atualizar hashes depois de mudar mods, configs, quests ou scripts do pack:

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

Exportar o pack client:

```sh
packwiz curseforge export -s client -o banana-farm-client.zip
```

Exportar o serverpack:

```sh
packwiz curseforge export -s server -o banana-farm-server.zip
```

Não edite `index.toml` manualmente. Ele é gerado pelo `packwiz refresh`.

## Teste Local

Para testar mudanças locais sem depender do GitHub, rode:

```powershell
packwiz serve
```

Depois configure o **Pre-launch command** da instância dev no Prism Launcher com:

```powershell
java -jar packwiz-installer-bootstrap.jar "http://127.0.0.1:8080/pack.toml"
```

Assim, o Prism usa o servidor local do packwiz para instalar ou atualizar mods, configs, quests e scripts antes de abrir o jogo.

## Contribuindo

Abra uma issue ou pull request neste repositório com sugestões, correções, novos mods, ajustes de quests ou melhorias de documentação.

Ao mudar conteúdo rastreado do pack, rode `packwiz refresh` antes de enviar a alteração.

## Créditos

- Pack mantido por [ericksantos12](https://github.com/ericksantos12).
- Modpack gerenciado com [packwiz](https://packwiz.infra.link/).
- Todos os mods pertencem aos seus respectivos autores.
