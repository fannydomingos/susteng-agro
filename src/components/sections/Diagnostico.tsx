import ParallaxImage from "@/components/Parallax";
import RevealText, { FadeUp } from "@/components/RevealText";
import { diagnostico } from "@/lib/conteudo";
import { site } from "@/lib/site";

export default function Diagnostico() {
  return (
    <section
      id="problema"
      aria-labelledby="problema-titulo"
      className="relative overflow-hidden bg-verde-900 py-20 sm:py-28"
    >
      <div className="absolute inset-0 grade-suave opacity-40" aria-hidden="true" />
      <div className="container-marca relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-legenda font-600 uppercase tracking-wider text-neon">
              Diagnóstico do problema
            </p>
            <RevealText
              id="problema-titulo"
              texto="Todo ano o Brasil joga fora uma montanha de coco"
              destaque={["montanha"]}
              className="mt-4 max-w-2xl font-display text-3xl font-700 leading-[1.12] text-white sm:text-4xl lg:text-5xl"
            />

            <dl className="mt-10 space-y-6">
              {diagnostico.itens.map((item, i) => (
                <FadeUp key={item.texto} delay={i * 0.08}>
                  <div className="flex items-baseline gap-4 border-b border-white/12 pb-5">
                    <dt className="shrink-0 font-display text-2xl font-700 leading-none text-neon sm:text-3xl">
                      {item.valor}
                    </dt>
                    <dd className="text-sm leading-snug text-white/70 sm:text-base">{item.texto}</dd>
                  </div>
                </FadeUp>
              ))}
            </dl>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {diagnostico.cards.map((c, i) => (
                <FadeUp key={c.titulo} delay={i * 0.08}>
                  <div className="h-full rounded-marca border border-neon/25 bg-white/[0.04] p-5">
                    <p className="font-display text-sm font-700 text-white">{c.titulo}</p>
                    <p className="mt-1.5 text-sm leading-snug text-white/65">{c.texto}</p>
                  </div>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.15}>
              <p className="mt-8 max-w-xl font-display text-lg font-600 leading-snug text-neon sm:text-xl">
                {diagnostico.fecho}
              </p>
            </FadeUp>
          </div>

          <FadeUp delay={0.1}>
            <ParallaxImage
              src="/images/coco-verde.jpg"
              alt="Cocos verdes maduros na palmeira"
              legenda={site.legendaImagem}
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="h-[300px] sm:h-[420px] lg:h-[560px] [&_figcaption]:text-white/45"
              forca={14}
            />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
