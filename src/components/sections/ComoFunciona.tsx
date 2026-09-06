"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { comoFunciona } from "@/lib/conteudo";
import { site, whatsappUrl } from "@/lib/site";
import RevealText, { FadeUp } from "@/components/RevealText";

/**
 * ELEMENTO INTERATIVO CENTRAL
 * Um esquema da planta com 5 pontos clicáveis. Cada ponto abre o benefício
 * correspondente ao lado. Funciona por clique e por teclado.
 */

// posição de cada ponto sobre a ilustração (em %)
const pontos = [
  { x: 50, y: 12 },
  { x: 78, y: 34 },
  { x: 68, y: 66 },
  { x: 32, y: 66 },
  { x: 22, y: 34 },
];

export default function ComoFunciona() {
  const [ativo, setAtivo] = useState(0);
  const reduzir = useReducedMotion();
  const itens = comoFunciona.itens;

  return (
    <section id="como-funciona" aria-labelledby="como-funciona-titulo" className="bg-off py-20 sm:py-28">
      <div className="container-marca">
        <div className="max-w-3xl">
          <p className="text-legenda font-600 uppercase tracking-wider text-verde-500">
            Como funciona
          </p>
          <RevealText
            id="como-funciona-titulo"
            texto="Como a nossa fibra funciona"
            destaque={["fibra"]}
            className="mt-4 font-display text-3xl font-700 leading-[1.12] text-verde-900 sm:text-4xl lg:text-5xl"
          />
          <FadeUp delay={0.1}>
            <p className="mt-5 text-base leading-relaxed text-tinta-suave sm:text-lg">
              {comoFunciona.intro}
            </p>
          </FadeUp>
        </div>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          {/* Diagrama interativo */}
          <FadeUp>
            <div
              className="relative mx-auto aspect-square w-full max-w-[460px]"
              data-testid="diagrama-interativo"
            >
              {/* anéis */}
              <div className="absolute inset-0 rounded-full border border-verde-500/15" />
              <div className="absolute inset-[12%] rounded-full border border-verde-500/20" />
              <div className="absolute inset-[24%] overflow-hidden rounded-full">
                <Image
                  src="/images/coco-verde.jpg"
                  alt="Cocos verdes na palmeira, matéria-prima dos substratos"
                  fill
                  quality={80}
                  sizes="(max-width: 1024px) 60vw, 300px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-verde-950/35" />
                <div className="absolute inset-0 grid place-items-center p-6 text-center">
                  <p className="font-display text-sm font-700 uppercase leading-tight tracking-wide text-white sm:text-base">
                    Coco verde
                    <span className="mt-1 block text-legenda font-500 normal-case tracking-normal text-white/75">
                      matéria-prima
                    </span>
                  </p>
                </div>
              </div>

              {/* pontos clicáveis */}
              {itens.map((item, i) => {
                const p = pontos[i];
                const estaAtivo = ativo === i;
                return (
                  <button
                    key={item.titulo}
                    type="button"
                    data-testid="ponto-interativo"
                    aria-pressed={estaAtivo}
                    aria-label={item.titulo}
                    onClick={() => setAtivo(i)}
                    onMouseEnter={() => setAtivo(i)}
                    className="alvo-toque absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  >
                    <span
                      className={
                        "grid h-10 w-10 place-items-center rounded-full border-2 font-display text-sm font-700 transition-all duration-300 sm:h-11 sm:w-11 " +
                        (estaAtivo
                          ? "scale-110 border-verde-500 bg-verde-500 text-white shadow-lg shadow-verde-500/30"
                          : "border-verde-500/40 bg-white text-verde-600 hover:border-verde-500")
                      }
                    >
                      {i + 1}
                    </span>
                    {estaAtivo && !reduzir && (
                      <span className="absolute h-10 w-10 animate-ping rounded-full bg-verde-500/25 sm:h-11 sm:w-11" />
                    )}
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-center text-legenda text-tinta-suave">
              Clique nos pontos · {site.legendaImagem}
            </p>
          </FadeUp>

          {/* Painel do ponto ativo + lista completa */}
          <div>
            <div className="min-h-[190px] rounded-marca border border-verde-900/10 bg-white p-7 sm:min-h-[200px] sm:p-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={ativo}
                  initial={reduzir ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduzir ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="font-display text-sm font-700 text-verde-500">
                    {String(ativo + 1).padStart(2, "0")}
                  </span>
                  <h3
                    data-testid="ponto-titulo"
                    className="mt-2 font-display text-2xl font-700 leading-snug text-verde-900 sm:text-3xl"
                  >
                    {itens[ativo].titulo}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-tinta-suave">
                    {itens[ativo].texto}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {itens.map((item, i) => (
                <li key={item.titulo}>
                  <button
                    type="button"
                    onClick={() => setAtivo(i)}
                    className={
                      "alvo-toque flex w-full items-center gap-3 rounded-full border px-4 py-3 text-left text-sm font-500 transition-colors " +
                      (ativo === i
                        ? "border-verde-500 bg-verde-500/10 text-verde-700"
                        : "border-verde-900/10 bg-white text-tinta-suave hover:border-verde-500/40")
                    }
                  >
                    <span className="font-display text-legenda font-700 text-verde-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.titulo}
                  </button>
                </li>
              ))}
            </ul>

            <FadeUp delay={0.1}>
              <div className="mt-8 rounded-marca bg-verde-900 p-7 sm:p-8">
                <p className="font-display text-lg font-600 leading-snug text-white sm:text-xl">
                  Precisa de um substrato eficiente? Fale com a gente e encontre a melhor solução
                  para o seu cultivo.
                </p>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="alvo-toque mt-5 inline-flex items-center gap-2 rounded-full bg-neon px-6 py-3.5 text-sm font-700 text-verde-950 transition-colors hover:bg-lima"
                >
                  Falar com um especialista
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
