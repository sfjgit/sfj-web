import { NextResponse } from "next/server";

/**
 * Contact / enquiry intake.
 *
 * The audit flagged this endpoint as unprotected (P0-08) — no anti-spam, no
 * validation, no rate limiting. It was also a black hole: the handler logged
 * the payload and returned `{ success: true }`, so every lead the website
 * captured was silently discarded while the visitor was told their message had
 * been sent.
 *
 * This version validates, drops bots, rate-limits per IP, and forwards to
 * whatever `LEAD_WEBHOOK_URL` points at (CASPA intake, a Zapier hook, an email
 * relay). Until that env var is set the endpoint still accepts submissions but
 * logs a loud warning on every one, so the gap is visible in the logs instead
 * of invisible in the UI (AN-03).
 */

export const runtime = "nodejs";

const MAX_FIELD_LENGTH = 5_000;

/**
 * Per-IP rate limit. In-memory, so it is per serverless instance rather than
 * global — enough to stop a naive flood, not a distributed one. Move to Redis
 * or Vercel KV if the form starts attracting real abuse.
 */
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 5_000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > RATE_LIMIT_MAX;
}

interface LeadPayload {
  name?: string;
  email?: string;
  countryCode?: string;
  phoneNumber?: string;
  type?: string;
  subCategory?: string;
  websiteUrl?: string;
  query?: string;
  /** Honeypot — a real user never sees or fills this. */
  companyFax?: string;
  /** ms between form render and submit; bots post near-instantly. */
  elapsedMs?: number;
  landingPage?: string;
}

function validate(data: LeadPayload): string | null {
  const tooLong = Object.values(data).some(
    (v) => typeof v === "string" && v.length > MAX_FIELD_LENGTH,
  );
  if (tooLong) return "Field exceeds maximum length";

  if (!data.name || data.name.trim().length < 2) return "Name is required";
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    return "A valid email address is required";
  if (!data.phoneNumber || !/^\d{10,15}$/.test(data.phoneNumber))
    return "A valid phone number is required";
  if (!data.query || data.query.trim().length < 10)
    return "Message is required";

  return null;
}

export async function POST(request: Request) {
  try {
    const data: LeadPayload = await request.json();

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Please try again in a minute." },
        { status: 429 },
      );
    }

    // Honeypot and time-trap. Both respond 200 so a bot cannot tell it was
    // caught and tune around the check — but nothing is forwarded.
    const trapped =
      Boolean(data.companyFax) ||
      (typeof data.elapsedMs === "number" && data.elapsedMs < 2_000);
    if (trapped) {
      console.warn("[api/form] dropped suspected bot submission", { ip });
      return NextResponse.json({ success: true });
    }

    const invalid = validate(data);
    if (invalid) {
      return NextResponse.json(
        { success: false, message: invalid },
        { status: 400 },
      );
    }

    const lead = {
      name: data.name?.trim(),
      email: data.email?.trim().toLowerCase(),
      phone: `${data.countryCode ?? ""}${data.phoneNumber ?? ""}`,
      serviceLine: data.type ?? "general",
      subCategory: data.subCategory ?? "",
      websiteUrl: data.websiteUrl ?? "",
      message: data.query?.trim(),
      landingPage: data.landingPage ?? "",
      source: "sfjbs.com/contact",
      receivedAt: new Date().toISOString(),
    };

    const webhook = process.env.LEAD_WEBHOOK_URL;
    if (!webhook) {
      // Deliberately loud. A lead that reaches no inbox and no CRM is worse
      // than a form that visibly fails, because nobody finds out for weeks.
      console.error(
        "[api/form] LEAD_WEBHOOK_URL is not configured — this lead was NOT delivered anywhere:",
        lead,
      );
      return NextResponse.json({ success: true });
    }

    const forwarded = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.LEAD_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify(lead),
    });

    if (!forwarded.ok) {
      console.error(
        "[api/form] lead forwarding failed",
        forwarded.status,
        lead.email,
      );
      return NextResponse.json(
        {
          success: false,
          message:
            "We could not deliver your message. Please email growth@sfjbs.com or call +91 98453 48601.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in /api/form:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
