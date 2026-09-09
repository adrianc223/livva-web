// Mirrors the exact tiers in Condo-Admin-Tool's src/lib/billing/annualPricing.ts so the public
// price and the internal billing-suggestion logic never drift apart. Re-declared here rather
// than imported since this is a separate repo/deployment with no access to that app's src/lib —
// keep the two in sync by hand if either ever changes.
//
// Graduated pricing (2026-09-09): each tier's rate only ever applies to the units that fall
// inside that tier — never re-priced retroactively. A flat "all units at your plan's rate" model
// made the total price *drop* when crossing a plan boundary by a single unit (30 units at
// ₡1,500 = ₡45,000, but 31 units at a flat ₡1,400 = ₡43,400) — backwards for a volume plan.
// Metrópoli has no listed rate at all: past 120 units, pricing is fully custom/negotiated.
export type PricingPlan = {
  id: string;
  name: string;
  unitsLabel: string;
  monthlyRatePerUnit: number | null;
  highlight?: boolean;
};

export const ANNUAL_DISCOUNT_PERCENT = 12;

export const PRICING_PLANS: PricingPlan[] = [
  { id: "esencial", name: "Esencial", unitsLabel: "Hasta 30 unidades", monthlyRatePerUnit: 1500 },
  { id: "comunidad", name: "Comunidad", unitsLabel: "31 a 120 unidades", monthlyRatePerUnit: 1400, highlight: true },
  { id: "metropoli", name: "Metrópoli", unitsLabel: "Más de 120 unidades", monthlyRatePerUnit: null },
];

export function formatColones(amount: number): string {
  return `₡${amount.toLocaleString("es-CR")}`;
}
