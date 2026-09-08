/**
 * Todo o texto do site.
 * Base: documento de seções, ficha técnica e apresentação institucional
 * da SustentAgro. Editar aqui muda o conteúdo sem mexer nos componentes.
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
      texto: "Priorizar práticas que respeitem o meio ambiente e reduzam o desperdício.",
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
  titulo: "Diagnóstico do problema",
  itens: [
    { valor: "2 bilhões", texto: "de cocos consumidos por ano no Brasil" },
    { valor: "6,7 milhões", texto: "de toneladas de resíduos gerados" },
    { valor: "90%", texto: "ainda destinados a aterros e lixões" },
  ],
  cards: [
    { titulo: "Custo público anual", texto: "Mais de R$ 200 milhões com descarte." },
    {
      titulo: "Redução de emissão estimada",
      texto: "Mais de 350 mil toneladas de CO₂ por ano.",
    },
  ],
  fecho:
    "Transformar esse passivo ambiental em oportunidade é o desafio que a SustentAgro assumiu.",
};

export type Produto = {
  slug: string;
  nome: string;
  /** frase curta usada em listas e no card */
  descricao: string;
  imagem: string;
  destaques: string[];
  /** conteúdo da página de detalhe */
  detalhe: {
    chamada: string;
    texto: string[];
    beneficios: { titulo: string; texto: string }[];
    indicadoPara: string[];
    especificacoes: { parametro: string; valor: string }[];
    volumes: string[];
  };
};

