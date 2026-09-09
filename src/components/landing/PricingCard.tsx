import clsx from "clsx";
import { Check } from "lucide-react";
import { ANNUAL_DISCOUNT_PERCENT, formatColones, type PricingPlan } from "@/lib/pricing";

const INCLUDED = ["Cuotas y pagos", "Anuncios y mensajería", "Reservas de amenidades", "Marketplace interno", "App instalable"];

type PricingCardProps = {
  plan: PricingPlan;
  onSelect: (planId: string) => void;
  // Set by the calculator above (Pricing.tsx) when this card is the one a typed unit count
  // resolves to — never set from anything the card itself does. `matched` drives a smooth
  // highlight transition (not an instant swap) so the connection between "you typed this
  // number" and "this is your plan" reads as cause and effect, not a jump cut.
  matched?: boolean;
  matchedTotal?: number | null;
  // Whether the calculator has a result at all right now (for *any* card, not necessarily this
  // one). Lets this card's own "recommended" button styling step aside while a different card is
  // the calculator's actual match — two simultaneous solid-green buttons would blur which one is
  // really "yours" the moment the calculator has an opinion.
  calculatorActive?: boolean;
};

export function PricingCard({ plan, onSelect, matched = false, matchedTotal = null, calculatorActive = false }: PricingCardProps) {
  return (
    <div
      className={clsx(
        "relative flex flex-col rounded-2xl border p-7 transition-all duration-500 ease-out",
        matched
          ? "scale-[1.03] border-primary bg-surface shadow-[0_25px_60px_rgba(24,36,26,0.2)]"
          : plan.highlight
            ? "border-primary bg-surface shadow-[0_20px_50px_rgba(24,36,26,0.14)]"
            : "border-border bg-surface"
      )}
    >
      {plan.highlight && <span className="absolute -top-3 left-6 rounded-full bg-primary-soft px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-primary shadow-[0_4px_10px_rgba(24,36,26,0.12)]">Rango más común entre nuestros clientes</span>}
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
      <div className={clsx("grid transition-all duration-500 ease-out", matched ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
        <div className="overflow-hidden">
          <p className="text-[11px] font-black text-primary">Tu precio: {matchedTotal !== null ? `${formatColones(matchedTotal)}/mes` : "personalizado"}</p>
        </div>
      </div>
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
          "mt-auto rounded-[11px] px-5 py-3 text-[12px] font-black transition-colors",
          matched || (!calculatorActive && plan.highlight) ? "bg-primary text-white shadow-[0_8px_20px_rgba(44,89,67,0.2)]" : "border border-border bg-transparent text-text"
        )}
      >
        Iniciar demo
      </button>
    </div>
  );
}
