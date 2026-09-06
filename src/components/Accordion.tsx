"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Item = { pergunta: string; resposta: string };

export default function Accordion({ itens }: { itens: Item[] }) {
  const [aberto, setAberto] = useState<number | null>(0);
  const reduzir = useReducedMotion();

  return (
    <div className="divide-y divide-verde-900/10 rounded-marca border border-verde-900/10 bg-white">
      {itens.map((item, i) => {
        const estaAberto = aberto === i;
        return (
          <div key={i}>
            <h3>
              <button
                type="button"
                data-testid="faq-botao"
                aria-expanded={estaAberto}
                aria-controls={`faq-painel-${i}`}
                id={`faq-botao-${i}`}
                onClick={() => setAberto(estaAberto ? null : i)}
                className="alvo-toque flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-verde-500/5 sm:px-7"
              >
                <span className="font-display text-base font-600 text-verde-900 sm:text-lg">
                  {item.pergunta}
                </span>
                <span
                  aria-hidden="true"
                  className={
                    "grid h-9 w-9 shrink-0 place-items-center rounded-full border border-verde-500/40 text-verde-500 transition-transform duration-300 " +
                    (estaAberto ? "rotate-45 bg-verde-500 text-white" : "")
                  }
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {estaAberto && (
                <motion.div
                  key="painel"
                  id={`faq-painel-${i}`}
                  role="region"
                  aria-labelledby={`faq-botao-${i}`}
                  initial={reduzir ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduzir ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-6 text-[0.95rem] leading-relaxed text-tinta-suave sm:px-7 sm:text-base">
                    {item.resposta}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
