import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Manual, planned-downtime maintenance mode — gated on an env var (set/unset per Vercel
// project, requires a redeploy to take effect) rather than a DB-backed flag: this site has
// no database of its own (see CLAUDE.md), so a toggle stored anywhere would have to be a
// cross-origin call to Condo-Admin-Tool's API — unnecessary complexity for a rarely-used
// planned-downtime switch. Mirrors the identical proxy.ts in the sibling Condo-Admin-Tool repo.
export function proxy(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE !== "true") return NextResponse.next();

  const { pathname } = request.nextUrl;
  if (pathname === "/mantenimiento") return NextResponse.next();

  return NextResponse.rewrite(new URL("/mantenimiento", request.url));
}

// Excludes _next's own static/image assets and any request for a literal static file
// (icons, opengraph image, ...) via the trailing-extension negative lookahead — those must
// keep loading unmodified even during maintenance, or the maintenance page itself would break.
export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.[\\w]+$).*)"],
};
