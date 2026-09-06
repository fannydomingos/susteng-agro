import Image from "next/image";
import RevealText, { FadeUp } from "@/components/RevealText";
import { parceiros, reconhecimentos } from "@/lib/conteudo";

export default function Parceiros() {
  return (
    <section id="parceiros" aria-labelledby="parceiros-titulo" className="bg-off py-20 sm:py-28">
      <div className="container-marca">
        <div className="max-w-3xl">
          <p className="text-legenda font-600 uppercase tracking-wider text-verde-500">
            Nossos parceiros
          </p>
          <RevealText
            id="parceiros-titulo"
            texto="Uma rede pública e privada de economia circular"
            destaque={["circular"]}
            className="mt-4 font-display text-3xl font-700 leading-[1.12] text-verde-900 sm:text-4xl lg:text-5xl"
          />
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-marca border border-verde-900/10 bg-verde-900/10 sm:mt-14 sm:grid-cols-3 lg:grid-cols-4">
          {parceiros.map((p, i) => (
            <li key={p.nome} className="bg-white">
              <FadeUp delay={(i % 4) * 0.05}>
                <div className="flex h-32 items-center justify-center p-5 transition-transform duration-300 hover:scale-[1.04] sm:h-36 sm:p-7">
                  <div className="relative h-full w-full">
                    <Image
                      src={p.logo}
                      alt={p.nome}
                      fill
                      quality={90}
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
                      className="object-contain"
                    />
                  </div>
                </div>
              </FadeUp>
            </li>
          ))}
          {/* célula final com o texto, para fechar a grade */}
          <li className="hidden bg-verde-700 lg:block">
            <div className="flex h-36 items-center p-7">
              <p className="font-display text-sm font-600 leading-snug text-white">
                Construindo uma rede de economia circular com parceiros públicos e privados.
              </p>
            </div>
          </li>
        </ul>

        {/* Reconhecimento */}
        <div className="mt-16 sm:mt-20">
          <h3 className="font-display text-xl font-700 text-verde-900 sm:text-2xl">
            Reconhecimento
          </h3>
          <ul className="mt-6 flex flex-wrap gap-3">
            {reconhecimentos.map((r, i) => (
              <li key={r}>
                <FadeUp delay={i * 0.05}>
                  <span className="inline-flex items-center gap-2.5 rounded-full border border-verde-900/10 bg-white px-5 py-3 text-sm font-500 text-verde-900">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-verde-500">
                      <path d="m12 2 2.9 6.2 6.6.9-4.8 4.7 1.2 6.7L12 17.3 6.1 20.5l1.2-6.7L2.5 9.1l6.6-.9L12 2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                    </svg>
                    {r}
                  </span>
                </FadeUp>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
