import clsx from "clsx";

// Ported verbatim from the main app (livva-condominio's src/components/Logo.tsx) so the two
// products look like the same brand. "auto" follows the site's own dark-mode toggle; force
// "light"/"dark" where the logo sits on a surface that never changes with the toggle.
type LogoProps = { variant?: "auto" | "light" | "dark"; className?: string };

export function Logo({ variant = "auto", className }: LogoProps) {
  if (variant === "light") return <img src="/logo-light.svg" alt="Livva" className={className} />;
  if (variant === "dark") return <img src="/logo-dark.svg" alt="Livva" className={className} />;
  return (
    <>
      <img src="/logo-light.svg" alt="Livva" className={clsx(className, "dark:hidden")} />
      <img src="/logo-dark.svg" alt="Livva" className={clsx(className, "hidden dark:block")} />
    </>
  );
}
