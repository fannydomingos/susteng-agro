"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { navLinks, site, whatsappUrl } from "@/lib/site";
import { useMovimentoReduzido } from "@/lib/movimento";

/**
 * Cabeçalho fixo com barra de progresso do scroll.
 * Os links da landing page são âncoras; artigos e galeria são páginas.
 * Fora da home, as âncoras viram links absolutos para a home.
 */
export default function Header() {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);
  const [ativo, setAtivo] = useState<string>("");
  const reduzir = useMovimentoReduzido();
  const rota = usePathname();
  const naHome = rota === "/";

  const { scrollYProgress } = useScroll();
  const progresso = useSpring(scrollYProgress, { stiffness: 180, damping: 40, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* marca no menu a seção que está na tela */
  useEffect(() => {
    if (!naHome) return;
    const ids = navLinks.filter((l) => l.href.startsWith("/#")).map((l) => l.href.slice(2));
    const secoes = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!secoes.length) return;
    const obs = new IntersectionObserver(
      (entradas) => {
        const visiveis = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visiveis[0]) setAtivo(visiveis[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.6, 1] },
    );
    secoes.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [naHome]);

  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [aberto]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-full focus:bg-destaque focus:px-5 focus:py-3 focus:text-sm focus:font-600 focus:text-verde-950"
      >
        Pular para o conteúdo
      </a>

      <header
        data-testid="header"
        className={
          "fixed inset-x-0 top-0 z-[100] transition-all duration-500 " +
          (rolou || aberto
            ? "border-b border-menta/10 bg-abismo/80 backdrop-blur-xl"
            : "border-b border-transparent")
        }
      >
        <div className="container-marca flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
          <Link
            href="/"
            aria-label={`${site.nome}, página inicial`}
            className="alvo-toque relative flex h-11 w-[124px] shrink-0 items-center sm:w-[136px]"
            onClick={() => setAberto(false)}
          >
            <Image
              src="/images/logo-sustentagro-branca.png"
              alt={site.nome}
              width={136}
              height={46}
              priority
              quality={90}
              sizes="136px"
              className="h-[1.9rem] w-auto object-contain object-left sm:h-8"
            />
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((l) => {
              const id = l.href.startsWith("/#") ? l.href.slice(2) : "";
              /**
               * Página tem prioridade sobre âncora. Na home, "Início" fica
               * marcado enquanto nenhuma seção listada no menu está na tela;
               * quando uma entra, a marca passa para ela. Hoje o menu só tem
               * páginas, então na prática vale a comparação de rota, mas isso
               * continua valendo se uma âncora voltar ao menu.
               */
              const marcado = id
                ? naHome && ativo === id
                : rota === l.href && (l.href !== "/" || !ativo);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={
                    "alvo-toque relative flex items-center whitespace-nowrap rounded-full px-3.5 py-3 text-sm font-500 transition-colors " +
                    (marcado ? "text-destaque" : "text-menta/60 hover:text-menta")
                  }
                >
                  {l.label}
                  {marcado ? (
                    <motion.span
                      layoutId="marcador-menu"
                      className="absolute inset-0 -z-10 rounded-full bg-destaque/10 ring-1 ring-inset ring-destaque/25"
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="botao-luz alvo-toque hidden items-center whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-600 md:inline-flex"
            >
              Falar no WhatsApp
            </a>

            <button
              type="button"
              data-testid="menu-toggle"
              aria-expanded={aberto}
              aria-controls="menu-mobile"
              aria-label={aberto ? "Fechar menu" : "Abrir menu"}
              onClick={() => setAberto((v) => !v)}
              className="botao-vidro alvo-toque grid h-11 w-11 place-items-center rounded-full lg:hidden"
            >
              <span className="relative block h-4 w-5" aria-hidden="true">
                <span
                  className={
                    "absolute left-0 block h-0.5 w-5 rounded bg-current transition-all duration-300 " +
                    (aberto ? "top-1.5 rotate-45" : "top-0")
                  }
                />
                <span
                  className={
                    "absolute left-0 top-1.5 block h-0.5 w-5 rounded bg-current transition-all duration-200 " +
                    (aberto ? "opacity-0" : "opacity-100")
                  }
                />
                <span
                  className={
                    "absolute left-0 block h-0.5 w-5 rounded bg-current transition-all duration-300 " +
                    (aberto ? "top-1.5 -rotate-45" : "top-3")
                  }
                />
              </span>
            </button>
          </div>
        </div>

        {/* progresso da leitura */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: reduzir ? 0 : progresso }}
          className="h-px origin-left bg-gradient-to-r from-destaque via-sage to-transparent"
        />
      </header>

      <AnimatePresence>
        {aberto && (
          <motion.div
            key="menu-mobile"
            id="menu-mobile"
            data-testid="menu-mobile"
            className="fixed inset-0 z-[95] flex flex-col bg-abismo/96 pt-16 backdrop-blur-2xl sm:pt-[4.5rem] lg:hidden"
            initial={reduzir ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduzir ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Menu" className="container-marca flex-1 overflow-y-auto py-6">
              <ul className="flex flex-col">
                {navLinks.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={reduzir ? false : { opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 + i * 0.04, duration: 0.35 }}
                    className="border-b border-menta/10"
                  >
                    <Link
                      href={l.href}
                      data-testid="menu-mobile-link"
                      onClick={() => setAberto(false)}
                      className="alvo-toque flex items-center justify-between py-4 font-display text-2xl font-500 text-menta"
                    >
                      {l.label}
                      <span aria-hidden="true" className="rotulo text-menta/25">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setAberto(false)}
                className="botao-luz alvo-toque mt-8 flex w-full items-center justify-center rounded-full px-6 py-4 font-600"
              >
                Falar no WhatsApp
              </a>

              <p className="mt-6 text-sm text-menta/45">
                {site.telefones.map((t) => t.exibicao).join("  ·  ")}
              </p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
