/**
 * Todo o texto do site, extraído do material da SustentAgro
 * (documento de seções + ficha técnica + apresentação institucional).
 * Editar aqui muda o conteúdo sem mexer nos componentes.
 */

export const quemSomos = {
  titulo: "Quem somos",
  texto:
    "A SustentAgro é uma empresa dedicada à produção de substratos ecológicos de alta qualidade, com base na fibra de coco, um recurso natural renovável. Atuamos em todo o Brasil, com unidades no Distrito Federal, Entorno e Ceará, oferecendo soluções para jardinagem, cultivo de frutas e hortaliças, paisagismo e ambientes verdes. Nosso diferencial é aliar sustentabilidade, economia e alta performance, contribuindo para a valorização do cultivo consciente e ecológico.",
  paraQuem:
    "Nossos produtos são ideais para produtores rurais, viveiristas e empresas do setor agrícola que buscam substratos de alta qualidade para otimizar o crescimento de suas culturas. Atendemos desde pequenos agricultores até grandes produtores de frutas, hortaliças e plantas ornamentais, oferecendo soluções sustentáveis e personalizadas para diferentes tipos de cultivo.",
  missao:
    "Mostrar para o mundo o potencial sustentável do resíduo do coco verde, impactando pessoas e o meio ambiente.",
  visao:
    "Ressignificar 100 toneladas do resíduo do coco verde do DF e RIDE até 2030.",
  valores: [
    {
      titulo: "Ser sustentável",
      texto: "Priorizar práticas que respeitem o meio ambiente e reduzem o desperdício.",
    },
    {
      titulo: "Ter qualidade",
      texto:
        "Oferecer produtos confiáveis e de alta performance, sendo reconhecidos por parceiros e colaboradores pela qualidade e pelo impacto das nossas ações e linhas de produtos.",
    },
    {
      titulo: "Ser inovador",
      texto: "Buscar continuamente formas de melhorar o uso de recursos naturais na produção.",
    },
    {
      titulo: "Bons parceiros",
      texto:
        "Estabelecer relações transparentes e colaborativas com clientes, fornecedores, colaboradores e parceiros.",
    },
  ],
};

export const diagnostico = {
  titulo: "O problema que assumimos",
  itens: [
    { valor: "2 bilhões", texto: "de cocos consumidos por ano no Brasil" },
    { valor: "6,7 milhões", texto: "de toneladas de resíduos gerados" },
    { valor: "90%", texto: "ainda vão para aterros e lixões" },
  ],
  cards: [
    { titulo: "Custo público anual", texto: "Mais de R$ 200 milhões com descarte" },
    { titulo: "Redução de emissão estimada", texto: "Mais de 350 mil toneladas de CO₂ por ano" },
  ],
  fecho:
    "Transformar esse passivo em oportunidade é o desafio que a SustentAgro assumiu.",
};

export type Produto = {
  slug: string;
  nome: string;
  descricao: string;
  imagem: string;
  destaques: string[];
};

export const produtos: Produto[] = [
  {
    slug: "po-de-coco",
    nome: "Pó de coco",
    descricao:
      "Substrato sustentável que melhora a retenção de umidade e aeração do solo, favorecendo o enraizamento e o crescimento saudável das plantas.",
    imagem: "/images/produto-po.png",
    destaques: ["Granulometria < 5 mm", "Alta retenção de umidade", "100% natural"],
  },
  {
    slug: "fibra-de-coco",
    nome: "Substrato de fibra de coco",
    descricao:
      "Alternativa ecológica ao solo tradicional, oferece excelente drenagem e umidade controlada, evitando encharcamento e fortalecendo o desenvolvimento das raízes.",
    imagem: "/images/produto-fibra.png",
    destaques: ["Granulometria 5 – 25 mm", "Drenagem superior", "Produto biodegradável"],
  },
  {
    slug: "blend-de-coco",
    nome: "Blend de coco 70/30",
    descricao:
      "Mistura equilibrada de fibra e pó de coco, adaptada para diferentes cultivos, garantindo retenção de água e drenagem ideais para cada tipo de planta.",
    imagem: "/images/produto-mix.png",
    destaques: ["70% fibra + 30% pó", "Porosidade total ≥ 85%", "2 a 4 ciclos produtivos"],
  },
  {
    slug: "substrato-personalizado",
    nome: "Substrato personalizado",
    descricao:
      "Formulação sob medida para as necessidades da sua plantação, otimizando nutrição, crescimento radicular e produtividade.",
    imagem: "/images/produto-mix.png",
    destaques: ["Blend sob medida", "Suporte agronômico", "Para cada cultura"],
  },
];

