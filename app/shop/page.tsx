import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import ShopCatalog from "@/components/ShopCatalog";

export const metadata: Metadata = {
  title: "Drops",
  description: "Drops limitados de Miracle: camisetas, gorras y colaboraciones.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-14">
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-semibold tracking-[-0.04em] transition hover:text-neutral-400"
          >
            MIRACLE
          </Link>
          <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
            Goods
          </p>
        </nav>

        <header className="py-24 md:py-32">
          <p className="text-xs uppercase tracking-[0.28em] text-neutral-500">
            Shop / Drops
          </p>
          <h1 className="mt-5 text-6xl font-semibold tracking-[-0.055em] md:text-8xl lg:text-9xl">
            Miracle Goods
          </h1>
        </header>

        <ShopCatalog />
      </div>
      <div className="mt-24">
        <Footer />
      </div>
    </main>
  );
}
