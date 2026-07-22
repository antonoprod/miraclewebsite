import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-5 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Miracle</p>
        <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-3">
          <Link href="/privacidad" className="transition hover:text-white">
            Privacidad
          </Link>
          <Link href="/condiciones" className="transition hover:text-white">
            Condiciones
          </Link>
          <a href="mailto:info@miraclebgo.com" className="transition hover:text-white">
            Contacto
          </a>
        </nav>
        <p>Bona Gent Only</p>
      </div>
    </footer>
  );
}
