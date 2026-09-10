"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCw } from "lucide-react";
import { Logo } from "@/components/Logo";

// Root-level error boundary — catches any unhandled render error instead of falling through
// to Next's unbranded default error screen. `retry` (stable since Next 16.3.0, this repo's
// version) re-fetches and re-renders the boundary's children — prefer it over `reset()`.
export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="grid min-h-screen place-items-center bg-background p-6">
      <div className="w-[min(100%,420px)] rounded-[17px] border border-border bg-surface px-[30px] py-9 text-center shadow-[0_22px_70px_rgba(25,35,28,0.1)]">
        <Logo variant="auto" className="mx-auto mb-6 h-7 w-auto" />
        <div className="mx-auto mb-[18px] grid h-[46px] w-[46px] place-items-center rounded-[13px] bg-primary-soft text-primary">
          <AlertTriangle size={22} />
        </div>
        <h1 className="mb-2.5 text-[19px] tracking-[-0.4px] text-text">Algo salió mal</h1>
        <p className="mb-[22px] text-xs leading-[1.6] text-text-muted">
          Tuvimos un problema inesperado. Podés intentar de nuevo en un momento.
        </p>
        <button
          onClick={() => retry()}
          className="inline-flex w-full items-center justify-center gap-2 rounded-[11px] bg-primary px-6 py-3.5 text-[13px] font-black text-white"
        >
          <RotateCw size={15} /> Reintentar
        </button>
      </div>
    </div>
  );
}
