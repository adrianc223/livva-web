import { ArrowRight, Sparkles } from "lucide-react";
import { Logo } from "@/components/Logo";
import { BrowserFrame, PhoneFrame } from "./DeviceFrames";

type HeroProps = { onOpenWizard: () => void };

// dark:bg-[#16261d] — see HowItWorks.tsx's comment on the same fix.
export function Hero({ onOpenWizard }: HeroProps) {
  return (
    <section
      id="inicio"
      className="after:content-[''] relative overflow-hidden bg-[#1f3d2f] px-5 pb-20 pt-16 text-center text-white after:absolute after:-bottom-[150px] after:-right-[150px] after:h-[390px] after:w-[390px] after:rounded-full after:border after:border-white/25 after:shadow-[0_0_0_36px_rgba(255,255,255,0.07),0_0_0_72px_rgba(255,255,255,0.05)] tablet:py-24 tablet:text-left dark:bg-[#16261d]"
    >
      {/* Below tablet: single centered column, no screenshots (kept deliberately text-only on a
          phone-width viewport). At tablet+: two columns — copy/CTAs left, screenshots right —
          via source order alone (no tablet:order-* needed, the grid just follows DOM order). */}
      <div className="relative z-[1] mx-auto flex w-full max-w-[1100px] flex-col items-center tablet:grid tablet:grid-cols-2 tablet:items-center tablet:gap-16">
        <div className="flex flex-col items-center tablet:items-start">
          {/* Large mark at tablet+ only — below that breakpoint the header already carries its
              own logo (Header.tsx), so the brand mark appears exactly once at every width.
              (2026-09-10, UI/UX audit fix: this section used to also render its own small mark
              below tablet, duplicating the header's on every phone/tablet-width screenshot.) */}
          <div className="mb-7 hidden items-center gap-3 text-[26px] font-black tablet:flex">
            <Logo variant="dark" className="h-11 w-auto" /> livva
          </div>
          <div className="max-w-[520px] tablet:max-w-[480px]">
            <span className="text-[11px] font-black uppercase tracking-[1.6px] text-[#cfe3d5]">La plataforma para tu comunidad</span>
            <h1 className="mb-4 mt-3 text-[clamp(36px,6vw,58px)] leading-[0.98] tracking-[-2.6px] tablet:tracking-[-2.8px]">Uniendo comunidades</h1>
            <p className="text-[15px] leading-relaxed text-[#dcecdf]">
              Livva conecta a residentes, administradores y comercios locales en una sola plataforma:
              cuotas, anuncios, reservas, mensajería y un marketplace interno, sin hojas de cálculo ni grupos de chat sueltos.
            </p>
            {/* 2026-09-10, UI/UX audit fix: the wizard (this site's own highest-converting path,
                per Header.tsx's comment) used to be unreachable from the Hero at all — the only
                two options here were "scroll to pricing" and "scroll to contact form," with the
                actual one-step demo signup buried several sections down. "Iniciar demo" is now
                the primary action here, matching the header's own treatment; "Solicitar
                información" is dropped from the Hero specifically (still reachable via the
                wizard's own "Prefiero que me contacten" choice, the header, and the contact
                section) since a third competing button diluted which one to click. */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 tablet:flex-row tablet:justify-start">
              <button
                type="button"
                onClick={onOpenWizard}
                className="flex w-full items-center justify-center gap-2 rounded-[11px] bg-white px-6 py-3.5 text-[13px] font-black text-[#1f3d2f] shadow-[0_8px_20px_rgba(0,0,0,0.2)] tablet:w-auto"
              >
                <Sparkles size={16} /> Iniciar demo
              </button>
              <a
                href="#planes"
                className="flex w-full items-center justify-center gap-2 rounded-[11px] border border-white/35 px-6 py-3.5 text-[13px] font-black text-white tablet:w-auto"
              >
                Ver planes <ArrowRight size={16} />
              </a>
            </div>
            {/* 2026-09-10: reinforces the self-serve pitch right under the CTA without adding a
                second competing button (see the comment above on why "Solicitar información" was
                dropped from here) — just a microcopy line under the one action. */}
            <p className="mt-3 text-center text-[11px] text-[#cfe3d5] tablet:text-left">Sin tarjeta, sin instalaciones — accedés al instante con solo un clic.</p>
          </div>
        </div>
        <div className="relative hidden tablet:block">
          <BrowserFrame src="/screenshots/desktop-resumen.png" alt="Resumen del condominio en Livva" className="h-[300px] w-full" />
          <PhoneFrame
            src="/screenshots/mobile-resumen.png"
            alt="Resumen de Livva en el celular"
            className="absolute -bottom-12 -right-6 h-[270px] w-[132px]"
          />
        </div>
      </div>
    </section>
  );
}
