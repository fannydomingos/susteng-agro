# SustentAgro

Landing page da SustentAgro: substratos de fibra e pó de coco produzidos a partir
do coco verde descartado.

O site é uma página inicial com as seções de produto, processo, utilização,
parceiros, notícias e contato, mais quatro páginas próprias: **A empresa**,
**Produtos**, **Artigos** e **Galeria**.

A página inicial começa com uma hero de foto em tela cheia com a marca por cima,
que dissolve no verde escuro da seção de produtos. Dali em diante o site alterna
faixas escuras e claras. Na página de produtos os quatro formatos passam para o
lado conforme a rolagem.

---

## O QUE VOCÊ PRECISA TROCAR ANTES DE PUBLICAR

Está tudo reunido em poucos arquivos. Você não precisa mexer em componente nenhum.

### 1. Contatos: `src/lib/site.ts`

Este é o arquivo mais importante. Telefone, e-mail, endereço, Instagram e WhatsApp
ficam **todos** aqui, e o site inteiro lê deste ponto. Trocar aqui muda o cabeçalho,
o rodapé, o botão flutuante, o formulário e os dados estruturados de uma vez só.

| O que trocar | Onde | Observação |
|---|---|---|
| Endereço do site publicado | `site.url` | Hoje está `https://sustentagro.org`. Precisa ser o domínio final, porque o sitemap, o robots e o compartilhamento em redes sociais usam este valor. |
| E-mail | `site.email` | Hoje está o e-mail pessoal `cristyanomartins@gmail.com`. Se a empresa tiver e-mail próprio, troque. |
| WhatsApp principal | `site.whatsapp.numero` | Só dígitos, com o 55 na frente: `5561984068770`. É o número do botão flutuante e de todos os CTAs. |
| Texto que já vem escrito no WhatsApp | `site.whatsapp.mensagem` | |
| Lista de telefones do rodapé | `site.telefones` | Nome, cargo, número para exibir e número para o link. |
| Endereço e link do mapa | `site.endereco` | |
| Instagram | `site.redes` | |
| Assinatura do rodapé | `site.desenvolvidoPor` | |
| Itens do menu | `navLinks` (no fim do arquivo) | Hoje são cinco páginas: `/`, `/quem-somos`, `/produtos`, `/artigos` e `/galeria`. Um item cujo href comece com `/#` vira âncora da página inicial e funciona. Acima de seis itens os rótulos começam a quebrar em duas linhas, então confira o resultado em 1024px. |

### 2. Textos: `src/lib/conteudo.ts`

Todo o texto do site: quem somos, missão, visão, valores, números, produtos,
como funciona, aplicações por cultivo, parceiros, reconhecimentos, notícias e o FAQ.

Confira antes de publicar:

- **os números** (`numeros`): toneladas processadas, famílias beneficiadas, CO₂ evitado e ano de início. Números públicos precisam estar corretos.
- **as especificações dos produtos** (`produtos`): granulometria, porosidade, ciclos.
- **os links das notícias** (`noticias`): confirme se as matérias ainda estão no ar.
- **o subtexto da hero** sai de `site.slogan`, em `src/lib/site.ts`, e hoje é
  "Transformando resíduos em recursos".

### 3. Artigos: `src/lib/artigos.ts`

Cada artigo tem título, resumo, autor, ano, situação (`publicado` ou `em desenvolvimento`)
e, quando existe, o caminho do PDF. Para publicar um PDF novo:

1. coloque o arquivo em `public/artigos/`;
2. aponte o campo `arquivo` para ele, por exemplo `/artigos/ficha-tecnica.pdf`;
3. troque a situação para `publicado`.

### 4. Galeria: `src/lib/galeria.ts`

Para acrescentar uma foto:

1. coloque o arquivo em `public/images/galeria/`;
2. acrescente um item na lista `fotos`, com `src`, `alt`, `categoria`, `largura`,
   `altura` e, se quiser, `legenda`;
3. use uma das categorias já existentes (Produtos, Embalagens, Produção, Cultivos,
   Eventos, Equipe) ou crie uma nova no tipo `Foto`, logo acima da lista.

**A `largura` e a `altura` precisam ser as reais do arquivo.** O Next usa esses
números para reservar o espaço da imagem, e com valores errados a página salta
enquanto carrega. As categorias do filtro saem da própria lista, na ordem em que
aparecem ali.

Antes de subir uma foto, reduza a largura para no máximo 1200px e salve como JPG
de qualidade 76 ou parecida. Fotos direto do celular ou de banco de imagens
costumam ter 4000px e vários MB, o que deixa a galeria pesada sem nenhum ganho
visível.

