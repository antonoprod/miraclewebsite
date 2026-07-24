import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { readCartMetadata } from "@/lib/inventory";
import { sendOrderNotification } from "@/lib/order-email";
import { getStripe } from "@/lib/stripe";
import {
  getShippingZone,
  getVariant,
  SHIPPING,
  STORE_CATALOG,
} from "@/lib/store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Webhook no configurado." }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      await request.text(),
      signature,
      webhookSecret,
    );
  } catch {
    return NextResponse.json({ error: "Firma no válida." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const items = readCartMetadata(session);
    if (!items || session.payment_status !== "paid") {
      return NextResponse.json({ received: true });
    }

    const selectedZone = session.metadata?.shipping_zone;
    const checkoutPostalCode =
      session.collected_information?.shipping_details?.address?.postal_code;
    let addressMatches = false;
    try {
      addressMatches =
        typeof checkoutPostalCode === "string" &&
        getShippingZone(checkoutPostalCode) === selectedZone;
    } catch {
      addressMatches = false;
    }
    const expectedItemsAmount = items.reduce(
      (total, item) => total + STORE_CATALOG[item.productId].unitAmount * item.quantity,
      0,
    );
    const expectedShipping =
      selectedZone === "peninsula" || selectedZone === "baleares"
        ? SHIPPING[selectedZone].amount
        : -1;
    const amountMatches =
      session.currency === "eur" &&
      session.amount_total === expectedItemsAmount + expectedShipping &&
      items.every((item) => Boolean(getVariant(item)));

    const notificationStatus = await sendOrderNotification({
      session,
      items,
      shippingZone: selectedZone as "peninsula" | "baleares",
      requiresReview: !amountMatches || !addressMatches,
    });

    // Idempotente: la sesión pagada es el registro de stock. Esta marca deja
    // constancia de que el webhook validó el pedido y su zona de envío.
    await getStripe().checkout.sessions.update(session.id, {
      metadata: {
        stock_applied: amountMatches ? "true" : "manual_review",
        address_validation: addressMatches ? "passed" : "manual_review",
        order_notification: notificationStatus,
      },
    });
  }

  return NextResponse.json({ received: true });
}
