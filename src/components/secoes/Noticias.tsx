import { Rotulo, Secao, Surge, Titulo } from "@/components/ui";
import { noticias } from "@/lib/conteudo";

/**
 * NOTÍCIAS
 * Faixa clara em lista editorial: cada matéria é uma linha separada por régua,
 * com o veículo à esquerda e o texto à direita. Sem cartões.
 */
export default function Noticias() {
  return (
    <Secao id="noticias" rotulada="noticias-titulo" tema="claro" espaco="sem-topo">
      <div className="max-w-3xl">
        <Rotulo>Notícias</Rotulo>
        <Titulo
          id="noticias-titulo"
          texto="A SustentAgro na imprensa"
          destaque={["imprensa"]}
          className="mt-6 font-display text-[2rem] font-600 leading-[1.05] tracking-tight sm:text-5xl"
        />
      </div>

      <ul className="mt-12 border-t border-verde-950/12 sm:mt-14">
        {noticias.map((n, i) => (
          <li key={n.url}>
            <Surge delay={i * 0.06}>
              <a
                href={n.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid gap-4 border-b border-verde-950/12 py-8 transition-colors hover:bg-verde-700/[0.04] sm:gap-8 sm:py-10 lg:grid-cols-[13rem_1fr_auto] lg:items-baseline"
              >
                <span className="rotulo text-verde-600">{n.veiculo}</span>

                <div className="max-w-2xl">
                  <h3 className="font-display text-xl font-600 leading-snug text-verde-950 transition-colors group-hover:text-verde-700 sm:text-[1.6rem]">
                    {n.titulo}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-verde-900/65">
                    {n.resumo}
                  </p>
                </div>

                <span className="alvo-toque inline-flex items-center gap-2 text-sm font-600 text-verde-700 lg:justify-self-end">
                  Ler a matéria
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path
                      d="M5 12h14m0 0-6-6m6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            </Surge>
          </li>
        ))}
      </ul>
    </Secao>
  );
}
