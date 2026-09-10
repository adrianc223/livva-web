"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { FAQS } from "@/lib/faqs";
import { SiteChrome } from "./SiteChrome";

export function FaqPageContent() {
  return (
    <SiteChrome>
      {(wizard) => (
        <main className="flex-1">
          <section className="mx-auto max-w-[760px] px-5 pb-4 pt-16 text-center tablet:pt-20">
            <span className="text-[11px] font-black uppercase tracking-[1.6px] text-primary">Preguntas frecuentes</span>
            <h1 className="mt-3 text-[clamp(30px,5vw,44px)] tracking-[-1.5px] text-text">Todo lo que necesitás saber sobre administrar tu condominio con Livva</h1>
            <p className="mt-4 text-[14px] leading-relaxed text-text-muted">
              Livva une a administradores y residentes de condominios en Costa Rica — acá respondemos las dudas más
              comunes antes de empezar.
            </p>
          </section>
          <section className="mx-auto max-w-[760px] px-5 pb-20 pt-8">
            <div className="grid gap-4">
              {FAQS.map(({ q, a }) => (
                <div key={q} className="rounded-2xl border border-border bg-surface p-6 shadow-[0_16px_42px_rgba(24,36,26,0.08)]">
                  <h2 className="mb-2 text-[15px] font-extrabold text-text">{q}</h2>
                  <p className="text-[13px] leading-relaxed text-text-muted">{a}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => wizard.open()}
                className="inline-flex items-center gap-2 rounded-[11px] bg-primary px-6 py-3.5 text-[13px] font-black text-white shadow-[0_8px_20px_rgba(44,89,67,0.2)]"
              >
                <Sparkles size={16} /> Iniciar demo <ArrowRight size={16} />
              </button>
            </div>
          </section>
        </main>
      )}
    </SiteChrome>
  );
}
