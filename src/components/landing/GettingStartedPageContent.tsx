"use client";

import { ArrowRight, ClipboardList, Link2, MessageCircleQuestion, Sparkles, UploadCloud, UserPlus } from "lucide-react";
import Image from "next/image";
import { SiteChrome } from "./SiteChrome";
import { GETTING_STARTED_FAQS } from "@/lib/gettingStarted";

/* 2026-09-12, SEO/GEO audit follow-up.
 *
 * **The objection this page exists to answer is not price and not features.** It is "mis vecinos
 * no lo van a usar y me va a tocar a mí explicarle a cada uno" — which is the same reason the
 * condominium is still on WhatsApp. The home page now has a short "Cómo empezar" section that
 * names it; this is the deep page, in the pattern the comparison page already established.
 *
 * **The URL is `/como-empezar` on purpose.** `/implementacion` and `/capacitacion` were both
 * rejected because they presuppose exactly what the page exists to deny: a URL with the word
 * "capacitación" in it confirms to the reader that there is a training to sit through. And
 * `/onboarding` is English, for an audience that does not search in English. "Cómo empezar" is
 * the shape of the question somebody actually asks, which is what conversational search and AI
 * answer extraction reward.
 *
 * Everything claimed here is something that shipped. The three ways to load residents are
 * `POST /api/units/invitations`, `importUnitsFromCsv`, and `Condominium.residentSignupToken`; the
 * tutorials are the per-page, per-role feature tours. Nothing aspirational.
 */

const CAMINOS = [
  {
    icon: Link2,
    titulo: "Compartís un link",
    quien: "Para cuando no tenés los correos de nadie",
    copy:
      "Generás un link una sola vez y lo mandás al grupo. Cada vecino entra, pone su unidad, su nombre y su correo, y queda adentro. Vos no perseguís a nadie ni tecleás una sola dirección.",
    nota: "Es el camino que usa casi todo el mundo, porque casi ningún administrador tiene la lista de correos completa.",
  },
  {
    icon: UploadCloud,
    titulo: "Subís la lista",
    quien: "Para cuando ya la tenés en Excel",
    copy:
      "Un archivo con unidad, nombre y correo. Se puede subir aunque falten correos: esas unidades quedan creadas y esperando a que su dueño las reclame con el link de arriba.",
    nota: "Te decimos fila por fila qué entró y qué no, en vez de fallar entero por un dato malo.",
  },
  {
    icon: UserPlus,
    titulo: "Invitás uno por uno",
    quien: "Para los que van llegando después",
    copy:
      "Escribís el correo y listo: le llega su acceso al momento. Sirve igual para agregar a un inquilino nuevo o al que compró la semana pasada.",
    nota: "El dueño de una filial puede agregar a su propio inquilino sin pedirle permiso a la administración.",
  },
];

const PASOS = [
  { n: "1", t: "Creás tu condominio", c: "Cinco campos y estás adentro. Sin llamada de ventas y sin que nadie te tenga que contactar." },
  { n: "2", t: "Entran tus vecinos", c: "Por link, por lista o uno por uno — lo que te sirva. Los tres caminos conviven." },
  { n: "3", t: "Cada quien aprende solo", c: "La app le explica a cada uno lo suyo, la primera vez que abre cada pantalla." },
];

const PREGUNTAS = GETTING_STARTED_FAQS;

