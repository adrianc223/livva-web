"use client";

import { ArrowRight } from "lucide-react";
import { PRICING_PLANS } from "@/lib/pricing";
import type { useLeadForm } from "./hooks/useLeadForm";

const labelClass = "mb-1.5 block text-[11px] font-extrabold text-text-muted";
const inputClass = "w-full rounded-[9px] border border-border bg-surface p-3 text-[13px] text-text outline-0 focus:border-primary focus:shadow-[0_0_0_3px_var(--color-primary-soft)]";

type ContactSectionProps = Pick<ReturnType<typeof useLeadForm>, "selectedPlan" | "setSelectedPlan" | "unitCount" | "setUnitCount" | "status" | "error" | "submitLead">;

export function ContactSection({ selectedPlan, setSelectedPlan, unitCount, setUnitCount, status, error, submitLead }: ContactSectionProps) {
  return (
    <section id="contacto" className="mx-auto max-w-[640px] px-5 py-20">
      <div className="mb-8 text-center">
        <span className="text-[11px] font-black uppercase tracking-[1.6px] text-primary">Contacto</span>
        <h2 className="mt-2 text-[clamp(24px,3.5vw,34px)] tracking-[-1px] text-text">Contanos sobre tu comunidad</h2>
        <p className="mt-3 text-[13px] text-text-muted">Dejanos tus datos y te contactamos para armar el plan que mejor se ajuste a tu residencial.</p>
      </div>
      {status === "sent" ? (
        <div className="rounded-2xl border border-border bg-surface p-8 text-center">
          <p className="text-[14px] font-bold text-text">¡Listo! Ya recibimos tu solicitud.</p>
          <p className="mt-1.5 text-[13px] text-text-muted">Te vamos a escribir pronto a tu correo.</p>
        </div>
      ) : (
        <form onSubmit={submitLead} className="grid gap-3.5 rounded-2xl border border-border bg-surface p-7">
          <div>
            <label className={labelClass} htmlFor="lead-name">Nombre</label>
            <input className={inputClass} id="lead-name" name="name" type="text" required />
          </div>
          <div>
            <label className={labelClass} htmlFor="lead-community">Residencial o comunidad</label>
            <input className={inputClass} id="lead-community" name="community" type="text" required />
          </div>
          <div>
            <label className={labelClass} htmlFor="lead-email">Correo</label>
            <input className={inputClass} id="lead-email" name="email" type="email" required />
          </div>
          <div>
            <label className={labelClass} htmlFor="lead-plan">Plan de interés</label>
            <select className={inputClass} id="lead-plan" name="plan" value={selectedPlan} onChange={(event) => setSelectedPlan(event.target.value)}>
              {PRICING_PLANS.map((plan) => <option key={plan.id} value={plan.id}>{plan.name} — {plan.unitsLabel}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="lead-units">Número de unidades (opcional)</label>
            <input className={inputClass} id="lead-units" name="unitCount" type="number" min={1} value={unitCount} onChange={(event) => setUnitCount(event.target.value)} placeholder="Ej. 45" />
          </div>
          <div>
            <label className={labelClass} htmlFor="lead-message">Mensaje (opcional)</label>
            <textarea className={inputClass} id="lead-message" name="message" rows={3} />
          </div>
          {/* Honeypot: hidden from real visitors via CSS, invisible to screen readers via aria-hidden; bots that fill every field trip it. */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          {error && <p className="text-[12px] font-bold text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-1 flex items-center justify-center gap-2 rounded-[11px] bg-primary px-5 py-3.5 text-[13px] font-black text-white shadow-[0_8px_20px_rgba(44,89,67,0.2)] disabled:opacity-60"
          >
            {status === "sending" ? "Enviando..." : "Enviar solicitud"} <ArrowRight size={16} />
          </button>
          <p className="text-center text-[11px] text-text-muted">Tu información se usará únicamente para contactarte sobre Livva.</p>
        </form>
      )}
    </section>
  );
}
