import Hero from "@/components/sections/Hero";
import Numeros from "@/components/sections/Numeros";
import QuemSomos from "@/components/sections/QuemSomos";
import Diagnostico from "@/components/sections/Diagnostico";
import ProdutosHorizontal from "@/components/sections/ProdutosHorizontal";
import ComoFunciona from "@/components/sections/ComoFunciona";
import Aplicacoes from "@/components/sections/Aplicacoes";
import Rastreabilidade from "@/components/sections/Rastreabilidade";
import FichaTecnica from "@/components/sections/FichaTecnica";
import Impacto from "@/components/sections/Impacto";
import Parceiros from "@/components/sections/Parceiros";
import Equipe from "@/components/sections/Equipe";
import Noticias from "@/components/sections/Noticias";
import Faq from "@/components/sections/Faq";
import Contato from "@/components/sections/Contato";
import JsonLd from "@/components/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Hero />
      <Numeros />
      <QuemSomos />
      <Diagnostico />
      <ProdutosHorizontal />
      <ComoFunciona />
      <Aplicacoes />
      <Rastreabilidade />
      <FichaTecnica />
      <Impacto />
      <Parceiros />
      <Equipe />
      <Noticias />
      <Faq />
      <Contato />
    </>
  );
}