export function GettingStartedPageContent(){
  return (
    <SiteChrome>
      {(wizard) => (
        <>
          <section className="px-5 pb-10 pt-14 tablet:pt-20">
            <div className="mx-auto max-w-[760px] text-center">
              <span className="text-[11px] font-black uppercase tracking-[1.6px] text-primary">Cómo empezar</span>
              {/* The h1 carries the keywords; the voice lives in the subhead. Same split the home
                  page's own <title> already uses. */}
              <h1 className="mt-2 text-[clamp(28px,5vw,44px)] leading-[1.1] tracking-[-1px]">
                Cómo empezar a usar Livva en tu condominio
              </h1>
              <p className="mt-4 text-[16px] leading-relaxed text-text-muted">
                Lo que frena a una junta directiva casi nunca es el precio. Es pensar que va a tener
                que sentarse a explicarle la aplicación a sesenta vecinos, uno por uno. No hay que
                hacer eso, y acá está exactamente por qué.
              </p>
              <button
                type="button"
                onClick={() => wizard.open()}
                className="mt-7 inline-flex min-h-[52px] items-center gap-2 rounded-[14px] bg-primary px-7 text-[16px] font-extrabold text-white"
              >
                Crear mi condominio <ArrowRight size={18} />
              </button>
            </div>
          </section>

          <section className="px-5 py-10">
            <div className="mx-auto grid max-w-[900px] gap-4 tablet:grid-cols-3">
              {PASOS.map((p) => (
                <div key={p.n} className="rounded-2xl border border-border bg-surface p-6">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-primary-soft text-[15px] font-black text-primary">{p.n}</span>
                  <h2 className="mt-4 text-[17px] font-extrabold">{p.t}</h2>
                  <p className="mt-2 text-[14px] leading-relaxed text-text-muted">{p.c}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="px-5 py-12">
            <div className="mx-auto max-w-[900px]">
              <div className="mx-auto max-w-[620px] text-center">
                <h2 className="text-[clamp(22px,3.5vw,30px)] tracking-[-.6px]">Tres formas de meter a tus vecinos</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-text-muted">
                  No hace falta elegir una: conviven. Empezás por la que te sirva hoy y agregás a los
                  que falten después.
                </p>
              </div>
              <div className="mt-8 grid gap-4 tablet:grid-cols-3">
                {CAMINOS.map(({ icon: Icon, ...c }) => (
                  <div key={c.titulo} className="flex flex-col rounded-2xl border border-border bg-surface p-6">
                    <span className="grid h-11 w-11 place-items-center rounded-[13px] bg-primary-soft text-primary"><Icon size={21} /></span>
                    <h3 className="mt-4 text-[17px] font-extrabold">{c.titulo}</h3>
                    <p className="mt-1 text-[12px] font-bold uppercase tracking-wide text-primary">{c.quien}</p>
                    <p className="mt-3 flex-1 text-[14px] leading-relaxed text-text-muted">{c.copy}</p>
                    <p className="mt-4 border-t border-border pt-3 text-[13px] leading-relaxed text-text-muted">{c.nota}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-[#1f3d2f] px-5 py-16 dark:bg-[#16261d]">
            <div className="mx-auto max-w-[760px] text-center text-white">
              <span className="text-[11px] font-black uppercase tracking-[1.6px] text-[#cfe3d5]">La parte que nadie cree</span>
              <h2 className="mt-2 text-[clamp(22px,3.5vw,32px)] tracking-[-.6px] text-white">
                Nadie tiene que preguntar cómo se usa
              </h2>
              {/* Deliberately mechanical rather than "fácil de usar" or "intuitivo": those are
                  claims anybody can make and nobody can check. This one is checkable. */}
              <p className="mt-4 text-[16px] leading-relaxed text-[#cfe3d5]">
                La primera vez que alguien abre una pantalla, Livva le explica esa pantalla. A la
                administración le explica una cosa, al dueño otra, al inquilino otra y a la caseta
                otra — porque no usan lo mismo. Y queda un botón junto al título de cada sección para
                volver a verlo cuando quiera.
              </p>
              <div className="mx-auto mt-9 w-[min(300px,78%)]">
                {/* Captured against the real app, on the showcase condominium, with the tour
                    actually running -- not a mockup. The rounded frame is the phone; the dimmed
                    background inside the image is driver.js's own overlay, which is precisely the
                    thing being shown. */}
                <Image
                  src="/screenshots/mobile-tutorial.png"
                  alt="La aplicación explicándole a una residente la tarjeta de su cuenta, con el recorrido guiado abierto en el paso 4 de 9"
                  width={1170}
                  height={2532}
                  sizes="(max-width: 1000px) 78vw, 300px"
                  className="h-auto w-full rounded-[26px] border border-white/15 shadow-[0_30px_70px_rgba(0,0,0,.45)]"
                />
                <p className="mt-3 text-[12px] leading-relaxed text-[#cfe3d5]">
                  Así lo ve un residente la primera vez que entra. Nadie se lo tuvo que explicar.
                </p>
              </div>

              <div className="mx-auto mt-9 grid max-w-[640px] gap-3 text-left">
                {[
                  ["Administración", "Cómo cobrar, aprobar comprobantes, publicar anuncios y llevar la caseta."],
                  ["Dueños", "Sus cuotas, cómo reportar un pago, reservar zonas comunes y anunciar una visita."],
                  ["Inquilinos", "Lo mismo, menos las cuotas — eso lo lleva el dueño de la filial."],
                  ["Caseta", "Las visitas del día, marcar entradas y salidas, y la bitácora de rondas."],
                ].map(([rol, que]) => (
                  <div key={rol} className="flex gap-3 rounded-[14px] border border-white/12 bg-white/5 p-4">
                    <Sparkles size={18} className="mt-0.5 flex-none text-[#ffd166]" />
                    <p className="text-[14px] leading-relaxed text-[#e6efe8]"><strong className="text-white">{rol}:</strong> {que}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-5 py-14">
            <div className="mx-auto max-w-[760px]">
              <div className="text-center">
                <MessageCircleQuestion size={26} className="mx-auto text-primary" />
                <h2 className="mt-3 text-[clamp(22px,3.5vw,30px)] tracking-[-.6px]">Lo que más nos preguntan antes de arrancar</h2>
              </div>
              <div className="mt-8 grid gap-3">
                {PREGUNTAS.map((p) => (
                  <details key={p.q} className="rounded-2xl border border-border bg-surface p-5">
                    <summary className="cursor-pointer list-none text-[16px] font-extrabold">{p.q}</summary>
                    <p className="mt-3 text-[14px] leading-relaxed text-text-muted">{p.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section className="px-5 pb-20">
            <div className="mx-auto max-w-[680px] rounded-2xl border border-border bg-surface p-8 text-center">
              <ClipboardList size={26} className="mx-auto text-primary" />
              <h2 className="mt-3 text-[clamp(20px,3vw,26px)] tracking-[-.5px]">Probalo con tu propio condominio</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-text-muted">
                La demo se crea sola y no pide tarjeta. Si después no te sirve, no hiciste nada más
                que perder cinco minutos.
              </p>
              <button
                type="button"
                onClick={() => wizard.open()}
                className="mt-6 inline-flex min-h-[52px] items-center gap-2 rounded-[14px] bg-primary px-7 text-[16px] font-extrabold text-white"
              >
                Empezar ahora <ArrowRight size={18} />
              </button>
            </div>
          </section>
        </>
      )}
    </SiteChrome>
  );
}
