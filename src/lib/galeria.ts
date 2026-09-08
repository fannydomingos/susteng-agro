/**
 * BANCO DE FOTOS DA SUSTENTAGRO
 *
 * Para adicionar uma foto:
 *   1. coloque o arquivo em public/images/galeria/;
 *   2. acrescente um item nesta lista, com `largura` e `altura` reais do
 *      arquivo (o Next usa esses números para reservar o espaço e evitar
 *      que a página salte enquanto a imagem carrega);
 *   3. use uma das categorias já existentes, ou crie uma nova no tipo `Foto`.
 *
 * As categorias do filtro saem desta lista automaticamente, na ordem em que
 * aparecem aqui.
 */

export type Foto = {
  src: string;
  alt: string;
  categoria: "Produtos" | "Embalagens" | "Produção" | "Cultivos" | "Eventos" | "Equipe";
  largura: number;
  altura: number;
  legenda?: string;
};

export const fotos: Foto[] = [
  {
    src: "/images/galeria/coqueiro-cacho.jpg",
    alt: "Cacho de cocos verdes no coqueiro, visto de baixo",
    categoria: "Produtos",
    largura: 1200,
    altura: 1697,
    legenda: "A matéria-prima ainda no pé, antes da colheita e do descarte da casca",
  },
  {
    src: "/images/galeria/coqueiral.jpg",
    alt: "Coqueiral ao sol, com vegetação rasteira em primeiro plano",
    categoria: "Produtos",
    largura: 1200,
    altura: 1697,
    legenda: "Coqueiral: a origem do resíduo que a SustentAgro reprocessa",
  },
  {
    src: "/images/galeria/fibra-detalhe.jpg",
    alt: "Fibra de coco em detalhe, sob luz dourada, em bancada de madeira",
    categoria: "Produção",
    largura: 1200,
    altura: 1697,
    legenda: "Fibra longa, de 5 a 25 mm, depois da separação granulométrica",
  },
  {
    src: "/images/galeria/substrato-galpao.jpg",
    alt: "Pilha de substrato de fibra e pó de coco em galpão de produção",
    categoria: "Produção",
    largura: 1200,
    altura: 1697,
    legenda: "Blend de fibra e pó pronto para embalagem",
  },
  {
    src: "/images/galeria/fibra-mirtilo.jpg",
    alt: "Mirtilos sobre uma camada de fibra de coco",
    categoria: "Cultivos",
    largura: 1200,
    altura: 1697,
    legenda: "Mirtilo é um dos cultivos atendidos pela linha de frutas vermelhas",
  },
  {
    src: "/images/galeria/substrato-frutas-vermelhas.jpg",
    alt: "Frutas vermelhas e tomates sobre substrato de coco",
    categoria: "Cultivos",
    largura: 1200,
    altura: 1697,
    legenda: "Morango, framboesa, amora e tomate: culturas de maior demanda pelo substrato",
  },
  {
    src: "/images/produto-fibra.png",
    alt: "Embalagem de Fibra de Coco SustentAgro",
    categoria: "Embalagens",
    largura: 872,
    altura: 1140,
  },
  {
    src: "/images/produto-po.png",
    alt: "Embalagem de Pó de Coco SustentAgro",
    categoria: "Embalagens",
    largura: 900,
    altura: 1200,
  },
  {
    src: "/images/produto-mix.png",
    alt: "Embalagem de Mix de fibra e pó de coco SustentAgro",
    categoria: "Embalagens",
    largura: 900,
    altura: 1200,
  },
  {
    src: "/images/hero-fibra.jpg",
    alt: "Pilha de fibra de coco processada",
    categoria: "Produção",
    largura: 1400,
    altura: 2508,
  },
  {
    src: "/images/coco-verde.jpg",
    alt: "Cocos verdes na palmeira",
    categoria: "Produtos",
    largura: 1600,
    altura: 1067,
  },
  {
    src: "/images/plantio.jpg",
    alt: "Área de plantio atendida com substratos da SustentAgro",
    categoria: "Cultivos",
    largura: 1600,
    altura: 1068,
  },
  {
    src: "/images/campo.jpg",
    alt: "Lavoura ao entardecer",
    categoria: "Cultivos",
    largura: 1920,
    altura: 1278,
  },
  {
    src: "/images/equipe-cristyano.jpg",
    alt: "Cristyano Martins, diretor executivo, em estufa de mudas",
    categoria: "Equipe",
    largura: 800,
    altura: 1067,
  },
  {
    src: "/images/equipe-fabiano.jpg",
    alt: "Fabiano Martins, diretor operacional, em estufa de mudas",
    categoria: "Equipe",
    largura: 800,
    altura: 1067,
  },
  {
    src: "/images/familia.jpg",
    alt: "Família em área verde, representando as comunidades beneficiadas pelo projeto",
    categoria: "Eventos",
    largura: 1600,
    altura: 1067,
  },
];

export const categorias = ["Todas", ...Array.from(new Set(fotos.map((f) => f.categoria)))] as const;
