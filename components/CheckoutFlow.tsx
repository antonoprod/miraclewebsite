"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  cartItemDelivery,
  cartSubtotal,
  readCart,
  type CartItem,
} from "@/data/cart";

export default function CheckoutFlow() {
  const testMode = process.env.NEXT_PUBLIC_STRIPE_MODE !== "live";
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [postalCode, setPostalCode] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setItems(readCart());
      setLoaded(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const provisionalShipping = useMemo(() => {
    if (!/^\d{5}$/.test(postalCode)) return null;
    const province = Number(postalCode.slice(0, 2));
    if ([35, 38, 51, 52].includes(province)) return "unavailable";
    return province === 7 ? 7.9 : 4.9;
  }, [postalCode]);

  async function startCheckout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            variant: item.optionValue ?? "",
            quantity: item.quantity,
          })),
          shippingPostalCode: postalCode,
        }),
      });
      const result = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !result.url) {
        throw new Error(result.error ?? "No se pudo iniciar el pago.");
      }
      window.location.assign(result.url);
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "No se pudo iniciar el pago.",
      );
      setSubmitting(false);
    }
  }

  if (!loaded) return <div className="min-h-[40vh]" />;

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

  const hasNicaso = items.some((item) => item.productId === "miracle-x-nicaso");
  const hasCap = items.some((item) => item.productId === "miracle-cap");
  const shippingAmount =
    typeof provisionalShipping === "number" ? provisionalShipping : 0;

  return (
    <div className="grid gap-16 py-16 lg:grid-cols-[minmax(0,1fr)_380px] lg:py-24">
      <section>
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
          Checkout seguro · Stripe{testMode ? " Sandbox" : ""}
        </p>
        <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em] md:text-7xl">
          Entrega
        </h1>
        <p className="mt-8 max-w-xl leading-relaxed text-neutral-400">
          Confirma primero la zona de envío. En el Checkout alojado de Stripe
          introducirás la dirección completa, el email, el teléfono y los datos
          de pago.
        </p>

        <form onSubmit={startCheckout} className="mt-14 max-w-xl">
          <label>
            <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-neutral-500">
              Código postal de entrega
            </span>
            <input
              required
              name="postalCode"
              value={postalCode}
              onChange={(event) => setPostalCode(event.target.value.replace(/\D/g, "").slice(0, 5))}
              inputMode="numeric"
              pattern="\d{5}"
              autoComplete="postal-code"
              placeholder="46001"
              className="w-full border-b border-neutral-700 bg-transparent px-0 py-3 outline-none transition focus:border-white"
            />
          </label>

          <div className="mt-8 border-y border-neutral-800 py-6 text-sm text-neutral-400">
            {provisionalShipping === "unavailable" ? (
              <p className="text-red-300">Canarias, Ceuta y Melilla no están disponibles.</p>
            ) : typeof provisionalShipping === "number" ? (
              <p>
                {provisionalShipping === 7.9 ? "Baleares" : "España peninsular"} ·{" "}
                {provisionalShipping.toFixed(2).replace(".", ",")} €
              </p>
            ) : (
              <p>Introduce el código postal para calcular el envío.</p>
            )}
            <p className="mt-3">
              {hasNicaso
                ? hasCap
                  ? "PRE-ORDER: gorra 4 semanas y camiseta 3–5 semanas. Se enviarán juntas cuando todo esté preparado."
                  : "PRE-ORDER: entrega estimada en 3–5 semanas."
                : "PRE-ORDER: entrega estimada de la gorra en 4 semanas."}
            </p>
          </div>

          {error && (
            <p role="alert" className="mt-6 text-sm text-red-300">
              {error}
            </p>
          )}
          <label className="mt-8 flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-neutral-400">
            <input
              required
              type="checkbox"
              checked={termsAccepted}
              onChange={(event) => setTermsAccepted(event.target.checked)}
              className="mt-1 h-4 w-4 accent-white"
            />
            <span>
              He revisado el pedido y acepto las{" "}
              <Link href="/condiciones" className="text-white underline underline-offset-4">
                condiciones de compra
              </Link>{" "}
              y la{" "}
              <Link href="/privacidad" className="text-white underline underline-offset-4">
                política de privacidad
              </Link>
              .
            </span>
          </label>
          <button
            type="submit"
            disabled={
              submitting ||
              !termsAccepted ||
              provisionalShipping === "unavailable" ||
              typeof provisionalShipping !== "number"
            }
            className="mt-8 w-full bg-white px-6 py-4 text-xs uppercase tracking-[0.2em] text-black transition enabled:hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Abriendo Stripe…" : "Continuar al pago seguro"}
          </button>
          <p className="mt-4 text-xs leading-relaxed text-neutral-500">
            {testMode
              ? "Entorno de prueba: no se efectuará ningún cargo real. "
              : "Pago seguro procesado por Stripe. "}
            El servidor vuelve a validar productos, variantes, cantidades,
            precios, stock y zona de envío.
          </p>
        </form>
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
                    {item.optionName ? `${item.optionLabel}: ${item.optionName} · ` : ""}
                    Cantidad: {item.quantity}
                  </p>
                  {cartItemDelivery(item.productId) && (
                    <p className="mt-2 text-[0.68rem] leading-relaxed text-neutral-500">
                      {cartItemDelivery(item.productId)}
                    </p>
                  )}
                </div>
                <p className="shrink-0">{item.price * item.quantity} €</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 space-y-3 border-t border-neutral-800 pt-6 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>{cartSubtotal(items)} €</span></div>
          <div className="flex justify-between text-neutral-500">
            <span>Envío</span>
            <span>{shippingAmount ? `${shippingAmount.toFixed(2).replace(".", ",")} €` : "Por calcular"}</span>
          </div>
          <div className="flex justify-between border-t border-neutral-800 pt-4 text-lg">
            <span>Total provisional</span>
            <span>{(cartSubtotal(items) + shippingAmount).toFixed(2).replace(".", ",")} €</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
