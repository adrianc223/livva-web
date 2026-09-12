"use client";

import { ArrowRight, Check, Sparkles, X } from "lucide-react";
import { SiteChrome } from "./SiteChrome";

// 2026-09-10, SEO/GEO audit — bottom-of-funnel comparison content (the single highest-leverage
// content gap the audit found: this is the page shape that both converts best for B2B SaaS and
// is what an AI assistant answering "cuál es mejor, Excel/WhatsApp o un software para
// administrar mi condominio" would want to cite). Real, honest points grounded in what this app
// actually does — not competitor-bashing, just naming the specific friction every condo admin
// using spreadsheets/chat groups already recognizes.
const POINTS = [
  {
    area: "Cuotas y pagos",
    old: "Comprobantes perdidos entre cientos de mensajes de WhatsApp — nadie sabe con certeza quién ya pagó este mes.",
    livva: "Cada residente reporta su pago con un código único que aparece en el detalle de la transferencia; vos lo encontrás en tu estado de cuenta y confirmás. El historial completo, siempre a la vista.",
  },
  {
    area: "Anuncios",
    old: "Se pierden entre memes, reenvíos y conversaciones que no tienen nada que ver con el condominio.",
    livva: "Un solo lugar donde todos los residentes ven los anuncios reales — sin ruido de por medio.",
  },
  {
    area: "Reservas de áreas comunes",
    old: "Coordinación por chat, reservas dobles, malentendidos sobre quién apartó primero.",
    livva: "Calendario compartido y claro, sin choques de horario.",
  },
  {
    area: "Comunicación con la administración",
    old: "Un mensaje directo se pierde entre decenas de mensajes de otros vecinos en el mismo grupo.",
    livva: "Mensajería directa, organizada por residente, con notificación al momento.",
  },
  {
    area: "Transparencia con los residentes",
    old: "Solo el administrador entiende su propia hoja de cálculo — el resto tiene que preguntar y esperar.",
    livva: "Cada residente ve el estado real de su cuenta y su comunidad, siempre actualizado, sin tener que preguntar.",
  },
  // The five below were added 2026-09-11. The original five are the ones where a spreadsheet and
  // a chat group *almost* work, which is the weakest ground to argue on; these are the ones where
  // they cannot work at all. "Cambio de junta" is the strongest of the lot and was nowhere on the
  // site: it is the number one reason a Costa Rican condominium loses its own administrative
  // memory, and the exact moment someone goes looking for a tool.
  {
    area: "Cambio de junta directiva",
    old: "La hoja se va con el tesorero que se fue, y el grupo lo administra alguien que ya ni vive aquí.",
    livva: "La administración se transfiere en un paso y el historial del condominio se queda donde pertenece.",
  },
  {
    area: "Asambleas y votaciones",
    old: "Contar votos en un chat donde tres personas de la misma casa opinan y nadie sabe cuál cuenta.",
    livva: "Un voto por filial, el resultado se publica al cerrar, y el acta queda guardada.",
  },
  {
    area: "El reglamento y las actas",
    old: "«¿Me pasás el reglamento?» — y alguien lo busca en un chat de hace ocho meses.",
    livva: "Está en Documentos, y quien se mude mañana lo encuentra sin preguntarle a nadie.",
  },
  {
    area: "Visitantes",
    old: "La lista de la casetilla en una libreta, o en un chat que nadie puede buscar.",
    livva: "Quién entró, a qué hora y quién le abrió — buscable, y los datos personales se borran solos a los 90 días.",
  },
  {
    area: "Daños y mantenimiento",
    old: "Se reporta la bomba dañada y se pierde entre mensajes; nadie sabe si alguien la vio.",
    livva: "Un tiquete con estado y prioridad, hasta que se resuelve o se descarta — y el vecino se entera cuando cambia.",
  },
];

export function ComparisonPageContent() {
  return (
    <SiteChrome>
      {(wizard) => (
        <main className="flex-1">
          <section className="mx-auto max-w-[760px] px-5 pb-4 pt-16 text-center tablet:pt-20">
            <span className="text-[11px] font-black uppercase tracking-[1.6px] text-primary">Comparativa</span>
            <h1 className="mt-3 text-[clamp(28px,4.6vw,42px)] tracking-[-1.5px] text-text">Livva vs. Excel y WhatsApp: administrar tu condominio sin el caos</h1>
            <p className="mt-4 text-[14px] leading-relaxed text-text-muted">
              Excel y WhatsApp no fueron pensados para administrar un condominio en Costa Rica — funcionan, hasta que dejan
              de hacerlo. Esto es lo que cambia con Livva, punto por punto.
            </p>
          </section>

          <section className="mx-auto max-w-[900px] px-5 pb-16 pt-8">
            <div className="grid gap-4">
              {POINTS.map(({ area, old, livva }) => (
                <div key={area} className="rounded-2xl border border-border bg-surface p-6 shadow-[0_16px_42px_rgba(24,36,26,0.08)]">
                  <h2 className="mb-3 text-[13px] font-black uppercase tracking-[0.8px] text-primary">{area}</h2>
                  <div className="grid gap-3 tablet:grid-cols-2">
                    <div className="flex items-start gap-2.5 rounded-xl bg-surface-muted p-4">
                      <X size={16} className="mt-0.5 flex-none text-text-muted" />
                      <div>
                        <span className="mb-1 block text-[11px] font-extrabold text-text-muted">Excel y WhatsApp</span>
                        <p className="text-[13px] leading-relaxed text-text-muted">{old}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 rounded-xl bg-primary-soft p-4">
                      <Check size={16} className="mt-0.5 flex-none text-primary" />
                      <div>
                        <span className="mb-1 block text-[11px] font-extrabold text-primary">Con Livva</span>
                        <p className="text-[13px] leading-relaxed text-text">{livva}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Mission-angle close — the point of this page isn't just "más eficiente," it's that
              shared transparency is what actually builds trust between residentes y administración,
              which is the same "unir comunidades" framing the rest of the site leads with. */}
          <section className="bg-[#1f3d2f] px-5 py-16 text-center text-white dark:bg-[#16261d]">
            <div className="mx-auto max-w-[640px]">
              <h2 className="text-[clamp(22px,3.5vw,30px)] tracking-[-1px]">No es solo más orden — es más confianza</h2>
              <p className="mt-4 text-[14px] leading-relaxed text-[#dcecdf]">
                Cuando todos ven la misma información — cuotas, anuncios, reservas — administrar deja de sentirse como
                perseguir a la gente y empieza a sentirse como una comunidad que funciona de verdad.
              </p>
              <button
                type="button"
                onClick={() => wizard.open()}
                className="mt-7 inline-flex items-center gap-2 rounded-[11px] bg-white px-6 py-3.5 text-[13px] font-black text-[#1f3d2f] shadow-[0_8px_20px_rgba(0,0,0,0.2)]"
              >
                <Sparkles size={16} /> Iniciar demo <ArrowRight size={16} />
              </button>
              <p className="mt-3 text-[11px] text-[#cfe3d5]">Sin tarjeta, sin instalaciones — accedés al instante con solo un clic.</p>
            </div>
          </section>
        </main>
      )}
    </SiteChrome>
  );
}
