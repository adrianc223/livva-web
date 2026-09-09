const STEPS = [
  { number: "1", title: "Creamos tu comunidad", copy: "Configuramos tu condominio en Livva con tu esquema de cuotas y amenidades." },
  { number: "2", title: "Invitás a tus residentes", copy: "Cada residente recibe un correo para activar su cuenta con contraseña propia." },
  { number: "3", title: "Todos empiezan a usarla", copy: "Pagos, anuncios, reservas y mensajería, disponibles desde el primer día." },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-[1100px] px-5 py-20">
      <div className="mx-auto mb-12 max-w-[560px] text-center">
        <span className="text-[11px] font-black uppercase tracking-[1.6px] text-primary">Cómo funciona</span>
        <h2 className="mt-2 text-[clamp(24px,3.5vw,34px)] tracking-[-1px] text-text">Empezar toma minutos, no semanas</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 tablet:grid-cols-3 tablet:gap-5">
        {STEPS.map((step) => (
          <div key={step.number} className="text-center tablet:text-left">
            <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full bg-primary text-[15px] font-black text-white tablet:mx-0">{step.number}</div>
            <h3 className="mb-1.5 text-[15px] font-extrabold text-text">{step.title}</h3>
            <p className="text-[13px] leading-relaxed text-text-muted">{step.copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
