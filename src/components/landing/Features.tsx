import { BrowserFrame } from "./DeviceFrames";

const FEATURES = [
  { title: "Cuotas y pagos", copy: "Cálculo automático de cuotas y moras, comprobantes de pago y reportes en PDF para cada residente.", image: "/screenshots/desktop-cuotas.png" },
  { title: "Anuncios", copy: "Comunicados de la administración con confirmación de lectura, para que ningún aviso importante se pierda.", image: "/screenshots/desktop-anuncios.png" },
  { title: "Reservas de amenidades", copy: "Piscina, salón de eventos, cancha — un calendario compartido para reservar sin choques ni llamadas.", image: "/screenshots/desktop-reservas.png" },
  { title: "Comercios locales", copy: "Los vecinos que emprenden publican su negocio, con aprobación del administrador antes de salir al público.", image: "/screenshots/desktop-comercios.png" },
  { title: "Marketplace interno", copy: "Los residentes compran y consultan directamente con los comercios de su propia comunidad.", image: "/screenshots/desktop-marketplace.png" },
  { title: "Mensajería directa", copy: "Residentes y administración conversan en un solo canal, sin mezclarse con grupos externos de WhatsApp.", image: "/screenshots/desktop-mensajes.png" },
];

// Duplicated once so the marquee loop (globals.css's .animate-marquee, translateX 0 -> -50%)
// has a second identical half to scroll into — without this the strip would visibly "reset"
// every cycle instead of looping seamlessly.
const LOOP = [...FEATURES, ...FEATURES];

export function Features() {
  return (
    <section id="funciones" className="bg-surface-muted py-20">
      <div className="mx-auto mb-12 max-w-[560px] px-5 text-center">
        <span className="text-[11px] font-black uppercase tracking-[1.6px] text-primary">Funciones</span>
        <h2 className="mt-2 text-[clamp(24px,3.5vw,34px)] tracking-[-1px] text-text">Así se ve por dentro</h2>
        <p className="mt-3 text-[13px] text-text-muted">Capturas reales de la aplicación — no maquetas.</p>
      </div>
      <div className="group overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
        <div className="flex w-max gap-5 px-5 animate-marquee group-hover:[animation-play-state:paused]">
          {LOOP.map((feature, index) => (
            <div key={`${feature.title}-${index}`} className="w-[300px] flex-shrink-0 rounded-2xl border border-border bg-surface p-3 shadow-[0_16px_42px_rgba(24,36,26,0.08)]">
              <BrowserFrame src={feature.image} alt={feature.title} className="h-[180px] w-full" />
              <h3 className="mb-1 mt-3.5 px-1 text-[14px] font-extrabold text-text">{feature.title}</h3>
              <p className="px-1 text-[12px] leading-relaxed text-text-muted">{feature.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
