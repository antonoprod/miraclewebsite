import Link from "next/link";
import type { ReactNode } from "react";

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
};

export function LegalPage({ eyebrow, title, intro, children }: LegalPageProps) {
  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <nav className="flex items-center justify-between text-sm text-neutral-500">
          <Link href="/" className="text-white transition hover:text-neutral-300">
            MIRACLE
          </Link>
          <Link href="/" className="transition hover:text-white">
            ← Volver
          </Link>
        </nav>

        <header className="border-b border-neutral-800 pb-12 pt-20">
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">{eyebrow}</p>
          <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em] md:text-7xl">{title}</h1>
          <p className="mt-8 max-w-2xl leading-relaxed text-neutral-400">{intro}</p>
          <p className="mt-4 text-sm text-neutral-600">Última actualización: 22 de julio de 2026</p>
        </header>

        <article className="space-y-12 py-14 leading-relaxed text-neutral-300 [&_a]:text-white [&_a]:underline [&_a]:underline-offset-4 [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:tracking-[-0.03em] [&_li]:ml-5 [&_li]:list-disc [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:space-y-2">
          {children}
        </article>

        <footer className="border-t border-neutral-800 py-10 text-sm text-neutral-500">
          <p>
            Consultas: <a href="mailto:info@miraclebgo.com">info@miraclebgo.com</a>
          </p>
        </footer>
      </div>
    </main>
  );
}
