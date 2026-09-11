"use client";

import { useState } from "react";
import { Differentiation } from "./Differentiation";
import { ContactSection } from "./ContactSection";
import { DemoPromo } from "./DemoPromo";
import { DemoWizard } from "./DemoWizard";
import { Features } from "./Features";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { HowItWorks } from "./HowItWorks";
import { LegalModal } from "./LegalModal";
import { MobileShowcase } from "./MobileShowcase";
import { Pricing } from "./Pricing";
import { Security } from "./Security";
import { ValueProps } from "./ValueProps";
import { useDemoWizard } from "./hooks/useDemoWizard";
import { useLeadForm } from "./hooks/useLeadForm";

export function LandingPage() {
  const { selectedPlan, setSelectedPlan, unitCount, setUnitCount, selectPlanAndScroll, status, error, submitLead } = useLeadForm();
  const wizard = useDemoWizard(selectPlanAndScroll);
  // Static Terms/Security content, ported from Condo-Admin-Tool's own LegalModal.tsx — same
  // "terms" | "security" | null state shape and sibling-modal placement that app already uses.
  const [legalModal, setLegalModal] = useState<"terms" | "security" | null>(null);

  return (
    <>
      <Header onOpenWizard={() => wizard.open()} />
      <main className="flex-1">
        <Hero onOpenWizard={() => wizard.open()} />
        <ValueProps />
        <DemoPromo onOpenWizard={() => wizard.open()} />
        <Features />
        <MobileShowcase />
        <HowItWorks onOpenWizard={() => wizard.open()} />
        <Security />
        {/* Sits immediately before the price so it frames the number rather than competing with
            it — "¿por qué esta y no otra?" answered while the reader is deciding, not after. */}
        <Differentiation />
        {/* Metrópoli has no self-serve rate — that card's own button label already reads
            "Contáctanos" (see PricingCard.tsx), and clicking it skips the wizard entirely and
            goes straight to the contact form, same as choosing "Prefiero que me contacten". */}
        <Pricing onSelectPlan={(planId) => (planId === "metropoli" ? selectPlanAndScroll(planId) : wizard.open(planId))} />
        <ContactSection selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} unitCount={unitCount} setUnitCount={setUnitCount} status={status} error={error} submitLead={submitLead} />
      </main>
      <Footer onOpenTerms={() => setLegalModal("terms")} onOpenSecurity={() => setLegalModal("security")} />
      <DemoWizard {...wizard} />
      {legalModal && <LegalModal topic={legalModal} onClose={() => setLegalModal(null)} />}
    </>
  );
}
