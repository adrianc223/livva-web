import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="border-t border-border px-5 py-10">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-4 text-center tablet:flex-row tablet:text-left">
        <div className="flex items-center gap-2 text-[14px] font-black text-text"><Logo variant="auto" className="h-6 w-auto" /> livva</div>
        <p className="text-[12px] text-text-muted">Uniendo comunidades, una a la vez.</p>
        <div className="text-[12px] text-text-muted">
          <a href="#contacto" className="font-bold text-primary">Contactanos</a>
          <span className="mx-1.5">·</span>© {new Date().getFullYear()} Livva
        </div>
      </div>
    </footer>
  );
}
