import clsx from "clsx";
import { Check } from "lucide-react";
import { ANNUAL_DISCOUNT_PERCENT, formatColones, ivaBreakdown, totalWithIva, resolvePlanForUnits, type PricingPlan } from "@/lib/pricing";

type PricingCardProps = {
  plan: PricingPlan;
  onSelect: (planId: string) => void;
  // Set by the calculator above (Pricing.tsx) when this card is the one a typed unit count
  // resolves to — never set from anything the card itself does. `matched` drives a smooth
  // highlight transition (not an instant swap) so the connection between "you typed this
  // number" and "this is your plan" reads as cause and effect, not a jump cut.
  matched?: boolean;
  // The exact graduated total for the typed unit count — replaces the flat per-unit rate on this
  // card while matched (not shown alongside it), since a matched card is answering "what do I
  // actually pay," not "what's the rate."
  matchedTotal?: number | null;
  // Whether the calculator has a result at all right now (for *any* card, not necessarily this
  // one). Lets this card's own "recommended" button styling step aside while a different card is
  // the calculator's actual match — two simultaneous solid-green buttons would blur which one is
  // really "yours" the moment the calculator has an opinion.
  calculatorActive?: boolean;
};

export function PricingCard({ plan, onSelect, matched = false, matchedTotal = null, calculatorActive = false }: PricingCardProps) {
  // Computed, never hardcoded, so the worked example can never contradict the calculator sitting
  // directly above these cards. Metrópoli has no rate of its own, so its example count (120) is
  // the top of the tier below — a real "starting from" figure rather than an invented one.
  const { monthlyTotal: exampleTotal } = resolvePlanForUnits(plan.exampleUnits);

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
      {matched && matchedTotal !== null ? (
        <>
          <p className="mt-5"><span className="text-[30px] font-black tracking-[-1px] text-text">{formatColones(totalWithIva(matchedTotal))}</span><span className="text-[12px] font-bold text-text-muted"> / mes</span></p>
          <p className="mt-1 text-[11px] font-bold text-primary">-{ANNUAL_DISCOUNT_PERCENT}% pagando anual</p>
          <p className="mt-0.5 text-[11px] text-text-muted">{ivaBreakdown(matchedTotal)}</p>
        </>
      ) : plan.monthlyRatePerUnit !== null ? (
        <>
          <p className="mt-5"><span className="text-[30px] font-black tracking-[-1px] text-text">{formatColones(totalWithIva(plan.monthlyRatePerUnit))}</span><span className="text-[12px] font-bold text-text-muted"> / unidad / mes</span></p>
          <p className="mt-1 text-[11px] font-bold text-primary">-{ANNUAL_DISCOUNT_PERCENT}% pagando anual</p>
          <p className="mt-0.5 text-[11px] text-text-muted">{ivaBreakdown(plan.monthlyRatePerUnit)}</p>
        </>
      ) : (
        <p className="mt-5 text-[26px] font-black tracking-[-1px] text-text">Personalizado</p>
      )}
      <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/30 px-2.5 py-1 text-[10px] font-black text-primary"><Check size={12} className="shrink-0" /> 1 mes de demo incluido</span>
      {/* This used to be the same five-item feature checklist on all three cards. A checklist
          repeated verbatim down every column is the shape readers know from tiered SaaS pricing,
          where it exists to show what each tier withholds — so printing an identical one three
          times told people to hunt for a difference that does not exist, and buried the actual
          selling point. "Everything is included in every plan" is now stated once, below the
          grid (Pricing.tsx), and each card uses the space to say something only true of itself:
          how its rate is applied, and what a real condominium of that size actually pays. */}
      <div className="my-6 grid gap-3 border-y border-border py-5">
        <p className="text-[10px] font-black uppercase tracking-[1.2px] text-text-muted">Cómo se calcula</p>
        <p className="text-[12px] leading-relaxed text-text">{plan.rateExplainer}</p>
        {/* The example steps aside once the calculator has matched this card: the headline above
            is then the reader's own real total, and a second, larger figure for someone else's
            building sitting under it is the one thing that could make their own number unclear.
            The explainer stays — at that exact moment it is what tells them how their total was
            reached. Metrópoli is never matched (the calculator has no rate past 120), so its
            "Desde" figure always shows.

            whitespace-nowrap on both halves plus flex-wrap on the row: without them the *text*
            breaks before the flex line does, and a narrow card ends up with both sides split
            across two ragged lines instead of one clean line each. */}
        {!matched && (
          <p className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 rounded-[10px] bg-surface-muted px-3 py-2.5">
            <span className="whitespace-nowrap text-[11px] font-bold text-text-muted">{plan.monthlyRatePerUnit === null ? "Desde" : "Ejemplo"} · {plan.exampleUnits} unidades</span>
            <strong className="whitespace-nowrap text-[13px] font-black text-text">{formatColones(totalWithIva(exampleTotal ?? 0))}<span className="text-[10px] font-bold text-text-muted"> / mes con IVA</span></strong>
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={() => onSelect(plan.id)}
        className={clsx(
          "mt-auto rounded-[11px] px-5 py-3 text-[12px] font-black transition-colors",
          matched || (!calculatorActive && plan.highlight) ? "bg-primary text-white shadow-[0_8px_20px_rgba(44,89,67,0.2)]" : "border border-border bg-transparent text-text"
        )}
      >
        {/* Metrópoli has no self-serve rate (monthlyRatePerUnit === null, >120 units) — the demo
            wizard caps out at 120, so this button skips it entirely and goes straight to contact. */}
        {plan.monthlyRatePerUnit === null ? "Contáctanos" : "Iniciar demo"}
      </button>
    </div>
  );
}
