import "server-only";
import Stripe from "stripe";

let stripeClient: Stripe | undefined;

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  const liveMode = process.env.NEXT_PUBLIC_STRIPE_MODE === "live";
  const expectedKeyPrefix = liveMode ? "sk_live_" : "sk_test_";

  if (!key?.startsWith(expectedKeyPrefix)) {
    throw new Error(
      `Stripe ${liveMode ? "Live" : "Sandbox"} no está configurado correctamente.`,
    );
  }
  stripeClient ??= new Stripe(key);
  return stripeClient;
}
