# Arcanes And Weapons — contexto do projeto

Documento para orientar leitura e evolução do repositório. Stack e caminhos refletem o estado do código na data de elaboração.

## Visão geral

- **Nome no `package.json`:** `aa-game` (nome de exibição Capacitor: `aa-game`).
- **Conceito:** RPG de cartas. O README descreve **dois produtos futuros**: app do **jogador** e app do **narrador**. **Este repositório é o app do jogador**, para gerenciar cartas e estado de personagem na mesa.
- **Stack principal:** **Angular 21** (standalone components, signals), **Ionic Angular 8**, **Capacitor 7** (Android), **TypeScript**, estilos em **Less**.
- **Plugins Capacitor usados no código:** `@capacitor/screen-orientation` (trava retrato na inicialização), `@capacitor-community/keep-awake` (mantém tela ligada). Há também dependências declaradas em `package.json` alinhadas ao ecossistema Ionic/Capacitor.

## Estrutura de pastas (nível alto)

| Área | Descrição |
|------|-----------|
| `src/` | Código da SPA Angular. |
| `src/app/` | Raiz do app: `App`, rotas, configuração. |
| `src/app/services/` | Serviços partilhados (ex.: persistência de sessão). |
| `src/app/game-components/` | UI e lógica de jogo (componentes standalone). |
| `src/app/static/` | Dados estáticos e modelos: `Cards`, `CardModel`, `MagicCardModel`. |
| `src/styles.less`, `src/app/*.less` | Estilos globais e do shell. |
| `android/` | Projeto Gradle Android gerado/integrado ao Capacitor (`com.aagame.app`). |
| `capacitor.config.ts` | `appId`, `appName`, `webDir: dist/aa-game/browser`. |
| `angular.json` | Projeto CLI `aa-game`, build com `@angular/build:application`, assets referenciando `public/`. |

## Fluxo da aplicação

1. **`main.ts`:** registra ícones (`setupIcons` em `src/icons.ts`) e faz `bootstrapApplication(App, appConfig)`.
2. **`app.config.ts`:** `provideRouter` com rotas vazias, `IonicModule.forRoot()`, listeners de erro do browser.
3. **`app.routes.ts`:** **sem rotas definidas** (`Routes = []`); o `<router-outlet />` existe no template mas a navegação principal é um único shell.
4. **`App` (`app.ts` + `app.html`):**
   - Escolhe fundo aleatório conforme largura (mobile vs. desktop).
   - Sequência de **splash / init** com `InitScreen`: logos, animações, depois esconde a init.
   - Em paralelo ao conteúdo principal: **`app-game`** — tela de jogo completa.

## Componentes principais (`game-components/`)

| Componente | Papel resumido |
|------------|----------------|
| **`game`** | Orquestra estado do jogador: HP, nível, dano, dados (D20/D12/D4), cartas de classe/raça/arma/VD/magias, mochila, baú, loja de magias, mensagens, modais de troca, reset com “flash”, e integração com persistência em `localStorage`. |
| **`cards-scroll`** | Carrossel/listagem de cartas para escolha (VD, visualização de magias, “carrinho” de compra de magias). |
| **`bag`** | Exibe itens e pedras da mochila; emite evento ao usar item. |
| **`modal-itens`** | Modal de confirmação de itens recebidos (ex.: baú). |
| **`action-config`** | Action sheet de configuração: trocar item, resetar partida. |
| **`item-change`** | Fluxo de troca de itens entre jogadores (evento com item desejado / ofertado). |
| **`messages`** | Exibição breve de mensagens (ex.: “Pedras insuficientes!”). |
| **`init-screen`** | Tela inicial animada com imagem e classes CSS de animação. |

A classe **`Game`** instancia **`Cards`** (`src/app/static/cards.ts`) como fonte única de definições de cartas.

## Modelos de dados

- **`CardModel`:** `id`, `name`, `source` (caminho de imagem), `isWeapon`, `attack`, `equipInClass`, `isStone`.
- **`MagicCardModel`:** custos por tipo de pedra — `arcaneCost`, `deathCost`, `elementalCost`, `holyCost`.
- **`Cards`:** arrays estáticos — `classes`, `races`, `vd` (vantagens/desvantagens), `itens`, `stones`, `magic` (dezenas de magias). Imagens sob `assets/cards/...` (alguns paths com `/assets`, outros sem barra inicial — convênio misto no código).

## Regras de jogo implementadas (síntese)

