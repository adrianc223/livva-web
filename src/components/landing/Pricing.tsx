"use client";

import { useState } from "react";
import { PRICING_PLANS, resolvePlanForUnits } from "@/lib/pricing";
import { PricingCalculator } from "./PricingCalculator";
import { PricingCard } from "./PricingCard";

export function Pricing({ onSelectPlan }: { onSelectPlan: (planId: string) => void }) {
  const [units, setUnits] = useState("");
  const parsedUnits = Number(units);
  const result = units && parsedUnits > 0 ? resolvePlanForUnits(parsedUnits) : null;

  return (
    <section id="planes" className="bg-surface-muted px-5 py-20">
      <div className="mx-auto max-w-[1100px]">
        <div className="mx-auto mb-10 max-w-[560px] text-center">
          <span className="text-[11px] font-black uppercase tracking-[1.6px] text-primary">Planes</span>
          <h2 className="mt-2 text-[clamp(24px,3.5vw,34px)] tracking-[-1px] text-text">Así se calcula el precio de tu residencial</h2>
          <p className="mt-3 text-[13px] text-text-muted">Todas las funcionalidades incluidas sin importar el tamaño — el precio no se elige, se calcula solo según la cantidad de unidades de tu comunidad.</p>
        </div>
        <PricingCalculator units={units} onUnitsChange={setUnits} result={result} />
        <div className="grid grid-cols-1 gap-5 tablet:grid-cols-3">
          {PRICING_PLANS.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              onSelect={onSelectPlan}
              matched={result?.plan.id === plan.id}
              matchedTotal={result?.plan.id === plan.id ? result.monthlyTotal : null}
              calculatorActive={result !== null}
            />
          ))}
        </div>
        <p className="mt-8 text-center text-[12px] text-text-muted">¿Administrás varios condominios o un portafolio más grande? <a href="#contacto" className="font-bold text-primary">Hablemos</a>.</p>
      </div>
    </section>
  );
}
