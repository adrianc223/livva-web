import { ArrowRight, Sparkles, Unlock, Zap } from "lucide-react";

const DEMO_POINTS = [
  { icon: Unlock, title: "Sin compromiso", copy: "Probá Livva con tus residentes reales durante 30 días. Si no es para ustedes, no pagan nada." },
  { icon: Zap, title: "Activación en minutos", copy: "Cargá tus unidades y empezá a usarlo el mismo día — sin instalaciones ni configuraciones largas." },
  { icon: Sparkles, title: "Fácil desde el primer día", copy: "Residentes y administración se acostumbran a Livva sin capacitaciones ni manuales." },
];

export function DemoPromo() {
  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-[1100px]">
        <div className="mx-auto mb-12 max-w-[560px] text-center">
          <span className="text-[11px] font-black uppercase tracking-[1.6px] text-primary">Probalo primero</span>
          <h2 className="mt-2 text-[clamp(24px,3.5vw,34px)] tracking-[-1px] text-text">Un mes completo de Livva, sin compromiso</h2>
          <p className="mt-3 text-[13px] text-text-muted">Activá tu condominio hoy y probá Livva con tus residentes reales durante 30 días — sin tarjeta, sin contratos, sin letra pequeña.</p>
        </div>
        <div className="grid grid-cols-1 gap-4 tablet:grid-cols-3">
          {DEMO_POINTS.map(({ icon: Icon, title, copy }) => (
            <div key={title} className="rounded-2xl border border-border bg-surface p-6 shadow-[0_16px_42px_rgba(24,36,26,0.08)]">
              <div className="mb-3 grid h-10 w-10 place-items-center rounded-[10px] bg-primary-soft text-primary"><Icon size={20} /></div>
              <h3 className="mb-1.5 text-[15px] font-extrabold text-text">{title}</h3>
              <p className="text-[13px] leading-relaxed text-text-muted">{copy}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href="#planes"
            className="inline-flex items-center gap-2 rounded-[11px] bg-primary px-6 py-3.5 text-[13px] font-black text-white shadow-[0_8px_20px_rgba(44,89,67,0.2)]"
          >
            Ver planes <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
