"use client";

import Link from "next/link";
import { createContext, useContext, useRef, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { useMovimentoReduzido } from "@/lib/movimento";

/* ================================================================
   PEÇAS DE INTERFACE REUTILIZÁVEIS
   ================================================================ */

/* ---------------------------------------------------------------
   TEMA DA SEÇÃO
   A página alterna faixas escuras e claras. Em vez de cada peça
   receber uma prop, a seção anuncia o tema e quem precisa consulta.
   O provedor é um componente de cliente, então funciona mesmo com
   seções renderizadas no servidor entre ele e quem consome.
----------------------------------------------------------------*/
export type Tema = "escuro" | "claro";
const TemaCtx = createContext<Tema>("escuro");
export const useTema = () => useContext(TemaCtx);

/* ---------------------------------------------------------------
   Cartão de vidro com holofote que segue o ponteiro.
   O efeito é escrito em variáveis CSS, então não re-renderiza React.
----------------------------------------------------------------*/
export function Cartao({
  children,
  className = "",
  as: Tag = "div",
  testid,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
  testid?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const tema = useTema();

  const mover = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--holofote-x", `${e.clientX - r.left}px`);
    el.style.setProperty("--holofote-y", `${e.clientY - r.top}px`);
    el.style.setProperty("--holofote-op", "1");
  };
  const sair = () => ref.current?.style.setProperty("--holofote-op", "0");

  // no claro o vidro não funciona: a superfície é branca com sombra baixa
  const base =
    tema === "claro"
      ? "relative overflow-hidden rounded-marca bg-white/85 ring-1 ring-verde-950/[0.07] shadow-[0_22px_50px_-30px_rgba(5,31,32,0.35)] "
      : "vidro borda-luz holofote relative overflow-hidden rounded-marca ";

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement & HTMLLIElement>}
      data-testid={testid}
      onMouseMove={tema === "claro" ? undefined : mover}
      onMouseLeave={tema === "claro" ? undefined : sair}
      className={base + className}
    >
      {children}
    </Tag>
  );
}

/* ---------------------------------------------------------------
   Botões
----------------------------------------------------------------*/
const seta = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M5 12h14m0 0-6-6m6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Botão principal. No desktop ele se inclina de leve na direção do ponteiro. */
export function BotaoPrincipal({
  href,
  children,
  externo = false,
  className = "",
  comSeta = true,
}: {
  href: string;
  children: ReactNode;
  externo?: boolean;
  className?: string;
  comSeta?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduzir = useMovimentoReduzido();

  const mover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduzir) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
    const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
    el.style.transform = `translate3d(${dx * 6}px, ${dy * 5}px, 0)`;
  };
  const sair = () => {
    if (ref.current) ref.current.style.transform = "translate3d(0,0,0)";
  };

  const classe =
    "botao-luz alvo-toque inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-4 text-[0.95rem] font-600 " +
    className;
  const conteudo = (
    <>
      {children}
      {comSeta ? seta : null}
    </>
  );

  if (externo) {
    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={mover}
        onMouseLeave={sair}
        className={classe}
      >
        {conteudo}
      </a>
    );
  }
  return (
    <Link ref={ref} href={href} onMouseMove={mover} onMouseLeave={sair} className={classe}>
      {conteudo}
    </Link>
  );
}

export function BotaoVidro({
  href,
  children,
  externo = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  externo?: boolean;
  className?: string;
}) {
  const classe =
    "botao-vidro alvo-toque inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-4 text-[0.95rem] font-500 " +
    className;
  if (externo) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classe}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classe}>
      {children}
    </Link>
  );
}

/* ---------------------------------------------------------------
   Rótulo de seção, com ponto pulsante
----------------------------------------------------------------*/
export function Rotulo({ children, className = "" }: { children: ReactNode; className?: string }) {
  const tema = useTema();
  const cor = tema === "claro" ? "text-verde-600" : "text-destaque";
  const ponto = tema === "claro" ? "bg-verde-600" : "bg-destaque";
  return (
    <p className={"flex items-center gap-2.5 " + className}>
      <span aria-hidden="true" className={`ponto-vivo h-1.5 w-1.5 rounded-full ${ponto}`} />
      <span className={`rotulo ${cor}`}>{children}</span>
    </p>
  );
}

/* ---------------------------------------------------------------
   Título revelado palavra a palavra
----------------------------------------------------------------*/
const containerVariants: Variants = {
  escondido: {},
  visivel: { transition: { staggerChildren: 0.045 } },
};
const palavraVariants: Variants = {
  escondido: { y: "110%", opacity: 0 },
  visivel: { y: "0%", opacity: 1, transition: { duration: 0.66, ease: [0.22, 1, 0.36, 1] } },
};

