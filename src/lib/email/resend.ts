import { Resend } from "resend";

const DEFAULT_FROM = "Livva <onboarding@resend.dev>";

// Mirrors Condo-Admin-Tool's src/lib/email/resend.ts (sendAdminFeedbackEmail) verbatim in
// approach: soft-fails with a console warning if RESEND_API_KEY isn't set (never throws, so a
// missing env var never breaks the form submission for the visitor), escapes interpolated text.
function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] ?? char);
}

function getClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

type SendLeadNotificationEmailParams = { name: string; community: string; email: string; planLabel: string; message: string };

export async function sendLeadNotificationEmail({ name, community, email, planLabel, message }: SendLeadNotificationEmailParams): Promise<{ ok: boolean; error?: string }> {
  const client = getClient();
  const to = process.env.LEAD_NOTIFY_EMAIL;
  if (!client || !to) {
    console.warn("[email] RESEND_API_KEY o LEAD_NOTIFY_EMAIL no configurados — no se envió la notificación de lead.");
    return { ok: false, error: "Email no configurado." };
  }

  const { error } = await client.emails.send({
    from: process.env.EMAIL_FROM || DEFAULT_FROM,
    to,
    replyTo: email,
    subject: `[Livva] Nuevo lead: ${community}`,
    html: `
      <div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; max-width: 480px; margin: 0 auto; color: #1f2328;">
        <h1 style="font-size: 20px; margin-bottom: 4px;">Nuevo lead desde la landing</h1>
        <p style="font-size: 13px; color: #6b7280; margin: 0 0 20px;">Interesado en el plan <strong>${escapeHtml(planLabel)}</strong></p>
        <table style="font-size: 14px; width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 6px 0; color: #6b7280;">Nombre</td><td style="padding: 6px 0;"><strong>${escapeHtml(name)}</strong></td></tr>
          <tr><td style="padding: 6px 0; color: #6b7280;">Residencial</td><td style="padding: 6px 0;"><strong>${escapeHtml(community)}</strong></td></tr>
          <tr><td style="padding: 6px 0; color: #6b7280;">Correo</td><td style="padding: 6px 0;"><strong>${escapeHtml(email)}</strong></td></tr>
        </table>
        ${message ? `<p style="font-size: 14px; line-height: 1.6; white-space: pre-wrap; background: #f4f1ea; border-radius: 8px; padding: 14px 16px; margin-top: 16px;">${escapeHtml(message)}</p>` : ""}
      </div>
    `,
  });

  if (error) {
    console.error("[email] Error enviando la notificación de lead:", error);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}
