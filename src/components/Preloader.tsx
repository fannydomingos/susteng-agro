"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { site } from "@/lib/site";
import { useMovimentoReduzido } from "@/lib/movimento";

/** tempo mínimo na tela, o bastante para a revelação da marca terminar */
const MINIMO = 1650;
/** teto, para uma imagem lenta nunca segurar o visitante */
const TETO = 3000;

/**
 * TELA DE CARREGAMENTO
 *
 * A marca é revelada de baixo para cima, com uma linha de luz subindo junto,
 * como o substrato enchendo o saco. É um recorte por `clip-path`, então a
 * animação roda no compositor e não repinta a imagem quadro a quadro.
 *
 * A saída não é por tempo fixo: espera a página carregar de verdade, com um
 * mínimo (para a animação não ser cortada no meio) e um teto (para uma imagem
 * lenta não segurar ninguém). Com movimento reduzido não aparece.
 */
export default function Preloader() {
  const reduzir = useMovimentoReduzido();
  const [visivel, setVisivel] = useState(true);

  useEffect(() => {
    if (reduzir) {
      setVisivel(false);
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    const abertura = performance.now();
    let saiu = false;

    const sair = () => {
      if (saiu) return;
      saiu = true;
      setVisivel(false);
      document.body.style.overflow = "";
    };

    /* sai quando a página terminar de carregar, respeitando o tempo mínimo */
    const aoCarregar = () => {
      const decorrido = performance.now() - abertura;
      setTimeout(sair, Math.max(0, MINIMO - decorrido));
    };

    if (document.readyState === "complete") aoCarregar();
    else window.addEventListener("load", aoCarregar, { once: true });

    const teto = setTimeout(sair, TETO);

    return () => {
      clearTimeout(teto);
      window.removeEventListener("load", aoCarregar);
      document.body.style.overflow = "";
    };
  }, [reduzir]);

  const logo = (className: string) => (
    <Image
      src="/images/logo-sustentagro-branca.png"
      alt=""
      fill
      priority
      quality={90}
      sizes="300px"
      className={className}
    />
  );

  return (
    <AnimatePresence>
      {visivel && (
        <motion.div
          key="preloader"
          data-testid="preloader"
          className="fixed inset-0 z-[200] grid place-items-center overflow-hidden bg-abismo"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          aria-hidden="true"
        >
          {/* luz verde que abre por trás da marca */}
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute h-[70vh] w-[80vw] rounded-full blur-[110px]"
            style={{ background: "radial-gradient(circle, rgba(35,83,71,0.6), transparent 68%)" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="relative flex flex-col items-center px-6">
            <div
              data-testid="preloader-marca"
              className="relative h-16 w-[230px] sm:h-[4.5rem] sm:w-[300px]"
            >
              {/* marca apagada: é contra ela que a revelação ganha contraste */}
              {logo("object-contain opacity-[0.16]")}

              {/* marca cheia, descoberta de baixo para cima */}
              <motion.div
                data-testid="preloader-revelacao"
                className="absolute inset-0"
                initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                animate={{
                  clipPath: "inset(0% 0% 0% 0%)",
                  // um respiro de brilho logo depois que a marca fica inteira
                  filter: [
                    "drop-shadow(0 0 0 rgba(182,255,137,0))",
                    "drop-shadow(0 0 0 rgba(182,255,137,0))",
                    "drop-shadow(0 0 22px rgba(182,255,137,0.45))",
                    "drop-shadow(0 0 0 rgba(182,255,137,0))",
                  ],
                }}
                transition={{
                  clipPath: { duration: 1.05, delay: 0.18, ease: [0.65, 0, 0.35, 1] },
                  filter: { duration: 1.9, delay: 0.18, times: [0, 0.55, 0.72, 1] },
                }}
              >
                {logo("object-contain")}
              </motion.div>

              {/* fio de luz que sobe junto com a revelação */}
              <motion.span
                aria-hidden="true"
                className="absolute inset-x-[-10%] h-px bg-destaque shadow-[0_0_18px_3px_rgba(182,255,137,0.8)]"
                initial={{ top: "100%", opacity: 0 }}
                animate={{ top: "0%", opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 1.05,
                  delay: 0.18,
                  ease: [0.65, 0, 0.35, 1],
                  opacity: { duration: 1.05, delay: 0.18, times: [0, 0.12, 0.82, 1] },
                }}
              />
            </div>

            <motion.p
              className="rotulo mt-9 text-center text-menta/35"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              {site.slogan}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
