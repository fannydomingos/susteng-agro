"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { aplicacoes } from "@/lib/conteudo";
import RevealText, { FadeUp } from "@/components/RevealText";

/** Painéis que expandem no hover / clique — um por tipo de cultivo. */
export default function Aplicacoes() {
  const [aberto, setAberto] = useState(0);
  const reduzir = useReducedMotion();

  return (
    <section id="aplicacoes" aria-labelledby="aplicacoes-titulo" className="bg-white py-20 sm:py-28">
      <div className="container-marca">
        <div className="max-w-3xl">
          <p className="text-legenda font-600 uppercase tracking-wider text-verde-500">Utilização</p>
          <RevealText
            id="aplicacoes-titulo"
            texto="Um substrato para cada cultivo"
            destaque={["cultivo"]}
            className="mt-4 font-display text-3xl font-700 leading-[1.12] text-verde-900 sm:text-4xl lg:text-5xl"
          />
          <FadeUp delay={0.1}>
            <p className="mt-5 text-base leading-relaxed text-tinta-suave sm:text-lg">
              {aplicacoes.intro}
            </p>
          </FadeUp>
        </div>

        <div className="mt-12 grid gap-3 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {aplicacoes.grupos.map((g, i) => {
            const estaAberto = aberto === i;
            return (
              <FadeUp key={g.titulo} delay={i * 0.05}>
                <button
                  type="button"
                  data-testid="painel-aplicacao"
                  aria-expanded={estaAberto}
                  onClick={() => setAberto(i)}
                  onMouseEnter={() => setAberto(i)}
                  onFocus={() => setAberto(i)}
                  className={
                    "flex h-full w-full flex-col rounded-marca border p-6 text-left transition-all duration-300 sm:p-7 " +
                    (estaAberto
                      ? "border-verde-500 bg-verde-500/[0.06] shadow-lg shadow-verde-500/10"
                      : "border-verde-900/10 bg-off hover:border-verde-500/40")
                  }
                >
                  <span
                    className={
                      "grid h-10 w-10 shrink-0 place-items-center rounded-full font-display text-sm font-700 transition-colors " +
                      (estaAberto ? "bg-verde-500 text-white" : "bg-verde-500/10 text-verde-600")
                    }
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-600 leading-snug text-verde-900 sm:text-xl">
                    {g.titulo}
                  </h3>
                  <AnimatePresence initial={false}>
                    {estaAberto && (
                      <motion.p
                        initial={reduzir ? false : { height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 10 }}
                        exit={reduzir ? undefined : { height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden text-sm leading-relaxed text-tinta-suave"
                      >
                        {g.texto}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
