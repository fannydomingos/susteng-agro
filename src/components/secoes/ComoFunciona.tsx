"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Rotulo, Secao, Surge, Titulo } from "@/components/ui";
import { comoFunciona, rastreabilidade } from "@/lib/conteudo";
import { useMovimentoReduzido } from "@/lib/movimento";

/**
 * COMO FUNCIONA
 * Uma esteira de seis etapas com um pulso de luz que percorre a linha, e os
 * cinco benefícios como lista numerada com régua. Nada aqui é caixa: a
 * separação vem de linha fina e espaço, que é o que sustenta o ritmo da
 * página. O pulso é um único elemento animado com transform, então roda na
 * GPU e para quando a seção sai da tela.
 */
export default function ComoFunciona() {
  const ref = useRef<HTMLDivElement>(null);
  const naTela = useInView(ref, { amount: 0.25 });
  const reduzir = useMovimentoReduzido();
  const [etapaViva, setEtapaViva] = useState(0);

  useEffect(() => {
    if (!naTela || reduzir) return;
    const t = setInterval(
      () => setEtapaViva((i) => (i + 1) % rastreabilidade.etapas.length),
      1600,
    );
    return () => clearInterval(t);
  }, [naTela, reduzir]);

  return (
    <Secao id="como-funciona" rotulada="como-funciona-titulo" luz="esquerda">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <Rotulo>Como funciona</Rotulo>
          <Titulo
            id="como-funciona-titulo"
            texto="Do resíduo de coco ao substrato embalado"
            destaque={["substrato"]}
            className="mt-6 font-display text-[2.2rem] font-600 leading-[1.03] tracking-tight sm:text-5xl lg:text-[3.4rem]"
          />
        </div>
        <Surge delay={0.08} className="lg:pt-4">
          <p className="text-base leading-relaxed text-menta/65 sm:text-lg">
            {comoFunciona.intro} {rastreabilidade.intro}
          </p>
        </Surge>
      </div>

      {/* -------------------- esteira das etapas -------------------- */}
      <div ref={ref} className="mt-16 sm:mt-20">
        <div className="mb-9 flex items-center justify-between gap-4">
          <p className="rotulo text-menta/40">Rastreabilidade do lote</p>
          <p className="rotulo text-destaque">
            {String(etapaViva + 1).padStart(2, "0")} / {rastreabilidade.etapas.length}
          </p>
        </div>

        <ol
          data-testid="esteira"
          className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5"
        >
          {/* linha que liga as etapas, só no desktop */}
          <span
            aria-hidden="true"
            className="absolute left-0 right-0 top-[13px] hidden h-px bg-menta/12 lg:block"
          />
          {!reduzir && (
            <motion.span
              aria-hidden="true"
              className="absolute top-[11px] hidden h-[5px] w-[5px] rounded-full bg-destaque shadow-[0_0_14px_3px_rgba(182,255,137,0.7)] lg:block"
              animate={{
                left: `${(etapaViva / (rastreabilidade.etapas.length - 1)) * 100}%`,
              }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
          )}

          {rastreabilidade.etapas.map((e, i) => {
            const ativa = i === etapaViva;
            return (
              <li key={e.nome} className="relative">
                <span
                  aria-hidden="true"
                  className={
                    "block h-[7px] w-[7px] rounded-full transition-all duration-500 " +
                    (ativa
                      ? "bg-destaque shadow-[0_0_12px_2px_rgba(182,255,137,0.55)]"
                      : "bg-menta/25")
                  }
                />
                <h3
                  className={
                    "mt-5 font-display text-base font-600 transition-colors duration-500 " +
                    (ativa ? "text-destaque" : "text-menta")
                  }
                >
                  {e.nome}
                </h3>
                <p className="mt-2 text-legenda leading-relaxed text-menta/50">{e.detalhe}</p>
              </li>
            );
          })}
        </ol>
      </div>

      {/* -------------------- benefícios em lista -------------------- */}
      <div className="mt-20 sm:mt-24">
        <p className="rotulo text-menta/40">O que muda na lavoura</p>
        <ul className="mt-8 grid gap-x-16 lg:grid-cols-2">
          {comoFunciona.itens.map((item, i) => (
            <li key={item.titulo}>
              <Surge delay={i * 0.05}>
                <div className="flex gap-5 border-b border-menta/10 py-7">
                  <span aria-hidden="true" className="rotulo shrink-0 pt-1.5 text-destaque/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-600 text-menta">{item.titulo}</h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-menta/55">
                      {item.texto}
                    </p>
                  </div>
                </div>
              </Surge>
            </li>
          ))}
        </ul>
      </div>
    </Secao>
  );
}
