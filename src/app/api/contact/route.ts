import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body: ContactPayload = await request.json();
  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || name.length < 2) {
    return NextResponse.json(
      { error: "Please enter a valid name." },
      { status: 400 }
    );
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  if (!message || message.length < 10) {
    return NextResponse.json(
      { error: "Message should be at least 10 characters." },
      { status: 400 }
    );
  }

  // NOTE: No email/CRM service is wired up yet. Swap this log for a call to
  // an email provider (e.g. Resend, SendGrid) or a database write.
  console.log("New contact form submission:", { name, email, message });

  return NextResponse.json({ ok: true });
}
