import { NextRequest, NextResponse } from "next/server";
import { sendLeadNotificationEmail } from "@/lib/email/resend";
import { PRICING_PLANS } from "@/lib/pricing";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTH = 2000;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });

  const { name, community, email, plan, message, website } = body as Record<string, unknown>;

  // Honeypot: a real visitor never fills this hidden field — a bot that fills every field does.
  if (typeof website === "string" && website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (typeof name !== "string" || !name.trim() || name.length > MAX_LENGTH) return NextResponse.json({ error: "Nombre inválido." }, { status: 400 });
  if (typeof community !== "string" || !community.trim() || community.length > MAX_LENGTH) return NextResponse.json({ error: "Residencial inválido." }, { status: 400 });
  if (typeof email !== "string" || !EMAIL_RE.test(email) || email.length > MAX_LENGTH) return NextResponse.json({ error: "Correo inválido." }, { status: 400 });
  if (typeof message === "string" && message.length > MAX_LENGTH) return NextResponse.json({ error: "Mensaje demasiado largo." }, { status: 400 });

  const selectedPlan = PRICING_PLANS.find((p) => p.id === plan);
  const planLabel = selectedPlan ? `${selectedPlan.name} (${selectedPlan.unitsLabel})` : "Sin especificar";

  const result = await sendLeadNotificationEmail({
    name: name.trim(),
    community: community.trim(),
    email: email.trim(),
    planLabel,
    message: typeof message === "string" ? message.trim() : "",
  });

  if (!result.ok) return NextResponse.json({ error: "No pudimos enviar tu solicitud. Intentá de nuevo más tarde." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
