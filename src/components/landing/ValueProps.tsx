import { Layers, MessageCircleHeart, ShieldCheck, Wallet } from "lucide-react";

const VALUE_PROPS = [
  { icon: Layers, title: "Todo en un solo lugar", copy: "Cuotas, anuncios, reservas y mensajería en una sola plataforma, sin depender de hojas de cálculo o grupos de chat." },
  { icon: Wallet, title: "Pagos sin fricción", copy: "Los residentes suben su comprobante y el administrador confirma el pago en segundos, con el historial siempre a la vista." },
  { icon: MessageCircleHeart, title: "Comunicación instantánea", copy: "Anuncios y mensajería directa entre residentes, administración y comercios locales, con notificaciones al momento." },
  { icon: ShieldCheck, title: "Transparencia total", copy: "Cada residente ve el estado real de su cuota, sus reservas y la actividad de su comunidad, siempre actualizado." },
];

export function ValueProps() {
  return (
    <section className="mx-auto max-w-[1100px] px-5 py-20">
      <div className="mx-auto mb-12 max-w-[560px] text-center">
        <span className="text-[11px] font-black uppercase tracking-[1.6px] text-primary">Por qué Livva</span>
        <h2 className="mt-2 text-[clamp(24px,3.5vw,34px)] tracking-[-1px] text-text">Una plataforma pensada para comunidades reales</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2 tablet:gap-5">
        {VALUE_PROPS.map(({ icon: Icon, title, copy }) => (
          <div key={title} className="rounded-2xl border border-border bg-surface p-6 shadow-[0_16px_42px_rgba(24,36,26,0.08)]">
            <div className="mb-3 grid h-10 w-10 place-items-center rounded-[10px] bg-primary-soft text-primary"><Icon size={20} /></div>
            <h3 className="mb-1.5 text-[15px] font-extrabold text-text">{title}</h3>
            <p className="text-[13px] leading-relaxed text-text-muted">{copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
