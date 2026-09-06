/**
 * ARTIGOS CIENTÍFICOS E TRABALHOS TÉCNICOS
 * Cada item vira um card na página /artigos.
 * - `arquivo`: PDF em public/artigos/ (opcional)
 * - `link`: URL externa (opcional)
 * - `status`: "publicado" | "em-andamento"
 */

export type Artigo = {
  titulo: string;
  resumo: string;
  autores?: string;
  ano?: string;
  instituicao?: string;
  tipo: "Artigo" | "Ficha técnica" | "Estudo de caso" | "Relatório" | "Pesquisa";
  status: "publicado" | "em-andamento";
  arquivo?: string;
  link?: string;
};

export const artigos: Artigo[] = [
  {
    titulo: "Ficha técnica agronômica — Fibra de coco 70/30 SustentAgro",
    resumo:
      "Caracterização física e química do substrato: densidade, porosidade, espaço de aeração, retenção de água, pH, condutividade elétrica, matéria orgânica e relação C/N, além das recomendações de manejo.",
    autores: "Equipe técnica SustentAgro",
    ano: "2025",
    tipo: "Ficha técnica",
    status: "publicado",
    // Coloque o PDF em public/artigos/ficha-tecnica-70-30.pdf para ativar o download
    arquivo: "/artigos/ficha-tecnica-70-30.pdf",
  },
  {
    titulo: "Rastreabilidade digital do resíduo de coco verde",
    resumo:
      "Registro digital de todas as etapas do lote — coleta, transporte, recebimento, triagem, processamento e expedição — com data, hora, peso e responsável técnico, encerrando em QR Code por lote.",
    autores: "SustentAgro",
    ano: "2025",
    tipo: "Estudo de caso",
    status: "publicado",
  },
  {
    titulo: "Desempenho de substrato de fibra de coco em mudas de frutíferas",
    resumo:
      "Estudo em andamento sobre desenvolvimento radicular, retenção hídrica e economia de irrigação em viveiros de mudas frutíferas no Distrito Federal.",
    instituicao: "Em parceria com instituições de pesquisa do DF",
    tipo: "Pesquisa",
    status: "em-andamento",
  },
  {
    titulo: "Balanço de carbono do reaproveitamento do coco verde no DF e RIDE",
    resumo:
      "Levantamento das emissões de gases de efeito estufa evitadas pelo desvio do resíduo de coco verde de aterros e lixões, com base no volume processado pela SustentAgro.",
    tipo: "Relatório",
    status: "em-andamento",
  },
];
