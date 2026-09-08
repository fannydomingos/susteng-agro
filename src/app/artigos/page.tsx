import type { Metadata } from "next";
import Link from "next/link";
import { Cartao, Rotulo, Secao, Surge, Titulo } from "@/components/ui";
import { artigos } from "@/lib/artigos";
import { site, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Artigos e trabalhos técnicos",
  description:
    "Artigos científicos, fichas técnicas, estudos de caso e pesquisas da SustentAgro sobre substratos de fibra de coco e reaproveitamento do coco verde.",
  alternates: { canonical: "/artigos" },
  openGraph: {
    title: `Artigos e trabalhos técnicos · ${site.nome}`,
    description: "Artigos científicos, fichas técnicas, estudos de caso e pesquisas da SustentAgro.",
    url: `${site.url}/artigos`,
  },
};

export default function ArtigosPage() {
  return (
    <>
      <section className="pb-14 pt-32 sm:pb-20 sm:pt-40">
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
            <Rotulo>Ciência e tecnologia</Rotulo>
          </div>
          <Titulo
            as="h1"
            texto="Artigos e trabalhos técnicos"
            destaque={["técnicos"]}
            className="mt-6 max-w-4xl font-display text-[2.2rem] font-600 leading-[1.02] sm:text-6xl"
          />
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-menta/60 sm:text-lg">
            Esta página reúne a produção técnica e científica da SustentAgro, publicada e em
            desenvolvimento, sobre substratos de fibra de coco, rastreabilidade e reaproveitamento do
            resíduo do coco verde.
          </p>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="container-marca">
          <ul className="grid gap-4 lg:grid-cols-2">
            {artigos.map((a, i) => (
              <li key={a.titulo}>
                <Surge delay={(i % 2) * 0.07} className="h-full">
                  <Cartao as="article" className="flex h-full flex-col p-7 sm:p-9">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="pastilha rounded-full px-3 py-1 text-legenda">{a.tipo}</span>
                      <span
                        className={
                          "rounded-full px-3 py-1 text-legenda " +
                          (a.status === "publicado"
                            ? "bg-menta/8 text-menta/70"
                            : "border border-sage/30 text-sage")
                        }
                      >
                        {a.status === "publicado" ? "Publicado" : "Em construção"}
                      </span>
                      {a.ano ? <span className="text-legenda text-menta/35">{a.ano}</span> : null}
                    </div>

                    <h2 className="mt-5 font-display text-xl font-600 leading-snug text-menta sm:text-2xl">
                      {a.titulo}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-menta/55 sm:text-[0.95rem]">
                      {a.resumo}
                    </p>

                    {a.autores || a.instituicao ? (
                      <p className="mt-5 text-legenda text-menta/40">
                        {[a.autores, a.instituicao].filter(Boolean).join(" · ")}
                      </p>
                    ) : null}

                    {a.arquivo || a.link ? (
                      <a
                        href={a.arquivo ?? a.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="alvo-toque mt-auto inline-flex items-center gap-2 pt-7 text-sm font-600 text-destaque transition-colors hover:text-destaque-suave"
                      >
                        {a.arquivo ? "Baixar PDF" : "Acessar"}
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    ) : (
                      <p className="mt-auto pt-7 text-legenda text-menta/35">
                        Material em desenvolvimento. Estará disponível para download em breve.
                      </p>
                    )}
                  </Cartao>
                </Surge>
              </li>
            ))}
          </ul>

        </div>
      </section>

      {/* --------------------------------------------------------------
          As parcerias de pesquisa não são um artigo, então saem da lista
          e ganham faixa própria, clara.
      ---------------------------------------------------------------*/}
      <Secao id="parcerias" rotulada="parcerias-titulo" tema="claro">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <Rotulo>Parcerias de pesquisa</Rotulo>
            <Titulo
              id="parcerias-titulo"
              texto="Instituições de ensino e pesquisa"
              destaque={["pesquisa"]}
              className="mt-6 font-display text-[2rem] font-600 leading-[1.05] tracking-tight sm:text-5xl"
            />
          </div>

          <Surge delay={0.08} className="lg:pt-4">
            <p className="text-base leading-relaxed text-verde-900/75 sm:text-lg">
              Mantemos colaboração com a Universidade de Brasília, a Emater-DF, o SENAR-DF e
              institutos parceiros. Para conduzir ensaios com os nossos substratos ou publicar um
              trabalho conjunto, entre em contato com a equipe técnica.
            </p>

            <ul className="mt-9 border-t border-verde-950/12">
              {[
                {
                  titulo: "Ensaios em campo e em ambiente protegido",
                  texto:
                    "Fornecemos o substrato e a ficha técnica do lote, com rastreabilidade completa para o delineamento experimental.",
                },
                {
                  titulo: "Publicação conjunta",
                  texto:
                    "Trabalhos assinados com a instituição parceira, com os dados de caracterização física e química do material.",
                },
                {
                  titulo: "Formação e extensão",
                  texto:
                    "Oficinas e visitas técnicas à unidade produtiva para cursos de agronomia, técnico agrícola e programas de extensão rural.",
                },
              ].map((item, i) => (
                <li key={item.titulo} className="border-b border-verde-950/12 py-5">
                  <div className="flex gap-5">
                    <span aria-hidden="true" className="rotulo shrink-0 pt-1 text-verde-700/45">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-600 text-verde-950">
                        {item.titulo}
                      </h3>
                      <p className="mt-1.5 text-[0.95rem] leading-relaxed text-verde-900/65">
                        {item.texto}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <a
              href={whatsappUrl(
                "Olá. Represento uma instituição de pesquisa e gostaria de tratar de estudos com os substratos da SustentAgro.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="alvo-toque mt-9 inline-flex items-center gap-2.5 rounded-full bg-verde-700 px-7 py-4 text-[0.95rem] font-600 text-menta-suave transition-colors hover:bg-verde-950"
            >
              Propor uma parceria
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 12h14m0 0-6-6m6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </Surge>
        </div>
      </Secao>
    </>
  );
}
