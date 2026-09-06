"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { categorias, fotos } from "@/lib/galeria";
import { site } from "@/lib/site";

export default function GaleriaGrid() {
  const [filtro, setFiltro] = useState<string>("Todas");
  const [aberta, setAberta] = useState<number | null>(null);
  const reduzir = useReducedMotion();

  const lista = filtro === "Todas" ? fotos : fotos.filter((f) => f.categoria === filtro);

  const fechar = useCallback(() => setAberta(null), []);

  useEffect(() => {
    if (aberta === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") fechar();
      if (e.key === "ArrowRight") setAberta((i) => (i === null ? null : (i + 1) % lista.length));
      if (e.key === "ArrowLeft")
        setAberta((i) => (i === null ? null : (i - 1 + lista.length) % lista.length));
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [aberta, lista.length, fechar]);

  return (
    <>
      {/* Filtros */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar fotos por categoria">
        {categorias.map((c) => (
          <button
            key={c}
            type="button"
            data-testid="filtro-galeria"
            aria-pressed={filtro === c}
            onClick={() => {
              setFiltro(c);
              setAberta(null);
            }}
            className={
              "alvo-toque rounded-full border px-5 py-2.5 text-sm font-600 transition-colors " +
              (filtro === c
                ? "border-verde-500 bg-verde-500 text-white"
                : "border-verde-900/15 bg-white text-tinta-suave hover:border-verde-500/50 hover:text-verde-600")
            }
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grade */}
      <ul className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {lista.map((f, i) => (
          <li key={f.src + i}>
            <motion.button
              type="button"
              data-testid="foto-galeria"
              onClick={() => setAberta(i)}
              layout={!reduzir}
              initial={reduzir ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: (i % 8) * 0.03 }}
              className="group relative block aspect-[4/5] w-full overflow-hidden rounded-marca bg-verde-900/5"
              aria-label={`Abrir foto: ${f.alt}`}
            >
              <Image
                src={f.src}
                alt={f.alt}
                fill
                quality={70}
                sizes="(max-width: 640px) 48vw, (max-width: 1024px) 32vw, 24vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-verde-950/85 to-transparent p-3 pt-8 text-left text-legenda font-600 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                {f.categoria}
              </span>
            </motion.button>
          </li>
        ))}
      </ul>

      {lista.length === 0 ? (
        <p className="mt-10 text-tinta-suave">Nenhuma foto nesta categoria ainda.</p>
      ) : null}

      {/* Lightbox */}
      <AnimatePresence>
        {aberta !== null && lista[aberta] && (
          <motion.div
            key="lightbox"
            data-testid="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={lista[aberta].alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[130] flex flex-col bg-verde-950/96 p-4 backdrop-blur-sm sm:p-8"
            onClick={fechar}
          >
            <div className="flex justify-end">
              <button
                type="button"
                data-testid="lightbox-fechar"
                onClick={fechar}
                aria-label="Fechar"
                className="alvo-toque grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div
              className="relative mt-2 flex-1"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lista[aberta].src}
                alt={lista[aberta].alt}
                fill
                quality={90}
                sizes="100vw"
                className="object-contain"
              />
            </div>

            <div className="mt-4 flex items-center justify-between gap-4" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setAberta((i) => (i === null ? null : (i - 1 + lista.length) % lista.length))}
                aria-label="Foto anterior"
                className="alvo-toque grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <p className="flex-1 text-center text-legenda text-white/70">
                {lista[aberta].alt} · {site.legendaImagem}
              </p>
              <button
                type="button"
                onClick={() => setAberta((i) => (i === null ? null : (i + 1) % lista.length))}
                aria-label="Próxima foto"
                className="alvo-toque grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
