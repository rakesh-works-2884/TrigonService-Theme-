export type LeadPayload = {
  name: string;
  email: string;
  phone: string;
  service?: string;
  message?: string;
  source: string;
};

export async function submitLead(payload: LeadPayload): Promise<{ ok: boolean; error?: string }> {
  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

  if (!endpoint) {
    return { ok: false, error: "Email delivery isn't configured yet. Please reach us directly by phone or email." };
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) return { ok: true };
    return { ok: false, error: "Something went wrong sending your message. Please try again." };
  } catch {
    return { ok: false, error: "Something went wrong sending your message. Please try again." };
  }
}
