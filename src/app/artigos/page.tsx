import type { Metadata } from "next";
import RevealText, { FadeUp } from "@/components/RevealText";
import { artigos } from "@/lib/artigos";
import { site, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Artigos e trabalhos técnicos",
  description:
    "Artigos científicos, fichas técnicas, estudos de caso e pesquisas da SustentAgro sobre substratos de fibra de coco e reaproveitamento do coco verde.",
  alternates: { canonical: "/artigos" },
  openGraph: {
    title: `Artigos e trabalhos técnicos · ${site.nome}`,
    description:
      "Artigos científicos, fichas técnicas, estudos de caso e pesquisas da SustentAgro.",
    url: `${site.url}/artigos`,
  },
};

export default function ArtigosPage() {
  return (
    <>
      <section className="bg-verde-950 pb-14 pt-28 sm:pb-20 sm:pt-36">
        <div className="container-marca">
          <p className="text-legenda font-600 uppercase tracking-wider text-neon">
            Ciência e tecnologia
          </p>
          <RevealText
            as="h1"
            texto="Artigos e trabalhos técnicos"
            destaque={["técnicos"]}
            className="mt-4 max-w-3xl font-display text-4xl font-700 leading-[1.08] text-white sm:text-5xl lg:text-6xl"
          />
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
            Reunimos aqui o que já produzimos e o que está em construção sobre substratos de fibra
            de coco, rastreabilidade e reaproveitamento do resíduo do coco verde.
          </p>
        </div>
      </section>

      <section className="bg-off py-14 sm:py-20">
        <div className="container-marca">
          <ul className="grid gap-5 lg:grid-cols-2">
            {artigos.map((a, i) => (
              <li key={a.titulo}>
                <FadeUp delay={(i % 2) * 0.08}>
                  <article className="flex h-full flex-col rounded-marca border border-verde-900/10 bg-white p-7 sm:p-8">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-verde-500/10 px-3 py-1 text-legenda font-600 text-verde-600">
                        {a.tipo}
                      </span>
                      <span
                        className={
                          "rounded-full px-3 py-1 text-legenda font-600 " +
                          (a.status === "publicado"
                            ? "bg-verde-900/[0.07] text-verde-900"
                            : "bg-fibra-500/10 text-fibra-600")
                        }
                      >
                        {a.status === "publicado" ? "Publicado" : "Em construção"}
                      </span>
                      {a.ano ? (
                        <span className="text-legenda text-tinta-suave">{a.ano}</span>
                      ) : null}
                    </div>

                    <h2 className="mt-4 font-display text-xl font-600 leading-snug text-verde-900 sm:text-2xl">
                      {a.titulo}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-tinta-suave sm:text-base">
                      {a.resumo}
                    </p>

                    {a.autores || a.instituicao ? (
                      <p className="mt-4 text-legenda text-tinta-suave">
                        {[a.autores, a.instituicao].filter(Boolean).join(" · ")}
                      </p>
                    ) : null}

                    {a.arquivo || a.link ? (
                      <a
                        href={a.arquivo ?? a.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="alvo-toque mt-auto inline-flex items-center gap-2 pt-6 text-sm font-600 text-verde-600 transition-colors hover:text-verde-500"
                      >
                        {a.arquivo ? "Baixar PDF" : "Acessar"}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    ) : (
                      <p className="mt-auto pt-6 text-legenda text-tinta-suave">
                        Material em produção — em breve disponível para download.
                      </p>
                    )}
                  </article>
                </FadeUp>
              </li>
            ))}
          </ul>

          <FadeUp delay={0.1}>
            <div className="mt-10 rounded-marca bg-verde-900 p-8 sm:p-10">
              <h2 className="font-display text-xl font-700 text-white sm:text-2xl">
                Pesquisa, universidade ou instituto?
              </h2>
              <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-white/70">
                Trabalhamos com UnB, Emater-DF, SENAR-DF e institutos parceiros. Se você quer
                conduzir um ensaio com nossos substratos ou publicar um trabalho conjunto, fale com
                a gente.
              </p>
              <a
                href={whatsappUrl(
                  "Olá! Sou de uma instituição de pesquisa e gostaria de falar sobre estudos com os substratos da SustentAgro.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="alvo-toque mt-6 inline-flex items-center gap-2 rounded-full bg-neon px-6 py-3.5 text-sm font-700 text-verde-950 transition-colors hover:bg-lima"
              >
                Propor uma parceria
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
