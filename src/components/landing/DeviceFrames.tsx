import clsx from "clsx";

// Lightweight CSS mockups (no image assets for the frame itself) wrapping a real app
// screenshot — a browser "chrome" bar for desktop captures, a phone bezel + notch for mobile
// ones. object-top crops toward the top of each screenshot, which is deliberate: every capture's
// bottom edge is the sidebar's account-switcher footer ("Vista de prueba", "Cerrar sesión"), which
// reads as noise on a marketing page and isn't relevant to what the frame is illustrating.

export function BrowserFrame({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div className={clsx("overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_24px_60px_rgba(24,36,26,0.18)]", className)}>
      <div className="flex items-center gap-1.5 border-b border-border bg-surface-muted px-3 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#e2857a]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#e0c069]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#8fc79a]" />
      </div>
      <img src={src} alt={alt} className="block h-full w-full object-cover object-top" />
    </div>
  );
}

export function PhoneFrame({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    // No position utility on this root div — callers set their own (e.g. Hero.tsx passes
    // "absolute ..." to overlap a BrowserFrame; MobileShowcase.tsx passes none, which is fine,
    // static is a valid default there). A hardcoded "relative" here once collided with a
    // caller's "absolute" — both landed in the class list, and per this project's own
    // documented gotcha, which one wins depends on compiled stylesheet order, not source order.
    // The notch below gets its own dedicated relative wrapper instead, so it never depends on
    // the root's position value at all.
    <div className={clsx("overflow-hidden rounded-[32px] border-[6px] border-[#1f3d2f] bg-[#1f3d2f] shadow-[0_24px_60px_rgba(24,36,26,0.22)]", className)}>
      <div className="relative h-full w-full">
        <div className="absolute left-1/2 top-0 z-10 h-4 w-20 -translate-x-1/2 rounded-b-[12px] bg-[#1f3d2f]" />
        <img src={src} alt={alt} className="block h-full w-full object-cover object-top" />
      </div>
    </div>
  );
}
