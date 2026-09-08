"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Scroll suave (Lenis) sincronizado com o GSAP ScrollTrigger.
 * Respeita prefers-reduced-motion: nesse caso o Lenis nem é iniciado.
 */
export default function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduzir) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", ScrollTrigger.update);

    // deixa a instância acessível para depuração e para os testes automatizados
    // conseguirem posicionar o scroll sem brigar com a animação do Lenis
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    /**
     * Âncoras internas passam a usar o Lenis.
     *
     * A posição é calculada aqui, em pixels, e não entregando o elemento ao
     * Lenis: passando o elemento, o cálculo dele depende de `offsetTop` e da
     * cadeia de `offsetParent`, e com as seções posicionadas a âncora parava
     * quase 300px abaixo do topo da seção. Medindo pelo retângulo do elemento
     * o resultado é sempre o mesmo, seja qual for a estrutura da página.
     */
    const FOLGA_TOPO = 96; // altura do cabeçalho fixo mais um respiro

    const onClick = (e: MouseEvent) => {
      const alvo = (e.target as HTMLElement)?.closest?.("a[href*='#']") as HTMLAnchorElement | null;
      if (!alvo) return;
      const href = alvo.getAttribute("href") || "";
      const hash = href.includes("#") ? "#" + href.split("#")[1] : "";
      if (!hash || hash === "#") return;
      const mesmaPagina = href.startsWith("#") || href.startsWith("/#");
      if (!mesmaPagina) return;
      const destino = document.querySelector(hash);
      if (!destino) return;
      e.preventDefault();
      const y = destino.getBoundingClientRect().top + window.scrollY - FOLGA_TOPO;
      lenis.scrollTo(Math.max(0, y));
      history.replaceState(null, "", hash);
    };
    document.addEventListener("click", onClick);

    ScrollTrigger.refresh();

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      lenis.destroy();
    };
  }, []);

  return null;
}
