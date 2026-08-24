---
name: Periodic Table Quiz
register: product
platform: web
colors:
  light:
    background: "#F5F7FC"
    surface: "#FFFFFF"
    surfaceRaised: "#EDF1FA"
    text: "#14213D"
    textMuted: "#53617A"
    border: "#CBD4E5"
    accent: "#4059D6"
    focus: "#007F9D"
    success: "#147D4A"
    error: "#C33D52"
  dark:
    background: "#09111F"
    surface: "#111D31"
    surfaceRaised: "#192842"
    text: "#F5F7FC"
    textMuted: "#B4C0D6"
    border: "#40506B"
    accent: "#8297FF"
    focus: "#4DD8F0"
    success: "#48C78E"
    error: "#FF7A8E"
typography:
  family: "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
  scale: [11, 12, 14, 16, 20, 24, 32]
spacing: [4, 8, 12, 16, 24, 32, 48, 64]
radii: [8, 10, 12]
motion:
  fast: 150
  standard: 180
---

# Visual Theme

“Atlas periódico” é uma interface educacional compacta em que a tabela domina a tela. Superfícies sólidas, bordas finas e sombras discretas estabelecem hierarquia sem competir com as cores das famílias químicas. O tema claro usa um fundo quase branco azulado; o escuro usa azul-preto e superfícies azul-marinho.

# Color Palette

Os tokens do frontmatter são a referência de contraste. A implementação usa equivalentes em OKLCH para ajustes perceptuais. O índigo identifica ações e progresso, ciano identifica foco, verde substitui a família em acertos e coral substitui a família no último erro. Dez cores suaves representam famílias químicas; cada uma conserva contraste de texto AA. Cor nunca comunica estado sozinha: borda, ícone, texto e rótulo acessível acompanham acerto e erro.

# Typography

Uma única família `system-ui` reduz latência e mantém legibilidade entre plataformas. A escala fixa prioriza 11–16 px no tabuleiro compacto e 20–32 px somente em títulos de conclusão. Símbolos usam peso 750; números atômicos usam peso 600; textos corridos usam 400–500. Altura de linha varia entre 1 e 1,5 conforme densidade.

# Components

- `TopBar`: marca de átomo, fase, quatro marcadores de progresso, alternância de tema e reinício inline.
- `ChallengeBar`: pista atual e feedback educacional anunciado por `aria-live`.
- `PeriodicTable`: grade semântica de 18 colunas e 9 linhas, células por família e roving tabindex.
- `OrientationHint`: aviso não bloqueante e dispensável, exclusivo do celular em retrato.
- `CompletionPanel`: conclusão de fase ou campanha dentro do fluxo, com uma ação explícita.
- `CategoryLegend`: lista das dez famílias; aberta no desktop e recolhida em telas menores.
- Botões: raio de 8–10 px, borda sólida, foco ciano de 3 px e estados de pressão sem animação ornamental.

# Layout

O shell tem largura máxima de 1.440 px e respeita safe areas. Em celular paisagem com ponteiro coarse e até 500 px de altura, ocupa exatamente `100dvh`, bloqueia rolagem da página e calcula cada célula pela menor dimensão disponível entre 18 colunas e 9 linhas. Em 568×320, rótulos secundários somem e controles ficam apenas com ícones. Em retrato, dica e progresso precedem uma tabela de células de 44 px com rolagem horizontal nativa e pistas de continuidade nas bordas. Tablet e desktop exibem a tabela inteira, centralizada, com células de até 52 px.

# Motion

Movimento serve apenas para confirmar mudança de estado. Botões e células respondem em 150 ms; feedback troca em até 180 ms com uma leve mudança de opacidade e escala. Não há coreografia de entrada, paralaxe, bounce ou animações contínuas. `prefers-reduced-motion: reduce` reduz todas as transições a praticamente zero.
