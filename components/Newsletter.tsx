"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Newsletter() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "").trim();
    const website = String(formData.get("website") ?? "");

    if (!EMAIL_PATTERN.test(email) || email.length > 254) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      });

      if (!response.ok) {
        throw new Error("Newsletter request failed");
      }

      setStatus("success");
      setMessage("Thank you. Subscription received.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("We couldn't complete your subscription. Please try again.");
    }
  }

  return (
    <section className="border-t border-neutral-800 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-neutral-500">
          Newsletter
        </p>
        <h2 className="text-4xl font-semibold md:text-6xl">
          Join the community
        </h2>
        <p className="mt-4 text-neutral-400">
          Events, drops and future sessions. No noise.
        </p>

        <form
          onSubmit={subscribe}
          className="mt-10 flex max-w-2xl flex-col gap-3 sm:flex-row"
          noValidate
        >
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label htmlFor="newsletter-website">Website</label>
            <input
              id="newsletter-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <label className="sr-only" htmlFor="newsletter-email">
            Email
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            disabled={status === "loading"}
            aria-invalid={status === "error"}
            aria-describedby={message ? "newsletter-status" : undefined}
            placeholder="EMAIL ADDRESS"
            className="min-h-14 flex-1 border border-neutral-700 bg-transparent px-5 text-sm outline-none transition placeholder:text-neutral-600 focus:border-white disabled:cursor-wait disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="min-h-14 border border-white px-8 text-xs uppercase tracking-[0.2em] transition hover:bg-white hover:text-black disabled:cursor-wait disabled:opacity-60"
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        {message && (
          <p
            id="newsletter-status"
            className="mt-4 text-sm text-neutral-400"
            role={status === "error" ? "alert" : "status"}
          >
            {message}
          </p>
        )}
      </div>
    </section>
  );
}
