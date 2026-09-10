const STEPS = [
  { number: "1", title: "Creamos tu comunidad", copy: "Configuramos tu condominio en Livva con tu esquema de cuotas y amenidades." },
  { number: "2", title: "Invitás a tus residentes", copy: "Cada residente recibe un correo para activar su cuenta con contraseña propia." },
  { number: "3", title: "Todos empiezan a usarla", copy: "Pagos, anuncios, reservas y mensajería, disponibles desde el primer día." },
];

// Same hand-picked dark palette as Hero.tsx and DemoPromo.tsx (not the surface/primary tokens the
// rest of the page uses) — a third dark band breaks up what would otherwise be a long run of
// near-identical light sections between Security and Pricing.
//
// dark:bg-[#16261d] (2026-09-10, UI/UX audit fix): the light-mode literal alone read as *lighter*
// than the page's own dark-mode background (#131a14) once dark mode actually darkens everything
// else, producing a visible seam right under the sticky header instead of the intended "darker
// accent band" contrast — a pine-tinted dark tone distinct in hue (not just lightness) from the
// neutral near-black background keeps the band reading as a deliberate accent in both themes.
export function HowItWorks() {
  return (
    <section className="bg-[#1f3d2f] px-5 py-20 dark:bg-[#16261d]">
      <div className="mx-auto max-w-[1100px]">
        <div className="mx-auto mb-12 max-w-[560px] text-center">
          <span className="text-[11px] font-black uppercase tracking-[1.6px] text-[#cfe3d5]">Cómo funciona</span>
          <h2 className="mt-2 text-[clamp(24px,3.5vw,34px)] tracking-[-1px] text-white">Empezar toma minutos, no semanas</h2>
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
      </div>
    </section>
  );
}
