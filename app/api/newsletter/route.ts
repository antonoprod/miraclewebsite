const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type NewsletterRequest = {
  email?: unknown;
  website?: unknown;
};

function jsonResponse(body: { success: boolean }, status: number) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: Request) {
  let body: NewsletterRequest;

  try {
    body = (await request.json()) as NewsletterRequest;
  } catch {
    return jsonResponse({ success: false }, 400);
  }

  // Return a normal-looking response so bots do not learn that they hit a trap.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return jsonResponse({ success: true }, 200);
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return jsonResponse({ success: false }, 400);
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_LIST_ID);

  if (!apiKey || !Number.isInteger(listId) || listId <= 0) {
    console.error("Newsletter configuration is missing or invalid.");
    return jsonResponse({ success: false }, 500);
  }

  try {
    const brevoResponse = await fetch(BREVO_CONTACTS_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        listIds: [listId],
        updateEnabled: true,
      }),
      cache: "no-store",
    });

    if (!brevoResponse.ok) {
      console.error("Brevo newsletter request failed.", {
        status: brevoResponse.status,
      });
      return jsonResponse({ success: false }, 502);
    }

    return jsonResponse({ success: true }, 200);
  } catch {
    console.error("Brevo newsletter request could not be completed.");
    return jsonResponse({ success: false }, 502);
  }
}
