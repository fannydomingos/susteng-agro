import RevealText, { FadeUp } from "@/components/RevealText";
import { fichaTecnica } from "@/lib/conteudo";

function Tabela({
  titulo,
  linhas,
}: {
  titulo: string;
  linhas: { parametro: string; unidade: string; faixa: string }[];
}) {
  return (
    // min-w-0 é essencial: sem ele o item de grid herda min-width:auto e a
    // tabela de 420px empurra a página inteira em telas estreitas.
    <div className="min-w-0 overflow-hidden rounded-marca border border-verde-900/10 bg-white">
      <div className="bg-verde-700 px-5 py-4 sm:px-7">
        <h3 className="font-display text-base font-600 text-white sm:text-lg">{titulo}</h3>
      </div>
      {/* tabela rola sozinha em telas estreitas, sem estourar a página */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] border-collapse text-left">
          <thead>
            <tr className="border-b border-verde-900/10 bg-off">
              <th scope="col" className="px-5 py-3 text-legenda font-600 uppercase tracking-wider text-tinta-suave sm:px-7">
                Parâmetro
              </th>
              <th scope="col" className="px-5 py-3 text-legenda font-600 uppercase tracking-wider text-tinta-suave">
                Unidade
              </th>
              <th scope="col" className="px-5 py-3 text-legenda font-600 uppercase tracking-wider text-tinta-suave sm:px-7">
                Faixa
              </th>
            </tr>
          </thead>
          <tbody>
            {linhas.map((l) => (
              <tr key={l.parametro} className="border-b border-verde-900/[0.07] last:border-0">
                <th scope="row" className="px-5 py-3.5 text-sm font-500 text-verde-900 sm:px-7">
                  {l.parametro}
                </th>
                <td className="px-5 py-3.5 text-sm text-tinta-suave">{l.unidade}</td>
                <td className="px-5 py-3.5 text-sm font-600 text-verde-600 sm:px-7">{l.faixa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function FichaTecnica() {
  return (
    <section id="ficha-tecnica" aria-labelledby="ficha-titulo" className="bg-off py-20 sm:py-28">
      <div className="container-marca">
        <div className="max-w-3xl">
          <p className="text-legenda font-600 uppercase tracking-wider text-verde-500">
            Ficha técnica agronômica
          </p>
          <RevealText
            id="ficha-titulo"
            texto="Fibra de coco 70/30 — os números do produto"
            destaque={["70/30"]}
            className="mt-4 font-display text-3xl font-700 leading-[1.12] text-verde-900 sm:text-4xl lg:text-5xl"
          />
          <FadeUp delay={0.1}>
            <p className="mt-5 text-base leading-relaxed text-tinta-suave sm:text-lg">
              {fichaTecnica.intro}
            </p>
          </FadeUp>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <FadeUp className="min-w-0">
            <Tabela titulo="Características físicas" linhas={fichaTecnica.fisicas} />
          </FadeUp>
          <FadeUp delay={0.08} className="min-w-0">
            <Tabela titulo="Características químicas" linhas={fichaTecnica.quimicas} />
          </FadeUp>
        </div>

        <FadeUp delay={0.1}>
          <div className="mt-5 rounded-marca border-l-4 border-verde-500 bg-white p-6 sm:p-8">
            <h3 className="font-display text-base font-600 text-verde-900">
              Recomendações de manejo
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-tinta-suave sm:text-base">
              {fichaTecnica.manejo}
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
