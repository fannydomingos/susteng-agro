import ParallaxImage from "@/components/Parallax";
import RevealText, { FadeUp } from "@/components/RevealText";
import { impacto } from "@/lib/conteudo";
import { site } from "@/lib/site";

export default function Impacto() {
  return (
    <section id="impacto" aria-labelledby="impacto-titulo" className="bg-white py-20 sm:py-28">
      <div className="container-marca">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-legenda font-600 uppercase tracking-wider text-verde-500">
              Impacto
            </p>
            <RevealText
              id="impacto-titulo"
              texto="Resíduo que vira renda, emprego e menos emissão"
              destaque={["renda,"]}
              className="mt-4 max-w-2xl font-display text-3xl font-700 leading-[1.12] text-verde-900 sm:text-4xl lg:text-5xl"
            />
            <FadeUp delay={0.1}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-tinta-suave sm:text-lg">
                A SustentAgro transforma resíduos em oportunidades reais — gerando renda, reduzindo
                emissões e construindo um futuro sustentável para o Brasil.
              </p>
            </FadeUp>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {impacto.map((bloco, i) => (
                <FadeUp key={bloco.eixo} delay={i * 0.08}>
                  <div className="h-full rounded-marca border border-verde-900/10 bg-off p-6">
                    <h3 className="font-display text-sm font-700 uppercase tracking-wider text-verde-600">
                      {bloco.eixo}
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {bloco.itens.map((it) => (
                        <li key={it} className="flex gap-2.5 text-sm leading-relaxed text-tinta-suave">
                          <span
                            aria-hidden="true"
                            className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-verde-500"
                          />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          <FadeUp delay={0.12}>
            <ParallaxImage
              src="/images/familia.jpg"
              alt="Família em área verde, representando as comunidades beneficiadas pelo projeto"
              legenda={site.legendaImagem}
              sizes="(max-width: 1024px) 100vw, 38vw"
              className="h-[300px] sm:h-[420px] lg:h-[540px]"
              forca={12}
            />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
