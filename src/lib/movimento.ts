"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Diz se o componente já montou no navegador.
 *
 * Serve para os efeitos que dependem de algo que só existe no cliente
 * (posição de scroll, preferência de movimento do sistema, ponteiro).
 * Enquanto for `false`, o componente renderiza exatamente o mesmo HTML que
 * o servidor produziu, então a hidratação do React não acusa divergência.
 * O efeito entra logo depois, no primeiro quadro após a montagem.
 */
export function useMontado() {
  const [montado, setMontado] = useState(false);
  useEffect(() => setMontado(true), []);
  return montado;
}

/**
 * `true` somente quando o visitante pediu menos movimento no sistema E o
 * componente já montou. Use no lugar de `useReducedMotion` sempre que a
 * preferência mudar o HTML renderizado, e não apenas o comportamento de um
 * evento, para não gerar divergência de hidratação.
 */
export function useMovimentoReduzido() {
  const reduzir = useReducedMotion();
  const montado = useMontado();
  return montado && Boolean(reduzir);
}

/** `true` quando é seguro animar: já montou e o visitante não pediu menos movimento. */
export function usePodeAnimar() {
  const reduzir = useReducedMotion();
  const montado = useMontado();
  return montado && !reduzir;
}