### 5. A imagem do substrato personalizado

**`public/images/produto-personalizado.png` é uma cópia provisória da imagem do
blend.** O quarto produto tem embalagem própria, e o arquivo dela ainda não
entrou no projeto. Para acertar, basta substituir esse arquivo pela foto certa,
com o mesmo nome. Nenhum código muda: `src/lib/conteudo.ts` já aponta para ele.

### 6. Imagens

Ficam em `public/images/`. Toda imagem de produto ou de ambiente aparece com a
legenda **"imagem ilustrativa"**, conforme combinado. O texto da legenda está em
`site.legendaImagem`, em `src/lib/site.ts`.

---

## Como rodar

Precisa do Node 20 ou mais novo.

```bash
npm install
npm run dev      # abre em http://localhost:3000
```

Outros comandos:

```bash
npm run build      # build de produção
npm start          # serve o build
npm run typecheck  # checagem de tipos do TypeScript
```

## Como publicar na Vercel

1. Suba o projeto para um repositório no GitHub.
2. Na Vercel, clique em **Add New > Project** e escolha o repositório.
3. A Vercel reconhece o Next.js sozinho. Não é preciso configurar nada.
4. Depois do primeiro deploy, aponte o domínio em **Settings > Domains**.
5. Volte em `src/lib/site.ts` e coloque o domínio final em `site.url`. Sem isso o
   sitemap e o compartilhamento em redes sociais ficam com o endereço errado.

---

## Como o projeto está organizado

```
src/
  app/
    layout.tsx          cabeçalho, rodapé, fundo, metadados e fontes
    page.tsx            a página inicial (monta as seções na ordem)
    quem-somos/page.tsx página A empresa: diretores, números, missão e valores
    produtos/page.tsx   página da linha completa de produtos
    artigos/page.tsx    página de artigos
    galeria/page.tsx    página da galeria
    globals.css         tokens de cor, tipografia e todo o sistema visual
    sitemap.ts          sitemap.xml gerado automaticamente
    robots.ts           robots.txt
  components/
    secoes/             uma pasta por seção da landing page
    ui.tsx              Secao (tema claro/escuro), cartão, botões, título, rótulo
    TrilhoProdutos.tsx  os produtos passando para o lado, com pilha no celular
    Fundo.tsx           base escura, degradê de profundidade e granulado
    Header.tsx          menu fixo, progresso de leitura e menu mobile
    ...
  lib/
    site.ts             CONTATOS (arquivo que você mais vai mexer)
    conteudo.ts         textos
    artigos.ts          artigos
    galeria.ts          fotos
    fonts.ts            fontes locais
    movimento.ts        controle de "reduzir movimento"
  fonts/                Poppins e Inter em .woff2, servidas pelo próprio site
public/
  images/               fotos, logos e mockups
  artigos/              PDFs
verificacao/            scripts de teste e as evidências geradas
```

## Ritmo de faixas claras e escuras

A página não é monocromática: ela alterna faixas. Quem controla isso é a prop
`tema` do componente `Secao`, em `src/components/ui.tsx`.

| Seção | Faixa |
|---|---|
| Hero | foto, dissolve no verde escuro |
| Produto | escura |
| Como funciona | escura |
| Utilização | escura |
| Parceiros | **clara** |
| Notícias | **clara** |
| Contato | escura |

Na página de artigos, as parcerias de pesquisa também são uma faixa clara. Na de
produtos, as faixas alternam formato a formato.

A empresa, artigos e galeria não têm bloco de chamada na página inicial: chega-se
a eles pelo menu. As dúvidas frequentes ficam na página de produtos, junto dos
formatos.

Na página A empresa a abertura é escura e o resto é uma faixa clara.

**O corte entre faixas é reto.** A única passagem em degradê do site é a da hero
para a seção seguinte, e ela vive dentro do próprio componente `Hero`. O fundo da
faixa clara tem um degradê interno que começa e termina na mesma cor, então duas
faixas claras seguidas encostam sem deixar risco na junção.

O fundo fixo da página (`Fundo.tsx`) é uma cor chapada, e isso é de propósito.
Havia ali um degradê radial mais claro no topo, e como a camada é fixa, o topo da
tela ficava sempre mais verde que o resto: na emenda entre a hero e a seção
seguinte aparecia um degrau horizontal que mudava de lugar conforme a rolagem, e
não havia cor fixa que casasse. O degradê de profundidade passou para onde ele
pode terminar numa cor certa: a base da hero.

