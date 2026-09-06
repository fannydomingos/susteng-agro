"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { navLinks, site, whatsappUrl } from "@/lib/site";

export default function Header() {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);
  const reduzir = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-full focus:bg-verde-500 focus:px-5 focus:py-3 focus:text-sm focus:font-600 focus:text-white"
      >
        Pular para o conteúdo
      </a>

      <header
        data-testid="header"
        className={
          "fixed inset-x-0 top-0 z-[100] transition-all duration-300 " +
          (rolou || aberto
            ? "border-b border-white/10 bg-verde-950/92 backdrop-blur-xl"
            : "bg-gradient-to-b from-verde-950/70 to-transparent")
        }
      >
        <div className="container-marca flex h-16 items-center justify-between gap-4 sm:h-20">
          <Link
            href="/"
            aria-label={`${site.nome} — página inicial`}
            className="alvo-toque relative flex h-11 w-[124px] shrink-0 items-center sm:w-[140px]"
            onClick={() => setAberto(false)}
          >
            <Image
              src="/images/logo-sustentagro-branca.png"
              alt={site.nome}
              width={140}
              height={48}
              priority
              quality={90}
              sizes="140px"
              className="h-8 w-auto object-contain object-left sm:h-9"
            />
          </Link>

          {/* Navegação desktop */}
          <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="alvo-toque flex items-center rounded-full px-3 py-3 text-sm font-500 text-white/80 transition-colors hover:bg-white/10 hover:text-white xl:px-4"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="alvo-toque hidden items-center gap-2 rounded-full bg-verde-500 px-5 py-2.5 text-sm font-600 text-white transition-colors hover:bg-verde-400 md:inline-flex"
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
              className="alvo-toque grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 lg:hidden"
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
      </header>

      {/* Menu mobile */}
      <AnimatePresence>
        {aberto && (
          <motion.div
            key="menu-mobile"
            id="menu-mobile"
            data-testid="menu-mobile"
            className="fixed inset-0 z-[95] flex flex-col bg-verde-950 pt-16 sm:pt-20 lg:hidden"
            initial={reduzir ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduzir ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Menu" className="container-marca flex-1 overflow-y-auto py-6">
              <ul className="flex flex-col">
                {navLinks.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={reduzir ? false : { opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.35 }}
                    className="border-b border-white/10"
                  >
                    <Link
                      href={l.href}
                      data-testid="menu-mobile-link"
                      onClick={() => setAberto(false)}
                      className="alvo-toque flex items-center py-4 font-display text-2xl font-600 text-white"
                    >
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setAberto(false)}
                className="alvo-toque mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-verde-500 px-6 py-4 font-600 text-white"
              >
                Falar no WhatsApp
              </a>

              <p className="mt-6 text-sm text-white/60">
                {site.telefones[0].exibicao} · {site.telefones[1].exibicao}
              </p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
