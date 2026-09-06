# SustentAgro — landing page

Site institucional da SustentAgro em Next.js 16 (App Router), TypeScript, Tailwind CSS v4,
Framer Motion, GSAP ScrollTrigger e Lenis. Pronto para deploy na Vercel.

---

## O QUE VOCÊ PRECISA TROCAR ANTES DE PUBLICAR

Tudo abaixo está reunido em poucos arquivos, de propósito.

### 1. `src/lib/site.ts` — contatos e domínio (o mais importante)

| Campo | Valor atual | Trocar quando |
|---|---|---|
| `url` | `https://sustentagro.org` | **Obrigatório.** Sitemap, robots e Open Graph usam esse endereço. Se o domínio final for outro, mude aqui. |
| `whatsapp.numero` | `5561984068770` | Número do botão flutuante e de todos os CTAs (Cristyano). |
| `whatsapp.mensagem` | mensagem padrão | Texto que já vem escrito ao abrir o WhatsApp. |
| `telefones[]` | Cristyano `(61) 98406-8770`, Fabiano `(61) 99965-4060` | Confira antes de publicar. |
| `email` | `cristyanomartins@gmail.com` | O site mostra só o botão “Envie um e-mail”, nunca o endereço. |
| `redes.instagram` | `instagram.com/sustentagrooficial` | Mostrado só como botão, sem o @ visível. |
| `endereco` | Chácara Boa Vontade, Lago Norte | Também alimenta o JSON-LD. |
| `desenvolvidoPor` | Fanny Domingos + WhatsApp `5561992770280` | Assinatura do rodapé com link de WhatsApp. |

> Divergências que resolvi com base na sua confirmação: **250 toneladas** (o .docx dizia 270),
> Instagram **@sustentagrooficial** (o deck escrevia “sustentegro”) e WhatsApp principal
> **(61) 98406-8770**.

### 2. `src/lib/conteudo.ts` — todos os textos do site

Quem somos, missão, visão, valores, produtos, números, ficha técnica, aplicações, parceiros,
equipe, reconhecimentos, notícias e FAQ. Nenhum texto está escrito dentro de componente.

### 3. Imagens — `public/images/`

As fotos atuais foram extraídas dos PDFs que você mandou, então estão na resolução do PDF
(comprimida). **Substitua pelos originais** mantendo o mesmo nome de arquivo — nada mais precisa mudar:

| Arquivo | Onde aparece | Formato ideal |
|---|---|---|
| `hero-fibra.jpg` | fundo do topo | 2000 px de largura, paisagem |
| `coco-verde.jpg` | seção do problema + miolo do diagrama | 1600×1067 |
| `plantio.jpg` | Quem somos | 1600×1067 |
| `familia.jpg` | Impacto | 1600×1067 |
| `campo.jpg` | galeria | 1920×1280 |
| `equipe-cristyano.jpg` / `equipe-fabiano.jpg` | Equipe | retrato 3:4, 1200 px de altura |
| `produto-fibra.png` / `produto-po.png` / `produto-mix.png` | cards de produto | **PNG com fundo transparente** |
| `logo-sustentagro.png` / `-branca.png` | header, rodapé, preloader, favicon | PNG transparente. Se tiver o SVG original, prefira ele. |
| `parceiros/*.png|jpg|webp` | grade de parceiros | logo em fundo transparente ou branco |

Toda imagem grande já leva a legenda **“imagem ilustrativa”**. O texto da legenda fica em
`site.legendaImagem`.

### 4. Favicon

`src/app/icon.png` e `src/app/apple-icon.png` foram gerados a partir da logo branca sobre o verde
da marca. Troque os dois arquivos se quiser outro ícone.

---

## Rodando o projeto

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de produção
npm run typecheck  # checagem de tipos
```

Deploy na Vercel: importe o repositório, sem variáveis de ambiente. O `next.config.ts` já declara
`images.qualities` (obrigatório no Next 16) e os formatos AVIF/WebP.

---

## Estrutura

```
src/
  app/
    layout.tsx          metadados, fontes, header/footer, preloader, cursor, WhatsApp
    page.tsx            a landing page (todas as seções, nesta ordem)
    artigos/page.tsx    rota /artigos
    galeria/page.tsx    rota /galeria
    globals.css         @theme com os tokens de cor e tipografia
    sitemap.ts          gera /sitemap.xml
    robots.ts           gera /robots.txt
    icon.png            favicon
  components/
    Header, Footer, Preloader, SmoothScroll, CustomCursor, WhatsAppFab
    RevealText          título palavra a palavra + FadeUp
    Counter             contador que sobe de zero
    Accordion           FAQ
    Parallax            imagem grande com parallax
    GaleriaGrid         filtro + lightbox
    JsonLd              dados estruturados
    sections/           uma seção por arquivo
  lib/
    site.ts             CONTATOS (edite aqui)
    conteudo.ts         TEXTOS (edite aqui)
    artigos.ts          lista de artigos científicos
    galeria.ts          lista de fotos
    fonts.ts            Poppins + Inter auto-hospedadas
  fonts/                .woff2 — nenhuma chamada ao Google Fonts em runtime
