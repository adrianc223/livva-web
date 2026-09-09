"use client";

import { ContactSection } from "./ContactSection";
import { Features } from "./Features";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { HowItWorks } from "./HowItWorks";
import { Pricing } from "./Pricing";
import { ValueProps } from "./ValueProps";
import { useLeadForm } from "./hooks/useLeadForm";

export function LandingPage() {
  const { selectedPlan, setSelectedPlan, selectPlanAndScroll, status, error, submitLead } = useLeadForm();

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <ValueProps />
        <Features />
        <HowItWorks />
        <Pricing onSelectPlan={selectPlanAndScroll} />
        <ContactSection selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} status={status} error={error} submitLead={submitLead} />
      </main>
      <Footer />
    </>
  );
}
