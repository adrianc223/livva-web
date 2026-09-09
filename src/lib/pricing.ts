// Mirrors the exact tiers in Condo-Admin-Tool's src/lib/billing/annualPricing.ts so the public
// price and the internal billing-suggestion logic never drift apart. Re-declared here rather
// than imported since this is a separate repo/deployment with no access to that app's src/lib —
// keep the two in sync by hand if either ever changes.
export type PricingPlan = {
  id: string;
  name: string;
  unitsLabel: string;
  monthlyRatePerUnit: number;
  highlight?: boolean;
};

export const ANNUAL_DISCOUNT_PERCENT = 12;

export const PRICING_PLANS: PricingPlan[] = [
  { id: "esencial", name: "Esencial", unitsLabel: "Hasta 30 unidades", monthlyRatePerUnit: 1300 },
  { id: "comunidad", name: "Comunidad", unitsLabel: "31 a 120 unidades", monthlyRatePerUnit: 950, highlight: true },
  { id: "metropoli", name: "Metrópoli", unitsLabel: "Más de 120 unidades", monthlyRatePerUnit: 750 },
];

export function formatColones(amount: number): string {
  return `₡${amount.toLocaleString("es-CR")}`;
}