As duas outras props da `Secao`:

- `tema="claro"` pinta a faixa clara e troca sozinho a cor do texto e do
  destaque. O verde `#B6FF89` tem contraste alto no escuro e quase nenhum no
  claro, então na faixa clara as palavras destacadas passam para o verde
  profundo da paleta. Isso é feito por variáveis CSS (`--grad-destaque`), sem
  que nenhum componente precise saber em que fundo está.
- `luz` acende uma mancha verde atrás do conteúdo das faixas escuras.

## A tela de carregamento

`src/components/Preloader.tsx`. A marca é revelada de baixo para cima, com um
fio de luz subindo junto, como o substrato enchendo o saco. Por baixo fica a
mesma marca a 16% de opacidade: é contra ela que a revelação ganha contorno.
O recorte é feito com `clip-path`, então a animação roda no compositor e não
repinta a imagem quadro a quadro.

A saída não é por tempo fixo. A tela espera a página carregar de verdade
(evento `load`), com um piso de 1,65s para a animação não ser cortada no meio e
um teto de 3s para uma imagem lenta não segurar ninguém. Os dois números estão
no topo do arquivo, em `MINIMO` e `TETO`. Com movimento reduzido a tela nem
aparece.

## O cursor nas duas faixas

`src/components/CustomCursor.tsx`, só onde existe um cursor de verdade para
substituir: tela a partir de 1024px, ponteiro de precisão **e** hover
disponível. `pointer: fine` sozinho não bastava, porque um tablet com caneta
responde fine e ali não há cursor nenhum; o `hover: hover` corta os aparelhos de
toque. A consulta fica escutando, então diminuir a janela no computador desliga
o cursor na hora, e não só na próxima carga. Também desligado com movimento
reduzido.

Como a página alterna faixas, o cursor consulta em que faixa está a cada
movimento (e a cada rolagem, porque a faixa muda mesmo com o ponteiro parado) e
troca de cor: verde de destaque no escuro, verde profundo no claro. O
`#B6FF89` some no branco, então sem essa troca o cursor desaparecia nas seções
claras. A checagem usa `elementFromPoint` e escreve o resultado numa classe, sem
estado do React.

## Os produtos passando para o lado

Em `src/components/TrilhoProdutos.tsx`. Acima de 1024px os quatro formatos
formam um trilho horizontal: cada um ocupa a tela inteira e eles passam para o
lado conforme a pessoa rola.

A técnica é `position: sticky` mais um deslocamento em X ligado ao progresso da
rolagem. Não há "pin" de biblioteca nenhuma, e isso é de propósito: a rolagem
continua um para um com o gesto, o navegador não perde o controle dela e a barra
de rolagem continua dizendo a verdade.

Dois números importam ali:

- a altura do trilho é `(quantidade de produtos × 100 + 60)vh`. Os 60vh extras
  são a pausa no último formato;
- o deslocamento termina em 82% do curso (`FIM`), não em 100%. Sem essa folga, o
  trilho descolava do topo no mesmo instante em que o quarto produto chegava ao
  centro, e ninguém conseguia ler o painel.

Abaixo de 1024px o trilho vira uma pilha vertical comum, com o mesmo conteúdo.
Sequestrar o gesto de rolagem no celular é ruim.

## Sistema visual

**Paleta** (definida no bloco `@theme` de `globals.css`, é de onde o Tailwind lê):

| Token | Cor | Uso |
|---|---|---|
| `--color-abismo` | `#02100F` | fundo da página |
| `--color-verde-950` | `#051F20` | base escura |
| `--color-verde-900` | `#0B2B26` | |
| `--color-verde-800` | `#163832` | |
| `--color-verde-700` | `#235347` | |
| `--color-sage` | `#8EB69B` | apoio |
| `--color-menta` | `#DAF1DE` | texto sobre fundo escuro |
| `--color-nevoa` | `#F5FAF6` | fundo das faixas claras |
| `--color-nevoa-2` | `#E7F2E9` | fundo das faixas claras, nas pontas |
| `--color-destaque` | `#B6FF89` | palavras em destaque, botões e luzes (só no escuro) |

**Tipografia:** Poppins nos títulos, Inter no texto corrido, monoespaçada nos
rótulos técnicos. As fontes são servidas pelo próprio site, de `src/fonts`. Não há
chamada ao Google Fonts em tempo de execução.

