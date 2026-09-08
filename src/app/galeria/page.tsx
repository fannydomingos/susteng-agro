import type { Metadata } from "next";
import Link from "next/link";
import GaleriaGrid from "@/components/GaleriaGrid";
import { Rotulo, Titulo } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Galeria",
  description:
    "Banco de imagens da SustentAgro: produtos, embalagens, produção, cultivos, equipe e eventos.",
  alternates: { canonical: "/galeria" },
  openGraph: {
    title: `Galeria · ${site.nome}`,
    description:
      "Banco de imagens da SustentAgro: produtos, embalagens, produção, cultivos, equipe e eventos.",
    url: `${site.url}/galeria`,
  },
};

export default function GaleriaPage() {
  return (
    <>
      <section className="pb-12 pt-32 sm:pb-16 sm:pt-40">
        <div className="container-marca">
          <Link
            href="/"
            className="alvo-toque inline-flex items-center gap-2 py-2 text-sm text-menta/50 transition-colors hover:text-destaque"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M19 12H5m0 0 6-6m-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Voltar para a página inicial
          </Link>
          <div className="mt-8">
            <Rotulo>Banco de imagens</Rotulo>
          </div>
          <Titulo
            as="h1"
            texto="Galeria da SustentAgro"
            destaque={["Galeria"]}
            className="mt-6 max-w-4xl font-display text-[2.2rem] font-600 leading-[1.02] sm:text-6xl"
          />
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-menta/60 sm:text-lg">
            Produtos, embalagens, produção, cultivos, equipe e eventos. As imagens estão disponíveis
            para uso em apresentações, propostas comerciais e material de divulgação.
          </p>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="container-marca">
          <GaleriaGrid />
          <p className="mt-10 text-legenda text-menta/35">
            Todas as imagens desta página são {site.legendaImagem}. Para incluir novas fotos,
            consulte a seção &quot;Galeria&quot; no README do projeto.
          </p>
        </div>
      </section>
    </>
  );
}
