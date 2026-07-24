import "server-only";
import { createHash } from "node:crypto";
import type Stripe from "stripe";
import {
  getVariant,
  SHIPPING,
  STORE_CATALOG,
  type CheckoutItem,
  type ShippingZone,
} from "@/lib/store";

const BREVO_EMAIL_URL = "https://api.brevo.com/v3/smtp/email";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatMoney(amount: number | null) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format((amount ?? 0) / 100);
}

function formatAddress(address?: Stripe.Address | null) {
  if (!address) return "Dirección no disponible";
  return [
    address.line1,
    address.line2,
    [address.postal_code, address.city].filter(Boolean).join(" "),
    address.state,
    address.country,
  ]
    .filter(Boolean)
    .join(", ");
}

function idempotencyKey(sessionId: string) {
  const hash = createHash("sha256")
    .update(`miracle-order-email:${sessionId}`)
    .digest("hex");
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-4${hash.slice(13, 16)}-a${hash.slice(17, 20)}-${hash.slice(20, 32)}`;
}

export async function sendOrderNotification({
  session,
  items,
  shippingZone,
  requiresReview,
}: {
  session: Stripe.Checkout.Session;
  items: CheckoutItem[];
  shippingZone: ShippingZone;
  requiresReview: boolean;
}) {
  if (!session.livemode) return "skipped_test";

  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const recipientEmail = process.env.BREVO_ORDER_TO_EMAIL;

  if (!apiKey || !senderEmail || !recipientEmail) {
    console.error("Order email configuration is missing.");
    return "not_configured";
  }

  const shippingDetails = session.collected_information?.shipping_details;
  const customer = session.customer_details;
  const rows = items
    .map((item) => {
      const product = STORE_CATALOG[item.productId];
      const variant = getVariant(item);
      const total = product.unitAmount * item.quantity;
      return `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #ddd">
            ${escapeHtml(product.name)} · ${escapeHtml(variant.label)}
          </td>
          <td style="padding:12px 0;border-bottom:1px solid #ddd;text-align:center">
            ${item.quantity}
          </td>
          <td style="padding:12px 0;border-bottom:1px solid #ddd;text-align:right">
            ${formatMoney(total)}
          </td>
        </tr>`;
    })
    .join("");

  const statusLabel = requiresReview ? "REVISAR PEDIDO" : "PAGO CONFIRMADO";
  const subject = `${requiresReview ? "[REVISAR] " : ""}Nuevo pedido Miracle · ${formatMoney(session.amount_total)}`;
  const htmlContent = `
    <!doctype html>
    <html lang="es">
      <body style="margin:0;background:#f2f2f2;color:#111;font-family:Arial,sans-serif">
        <div style="max-width:680px;margin:0 auto;padding:40px 24px">
          <div style="background:#fff;padding:36px">
            <p style="margin:0 0 12px;font-size:12px;letter-spacing:3px;color:#777">${statusLabel}</p>
            <h1 style="margin:0 0 32px;font-size:34px">Nuevo pedido.</h1>
            <table style="width:100%;border-collapse:collapse;font-size:14px">
              <thead>
                <tr>
                  <th style="padding:0 0 10px;text-align:left">Producto</th>
                  <th style="padding:0 0 10px;text-align:center">Uds.</th>
                  <th style="padding:0 0 10px;text-align:right">Importe</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
            <div style="margin:28px 0;padding-top:20px;border-top:2px solid #111">
              <p style="margin:6px 0"><strong>Envío:</strong> ${formatMoney(SHIPPING[shippingZone].amount)}</p>
              <p style="margin:6px 0;font-size:20px"><strong>Total:</strong> ${formatMoney(session.amount_total)}</p>
            </div>
            <div style="margin-top:32px">
              <p style="margin:7px 0"><strong>Cliente:</strong> ${escapeHtml(shippingDetails?.name ?? customer?.name ?? "No disponible")}</p>
              <p style="margin:7px 0"><strong>Email:</strong> ${escapeHtml(customer?.email ?? session.customer_email ?? "No disponible")}</p>
              <p style="margin:7px 0"><strong>Teléfono:</strong> ${escapeHtml(customer?.phone ?? "No disponible")}</p>
              <p style="margin:7px 0"><strong>Dirección:</strong> ${escapeHtml(formatAddress(shippingDetails?.address))}</p>
              <p style="margin:7px 0"><strong>Pedido Stripe:</strong> ${escapeHtml(session.id)}</p>
            </div>
          </div>
        </div>
      </body>
    </html>`;

  const response = await fetch(BREVO_EMAIL_URL, {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
      idempotencyKey: idempotencyKey(session.id),
    },
    body: JSON.stringify({
      sender: {
        name: process.env.BREVO_SENDER_NAME || "MIRACLE",
        email: senderEmail,
      },
      to: [{ name: "MIRACLE", email: recipientEmail }],
      replyTo: customer?.email ? { email: customer.email } : undefined,
      subject,
      htmlContent,
      tags: ["order", "stripe"],
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("Brevo order notification failed.", {
      status: response.status,
      sessionId: session.id,
    });
    throw new Error("No se pudo enviar la notificación del pedido.");
  }

  return "sent";
}
