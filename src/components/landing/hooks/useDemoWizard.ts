import { useState } from "react";
import { resolvePlanForUnits } from "@/lib/pricing";

export type DemoWizardStep = "choice" | "solo-form";
export type DemoSignupErrorCode = "condominium_exists" | "account_exists" | "unit_count_exceeds_self_serve" | "network";
export type BillingCycle = "MONTHLY" | "ANNUAL";

// Drives the two-step self-serve demo wizard (see
// docs/superpowers/specs/2026-09-09-self-serve-demo-onboarding-design.md). onHandoffToContact is
// the existing selectPlanAndScroll from useLeadForm — the wizard never duplicates that logic,
// it just calls into it and closes itself.
export function useDemoWizard(onHandoffToContact: (planId: string, unitCount?: string) => void) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<DemoWizardStep>("choice");
  const [initialPlanId, setInitialPlanId] = useState<string | undefined>(undefined);

  const [condominiumName, setCondominiumName] = useState("");
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [unitCount, setUnitCount] = useState("");
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("MONTHLY");
  const [website, setWebsite] = useState(""); // honeypot

  const [submitting, setSubmitting] = useState(false);
  const [errorCode, setErrorCode] = useState<DemoSignupErrorCode | null>(null);

  function open(planId?: string) {
    setInitialPlanId(planId);
    setStep("choice");
    setCondominiumName("");
    setAdminName("");
    setAdminEmail("");
    setUnitCount("");
    setBillingCycle("MONTHLY");
    setWebsite("");
    setErrorCode(null);
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  function chooseContact() {
    onHandoffToContact(initialPlanId ?? "esencial");
    close();
  }

  function chooseSolo() {
    setStep("solo-form");
  }

  const parsedUnitCount = Number(unitCount);
  // Derived from the same graduated-pricing table the rest of the site uses (resolvePlanForUnits
  // already returns monthlyTotal: null past the top finite tier) rather than a second, hardcoded
  // "120" boundary that could silently drift from PRICING_PLANS.
  const exceedsSelfServe = unitCount !== "" && Number.isInteger(parsedUnitCount) && parsedUnitCount >= 1 && resolvePlanForUnits(parsedUnitCount).monthlyTotal === null;

  function handoffToContactFromForm() {
    onHandoffToContact("metropoli", unitCount);
    close();
  }

  async function submit(appUrl: string) {
    setSubmitting(true);
    setErrorCode(null);
    try {
      const response = await fetch(`${appUrl}/api/public/demo-signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ condominiumName, adminName, adminEmail, unitCount: Number(unitCount), billingCycle, website }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setErrorCode((data.error as DemoSignupErrorCode) ?? "network");
        return;
      }
      if (data.activationUrl) {
        window.location.href = data.activationUrl;
      }
    } catch {
      setErrorCode("network");
    } finally {
      setSubmitting(false);
    }
  }

  return {
    isOpen, step, initialPlanId, open, close, chooseContact, chooseSolo,
    condominiumName, setCondominiumName, adminName, setAdminName, adminEmail, setAdminEmail,
    unitCount, setUnitCount, billingCycle, setBillingCycle, website, setWebsite,
    exceedsSelfServe, handoffToContactFromForm,
    submitting, errorCode, submit,
  };
}
