import { Logo } from "@/components/Logo";

type FooterProps = { onOpenTerms: () => void; onOpenSecurity: () => void };

export function Footer({ onOpenTerms, onOpenSecurity }: FooterProps) {
  return (
    <footer className="border-t border-border px-5 py-10">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-4 text-center tablet:flex-row tablet:text-left">
        <div className="flex items-center gap-2 text-[14px] font-black text-text"><Logo variant="auto" className="h-6 w-auto" /> livva</div>
        <p className="text-[12px] text-text-muted">Uniendo comunidades, una a la vez.</p>
        <div className="flex flex-col items-center gap-2 text-[12px] text-text-muted tablet:flex-row tablet:items-center">
          <a href="#contacto" className="font-bold text-primary">Contáctanos</a>
          <span className="hidden tablet:inline">·</span>
          <button type="button" onClick={onOpenTerms} className="border-0 bg-transparent p-0 text-[12px] text-text-muted hover:text-primary hover:underline">Términos y condiciones</button>
          <span className="hidden tablet:inline">·</span>
          <button type="button" onClick={onOpenSecurity} className="border-0 bg-transparent p-0 text-[12px] text-text-muted hover:text-primary hover:underline">Seguridad</button>
          <span className="hidden tablet:inline">·</span>
          <span>© {new Date().getFullYear()} Livva</span>
        </div>
      </div>
    </footer>
  );
}
