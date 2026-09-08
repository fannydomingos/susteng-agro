"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { usePodeAnimar } from "@/lib/movimento";
import { produtos } from "@/lib/conteudo";
import { site, whatsappUrl } from "@/lib/site";

/**
 * TRILHO HORIZONTAL DE PRODUTOS
 *
 * No desktop os quatro formatos passam para o lado enquanto a pessoa rola.
 * A técnica é `position: sticky` mais um deslocamento em X ligado ao progresso
 * do scroll: a rolagem continua 1 para 1 com o gesto, o navegador não perde o
 * controle dela e a barra de rolagem continua dizendo a verdade. É por isso que
 * aqui não há "pin" de biblioteca nenhuma.
 *
 * Abaixo de 1024px o trilho vira uma pilha vertical comum. Sequestrar o gesto
 * de rolagem no celular é ruim, e o brief pedia justamente isso.
 */
export default function TrilhoProdutos() {
  const ref = useRef<HTMLDivElement>(null);
  const animar = usePodeAnimar();
  const total = produtos.length;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // amortece o valor para o arrasto não parecer travado quadro a quadro
  const progresso = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    mass: 0.25,
  });
  /**
   * O deslocamento termina em 82% do curso, não em 100%. Os 18% que sobram são
   * a pausa no último formato: sem eles o trilho descolava do topo no mesmo
   * instante em que o quarto produto chegava ao centro, e ninguém conseguia
   * ler o painel.
   */
  const FIM = 0.82;
  const x = useTransform(progresso, [0, FIM], ["0%", `-${(total - 1) * 100}%`], {
    clamp: true,
  });
  const larguraBarra = useTransform(progresso, [0, FIM], ["8%", "100%"], { clamp: true });

  return (
    <>
      {/* ---------------------------------------- desktop: trilho horizontal */}
      <div
        ref={ref}
        data-testid="trilho-produtos"
        className="relative hidden lg:block"
        // uma tela de curso por produto, mais meia tela de pausa no último
        style={{ height: `${total * 100 + 60}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div
            data-testid="trilho-fita"
            className="flex h-full"
            style={animar ? { x } : undefined}
          >
            {produtos.map((p, i) => (
              <Painel key={p.slug} produto={p} indice={i} total={total} />
            ))}
          </motion.div>

          {/* progresso do trilho, para a pessoa saber onde está */}
          <div className="pointer-events-none absolute inset-x-0 bottom-9 z-10">
            <div className="container-marca">
              <div className="flex items-center gap-5 lg:pr-24">
                <div className="h-px flex-1 bg-menta/15">
                  <motion.div
                    className="h-px bg-destaque"
                    style={animar ? { width: larguraBarra } : { width: "100%" }}
                  />
                </div>
                <p className="rotulo shrink-0 text-menta/40">
                  role para o lado
                  <span aria-hidden="true" className="ml-3 text-destaque">
                    &rarr;
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------- celular e tablet: pilha */}
      <div className="lg:hidden">
        {produtos.map((p, i) => (
          <section
            key={p.slug}
            id={`${p.slug}-mobile`}
            aria-labelledby={`${p.slug}-mobile-titulo`}
            className="border-b border-menta/10 py-16 last:border-b-0 sm:py-20"
          >
            <div className="container-marca">
              <Conteudo produto={p} indice={i} total={total} idTitulo={`${p.slug}-mobile-titulo`} />
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

/* ================================================================= */

type Produto = (typeof produtos)[number];

/** Um produto ocupando a tela inteira dentro do trilho. */
function Painel({ produto, indice, total }: { produto: Produto; indice: number; total: number }) {
  return (
    <section
      id={produto.slug}
      aria-labelledby={`${produto.slug}-titulo`}
      // o padding reserva o espaço do cabeçalho fixo em cima e da barra de
      // progresso embaixo, então o conteúdo centraliza no que sobra e nunca
      // fica escondido atrás de nenhum dos dois
      className="relative flex h-full w-screen shrink-0 items-center pb-28 pt-20"
    >
      {/* luz por trás, alternando de lado para os painéis não ficarem iguais */}
      <div
        aria-hidden="true"
        className={
          "aurora pointer-events-none absolute top-[10%] h-[54vh] w-[46vw] opacity-40 " +
          (indice % 2 === 0 ? "-left-[12%]" : "-right-[12%]")
        }
        style={{ background: "radial-gradient(circle, #235347 0%, transparent 68%)" }}
      />
      <div className="container-marca">
        <Conteudo
          produto={produto}
          indice={indice}
          total={total}
          idTitulo={`${produto.slug}-titulo`}
        />
      </div>
    </section>
  );
}

/**
 * Conteúdo de um produto. É o mesmo no trilho e na pilha, então a versão de
 * celular não fica devendo informação em relação à do computador.
 */
function Conteudo({
  produto,
  indice,
  total,
  idTitulo,
}: {
  produto: Produto;
  indice: number;
  total: number;
  idTitulo: string;
}) {
  // no espaço de uma tela cabem as quatro especificações que mais decidem a compra
  const especificacoes = produto.detalhe.especificacoes.slice(0, 4);

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
      {/* ------------------------------------------- embalagem */}
      <figure className="relative mx-auto w-full max-w-xs lg:max-w-none">
        <div className="relative h-[15rem] w-full sm:h-[19rem] lg:h-[58vh]">
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[60px]"
            style={{
              background: "radial-gradient(circle, rgba(182,255,137,0.24), transparent 66%)",
            }}
          />
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-[82%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-menta/10"
          />
          <Image
            src={produto.imagem}
            alt={`Embalagem do produto ${produto.nome}`}
            fill
            priority={indice === 0}
            quality={85}
            sizes="(max-width: 640px) 70vw, (max-width: 1024px) 45vw, 32vw"
            className="object-contain drop-shadow-[0_26px_40px_rgba(0,0,0,0.55)]"
          />
        </div>
        <figcaption className="mt-3 text-center text-legenda text-menta/30">
          {site.legendaImagem}
        </figcaption>
      </figure>

      {/* ------------------------------------------- texto */}
      <div>
        <p className="rotulo text-destaque">
          Formato {String(indice + 1).padStart(2, "0")}
          <span className="text-menta/25"> / {String(total).padStart(2, "0")}</span>
        </p>

        <h2
          id={idTitulo}
          className="mt-5 font-display text-[2rem] font-600 leading-[1.03] tracking-tight text-menta sm:text-5xl lg:text-[3.4rem]"
        >
          {produto.nome}
        </h2>
        <p className="mt-4 font-display text-lg font-500 text-destaque">
          {produto.detalhe.chamada}
        </p>

        <p className="mt-6 max-w-xl text-[0.98rem] leading-relaxed text-menta/65 lg:text-lg">
          {produto.detalhe.texto[0]}
        </p>

        {/* especificações em régua, lado a lado */}
        <dl className="mt-9 grid max-w-xl gap-x-12 sm:grid-cols-2">
          {especificacoes.map((e) => (
            <div
              key={e.parametro}
              className="flex items-baseline justify-between gap-4 border-b border-menta/12 py-3"
            >
              <dt className="min-w-0 text-sm text-menta/55">{e.parametro}</dt>
              <dd className="shrink-0 text-sm font-600 text-menta">{e.valor}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
          <a
            href={whatsappUrl(
              `Olá. Vim pelo site da SustentAgro e gostaria de um orçamento do produto ${produto.nome}.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="botao-luz alvo-toque inline-flex items-center gap-2.5 rounded-full px-7 py-4 text-[0.95rem] font-600"
          >
            Pedir orçamento
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 12h14m0 0-6-6m6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <p className="text-legenda text-menta/45">
            Volumes: {produto.detalhe.volumes.join(" · ")}
          </p>
        </div>
      </div>
    </div>
  );
}
