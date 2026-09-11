import clsx from "clsx";
import { useState } from "react";
import { Calculator } from "lucide-react";
import { ANNUAL_DISCOUNT_PERCENT, formatColones, ivaBreakdown, totalWithIva, resolveAnnualPlanForUnits, type PricingPlan } from "@/lib/pricing";

type PricingCalculatorProps = {
  units: string;
  onUnitsChange: (value: string) => void;
  result: { plan: PricingPlan; monthlyTotal: number | null } | null;
};

type BillingCycle = "MONTHLY" | "ANNUAL";

// The honest answer to "which plan am I" isn't a choice between 3 cards — a residencial's unit
// count already decides it. This calculator answers that directly (type your count, see your
// exact price) instead of making someone eyeball 3 cards and guess; the matching card below
// still animates into view so the connection between "this number" and "that plan" is visible,
// not just stated in this box. The Mensual/Anual toggle only affects what this box itself shows
// (2026-09-10) — the 3 plan cards below keep their own static "-12% pagando anual" note and never
// recompute against this toggle, so there's exactly one place a visitor's own typed number gets a
// live, chosen-cycle price: here.
export function PricingCalculator({ units, onUnitsChange, result }: PricingCalculatorProps) {
  const [cycle, setCycle] = useState<BillingCycle>("MONTHLY");
  const parsedUnits = Number(units);
  const annualResult = units && parsedUnits > 0 ? resolveAnnualPlanForUnits(parsedUnits) : null;

  return (
    <div className="mx-auto mb-10 max-w-[440px] rounded-2xl border border-primary/25 bg-surface p-6 text-center shadow-[0_20px_50px_rgba(24,36,26,0.12)]">
      <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-[10px] bg-primary-soft text-primary"><Calculator size={20} /></div>
      <label htmlFor="unit-calculator" className="block text-[12px] font-bold text-text-muted">¿Cuántas unidades tiene tu residencial?</label>
      <input
        id="unit-calculator"
        type="number"
        min={1}
        inputMode="numeric"
        value={units}
        onChange={(event) => onUnitsChange(event.target.value)}
        placeholder="Ej. 45"
        className="mt-3 w-full rounded-[11px] border border-border bg-surface-muted px-4 py-3 text-center text-[22px] font-black text-text outline-none transition-colors focus:border-primary"
      />
      <div role="radiogroup" aria-label="Ciclo de facturación" className="mx-auto mt-3 grid w-fit grid-cols-2 gap-0.5 rounded-[10px] bg-surface-muted p-0.5">
        {(["MONTHLY", "ANNUAL"] as const).map((option) => (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={cycle === option}
            onClick={() => setCycle(option)}
            className={clsx(
              "rounded-[8px] px-3.5 py-1.5 text-[11px] font-black transition-colors",
              cycle === option ? "bg-primary text-white shadow-[0_4px_10px_rgba(44,89,67,0.25)]" : "bg-transparent text-text-muted"
            )}
          >
            {option === "MONTHLY" ? "Mensual" : `Anual (-${ANNUAL_DISCOUNT_PERCENT}%)`}
          </button>
        ))}
      </div>
      <div className={clsx("grid transition-all duration-300 ease-out", result ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
        <div className="overflow-hidden">
          {result && (
            <p className="text-[13px] leading-relaxed text-text-muted">
              Para <strong className="text-text">{units}</strong> unidades: {result.monthlyTotal !== null && annualResult ? (
                cycle === "MONTHLY" ? (
                  <>
                    <strong className="text-[16px] text-primary">{formatColones(totalWithIva(result.monthlyTotal))}</strong> / mes con el plan <strong className="text-text">{result.plan.name}</strong> <span className="whitespace-nowrap">({ivaBreakdown(result.monthlyTotal)})</span>
                  </>
                ) : (
                  <>
                    <strong className="text-[16px] text-primary">{formatColones(totalWithIva(annualResult.annualAmount ?? 0))}</strong> / año con el plan <strong className="text-text">{result.plan.name}</strong> <span className="text-primary">(ahorrás {ANNUAL_DISCOUNT_PERCENT}% vs. mensual)</span> <span className="whitespace-nowrap">({ivaBreakdown(annualResult.annualAmount ?? 0)})</span>
                  </>
                )
              ) : (
                <>
                  plan <strong className="text-text">{result.plan.name}</strong> — <strong className="text-primary">precio personalizado</strong>
                </>
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
