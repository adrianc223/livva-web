"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DemoWizard } from "./DemoWizard";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { LegalModal } from "./LegalModal";
import { useDemoWizard } from "./hooks/useDemoWizard";

type SiteChromeProps = { children: (wizard: ReturnType<typeof useDemoWizard>) => React.ReactNode };

// Shared Header/Footer/DemoWizard/LegalModal wiring for the site's subpages (2026-09-10, SEO
// audit — /preguntas-frecuentes and /livva-vs-excel-whatsapp) — extracted here rather than
// duplicated a third time, since LandingPage.tsx already has this exact wiring for the homepage.
// LandingPage.tsx itself is deliberately left as-is (not refactored to use this too) to avoid any
// risk of regressing the site's actual highest-traffic page for a pure duplication cleanup.
//
// The "contact me instead" fallback navigates home to #contacto (a real page load) instead of
// LandingPage's own selectPlanAndScroll (an in-page scroll) — there's no #contacto section on a
// subpage to scroll to. The self-serve signup path itself (the wizard's primary conversion flow)
// is unaffected either way, since it POSTs directly to Condo-Admin-Tool's API regardless of which
// page it's mounted on.
export function SiteChrome({ children }: SiteChromeProps) {
  const router = useRouter();
  const wizard = useDemoWizard(() => {
    router.push("/#contacto");
  });
  const [legalModal, setLegalModal] = useState<"terms" | "security" | null>(null);

  return (
    <>
      <Header onOpenWizard={() => wizard.open()} />
      {children(wizard)}
      <Footer onOpenTerms={() => setLegalModal("terms")} onOpenSecurity={() => setLegalModal("security")} />
      <DemoWizard {...wizard} />
      {legalModal && <LegalModal topic={legalModal} onClose={() => setLegalModal(null)} />}
    </>
  );
}
