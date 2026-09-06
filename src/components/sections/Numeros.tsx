import Counter from "@/components/Counter";
import { FadeUp } from "@/components/RevealText";
import { numeros } from "@/lib/conteudo";

export default function Numeros() {
  return (
    <section aria-labelledby="numeros-titulo" className="relative bg-verde-900 py-14 sm:py-20">
      <div className="container-marca">
        <h2 id="numeros-titulo" className="sr-only">
          Nossos números
        </h2>
        <p className="max-w-3xl font-display text-xl font-600 leading-snug text-white sm:text-2xl lg:text-3xl">
          Ressignificamos mais de{" "}
          <span className="texto-gradiente">250 toneladas</span> de coco verde que seriam
          descartadas no DF e na RIDE.
        </p>

        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:mt-14 lg:grid-cols-4">
          {numeros.map((n, i) => (
            <FadeUp key={n.legenda} delay={i * 0.08}>
              <div className="border-t border-white/15 pt-5">
                <dt className="sr-only">{n.legenda}</dt>
                <dd>
                  <span className="block font-display text-4xl font-700 leading-none text-neon sm:text-5xl lg:text-6xl">
                    <Counter
                      valor={n.valor}
                      sufixo={n.sufixo}
                      estatico={Boolean(n.semAnimacao)}
                      semSeparador={Boolean(n.semAnimacao)}
                    />
                  </span>
                  <span className="mt-3 block max-w-[22ch] text-sm leading-snug text-white/65">
                    {n.legenda}
                  </span>
                </dd>
              </div>
            </FadeUp>
          ))}
        </dl>
      </div>
    </section>
  );
}
