"use client";

import { useState } from "react";
import { Menu, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/Logo";

// Absolute-path anchors ("/#funciones", not bare "#funciones") — 2026-09-10, needed once this
// site grew real subpages (/preguntas-frecuentes, /livva-vs-excel-whatsapp): a bare "#funciones"
// only ever scrolls within the *current* page, so from a subpage (which has no element with that
// id) it silently does nothing. "/#funciones" navigates home first when needed, and is a no-op
// same-page hash jump when already on "/" — same behavior as before there, no regression.
const NAV_LINKS = [
  { href: "/#funciones", label: "Funciones" },
  { href: "/#seguridad", label: "Seguridad" },
  { href: "/#planes", label: "Planes" },
  { href: "/#contacto", label: "Contacto" },
];

type HeaderProps = { onOpenWizard: () => void };

export function Header({ onOpenWizard }: HeaderProps) {
  // 2026-09-10, UI/UX audit fix: below tablet there was previously no way to jump to a section
  // at all (the link nav is tablet:flex-only) — on a single page that runs ~9000px tall on a
  // phone, that left "scroll past everything" as the only way to reach Planes/Contacto directly.
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between px-5 py-4">
        {/* Hidden at tablet+ (desktop) — the Hero already carries a large "livva" mark there,
            so repeating it in the sticky header read as redundant. Kept below that breakpoint,
            where this is the only brand anchor (the Hero's own small mark below tablet was
            removed as a duplicate — see Hero.tsx's 2026-09-10 comment). */}
        <Link href="/#inicio" className="flex items-center gap-2 text-[17px] font-black text-text tablet:hidden">
          <Logo variant="auto" className="h-7 w-auto" /> livva
        </Link>
        <nav className="hidden items-center gap-7 text-[13px] font-bold text-text-muted tablet:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-text">{link.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2.5">
          {/* The bolder, filled treatment (was Contáctanos's) moved here — self-serve signup is
              the higher-value action for both sides, so it gets the more attention-grabbing
              button. Visible on every viewport now (2026-09-10, UI/UX audit fix: used to be
              max-mobile:hidden, meaning the site's own highest-converting action was completely
              unreachable from the sticky header on a phone) — Contáctanos, the lower-priority
              action, is what steps aside on mobile instead, to keep the header from overflowing;
              it's still one tap away via the hamburger menu, the Hero, and the contact section. */}
          <button
            type="button"
            onClick={onOpenWizard}
            className="flex min-h-[44px] items-center gap-1.5 rounded-[10px] bg-primary px-4 py-2.5 text-[12px] font-black text-white shadow-[0_6px_16px_rgba(44,89,67,0.35)] transition-transform hover:scale-[1.04]"
          >
            <Sparkles size={14} /> Iniciar demo
          </button>
          <Link
            href="/#contacto"
            className="hidden min-h-[44px] items-center rounded-[10px] border border-primary/30 bg-transparent px-4 py-2.5 text-[12px] font-black text-primary tablet:flex"
          >
            Contáctanos
          </Link>
          {/* Tap target bumped to a full 44x44px square (was measuring 40px tall as a plain
              text link before this fix) — same 2026-09-10 audit pass. */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileMenuOpen}
            className="grid h-11 w-11 flex-none place-items-center rounded-[10px] border border-border text-text tablet:hidden"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <nav className="flex flex-col gap-1 border-t border-border bg-background px-5 py-3 tablet:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-[8px] px-2 py-3 text-[13px] font-bold text-text-muted hover:bg-surface-muted hover:text-text"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contacto"
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-[8px] px-2 py-3 text-[13px] font-black text-primary hover:bg-surface-muted"
          >
            Contáctanos
          </Link>
        </nav>
      )}
    </header>
  );
}
