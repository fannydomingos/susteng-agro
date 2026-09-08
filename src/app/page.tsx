import Hero from "@/components/secoes/Hero";
import Produto from "@/components/secoes/Produto";
import ComoFunciona from "@/components/secoes/ComoFunciona";
import Utilizacao from "@/components/secoes/Utilizacao";
import Parceiros from "@/components/secoes/Parceiros";
import Noticias from "@/components/secoes/Noticias";
import Contato from "@/components/secoes/Contato";
import JsonLd from "@/components/JsonLd";

/**
 * LANDING PAGE
 *
 * O ritmo alterna faixas escuras e claras, para a página não ficar
 * monocromática:
 *
 *   Hero          foto, dissolve no verde escuro
 *   Produto       escura
 *   Como funciona escura
 *   Utilização    escura
 *   Parceiros     CLARA  ─┐ as duas formam uma faixa clara só
 *   Notícias      CLARA  ─┘
 *   Contato       escura
 *
 * Quem somos, artigos e galeria não têm bloco de chamada aqui: chega-se a
 * eles pelo menu. As dúvidas frequentes moraram nesta página e passaram
 * para a de produtos.
 *
 * O corte entre faixas é reto. A única passagem em degradê é a da hero
 * para a seção seguinte, feita dentro do próprio componente Hero.
 */
export default function Home() {
  return (
    <>
      <JsonLd />
      <Hero />
      <Produto />
      <ComoFunciona />
      <Utilizacao />
      <Parceiros />
      <Noticias />
      <Contato />
    </>
  );
}
