"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { site, whatsappUrl } from "@/lib/site";
import RevealText from "@/components/RevealText";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduzir = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacidade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative flex min-h-[92svh] items-end overflow-hidden bg-verde-950 pb-14 pt-28 sm:min-h-[95svh] sm:pb-20 sm:pt-32"
    >
      {/* Fundo com parallax */}
      <motion.div className="absolute inset-0" style={reduzir ? undefined : { y }}>
        <Image
          src="/images/hero-fibra.jpg"
          alt="Pilha de fibra de coco processada na unidade da SustentAgro"
          fill
          priority
          quality={80}
          sizes="100vw"
          className="scale-110 object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-verde-950/85 via-verde-950/70 to-verde-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-verde-950/85 to-transparent" />
      </motion.div>

      <motion.div className="container-marca relative" style={reduzir ? undefined : { opacity: opacidade }}>
        <span className="inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/10 px-4 py-1.5 text-legenda font-600 uppercase tracking-wider text-neon">
          {site.slogan}
        </span>

        <RevealText
          as="h1"
          texto="Do coco descartado ao substrato que faz sua lavoura render"
          destaque={["substrato"]}
          delay={0.15}
          className="mt-6 max-w-4xl font-display text-[2rem] font-700 leading-[1.08] text-white sm:text-5xl lg:text-6xl xl:text-7xl"
        />

        <motion.p
          initial={reduzir ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg"
        >
          Substratos ecológicos de fibra e pó de coco para viveiros, fruticultura, hortaliças e
          paisagismo. Produzidos a partir do coco verde que iria para o lixão — no DF, Entorno e Ceará.
        </motion.p>

        <motion.div
          initial={reduzir ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="alvo-toque inline-flex items-center justify-center gap-2 rounded-full bg-verde-500 px-7 py-4 text-base font-600 text-white transition-all hover:bg-verde-400"
          >
            Pedir um orçamento
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#produtos"
            className="alvo-toque inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-4 text-base font-600 text-white transition-colors hover:bg-white/10"
          >
            Ver os produtos
          </a>
        </motion.div>

        <p className="mt-6 text-legenda text-white/45">imagem ilustrativa</p>
      </motion.div>
    </section>
  );
}
