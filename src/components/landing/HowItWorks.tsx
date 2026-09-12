import { ArrowRight, Sparkles } from "lucide-react";

// Rewritten 2026-09-10 to match the real self-serve flow (POST /api/public/demo-signup in
// Condo-Admin-Tool) instead of describing an admin-assisted onboarding ("configuramos tu
// condominio...") that hasn't been how this actually works since self-serve shipped — the old
// copy contradicted the "empezá ahora mismo" pitch DemoPromo/Hero already make.
// **Each step answers "¿y quién hace ese trabajo?", because that is the real objection.** What
// stops a junta directiva is not price or features — it is "mis vecinos no lo van a usar y me va a
// tocar a mí explicarle a cada uno", which is the same reason the condominium is still on WhatsApp.
// Steps 2 and 3 exist to answer exactly that, and both describe things that already shipped:
// `Condominium.residentSignupToken` / the CSV import, and the per-page, per-role guided tours.
//
// Note what step 3 replaces: the site already promised "sin capacitaciones ni manuales" with
// nothing behind it, while `tutorial` appeared zero times across all three pages. The promise is
// now a checkable fact.
const STEPS = [
  { number: "1", title: "Tu condominio, hoy", copy: "Llenás cinco campos y ya estás adentro. Sin llamada de ventas, sin implementación, sin esperar a que nadie te contacte." },
  { number: "2", title: "Tus vecinos, sin perseguir a nadie", copy: "Compartís un link y cada quien pone sus propios datos. O subís la lista en CSV. Vos no tecleás sesenta correos." },
  { number: "3", title: "Nadie tiene que preguntar cómo se usa", copy: "La primera vez que alguien abre una pantalla, Livva le explica esa pantalla — y le explica distinto según sea administración, dueño, inquilino o caseta. Se puede volver a ver cuando quiera." },
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
          <span className="text-[11px] font-black uppercase tracking-[1.6px] text-[#cfe3d5]">Cómo empezar</span>
          <h2 className="mt-2 text-[clamp(24px,3.5vw,34px)] tracking-[-1px] text-white">Empezar es lo fácil. Eso es justamente lo difícil de creer.</h2>
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
