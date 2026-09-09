import { ArrowRight, Sparkles, Unlock, Zap } from "lucide-react";

const DEMO_POINTS = [
  { icon: Unlock, title: "Sin compromiso", copy: "Probá Livva con tus residentes reales durante 30 días. Si no es para ustedes, no pagan nada." },
  { icon: Zap, title: "Activación en minutos", copy: "Cargá tus unidades y empezá a usarlo el mismo día — sin instalaciones ni configuraciones largas." },
  { icon: Sparkles, title: "Fácil desde el primer día", copy: "Residentes y administración se acostumbran a Livva sin capacitaciones ni manuales." },
];

// Deliberately hand-picked colors (not the surface/primary tokens the rest of the site uses) —
// same dark-green language as Hero.tsx, so this reads as the site's other "make it pop" moment,
// not a random one-off. Light-on-dark for the section itself; the point-cards flip back to
// white so they pop with real contrast against the dark band instead of blending into it.
export function DemoPromo() {
  return (
    <section className="after:content-[''] relative overflow-hidden bg-[#1f3d2f] px-5 py-20 text-center after:absolute after:-left-[130px] after:-top-[130px] after:h-[340px] after:w-[340px] after:rounded-full after:border after:border-white/20 after:shadow-[0_0_0_32px_rgba(255,255,255,0.06),0_0_0_64px_rgba(255,255,255,0.04)]">
      <div className="relative z-[1] mx-auto max-w-[1100px]">
        <div className="mx-auto mb-12 max-w-[560px]">
          <span className="text-[11px] font-black uppercase tracking-[1.6px] text-[#cfe3d5]">Probalo primero</span>
          <h2 className="mt-2 text-[clamp(26px,3.8vw,36px)] tracking-[-1px] text-white">Un mes completo de Livva, sin compromiso</h2>
          <p className="mt-3 text-[13px] leading-relaxed text-[#dcecdf]">Activá tu condominio hoy y probá Livva con tus residentes reales durante 30 días — sin tarjeta, sin contratos, sin letra pequeña.</p>
        </div>
        <div className="grid grid-cols-1 gap-4 tablet:grid-cols-3">
          {DEMO_POINTS.map(({ icon: Icon, title, copy }) => (
            <div key={title} className="rounded-2xl bg-white p-6 text-left shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
              <div className="mb-3 grid h-10 w-10 place-items-center rounded-[10px] bg-[#e2ece5] text-[#1f3d2f]"><Icon size={20} /></div>
              <h3 className="mb-1.5 text-[15px] font-extrabold text-[#16241c]">{title}</h3>
              <p className="text-[13px] leading-relaxed text-[#516358]">{copy}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <a
            href="#planes"
            className="inline-flex items-center gap-2 rounded-[11px] bg-white px-6 py-3.5 text-[13px] font-black text-[#1f3d2f] shadow-[0_8px_20px_rgba(0,0,0,0.2)]"
          >
            Ver planes <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
