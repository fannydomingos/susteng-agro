/**
 * ARQUIVO ÚNICO DE CONFIGURAÇÃO
 * -----------------------------
 * Telefone, e-mail, endereço, redes sociais e WhatsApp ficam TODOS aqui.
 * Para trocar qualquer contato do site, edite só este arquivo.
 */

export const site = {
  nome: "SustentAgro",
  nomeCompleto: "SustentAgro — Transformando resíduos em recursos",
  slogan: "Transformando resíduos em recursos",
  descricao:
    "Substratos ecológicos de fibra e pó de coco produzidos a partir do coco verde descartado. Soluções sustentáveis para viveiros, fruticultura, hortaliças e paisagismo no DF, Entorno e Ceará.",

  // Troque para o domínio final antes de publicar (usado em sitemap, robots e Open Graph)
  url: "https://sustentagro.org",

  endereco: {
    linha1: "Chácara Boa Vontade, Córrego do Urubu, Ch 56",
    linha2: "Lago Norte, Brasília/DF",
    cep: "71540-800",
    cidade: "Brasília",
    estado: "DF",
    pais: "BR",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Ch%C3%A1cara+Boa+Vontade+C%C3%B3rrego+do+Urubu+Lago+Norte+Bras%C3%ADlia+DF",
  },

  email: "cristyanomartins@gmail.com",

  // WhatsApp principal — usado no botão flutuante e nos CTAs
  whatsapp: {
    // formato internacional, só dígitos
    numero: "5561984068770",
    exibicao: "(61) 98406-8770",
    mensagem:
      "Olá! Vim pelo site da SustentAgro e gostaria de saber mais sobre os substratos de fibra de coco.",
  },

  telefones: [
    { nome: "Cristyano Martins", cargo: "Diretor executivo", exibicao: "(61) 98406-8770", numero: "5561984068770" },
    { nome: "Fabiano Martins", cargo: "Diretor operacional", exibicao: "(61) 99965-4060", numero: "5561999654060" },
  ],

  redes: {
    instagram: "https://www.instagram.com/sustentagrooficial",
    instagramHandle: "@sustentagrooficial",
  },

  // Assinatura do rodapé
  desenvolvidoPor: {
    nome: "Fanny Domingos",
    whatsapp: "5561992770280",
  },

  legendaImagem: "imagem ilustrativa",
} as const;

/** Monta o link do WhatsApp com mensagem pré-preenchida. */
export function whatsappUrl(mensagem: string = site.whatsapp.mensagem, numero: string = site.whatsapp.numero) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
}

export const navLinks = [
  { href: "/#quem-somos", label: "Quem somos" },
  { href: "/#produtos", label: "Produtos" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#aplicacoes", label: "Aplicações" },
  { href: "/#parceiros", label: "Parceiros" },
  { href: "/galeria", label: "Fotos" },
  { href: "/artigos", label: "Artigos" },
  { href: "/#contato", label: "Contato" },
] as const;
