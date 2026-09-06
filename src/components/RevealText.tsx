"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";

type Props = {
  texto: string;
  className?: string;
  as?: ElementType;
  delay?: number;
  /** Palavras que recebem destaque em verde/neon */
  destaque?: string[];
  id?: string;
};

/**
 * Título revelado palavra a palavra ao entrar na tela.
 * O gatilho fica no CONTÊINER (não em cada palavra), porque as palavras
 * começam deslocadas dentro de um overflow-hidden e ficariam invisíveis
 * para o IntersectionObserver.
 */
const containerVariants: Variants = {
  escondido: {},
  visivel: (delay: number) => ({
    transition: { staggerChildren: 0.05, delayChildren: delay },
  }),
};

const palavraVariants: Variants = {
  escondido: { y: "105%", opacity: 0 },
  visivel: { y: "0%", opacity: 1, transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] } },
};

export default function RevealText({
  texto,
  className = "",
  as: Tag = "h2",
  delay = 0,
  destaque = [],
  id,
}: Props) {
  const reduzir = useReducedMotion();
  const palavras = texto.split(" ");
  const normalizar = (p: string) => p.replace(/[.,:;!?—]/g, "").toLowerCase();
  const destaqueSet = new Set(destaque.map((d) => normalizar(d)));

  if (reduzir) {
    return (
      <Tag id={id} className={className}>
        {palavras.map((p, i) => (
          <span key={i} className={destaqueSet.has(normalizar(p)) ? "text-verde-500" : undefined}>
            {p}
            {i < palavras.length - 1 ? " " : ""}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag id={id} className={className}>
      <span className="sr-only">{texto}</span>
      <motion.span
        aria-hidden="true"
        className="inline"
        custom={delay}
        variants={containerVariants}
        initial="escondido"
        whileInView="visivel"
        viewport={{ once: true, amount: 0.1, margin: "0px 0px -8% 0px" }}
      >
        {palavras.map((palavra, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <motion.span
              variants={palavraVariants}
              className={
                "inline-block " + (destaqueSet.has(normalizar(palavra)) ? "text-verde-500" : "")
              }
            >
              {palavra}
            </motion.span>
            {i < palavras.length - 1 ? <span>&nbsp;</span> : null}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/** Envelope simples de fade-up para blocos de conteúdo. */
export function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduzir = useReducedMotion();
  if (reduzir) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
