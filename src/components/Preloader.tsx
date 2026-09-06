"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

/** Preloader curto com a marca. Some em ~1,1s (ou instantaneamente com reduced-motion). */
export default function Preloader() {
  const reduzir = useReducedMotion();
  const [visivel, setVisivel] = useState(true);

  useEffect(() => {
    if (reduzir) {
      setVisivel(false);
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setVisivel(false);
      document.body.style.overflow = "";
    }, 1100);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [reduzir]);

  return (
    <AnimatePresence>
      {visivel && (
        <motion.div
          key="preloader"
          data-testid="preloader"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-verde-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-6 px-6">
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-14 w-[200px] sm:h-16 sm:w-[240px]"
            >
              <Image
                src="/images/logo-sustentagro-branca.png"
                alt=""
                fill
                priority
                sizes="240px"
                className="object-contain"
              />
            </motion.div>
            <div className="h-[3px] w-40 overflow-hidden rounded-full bg-white/15">
              <motion.div
                className="h-full rounded-full bg-neon"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.95, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
