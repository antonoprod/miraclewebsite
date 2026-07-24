import "server-only";

export const STORE_CATALOG = {
  "miracle-cap": {
    id: "miracle-cap",
    name: "Gorra Miracle",
    unitAmount: 1800,
    variants: {
      taronja: { label: "Taronja", initialStock: 10 },
      "azul-fondo": { label: "Azul fondo", initialStock: 9 },
    },
  },
  "miracle-x-nicaso": {
    id: "miracle-x-nicaso",
    name: "Camiseta Miracle x Nicaso",
    unitAmount: 2500,
    variants: {
      s: { label: "Talla S" },
      m: { label: "Talla M" },
      l: { label: "Talla L" },
    },
  },
} as const;

export const MAX_QUANTITY_PER_LINE = 10;

export type StoreProductId = keyof typeof STORE_CATALOG;

export type CheckoutItem = {
  productId: StoreProductId;
  variant: string;
  quantity: number;
};

export type ShippingZone = "peninsula" | "baleares";

export function getShippingZone(postalCode: string): ShippingZone {
  const normalized = postalCode.trim();
  if (!/^\d{5}$/.test(normalized)) {
    throw new Error("Introduce un código postal español válido.");
  }

  const province = Number(normalized.slice(0, 2));
  if (province === 7) return "baleares";
  if ([35, 38, 51, 52].includes(province)) {
    throw new Error("No realizamos envíos a Canarias, Ceuta o Melilla.");
  }
  if (province < 1 || province > 52) {
    throw new Error("Introduce un código postal español válido.");
  }
  return "peninsula";
}

export function parseCheckoutItems(input: unknown): CheckoutItem[] {
  if (!Array.isArray(input) || input.length === 0 || input.length > 6) {
    throw new Error("La bolsa no es válida.");
  }

  const combined = new Map<string, CheckoutItem>();
  for (const raw of input) {
    if (!raw || typeof raw !== "object") throw new Error("Artículo no válido.");
    const item = raw as Record<string, unknown>;
    if (
      typeof item.productId !== "string" ||
      typeof item.variant !== "string" ||
      !Number.isInteger(item.quantity) ||
      Number(item.quantity) < 1 ||
      Number(item.quantity) > MAX_QUANTITY_PER_LINE
    ) {
      throw new Error("Producto, variante o cantidad no válidos.");
    }

    if (!(item.productId in STORE_CATALOG)) throw new Error("Producto no disponible.");
    const productId = item.productId as StoreProductId;
    const product = STORE_CATALOG[productId];
    if (!(item.variant in product.variants)) throw new Error("Variante no disponible.");

    const key = `${productId}:${item.variant}`;
    const previous = combined.get(key);
    const quantity = (previous?.quantity ?? 0) + Number(item.quantity);
    if (quantity > MAX_QUANTITY_PER_LINE) throw new Error("Cantidad no permitida.");
    combined.set(key, { productId, variant: item.variant, quantity });
  }

  return [...combined.values()];
}

export function getVariant(item: CheckoutItem) {
  const product = STORE_CATALOG[item.productId];
  return product.variants[item.variant as keyof typeof product.variants] as {
    label: string;
    initialStock?: number;
  };
}

export const SHIPPING = {
  peninsula: { label: "Envío España peninsular", amount: 490 },
  baleares: { label: "Envío Baleares", amount: 790 },
} as const;
