import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

type ErrorCode = "invalid" | "not_configured" | "send_failed";

function fail(code: ErrorCode, status: number) {
  return NextResponse.json({ ok: false, code }, { status });
}

function isFilledHoneypot(payload: unknown): boolean {
  if (typeof payload !== "object" || payload === null) return false;
  const value = (payload as Record<string, unknown>).website;
  return typeof value === "string" && value.length > 0;
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return fail("invalid", 400);
  }

  // Bot: pura-pura sukses agar tidak belajar dari responsnya.
  if (isFilledHoneypot(payload)) {
    return NextResponse.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) return fail("invalid", 400);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) return fail("not_configured", 503);

  const { name, email, message } = parsed.data;
  const subject = `Portfolio contact: ${name}`.replace(/[\r\n]+/g, " ");

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });

    if (!response.ok) return fail("send_failed", 502);
  } catch {
    return fail("send_failed", 502);
  }

  return NextResponse.json({ ok: true });
}