import RevealText, { FadeUp } from "@/components/RevealText";
import ParallaxImage from "@/components/Parallax";
import { quemSomos } from "@/lib/conteudo";
import { site } from "@/lib/site";

export default function QuemSomos() {
  return (
    <section id="quem-somos" aria-labelledby="quem-somos-titulo" className="bg-off py-20 sm:py-28">
      <div className="container-marca">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-legenda font-600 uppercase tracking-wider text-verde-500">
              Quem somos
            </p>
            <RevealText
              id="quem-somos-titulo"
              texto="Sustentabilidade, economia e alta performance no mesmo saco"
              destaque={["performance"]}
              className="mt-4 font-display text-3xl font-700 leading-[1.12] text-verde-900 sm:text-4xl lg:text-5xl"
            />
            <FadeUp delay={0.1}>
              <p className="mt-6 text-base leading-relaxed text-tinta-suave sm:text-lg">
                {quemSomos.texto}
              </p>
              <p className="mt-4 text-base leading-relaxed text-tinta-suave sm:text-lg">
                {quemSomos.paraQuem}
              </p>
            </FadeUp>
          </div>

          <FadeUp delay={0.15}>
            <ParallaxImage
              src="/images/plantio.jpg"
              alt="Área de plantio atendida com substratos da SustentAgro"
              legenda={site.legendaImagem}
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="h-[280px] sm:h-[380px] lg:h-[480px]"
              forca={10}
            />
          </FadeUp>
        </div>

        {/* Missão / Visão */}
        <div className="mt-16 grid gap-5 sm:mt-20 md:grid-cols-2">
          {[
            { rotulo: "Missão", texto: quemSomos.missao },
            { rotulo: "Visão", texto: quemSomos.visao },
          ].map((b, i) => (
            <FadeUp key={b.rotulo} delay={i * 0.08}>
              <div className="h-full rounded-marca border border-verde-900/10 bg-white p-7 sm:p-9">
                <p className="text-legenda font-600 uppercase tracking-wider text-verde-500">
                  {b.rotulo}
                </p>
                <p className="mt-3 font-display text-lg font-600 leading-snug text-verde-900 sm:text-xl">
                  {b.texto}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Valores */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {quemSomos.valores.map((v, i) => (
            <FadeUp key={v.titulo} delay={i * 0.06}>
              <div className="group h-full rounded-marca border border-verde-900/10 bg-white p-6 transition-colors hover:border-verde-500/40 hover:bg-verde-500/[0.04]">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-verde-500/10 font-display text-sm font-700 text-verde-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-base font-600 text-verde-900">{v.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-tinta-suave">{v.texto}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
