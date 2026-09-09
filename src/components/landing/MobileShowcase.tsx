import { PhoneFrame } from "./DeviceFrames";

const PHONES = [
  { src: "/screenshots/mobile-anuncios.png", alt: "Anuncios en el celular" },
  { src: "/screenshots/mobile-cuotas.png", alt: "Cuotas y pagos en el celular" },
  { src: "/screenshots/mobile-mensajes.png", alt: "Mensajería en el celular" },
];

export function MobileShowcase() {
  return (
    <section className="mx-auto max-w-[1100px] px-5 py-20">
      <div className="grid items-center gap-10 tablet:grid-cols-[1fr_auto]">
        <div className="text-center tablet:text-left">
          <span className="text-[11px] font-black uppercase tracking-[1.6px] text-primary">También en tu celular</span>
          <h2 className="mt-2 text-[clamp(24px,3.5vw,34px)] tracking-[-1px] text-text">La misma comunidad, en tu bolsillo</h2>
          <p className="mx-auto mt-3 max-w-[420px] text-[13px] leading-relaxed text-text-muted tablet:mx-0">
            Livva se instala como una app en el celular — con notificaciones push, sin descargarla de ninguna tienda de aplicaciones.
          </p>
        </div>
        <div className="mx-auto flex items-end justify-center gap-4">
          {PHONES.map((phone, index) => (
            <PhoneFrame
              key={phone.src}
              src={phone.src}
              alt={phone.alt}
              className={index === 1 ? "h-[340px] w-[168px]" : "hidden h-[280px] w-[138px] tablet:block"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
