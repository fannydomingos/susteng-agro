/**
 * BANCO DE FOTOS DA SUSTENTAGRO
 * Para adicionar uma foto: coloque o arquivo em public/images/galeria/
 * e acrescente um item nesta lista. As categorias saem daqui automaticamente.
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
    src: "/images/produto-fibra.png",
    alt: "Embalagem de Fibra de Coco SustentAgro",
    categoria: "Embalagens",
    largura: 900,
    altura: 1200,
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
    alt: "Família em área verde — comunidades beneficiadas pelo projeto",
    categoria: "Eventos",
    largura: 1600,
    altura: 1067,
  },
];

export const categorias = ["Todas", ...Array.from(new Set(fotos.map((f) => f.categoria)))] as const;
