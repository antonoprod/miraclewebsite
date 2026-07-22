import Link from "next/link";
import CheckoutFlow from "@/components/CheckoutFlow";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white md:px-10 md:py-14">
      <div className="mx-auto max-w-7xl">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold tracking-[-0.04em] transition hover:text-neutral-400">
            MIRACLE
          </Link>
          <Link href="/shop" className="text-xs uppercase tracking-[0.22em] text-neutral-500 transition hover:text-white">
            ← Volver a Drops
          </Link>
        </nav>
        <CheckoutFlow />
      </div>
    </main>
  );
}
