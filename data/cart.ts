export type CartItem = {
  key: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  optionLabel?: string;
  optionValue?: string;
  optionName?: string;
  quantity: number;
};

export const CART_STORAGE_KEY = "miracle-cart";

export function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function writeCart(items: CartItem[]) {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export function cartCount(items: CartItem[]) {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function cartSubtotal(items: CartItem[]) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function cartItemDelivery(productId: string) {
  if (productId === "miracle-cap") {
    return "PRE-ORDER · Entrega estimada: 4 semanas.";
  }
  if (productId === "miracle-x-nicaso") {
    return "PRE-ORDER · Producción estimada: 3–5 semanas.";
  }
  return null;
}