export const comoFunciona = {
  titulo: "Como a nossa fibra funciona",
  intro:
    "A SustentAgro transforma o coco verde descartado em substratos de alta qualidade. Com tecnologia especializada, criamos um meio de cultivo eficiente, sustentável e livre de contaminantes.",
  itens: [
    {
      titulo: "Solução sustentável",
      texto: "Reutiliza coco verde que seria descartado, reduzindo resíduos.",
    },
    {
      titulo: "Retenção de umidade",
      texto: "Menor necessidade de irrigação, facilitando o manejo.",
    },
    {
      titulo: "Melhor desenvolvimento das plantas",
      texto: "Evita compactação do solo e melhora a oxigenação das raízes.",
    },
    {
      titulo: "Cultivo mais seguro",
      texto: "Livre de pragas e doenças, garantindo maior qualidade.",
    },
    {
      titulo: "Blends personalizados",
      texto: "Substratos adaptados para diferentes culturas e necessidades.",
    },
  ],
};

export const rastreabilidade = {
  titulo: "Rastreabilidade do lote",
  intro:
    "Todas as etapas registradas digitalmente com data, hora, peso e responsável técnico.",
  etapas: [
    { nome: "Coleta", detalhe: "Origem, volume e responsável registrados na fazenda parceira." },
    { nome: "Transporte", detalhe: "Carga lacrada, motorista e veículo identificados." },
    { nome: "Recebimento", detalhe: "Peso aferido na unidade e conferência de responsável." },
    { nome: "Triagem", detalhe: "Aproveitamento medido; perdas destinadas à compostagem." },
    { nome: "Processamento", detalhe: "Fibra, pó e substratos gerados sob supervisão técnica." },
    { nome: "Expedição", detalhe: "Lote rastreado via QR Code e relatório emitido." },
  ],
};

export type NumeroDestaque = {
  valor: number;
  sufixo: string;
  legenda: string;
  semAnimacao?: boolean;
};

export const numeros: NumeroDestaque[] = [
  { valor: 250, sufixo: "+", legenda: "toneladas de resíduo de coco processadas" },
  { valor: 150, sufixo: "+", legenda: "famílias beneficiadas direta e indiretamente" },
  { valor: 350, sufixo: " t", legenda: "de CO₂ evitadas (GEE)" },
  { valor: 2022, sufixo: "", legenda: "ano em que começamos a operar", semAnimacao: true },
];

export const impacto = [
  {
    eixo: "Social",
    itens: [
      "Inclusão de cooperativas e geração de empregos verdes.",
      "Apoio direto a agricultores familiares e comunidades locais.",
    ],
  },
  {
    eixo: "Econômico",
    itens: [
      "Novos produtos sustentáveis (substratos, fibras, mantas).",
      "Aumento de renda local e fortalecimento da economia circular.",
    ],
  },
  {
    eixo: "Ambiental",
    itens: [
      "Redução do descarte inadequado.",
      "Valorização de um recurso renovável e mitigação de emissões.",
    ],
  },
];

