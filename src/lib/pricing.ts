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
  maxUnits: number | null;
  monthlyRatePerUnit: number | null;
  highlight?: boolean;
  /**
   * One sentence saying what this tier's rate actually applies to. The graduated model is the
   * single most misread thing on this page: Comunidad's headline rate invites a reader to
   * multiply it by their unit count, which is not what they would be charged, because their
   * first 30 units stay at Esencial's rate. Saying so on the card is cheaper than letting
   * someone discover it at signup.
   */
  rateExplainer: string;
  /**
   * A representative unit count inside this tier. The card turns it into a worked total through
   * resolvePlanForUnits, never a hardcoded figure — a worked example that can drift from the
   * calculator sitting directly above it is worse than no example at all.
   */
  exampleUnits: number;
};

export const ANNUAL_DISCOUNT_PERCENT = 12;

export const PRICING_PLANS: PricingPlan[] = [
  { id: "esencial", name: "Esencial", unitsLabel: "Hasta 30 unidades", maxUnits: 30, monthlyRatePerUnit: 1500, rateExplainer: "Pagás por unidad registrada. Si tu condominio tiene 18 casas, pagás 18 — no un paquete de 30.", exampleUnits: 18 },
  { id: "comunidad", name: "Comunidad", unitsLabel: "31 a 120 unidades", maxUnits: 120, monthlyRatePerUnit: 1400, highlight: true, rateExplainer: "Esta tarifa aplica de la unidad 31 en adelante; las primeras 30 se mantienen en ₡1 500. Crecer nunca te sube el precio de golpe.", exampleUnits: 60 },
  { id: "metropoli", name: "Metrópoli", unitsLabel: "Más de 120 unidades", maxUnits: null, monthlyRatePerUnit: null, rateExplainer: "Pasando las 120 unidades el precio lo conversamos con vos. Lo de abajo es el punto de partida, no el techo.", exampleUnits: 120 },
];

export function formatColones(amount: number): string {
  return `₡${amount.toLocaleString("es-CR")}`;
}

// Which plan a given unit count actually falls into, and — for the calculator — the exact
// graduated monthly total for that count (null past the top tier, where price is negotiated).
// Not a plain "units × your plan's rate": a Comunidad-sized building's total already includes
// the first 30 units at Esencial's rate, same graduated logic as the internal billing suggestion.
export function resolvePlanForUnits(unitCount: number): { plan: PricingPlan; monthlyTotal: number | null } {
  const units = Math.max(0, Math.round(unitCount));
  const plan = PRICING_PLANS.find((candidate) => candidate.maxUnits === null || units <= candidate.maxUnits) ?? PRICING_PLANS[PRICING_PLANS.length - 1];

  if (plan.monthlyRatePerUnit === null) return { plan, monthlyTotal: null };

  let monthlyTotal = 0;
  let previousMax = 0;
  for (const tier of PRICING_PLANS) {
    if (tier.monthlyRatePerUnit === null || units <= previousMax) break;
    const tierCeiling = tier.maxUnits ?? units;
    const unitsInThisTier = Math.min(units, tierCeiling) - previousMax;
    monthlyTotal += unitsInThisTier * tier.monthlyRatePerUnit;
    previousMax = tierCeiling;
    if (tier.id === plan.id) break;
  }
  return { plan, monthlyTotal };
}

// The annual (discounted) equivalent of resolvePlanForUnits — mirrors Condo-Admin-Tool's
// suggestAnnualAmount exactly (same 12% discount, same round-to-nearest-₡1,000), since a self-serve
// signup or plan resize made against one of these numbers has to charge exactly what was previewed
// here. Null past the top tier, same boundary as resolvePlanForUnits — no rate to discount.
export function resolveAnnualPlanForUnits(unitCount: number): { plan: PricingPlan; monthlyTotal: number | null; annualBeforeDiscount: number | null; annualAmount: number | null } {
  const { plan, monthlyTotal } = resolvePlanForUnits(unitCount);
  if (monthlyTotal === null) return { plan, monthlyTotal: null, annualBeforeDiscount: null, annualAmount: null };

  const annualBeforeDiscount = monthlyTotal * 12;
  const annualAmount = Math.round((annualBeforeDiscount * (1 - ANNUAL_DISCOUNT_PERCENT / 100)) / 1000) * 1000;
  return { plan, monthlyTotal, annualBeforeDiscount, annualAmount };
}

// IVA. Mirrors Condo-Admin-Tool's src/lib/billing/iva.ts, hand-kept in sync the same way the
// tiers above are — same two constants, same assumption, same caveat.
//
// **Published prices are the taxable base; IVA is added on top.** Until 2026-09-11 the page said
// "₡1 500" with nothing after it, so a prospect could not tell whether that was what they would
// pay or 88.5% of it. That ambiguity was the defect. The assumption follows Costa Rican B2B
// convention for services and what the nearest direct competitor states on its own page, and it
// is the reading that does not silently cut the taxable base by 11.5% without anyone deciding to.
//
// Flip PRICES_INCLUDE_IVA in both repos if the accountant says otherwise.
export const IVA_RATE = 0.13;
export const PRICES_INCLUDE_IVA = false;
export const IVA_LABEL = `IVA ${Math.round(IVA_RATE * 100)}%`;

export function ivaFor(amount: number): number {
  if (PRICES_INCLUDE_IVA) return Math.round(amount - amount / (1 + IVA_RATE));
  return Math.round(amount * IVA_RATE);
}

export function totalWithIva(amount: number): number {
  return PRICES_INCLUDE_IVA ? Math.round(amount) : Math.round(amount) + ivaFor(amount);
}

