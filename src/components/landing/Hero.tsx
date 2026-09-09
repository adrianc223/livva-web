import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { BrowserFrame, PhoneFrame } from "./DeviceFrames";

export function Hero() {
  return (
    <section
      id="inicio"
      className="after:content-[''] relative flex flex-col items-center overflow-hidden bg-[#1f3d2f] px-5 pb-20 pt-16 text-center text-white after:absolute after:-bottom-[150px] after:-right-[150px] after:h-[390px] after:w-[390px] after:rounded-full after:border after:border-white/25 after:shadow-[0_0_0_36px_rgba(255,255,255,0.07),0_0_0_72px_rgba(255,255,255,0.05)] tablet:pb-28 tablet:pt-20"
    >
      <div className="relative z-[1] mb-10 flex items-center gap-2.5 text-[19px] font-black">
        <Logo variant="dark" className="h-8 w-auto" /> livva
      </div>
      <div className="relative z-[1] max-w-[720px]">
        <span className="text-[11px] font-black uppercase tracking-[1.6px] text-[#cfe3d5]">La plataforma para tu comunidad</span>
        <h1 className="mb-4 mt-3 text-[clamp(36px,6vw,64px)] leading-[0.98] tracking-[-2.6px] tablet:tracking-[-3px]">Uniendo comunidades</h1>
        <p className="mx-auto max-w-[520px] text-[15px] leading-relaxed text-[#dcecdf]">
          Livva conecta a residentes, administradores y comercios locales en una sola plataforma:
          cuotas, anuncios, reservas, mensajería y un marketplace interno, sin hojas de cálculo ni grupos de chat sueltos.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 tablet:flex-row">
          <a
            href="#planes"
            className="flex w-full items-center justify-center gap-2 rounded-[11px] bg-white px-6 py-3.5 text-[13px] font-black text-[#1f3d2f] shadow-[0_8px_20px_rgba(0,0,0,0.2)] tablet:w-auto"
          >
            Ver planes <ArrowRight size={16} />
          </a>
          <a
            href="#contacto"
            className="flex w-full items-center justify-center gap-2 rounded-[11px] border border-white/35 px-6 py-3.5 text-[13px] font-black text-white tablet:w-auto"
          >
            Solicitar información
          </a>
        </div>
      </div>
      <div className="relative z-[1] mt-14 w-full max-w-[880px] tablet:mt-20">
        <BrowserFrame src="/screenshots/desktop-resumen.png" alt="Resumen del condominio en Livva" className="h-[260px] w-full tablet:h-[420px]" />
        <PhoneFrame
          src="/screenshots/mobile-resumen.png"
          alt="Resumen de Livva en el celular"
          className="absolute -bottom-10 -right-2 hidden h-[220px] w-[108px] tablet:block"
        />
      </div>
    </section>
  );
}
