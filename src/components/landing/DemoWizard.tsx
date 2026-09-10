"use client";

import { X } from "lucide-react";
import { formatColones, resolvePlanForUnits } from "@/lib/pricing";
import type { useDemoWizard } from "./hooks/useDemoWizard";

type DemoWizardProps = ReturnType<typeof useDemoWizard>;

const ERROR_MESSAGES: Record<string, string> = {
  condominium_exists: "Ya existe un residencial con ese nombre — probá con otro (por ejemplo, agregando la zona o el número de torre).",
  account_exists: "Ya existe una cuenta con ese correo. Iniciá sesión en la app en vez de crear una nueva.",
  unit_count_exceeds_self_serve: "Para más de 120 unidades, contactanos directamente para armar un plan a medida.",
  network: "No pudimos crear tu demo. Intentá de nuevo.",
};

const inputClass = "w-full rounded-[9px] border border-border bg-surface p-3 text-[13px] text-text outline-0 focus:border-primary focus:shadow-[0_0_0_3px_var(--color-primary-soft)]";
const labelClass = "mb-1.5 block text-[11px] font-extrabold text-text-muted";

export function DemoWizard(wizard: DemoWizardProps) {
  if (!wizard.isOpen) return null;

  const parsedUnitCount = Number(wizard.unitCount);
  const preview = wizard.unitCount && Number.isInteger(parsedUnitCount) && parsedUnitCount >= 1 && !wizard.exceedsSelfServe ? resolvePlanForUnits(parsedUnitCount) : null;
  const appUrl = process.env.NEXT_PUBLIC_LIVVA_APP_URL ?? "";

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-label="Iniciar demo">
      <div className="relative w-full max-w-[480px] rounded-2xl border border-border bg-surface p-7 shadow-[0_25px_60px_rgba(24,36,26,0.25)]">
        <button type="button" onClick={wizard.close} aria-label="Cerrar" className="absolute right-5 top-5 text-text-muted hover:text-text"><X size={18} /></button>

        {wizard.step === "choice" ? (
          <>
            <h3 className="pr-6 text-[19px] font-extrabold text-text">¿Cómo querés empezar?</h3>
            <p className="mt-1.5 text-[13px] text-text-muted">Podés crear tu demo ahora mismo, o dejarnos tus datos y te contactamos.</p>
            <div className="mt-6 grid gap-3">
              <button type="button" onClick={wizard.chooseSolo} className="rounded-[11px] bg-primary px-5 py-3.5 text-[13px] font-black text-white shadow-[0_8px_20px_rgba(44,89,67,0.2)]">Quiero hacerlo yo mismo</button>
              <button type="button" onClick={wizard.chooseContact} className="rounded-[11px] border border-border bg-transparent px-5 py-3.5 text-[13px] font-black text-text">Prefiero que me contacten</button>
            </div>
          </>
        ) : (
          <>
            <h3 className="pr-6 text-[19px] font-extrabold text-text">Creá tu demo</h3>
            <p className="mt-1.5 text-[13px] text-text-muted">1 mes de demo, sin costo, con acceso inmediato.</p>
            <div className="mt-5 grid gap-3.5">
              <div>
                <label className={labelClass} htmlFor="wizard-condo-name">Nombre del residencial</label>
                <input className={inputClass} id="wizard-condo-name" value={wizard.condominiumName} onChange={(event) => wizard.setCondominiumName(event.target.value)} placeholder="Ej. Residencial Las Palmas" required />
              </div>
              <div>
                <label className={labelClass} htmlFor="wizard-admin-name">Tu nombre</label>
                <input className={inputClass} id="wizard-admin-name" value={wizard.adminName} onChange={(event) => wizard.setAdminName(event.target.value)} required />
              </div>
              <div>
                <label className={labelClass} htmlFor="wizard-admin-email">Tu correo</label>
                <input className={inputClass} id="wizard-admin-email" type="email" value={wizard.adminEmail} onChange={(event) => wizard.setAdminEmail(event.target.value)} required />
              </div>
              <div>
                <label className={labelClass} htmlFor="wizard-units">Número de unidades</label>
                <input className={inputClass} id="wizard-units" type="number" min={1} value={wizard.unitCount} onChange={(event) => wizard.setUnitCount(event.target.value)} placeholder="Ej. 45" required />
              </div>
              <input type="text" value={wizard.website} onChange={(event) => wizard.setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

              {preview && (
                <p className="text-[13px] leading-relaxed text-text-muted">
                  {preview.monthlyTotal !== null ? (
                    <>Precio al terminar la demo: <strong className="text-primary">{formatColones(preview.monthlyTotal)}</strong> / mes con el plan <strong className="text-text">{preview.plan.name}</strong></>
                  ) : (
                    <>Plan <strong className="text-text">{preview.plan.name}</strong> — precio personalizado</>
                  )}
                </p>
              )}

              {wizard.errorCode && <p className="text-[12px] font-bold text-red-600">{ERROR_MESSAGES[wizard.errorCode] ?? ERROR_MESSAGES.network}</p>}

              {wizard.exceedsSelfServe ? (
                <button type="button" onClick={wizard.handoffToContactFromForm} className="rounded-[11px] bg-primary px-5 py-3.5 text-[13px] font-black text-white shadow-[0_8px_20px_rgba(44,89,67,0.2)]">Contactar en su lugar</button>
              ) : (
                <button type="button" disabled={wizard.submitting} onClick={() => wizard.submit(appUrl)} className="rounded-[11px] bg-primary px-5 py-3.5 text-[13px] font-black text-white shadow-[0_8px_20px_rgba(44,89,67,0.2)] disabled:opacity-60">
                  {wizard.submitting ? "Creando tu demo..." : "Crear mi demo"}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
