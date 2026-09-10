import { NextRequest, NextResponse } from "next/server";
import { sendLeadNotificationEmail } from "@/lib/email/resend";
import { PRICING_PLANS } from "@/lib/pricing";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTH = 2000;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });

  const { name, community, email, plan, unitCount, message, website } = body as Record<string, unknown>;

  // Honeypot: a real visitor never fills this hidden field — a bot that fills every field does.
  if (typeof website === "string" && website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (typeof name !== "string" || !name.trim() || name.length > MAX_LENGTH) return NextResponse.json({ error: "Nombre inválido." }, { status: 400 });
  if (typeof community !== "string" || !community.trim() || community.length > MAX_LENGTH) return NextResponse.json({ error: "Residencial inválido." }, { status: 400 });
  if (typeof email !== "string" || !EMAIL_RE.test(email) || email.length > MAX_LENGTH) return NextResponse.json({ error: "Correo inválido." }, { status: 400 });
  if (typeof message === "string" && message.length > MAX_LENGTH) return NextResponse.json({ error: "Mensaje demasiado largo." }, { status: 400 });
  if (unitCount !== undefined && unitCount !== null && (typeof unitCount !== "number" || !Number.isFinite(unitCount) || unitCount <= 0)) return NextResponse.json({ error: "Número de unidades inválido." }, { status: 400 });

  const selectedPlan = PRICING_PLANS.find((p) => p.id === plan);
  const planLabel = selectedPlan ? `${selectedPlan.name} (${selectedPlan.unitsLabel})` : "Sin especificar";

  const trimmedName = name.trim();
  const trimmedCommunity = community.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = typeof message === "string" ? message.trim() : "";

  const result = await sendLeadNotificationEmail({
    name: trimmedName,
    community: trimmedCommunity,
    email: trimmedEmail,
    planLabel,
    message: trimmedMessage,
  });

  if (!result.ok) return NextResponse.json({ error: "No pudimos enviar tu solicitud. Intentá de nuevo más tarde." }, { status: 502 });

  // Best-effort: also persist the lead in the main app's dashboard (a separate Vercel
  // project/database — this repo has none of its own, see CLAUDE.md) so it shows up in
  // /master/leads. Never blocks or fails the visitor's submission — the email above already
  // succeeded, which is what the response's ok:true actually promises; this is a bonus.
  // Awaited (not fire-and-forget) — a serverless function's execution can be frozen the moment
  // its response is sent, so an un-awaited fetch here could easily never actually complete.
  const masterUrl = process.env.CONDO_ADMIN_API_URL;
  const secret = process.env.LANDING_LEADS_SECRET;
  if (masterUrl && secret) {
    try {
      const forwarded = await fetch(`${masterUrl}/api/public/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${secret}` },
        body: JSON.stringify({ name: trimmedName, community: trimmedCommunity, email: trimmedEmail, plan: selectedPlan?.id ?? null, unitCount: typeof unitCount === "number" ? unitCount : null, message: trimmedMessage }),
      });
      if (!forwarded.ok) console.warn("[leads] El dashboard master rechazó el lead:", forwarded.status, await forwarded.text().catch(() => ""));
    } catch (error) {
      console.warn("[leads] No se pudo reenviar el lead al dashboard master:", error);
    }
  } else {
    console.warn("[leads] CONDO_ADMIN_API_URL o LANDING_LEADS_SECRET no configurados — el lead no se guardó en el dashboard master.");
  }

  return NextResponse.json({ ok: true });
}