export const produtos: Produto[] = [
  {
    slug: "fibra-de-coco",
    nome: "Substrato de fibra de coco",
    descricao:
      "Alternativa ecológica ao solo tradicional. Oferece excelente drenagem e umidade controlada, evita o encharcamento e fortalece o desenvolvimento das raízes.",
    imagem: "/images/produto-fibra.png",
    destaques: [
      "Granulometria de 5 a 25 mm",
      "Drenagem superior",
      "Produto biodegradável",
    ],
    detalhe: {
      chamada: "Drenagem e aeração para o desenvolvimento radicular.",
      texto: [
        "A fibra é a fração longa da casca do coco verde, com granulometria de 5 a 25 mm. Ela cria espaços vazios entre as partículas e garante que o excesso de água escoe rapidamente, mantendo o espaço de aeração elevado mesmo após sucessivas irrigações.",
        "É a escolha indicada para operações que já registraram perdas por encharcamento. Substitui o solo tradicional em cultivo protegido, viveiros e sistemas com fertirrigação, sem compactar ao longo do ciclo produtivo.",
      ],
      beneficios: [
        {
          titulo: "Drenagem superior",
          texto: "O excesso de água escoa rapidamente, sem raízes em meio saturado.",
        },
        {
          titulo: "Resistência à compactação",
          texto: "Mantém a estrutura física por 2 a 4 ciclos, conforme manejo e cultura.",
        },
        {
          titulo: "Alto espaço de aeração",
          texto: "De 25% a 35% de ar disponível, condição essencial ao sistema radicular.",
        },
        {
          titulo: "Origem renovável",
          texto: "Produto biodegradável, sem passivo ambiental no descarte.",
        },
      ],
      indicadoPara: [
        "Cultivo protegido e estufas",
        "Viveiros florestais e frutíferos",
        "Orquídeas e plantas epífitas",
        "Sistemas com fertirrigação",
      ],
      especificacoes: [
        { parametro: "Granulometria", valor: "5 a 25 mm" },
        { parametro: "Espaço de aeração", valor: "25% a 35%" },
        { parametro: "Contração volumétrica", valor: "abaixo de 10%" },
        { parametro: "Durabilidade", valor: "2 a 4 ciclos produtivos" },
      ],
      volumes: ["1 L", "2 L", "5 L", "10 L", "100 L"],
    },
  },
  {
    slug: "blend-de-coco",
    nome: "Blend de coco 70/30",
    descricao:
      "Mistura equilibrada de fibra e pó de coco, adaptada a diferentes cultivos. Garante retenção de água e drenagem ideais para cada tipo de planta.",
    imagem: "/images/produto-mix.png",
    destaques: [
      "70% de fibra e 30% de pó",
      "Porosidade total acima de 85%",
      "2 a 4 ciclos produtivos",
    ],
    detalhe: {
      chamada: "Equilíbrio entre retenção de água e drenagem.",
      texto: [
        "O blend 70/30 combina 70% de fibra com 30% de pó de coco. A fibra assegura a drenagem e a aeração; o pó responde pela retenção de umidade. É a formulação de referência da SustentAgro para produção intensiva.",
        "O produto é fornecido biologicamente estabilizado, livre de sementes de plantas invasoras e, quando armazenado adequadamente, livre de patógenos. A ficha técnica agronômica completa está disponível na página de artigos.",
      ],
      beneficios: [
        {
          titulo: "Retenção e drenagem equilibradas",
          texto:
            "De 60% a 75% de retenção de água com 25% a 35% de espaço de aeração.",
        },
        {
          titulo: "Porosidade total acima de 85%",
          texto: "Volume efetivamente ocupado e explorado pelo sistema radicular.",
        },
        {
          titulo: "pH e condutividade controlados",
          texto:
            "pH entre 5,5 e 6,0, CE a partir de 0,5 mS/cm e sódio abaixo de 5 mg/L.",
        },
        {
          titulo: "Substrato estabilizado",
          texto:
            "Baixa taxa de decomposição e integridade física por 2 a 4 ciclos produtivos.",
        },
      ],
      indicadoPara: [
        "Frutas vermelhas: mirtilo, framboesa, amora e morango",
        "Hortaliças em ambiente protegido",
        "Mudas florestais e frutíferas",
        "Hidroponia com fertirrigação controlada",
      ],
      especificacoes: [
        { parametro: "Composição", valor: "70% fibra e 30% pó" },
        { parametro: "Densidade aparente (seca)", valor: "90 a 120 kg/m³" },
        { parametro: "Porosidade total", valor: "acima de 85%" },
        { parametro: "pH (H₂O 1:5)", valor: "5,5 a 6,0" },
      ],
      volumes: ["1 L", "2 L", "5 L", "10 L", "100 L"],
    },
  },
  {
    slug: "po-de-coco",
    nome: "Pó de coco",
    descricao:
      "Substrato sustentável que melhora a retenção de umidade e a aeração do solo, favorecendo o enraizamento e o crescimento saudável das plantas.",
    imagem: "/images/produto-po.png",
    destaques: [
      "Granulometria abaixo de 5 mm",
      "Alta retenção de umidade",
      "Produto 100% natural",
    ],
    detalhe: {
      chamada: "Retenção de água na zona radicular.",
      texto: [
        "O pó de coco é a fração fina do processamento da casca do coco verde, com partículas abaixo de 5 mm. Retém umidade por mais tempo, reduz a frequência de irrigação e mantém o entorno da raiz úmido sem provocar encharcamento.",
        "É o formato indicado para germinação, enraizamento de estacas e culturas sensíveis à oscilação hídrica. Também é utilizado como condicionador de solos arenosos ou compactados, melhorando estrutura e aeração.",
      ],
      beneficios: [
        {
          titulo: "Alta retenção de umidade",
          texto: "Reduz a irrigação e o estresse hídrico entre as regas.",
        },
        {
          titulo: "Favorece o enraizamento",
          texto: "Meio leve e uniforme, atravessado sem resistência pela raiz nova.",
        },
        {
          titulo: "Condiciona solos pobres",
          texto: "Corrige compactação e amplia a aeração em solos arenosos ou pesados.",
        },
        {
          titulo: "Livre de contaminantes",
          texto: "Lavagem controlada e estabilização antes do envase.",
        },
      ],
      indicadoPara: [
        "Germinação e produção de mudas",
        "Enraizamento de estacas",
        "Vasos e jardineiras",
        "Condicionamento de solo em canteiros",
      ],
      especificacoes: [
        { parametro: "Granulometria", valor: "abaixo de 5 mm" },
        { parametro: "Origem", valor: "Casca de coco verde processada" },
        { parametro: "Umidade de fornecimento", valor: "15% a 25%" },
        { parametro: "Matéria orgânica", valor: "60% a 75%" },
      ],
      volumes: ["1 L", "2 L", "5 L", "10 L", "100 L"],
    },
  },
  {
    slug: "substrato-personalizado",
    nome: "Substrato personalizado",
    descricao:
      "Formulação sob medida para as necessidades da sua plantação, otimizando nutrição, crescimento radicular e produtividade.",
    imagem: "/images/produto-personalizado.png",
    destaques: [
      "Formulação sob medida",
      "Suporte agronômico incluído",
      "Amostra antes do lote",
    ],
    detalhe: {
      chamada: "Formulação desenvolvida para a sua cultura.",
      texto: [
        "Cada cultura apresenta uma exigência distinta de água e de ar, e uma mesma formulação raramente atende ao morango e ao eucalipto com a mesma eficiência. A SustentAgro ajusta a proporção entre fibra e pó, a granulometria e o ponto de estabilização conforme o cultivo, o sistema de irrigação e as condições climáticas da operação.",
        "O processo começa com uma conversa técnica sobre a sua produção. A partir dela, formulamos o substrato, enviamos amostra para teste e realizamos os ajustes necessários antes de fechar o volume de fornecimento.",
      ],
      beneficios: [
        {
          titulo: "Formulação sob medida",
          texto: "Proporção entre fibra e pó e granulometria definidas para a sua cultura.",
        },
        {
          titulo: "Amostra antes do lote",
          texto: "Teste no seu próprio sistema antes de fechar o volume.",
        },
        {
          titulo: "Acompanhamento técnico",
          texto:
            "Orientação sobre pré-hidratação, manejo da condutividade elétrica e plano nutricional.",
        },
        {
          titulo: "Escala de fornecimento",
          texto:
            "Unidades no DF, Entorno e Ceará para atender produção contínua.",
        },
      ],
      indicadoPara: [
        "Produtores com sistema de fertirrigação próprio",
        "Viveiros com mais de uma espécie em produção",
        "Culturas sensíveis à oscilação hídrica",
        "Operações que exigem fornecimento contínuo",
      ],
      especificacoes: [
        { parametro: "Composição", valor: "Definida por cultura" },
        { parametro: "Granulometria", valor: "Ajustável" },
        { parametro: "Amostra para teste", valor: "Enviada antes do lote" },
        { parametro: "Suporte agronômico", valor: "Incluído" },
      ],
      volumes: ["Sob demanda", "100 L", "Big bag"],
    },
  },
];