export const aplicacoes = {
  titulo: "Utilização",
  intro:
    "Os substratos de fibra de coco da SustentAgro são desenvolvidos para garantir o melhor crescimento e desenvolvimento das plantas, proporcionando um meio de cultivo sustentável, eficiente e de alta qualidade. Nosso pó de coco, fibra de coco e blends personalizados podem ser utilizados em diversos cultivos, desde frutas vermelhas até flores e hortaliças.",
  grupos: [
    {
      titulo: "Frutas vermelhas",
      texto: "Mirtilo, framboesa, amora e morango.",
    },
    {
      titulo: "Hortaliças e legumes",
      texto: "Tomate, pimentão, alface, rúcula, brócolis e outras hortaliças.",
    },
    {
      titulo: "Mudas florestais e frutíferas",
      texto: "Eucalipto, pinus, cítricos como limão e laranja, além de café.",
    },
    {
      titulo: "Flores e plantas ornamentais",
      texto: "Orquídeas, suculentas e cactos.",
    },
    {
      titulo: "Sistemas semi-hidropônicos",
      texto: "Cultivo de hortaliças em estufas.",
    },
    {
      titulo: "Cultivos personalizados",
      texto: "Desenvolvemos blends específicos para atender às necessidades do seu cultivo.",
    },
  ],
};

export const fichaTecnica = {
  titulo: "Ficha técnica — Fibra de coco 70/30",
  intro:
    "Produto indicado para uso profissional em sistemas intensivos de produção agrícola. Composição: 70% fibra + 30% pó de coco, obtido do processamento de casca de coco verde por trituração, separação granulométrica, lavagem controlada e estabilização.",
  fisicas: [
    { parametro: "Densidade aparente (seca)", unidade: "kg/m³", faixa: "90 – 120" },
    { parametro: "Porosidade total", unidade: "%", faixa: "≥ 85" },
    { parametro: "Espaço de aeração", unidade: "%", faixa: "25 – 35" },
    { parametro: "Capacidade de retenção de água", unidade: "% v/v", faixa: "60 – 75" },
    { parametro: "Granulometria fibra", unidade: "mm", faixa: "5 – 25" },
    { parametro: "Granulometria pó", unidade: "mm", faixa: "< 5" },
    { parametro: "Contração volumétrica", unidade: "%", faixa: "< 10" },
    { parametro: "Umidade de fornecimento", unidade: "%", faixa: "15 – 25" },
  ],
  quimicas: [
    { parametro: "pH (H₂O 1:5)", unidade: "—", faixa: "5,5 – 6,0" },
    { parametro: "CE (1:5)", unidade: "mS/cm", faixa: "≥ 0,5" },
    { parametro: "Matéria orgânica", unidade: "%", faixa: "60 – 75" },
    { parametro: "Relação C/N", unidade: "—", faixa: "5 – 25" },
    { parametro: "Sódio (Na)", unidade: "mg/L", faixa: "< 5" },
    { parametro: "Cloretos", unidade: "mg/L", faixa: "< 10" },
  ],
  manejo:
    "Recomenda-se pré-hidratação antes do uso e monitoramento periódico da condutividade elétrica (CE) ao longo do ciclo produtivo. O plano nutricional deve considerar a capacidade natural de retenção e troca catiônica do substrato.",
};

export const parceiros = [
  { nome: "Rota das Frutas GO-DF-MG", logo: "/images/parceiros/rota-das-frutas.webp" },
  { nome: "Instituto Arapoti", logo: "/images/parceiros/instituto-arapoti.png" },
  { nome: "Instituto MultipliCidades", logo: "/images/parceiros/multiplicidades.webp" },
  { nome: "SEAGRI-DF", logo: "/images/parceiros/seagri-df.jpg" },
  { nome: "UnB — Universidade de Brasília", logo: "/images/parceiros/unb.png" },
  { nome: "Sustentacoop", logo: "/images/parceiros/sustentacoop.png" },
  { nome: "Emater-DF", logo: "/images/parceiros/emater-df.png" },
  { nome: "SENAR-DF", logo: "/images/parceiros/senar-df.png" },
  { nome: "PROSP — Construtora e Incorporadora", logo: "/images/parceiros/prosp.jpg" },
  { nome: "DUNA", logo: "/images/parceiros/duna.jpg" },
  { nome: "Laboratório Aberto de Brasília — LAB", logo: "/images/parceiros/lab.png" },
];