- **Classe e raça:** sorteio aleatório entre 4 opções cada.
- **VD:** abre carrossel para escolher uma carta entre as disponíveis.
- **Arma:** só equipa se `equipInClass` bater com a classe atual; atualiza dano (`level + attack` da arma).
- **Baú (`treasureShuffle`):** após ter classe, raça e VD, sorteia itens e pedras para um modal; ao confirmar, entram na mochila (`bagCards` / `bagStones`).
- **Magias:** com pedras na mochila, abre “loja” (carrossel); compra consome pedras conforme custos da magia.
- **Troca de itens:** action sheet → modal `item-change`; remove um item da mochila e adiciona o escolhido.
- **Reset:** limpa atributos, cartas equipadas, mesa e mochila e **apaga a sessão persistida** (ver abaixo).

---

## Persistência de sessão (`localStorage`)

Implementado para o progresso sobreviver a **fechar o app** ou **recarregar a página** (web e WebView Android).

| Ficheiro | Conteúdo |
|----------|----------|
| [`src/app/services/game-persistence.service.ts`](src/app/services/game-persistence.service.ts) | `SessionSnapshot` com `schemaVersion: 1`, chave `aa-game-session`, `load()` / `save()` com validação e `try/catch`, `saveDebounced()` (~250 ms), `clear()`. |
| [`src/app/game-components/game.ts`](src/app/game-components/game.ts) | `inject(GamePersistenceService)`; no construtor `load()` + `applySnapshot()` se existir dados; `effect()` que persiste via `buildSnapshot()` + `saveDebounced`; `resetGame()` chama `persistence.clear()`; ao restaurar: `diceRolled` e `selectedCard` em estado seguro; `hasMagic` alinhado a `magicCards.length`; após comprar magia atualiza `hasMagic`; `tableCards` tipado como `signal<unknown[]>([])`. |

O snapshot inclui atributos, dados, classe/raça/arma/escravo/VD, `magicCards`, `bagCards`, `bagStones`, `tableCards`. Não persistem modais, carrosséis temporários nem overlay de carta ampliada.

---

## UI mobile: carta ampliada (`.card-view`)

Problema corrigido: em alguns WebViews após atualização do SO, a carta grande aparecia no canto (uso de `position: absolute` sem ancestral posicionado + `anchor-center` experimental).

Solução em [`src/app/game-components/game.less`](src/app/game-components/game.less): `.card-view` como **overlay** `position: fixed`, `inset: 0`, `z-index: 1000` (acima do jogo e da `.mask-card` em 999), flex para centrar, `env(safe-area-inset-*)`, fundo escuro semitransparente; `img` com `max-width` / `max-height` (incl. `dvh` e safe area), `object-fit: contain`, sem `absolute`/`anchor-center`.

---

## Build web e APK Android

- **Web:** `npm run build` → `dist/aa-game/browser` (Capacitor usa esta pasta via `webDir`).
- **Sincronizar nativo:** `npx cap sync android` (recomendado em vez de só `cap copy` quando há plugins).
- **APK debug:** na pasta `android`, `.\gradlew.bat assembleDebug` (Windows). Saída típica: `android/app/build/outputs/apk/debug/app-debug.apk`.

### Gradle e Java

O Capacitor 7 pede Java 21 nos módulos Android; em ambientes com JDK 20 (ou sem 21), o build pode falhar com `invalid source release: 21`. Foi adicionado em [`android/build.gradle`](android/build.gradle) um bloco `subprojects { afterEvaluate { ... } }` que força `sourceCompatibility` / `targetCompatibility` para **Java 17** em bibliotecas e aplicação, compatível com JDK 17+ na máquina.

---

## Testes e qualidade

- **`ng test`:** Vitest via `@angular/build:unit-test`. Existe [`src/app/services/game-persistence.service.spec.ts`](src/app/services/game-persistence.service.spec.ts) com mock de `localStorage`.
- **`src/app/app.spec.ts`:** pode falhar por resolução ESM do Ionic em ambiente de teste (`@ionic/core/components`); é um problema de configuração do runner, não do serviço de persistência.
- **Budget de estilo:** `game.less` pode ultrapassar o aviso de `anyComponentStyle` no `angular.json` (~4 kB); ajustar budgets ou aceitar o warning.

---

## Observações úteis para quem mantém o código

- Rotas estão vazias: qualquer feature que precise de URLs dedicadas exige estender `app.routes.ts` e o template do `App`.
- O `Game` concentra muita regra e estado; evoluções podem extrair mais lógica para serviços se o app crescer.
- Assets: `angular.json` aponta para a pasta `public/`; garantir que imagens referenciadas em `/assets/...` existam nesse fluxo de build.
- Outros ficheiros ainda usam `justify-self: anchor-center` / `align-self: anchor-center` em overlays; se algo quebrar no mobile, aplicar o mesmo padrão que `.card-view` (flex + `fixed` + safe-area) em [`cards-scroll.less`](src/app/game-components/cards-scroll/cards-scroll.less), [`bag.less`](src/app/game-components/bag/bag.less), [`messages.less`](src/app/game-components/messages/messages.less), etc.

---

*Arquivo `context.md` na raiz — resumo do repositório para onboarding e IA.*
