import Link from "next/link";
import { SearchX } from "lucide-react";
import { Logo } from "@/components/Logo";

// Root-level not-found.tsx automatically catches any unmatched URL app-wide
// (Next.js 16, no extra config needed) as well as any notFound() thrown by a segment.
export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-background p-6">
      <div className="w-[min(100%,420px)] rounded-[17px] border border-border bg-surface px-[30px] py-9 text-center shadow-[0_22px_70px_rgba(25,35,28,0.1)]">
        <Logo variant="auto" className="mx-auto mb-6 h-7 w-auto" />
        <div className="mx-auto mb-[18px] grid h-[46px] w-[46px] place-items-center rounded-[13px] bg-primary-soft text-primary">
          <SearchX size={22} />
        </div>
        <h1 className="mb-2.5 text-[19px] tracking-[-0.4px] text-text">No encontramos esta página</h1>
        <p className="mb-[22px] text-xs leading-[1.6] text-text-muted">
          Puede que el enlace esté desactualizado o que la página se haya movido.
        </p>
        <Link
          href="/"
          className="inline-flex w-full items-center justify-center gap-2 rounded-[11px] bg-primary px-6 py-3.5 text-[13px] font-black text-white"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
