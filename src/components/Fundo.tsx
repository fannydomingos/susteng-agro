/**
 * FUNDO DA PÁGINA
 * Uma cor sólida e uma camada fina de grão. Nada mais.
 *
 * A cor é chapada de propósito. Havia aqui um degradê radial mais claro no
 * topo, e como esta camada é fixa, o topo da tela ficava sempre mais verde
 * que o resto: na emenda entre a hero e a seção seguinte aparecia um degrau
 * horizontal, e ele mudava de lugar conforme a rolagem, então não havia cor
 * fixa que casasse. O degradê de profundidade passou para onde ele pode
 * terminar numa cor certa: a base da hero. A variação nas demais seções vem
 * das manchas de luz (prop `luz` da Secao), que acompanham a rolagem.
 *
 * Fica fixo atrás de tudo, então o custo é de um único elemento pintado.
 * As seções claras têm fundo próprio e cobrem esta camada.
 */
export default function Fundo() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-abismo" />
      <div className="grao absolute inset-0" />
    </div>
  );
}
