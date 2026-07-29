"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  cartCount,
  cartSubtotal,
  readCart,
  writeCart,
  type CartItem,
} from "@/data/cart";
import { products, type Product } from "@/data/products";

function ProductCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (product: Product, optionValue: string) => void;
}) {
  const [selectedOption, setSelectedOption] = useState(
    product.options?.[0]?.value ?? "",
  );
  const [added, setAdded] = useState(false);
  const soldOut = product.status === "sold-out";
  const preOrder = product.status === "pre-order";

  function addToBag() {
    onAdd(product, selectedOption);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <article className="group flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
        <Image
          src={product.images[0]}
          alt={product.imageAlt}
          fill
          priority={product.id === "miracle-x-nicaso"}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className={`object-cover transition duration-700 ${
            product.images[1]
              ? "group-hover:opacity-0"
              : "group-hover:scale-[1.015]"
          } ${soldOut ? "grayscale" : ""}`}
        />

        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={`${product.imageAlt}, parte trasera`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover opacity-0 transition duration-700 group-hover:opacity-100"
          />
        )}

        <p className="absolute top-4 left-4 bg-black px-3 py-2 text-[0.65rem] uppercase tracking-[0.22em] text-white">
          {soldOut ? "Agotado" : preOrder ? "PRE-ORDER" : "Disponible"}
        </p>
      </div>

      <div className="flex flex-1 flex-col border-b border-neutral-800 py-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.22em] text-neutral-500">
              {product.category}
            </p>
            <h2 className="mt-2 text-2xl font-medium tracking-tight">
              {product.name}
            </h2>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-lg">{product.price ? `${product.price} €` : "—"}</p>
            {product.price && <p className="mt-1 text-xs text-neutral-500">+ envío</p>}
          </div>
        </div>

        {product.options && product.optionLabel && !soldOut && (
          <fieldset className="mt-8">
            <legend className="text-[0.68rem] uppercase tracking-[0.22em] text-neutral-500">
              {product.optionLabel}
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.options.map((option) => {
                const selected = selectedOption === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setSelectedOption(option.value)}
                    className={`flex min-h-11 items-center gap-2 border px-4 text-xs uppercase tracking-[0.16em] transition ${
                      selected
                        ? "border-white bg-white text-black"
                        : "border-neutral-700 hover:border-white"
                    }`}
                  >
                    {option.color && (
                      <span
                        className="h-3 w-3 rounded-full border border-black/20"
                        style={{ backgroundColor: option.color }}
                      />
                    )}
                    {option.label}
                  </button>
                );
              })}
            </div>

            {product.id === "miracle-cap" && selectedOption === "azul-fondo" && (
              <p className="mt-3 text-xs text-neutral-500">
                Imagen de Azul fondo próximamente.
              </p>
            )}
          </fieldset>
        )}

        {product.note && !soldOut && (
          <p className="mt-5 text-xs leading-relaxed text-neutral-500">{product.note}</p>
        )}

        <button
          type="button"
          disabled={soldOut}
          onClick={addToBag}
          className="mt-8 w-full border border-white px-5 py-4 text-xs uppercase tracking-[0.2em] transition enabled:hover:bg-white enabled:hover:text-black disabled:cursor-not-allowed disabled:border-neutral-800 disabled:text-neutral-600"
        >
          {soldOut ? "Agotado" : added ? "Añadido" : "Añadir a la bolsa"}
        </button>
      </div>
    </article>
  );
}

export default function ShopCatalog() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [bagOpen, setBagOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setItems(readCart()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  function updateCart(nextItems: CartItem[]) {
    setItems(nextItems);
    writeCart(nextItems);
  }

  function addItem(product: Product, optionValue: string) {
    if (!product.price) return;
    const option = product.options?.find((item) => item.value === optionValue);
    const key = `${product.id}:${optionValue || "default"}`;
    const existing = items.find((item) => item.key === key);
    const limit = option?.stock ?? 10;
    if ((existing?.quantity ?? 0) >= limit) return;
    const nextItems = existing
      ? items.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + 1 } : item,
        )
      : [
          ...items,
          {
            key,
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            optionLabel: product.optionLabel,
            optionValue: option?.value,
            optionName: option?.label,
            quantity: 1,
          },
        ];

    updateCart(nextItems);
    setBagOpen(true);
  }

  function changeQuantity(key: string, change: number) {
    const nextItems = items
      .map((item) => {
        if (item.key !== key) return item;
        const product = products.find((entry) => entry.id === item.productId);
        const option = product?.options?.find((entry) => entry.value === item.optionValue);
        const limit = option?.stock ?? 10;
        return { ...item, quantity: Math.min(limit, Math.max(0, item.quantity + change)) };
      })
      .filter((item) => item.quantity > 0);
    updateCart(nextItems);
  }

  return (
    <>
      <div className="flex items-end justify-between gap-6 border-b border-neutral-800 pb-6">
        <p className="max-w-xl text-neutral-400">
          Three Miracle drops. Two available as pre-order and the original
          T-shirt preserved in the archive.
        </p>
        <button
          type="button"
          onClick={() => setBagOpen(true)}
          className="shrink-0 text-xs uppercase tracking-[0.2em] transition hover:text-neutral-400"
        >
          Bolsa ({cartCount(items)})
        </button>
      </div>

      <div className="mt-10 grid gap-x-6 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={addItem} />
        ))}
      </div>

      <div
        aria-hidden={!bagOpen}
        className={`fixed inset-0 z-50 bg-black/70 transition-opacity duration-300 ${
          bagOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setBagOpen(false)}
      />
      <aside
        aria-label="Bolsa de compra"
        className={`fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-white p-6 text-black transition-transform duration-500 md:p-8 ${
          bagOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-neutral-200 pb-5">
          <h2 className="text-xl font-medium tracking-tight">
            Bolsa ({cartCount(items)})
          </h2>
          <button
            type="button"
            onClick={() => setBagOpen(false)}
            className="text-xs uppercase tracking-[0.18em]"
          >
            Cerrar
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6">
          {items.length === 0 ? (
            <p className="text-sm text-neutral-500">Tu bolsa está vacía.</p>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.key} className="grid grid-cols-[84px_1fr] gap-4">
                  <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
                    <Image src={item.image} alt={item.name} fill sizes="84px" className="object-cover" />
                  </div>
                  <div className="flex flex-col justify-between py-1">
                    <div className="flex justify-between gap-4">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        {item.optionName && (
                          <p className="mt-1 text-xs text-neutral-500">
                            {item.optionLabel}: {item.optionName}
                          </p>
                        )}
                      </div>
                      <p className="shrink-0 text-sm">{item.price * item.quantity} €</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <button type="button" onClick={() => changeQuantity(item.key, -1)} aria-label={`Reducir ${item.name}`}>
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => changeQuantity(item.key, 1)} aria-label={`Aumentar ${item.name}`}>
                        +
                      </button>
                      <button type="button" onClick={() => updateCart(items.filter((entry) => entry.key !== item.key))} className="ml-auto text-neutral-500 underline underline-offset-4">
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-neutral-200 pt-5">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{cartSubtotal(items)} €</span>
          </div>
          <p className="mt-2 text-xs text-neutral-500">
            Los gastos de envío se calcularán al confirmar.
          </p>
          {items.length > 0 && (
            <Link href="/checkout" className="mt-6 block bg-black px-5 py-4 text-center text-xs uppercase tracking-[0.2em] text-white transition hover:bg-neutral-800">
              Continuar al checkout
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
