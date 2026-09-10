import clsx from "clsx";

// Ported verbatim from the main app (livva-condominio's src/components/Logo.tsx) so the two
// products look like the same brand. "auto" follows the site's own dark-mode toggle; force
// "light"/"dark" where the logo sits on a surface that never changes with the toggle.
type LogoProps = { variant?: "auto" | "light" | "dark"; className?: string };

// 543×620 is the SVGs' real viewBox — passed as intrinsic width/height (2026-09-10, SEO audit:
// Lighthouse's unsized-images check) so the browser can reserve the right aspect-ratio space
// before load; every call site's own className (h-11 w-auto, etc.) still controls the actual
// rendered size, this only fixes the pre-load layout reservation.
export function Logo({ variant = "auto", className }: LogoProps) {
  if (variant === "light") return <img src="/logo-light.svg" width={543} height={620} alt="Livva" className={className} />;
  if (variant === "dark") return <img src="/logo-dark.svg" width={543} height={620} alt="Livva" className={className} />;
  return (
    <>
      <img src="/logo-light.svg" width={543} height={620} alt="Livva" className={clsx(className, "dark:hidden")} />
      <img src="/logo-dark.svg" width={543} height={620} alt="Livva" className={clsx(className, "hidden dark:block")} />
    </>
  );
}
