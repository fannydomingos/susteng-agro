import Image from "next/image";
import { Rotulo, Secao, Surge, Titulo } from "@/components/ui";
import { parceiros, reconhecimentos } from "@/lib/conteudo";

/**
 * PARCEIROS
 * Faixa clara: as logos vêm de fundo branco, então aqui elas aparecem direto,
 * sem placa nenhuma por baixo. Os reconhecimentos viram lista com régua em vez
 * de pastilhas.
 */
export default function Parceiros() {
  // a fita é duplicada para o loop não ter emenda visível
  const fita = [...parceiros, ...parceiros];

  return (
    <Secao id="parceiros" rotulada="parceiros-titulo" tema="claro">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <Rotulo>Nossos parceiros</Rotulo>
          <Titulo
            id="parceiros-titulo"
            texto="Rede pública e privada de economia circular"
            destaque={["circular"]}
            className="mt-6 font-display text-[2rem] font-600 leading-[1.05] tracking-tight sm:text-5xl"
          />
        </div>
        <Surge delay={0.08} className="lg:pt-4">
          <p className="text-base leading-relaxed text-verde-900/75 sm:text-lg">
            A operação da SustentAgro depende de uma rede: universidades e institutos que dão
            suporte técnico, órgãos públicos que abrem caminho para a destinação do resíduo e
            programas de inovação que financiam as etapas de crescimento.
          </p>
        </Surge>
      </div>

      {/* -------------------------------------------- fita de logos */}
      <Surge delay={0.12}>
        <div className="marquee relative mt-14 overflow-hidden py-2 sm:mt-16">
          <ul className="marquee-fita flex w-max items-center gap-12 sm:gap-16">
            {fita.map((p, i) => (
              <li key={p.nome + i} aria-hidden={i >= parceiros.length}>
                <div className="relative h-12 w-36 opacity-75 transition-opacity duration-500 hover:opacity-100 sm:h-14 sm:w-44">
                  <Image
                    src={p.logo}
                    alt={i < parceiros.length ? p.nome : ""}
                    fill
                    quality={90}
                    sizes="180px"
                    className="object-contain"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Surge>

      {/* -------------------------------------------- reconhecimentos */}
      <Surge delay={0.16}>
        <div className="mt-16 sm:mt-20">
          <p className="rotulo text-verde-600">Reconhecimentos</p>
          <ul className="mt-7 grid gap-x-16 sm:grid-cols-2">
            {reconhecimentos.map((r, i) => (
              <li
                key={r}
                className="flex items-start gap-4 border-b border-verde-950/10 py-5 text-[0.95rem] leading-snug text-verde-900/80"
              >
                <span aria-hidden="true" className="rotulo shrink-0 pt-1 text-verde-700/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      </Surge>
    </Secao>
  );
}
