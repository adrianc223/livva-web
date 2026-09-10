import { Logo } from "@/components/Logo";

const NAV_LINKS = [
  { href: "#funciones", label: "Funciones" },
  { href: "#seguridad", label: "Seguridad" },
  { href: "#planes", label: "Planes" },
  { href: "#contacto", label: "Contacto" },
];

type HeaderProps = { onOpenWizard: () => void };

export function Header({ onOpenWizard }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between px-5 py-4">
        {/* Hidden at tablet+ (desktop) — the Hero already carries a large "livva" mark there,
            so repeating it in the sticky header read as redundant. Kept below that breakpoint,
            where the Hero's own logo is small and this is the primary brand anchor. */}
        <a href="#inicio" className="flex items-center gap-2 text-[17px] font-black text-text tablet:hidden">
          <Logo variant="auto" className="h-7 w-auto" /> livva
        </a>
        <nav className="hidden items-center gap-7 text-[13px] font-bold text-text-muted tablet:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-text">{link.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenWizard}
            className="rounded-[10px] border border-primary/30 bg-transparent px-4 py-2.5 text-[12px] font-black text-primary max-mobile:hidden"
          >
            Iniciar demo
          </button>
          <a
            href="#contacto"
            className="rounded-[10px] bg-primary px-4 py-2.5 text-[12px] font-black text-white shadow-[0_6px_16px_rgba(44,89,67,0.25)]"
          >
            Contactanos
          </a>
        </div>
      </div>
    </header>
  );
}
