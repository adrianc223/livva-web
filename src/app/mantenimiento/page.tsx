import type { Metadata } from "next";
import { Wrench } from "lucide-react";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = { title: "Mantenimiento | Livva" };

// Shown for every route while the MAINTENANCE_MODE env var is "true" — see src/proxy.ts.
// A planned-downtime counterpart to error.tsx/global-error.tsx, which instead handle an
// unplanned break automatically, with no toggle involved.
export default function MaintenancePage() {
  return (
    <div className="grid min-h-screen place-items-center bg-background p-6">
      <div className="w-[min(100%,420px)] rounded-[17px] border border-border bg-surface px-[30px] py-9 text-center shadow-[0_22px_70px_rgba(25,35,28,0.1)]">
        <Logo variant="auto" className="mx-auto mb-6 h-7 w-auto" />
        <div className="mx-auto mb-[18px] grid h-[46px] w-[46px] place-items-center rounded-[13px] bg-primary-soft text-primary">
          <Wrench size={22} />
        </div>
        <h1 className="mb-2.5 text-[19px] tracking-[-0.4px] text-text">Estamos en mantenimiento</h1>
        <p className="text-xs leading-[1.6] text-text-muted">
          Estamos haciendo una mejora programada. Volvemos a estar disponibles en breve — gracias por tu paciencia.
        </p>
      </div>
    </div>
  );
}
