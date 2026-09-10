import { ArrowRight, Sparkles } from "lucide-react";

// Rewritten 2026-09-10 to match the real self-serve flow (POST /api/public/demo-signup in
// Condo-Admin-Tool) instead of describing an admin-assisted onboarding ("configuramos tu
// condominio...") that hasn't been how this actually works since self-serve shipped — the old
// copy contradicted the "empezá ahora mismo" pitch DemoPromo/Hero already make.
const STEPS = [
  { number: "1", title: "Completás el formulario", copy: "Elegí tu plan e indicá cuántas unidades tiene tu condominio — menos de un minuto." },
  { number: "2", title: "Activás tu cuenta al instante", copy: "Recibís tu acceso por correo en el momento, sin esperar a que nadie te contacte." },
  { number: "3", title: "Invitás a tus residentes", copy: "Cada uno recibe su propio correo de activación y empiezan a usar Livva el mismo día." },
];

type HowItWorksProps = { onOpenWizard: () => void };

// Same hand-picked dark palette as Hero.tsx and DemoPromo.tsx (not the surface/primary tokens the
// rest of the page uses) — a third dark band breaks up what would otherwise be a long run of
// near-identical light sections between Security and Pricing.
//
// dark:bg-[#16261d] (2026-09-10, UI/UX audit fix): the light-mode literal alone read as *lighter*
// than the page's own dark-mode background (#131a14) once dark mode actually darkens everything
// else, producing a visible seam right under the sticky header instead of the intended "darker
// accent band" contrast — a pine-tinted dark tone distinct in hue (not just lightness) from the
// neutral near-black background keeps the band reading as a deliberate accent in both themes.
export function HowItWorks({ onOpenWizard }: HowItWorksProps) {
  return (
    <section className="bg-[#1f3d2f] px-5 py-20 dark:bg-[#16261d]">
      <div className="mx-auto max-w-[1100px]">
        <div className="mx-auto mb-12 max-w-[560px] text-center">
          <span className="text-[11px] font-black uppercase tracking-[1.6px] text-[#cfe3d5]">Cómo funciona</span>
          <h2 className="mt-2 text-[clamp(24px,3.5vw,34px)] tracking-[-1px] text-white">Configurá la administración de tu condominio en minutos, no semanas</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 tablet:grid-cols-3 tablet:gap-5">
          {STEPS.map((step) => (
            <div key={step.number} className="text-center tablet:text-left">
              <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full bg-white text-[15px] font-black text-[#1f3d2f] tablet:mx-0">{step.number}</div>
              <h3 className="mb-1.5 text-[15px] font-extrabold text-white">{step.title}</h3>
              <p className="text-[13px] leading-relaxed text-[#dcecdf]">{step.copy}</p>
            </div>
          ))}
        </div>
        {/* This section previously had no CTA at all, despite describing the exact flow the
            wizard performs — added so it's also an entry point, matching Hero/DemoPromo/Pricing. */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={onOpenWizard}
            className="inline-flex items-center gap-2 rounded-[11px] bg-white px-6 py-3.5 text-[13px] font-black text-[#1f3d2f] shadow-[0_8px_20px_rgba(0,0,0,0.2)]"
          >
            <Sparkles size={16} /> Iniciar demo <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
