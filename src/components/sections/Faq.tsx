import Accordion from "@/components/Accordion";
import RevealText, { FadeUp } from "@/components/RevealText";
import { faq } from "@/lib/conteudo";
import { whatsappUrl } from "@/lib/site";

export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-titulo" className="bg-off py-20 sm:py-28">
      <div className="container-marca grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <p className="text-legenda font-600 uppercase tracking-wider text-verde-500">
            Perguntas e respostas
          </p>
          <RevealText
            id="faq-titulo"
            texto="Dúvidas frequentes sobre o substrato"
            destaque={["substrato"]}
            className="mt-4 font-display text-3xl font-700 leading-[1.12] text-verde-900 sm:text-4xl"
          />
          <FadeUp delay={0.1}>
            <p className="mt-5 text-base leading-relaxed text-tinta-suave">
              Não achou o que procurava? Chame a gente no WhatsApp e a equipe técnica responde.
            </p>
            <a
              href={whatsappUrl("Olá! Tenho uma dúvida técnica sobre os substratos da SustentAgro.")}
              target="_blank"
              rel="noopener noreferrer"
              className="alvo-toque mt-5 inline-flex items-center gap-2 rounded-full border border-verde-500 px-6 py-3 text-sm font-600 text-verde-600 transition-colors hover:bg-verde-500 hover:text-white"
            >
              Tirar uma dúvida
            </a>
          </FadeUp>
        </div>

        <FadeUp delay={0.08}>
          <Accordion itens={faq} />
        </FadeUp>
      </div>
    </section>
  );
}