export function Titulo({
  texto,
  destaque = [],
  as: Tag = "h2",
  className = "",
  id,
}: {
  texto: string;
  destaque?: string[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  id?: string;
}) {
  const reduzir = useMovimentoReduzido();
  const palavras = texto.split(" ");
  const limpar = (p: string) => p.replace(/[.,:;!?]/g, "").toLowerCase();
  const marcadas = new Set(destaque.map(limpar));

  if (reduzir) {
    return (
      <Tag id={id} className={className}>
        {palavras.map((p, i) => (
          <span key={i} className={marcadas.has(limpar(p)) ? "texto-destaque" : undefined}>
            {p}
            {i < palavras.length - 1 ? " " : ""}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag id={id} className={className}>
      <span className="sr-only">{texto}</span>
      <motion.span
        aria-hidden="true"
        className="inline"
        variants={containerVariants}
        initial="escondido"
        whileInView="visivel"
        viewport={{ once: true, amount: 0.15, margin: "0px 0px -10% 0px" }}
      >
        {palavras.map((palavra, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              variants={palavraVariants}
              className={
                "inline-block " + (marcadas.has(limpar(palavra)) ? "texto-destaque" : "")
              }
            >
              {palavra}
            </motion.span>
            {i < palavras.length - 1 ? <span>&nbsp;</span> : null}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/** Entrada suave de blocos de conteúdo. */
export function Surge({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduzir = useMovimentoReduzido();
  if (reduzir) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------------------------------------------
   Casca padrão de seção.

   `tema="claro"` pinta a faixa clara e troca sozinho a cor do texto
   e do destaque. O corte com a faixa escura é reto: a única passagem
   em degradê do site é a da hero para a seção seguinte.

   `luz` acende um brilho verde atrás do conteúdo. Como ele vive na
   própria seção, a luz acompanha a rolagem em vez de ficar presa
   à tela.
----------------------------------------------------------------*/
/**
 * Fundo da faixa clara. O degradê é interno e começa e termina na MESMA cor,
 * por dois motivos: o corte com a faixa escura é reto, sem passagem, e duas
 * faixas claras seguidas encostam sem deixar risco na junção.
 */
const FUNDO_CLARO =
  "bg-[linear-gradient(180deg,var(--color-nevoa)_0%,#ffffff_50%,var(--color-nevoa)_100%)]";

export function Secao({
  id,
  children,
  className = "",
  rotulada,
  tema = "escuro",
  luz,
  espaco = "padrao",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  rotulada?: string;
  tema?: Tema;
  luz?: "esquerda" | "direita" | "centro";
  /**
   * Espaçamento vertical. "curto" para faixas com muitas seções seguidas e
   * "sem-topo" quando a seção anterior já deixou respiro suficiente. Evita
   * precisar de `!important` para vencer o padding padrão.
   */
  espaco?: "padrao" | "curto" | "sem-topo";
}) {
  const alturas = {
    padrao: "py-24 sm:py-32 lg:py-36",
    curto: "py-20 sm:py-24 lg:py-28",
    "sem-topo": "pb-24 pt-0 sm:pb-32 lg:pb-36",
  } as const;

  const posicaoLuz =
    luz === "esquerda"
      ? "-left-[22%] top-[6%]"
      : luz === "direita"
        ? "-right-[22%] top-[14%]"
        : "left-1/2 top-[8%] -translate-x-1/2";

  return (
    <TemaCtx.Provider value={tema}>
      <section
        id={id}
        aria-labelledby={rotulada}
        data-tema={tema}
        className={
          `relative isolate ${alturas[espaco]} ` +
          // a mancha de luz é maior que a seção de propósito, então precisa de
          // recorte horizontal, senão ela empurra a largura da página. É
          // `overflow-x-clip` e não `overflow-hidden` porque este último
          // quebraria o `position: sticky` de qualquer filho.
          (luz ? "overflow-x-clip " : "") +
          (tema === "claro" ? "claro " : "") +
          className
        }
      >
        {tema === "claro" ? (
          /* corte reto com a faixa escura: a única passagem em degradê do site
             é a da hero para a seção seguinte */
          <div aria-hidden="true" className={"absolute inset-0 -z-10 " + FUNDO_CLARO} />
        ) : luz ? (
          <div
            aria-hidden="true"
            className={`aurora pointer-events-none absolute -z-10 h-[52vh] w-[64vw] opacity-40 ${posicaoLuz}`}
            style={{ background: "radial-gradient(circle, #235347 0%, transparent 68%)" }}
          />
        ) : null}

        <div className="container-marca">{children}</div>
      </section>
    </TemaCtx.Provider>
  );
}
