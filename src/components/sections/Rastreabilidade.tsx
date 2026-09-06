import RevealText, { FadeUp } from "@/components/RevealText";
import { rastreabilidade } from "@/lib/conteudo";

export default function Rastreabilidade() {
  return (
    <section
      id="rastreabilidade"
      aria-labelledby="rastreabilidade-titulo"
      className="bg-verde-950 py-20 sm:py-28"
    >
      <div className="container-marca">
        <div className="max-w-3xl">
          <p className="text-legenda font-600 uppercase tracking-wider text-neon">
            Rastreabilidade
          </p>
          <RevealText
            id="rastreabilidade-titulo"
            texto="Você sabe exatamente de onde veio o seu lote"
            destaque={["lote"]}
            className="mt-4 font-display text-3xl font-700 leading-[1.12] text-white sm:text-4xl lg:text-5xl"
          />
          <FadeUp delay={0.1}>
            <p className="mt-5 text-base leading-relaxed text-white/65 sm:text-lg">
              {rastreabilidade.intro}
            </p>
          </FadeUp>
        </div>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-marca border border-white/10 bg-white/10 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {rastreabilidade.etapas.map((e, i) => (
            <li key={e.nome} className="bg-verde-950">
              <FadeUp delay={i * 0.05}>
                <div className="group h-full p-7 transition-colors hover:bg-white/[0.04] sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-lima font-display text-legenda font-700 text-verde-950">
                      {i + 1}
                    </span>
                    <h3 className="font-display text-lg font-600 text-white">{e.nome}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{e.detalhe}</p>
                </div>
              </FadeUp>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
