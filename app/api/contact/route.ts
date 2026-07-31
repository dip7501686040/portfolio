import { NextRequest, NextResponse } from "next/server";

// This route sends "leave a message" submissions to your inbox via Resend
// (https://resend.com — free tier covers a personal portfolio easily).
// Set RESEND_API_KEY and CONTACT_TO_EMAIL in your environment (see
// .env.local.example). Until those are set, the route returns a clear
// error instead of silently swallowing messages.

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message, honeypot } = body as {
      name?: string;
      email?: string;
      message?: string;
      honeypot?: string;
    };

    // Simple bot trap: a hidden field real users never fill in.
    if (honeypot) {
      return NextResponse.json({ ok: true });
    }

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Name, email, and message are all required." },
        { status: 400 }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { ok: false, error: "That email address doesn't look valid." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;

    if (!apiKey || !toEmail) {
      console.warn(
        "[contact] RESEND_API_KEY or CONTACT_TO_EMAIL is not set. Message was not delivered:",
        { name, email, message }
      );
      return NextResponse.json(
        {
          ok: false,
          error:
            "The contact form isn't wired up to an email service yet. Add RESEND_API_KEY and CONTACT_TO_EMAIL to your environment."
        },
        { status: 500 }
      );
    }

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: [toEmail],
        reply_to: email,
        subject: `New portfolio message from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`
      })
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error("[contact] Resend API error:", errText);
      return NextResponse.json(
        { ok: false, error: "The message service rejected the request. Please try again shortly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong sending your message." },
      { status: 500 }
    );
  }
}
