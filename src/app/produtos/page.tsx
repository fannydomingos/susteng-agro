import type { Metadata } from "next";
import Link from "next/link";
import Accordion from "@/components/Accordion";
import TrilhoProdutos from "@/components/TrilhoProdutos";
import { BotaoPrincipal, Rotulo, Secao, Surge, Titulo } from "@/components/ui";
import { faq, produtos } from "@/lib/conteudo";
import { site, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Linha de produtos",
  description:
    "Substrato de fibra de coco, blend 70/30, pó de coco e formulações personalizadas da SustentAgro, com especificações agronômicas de cada formato.",
  alternates: { canonical: "/produtos" },
  openGraph: {
    title: `Linha de produtos · ${site.nome}`,
    description:
      "Fibra, blend 70/30, pó de coco e substrato personalizado, com as especificações de cada formato.",
    url: `${site.url}/produtos`,
  },
};

/**
 * PÁGINA DE PRODUTOS
 * Um cabeçalho enxuto e, em seguida, os quatro formatos passando para o lado
 * conforme a rolagem. O H1 fica aqui porque a página precisa de um título de
 * nível 1 para leitores de tela e para os buscadores, e cada formato entra
 * como H2 dentro do trilho.
 */
export default function ProdutosPage() {
  return (
    <>
      <section className="pb-10 pt-32 sm:pt-36">
        <div className="container-marca">
          <Link
            href="/"
            className="alvo-toque inline-flex items-center gap-2 py-2 text-sm text-menta/50 transition-colors hover:text-destaque"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M19 12H5m0 0 6-6m-6 6 6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Voltar para a página inicial
          </Link>

          <div className="mt-7 flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
            <h1 className="font-display text-[2rem] font-600 leading-[1.03] tracking-tight sm:text-5xl">
              <span className="texto-luz">Nossos </span>
              <span className="texto-destaque">produtos</span>
            </h1>
            <p className="rotulo text-menta/40">
              {String(produtos.length).padStart(2, "0")} formatos
            </p>
          </div>
        </div>
      </section>

      <TrilhoProdutos />

      {/* --------------------------------------------------------------
          As dúvidas frequentes ficam aqui, e não na página inicial: as
          perguntas são sobre granulometria, manejo e volume, ou seja,
          sobre o que a pessoa acabou de ler nos formatos.
      ---------------------------------------------------------------*/}
      <Secao id="duvidas" rotulada="duvidas-titulo" luz="direita">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <Rotulo>Perguntas e respostas</Rotulo>
            <Titulo
              id="duvidas-titulo"
              texto="Dúvidas frequentes sobre o substrato"
              destaque={["substrato"]}
              className="mt-6 font-display text-[1.9rem] font-600 leading-[1.06] tracking-tight sm:text-4xl"
            />
            <Surge delay={0.08}>
              <p className="mt-6 text-base leading-relaxed text-menta/60">
                Não encontrou a informação que procurava? Envie a sua dúvida pelo WhatsApp e a
                equipe técnica responderá.
              </p>
              <div className="mt-7">
                <BotaoPrincipal
                  href={whatsappUrl(
                    "Olá. Tenho uma dúvida técnica sobre os substratos da SustentAgro.",
                  )}
                  externo
                >
                  Enviar uma dúvida
                </BotaoPrincipal>
              </div>
            </Surge>
          </div>

          <Surge delay={0.12}>
            <Accordion itens={faq} />
          </Surge>
        </div>
      </Secao>
    </>
  );
}
