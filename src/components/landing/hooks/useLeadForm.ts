"use client";

import { FormEvent, useState } from "react";
import { PRICING_PLANS } from "@/lib/pricing";

export type LeadFormStatus = "idle" | "sending" | "sent" | "error";

export function useLeadForm() {
  const [selectedPlan, setSelectedPlan] = useState<string>(PRICING_PLANS[0].id);
  const [unitCount, setUnitCount] = useState<string>("");
  const [status, setStatus] = useState<LeadFormStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  // unitCount is optional — omitted for a plain card click (today's exact behavior), passed by
  // the demo wizard's >120-units handoff so that specific number rides along into the form
  // instead of being lost.
  function selectPlanAndScroll(planId: string, unitCountValue?: string) {
    setSelectedPlan(planId);
    if (unitCountValue !== undefined) setUnitCount(unitCountValue);
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  }

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    setStatus("sending");
    setError(null);
    try {
      const rawUnitCount = form.get("unitCount");
      const parsedUnitCount = typeof rawUnitCount === "string" && rawUnitCount.trim() ? Number(rawUnitCount) : null;
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          community: form.get("community"),
          email: form.get("email"),
          plan: form.get("plan"),
          unitCount: parsedUnitCount,
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

  return { selectedPlan, setSelectedPlan, unitCount, setUnitCount, selectPlanAndScroll, status, error, submitLead };
}
