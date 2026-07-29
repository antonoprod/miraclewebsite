import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { events } from "@/data/events";

export const metadata: Metadata = {
  title: "Eventos",
  description: "Próximos eventos de Miracle.",
  alternates: { canonical: "/events" },
};

export default function EventsPage() {
  return (
    <>
      <main className="min-h-screen bg-black px-6 py-24 text-white">
        <div className="mx-auto max-w-6xl">
        <nav className="mb-24 flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-semibold tracking-[-0.04em] transition hover:text-neutral-400"
          >
            MIRACLE
          </Link>
          <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
            Events
          </p>
        </nav>

        <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
          Events
        </p>

        <h1 className="mt-4 text-6xl font-semibold tracking-tight md:text-8xl">
          Upcoming
        </h1>

        <div className="mt-16 border-t border-neutral-800">
          {events.map((event) => (
            <article
              key={event.slug}
              className="group grid gap-8 border-b border-neutral-800 py-10 md:grid-cols-[minmax(0,1fr)_minmax(240px,360px)] md:items-end"
            >
              <div className="md:pb-4">
                <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
                  {event.displayDate} · {event.city}
                </p>
                <Link href={`/events/${event.slug}`}>
                  <h2 className="mt-4 text-4xl font-semibold tracking-tight transition hover:text-neutral-300 md:text-6xl">
                    {event.name}
                  </h2>
                </Link>
                <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 text-sm uppercase tracking-[0.2em]">
                  <Link
                    href={`/events/${event.slug}`}
                    className="transition hover:text-neutral-400"
                  >
                    View event →
                  </Link>
                  {event.ticketUrl ? (
                    <a
                      href={event.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition hover:text-neutral-400"
                    >
                      Buy tickets ↗
                    </a>
                  ) : null}
                </div>
              </div>

              <Link
                href={`/events/${event.slug}`}
                className="relative aspect-[1055/1491] overflow-hidden bg-neutral-900"
              >
                  <Image
                    src={event.image}
                    alt={`Poster for ${event.name}`}
                    fill
                    sizes="(min-width: 768px) 360px, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
              </Link>
            </article>
          ))}
        </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
