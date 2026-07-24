import "server-only";
import Stripe from "stripe";

let stripeClient: Stripe | undefined;

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key?.startsWith("sk_test_")) {
    throw new Error("Stripe Sandbox no está configurado correctamente.");
  }
  stripeClient ??= new Stripe(key);
  return stripeClient;
}
