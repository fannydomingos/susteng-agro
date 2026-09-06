import RevealText, { FadeUp } from "@/components/RevealText";
import { noticias } from "@/lib/conteudo";

export default function Noticias() {
  return (
    <section id="noticias" aria-labelledby="noticias-titulo" className="bg-white py-20 sm:py-28">
      <div className="container-marca">
        <div className="max-w-3xl">
          <p className="text-legenda font-600 uppercase tracking-wider text-verde-500">Notícias</p>
          <RevealText
            id="noticias-titulo"
            texto="A SustentAgro na imprensa"
            destaque={["imprensa"]}
            className="mt-4 font-display text-3xl font-700 leading-[1.12] text-verde-900 sm:text-4xl lg:text-5xl"
          />
        </div>

        <ul className="mt-12 grid gap-5 sm:mt-14 lg:grid-cols-3">
          {noticias.map((n, i) => (
            <li key={n.url}>
              <FadeUp delay={i * 0.08}>
                <a
                  href={n.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-marca border border-verde-900/10 bg-off p-7 transition-all duration-300 hover:-translate-y-1 hover:border-verde-500/40 hover:bg-white hover:shadow-lg hover:shadow-verde-900/5"
                >
                  <span className="text-legenda font-600 uppercase tracking-wider text-verde-500">
                    {n.veiculo}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-600 leading-snug text-verde-900">
                    {n.titulo}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-tinta-suave">{n.resumo}</p>
                  <span className="alvo-toque mt-auto inline-flex items-center gap-2 pt-6 text-sm font-600 text-verde-600">
                    Veja mais
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              </FadeUp>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
