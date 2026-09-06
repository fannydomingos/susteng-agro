"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  valor: number;
  sufixo?: string;
  prefixo?: string;
  /** duração em ms — padrão 2000 */
  duracao?: number;
  className?: string;
  /** número sem animação (ex.: ano) */
  estatico?: boolean;
  /** desliga o separador de milhar (ex.: anos) */
  semSeparador?: boolean;
};

/**
 * Contador que sobe de zero quando o bloco está BEM visível (60% na tela),
 * não ao encostar na borda. Dura ~2s.
 */
export default function Counter({
  valor,
  sufixo = "",
  prefixo = "",
  duracao = 2000,
  className = "",
  estatico = false,
  semSeparador = false,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [atual, setAtual] = useState(estatico ? valor : 0);
  const jaRodou = useRef(false);

  useEffect(() => {
    if (estatico) return;
    const el = ref.current;
    if (!el) return;

    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduzir) {
      setAtual(valor);
      return;
    }

    const obs = new IntersectionObserver(
      (entradas) => {
        const e = entradas[0];
        if (!e.isIntersecting || jaRodou.current) return;
        jaRodou.current = true;
        obs.disconnect();

        const inicio = performance.now();
        const passo = (agora: number) => {
          const t = Math.min(1, (agora - inicio) / duracao);
          // easeOutExpo — chega perto do fim e desacelera
          const e2 = t === 1 ? 1 : 1 - Math.pow(2, -9 * t);
          setAtual(Math.round(valor * e2));
          if (t < 1) requestAnimationFrame(passo);
          else setAtual(valor);
        };
        requestAnimationFrame(passo);
      },
      // dispara só quando 60% do bloco estiver visível
      { threshold: 0.6, rootMargin: "0px 0px -10% 0px" },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [valor, duracao, estatico]);

  return (
    <span ref={ref} className={className} data-testid="contador" data-valor-final={valor}>
      {prefixo}
      {semSeparador ? atual : atual.toLocaleString("pt-BR")}
      {sufixo}
    </span>
  );
}
