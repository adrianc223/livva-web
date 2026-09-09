import clsx from "clsx";
import { Check } from "lucide-react";
import { ANNUAL_DISCOUNT_PERCENT, formatColones, type PricingPlan } from "@/lib/pricing";

const INCLUDED = ["Cuotas y pagos", "Anuncios y mensajería", "Reservas de amenidades", "Marketplace interno", "App instalable"];

export function PricingCard({ plan, onSelect }: { plan: PricingPlan; onSelect: (planId: string) => void }) {
  return (
    <div
      className={clsx(
        "flex flex-col rounded-2xl border p-7",
        plan.highlight ? "border-primary bg-surface shadow-[0_20px_50px_rgba(24,36,26,0.14)]" : "border-border bg-surface"
      )}
    >
      {plan.highlight && <span className="mb-3 self-start rounded-full bg-primary-soft px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-primary">Más elegido</span>}
      <h3 className="text-[17px] font-extrabold text-text">{plan.name}</h3>
      <p className="mt-1 text-[12px] font-bold text-text-muted">{plan.unitsLabel}</p>
      {plan.monthlyRatePerUnit !== null ? (
        <>
          <p className="mt-5"><span className="text-[30px] font-black tracking-[-1px] text-text">{formatColones(plan.monthlyRatePerUnit)}</span><span className="text-[12px] font-bold text-text-muted"> / unidad / mes</span></p>
          <p className="mt-1 text-[11px] font-bold text-primary">-{ANNUAL_DISCOUNT_PERCENT}% pagando anual</p>
        </>
      ) : (
        <p className="mt-5 text-[26px] font-black tracking-[-1px] text-text">Personalizado</p>
      )}
      <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/30 px-2.5 py-1 text-[10px] font-black text-primary"><Check size={12} className="shrink-0" /> 1 mes de demo incluido</span>
      <ul className="my-6 grid gap-2.5">
        {INCLUDED.map((item) => (
          <li key={item} className="flex items-center gap-2 text-[12px] font-semibold text-text"><Check size={14} className="shrink-0 text-primary" /> {item}</li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => onSelect(plan.id)}
        className={clsx(
          "mt-auto rounded-[11px] px-5 py-3 text-[12px] font-black",
          plan.highlight ? "bg-primary text-white shadow-[0_8px_20px_rgba(44,89,67,0.2)]" : "border border-border bg-transparent text-text"
        )}
      >
        Quiero este plan
      </button>
    </div>
  );
}
