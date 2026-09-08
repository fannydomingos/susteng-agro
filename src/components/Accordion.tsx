"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMovimentoReduzido } from "@/lib/movimento";

type Item = { pergunta: string; resposta: string };

export default function Accordion({ itens }: { itens: Item[] }) {
  const [aberto, setAberto] = useState<number | null>(0);
  const reduzir = useMovimentoReduzido();

  return (
    <div className="vidro borda-luz relative overflow-hidden rounded-marca">
      <div className="divide-y divide-menta/8">
        {itens.map((item, i) => {
          const estaAberto = aberto === i;
          return (
            <div key={i}>
              <h4>
                <button
                  type="button"
                  data-testid="faq-botao"
                  aria-expanded={estaAberto}
                  aria-controls={`faq-painel-${i}`}
                  id={`faq-botao-${i}`}
                  onClick={() => setAberto(estaAberto ? null : i)}
                  className="alvo-toque flex w-full items-center justify-between gap-5 px-6 py-5 text-left transition-colors hover:bg-menta/[0.03] sm:px-8"
                >
                  <span
                    className={
                      "font-display text-base font-500 transition-colors sm:text-lg " +
                      (estaAberto ? "text-destaque" : "text-menta")
                    }
                  >
                    {item.pergunta}
                  </span>
                  <span
                    aria-hidden="true"
                    className={
                      "grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-400 " +
                      (estaAberto
                        ? "rotate-45 border-destaque bg-destaque text-verde-950"
                        : "border-menta/20 text-menta/60")
                    }
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
              </h4>
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
                    <p className="px-6 pb-6 text-sm leading-relaxed text-menta/55 sm:px-8 sm:text-[0.95rem]">
                      {item.resposta}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
