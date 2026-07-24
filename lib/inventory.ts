import "server-only";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import {
  getVariant,
  parseCheckoutItems,
  type CheckoutItem,
} from "@/lib/store";

const CART_METADATA_KEY = "miracle_cart_v1";

export function serializeCart(items: CheckoutItem[]) {
  return JSON.stringify(items);
}

export function readCartMetadata(session: Stripe.Checkout.Session) {
  const value = session.metadata?.[CART_METADATA_KEY];
  if (!value) return null;
  try {
    return parseCheckoutItems(JSON.parse(value));
  } catch {
    return null;
  }
}

export function cartMetadata(items: CheckoutItem[]) {
  return { [CART_METADATA_KEY]: serializeCart(items) };
}

export async function getPaidQuantities() {
  const paid = new Map<string, number>();
  const sessions = getStripe().checkout.sessions.list({
    limit: 100,
    status: "complete",
  });

  for await (const session of sessions) {
    // Las compras de Sandbox validan el flujo sin consumir el stock real.
    if (!session.livemode || session.payment_status !== "paid") continue;
    const items = readCartMetadata(session);
    if (!items) continue;
    for (const item of items) {
      const key = `${item.productId}:${item.variant}`;
      paid.set(key, (paid.get(key) ?? 0) + item.quantity);
    }
  }
  return paid;
}

export async function assertStock(items: CheckoutItem[]) {
  const paid = await getPaidQuantities();
  for (const item of items) {
    const initialStock = getVariant(item).initialStock;
    if (initialStock === undefined) continue;
    const remaining = Math.max(
      0,
      initialStock - (paid.get(`${item.productId}:${item.variant}`) ?? 0),
    );
    if (item.quantity > remaining) {
      throw new Error(
        remaining
          ? `Solo quedan ${remaining} unidades de ${getVariant(item).label}.`
          : `${getVariant(item).label} está agotada.`,
      );
    }
  }
}
