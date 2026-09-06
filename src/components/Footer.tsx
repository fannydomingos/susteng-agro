import Image from "next/image";
import Link from "next/link";
import { navLinks, site, whatsappUrl } from "@/lib/site";

export default function Footer() {
  const ano = new Date().getFullYear();
  return (
    <footer className="bg-verde-950 text-white">
      <div className="container-marca grid gap-12 py-14 sm:py-20 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Image
            src="/images/logo-sustentagro-branca.png"
            alt={site.nome}
            width={160}
            height={54}
            quality={90}
            sizes="160px"
            className="h-10 w-auto object-contain object-left"
          />
          <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-white/70">
            {site.descricao}
          </p>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="alvo-toque mt-6 inline-flex items-center gap-2 rounded-full bg-verde-500 px-6 py-3 text-sm font-600 text-white transition-colors hover:bg-verde-400"
          >
            Falar no WhatsApp
          </a>
        </div>

        <nav aria-label="Rodapé">
          <h2 className="font-display text-sm font-600 uppercase tracking-wider text-neon">
            Navegação
          </h2>
          <ul className="mt-5 space-y-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="alvo-toque inline-flex items-center py-2.5 text-[0.95rem] text-white/70 transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-sm font-600 uppercase tracking-wider text-neon">
            Contato
          </h2>
          <ul className="mt-5 space-y-3 text-[0.95rem] text-white/70">
            {site.telefones.map((t) => (
              <li key={t.numero}>
                <a
                  href={whatsappUrl(site.whatsapp.mensagem, t.numero)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="alvo-toque inline-flex flex-col py-2 transition-colors hover:text-white"
                >
                  <span className="text-white">{t.exibicao}</span>
                  <span className="text-legenda text-white/50">
                    {t.nome} · {t.cargo}
                  </span>
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${site.email}`}
                className="alvo-toque inline-flex items-center py-2.5 transition-colors hover:text-white"
              >
                Envie um e-mail
              </a>
            </li>
            <li>
              <a
                href={site.redes.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="alvo-toque inline-flex items-center py-2.5 transition-colors hover:text-white"
              >
                Instagram
              </a>
            </li>
            <li className="pt-2">
              <a
                href={site.endereco.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="not-italic leading-relaxed transition-colors hover:text-white"
              >
                {site.endereco.linha1}
                <br />
                {site.endereco.linha2} — CEP {site.endereco.cep}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-marca flex flex-col gap-2 py-6 text-legenda text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Copyright © {ano} {site.nome} | Powered by {site.nome}
          </p>
          <p>
            Desenvolvido por{" "}
            <a
              href={`https://wa.me/${site.desenvolvidoPor.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[40px] items-center px-1 font-600 text-white/80 underline decoration-verde-500 underline-offset-4 transition-colors hover:text-neon"
            >
              {site.desenvolvidoPor.nome}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
