import type { Metadata } from "next";
import GaleriaGrid from "@/components/GaleriaGrid";
import RevealText from "@/components/RevealText";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Fotos",
  description:
    "Banco de fotos da SustentAgro: produtos, embalagens, produção, cultivos, equipe e eventos.",
  alternates: { canonical: "/galeria" },
  openGraph: {
    title: `Fotos · ${site.nome}`,
    description:
      "Banco de fotos da SustentAgro: produtos, embalagens, produção, cultivos, equipe e eventos.",
    url: `${site.url}/galeria`,
  },
};

export default function GaleriaPage() {
  return (
    <>
      <section className="bg-verde-950 pb-14 pt-28 sm:pb-20 sm:pt-36">
        <div className="container-marca">
          <p className="text-legenda font-600 uppercase tracking-wider text-neon">Banco de fotos</p>
          <RevealText
            as="h1"
            texto="Nossas fotos"
            destaque={["fotos"]}
            className="mt-4 font-display text-4xl font-700 leading-[1.08] text-white sm:text-5xl lg:text-6xl"
          />
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
            Produtos, embalagens, produção, cultivos, equipe e eventos. Use as fotos para
            apresentações, propostas e material de divulgação da SustentAgro.
          </p>
        </div>
      </section>

      <section className="bg-off py-14 sm:py-20">
        <div className="container-marca">
          <GaleriaGrid />
          <p className="mt-10 text-legenda text-tinta-suave">
            Todas as imagens desta página são {site.legendaImagem}. Para adicionar novas fotos, veja
            a seção &quot;Galeria&quot; no README do projeto.
          </p>
        </div>
      </section>
    </>
  );
}
