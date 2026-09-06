"use client";

import { useState } from "react";
import { site, whatsappUrl } from "@/lib/site";
import RevealText, { FadeUp } from "@/components/RevealText";

/**
 * Formulário sem back-end: monta a mensagem e abre o WhatsApp.
 * Para trocar por envio de e-mail/API, veja o README (seção "Formulário de contato").
 */
export default function Contato() {
  const [enviando, setEnviando] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnviando(true);
    const dados = new FormData(e.currentTarget);
    const texto = [
      `Olá! Vim pelo site da SustentAgro.`,
      ``,
      `Nome: ${dados.get("nome")}`,
      `Cidade/UF: ${dados.get("cidade")}`,
      `Cultivo: ${dados.get("cultivo")}`,
      `Volume estimado: ${dados.get("volume") || "não informado"}`,
      ``,
      `${dados.get("mensagem")}`,
    ].join("\n");
    window.open(whatsappUrl(texto), "_blank", "noopener,noreferrer");
    setEnviando(false);
  }

  const campo =
    "alvo-toque w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-base text-white placeholder:text-white/35 transition-colors focus:border-neon focus:bg-white/10";

  return (
    <section id="contato" aria-labelledby="contato-titulo" className="bg-verde-950 py-20 sm:py-28">
      <div className="container-marca grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="text-legenda font-600 uppercase tracking-wider text-neon">
            Entre em contato
          </p>
          <RevealText
            id="contato-titulo"
            texto="Conte qual é o seu cultivo e a gente formula o substrato"
            destaque={["formula"]}
            className="mt-4 font-display text-3xl font-700 leading-[1.12] text-white sm:text-4xl lg:text-5xl"
          />

          <FadeUp delay={0.1}>
            <dl className="mt-10 space-y-6">
              <div>
                <dt className="text-legenda font-600 uppercase tracking-wider text-white/45">
                  WhatsApp
                </dt>
                <dd className="mt-2 space-y-1.5">
                  {site.telefones.map((t) => (
                    <a
                      key={t.numero}
                      href={whatsappUrl(site.whatsapp.mensagem, t.numero)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="alvo-toque flex items-baseline gap-2 font-display text-lg font-600 text-white transition-colors hover:text-neon"
                    >
                      {t.exibicao}
                      <span className="text-legenda font-400 text-white/45">{t.nome}</span>
                    </a>
                  ))}
                </dd>
              </div>

              <div>
                <dt className="text-legenda font-600 uppercase tracking-wider text-white/45">
                  E-mail
                </dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${site.email}`}
                    className="alvo-toque inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-600 text-white transition-colors hover:border-neon hover:text-neon"
                  >
                    Envie um e-mail
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-legenda font-600 uppercase tracking-wider text-white/45">
                  Instagram
                </dt>
                <dd className="mt-2">
                  <a
                    href={site.redes.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="alvo-toque inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-600 text-white transition-colors hover:border-neon hover:text-neon"
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
                      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
                      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
                    </svg>
                    Seguir no Instagram
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-legenda font-600 uppercase tracking-wider text-white/45">
                  Endereço
                </dt>
                <dd className="mt-2">
                  <a
                    href={site.endereco.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.95rem] leading-relaxed text-white/70 transition-colors hover:text-white"
                  >
                    {site.endereco.linha1}
                    <br />
                    {site.endereco.linha2} — CEP {site.endereco.cep}
                  </a>
                </dd>
              </div>
            </dl>
          </FadeUp>
        </div>

        <FadeUp delay={0.12}>
          <form
            onSubmit={onSubmit}
            data-testid="form-contato"
            className="rounded-marca border border-white/12 bg-white/[0.035] p-6 sm:p-8"
          >
            <h3 className="font-display text-xl font-600 text-white">Peça um orçamento</h3>
            <p className="mt-1.5 text-sm text-white/55">
              Preencha e a gente abre a conversa no WhatsApp já com os seus dados.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="nome" className="mb-1.5 block text-sm font-500 text-white/80">
                  Nome *
                </label>
                <input id="nome" name="nome" type="text" required autoComplete="name" className={campo} placeholder="Seu nome" />
              </div>

              <div>
                <label htmlFor="cidade" className="mb-1.5 block text-sm font-500 text-white/80">
                  Cidade / UF *
                </label>
                <input id="cidade" name="cidade" type="text" required className={campo} placeholder="Brasília / DF" />
              </div>

              <div>
                <label htmlFor="cultivo" className="mb-1.5 block text-sm font-500 text-white/80">
                  Cultivo *
                </label>
                <input id="cultivo" name="cultivo" type="text" required className={campo} placeholder="Morango, mudas, hortaliças..." />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="volume" className="mb-1.5 block text-sm font-500 text-white/80">
                  Volume estimado
                </label>
                <input id="volume" name="volume" type="text" className={campo} placeholder="Ex.: 20 sacos de 100 L por mês" />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="mensagem" className="mb-1.5 block text-sm font-500 text-white/80">
                  Mensagem *
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  required
                  rows={4}
                  className={campo + " resize-y"}
                  placeholder="Conte o que você precisa"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={enviando}
              className="alvo-toque mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-neon px-6 py-4 text-base font-700 text-verde-950 transition-colors hover:bg-lima disabled:opacity-60"
            >
              Enviar pelo WhatsApp
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <p className="mt-3 text-legenda text-white/40">
              Ao enviar, abrimos o WhatsApp {site.whatsapp.exibicao} com a mensagem pronta.
            </p>
          </form>
        </FadeUp>
      </div>
    </section>
  );
}
