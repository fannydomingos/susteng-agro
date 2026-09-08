"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePodeAnimar } from "@/lib/movimento";
import { site } from "@/lib/site";

/**
 * HERO
 * Uma foto de lavoura em tela cheia com a marca por cima e um degradê que
 * dissolve a imagem no verde escuro da seção seguinte, a de produtos. É a
 * única passagem em degradê do site: entre as outras faixas o corte é reto.
 *
 * Ao descer: a foto sobe devagar e cresce de leve (parallax), enquanto a marca
 * sobe mais rápido e desaparece. O contraste entre as duas velocidades é o que
 * dá sensação de profundidade. Todos os estilos animados só entram depois da
 * montagem, senão o HTML do servidor e o do navegador saem diferentes.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const animar = usePodeAnimar();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const yFoto = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const escalaFoto = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const yMarca = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const opMarca = useTransform(scrollYProgress, [0, 0.62], [1, 0]);

  return (
    <section
      ref={ref}
      id="inicio"
      aria-labelledby="hero-titulo"
      className="relative isolate flex h-[100svh] min-h-[560px] items-center justify-center overflow-hidden"
    >
      {/* -------------------------------------------------- foto */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-20"
        style={animar ? { y: yFoto, scale: escalaFoto } : undefined}
      >
        <Image
          src="/images/campo.jpg"
          alt=""
          fill
          priority
          quality={80}
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* escurece o topo para o cabeçalho continuar legível */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-56 bg-gradient-to-b from-abismo/85 via-abismo/35 to-transparent"
      />
      {/* véu geral, para a marca destacar da lavoura */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-verde-950/35" />
      {/* dissolve a foto no verde escuro da seção de produtos, que vem abaixo */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-[62%] bg-[linear-gradient(180deg,transparent_0%,rgba(11,43,38,0.35)_26%,rgba(5,31,32,0.82)_62%,var(--color-abismo)_88%,var(--color-abismo)_100%)]"
      />

      {/* -------------------------------------------------- marca */}
      <motion.div
        className="container-marca relative flex flex-col items-center text-center"
        style={animar ? { y: yMarca, opacity: opMarca } : undefined}
      >
        <motion.div
          initial={animar ? { opacity: 0, y: 26, scale: 0.96 } : false}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-20 w-[248px] sm:h-28 sm:w-[360px] lg:h-36 lg:w-[460px]"
        >
          <Image
            src="/images/logo-sustentagro-branca.png"
            alt={site.nome}
            fill
            priority
            quality={90}
            sizes="(max-width: 640px) 248px, (max-width: 1024px) 360px, 460px"
            className="object-contain drop-shadow-[0_18px_40px_rgba(2,16,15,0.7)]"
          />
        </motion.div>

        <motion.h1
          id="hero-titulo"
          initial={animar ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-2xl font-display text-xl font-500 leading-snug text-menta drop-shadow-[0_2px_18px_rgba(2,16,15,0.8)] sm:mt-10 sm:text-3xl lg:text-4xl"
        >
          {site.slogan}
        </motion.h1>

        <motion.p
          initial={animar ? { opacity: 0, y: 16 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
          /*
            Aqui NÃO se usa a classe `.rotulo`: ela mora em `@layer utilities`
            depois do import do Tailwind, então vence `text-[...]` e
            `tracking-[...]`, e o tamanho ficava travado em 11px no celular.
            As propriedades vão escritas uma a uma para o celular poder ter
            tipo menor e espaçamento menor que o computador.
          */
          className="mt-7 font-mono text-[0.625rem] font-500 uppercase tracking-[0.13em] text-menta/50 drop-shadow-[0_2px_10px_rgba(2,16,15,0.9)] sm:mt-8 sm:text-[0.6875rem] sm:tracking-[0.22em] sm:text-menta/75"
        >
          Distrito Federal · Entorno · Ceará
        </motion.p>
      </motion.div>

      {/* -------------------------------------------------- convite a descer */}
      <motion.a
        href="#produtos"
        aria-label="Ir para o conteúdo"
        initial={animar ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        style={animar ? { opacity: opMarca } : undefined}
        className="alvo-toque absolute bottom-[13%] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2.5 text-menta/60 transition-colors hover:text-destaque"
      >
        <span className="rotulo text-[0.625rem]">Descer</span>
        <span
          aria-hidden="true"
          className="flutua-descer grid h-9 w-9 place-items-center rounded-full border border-current"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5v14m0 0 6-6m-6 6-6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </motion.a>

      <p className="absolute bottom-4 right-5 text-legenda text-menta/30 sm:right-8">
        {site.legendaImagem}
      </p>
    </section>
  );
}