export const equipe = [
  {
    nome: "Cristyano Martins",
    cargo: "Diretor executivo",
    foto: "/images/equipe-cristyano.jpg",
  },
  {
    nome: "Fabiano Martins",
    cargo: "Diretor operacional",
    foto: "/images/equipe-fabiano.jpg",
  },
];

export const reconhecimentos = [
  "2º lugar no Agro Hack Ideias — AgroBrasília 2024",
  "Start BSB 2024/2025 — Eixo II",
  "Start BSB 2025/2026 — Eixo III",
  "Inova Cerrado Tração 2025",
  "2º lugar entre startups de impacto no Festival Curicaca 2025",
];

export const noticias = [
  {
    titulo:
      "Incentivo a hackathons impulsiona o desenvolvimento de soluções para serviços públicos",
    resumo:
      "Eles ficaram em segundo lugar no Agro Hack Ideias, na AgroBrasília, com a proposta de produtos criados a partir da fibra e do pó do fruto.",
    veiculo: "Jornal de Brasília",
    url: "https://jornaldebrasilia.com.br/brasilia/incentivo-a-hackathons-impulsiona-o-desenvolvimento-de-solucoes-para-servicos-publicos/",
  },
  {
    titulo:
      "Agricultor retira 70 toneladas de coco de lixões no DF e reaproveita em fibra de coco para melhorar plantações",
    resumo:
      "Um agricultor está mudando o destino de toneladas de coco que antes iam parar em lixões. Cristyano, fundador da startup SustentAgro, desenvolveu uma técnica de reaproveitamento.",
    veiculo: "Capital do Entorno",
    url: "https://www.capitaldoentorno.com.br/agricultor-retira-70-toneladas-de-coco-de-lixoes-no-df-e-reaproveita-em-fibra-de-coco-para-melhorar-plantacoes/",
  },
  {
    titulo:
      "Distrito Federal fortalece presença internacional e se consolida como polo estratégico do agronegócio",
    resumo:
      "Fruit Attraction 2025 terá, pela primeira vez, a participação de representantes do DF no setor.",
    veiculo: "Lago Sul",
    url: "https://lagosul.com.br/distrito-federal-fortalece-presenca-internacional-e-se-consolida-como-polo-estrategico-do-agronegocio/",
  },
];

export const faq = [
  {
    pergunta: "Qual a diferença entre fibra, pó e blend de coco?",
    resposta:
      "A fibra tem granulometria de 5 a 25 mm e garante drenagem e aeração. O pó tem partículas menores que 5 mm e retém mais água. O blend 70/30 combina os dois e é o formato mais usado em produção intensiva, porque equilibra retenção e drenagem.",
  },
  {
    pergunta: "Preciso pré-hidratar o substrato antes de usar?",
    resposta:
      "Sim. Recomendamos pré-hidratação antes do plantio e monitoramento periódico da condutividade elétrica (CE) ao longo do ciclo produtivo. O plano nutricional deve considerar a capacidade natural de retenção e troca catiônica do substrato.",
  },
  {
    pergunta: "Por quantos ciclos o substrato dura?",
    resposta:
      "Nosso substrato é biologicamente estabilizado, com alta durabilidade estrutural e baixa taxa de decomposição. Ele mantém integridade física por 2 a 4 ciclos produtivos, conforme manejo e cultura.",
  },
  {
    pergunta: "O produto é livre de pragas e sementes de plantas invasoras?",
    resposta:
      "Sim. O produto é livre de sementes de plantas invasoras e, quando armazenado adequadamente, livre de patógenos.",
  },
  {
    pergunta: "Vocês desenvolvem blends para a minha cultura?",
    resposta:
      "Sim. Formulamos substratos sob medida para as necessidades da sua plantação, otimizando nutrição, crescimento radicular e produtividade. Fale com a gente pelo WhatsApp e conte qual é o seu cultivo.",
  },
  {
    pergunta: "Para onde vocês entregam?",
    resposta:
      "Atuamos com unidades no Distrito Federal, Entorno e Ceará, e atendemos produtores em todo o Brasil. Consulte prazo e frete pelo WhatsApp.",
  },
];
