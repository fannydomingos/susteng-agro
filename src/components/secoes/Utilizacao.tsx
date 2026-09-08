"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Rotulo, Secao, Surge, Titulo } from "@/components/ui";
import { aplicacoes, quemSomos } from "@/lib/conteudo";
import { useMovimentoReduzido } from "@/lib/movimento";
import { site } from "@/lib/site";

/**
 * UTILIZAÇÃO
 * Para quem vendemos e em quais cultivos. Os cultivos são uma lista
 * tipográfica separada por régua: a linha ativa abre a descrição e acende o
 * ponto. Antes eram seis cartões empilhados, o que engrossava a página sem
 * acrescentar informação.
 */
export default function Utilizacao() {
  const [aberto, setAberto] = useState(0);
  const reduzir = useMovimentoReduzido();

  return (
    <Secao id="utilizacao" rotulada="utilizacao-titulo" luz="direita">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* ------------------------------------------ coluna de texto */}
        <div>
          <Rotulo>Para quem vendemos</Rotulo>
          <Titulo
            id="utilizacao-titulo"
            texto="Aplicações por tipo de cultivo"
            destaque={["cultivo"]}
            className="mt-6 font-display text-[2.2rem] font-600 leading-[1.03] tracking-tight sm:text-5xl"
          />
          <Surge delay={0.08}>
            <p className="mt-7 text-base leading-relaxed text-menta/65">{quemSomos.paraQuem}</p>
            <p className="mt-5 text-base leading-relaxed text-menta/65">{aplicacoes.intro}</p>
          </Surge>

          <Surge delay={0.14}>
            <figure className="relative mt-12 hidden lg:block">
              <div className="relative h-64 w-full overflow-hidden rounded-marca">
                <Image
                  src="/images/coco-verde.jpg"
                  alt="Cocos verdes ainda no coqueiro, matéria-prima do substrato"
                  fill
                  quality={75}
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(2,16,15,0.85)_100%)]"
                />
                <figcaption className="absolute bottom-4 right-5 text-legenda text-menta/45">
                  {site.legendaImagem}
                </figcaption>
              </div>
            </figure>
          </Surge>
        </div>

        {/* ------------------------------------------ lista de cultivos */}
        <div className="border-t border-menta/12">
          {aplicacoes.grupos.map((g, i) => {
            const ativo = aberto === i;
            return (
              <button
                key={g.titulo}
                type="button"
                data-testid="painel-cultivo"
                aria-expanded={ativo}
                onMouseEnter={() => setAberto(i)}
                onFocus={() => setAberto(i)}
                onClick={() => setAberto(i)}
                className="alvo-toque block w-full border-b border-menta/12 py-6 text-left transition-colors hover:bg-menta/[0.03] sm:py-7"
              >
                <div className="flex items-center gap-5">
                  <span
                    aria-hidden="true"
                    className={
                      "rotulo shrink-0 transition-colors duration-300 " +
                      (ativo ? "text-destaque" : "text-menta/30")
                    }
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className={
                      "flex-1 font-display text-lg font-600 transition-colors duration-300 sm:text-2xl " +
                      (ativo ? "text-destaque" : "text-menta")
                    }
                  >
                    {g.titulo}
                  </h3>
                  <span
                    aria-hidden="true"
                    className={
                      "h-[6px] w-[6px] shrink-0 rounded-full transition-all duration-300 " +
                      (ativo
                        ? "bg-destaque shadow-[0_0_10px_2px_rgba(182,255,137,0.6)]"
                        : "bg-menta/20")
                    }
                  />
                </div>
                <AnimatePresence initial={false}>
                  {ativo && (
                    <motion.p
                      initial={reduzir ? false : { height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                      exit={reduzir ? undefined : { height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden pl-[3.1rem] text-sm leading-relaxed text-menta/55 sm:text-[0.95rem]"
                    >
                      {g.texto}
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>
      </div>
    </Secao>
  );
}