**Recursos visuais:** tela de carregamento que revela a marca, hero com parallax
de duas velocidades, trilho horizontal
dos produtos, manchas de luz dentro das seções escuras, granulado sutil, cartões
de vidro com borda em degradê, holofote que segue o ponteiro, esteira com pulso de
luz, fita contínua de parceiros e rolagem suave com Lenis. A grade técnica do
fundo foi removida.

A separação de conteúdo é feita por régua fina e espaço, não por caixas. Listas,
números e especificações usam linha de 1px; a única caixa que sobrou é a do
formulário de contato, que precisa de um contorno para se ler como formulário.

### Cinco armadilhas que já custaram caro, para não repetir

1. **Não declare `position` numa classe de `@layer utilities` do `globals.css`.**
   A classe do arquivo e o utilitário do Tailwind vivem na mesma camada, e quem
   vem depois vence. Um `position: relative` na classe `.vidro` anulou o
   `absolute` das etiquetas do topo da página. Quem usa `.vidro` define a posição
   pelo Tailwind.

2. **O que muda o HTML conforme a preferência de movimento precisa esperar a
   montagem.** Use `useMovimentoReduzido` / `usePodeAnimar` de `src/lib/movimento.ts`
   em vez do `useReducedMotion` direto. Sem isso, o HTML do servidor e o do
   navegador saem diferentes e o React acusa erro de hidratação.

3. **Mancha de luz dentro de seção precisa de recorte horizontal.** A mancha é
   maior que a seção de propósito. Sem `overflow-x-clip`, ela empurrava a largura
   da página e criava rolagem horizontal, o que no celular jogava o botão do
   menu para fora da tela. É `overflow-x-clip` e não `overflow-hidden` porque
   este último quebraria o `position: sticky` das embalagens na página de
   produtos.

4. **Âncora interna: calcule a posição em pixels.** O `SmoothScroll` mede o
   destino com `getBoundingClientRect` em vez de entregar o elemento ao Lenis.
   Passando o elemento, o cálculo depende de `offsetTop` e da cadeia de
   `offsetParent`, e com as seções posicionadas a âncora parava quase 300px
   abaixo do início da seção. Hoje ela para sempre a 96px do topo, que é a
   altura do cabeçalho fixo mais um respiro (`FOLGA_TOPO`).

5. **Painel de tela cheia precisa reservar o cabeçalho.** Os painéis do trilho
   têm `pt-20 pb-28`: sem isso o título do produto passava por baixo do
   cabeçalho fixo e a barra de progresso cobria o botão de orçamento. O padding
   reduz a área de centralização, então o conteúdo centraliza no que sobra.

## Acessibilidade e desempenho

- Responsivo de 320px a 2560px, sem rolagem horizontal em nenhuma largura.
- Folga lateral do conteúdo em três passos: 24px no celular, 28px a partir de
  480px e 32px a partir de 768px (`.container-marca`, em `globals.css`).
- Na seção de produtos da página inicial, a embalagem vem antes do texto no
  celular e volta para a direita no computador, pela propriedade `order`.
- Alvos de toque com no mínimo 44px.
- Nenhum texto abaixo de 10px.
- `prefers-reduced-motion` respeitado: sem preloader, sem rolagem suave, sem cursor
  próprio e com todas as animações desligadas.
- Link "Pular para o conteúdo", marcos semânticos, `aria-expanded` nos elementos que
  abrem e fecham, e foco visível.
- Imagens pelo `next/image`, com `sizes` e as qualidades declaradas em `next.config.ts`.
- SEO: JSON-LD (organização, produtos e FAQ), Open Graph, `sitemap.xml` e `robots.txt`.

---

## Verificação

Os scripts em `verificacao/` medem o site rodando, em vez de conferir por inspeção
visual. Com o site no ar em `localhost:3210` (`npx next start -p 3210`):

```bash
node verificacao/verificar.mjs    # larguras, overflow, console, alvos, travessões
node verificacao/interacoes.mjs   # cliques e digitação de verdade
node verificacao/olhada.mjs       # percorre as páginas e fotografa
```

As três rodam nas cinco rotas do site: `/`, `/quem-somos`, `/produtos`, `/artigos`
e `/galeria`.

As evidências ficam em `verificacao/evidencias/` e os relatórios em
`verificacao/relatorio-medidas.json` e `verificacao/relatorio-interacoes.json`.

### Resultado da última rodada

**Medidas** em `/`, `/quem-somos`, `/produtos`, `/artigos` e `/galeria`, nas
larguras 320, 390, 768, 1024, 1440 e 1920px (30 combinações):

