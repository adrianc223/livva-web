import { PRICING_PLANS } from "@/lib/pricing";
import { PricingCard } from "./PricingCard";

export function Pricing({ onSelectPlan }: { onSelectPlan: (planId: string) => void }) {
  return (
    <section id="planes" className="bg-surface-muted px-5 py-20">
      <div className="mx-auto max-w-[1100px]">
        <div className="mx-auto mb-12 max-w-[560px] text-center">
          <span className="text-[11px] font-black uppercase tracking-[1.6px] text-primary">Planes</span>
          <h2 className="mt-2 text-[clamp(24px,3.5vw,34px)] tracking-[-1px] text-text">Un precio justo para el tamaño de tu comunidad</h2>
          <p className="mt-3 text-[13px] text-text-muted">Todas las funcionalidades incluidas en los tres planes — el precio por unidad baja mientras más grande es tu comunidad.</p>
        </div>
        <div className="grid grid-cols-1 gap-5 tablet:grid-cols-3">
          {PRICING_PLANS.map((plan) => <PricingCard key={plan.id} plan={plan} onSelect={onSelectPlan} />)}
        </div>
        <p className="mt-8 text-center text-[12px] text-text-muted">¿Administrás varios condominios o un portafolio más grande? <a href="#contacto" className="font-bold text-primary">Hablemos</a>.</p>
      </div>
    </section>
  );
}
