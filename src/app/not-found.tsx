import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-[70svh] place-items-center bg-verde-950 px-5 pt-24 text-center">
      <div>
        <p className="font-display text-6xl font-700 text-neon sm:text-7xl">404</p>
        <h1 className="mt-4 font-display text-2xl font-600 text-white sm:text-3xl">
          Página não encontrada
        </h1>
        <p className="mx-auto mt-3 max-w-md text-white/60">
          O endereço que você abriu não existe ou foi movido.
        </p>
        <Link
          href="/"
          className="alvo-toque mt-8 inline-flex items-center rounded-full bg-verde-500 px-7 py-3.5 font-600 text-white transition-colors hover:bg-verde-400"
        >
          Voltar para o início
        </Link>
      </div>
    </section>
  );
}
