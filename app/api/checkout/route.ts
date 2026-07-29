import { NextResponse } from "next/server";
import { assertStock, cartMetadata } from "@/lib/inventory";
import { getStripe } from "@/lib/stripe";
import {
  getShippingZone,
  getVariant,
  parseCheckoutItems,
  SHIPPING,
  STORE_CATALOG,
} from "@/lib/store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      items?: unknown;
      shippingPostalCode?: unknown;
    };
    const items = parseCheckoutItems(body.items);
    if (typeof body.shippingPostalCode !== "string") {
      throw new Error("Introduce el código postal de entrega.");
    }
    const postalCode = body.shippingPostalCode.trim();
    const zone = getShippingZone(postalCode);
    await assertStock(items);

    const stripe = getStripe();
    const origin = new URL(request.url).origin;
    const hasNicaso = items.some((item) => item.productId === "miracle-x-nicaso");
    const hasCap = items.some((item) => item.productId === "miracle-cap");
    const shipsTogether = hasNicaso && hasCap;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: items.map((item) => {
        const product = STORE_CATALOG[item.productId];
        const variant = getVariant(item);
        return {
          quantity: item.quantity,
          price_data: {
            currency: "eur",
            unit_amount: product.unitAmount,
            product_data: {
              name: `${product.name} · ${variant.label}`,
              description:
                item.productId === "miracle-x-nicaso"
                  ? "PRE-ORDER. Producción estimada: 3–5 semanas + transporte."
                  : shipsTogether
                    ? "PRE-ORDER. Gorra: 4 semanas. Entrega conjunta cuando todo esté preparado (3–5 semanas)."
                    : "PRE-ORDER. Entrega estimada: 4 semanas.",
            },
          },
        };
      }),
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: SHIPPING[zone].amount, currency: "eur" },
            display_name: SHIPPING[zone].label,
            delivery_estimate: hasNicaso
              ? {
                  minimum: { unit: "week", value: 3 },
                  maximum: { unit: "week", value: 5 },
                }
              : {
                  minimum: { unit: "week", value: 4 },
                  maximum: { unit: "week", value: 4 },
                },
          },
        },
      ],
      shipping_address_collection: { allowed_countries: ["ES"] },
      phone_number_collection: { enabled: true },
      billing_address_collection: "auto",
      payment_intent_data: {
        metadata: {
          fulfillment_status: "awaiting_payment",
          shipping_zone: zone,
          contains_preorder: "true",
          ships_together: shipsTogether ? "true" : "false",
        },
      },
      metadata: {
        ...cartMetadata(items),
        shipping_zone: zone,
        shipping_postal_code: postalCode,
        fulfillment: hasNicaso ? "preorder_3_5_weeks" : "cap_preorder_4_weeks",
        ship_together: shipsTogether ? "true" : "false",
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
    });

    if (!session.url) throw new Error("Stripe no devolvió una URL de Checkout.");
    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo iniciar el pago.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
