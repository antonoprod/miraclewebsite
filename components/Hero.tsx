"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { nextEvent } from "@/data/events";

export default function Hero() {
  const [dropPreviewIndex, setDropPreviewIndex] = useState(1);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      <Image
        src="/hero/miracle-crowd.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="hero-slide scale-105 object-cover object-[center_28%]"
      />
      <Image
        src="/hero/miracle-turntable.jpg"
        alt=""
        fill
        sizes="100vw"
        className="hero-slide hero-slide-secondary scale-105 object-cover object-[center_55%]"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/65" />

      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center px-6 text-center">
        <h1 className="text-7xl font-semibold tracking-[-0.06em] md:text-9xl">
          MIRACLE
        </h1>

        <p className="mt-8 text-sm uppercase tracking-[0.28em] text-neutral-300 md:text-base">
          Music. Creativity. Community.
        </p>

        <div className="mt-20 flex w-full max-w-2xl items-center justify-between gap-6">
          <div className="group relative">
            <Link
              href={`/events/${nextEvent.slug}`}
              className="inline-flex rounded-full border border-white px-8 py-3 text-sm uppercase tracking-[0.2em] transition duration-300 hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black focus-visible:outline-none"
            >
              Next Event
            </Link>

            <div
              aria-hidden="true"
              data-testid="event-preview"
              className="pointer-events-none absolute bottom-full left-0 mb-6 hidden w-56 translate-y-3 overflow-hidden border border-white/20 bg-black text-left opacity-0 shadow-2xl shadow-black/40 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 md:block"
            >
              <div className="relative aspect-[1055/1491] w-full bg-neutral-900">
                <Image
                  src={nextEvent.image}
                  alt=""
                  fill
                  sizes="224px"
                  className="object-cover"
                />
              </div>

              <div className="space-y-3 border-t border-white/15 p-5">
                <p className="text-lg font-medium tracking-tight text-white">
                  {nextEvent.name}
                </p>
                <div className="flex items-end justify-between gap-4 text-[0.68rem] uppercase tracking-[0.18em] text-neutral-400">
                  <p>{nextEvent.displayDate}</p>
                  <p className="text-right">
                    {nextEvent.venue} · {nextEvent.city}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="group relative"
            onMouseEnter={() =>
              setDropPreviewIndex((currentIndex) =>
                currentIndex === 0 ? 1 : 0,
              )
            }
          >
            <Link
              href="/shop"
              className="inline-flex rounded-full border border-white px-8 py-3 text-sm uppercase tracking-[0.2em] transition duration-300 hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black focus-visible:outline-none"
            >
              Drops
            </Link>

            <div
              aria-hidden="true"
              data-testid="drop-preview"
              className="pointer-events-none absolute right-0 bottom-full mb-6 hidden w-56 translate-y-3 overflow-hidden border border-white/20 bg-black text-left opacity-0 shadow-2xl shadow-black/40 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 md:block"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-900">
                <Image
                  src="/drops/miracle-nicaso-shirt-back.JPG"
                  alt=""
                  fill
                  sizes="224px"
                  className={`object-cover transition-opacity duration-500 ease-out ${
                    dropPreviewIndex === 0 ? "opacity-100" : "opacity-0"
                  }`}
                />
                <Image
                  src="/drops/miracle-cap.jpg"
                  alt=""
                  fill
                  sizes="224px"
                  className={`object-cover object-[center_38%] transition-opacity duration-500 ease-out ${
                    dropPreviewIndex === 1 ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>

              <div className="space-y-3 border-t border-white/15 p-5">
                <p className="text-lg font-medium tracking-tight text-white">
                  Miracle Goods
                </p>
                <div className="flex items-end justify-between gap-4 text-[0.68rem] uppercase tracking-[0.18em] text-neutral-400">
                  <p>Limited drop</p>
                  <p className="text-right">T-shirt · Cap</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
