"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { CART_STORAGE_KEY, cartSubtotal, readCart, type CartItem } from "@/data/cart";

type Step = "details" | "review" | "confirmed";
type ShippingDetails = {
  name: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
};

const emptyDetails: ShippingDetails = {
  name: "",
  email: "",
  phone: "",
  address: "",
  postalCode: "",
  city: "",
  country: "ES",
};

export default function CheckoutFlow() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [step, setStep] = useState<Step>("details");
  const [details, setDetails] = useState<ShippingDetails>(emptyDetails);

  useEffect(() => {
    setItems(readCart());
    setLoaded(true);
  }, []);

  function reviewOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setDetails({
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      address: String(form.get("address") ?? ""),
      postalCode: String(form.get("postalCode") ?? ""),
      city: String(form.get("city") ?? ""),
      country: String(form.get("country") ?? "ES"),
    });
    setStep("review");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function confirmOrder() {
    window.localStorage.removeItem(CART_STORAGE_KEY);
    setStep("confirmed");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!loaded) return <div className="min-h-[40vh]" />;

  if (step === "confirmed") {
    return (
      <section className="mx-auto max-w-2xl py-24 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Pedido de prueba recibido</p>
        <h1 className="mt-6 text-5xl font-semibold tracking-[-0.05em] md:text-7xl">Gracias{details.name ? `, ${details.name}` : ""}.</h1>
        <p className="mx-auto mt-8 max-w-lg leading-relaxed text-neutral-400">
          El flujo funciona, pero todavía no se ha realizado ningún cobro ni se ha enviado un pedido real. El pago se activará en la siguiente fase.
        </p>
        <Link href="/shop" className="mt-10 inline-block border border-white px-6 py-4 text-xs uppercase tracking-[0.2em] transition hover:bg-white hover:text-black">
          Volver a Drops
        </Link>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="py-24">
        <h1 className="text-5xl font-semibold tracking-[-0.05em]">Tu bolsa está vacía.</h1>
        <Link href="/shop" className="mt-10 inline-block border border-white px-6 py-4 text-xs uppercase tracking-[0.2em]">
          Ver Drops
        </Link>
      </section>
    );
  }

  return (
    <div className="grid gap-16 py-16 lg:grid-cols-[minmax(0,1fr)_380px] lg:py-24">
      <section>
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
          Checkout · {step === "details" ? "01 Datos" : "02 Revisión"}
        </p>
        <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em] md:text-7xl">
          {step === "details" ? "Envío" : "Revisa tu pedido"}
        </h1>

        {step === "details" ? (
          <form onSubmit={reviewOrder} className="mt-14 grid gap-6 md:grid-cols-2">
            <label className="md:col-span-2">
              <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-neutral-500">Nombre completo</span>
              <input required name="name" defaultValue={details.name} autoComplete="name" className="w-full border-b border-neutral-700 bg-transparent px-0 py-3 outline-none transition focus:border-white" />
            </label>
            <label>
              <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-neutral-500">Email</span>
              <input required type="email" name="email" defaultValue={details.email} autoComplete="email" className="w-full border-b border-neutral-700 bg-transparent px-0 py-3 outline-none transition focus:border-white" />
            </label>
            <label>
              <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-neutral-500">Teléfono</span>
              <input required type="tel" name="phone" defaultValue={details.phone} autoComplete="tel" className="w-full border-b border-neutral-700 bg-transparent px-0 py-3 outline-none transition focus:border-white" />
            </label>
            <label className="md:col-span-2">
              <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-neutral-500">Dirección</span>
              <input required name="address" defaultValue={details.address} autoComplete="street-address" className="w-full border-b border-neutral-700 bg-transparent px-0 py-3 outline-none transition focus:border-white" />
            </label>
            <label>
              <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-neutral-500">Código postal</span>
              <input required name="postalCode" defaultValue={details.postalCode} autoComplete="postal-code" className="w-full border-b border-neutral-700 bg-transparent px-0 py-3 outline-none transition focus:border-white" />
            </label>
            <label>
              <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-neutral-500">Ciudad</span>
              <input required name="city" defaultValue={details.city} autoComplete="address-level2" className="w-full border-b border-neutral-700 bg-transparent px-0 py-3 outline-none transition focus:border-white" />
            </label>
            <label className="md:col-span-2">
              <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-neutral-500">País</span>
              <select required name="country" defaultValue={details.country} className="w-full border-b border-neutral-700 bg-black px-0 py-3 outline-none transition focus:border-white">
                <option value="ES">España</option>
              </select>
            </label>
            <button type="submit" className="mt-6 bg-white px-6 py-4 text-xs uppercase tracking-[0.2em] text-black transition hover:bg-neutral-200 md:col-span-2">
              Revisar pedido
            </button>
          </form>
        ) : (
          <div className="mt-14 border-t border-neutral-800 pt-8">
            <p className="max-w-xl leading-relaxed text-neutral-400">
              Comprueba los artículos antes de confirmar. Los gastos de envío y el pago real todavía no están activos.
            </p>
            <div className="mt-10 grid gap-8 border-y border-neutral-800 py-8 text-sm sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">Contacto</p>
                <p className="mt-3">{details.name}</p>
                <p className="mt-1 text-neutral-400">{details.email}</p>
                <p className="mt-1 text-neutral-400">{details.phone}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">Entrega</p>
                <p className="mt-3">{details.address}</p>
                <p className="mt-1 text-neutral-400">{details.postalCode} {details.city}</p>
                <p className="mt-1 text-neutral-400">España</p>
              </div>
            </div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={confirmOrder} className="bg-white px-6 py-4 text-xs uppercase tracking-[0.2em] text-black transition hover:bg-neutral-200">
                Confirmar pedido de prueba
              </button>
              <button type="button" onClick={() => setStep("details")} className="border border-neutral-700 px-6 py-4 text-xs uppercase tracking-[0.2em] transition hover:border-white">
                Editar datos
              </button>
            </div>
          </div>
        )}
      </section>

      <aside className="border-t border-neutral-800 pt-8 lg:border-t-0 lg:border-l lg:pl-8">
        <h2 className="text-xs uppercase tracking-[0.22em] text-neutral-500">Resumen</h2>
        <div className="mt-6 space-y-6">
          {items.map((item) => (
            <div key={item.key} className="grid grid-cols-[72px_1fr] gap-4">
              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
                <Image src={item.image} alt={item.name} fill sizes="72px" className="object-cover" />
              </div>
              <div className="flex justify-between gap-4 py-1 text-sm">
                <div>
                  <p>{item.name}</p>
                  <p className="mt-1 text-xs text-neutral-500">
                    {item.optionName ? `${item.optionLabel}: ${item.optionName} · ` : ""}Cantidad: {item.quantity}
                  </p>
                </div>
                <p className="shrink-0">{item.price * item.quantity} €</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 space-y-3 border-t border-neutral-800 pt-6 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>{cartSubtotal(items)} €</span></div>
          <div className="flex justify-between text-neutral-500"><span>Envío</span><span>Por calcular</span></div>
          <div className="flex justify-between border-t border-neutral-800 pt-4 text-lg"><span>Total provisional</span><span>{cartSubtotal(items)} €</span></div>
        </div>
      </aside>
    </div>
  );
}
