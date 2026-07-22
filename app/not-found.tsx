import Link from "next/link";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <main className="relative flex min-h-[80vh] items-center overflow-hidden bg-black px-6 py-24 text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(127,29,29,0.32),transparent_42%)]"
        />
        <div className="relative mx-auto w-full max-w-5xl">
          <Link
            href="/"
            className="text-lg font-semibold tracking-[-0.04em] transition hover:text-neutral-400"
          >
            MIRACLE
          </Link>

          <div className="mt-24 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              Error 404
            </p>
            <h1 className="mt-5 text-6xl font-semibold tracking-[-0.06em] sm:text-8xl md:text-9xl">
              Lost in the night.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral-400">
              Esta página no existe o ya no está disponible. La música sigue en otro lugar.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="border border-white bg-white px-6 py-4 text-center text-xs uppercase tracking-[0.2em] text-black transition hover:bg-neutral-200"
              >
                Volver a Miracle
              </Link>
              <Link
                href="/events"
                className="border border-neutral-700 px-6 py-4 text-center text-xs uppercase tracking-[0.2em] transition hover:border-white"
              >
                Ver eventos
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
