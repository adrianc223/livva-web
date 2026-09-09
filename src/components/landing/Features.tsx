"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { PointerEvent as ReactPointerEvent, useEffect, useRef, useState } from "react";
import { BrowserFrame } from "./DeviceFrames";

const FEATURES = [
  { title: "Cuotas y pagos", copy: "Cálculo automático de cuotas y moras, comprobantes de pago y reportes en PDF para cada residente.", image: "/screenshots/desktop-cuotas.png" },
  { title: "Anuncios", copy: "Comunicados de la administración con confirmación de lectura, para que ningún aviso importante se pierda.", image: "/screenshots/desktop-anuncios.png" },
  { title: "Reservas de amenidades", copy: "Piscina, salón de eventos, cancha — un calendario compartido para reservar sin choques ni llamadas.", image: "/screenshots/desktop-reservas.png" },
  { title: "Comercios locales", copy: "Los vecinos que emprenden publican su negocio, con aprobación del administrador antes de salir al público.", image: "/screenshots/desktop-comercios.png" },
  { title: "Marketplace interno", copy: "Los residentes compran y consultan directamente con los comercios de su propia comunidad.", image: "/screenshots/desktop-marketplace.png" },
  { title: "Mensajería directa", copy: "Residentes y administración conversan en un solo canal, sin mezclarse con grupos externos de WhatsApp.", image: "/screenshots/desktop-mensajes.png" },
];

// Duplicated once so the loop has a second identical half to scroll into — wrapping scrollLeft
// back by exactly half the scrollable width (see the rAF loop below) is imperceptible only
// because position X and X-halfWidth always render identical content.
const LOOP = [...FEATURES, ...FEATURES];

const AUTO_SCROLL_PX_PER_FRAME = 1;
const CARD_STEP = 320; // card width (300) + gap (20), used by the arrow buttons' scrollBy

export function Features() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    let frameId: number;
    function step() {
      const track = trackRef.current;
      if (track) {
        if (!pausedRef.current) track.scrollLeft += AUTO_SCROLL_PX_PER_FRAME;
        const halfWidth = track.scrollWidth / 2;
        // Renormalize every frame (not just while auto-scrolling) — a manual drag can land
        // past the boundary too, and since both halves are identical this is invisible.
        if (track.scrollLeft >= halfWidth) track.scrollLeft -= halfWidth;
        else if (track.scrollLeft < 0) track.scrollLeft += halfWidth;
      }
      frameId = requestAnimationFrame(step);
    }
    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [reducedMotion]);

  function pauseThenResume(delayMs: number) {
    pausedRef.current = true;
    window.setTimeout(() => { pausedRef.current = false; }, delayMs);
  }

  // Mouse-drag-to-scroll (desktop). Touch/pen pointers skip this entirely and fall through to
  // the browser's own native touch scrolling on the overflow-x-auto track — reimplementing that
  // by hand would only fight it.
  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const track = trackRef.current;
    if (!track) return;
    draggingRef.current = true;
    pausedRef.current = true;
    dragStartXRef.current = event.clientX;
    dragStartScrollRef.current = track.scrollLeft;
    track.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    const track = trackRef.current;
    if (!track) return;
    track.scrollLeft = dragStartScrollRef.current - (event.clientX - dragStartXRef.current);
  }

  function endDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    trackRef.current?.releasePointerCapture(event.pointerId);
    pauseThenResume(1200);
  }

  function scrollByStep(direction: 1 | -1) {
    trackRef.current?.scrollBy({ left: direction * CARD_STEP, behavior: "smooth" });
    pauseThenResume(1200);
  }

  return (
    <section id="funciones" className="bg-surface-muted py-20">
      <div className="mx-auto mb-12 max-w-[560px] px-5 text-center">
        <span className="text-[11px] font-black uppercase tracking-[1.6px] text-primary">Funciones</span>
        <h2 className="mt-2 text-[clamp(24px,3.5vw,34px)] tracking-[-1px] text-text">Así se ve por dentro</h2>
        <p className="mt-3 text-[13px] text-text-muted">Capturas reales de la aplicación — no maquetas. Arrastrá para explorar.</p>
      </div>
      <div className="relative mx-auto max-w-[1100px]">
        <div
          ref={trackRef}
          className="no-scrollbar flex cursor-grab gap-5 overflow-x-auto px-5 py-8 select-none active:cursor-grabbing [mask-image:linear-gradient(90deg,transparent,black_4%,black_96%,transparent)]"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { if (!draggingRef.current) pausedRef.current = false; }}
        >
          {LOOP.map((feature, index) => (
            <div key={`${feature.title}-${index}`} className="w-[300px] flex-shrink-0 rounded-2xl border border-border bg-surface p-3 shadow-[0_16px_42px_rgba(24,36,26,0.08)]">
              <BrowserFrame src={feature.image} alt={feature.title} className="pointer-events-none h-[180px] w-full" />
              <h3 className="mb-1 mt-3.5 px-1 text-[14px] font-extrabold text-text">{feature.title}</h3>
              <p className="px-1 text-[12px] leading-relaxed text-text-muted">{feature.copy}</p>
            </div>
          ))}
        </div>
        <button
          type="button"
          aria-label="Ver funciones anteriores"
          onClick={() => scrollByStep(-1)}
          className="absolute left-1 top-[100px] hidden h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-text shadow-[0_8px_20px_rgba(24,36,26,0.16)] tablet:flex"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          aria-label="Ver más funciones"
          onClick={() => scrollByStep(1)}
          className="absolute right-1 top-[100px] hidden h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-text shadow-[0_8px_20px_rgba(24,36,26,0.16)] tablet:flex"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
