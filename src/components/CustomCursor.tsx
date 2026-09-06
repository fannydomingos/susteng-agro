"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cursor customizado — só em telas ≥1024px com ponteiro fino.
 * Desligado quando o visitante pede menos movimento.
 */
export default function CustomCursor() {
  const pontoRef = useRef<HTMLDivElement>(null);
  const anelRef = useRef<HTMLDivElement>(null);
  const [ativo, setAtivo] = useState(false);

  useEffect(() => {
    const podeUsar =
      window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!podeUsar) return;

    setAtivo(true);
    document.documentElement.classList.add("cursor-custom");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let ax = x;
    let ay = y;
    let raf = 0;

    const mover = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (pontoRef.current) {
        pontoRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      const alvo = e.target as HTMLElement | null;
      const interativo = alvo?.closest("a, button, [role='button'], input, textarea, summary, [data-cursor='hover']");
      anelRef.current?.classList.toggle("is-hover", Boolean(interativo));
    };

    const loop = () => {
      ax += (x - ax) * 0.16;
      ay += (y - ay) * 0.16;
      if (anelRef.current) {
        anelRef.current.style.transform = `translate3d(${ax}px, ${ay}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    const sair = () => anelRef.current?.classList.add("is-fora");
    const entrar = () => anelRef.current?.classList.remove("is-fora");

    window.addEventListener("mousemove", mover, { passive: true });
    document.addEventListener("mouseleave", sair);
    document.addEventListener("mouseenter", entrar);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", mover);
      document.removeEventListener("mouseleave", sair);
      document.removeEventListener("mouseenter", entrar);
      document.documentElement.classList.remove("cursor-custom");
    };
  }, []);

  if (!ativo) return null;

  return (
    <>
      <div
        ref={pontoRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[150] h-1.5 w-1.5 rounded-full bg-verde-500"
      />
      <div
        ref={anelRef}
        aria-hidden="true"
        className="cursor-anel pointer-events-none fixed left-0 top-0 z-[150] h-9 w-9 rounded-full border-2 border-verde-500/60"
      />
      <style jsx global>{`
        .cursor-anel {
          transition:
            width 0.25s var(--ease-marca),
            height 0.25s var(--ease-marca),
            background-color 0.25s var(--ease-marca),
            opacity 0.25s var(--ease-marca);
        }
        .cursor-anel.is-hover {
          width: 3.5rem;
          height: 3.5rem;
          background-color: color-mix(in srgb, var(--color-verde-500) 16%, transparent);
        }
        .cursor-anel.is-fora {
          opacity: 0;
        }
      `}</style>
    </>
  );
}
