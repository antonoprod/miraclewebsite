"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LatestDrop() {
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <section className="border-t border-neutral-800 bg-black px-6 py-24 text-white">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-end">
        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-neutral-500">
            Latest Drop
          </p>

          <h2 className="text-5xl font-semibold tracking-tight md:text-7xl">
            Miracle Goods
          </h2>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-neutral-400">
            Limited pieces created with friends, artists and the Miracle community.
          </p>

          <Link
            href="/shop"
            className="mt-10 inline-block border-b border-white pb-1 text-sm uppercase tracking-[0.2em] transition hover:text-neutral-400"
          >
            View Drops
          </Link>
        </div>

        <div
          className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-neutral-900"
          onMouseEnter={() =>
            setImageIndex((currentIndex) => (currentIndex === 0 ? 1 : 0))
          }
        >
          <Image
            src="/drops/miracle-nicaso-shirt-back.JPG"
            alt="Camiseta Miracle x Nicaso vista por detrás"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className={`object-cover transition-opacity duration-700 ease-out ${
              imageIndex === 0 ? "opacity-100" : "opacity-0"
            }`}
          />
          <Image
            src="/drops/miracle-cap-live.jpg"
            alt="Gorra Miracle taronja"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className={`object-cover object-center transition-opacity duration-700 ease-out ${
              imageIndex === 1 ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </div>
    </section>
  );
}
