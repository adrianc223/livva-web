"use client";

import { FormEvent, useState } from "react";
import { PRICING_PLANS } from "@/lib/pricing";

export type LeadFormStatus = "idle" | "sending" | "sent" | "error";

export function useLeadForm() {
  const [selectedPlan, setSelectedPlan] = useState<string>(PRICING_PLANS[0].id);
  const [status, setStatus] = useState<LeadFormStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  function selectPlanAndScroll(planId: string) {
    setSelectedPlan(planId);
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  }

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    setStatus("sending");
    setError(null);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          community: form.get("community"),
          email: form.get("email"),
          plan: form.get("plan"),
          message: form.get("message"),
          website: form.get("website"), // honeypot — left empty by real visitors
        }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setError(data?.error || "No pudimos enviar tu solicitud. Intentá de nuevo.");
        setStatus("error");
        return;
      }
      formElement.reset();
      setStatus("sent");
    } catch {
      setError("No pudimos enviar tu solicitud. Intentá de nuevo.");
      setStatus("error");
    }
  }

  return { selectedPlan, setSelectedPlan, selectPlanAndScroll, status, error, submitLead };
}
