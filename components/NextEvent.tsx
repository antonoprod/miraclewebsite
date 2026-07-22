import Link from "next/link";
import { nextEvent } from "@/data/events";

export default function NextEvent() {
  return (
    <section className="border-t border-neutral-800 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-neutral-500">
          Next Event
        </p>
        <Link href={`/events/${nextEvent.slug}`} className="group block">
          <h2 className="text-4xl font-semibold transition group-hover:text-neutral-300 md:text-6xl">
            {nextEvent.name}
          </h2>
          <p className="mt-4 text-neutral-400">
            {nextEvent.displayDate} · {nextEvent.venue} · {nextEvent.city}
          </p>
        </Link>
      </div>
    </section>
  );
}
