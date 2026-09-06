import Image from "next/image";
import RevealText, { FadeUp } from "@/components/RevealText";
import { equipe } from "@/lib/conteudo";
import { site, whatsappUrl } from "@/lib/site";

export default function Equipe() {
  return (
    <section id="equipe" aria-labelledby="equipe-titulo" className="bg-verde-900 py-20 sm:py-28">
      <div className="container-marca">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-legenda font-600 uppercase tracking-wider text-neon">
              Equipe SustentAgro
            </p>
            <RevealText
              id="equipe-titulo"
              texto="Quem coloca a mão no substrato"
              destaque={["substrato"]}
              className="mt-4 font-display text-3xl font-700 leading-[1.12] text-white sm:text-4xl lg:text-5xl"
            />
            <FadeUp delay={0.1}>
              <p className="mt-5 max-w-md text-base leading-relaxed text-white/65 sm:text-lg">
                A operação nasceu em 2022 no Lago Norte, em Brasília, e hoje atende produtores no
                DF, no Entorno e no Ceará. Fale direto com quem toca o dia a dia.
              </p>
            </FadeUp>
          </div>

          <ul className="grid gap-6 sm:grid-cols-2">
            {equipe.map((p, i) => {
              const contato = site.telefones.find((t) => t.nome === p.nome);
              return (
                <li key={p.nome}>
                  <FadeUp delay={i * 0.1}>
                    <figure className="overflow-hidden rounded-marca bg-white/[0.05]">
                      <div className="relative aspect-[3/4] w-full">
                        <Image
                          src={p.foto}
                          alt={`${p.nome}, ${p.cargo} da SustentAgro`}
                          fill
                          quality={80}
                          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 300px"
                          className="object-cover"
                        />
                      </div>
                      <figcaption className="p-6">
                        <p className="font-display text-lg font-700 text-white">{p.nome}</p>
                        <p className="mt-0.5 text-sm font-600 text-neon">{p.cargo}</p>
                        {contato ? (
                          <a
                            href={whatsappUrl(site.whatsapp.mensagem, contato.numero)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="alvo-toque mt-4 inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                          >
                            {contato.exibicao}
                          </a>
                        ) : null}
                      </figcaption>
                    </figure>
                  </FadeUp>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
