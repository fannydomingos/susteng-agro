"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Rotulo, Secao, Surge, Titulo } from "@/components/ui";
import { Icone } from "@/components/Icones";
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

        {/*
          Cada etapa é um ícone dentro de um círculo. O trilho que liga as
          etapas NÃO é uma linha única atravessando a fileira: é um trecho por
          etapa, desenhado do círculo até a coluna seguinte. Assim a linha
          nunca cruza o desenho por dentro, e não é preciso tapar nada com um
          fundo sólido, que destoaria da luz da seção. O trecho já percorrido
          acende, o que mostra o lote avançando sem precisar de um ponto
          viajando por cima dos ícones.
        */}
        <ol
          data-testid="esteira"
          className="relative grid gap-9 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5"
        >
          {rastreabilidade.etapas.map((e, i) => {
            const ativa = i === etapaViva;
            const ultima = i === rastreabilidade.etapas.length - 1;
            return (
              <li key={e.nome} className="relative">
                {!ultima && (
                  <span
                    aria-hidden="true"
                    className={
                      "absolute left-11 right-[-1.25rem] top-[18px] hidden h-px transition-colors duration-700 lg:block " +
                      (!reduzir && i < etapaViva ? "bg-destaque/60" : "bg-menta/12")
                    }
                  />
                )}

                <span
                  className={
                    "relative grid h-9 w-9 place-items-center rounded-full border transition-all duration-500 " +
                    (ativa
                      ? "border-destaque/60 text-destaque shadow-[0_0_16px_1px_rgba(182,255,137,0.3)]"
                      : "border-menta/20 text-menta/45")
                  }
                >
                  <Icone nome={e.icone} className="h-[18px] w-[18px]" />
                </span>

                <h3
                  className={
                    "mt-4 font-display text-base font-600 transition-colors duration-500 " +
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
                  {/* o ícone entrou no lugar do número: diz a mesma coisa e prende mais */}
                  <Icone
                    nome={item.icone}
                    className="mt-0.5 h-6 w-6 shrink-0 text-destaque/70"
                  />
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
