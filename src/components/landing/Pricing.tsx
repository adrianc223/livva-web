"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { PRICING_PLANS, resolvePlanForUnits } from "@/lib/pricing";

// Every plan gets every feature — the only thing a tier changes is how many units you are
// administering. This list used to be a five-item checklist printed identically inside all three
// cards (see PricingCard.tsx), which read as "look for what your tier is missing." Stated once,
// as a band under the grid, the same fact becomes the argument it always was, and there is room
// to name the whole product instead of an abbreviated five.
const INCLUDED_EVERYWHERE = [
  "Cuotas y pagos",
  "Cuotas extraordinarias por tractos",
  "Anuncios a la comunidad",
  "Mensajería con la administración",
  "Reservas de amenidades",
  "Documentos: reglamento y actas",
  "Marketplace del condominio",
  "Reportes en PDF",
  "Notificaciones push",
  "App instalable en el celular",
];
import { PricingCalculator } from "./PricingCalculator";
import { PricingCard } from "./PricingCard";

export function Pricing({ onSelectPlan }: { onSelectPlan: (planId: string) => void }) {
  const [units, setUnits] = useState("");
  const parsedUnits = Number(units);
  const result = units && parsedUnits > 0 ? resolvePlanForUnits(parsedUnits) : null;

  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Below `tablet`, the 3 cards are a swipeable carousel (see the track's classes below), not a
  // stacked column — a plain single-column stack is what looked bad on mobile. Once the
  // calculator resolves a plan, scroll that card into view here too, so "type your number" and
  // "here's your card, highlighted" stay connected even when the match isn't the one already on
  // screen. `inline: "center"` is what does the horizontal work on mobile; `block: "nearest"`
  // keeps this from also scrolling the page vertically — on tablet+ (a real grid, no horizontal
  // overflow) this call is a no-op since the card's already fully in view.
  useEffect(() => {
    if (!result) return;
    cardRefs.current[result.plan.id]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    // Deliberately keyed on the matched plan's id alone, not the whole `result` object —
    // resolvePlanForUnits returns a fresh object on every keystroke even when the matched plan
    // hasn't changed, and re-scrolling on every digit typed would fight anyone still typing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result?.plan.id]);

  return (
    <section id="planes" className="bg-surface-muted px-5 py-20">
      <div className="mx-auto max-w-[1100px]">
        <div className="mx-auto mb-10 max-w-[560px] text-center">
          <span className="text-[11px] font-black uppercase tracking-[1.6px] text-primary">Planes</span>
          <h2 className="mt-2 text-[clamp(24px,3.5vw,34px)] tracking-[-1px] text-text">Precios de Livva para condominios en Costa Rica</h2>
          <p className="mt-3 text-[13px] text-text-muted">Todas las funcionalidades incluidas sin importar el tamaño — el precio no se elige, se calcula solo según la cantidad de unidades de tu comunidad. Los precios que ves ya incluyen el IVA del 13%: es lo que se te cobra, sin sorpresas en la factura.</p>
        </div>
        <PricingCalculator units={units} onUnitsChange={setUnits} result={result} />
        {/* overflow-x-auto forces the y-axis to clip too (same gotcha as Features.tsx's track) —
            the badge sits above the card's own top edge, and the matched card's shadow/scale grow
            past its box on every side, so this needs real top+bottom padding, not just pb-2. */}
        <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-8 pt-6 tablet:mx-0 tablet:grid tablet:grid-cols-3 tablet:gap-5 tablet:overflow-visible tablet:px-0 tablet:pb-0 tablet:pt-0">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              ref={(element) => { cardRefs.current[plan.id] = element; }}
              className="w-[82%] flex-shrink-0 snap-center tablet:w-auto"
            >
              <PricingCard
                plan={plan}
                onSelect={onSelectPlan}
                matched={result?.plan.id === plan.id}
                matchedTotal={result?.plan.id === plan.id ? result.monthlyTotal : null}
                calculatorActive={result !== null}
              />
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-2xl border border-border bg-surface p-7 tablet:mt-10">
          <div className="text-center">
            <h3 className="text-[17px] font-extrabold text-text">Todas las funciones, en todos los planes</h3>
            <p className="mx-auto mt-2 max-w-[520px] text-[12px] text-text-muted">No guardamos funciones para un plan más caro. Un condominio de 12 casas usa exactamente el mismo Livva que uno de 300 — lo único que cambia es cuántas unidades administrás.</p>
          </div>
          <ul className="mt-6 grid gap-x-5 gap-y-2.5 tablet:grid-cols-2">
            {INCLUDED_EVERYWHERE.map((item) => (
              <li key={item} className="flex items-center gap-2 text-[12px] font-semibold text-text"><Check size={14} className="shrink-0 text-primary" /> {item}</li>
            ))}
          </ul>
        </div>
        <p className="mt-8 text-center text-[12px] text-text-muted">¿Administrás varios condominios o un portafolio más grande? <a href="#contacto" className="font-bold text-primary">Hablemos</a>.</p>
      </div>
    </section>
  );
}
