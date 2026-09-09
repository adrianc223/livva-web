import { CalendarCheck, CreditCard, Megaphone, MessageSquare, Smartphone, Store } from "lucide-react";

const FEATURES = [
  { icon: CreditCard, title: "Cuotas y pagos", copy: "Cálculo automático de cuotas y moras, comprobantes de pago y reportes en PDF para cada residente." },
  { icon: Megaphone, title: "Anuncios", copy: "Comunicados de la administración con confirmación de lectura, para que ningún aviso importante se pierda." },
  { icon: CalendarCheck, title: "Reservas de amenidades", copy: "Piscina, salón de eventos, cancha — un calendario compartido para reservar sin choques ni llamadas." },
  { icon: MessageSquare, title: "Mensajería directa", copy: "Residentes y administración conversan en un solo canal, sin mezclarse con grupos externos de WhatsApp." },
  { icon: Store, title: "Marketplace interno", copy: "Los vecinos que emprenden pueden vender dentro de su propia comunidad, con aprobación del administrador." },
  { icon: Smartphone, title: "App instalable", copy: "Livva se instala como una app en el celular, con notificaciones push para no perderse nada." },
];

export function Features() {
  return (
    <section id="funciones" className="bg-surface-muted px-5 py-20">
      <div className="mx-auto max-w-[1100px]">
        <div className="mx-auto mb-12 max-w-[560px] text-center">
          <span className="text-[11px] font-black uppercase tracking-[1.6px] text-primary">Funciones</span>
          <h2 className="mt-2 text-[clamp(24px,3.5vw,34px)] tracking-[-1px] text-text">Todo lo que tu comunidad necesita</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 tablet:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, copy }) => (
            <div key={title} className="rounded-2xl border border-border bg-surface p-6">
              <div className="mb-3 grid h-10 w-10 place-items-center rounded-[10px] bg-primary-soft text-primary"><Icon size={20} /></div>
              <h3 className="mb-1.5 text-[15px] font-extrabold text-text">{title}</h3>
              <p className="text-[13px] leading-relaxed text-text-muted">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
