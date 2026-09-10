"use client";

import { ContactSection } from "./ContactSection";
import { DemoPromo } from "./DemoPromo";
import { DemoWizard } from "./DemoWizard";
import { Features } from "./Features";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { HowItWorks } from "./HowItWorks";
import { MobileShowcase } from "./MobileShowcase";
import { Pricing } from "./Pricing";
import { Security } from "./Security";
import { ValueProps } from "./ValueProps";
import { useDemoWizard } from "./hooks/useDemoWizard";
import { useLeadForm } from "./hooks/useLeadForm";

export function LandingPage() {
  const { selectedPlan, setSelectedPlan, unitCount, setUnitCount, selectPlanAndScroll, status, error, submitLead } = useLeadForm();
  const wizard = useDemoWizard(selectPlanAndScroll);

  return (
    <>
      <Header onOpenWizard={() => wizard.open()} />
      <main className="flex-1">
        <Hero />
        <ValueProps />
        <DemoPromo />
        <Features />
        <MobileShowcase />
        <HowItWorks />
        <Security />
        <Pricing onSelectPlan={(planId) => wizard.open(planId)} />
        <ContactSection selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} unitCount={unitCount} setUnitCount={setUnitCount} status={status} error={error} submitLead={submitLead} />
      </main>
      <Footer />
      <DemoWizard {...wizard} />
    </>
  );
}
