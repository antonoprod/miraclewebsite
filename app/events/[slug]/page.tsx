import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { events, getEventBySlug } from "@/data/events";

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return {};

  return {
    title: event.name,
    description: event.description,
    alternates: { canonical: `/events/${event.slug}` },
    openGraph: {
      title: event.name,
      description: event.description,
      url: `/events/${event.slug}`,
      images: [{ url: event.image }],
    },
  };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <>
      <main className="min-h-screen bg-black px-6 py-24 text-white">
        <article className="mx-auto max-w-6xl">
        <nav className="flex items-center justify-between gap-6">
          <Link
            href="/"
            className="text-lg font-semibold tracking-[-0.04em] transition hover:text-neutral-400"
          >
            MIRACLE
          </Link>
          <Link
            href="/events"
            className="text-sm uppercase tracking-[0.2em] text-neutral-500 transition hover:text-white"
          >
            ← Events
          </Link>
        </nav>

        <div className="mt-20 grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(320px,480px)] md:items-start">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
              {event.displayDate} · {event.city}
            </p>

            <h1 className="mt-4 text-6xl font-semibold tracking-tight md:text-8xl">
              {event.name}
            </h1>

            <div className="mt-16 border-t border-neutral-800 pt-10">
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
                Location
              </p>
              <p className="mt-4 text-2xl">{event.venue}</p>
              <p className="mt-1 text-neutral-400">{event.city}</p>

              <p className="mt-10 max-w-xl text-lg leading-relaxed text-neutral-400">
                {event.description}
              </p>

              {event.ticketUrl ? (
                <a
                  href={event.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-12 inline-flex border border-white px-7 py-4 text-sm uppercase tracking-[0.22em] transition hover:bg-white hover:text-black"
                >
                  Buy tickets ↗
                </a>
              ) : null}
            </div>
          </div>

          <div className="relative aspect-[1055/1491] overflow-hidden bg-neutral-900">
            <Image
              src={event.image}
              alt={`Poster for ${event.name}`}
              fill
              priority
              sizes="(min-width: 768px) 480px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
