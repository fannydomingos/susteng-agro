"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { produtos } from "@/lib/conteudo";
import { site, whatsappUrl } from "@/lib/site";
import RevealText from "@/components/RevealText";

/**
 * SCROLL HORIZONTAL COM PIN.
 * ≥1024px: a seção gruda na tela e o scroll desloca os cards para o lado.
 * <1024px: nada de pin — os cards empilham verticalmente (não sequestra o gesto no celular).
 * prefers-reduced-motion: também empilha.
 */
export default function ProdutosHorizontal() {
  const secaoRef = useRef<HTMLElement>(null);
  const trilhoRef = useRef<HTMLDivElement>(null);
  const barraRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const secao = secaoRef.current;
    const trilho = trilhoRef.current;
    if (!secao || !trilho) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      },
      () => {
        // distância que o trilho precisa andar de lado
        const distancia = () => Math.max(1, trilho.scrollWidth - window.innerWidth + 96);
        // o pin dura mais que a distância, para o deslocamento lateral ficar suave
        const FATOR_PIN = 1.6;

        const tween = gsap.to(trilho, {
          x: () => -distancia(),
          ease: "none",
          scrollTrigger: {
            id: "produtos-horizontal",
            trigger: secao,
            start: "top top",
            end: () => "+=" + distancia() * FATOR_PIN,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (barraRef.current) {
                barraRef.current.style.transform = `scaleX(${self.progress})`;
              }
            },
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(trilho, { clearProps: "transform" });
        };
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={secaoRef}
      id="produtos"
      data-testid="produtos-horizontal"
      aria-labelledby="produtos-titulo"
      className="relative overflow-hidden bg-verde-950 py-20 lg:h-screen lg:py-0"
    >
      <div className="lg:flex lg:h-full lg:flex-col lg:justify-center">
        <div className="container-marca lg:pb-8 lg:pt-24">
          <p className="text-legenda font-600 uppercase tracking-wider text-neon">
            Conheça nossos produtos
          </p>
          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <RevealText
              id="produtos-titulo"
              texto="Quatro formatos, um substrato para cada cultivo"
              destaque={["substrato"]}
              className="max-w-2xl font-display text-3xl font-700 leading-[1.12] text-white sm:text-4xl lg:text-5xl"
            />
            <p className="hidden shrink-0 items-center gap-2 text-sm text-white/50 lg:flex">
              Role para o lado
              <svg width="26" height="16" viewBox="0 0 26 16" fill="none" aria-hidden="true">
                <path d="M1 8h23m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </p>
          </div>
        </div>

        {/* Trilho: horizontal no desktop, empilhado no mobile */}
        <div className="lg:overflow-hidden">
          <div
            ref={trilhoRef}
            data-testid="produtos-trilho"
            className="trilho-pad mt-10 flex flex-col gap-6 lg:mt-0 lg:w-max lg:flex-row lg:gap-8"
          >
            {produtos.map((p, i) => (
              <article
                key={p.slug}
                data-testid="produto-card"
                className="flex flex-col overflow-hidden rounded-marca border border-white/12 bg-white/[0.045] lg:w-[clamp(320px,30vw,460px)] lg:shrink-0"
              >
                <figure className="relative m-0 h-52 shrink-0 bg-gradient-to-b from-white/10 to-transparent sm:h-64">
                  <Image
                    src={p.imagem}
                    alt={`Embalagem do produto ${p.nome} da SustentAgro`}
                    fill
                    quality={80}
                    sizes="(max-width: 1024px) 90vw, 460px"
                    className="object-contain p-6"
                  />
                  <figcaption className="absolute bottom-2 right-3 text-legenda text-white/40">
                    {site.legendaImagem}
                  </figcaption>
                </figure>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <span className="font-display text-sm font-600 text-neon">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-600 leading-snug text-white sm:text-2xl">
                    {p.nome}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">{p.descricao}</p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.destaques.map((d) => (
                      <li
                        key={d}
                        className="rounded-full border border-white/15 px-3 py-1 text-legenda text-white/70"
                      >
                        {d}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={whatsappUrl(
                      `Olá! Vim pelo site da SustentAgro e quero saber mais sobre: ${p.nome}.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="alvo-toque mt-auto inline-flex items-center gap-2 pt-6 text-sm font-600 text-neon transition-colors hover:text-white"
                  >
                    Pedir orçamento
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Barra de progresso do scroll horizontal */}
        <div className="container-marca hidden lg:block lg:pb-16 lg:pt-10">
          <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
            <span
              ref={barraRef}
              className="block h-full w-full origin-left scale-x-0 rounded-full bg-neon"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
