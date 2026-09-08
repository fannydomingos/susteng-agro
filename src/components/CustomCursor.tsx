"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cursor customizado, só onde existe um cursor de verdade para substituir:
 * tela a partir de 1024px, ponteiro de precisão e hover disponível. No celular
 * e no tablet ele nem chega a existir. Desligado também quando o visitante
 * pede menos movimento.
 *
 * O site alterna faixas escuras e claras, e o verde de destaque simplesmente
 * desaparece sobre o branco. Por isso o cursor consulta em que faixa está: ao
 * entrar numa seção clara ele troca para o verde profundo da paleta, que tem
 * contraste alto no claro. A checagem é feita a cada movimento, com
 * `elementFromPoint`, e o resultado é escrito numa classe, sem estado do React.
 */
export default function CustomCursor() {
  const pontoRef = useRef<HTMLDivElement>(null);
  const anelRef = useRef<HTMLDivElement>(null);
  const [ativo, setAtivo] = useState(false);

  /**
   * Só em tela grande, com ponteiro de precisão E com hover de verdade.
   * `pointer: fine` sozinho não basta: um tablet com caneta responde fine, e
   * ali não existe cursor para substituir. O `hover: hover` corta os aparelhos
   * de toque. A consulta fica escutando, então diminuir a janela no
   * computador desliga o cursor na hora, em vez de só na próxima carga.
   */
  const [permitido, setPermitido] = useState(false);

  useEffect(() => {
    const consulta = window.matchMedia(
      "(min-width: 1024px) and (pointer: fine) and (hover: hover)",
    );
    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");
    const avaliar = () => setPermitido(consulta.matches && !semMovimento.matches);
    avaliar();
    consulta.addEventListener("change", avaliar);
    semMovimento.addEventListener("change", avaliar);
    return () => {
      consulta.removeEventListener("change", avaliar);
      semMovimento.removeEventListener("change", avaliar);
    };
  }, []);

  useEffect(() => {
    if (!permitido) {
      setAtivo(false);
      document.documentElement.classList.remove("cursor-custom");
      return;
    }

    setAtivo(true);
    document.documentElement.classList.add("cursor-custom");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let ax = x;
    let ay = y;
    let raf = 0;
    let claroAgora = false;

    /**
     * Descobre a faixa pelo elemento que está debaixo do ponteiro. O cursor
     * tem `pointer-events: none`, então ele não aparece nesta consulta.
     */
    const estaNoClaro = (cx: number, cy: number) => {
      const el = document.elementFromPoint(cx, cy) as HTMLElement | null;
      if (!el) return claroAgora;
      return Boolean(el.closest('[data-tema="claro"], .claro'));
    };

    const aplicarFaixa = (claro: boolean) => {
      if (claro === claroAgora) return;
      claroAgora = claro;
      pontoRef.current?.classList.toggle("no-claro", claro);
      anelRef.current?.classList.toggle("no-claro", claro);
    };

    const mover = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (pontoRef.current) {
        pontoRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      const alvo = e.target as HTMLElement | null;
      const interativo = alvo?.closest(
        "a, button, [role='button'], input, textarea, summary, [data-cursor='hover']",
      );
      anelRef.current?.classList.toggle("is-hover", Boolean(interativo));
      aplicarFaixa(estaNoClaro(x, y));
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

    /* a faixa também muda quando a página rola sem o ponteiro se mexer */
    const aoRolar = () => aplicarFaixa(estaNoClaro(x, y));

    const sair = () => anelRef.current?.classList.add("is-fora");
    const entrar = () => anelRef.current?.classList.remove("is-fora");

    window.addEventListener("mousemove", mover, { passive: true });
    window.addEventListener("scroll", aoRolar, { passive: true });
    document.addEventListener("mouseleave", sair);
    document.addEventListener("mouseenter", entrar);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", mover);
      window.removeEventListener("scroll", aoRolar);
      document.removeEventListener("mouseleave", sair);
      document.removeEventListener("mouseenter", entrar);
      document.documentElement.classList.remove("cursor-custom");
    };
  }, [permitido]);

  if (!ativo) return null;

  return (
    <>
      <div
        ref={pontoRef}
        data-testid="cursor-ponto"
        aria-hidden="true"
        className="cursor-ponto pointer-events-none fixed left-0 top-0 z-[150] h-1.5 w-1.5 rounded-full"
      />
      <div
        ref={anelRef}
        data-testid="cursor-anel"
        aria-hidden="true"
        className="cursor-anel pointer-events-none fixed left-0 top-0 z-[150] h-9 w-9 rounded-full border-2"
      />
      <style jsx global>{`
        .cursor-ponto,
        .cursor-anel {
          transition:
            width 0.25s var(--ease-marca),
            height 0.25s var(--ease-marca),
            background-color 0.25s var(--ease-marca),
            border-color 0.25s var(--ease-marca),
            opacity 0.25s var(--ease-marca);
        }

        /* faixa escura: verde de destaque */
        .cursor-ponto {
          background-color: var(--color-destaque);
        }
        .cursor-anel {
          border-color: color-mix(in srgb, var(--color-destaque) 60%, transparent);
        }
        .cursor-anel.is-hover {
          width: 3.5rem;
          height: 3.5rem;
          background-color: color-mix(in srgb, var(--color-destaque) 14%, transparent);
        }

        /* faixa clara: o destaque some no branco, então entra o verde profundo */
        .cursor-ponto.no-claro {
          background-color: var(--color-verde-700);
        }
        .cursor-anel.no-claro {
          border-color: color-mix(in srgb, var(--color-verde-700) 55%, transparent);
        }
        .cursor-anel.no-claro.is-hover {
          background-color: color-mix(in srgb, var(--color-verde-700) 12%, transparent);
        }

        .cursor-anel.is-fora {
          opacity: 0;
        }
      `}</style>
    </>
  );
}
