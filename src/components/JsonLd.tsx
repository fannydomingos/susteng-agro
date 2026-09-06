import { site } from "@/lib/site";
import { faq, produtos } from "@/lib/conteudo";

/** Dados estruturados (schema.org) da organização, dos produtos e do FAQ. */
export default function JsonLd() {
  const dados = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organizacao`,
        name: site.nome,
        url: site.url,
        logo: `${site.url}/images/logo-sustentagro.png`,
        description: site.descricao,
        email: site.email,
        sameAs: [site.redes.instagram],
        address: {
          "@type": "PostalAddress",
          streetAddress: site.endereco.linha1,
          addressLocality: site.endereco.cidade,
          addressRegion: site.endereco.estado,
          postalCode: site.endereco.cep,
          addressCountry: site.endereco.pais,
        },
        contactPoint: site.telefones.map((t) => ({
          "@type": "ContactPoint",
          telephone: `+${t.numero}`,
          contactType: "sales",
          name: t.nome,
          areaServed: "BR",
          availableLanguage: ["Portuguese"],
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#site`,
        url: site.url,
        name: site.nome,
        inLanguage: "pt-BR",
        publisher: { "@id": `${site.url}/#organizacao` },
      },
      ...produtos.map((p) => ({
        "@type": "Product",
        "@id": `${site.url}/#produto-${p.slug}`,
        name: p.nome,
        description: p.descricao,
        image: `${site.url}${p.imagem}`,
        brand: { "@type": "Brand", name: site.nome },
        category: "Substrato agrícola",
      })),
      {
        "@type": "FAQPage",
        "@id": `${site.url}/#faq`,
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.pergunta,
          acceptedAnswer: { "@type": "Answer", text: f.resposta },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // conteúdo estático definido no próprio projeto
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dados) }}
    />
  );
}