| Verificação | Resultado |
|---|---|
| Overflow horizontal no topo | 0px em todas |
| Overflow horizontal depois de rolar a página inteira | 0px em todas |
| Erros de console | 0 em todas |
| Texto abaixo de 10px | nenhum |
| Alvos de toque menores que 40px | nenhum |
| Travessões no texto lido pelo visitante | nenhum |

**Interações:** 54 testes, todos passando. Entre eles:

- a hero ocupa a tela com a foto, a marca por cima e a legenda obrigatória;
- ao descer, a marca desaparece e a foto se desloca em ritmo diferente (parallax);
- a página alterna faixas claras e escuras na ordem prevista, e na faixa clara o
  destaque troca de cor sozinho;
- a grade técnica não existe mais no fundo;
- o corte entre faixas é reto, sem degradê de passagem;
- a tela de carregamento revela a marca de baixo para cima: o teste amostra o
  recorte de ponta a ponta e exige que ele comece cobrindo tudo, caia sem voltar
  atrás e termine descoberto, e que a tela saia sozinha devolvendo a rolagem;
- a hero dissolve no verde escuro sem deixar degrau na emenda com a seção
  seguinte;
- abrir o site num endereço com âncora, como `/#contato`, cai na seção e o
  cabeçalho fixo não cobre o começo dela;
- cada âncora do menu para a 96px do topo da seção certa;
- cada item do menu abre a página certa, com H1, e fica marcado ao chegar;
- com cinco itens o menu completo cabe em 1024px, sem rótulo quebrando em duas
  linhas, e abaixo disso fica o botão;
- na seção de produto, o botão em destaque é "Ver todos os produtos" e o apagado é
  "Solicitar orçamento", e o primeiro abre mesmo a página da linha;
- a página de produtos ficou só com os quatro formatos, cada um ocupa a tela
  inteira, o trilho fica grudado no topo, os formatos passam para o lado conforme
  a rolagem, o quarto fica inteiro na tela no fim e cada um tem o próprio pedido
  de orçamento com o nome na mensagem;
- no celular o trilho vira pilha vertical, sem sequestrar o gesto de rolagem;
- na página de artigos, as parcerias de pesquisa estão em faixa clara própria,
  fora da lista de artigos;
- a página A empresa mostra os dois donos, com nome, cargo e o WhatsApp de cada
  um apontando para o próprio número;
- o cursor troca de cor entre as faixas e tem mais de 4,5:1 de contraste nas
  duas, medido pela fórmula da WCAG e não a olho;
- no celular o cursor próprio nem chega a existir;
- no celular a embalagem aparece antes do título e dos botões na seção de
  produtos, e no computador o texto volta para a esquerda (medido pela posição
  na tela, porque quem inverte é o `order` do CSS);
- no celular o conteúdo tem pelo menos 24px de folga lateral;
- os quatro formatos apontam para quatro arquivos de imagem diferentes;
- quem somos, artigos e galeria saíram da página inicial e continuam no menu;
- as dúvidas frequentes saíram da página inicial e abrem e fecham na de produtos;
- todas as 16 fotos da galeria carregam de verdade, com texto alternativo;
- os contadores sobem de zero até o valor final;
- a esteira de seis etapas avança sozinha;
- a linha de cultivo abre ao clicar, sem cartão em volta;
- o acordeão do FAQ abre e fecha;
- o formulário monta a mensagem e abre o WhatsApp com os dados preenchidos;
- as notícias são lista editorial e abrem em nova aba;
- a galeria filtra, o lightbox abre, fecha e devolve a rolagem;
- o menu mobile abre, trava a rolagem de trás, rola até a seção e navega para as
  páginas;
- com `prefers-reduced-motion` nada anima e todo o texto aparece.

**Defeitos que a verificação encontrou e foram corrigidos até aqui:** a mancha de
luz sem recorte criava rolagem horizontal no celular e jogava o botão do menu para
fora da tela; a âncora interna parava quase 300px abaixo do início da seção; a foto
de `plantio.jpg`, desfocada na origem, não sustentava a banda larga de Quem somos e
foi trocada; o trilho de produtos descolava do topo antes de dar tempo de ler o
último formato, e o título dele passava por baixo do cabeçalho; com oito itens o
menu não cabia em 1024px, com dois rótulos quebrando em duas linhas; o cursor
desaparecia sobre as faixas claras; e o degradê radial do fundo fixo deixava um
degrau horizontal na emenda da hero.
