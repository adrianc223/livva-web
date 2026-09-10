import { useState } from "react";
import { resolvePlanForUnits } from "@/lib/pricing";

export type DemoWizardStep = "choice" | "solo-form";
export type DemoSignupErrorCode = "condominium_exists" | "account_exists" | "unit_count_exceeds_self_serve" | "network";
export type BillingCycle = "MONTHLY" | "ANNUAL";
// null = not shown; "prompt" = the "do you manage several condominiums?" question with
// Cancelar/Aceptar; "password" = the follow-up step that actually proves account ownership.
export type LinkStep = "prompt" | "password" | null;
export type LinkErrorCode = "invalid_password" | "network";

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

  // "Multiple condominiums, same account" flow (see CLAUDE.md's "Self-serve demo onboarding" in
  // Condo-Admin-Tool) — triggered when the first submit comes back "account_exists". The visitor
  // has to actually prove they own that account (their real password) before we let a brand-new
  // condominium get attached to it; a bare "yes I do" click on a public form isn't proof of anything.
  const [linkStep, setLinkStep] = useState<LinkStep>(null);
  const [linkPassword, setLinkPassword] = useState("");
  const [linkSubmitting, setLinkSubmitting] = useState(false);
  const [linkErrorCode, setLinkErrorCode] = useState<LinkErrorCode | null>(null);

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
    setLinkStep(null);
    setLinkPassword("");
    setLinkErrorCode(null);
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
    setLinkStep(null);
    try {
      const response = await fetch(`${appUrl}/api/public/demo-signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ condominiumName, adminName, adminEmail, unitCount: Number(unitCount), billingCycle, website }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        const code = (data.error as DemoSignupErrorCode) ?? "network";
        setErrorCode(code);
        if (code === "account_exists") setLinkStep("prompt");
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

  // "Aceptar" on the prompt moves to asking for the password — nothing is sent to the server yet.
  function startLinkPassword() {
    setLinkPassword("");
    setLinkErrorCode(null);
    setLinkStep("password");
  }

  // "Cancelar" at either point drops the whole link flow and returns to the plain form (still
  // showing the original account_exists message, so the visitor can just edit the email instead).
  function cancelLink() {
    setLinkStep(null);
    setLinkPassword("");
    setLinkErrorCode(null);
  }

  async function submitLink(appUrl: string) {
    setLinkSubmitting(true);
    setLinkErrorCode(null);
    try {
      const response = await fetch(`${appUrl}/api/public/demo-signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ condominiumName, adminName, adminEmail, unitCount: Number(unitCount), billingCycle, website, linkPassword }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setLinkErrorCode(data.error === "invalid_password" ? "invalid_password" : "network");
        return;
      }
      if (data.activationUrl) {
        window.location.href = data.activationUrl;
      }
    } catch {
      setLinkErrorCode("network");
    } finally {
      setLinkSubmitting(false);
    }
  }

  return {
    isOpen, step, initialPlanId, open, close, chooseContact, chooseSolo,
    condominiumName, setCondominiumName, adminName, setAdminName, adminEmail, setAdminEmail,
    unitCount, setUnitCount, billingCycle, setBillingCycle, website, setWebsite,
    exceedsSelfServe, handoffToContactFromForm,
    submitting, errorCode, submit,
    linkStep, linkPassword, setLinkPassword, linkSubmitting, linkErrorCode, startLinkPassword, cancelLink, submitLink,
  };
}