export const comoFunciona = {
  titulo: "Como a nossa fibra funciona",
  intro:
    "A SustentAgro transforma o coco verde descartado em substratos de alta qualidade. Com tecnologia especializada, produzimos um meio de cultivo eficiente, sustentável e livre de contaminantes.",
  itens: [
    {
      titulo: "Solução sustentável",
      texto: "Reutiliza o coco verde que seria descartado, reduzindo o volume de resíduos.",
    },
    {
      titulo: "Retenção de umidade",
      texto: "Menor necessidade de irrigação e maior previsibilidade no manejo.",
    },
    {
      titulo: "Melhor desenvolvimento das plantas",
      texto: "Evita a compactação do solo e melhora a oxigenação das raízes.",
    },
    {
      titulo: "Cultivo mais seguro",
      texto: "Livre de pragas e doenças, o que assegura maior qualidade da produção.",
    },
    {
      titulo: "Formulações personalizadas",
      texto: "Substratos adaptados a diferentes culturas e necessidades.",
    },
  ],
};

export const rastreabilidade = {
  titulo: "Rastreabilidade do lote",
  intro:
    "Todas as etapas são registradas digitalmente, com data, hora, peso e responsável técnico.",
  etapas: [
    {
      nome: "Coleta",
      detalhe: "Origem, volume e responsável registrados na fazenda parceira.",
    },
    { nome: "Transporte", detalhe: "Carga lacrada, com motorista e veículo identificados." },
    { nome: "Recebimento", detalhe: "Peso aferido na unidade e conferência do responsável." },
    { nome: "Triagem", detalhe: "Aproveitamento medido e perdas destinadas à compostagem." },
    {
      nome: "Processamento",
      detalhe: "Fibra, pó e substratos produzidos sob supervisão técnica.",
    },
    { nome: "Expedição", detalhe: "Lote rastreado por QR Code, com relatório emitido." },
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
  { valor: 350, sufixo: " t", legenda: "de CO₂ evitadas em gases de efeito estufa" },
  { valor: 2022, sufixo: "", legenda: "ano de início das operações", semAnimacao: true },
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
      "Novos produtos sustentáveis: substratos, fibras e mantas.",
      "Aumento da renda local e fortalecimento da economia circular.",
    ],
  },
  {
    eixo: "Ambiental",
    itens: [
      "Redução do descarte inadequado.",
      "Valorização de recurso renovável e mitigação de emissões.",
    ],
  },
];