```

---

## Como mexer em cada coisa

### Adicionar uma foto na galeria
1. Coloque o arquivo em `public/images/galeria/` (ou em `public/images/`).
2. Acrescente um item em `src/lib/galeria.ts` com `src`, `alt`, `categoria`, `largura` e `altura`.
   A categoria nova aparece sozinha nos filtros.

Categorias já existentes: Produtos, Embalagens, Produção, Cultivos, Eventos, Equipe.

### Adicionar um artigo científico
Acrescente um item em `src/lib/artigos.ts`. Para liberar o download, coloque o PDF em
`public/artigos/` e aponte o caminho em `arquivo` (ex.: `/artigos/meu-estudo.pdf`).
Sem `arquivo` nem `link`, o card mostra “Material em produção”.

> A ficha técnica já está cadastrada apontando para `/artigos/ficha-tecnica-70-30.pdf`.
> **Coloque esse PDF na pasta `public/artigos/`** ou remova o campo `arquivo` desse item.

### Formulário de contato
Hoje ele **não usa back-end**: monta a mensagem e abre o WhatsApp já preenchido
(`src/components/sections/Contato.tsx`, função `onSubmit`). Se um dia quiser receber por e-mail,
troque o `window.open(...)` por um `fetch` para uma rota `app/api/contato/route.ts` — o resto do
formulário continua igual.

### Mudar cores ou fontes
Tudo em `src/app/globals.css`, dentro do bloco `@theme`. As classes seguem os nomes dos tokens:
`bg-verde-950`, `text-neon`, `border-fibra-500`, `font-display` etc.

### Reordenar ou remover seções
`src/app/page.tsx` — é só uma lista de componentes.

---

## Interatividade implementada

- **Preloader** curto com a marca (~1,1 s)
- **Lenis** para scroll suave em toda a página, sincronizado com o GSAP
- **Parallax** nas imagens grandes (topo, quem somos, problema, impacto)
- **Títulos revelados palavra a palavra** ao entrar na tela
- **Scroll horizontal com pin** na seção de produtos (GSAP ScrollTrigger): a seção gruda na tela e
  o scroll desloca os cards para o lado. **Abaixo de 1024px os cards empilham verticalmente** —
  o gesto de rolar no celular nunca é sequestrado
- **Diagrama interativo** em “Como funciona”: 5 pontos clicáveis em volta do coco, cada um abre um
  benefício; funciona por clique, hover e teclado
- **Painéis que expandem** em “Utilização”
- **Contadores** que sobem de zero quando o bloco está 60% visível, em ~2 s
- **Acordeão** no FAQ
- **Cursor customizado** só em desktop com ponteiro fino
- **Botão flutuante de WhatsApp**
- **Galeria** com filtro por categoria e lightbox (setas do teclado e Esc)
- **`prefers-reduced-motion`**: desliga preloader, Lenis, pin, parallax, cursor e todas as
  animações de entrada

---

## Acessibilidade e responsivo

- Responsivo de 320 px a 2560 px, sem overflow horizontal (medido — veja abaixo)
- Alvos de toque de no mínimo 40 px; nenhum texto abaixo de 10 px
- Link “Pular para o conteúdo”, `aria-expanded` nos elementos que abrem/fecham, `aria-label` nos
  botões só de ícone, foco visível, textos alternativos em todas as imagens
- Tabelas largas rolam dentro da própria caixa, sem empurrar a página

## SEO

- Metadados e Open Graph em `src/app/layout.tsx`
- JSON-LD (`Organization`, `WebSite`, `Product` ×4, `FAQPage`) em `src/components/JsonLd.tsx`
- `/sitemap.xml` e `/robots.txt` gerados pelo App Router
- `metadataBase` vem de `site.url` — por isso é importante trocar o domínio antes de publicar

---

## Verificação

Os scripts usados na verificação estão em `verificacao/` e rodam com Playwright:

```bash
npm run build && npm run start -- -p 3210
node verificacao/verificar.mjs    # larguras, overflow, console, alvos de toque
node verificacao/interacoes.mjs   # cliques reais em cada elemento interativo
node verificacao/secoes.mjs       # screenshots seção a seção
```

Resultado da última execução:

| Largura | Overflow horizontal | Erros de console | Texto < 10px | Alvos < 40px |
|---|---|---|---|---|
| 320 / 390 / 768 / 1024 / 1440 / 1920 | 0 px em `/`, `/galeria` e `/artigos` | 0 | 0 | só o link “Pular para o conteúdo”, que é invisível até receber foco |

18 de 18 testes de interação passaram: menu mobile (abrir, fechar, rolar até a seção), empilhamento
dos produtos no celular, pin horizontal no desktop, contadores, os 5 pontos do diagrama, painéis de
aplicação, acordeão do FAQ, formulário abrindo o WhatsApp com os dados, botão flutuante, filtro e
lightbox da galeria, e `prefers-reduced-motion`.
