import { CalendarCheck, Coins, Layers, Store, Users } from "lucide-react";

// "¿Por qué esta y no otra?", answered immediately before the reader sees the price.
//
// **Deliberately names nobody.** A comparison table against the local competitors was considered
// and rejected: for the segment Livva actually serves today — a junta directiva, not a management
// company shopping for software — those competitors are invisible, and publishing a table makes
// them visible at Livva's own expense. It would also have to quote their unbundled entry tiers,
// which undercut Livva's all-inclusive price, and list the four things Livva genuinely does not
// have (water-meter readings, aging reports, factura electrónica, native store apps) or mislead
// by omission. Worst of all, a hand-maintained table of someone else's prices ages badly and
// silently, in a repo with no test suite.
//
// So: five claims that are true of Livva, verifiable, and awkward to copy — none of which expire
// when a competitor changes a price. Placement matters as much as content: this frames the number
// rather than competing with it, which is why it sits between Security and Pricing.
//
// The "Por qué Livva" eyebrow is already taken by ValueProps, hence a different one here.
const POINTS = [
  {
    icon: Layers,
    title: "Un solo precio, todas las funciones",
    body: "No hay módulos que activar después ni versiones que se le quedan cortas. Cuotas, asambleas, visitantes, mantenimiento, documentos, reservas y comercios vienen incluidos desde la primera unidad.",
  },
  {
    icon: CalendarCheck,
    title: "Entrás hoy, no en una semana",
    body: "Creás tu condominio en un formulario de cinco campos y quedás adentro. Sin llamada de ventas, sin costo de implementación, sin migración previa.",
  },
  {
    icon: Coins,
    title: "Precio en colones, fijo",
    body: "Tu cuota no se mueve cuando se mueve el dólar. Lo que ves publicado es lo que se te cobra, con IVA incluido.",
  },
  {
    icon: Users,
    title: "Los residentes no son espectadores",
    body: "Proponen anuncios, votan en asamblea, abren su propio comercio y reportan un daño. No solo consultan su estado de cuenta.",
  },
  {
    icon: Store,
    title: "El vecino que emprende tiene dónde vender",
    body: "Un marketplace interno del condominio, para quien hace pan, arregla jardines o cuida mascotas. La comunidad no es solo una lista de cobros.",
  },
];

export function Differentiation() {
  return (
    <section className="border-t border-border bg-surface px-6 py-[72px] max-mobile:px-4 max-mobile:py-12" id="diferencia">
      <div className="mx-auto max-w-[1080px]">
        <div className="max-w-[640px]">
          <span className="text-[11px] font-black uppercase tracking-[1.6px] text-primary">Cómo nos diferenciamos</span>
          <h2 className="mt-2 text-[clamp(24px,3.5vw,34px)] tracking-[-1px] text-text">Por qué Livva y no otra herramienta</h2>
          <p className="mt-3 text-[13px] text-text-muted">
            Hay varias formas de administrar un condominio. Estas son las cinco cosas que hacemos distinto, y que podés comprobar antes de pagar nada.
          </p>
        </div>
        <div className="mt-8 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
          {POINTS.map(({ icon: Icon, title, body }) => (
            <article className="rounded-2xl border border-border bg-background p-5" key={title}>
              <span className="grid h-10 w-10 place-items-center rounded-[12px] bg-primary-soft text-primary"><Icon size={19} /></span>
              <h3 className="mt-3.5 text-[15px] font-extrabold text-text">{title}</h3>
              <p className="mt-1.5 text-[12px] leading-relaxed text-text-muted">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
