import Link from "next/link";
import ClearCart from "@/components/ClearCart";
import Footer from "@/components/Footer";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;
  let paid = false;
  let liveMode = false;

  if (sessionId?.startsWith("cs_")) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(sessionId);
      paid = session.payment_status === "paid";
      liveMode = session.livemode;
    } catch {
      paid = false;
    }
  }

  return (
    <>
      {paid && <ClearCart />}
      <main className="min-h-screen bg-black px-6 py-24 text-white">
        <section className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
            {paid ? "Pago completado" : "Pago pendiente de verificación"}
          </p>
          <h1 className="mt-6 text-5xl font-semibold tracking-[-0.05em] md:text-7xl">
            {paid ? "Gracias." : "Estamos comprobando el pago."}
          </h1>
          <p className="mx-auto mt-8 max-w-lg leading-relaxed text-neutral-400">
            {paid
              ? liveMode
                ? "Stripe ha confirmado el pago. Recibirás la confirmación y los datos del pedido en el email indicado durante el Checkout."
                : "Stripe ha confirmado el pago de prueba. No se ha efectuado ningún cargo real."
              : "La bolsa no se ha vaciado. Si el pago se completó, la confirmación llegará al email indicado durante el Checkout."}
          </p>
          <Link href="/shop" className="mt-10 inline-block border border-white px-6 py-4 text-xs uppercase tracking-[0.2em] transition hover:bg-white hover:text-black">
            Volver a Drops
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
