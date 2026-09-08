import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-[75svh] place-items-center px-5 pt-24 text-center">
      <div>
        <p className="font-display text-6xl font-600 text-destaque sm:text-7xl">404</p>
        <h1 className="mt-5 font-display text-2xl font-600 text-menta sm:text-3xl">
          Página não encontrada
        </h1>
        <p className="mx-auto mt-4 max-w-md text-menta/55">
          O endereço acessado não existe ou foi movido.
        </p>
        <Link
          href="/"
          className="botao-luz alvo-toque mt-9 inline-flex items-center rounded-full px-7 py-3.5 font-600"
        >
          Voltar para o início
        </Link>
      </div>
    </section>
  );
}
