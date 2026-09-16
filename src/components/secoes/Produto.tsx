"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BotaoPrincipal, BotaoVidro, Rotulo, Secao } from "@/components/ui";
import { Icone } from "@/components/Icones";
import { beneficiosProduto, marcadoresProduto } from "@/lib/conteudo";
import { usePodeAnimar } from "@/lib/movimento";
import { whatsappUrl } from "@/lib/site";

/**
 * SEÇÃO DE PRODUTO
 * A linha completa mora em /produtos. Aqui entra apenas a embalagem de fibra,
 * que é o produto de entrada, com as duas ações: ver a linha inteira e pedir
 * orçamento.
 */
export default function Produto() {
  const ref = useRef<HTMLDivElement>(null);
  const animar = usePodeAnimar();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const ySaco = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <Secao id="produtos" rotulada="produtos-titulo" luz="direita">
      {/*
        No celular a embalagem vem primeiro: é ela que diz do que a seção
        trata. No computador o texto volta para a esquerda, com `order`, para
        a leitura começar pelo título.
      */}
      <div
        ref={ref}
        className="grid items-center gap-12 sm:gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12"
      >
        {/* ------------------------------- texto */}
        <div className="order-2 lg:order-1">
          <Rotulo>Nossos produtos</Rotulo>

          <h2
            id="produtos-titulo"
            className="mt-7 font-display text-[2.4rem] font-600 leading-[1] tracking-tight sm:text-5xl lg:text-[4rem]"
          >
            <span className="texto-luz">Tecnologia agrícola</span>
            <br />
            <span className="texto-destaque">a partir do resíduo</span>
          </h2>

          <p className="mt-7 max-w-lg text-base leading-relaxed text-menta/65 sm:text-lg">
            A SustentAgro converte a casca do coco verde descartada em substrato de alto
            desempenho, com lote rastreado e ficha técnica agronômica. A linha tem quatro
            formatos, que se diferenciam pela granulometria e pela proporção entre fibra e pó.
          </p>

          {/*
            Benefícios logo abaixo do texto: quem chega pela página inicial
            precisa saber o que ganha antes de decidir abrir a linha completa.
            Duas colunas no computador, uma no celular, sem caixa em volta. O
            ícone é decorativo, então fica com `aria-hidden` dentro do próprio
            SVG e quem lê por leitor de tela ouve só o título e o texto.
          */}
          <ul className="mt-10 grid max-w-lg gap-x-8 gap-y-6 sm:grid-cols-2">
            {beneficiosProduto.map((b) => (
              <li key={b.titulo} className="flex gap-3.5">
                <Icone nome={b.icone} className="mt-0.5 h-5 w-5 shrink-0 text-destaque" />
                <div>
                  <h3 className="font-display text-[0.95rem] font-600 leading-snug text-menta">
                    {b.titulo}
                  </h3>
                  <p className="mt-1 text-legenda leading-relaxed text-menta/50">{b.texto}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-11 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BotaoPrincipal href="/produtos">Ver todos os produtos</BotaoPrincipal>
            <BotaoVidro href={whatsappUrl()} externo>
              Solicitar orçamento
            </BotaoVidro>
          </div>

          {/*
            Marcadores em linha, separados por régua em vez de caixas. Cada
            número traz o que significa: empilhados no celular, porque com a
            linha de explicação três colunas ficavam ilegíveis em 320px.
          */}
          <dl className="mt-14 grid max-w-lg gap-x-6 gap-y-6 pt-7 sm:grid-cols-3">
            <div aria-hidden="true" className="regua -mt-7 mb-1 sm:col-span-3 sm:mb-7" />
            {marcadoresProduto.map((m) => (
              <div key={m.rotulo}>
                <dt className="sr-only">{m.rotulo}</dt>
                <dd>
                  <span className="block font-display text-2xl font-600 text-menta sm:text-3xl">
                    {m.valor}
                  </span>
                  <span className="mt-1 block text-legenda leading-snug text-menta/60">
                    {m.rotulo}
                  </span>
                  <span className="mt-2 block text-legenda leading-relaxed text-menta/40">
                    {m.detalhe}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ------------------------------- embalagem */}
        <div className="relative order-1 mx-auto h-[42svh] w-full max-w-md lg:order-2 lg:h-[62vh] lg:max-w-none">
          <motion.div className="relative h-full w-full" style={animar ? { y: ySaco } : undefined}>
            {/* halo */}
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[76%] w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[70px]"
              style={{ background: "radial-gradient(circle, rgba(182,255,137,0.3), transparent 66%)" }}
            />
            {/* anéis de dados atrás do produto */}
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[86%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-menta/10"
            />
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[66%] w-[66%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-destaque/20"
            />
            <Image
              src="/images/produto-fibra.png"
              alt="Embalagem do substrato de fibra de coco da SustentAgro"
              fill
              quality={90}
              sizes="(max-width: 1024px) 70vw, 42vw"
              className="object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)]"
            />
          </motion.div>

          {/*
            Etiquetas técnicas flutuantes. No celular elas são menores e mais
            coladas nas bordas: a embalagem ali é estreita, e no tamanho do
            computador as duas cobriam metade do saco.
          */}
          <div className="etiqueta borda-luz absolute bottom-2 left-0 z-10 rounded-lg px-3 py-2 sm:bottom-3 sm:left-2 sm:rounded-xl sm:px-4 sm:py-3">
            <p className="rotulo text-[0.625rem] text-menta/60 sm:text-[0.6875rem]">
              Granulometria
            </p>
            <p className="mt-0.5 font-display text-base font-600 text-menta sm:mt-1 sm:text-lg">
              5 a 25 mm
            </p>
          </div>
          <div className="etiqueta borda-luz absolute right-0 top-2 z-10 rounded-lg px-3 py-2 sm:right-2 sm:top-6 sm:rounded-xl sm:px-4 sm:py-3">
            <p className="rotulo text-[0.625rem] text-menta/60 sm:text-[0.6875rem]">Porosidade</p>
            <p className="mt-0.5 font-display text-base font-600 text-destaque sm:mt-1 sm:text-lg">
              acima de 85%
            </p>
          </div>

          <p className="absolute -bottom-7 right-0 text-legenda text-menta/30">
            imagem ilustrativa
          </p>
        </div>
      </div>
    </Secao>
  );
}
