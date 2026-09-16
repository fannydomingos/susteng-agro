import type { ComponentProps, ReactElement } from "react";

/**
 * ÍCONES DA MARCA
 * -----------------------------------------------------------------------
 * Traço único, 24 por 24, sem preenchimento, herdando a cor de quem chama
 * por `currentColor`. São desenhados aqui, em SVG, e não vêm de biblioteca:
 * assim não entra nenhum pacote novo no projeto, o traço acompanha a
 * tipografia da página e a cor muda junto com o estado (ativo, apagado).
 *
 * Para trocar um ícone, edite apenas o desenho correspondente. Quem aponta
 * para ele é o campo `icone` de cada item em `src/lib/conteudo.ts`.
 */

type Props = ComponentProps<"svg">;

function Base({ children, ...resto }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...resto}
    >
      {children}
    </svg>
  );
}

export type ChaveIcone =
  | "coleta"
  | "transporte"
  | "recebimento"
  | "triagem"
  | "processamento"
  | "expedicao"
  | "reciclar"
  | "gota"
  | "broto"
  | "escudo"
  | "ajustes";

export const icones: Record<ChaveIcone, (p: Props) => ReactElement> = {
  /* cesto com o coco recolhido na fazenda parceira */
  coleta: (p) => (
    <Base {...p}>
      <circle cx="12" cy="5.6" r="2.7" />
      <path d="M3.4 9.4h17.2l-1.7 9.6a2 2 0 0 1-2 1.6H7.1a2 2 0 0 1-2-1.6z" />
      <path d="M9.2 12.6l.7 4.6M14.8 12.6l-.7 4.6" />
    </Base>
  ),

  /* carga lacrada, com motorista e veículo identificados */
  transporte: (p) => (
    <Base {...p}>
      <path d="M2.4 6.2h11.2v10.4H2.4z" />
      <path d="M13.6 9.8h3.7l2.9 3v3.8h-6.6" />
      <circle cx="7" cy="18.8" r="1.7" />
      <circle cx="16.8" cy="18.8" r="1.7" />
    </Base>
  ),

  /* peso aferido na chegada à unidade */
  recebimento: (p) => (
    <Base {...p}>
      <path d="M12 3.6v16.8M6.4 20.4h11.2M3.4 7.4h17.2" />
      <path d="M3.4 7.4L1.4 13h4z" />
      <path d="M20.6 7.4L18.6 13h4z" />
    </Base>
  ),

  /* separação do que é aproveitado e do que vai para a compostagem */
  triagem: (p) => (
    <Base {...p}>
      <path d="M3.2 4.2h17.6l-6.9 8v8.2l-3.8-2v-6.2z" />
    </Base>
  ),

  /* fibra, pó e substratos produzidos sob supervisão técnica */
  processamento: (p) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="3.4" />
      <circle cx="12" cy="12" r="7.6" opacity="0.45" />
      <path d="M12 1.8v2.6M12 19.6v2.6M22.2 12h-2.6M4.4 12H1.8M19.2 4.8l-1.8 1.8M6.6 17.4l-1.8 1.8M19.2 19.2l-1.8-1.8M6.6 6.6L4.8 4.8" />
    </Base>
  ),

  /* lote fechado e rastreado, pronto para sair */
  expedicao: (p) => (
    <Base {...p}>
      <path d="M3.4 7.4L12 2.8l8.6 4.6v9.2L12 21.2l-8.6-4.6z" />
      <path d="M3.4 7.4L12 12l8.6-4.6M12 12v9.2" />
    </Base>
  ),

  /* o resíduo volta ao ciclo em vez de ir para o aterro */
  reciclar: (p) => (
    <Base {...p}>
      <path d="M4 12a8 8 0 0 1 13.6-5.7" />
      <path d="M20 12a8 8 0 0 1-13.6 5.7" />
      <path d="M17.6 6.3h-3.6M17.6 6.3V2.7" />
      <path d="M6.4 17.7h3.6M6.4 17.7v3.6" />
    </Base>
  ),

  /* retenção de umidade */
  gota: (p) => (
    <Base {...p}>
      <path d="M12 3.2s5.9 6.4 5.9 10.2a5.9 5.9 0 1 1-11.8 0C6.1 9.6 12 3.2 12 3.2z" />
    </Base>
  ),

  /* raiz que respira e se desenvolve */
  broto: (p) => (
    <Base {...p}>
      <path d="M12 21.2v-8.4" />
      <path d="M12 12.8c0-3.3 2.7-6 6-6 0 3.3-2.7 6-6 6z" />
      <path d="M12 16.2c0-2.8-2.2-5-5-5 0 2.8 2.2 5 5 5z" />
    </Base>
  ),

  /* substrato livre de pragas e doenças */
  escudo: (p) => (
    <Base {...p}>
      <path d="M12 2.8l7.4 3v6.1c0 4.5-3.1 8-7.4 9.3-4.3-1.3-7.4-4.8-7.4-9.3V5.8z" />
      <path d="M9 12.1l2.2 2.2 4.1-4.4" />
    </Base>
  ),

  /* formulação ajustada a cada cultura */
  ajustes: (p) => (
    <Base {...p}>
      <path d="M3.6 7.4h9.6M18.6 7.4h1.8M3.6 16.6h3.6M12.6 16.6h7.8" />
      <circle cx="15.8" cy="7.4" r="2.1" />
      <circle cx="9.8" cy="16.6" r="2.1" />
    </Base>
  ),
};

/** Desenha o ícone pela chave, com tamanho e cor vindos de quem chama. */
export function Icone({ nome, ...resto }: { nome: ChaveIcone } & Props) {
  const Desenho = icones[nome];
  return <Desenho {...resto} />;
}
