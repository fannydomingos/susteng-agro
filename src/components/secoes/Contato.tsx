"use client";

import { useState } from "react";
import { Cartao, Rotulo, Secao, Surge, Titulo } from "@/components/ui";
import { site, whatsappUrl } from "@/lib/site";

/**
 * Contato.
 * As dúvidas frequentes ficam na página de produtos, que é onde as perguntas
 * sobre granulometria, manejo e volume aparecem.
 * O formulário não usa back-end: monta a mensagem e abre o WhatsApp já
 * preenchido. Para receber por e-mail, veja o README.
 */
export default function Contato() {
  const [enviando, setEnviando] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnviando(true);
    const dados = new FormData(e.currentTarget);
    const texto = [
      "Olá. Vim pelo site da SustentAgro.",
      "",
      `Nome: ${dados.get("nome")}`,
      `Cidade/UF: ${dados.get("cidade")}`,
      `Cultivo: ${dados.get("cultivo")}`,
      `Volume estimado: ${dados.get("volume") || "não informado"}`,
      "",
      `${dados.get("mensagem")}`,
    ].join("\n");
    window.open(whatsappUrl(texto), "_blank", "noopener,noreferrer");
    setEnviando(false);
  }

  const campo =
    "alvo-toque w-full rounded-xl border border-menta/12 bg-menta/[0.04] px-4 py-3 text-base text-menta placeholder:text-menta/30 transition-colors focus:border-destaque/60 focus:bg-menta/[0.07]";

  return (
    <Secao id="contato" rotulada="contato-titulo" luz="esquerda">
      <div className="max-w-3xl">
        <Rotulo>Entre em contato</Rotulo>
        <Titulo
          id="contato-titulo"
          texto="Informe o seu cultivo e receba uma formulação adequada"
          destaque={["formulação"]}
          className="mt-6 font-display text-[2.2rem] font-600 leading-[1.03] tracking-tight sm:text-5xl"
        />
        <Surge delay={0.1}>
          <p className="mt-7 text-base leading-relaxed text-menta/60 sm:text-lg">
            Atendemos produtores no Distrito Federal, no Entorno e no Ceará, com envio para todo o
            Brasil. Desenvolvemos o substrato adequado à sua produção e enviamos amostra para teste
            antes do fechamento do volume.
          </p>
        </Surge>
      </div>

      <div className="mt-14 grid gap-12 sm:mt-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* --------------------------- dados, em lista com régua */}
        <div>
          <Surge>
            <p className="rotulo text-menta/40">WhatsApp</p>
            <ul className="mt-6 border-t border-menta/12">
              {site.telefones.map((t) => (
                <li key={t.numero}>
                  <a
                    href={whatsappUrl(site.whatsapp.mensagem, t.numero)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="alvo-toque group flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-menta/12 py-5 transition-colors"
                  >
                    <span className="font-display text-xl font-600 text-menta transition-colors group-hover:text-destaque sm:text-2xl">
                      {t.exibicao}
                    </span>
                    <span className="text-legenda text-menta/40">
                      {t.nome} · {t.cargo}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap gap-2.5">
              <a
                href={`mailto:${site.email}`}
                className="botao-vidro alvo-toque inline-flex items-center rounded-full px-5 py-2.5 text-sm font-500"
              >
                Enviar e-mail
              </a>
              <a
                href={site.redes.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="botao-vidro alvo-toque inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-500"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
                </svg>
                Instagram
              </a>
            </div>
          </Surge>

          <Surge delay={0.08}>
            <div className="mt-12">
              <p className="rotulo text-menta/40">Onde estamos</p>
              <a
                href={site.endereco.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="alvo-toque mt-6 block border-t border-menta/12 pt-5 font-display text-lg font-500 leading-snug text-menta transition-colors hover:text-destaque"
              >
                {site.endereco.linha1}
                <br />
                {site.endereco.linha2}, CEP {site.endereco.cep}
              </a>
              <dl className="mt-6 space-y-5">
                <div className="border-t border-menta/12 pt-5">
                  <dt className="text-legenda text-menta/40">Atendimento</dt>
                  <dd className="mt-1 text-sm text-menta/75">Segunda a sexta, 8h às 18h</dd>
                </div>
                <div className="border-t border-menta/12 pt-5">
                  <dt className="text-legenda text-menta/40">Área de atuação</dt>
                  <dd className="mt-1 text-sm text-menta/75">
                    Unidades no Distrito Federal, Entorno e Ceará, com envio para todo o Brasil
                  </dd>
                </div>
              </dl>
            </div>
          </Surge>
        </div>

        {/* --------------------------- formulário */}
        <Surge delay={0.12}>
          <Cartao className="h-full">
            <form onSubmit={onSubmit} data-testid="form-contato" className="p-7 sm:p-9">
              <h3 className="font-display text-xl font-600 text-menta">Solicitar orçamento</h3>
              <p className="mt-2 text-sm text-menta/50">
                Preencha os campos abaixo e a conversa será aberta no WhatsApp com os seus dados.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="nome" className="mb-2 block text-legenda text-menta/60">
                    Nome *
                  </label>
                  <input id="nome" name="nome" type="text" required autoComplete="name" className={campo} placeholder="Seu nome" />
                </div>
                <div>
                  <label htmlFor="cidade" className="mb-2 block text-legenda text-menta/60">
                    Cidade e estado *
                  </label>
                  <input id="cidade" name="cidade" type="text" required className={campo} placeholder="Brasília, DF" />
                </div>
                <div>
                  <label htmlFor="cultivo" className="mb-2 block text-legenda text-menta/60">
                    Cultivo *
                  </label>
                  <input id="cultivo" name="cultivo" type="text" required className={campo} placeholder="Morango, mudas, hortaliças" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="volume" className="mb-2 block text-legenda text-menta/60">
                    Volume estimado
                  </label>
                  <input id="volume" name="volume" type="text" className={campo} placeholder="20 sacos de 100 L por mês" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="mensagem" className="mb-2 block text-legenda text-menta/60">
                    Mensagem *
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    required
                    rows={4}
                    className={campo + " resize-y"}
                    placeholder="Descreva a sua necessidade"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={enviando}
                className="botao-luz alvo-toque mt-7 flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-4 text-[0.95rem] font-600 disabled:opacity-60"
              >
                Enviar pelo WhatsApp
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <p className="mt-3 text-legenda text-menta/35">
                Ao enviar, o WhatsApp {site.whatsapp.exibicao} será aberto com a mensagem preenchida.
              </p>
            </form>
          </Cartao>
        </Surge>
      </div>

    </Secao>
  );
}