export const aplicacoes = {
  titulo: "Utilização",
  intro:
    "Os substratos de fibra de coco da SustentAgro são desenvolvidos para assegurar o melhor crescimento e desenvolvimento das plantas, proporcionando um meio de cultivo sustentável, eficiente e de alta qualidade. O pó de coco, a fibra de coco e as formulações personalizadas atendem a diversos cultivos, das frutas vermelhas às flores e hortaliças.",
  grupos: [
    {
      titulo: "Frutas vermelhas",
      texto: "Mirtilo, framboesa, amora e morango.",
    },
    {
      titulo: "Hortaliças e legumes",
      texto: "Tomate, pimentão, alface, rúcula, brócolis e demais hortaliças.",
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
      texto: "Cultivo de hortaliças em ambiente protegido.",
    },
    {
      titulo: "Cultivos personalizados",
      texto: "Formulações específicas para as necessidades da sua produção.",
    },
  ],
};

export const fichaTecnica = {
  titulo: "Ficha técnica agronômica: fibra de coco 70/30",
  intro:
    "Produto indicado para uso profissional em sistemas intensivos de produção agrícola. Composição de 70% de fibra e 30% de pó de coco, obtido do processamento da casca de coco verde por trituração, separação granulométrica, lavagem controlada e estabilização.",
  fisicas: [
    { parametro: "Densidade aparente (seca)", unidade: "kg/m³", faixa: "90 a 120" },
    { parametro: "Porosidade total", unidade: "%", faixa: "acima de 85" },
    { parametro: "Espaço de aeração", unidade: "%", faixa: "25 a 35" },
    { parametro: "Capacidade de retenção de água", unidade: "% v/v", faixa: "60 a 75" },
    { parametro: "Granulometria da fibra", unidade: "mm", faixa: "5 a 25" },
    { parametro: "Granulometria do pó", unidade: "mm", faixa: "abaixo de 5" },
    { parametro: "Contração volumétrica", unidade: "%", faixa: "abaixo de 10" },
    { parametro: "Umidade de fornecimento", unidade: "%", faixa: "15 a 25" },
  ],
  quimicas: [
    { parametro: "pH (H₂O 1:5)", unidade: "", faixa: "5,5 a 6,0" },
    { parametro: "Condutividade elétrica (1:5)", unidade: "mS/cm", faixa: "acima de 0,5" },
    { parametro: "Matéria orgânica", unidade: "%", faixa: "60 a 75" },
    { parametro: "Relação C/N", unidade: "", faixa: "5 a 25" },
    { parametro: "Sódio (Na)", unidade: "mg/L", faixa: "abaixo de 5" },
    { parametro: "Cloretos", unidade: "mg/L", faixa: "abaixo de 10" },
  ],
  manejo:
    "Recomenda-se a pré-hidratação antes do uso e o monitoramento periódico da condutividade elétrica ao longo do ciclo produtivo. O plano nutricional deve considerar a capacidade natural de retenção e de troca catiônica do substrato.",
};

export const parceiros = [
  { nome: "Rota das Frutas GO-DF-MG", logo: "/images/parceiros/rota-das-frutas.webp" },
  { nome: "Instituto Arapoti", logo: "/images/parceiros/instituto-arapoti.png" },
  { nome: "Instituto MultipliCidades", logo: "/images/parceiros/multiplicidades.webp" },
  { nome: "SEAGRI-DF", logo: "/images/parceiros/seagri-df.jpg" },
  { nome: "Universidade de Brasília", logo: "/images/parceiros/unb.png" },
  { nome: "Sustentacoop", logo: "/images/parceiros/sustentacoop.png" },
  { nome: "Emater-DF", logo: "/images/parceiros/emater-df.png" },
  { nome: "SENAR-DF", logo: "/images/parceiros/senar-df.png" },
  { nome: "PROSP Construtora e Incorporadora", logo: "/images/parceiros/prosp.jpg" },
  { nome: "DUNA", logo: "/images/parceiros/duna.jpg" },
  { nome: "Laboratório Aberto de Brasília", logo: "/images/parceiros/lab.png" },
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
  "2º lugar no Agro Hack Ideias, AgroBrasília 2024",
  "Start BSB 2024/2025, Eixo II",
  "Start BSB 2025/2026, Eixo III",
  "Inova Cerrado Tração 2025",
  "2º lugar entre startups de impacto no Festival Curicaca 2025",
];

