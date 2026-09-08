import Image from "next/image";
import Link from "next/link";
import { navLinks, site, whatsappUrl } from "@/lib/site";

export default function Footer() {
  const ano = new Date().getFullYear();
  return (
    <footer className="relative border-t border-menta/10">
      <div className="container-marca grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Image
            src="/images/logo-sustentagro-branca.png"
            alt={site.nome}
            width={150}
            height={50}
            quality={90}
            sizes="150px"
            className="h-9 w-auto object-contain object-left"
          />
          <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-menta/50">
            {site.descricao}
          </p>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="botao-luz alvo-toque mt-7 inline-flex items-center rounded-full px-6 py-3 text-sm font-600"
          >
            Falar no WhatsApp
          </a>
        </div>

        <nav aria-label="Rodapé">
          <h2 className="rotulo text-destaque">Navegação</h2>
          <ul className="mt-6 space-y-0.5">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="alvo-toque inline-flex items-center py-2.5 text-[0.95rem] text-menta/55 transition-colors hover:text-destaque"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="rotulo text-destaque">Contato</h2>
          <ul className="mt-6 space-y-3 text-[0.95rem] text-menta/55">
            {site.telefones.map((t) => (
              <li key={t.numero}>
                <a
                  href={whatsappUrl(site.whatsapp.mensagem, t.numero)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="alvo-toque inline-flex flex-col py-2 transition-colors hover:text-destaque"
                >
                  <span className="text-menta">{t.exibicao}</span>
                  <span className="text-legenda text-menta/35">
                    {t.nome} · {t.cargo}
                  </span>
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${site.email}`}
                className="alvo-toque inline-flex items-center py-2.5 transition-colors hover:text-destaque"
              >
                Enviar e-mail
              </a>
            </li>
            <li>
              <a
                href={site.redes.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="alvo-toque inline-flex items-center py-2.5 transition-colors hover:text-destaque"
              >
                Instagram
              </a>
            </li>
            <li className="pt-2">
              <a
                href={site.endereco.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="alvo-toque inline-block py-2 text-sm leading-relaxed transition-colors hover:text-destaque"
              >
                {site.endereco.linha1}
                <br />
                {site.endereco.linha2}, CEP {site.endereco.cep}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-menta/10">
        <div className="container-marca flex flex-col gap-2 py-6 text-legenda text-menta/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Copyright © {ano} {site.nome} | Powered by {site.nome}
          </p>
          <p>
            Desenvolvido por{" "}
            <a
              href={`https://wa.me/${site.desenvolvidoPor.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[40px] items-center px-1 font-600 text-menta/70 underline decoration-destaque/60 underline-offset-4 transition-colors hover:text-destaque"
            >
              {site.desenvolvidoPor.nome}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
