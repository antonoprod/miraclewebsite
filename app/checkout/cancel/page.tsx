import Link from "next/link";
import Footer from "@/components/Footer";

export default function CheckoutCancelPage() {
  return (
    <>
      <main className="min-h-screen bg-black px-6 py-24 text-white">
        <section className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
            Pago cancelado
          </p>
          <h1 className="mt-6 text-5xl font-semibold tracking-[-0.05em] md:text-7xl">
            Tu bolsa sigue guardada.
          </h1>
          <p className="mx-auto mt-8 max-w-lg leading-relaxed text-neutral-400">
            No se ha realizado ningún cobro ni se ha descontado stock.
          </p>
          <Link href="/checkout" className="mt-10 inline-block border border-white px-6 py-4 text-xs uppercase tracking-[0.2em] transition hover:bg-white hover:text-black">
            Volver al checkout
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
