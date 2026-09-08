import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Counter from "@/components/Counter";
import { Rotulo, Secao, Surge, Titulo } from "@/components/ui";
import { equipe, numeros, quemSomos } from "@/lib/conteudo";
import { site, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "A empresa",
  description:
    "Quem é a SustentAgro: os dois diretores, a missão de ressignificar o resíduo do coco verde, os números da operação e os valores da empresa.",
  alternates: { canonical: "/quem-somos" },
  openGraph: {
    title: `A empresa · ${site.nome}`,
    description:
      "Os dois diretores, a missão, os números da operação e os valores da SustentAgro.",
    url: `${site.url}/quem-somos`,
  },
};

/**
 * Cada diretor tem o próprio número em `site.telefones`. O casamento é pelo
 * nome, então trocar um telefone lá muda o link daqui sem mexer neste arquivo.
 */
function contatoDe(nome: string) {
  const t = site.telefones.find((tel) => tel.nome === nome);
  return whatsappUrl(
    `Olá, ${nome.split(" ")[0]}. Vim pelo site da SustentAgro e gostaria de falar sobre os substratos.`,
    t?.numero,
  );
}

/**
 * PÁGINA QUEM SOMOS
 * Abertura escura com o texto institucional e, em seguida, uma faixa clara com
 * os diretores, os números, missão e visão e os valores. Era uma seção da
 * página inicial e virou página própria, acessível pelo menu.
 */
export default function QuemSomosPage() {
  return (
    <>
      {/* ------------------------------------------------- abertura */}
      <section className="pb-16 pt-32 sm:pb-20 sm:pt-40">
        <div className="container-marca">
          <Link
            href="/"
            className="alvo-toque inline-flex items-center gap-2 py-2 text-sm text-menta/50 transition-colors hover:text-destaque"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M19 12H5m0 0 6-6m-6 6 6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Voltar para a página inicial
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <div>
              <Rotulo>Quem somos</Rotulo>
              <Titulo
                as="h1"
                texto="Sustentabilidade, economia e alta performance"
                destaque={["performance"]}
                className="mt-6 font-display text-[2.2rem] font-600 leading-[1.02] tracking-tight sm:text-5xl lg:text-[3.8rem]"
              />
            </div>

            <Surge delay={0.08} className="lg:pt-4">
              <p className="text-lg leading-relaxed text-menta/70 sm:text-xl">{quemSomos.texto}</p>
            </Surge>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- faixa clara */}
      <Secao rotulada="empresa-titulo" tema="claro">
        <h2 id="empresa-titulo" className="sr-only">
          A empresa em detalhe
        </h2>

        {/* -------------------------------- quem está por trás */}
        <div>
          <p className="rotulo text-verde-600">Quem está por trás</p>
          <p className="mt-5 max-w-2xl font-display text-xl font-500 leading-snug text-verde-950 sm:text-2xl">
            A SustentAgro é dirigida pelos dois irmãos que montaram a operação, da coleta do
            resíduo à embalagem do substrato.
          </p>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6">
            {equipe.map((pessoa, i) => (
              <li key={pessoa.nome}>
                <Surge delay={i * 0.08}>
                  <figure className="group relative overflow-hidden rounded-marca">
                    <div className="relative aspect-[4/5] w-full sm:aspect-[3/4]">
                      <Image
                        src={pessoa.foto}
                        alt={`${pessoa.nome}, ${pessoa.cargo.toLowerCase()} da SustentAgro`}
                        fill
                        priority={i === 0}
                        quality={82}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 610px"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      {/* o nome fica sobre a foto, então precisa de base escura */}
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(5,31,32,0.88)_100%)]"
                      />
                    </div>

                    <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                      <p className="rotulo text-destaque">{pessoa.cargo}</p>
                      <p className="mt-2 font-display text-2xl font-600 leading-tight text-menta sm:text-3xl">
                        {pessoa.nome}
                      </p>
                      <a
                        href={contatoDe(pessoa.nome)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="alvo-toque mt-3 inline-flex items-center gap-2 text-sm font-600 text-menta/80 transition-colors hover:text-destaque"
                      >
                        Falar no WhatsApp
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path
                            d="M5 12h14m0 0-6-6m6 6-6 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    </figcaption>
                  </figure>
                </Surge>
              </li>
            ))}
          </ul>
        </div>

        {/* -------------------------------- números em régua */}
        <dl className="mt-20 grid grid-cols-2 gap-y-10 sm:mt-24 lg:grid-cols-4">
          {numeros.map((n, i) => (
            <Surge key={n.legenda} delay={i * 0.06}>
              <div
                className={
                  "px-0 sm:px-7 " +
                  (i === 0 ? "sm:pl-0 " : "border-l border-verde-950/10 pl-5 sm:pl-7 ") +
                  (i === 2 ? "lg:border-l lg:pl-7 " : "")
                }
              >
                <dd className="font-display text-[2.6rem] font-600 leading-none text-verde-700 sm:text-5xl">
                  <Counter
                    valor={n.valor}
                    sufixo={n.sufixo}
                    estatico={Boolean(n.semAnimacao)}
                    semSeparador={Boolean(n.semAnimacao)}
                  />
                </dd>
                <dt className="mt-4 max-w-[20ch] text-sm leading-snug text-verde-900/60">
                  {n.legenda}
                </dt>
              </div>
            </Surge>
          ))}
        </dl>

        {/* -------------------------------- missão e visão */}
        <div className="mt-20 grid gap-12 sm:mt-24 lg:grid-cols-2 lg:gap-16">
          {[
            { rotulo: "Missão", texto: quemSomos.missao },
            { rotulo: "Visão", texto: quemSomos.visao },
          ].map((b, i) => (
            <Surge key={b.rotulo} delay={i * 0.08}>
              <div className="border-t-2 border-verde-700/25 pt-7">
                <p className="rotulo text-verde-600">{b.rotulo}</p>
                <p className="mt-5 font-display text-2xl font-500 leading-[1.2] text-verde-950 sm:text-[2rem]">
                  {b.texto}
                </p>
              </div>
            </Surge>
          ))}
        </div>

        {/* -------------------------------- valores em lista */}
        <div className="mt-20 sm:mt-24">
          <p className="rotulo text-verde-600">Nossos valores</p>
          <ul className="mt-8 grid gap-x-16 sm:grid-cols-2">
            {quemSomos.valores.map((v, i) => (
              <li key={v.titulo}>
                <Surge delay={i * 0.05}>
                  <div className="flex gap-5 border-b border-verde-950/10 py-7">
                    <span aria-hidden="true" className="rotulo shrink-0 pt-1.5 text-verde-700/45">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-600 text-verde-950 sm:text-xl">
                        {v.titulo}
                      </h3>
                      <p className="mt-2 text-[0.95rem] leading-relaxed text-verde-900/65">
                        {v.texto}
                      </p>
                    </div>
                  </div>
                </Surge>
              </li>
            ))}
          </ul>
        </div>
      </Secao>
    </>
  );
}