export const noticias = [
  {
    titulo:
      "Incentivo a hackathons impulsiona o desenvolvimento de soluções para serviços públicos",
    resumo:
      "A SustentAgro conquistou o segundo lugar no Agro Hack Ideias, na AgroBrasília, com a proposta de produtos criados a partir da fibra e do pó do coco.",
    veiculo: "Jornal de Brasília",
    url: "https://jornaldebrasilia.com.br/brasilia/incentivo-a-hackathons-impulsiona-o-desenvolvimento-de-solucoes-para-servicos-publicos/",
  },
  {
    titulo:
      "Agricultor retira 70 toneladas de coco de lixões no DF e reaproveita em fibra de coco para melhorar plantações",
    resumo:
      "Reportagem sobre a técnica de reaproveitamento desenvolvida por Cristyano Martins, fundador da SustentAgro, que altera o destino de toneladas de resíduo de coco.",
    veiculo: "Capital do Entorno",
    url: "https://www.capitaldoentorno.com.br/agricultor-retira-70-toneladas-de-coco-de-lixoes-no-df-e-reaproveita-em-fibra-de-coco-para-melhorar-plantacoes/",
  },
  {
    titulo:
      "Distrito Federal fortalece presença internacional e se consolida como polo estratégico do agronegócio",
    resumo:
      "A Fruit Attraction 2025 contará, pela primeira vez, com a participação de representantes do setor no Distrito Federal.",
    veiculo: "Lago Sul",
    url: "https://lagosul.com.br/distrito-federal-fortalece-presenca-internacional-e-se-consolida-como-polo-estrategico-do-agronegocio/",
  },
];

export const faq = [
  {
    pergunta: "Qual a diferença entre fibra, pó e blend de coco?",
    resposta:
      "A fibra tem granulometria de 5 a 25 mm e assegura drenagem e aeração. O pó tem partículas abaixo de 5 mm e retém mais água. O blend 70/30 combina os dois formatos e é o mais utilizado em produção intensiva, por equilibrar retenção e drenagem.",
  },
  {
    pergunta: "É necessário pré-hidratar o substrato antes do uso?",
    resposta:
      "Sim. Recomendamos a pré-hidratação antes do plantio e o monitoramento periódico da condutividade elétrica ao longo do ciclo produtivo. O plano nutricional deve considerar a capacidade natural de retenção e de troca catiônica do substrato.",
  },
  {
    pergunta: "Por quantos ciclos o substrato mantém o desempenho?",
    resposta:
      "O substrato é biologicamente estabilizado, com alta durabilidade estrutural e baixa taxa de decomposição. Mantém a integridade física por 2 a 4 ciclos produtivos, conforme o manejo e a cultura.",
  },
  {
    pergunta: "O produto é livre de pragas e de sementes de plantas invasoras?",
    resposta:
      "Sim. O produto é livre de sementes de plantas invasoras e, quando armazenado adequadamente, livre de patógenos.",
  },
  {
    pergunta: "A SustentAgro desenvolve formulações para culturas específicas?",
    resposta:
      "Sim. Formulamos substratos sob medida para as necessidades da plantação, otimizando nutrição, crescimento radicular e produtividade. Entre em contato pelo WhatsApp e informe qual é o seu cultivo.",
  },
  {
    pergunta: "Qual é a área de atendimento?",
    resposta:
      "Operamos com unidades no Distrito Federal, no Entorno e no Ceará, e atendemos produtores em todo o Brasil. Consulte prazo e frete pelo WhatsApp.",
  },
];
