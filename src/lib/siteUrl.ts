// Single source of truth for the deployed URL — layout.tsx, robots.ts, and sitemap.ts all read
// this instead of each hardcoding their own fallback (a mismatch between them bit us once
// already: the fallback drifted from the real *.vercel.app domain after the Vercel project was
// renamed). Vercel's APP_URL env var (set in project settings) always wins once deployed.
// 2026-09-10: fallback updated to the real custom domain (live since 2026-09-09) — the previous
// *.vercel.app fallback is exactly the kind of drift this file exists to prevent (see the comment
// above); Vercel's production APP_URL env var still needs a matching fix separately, but this
// fallback should never again silently point at a URL that isn't the canonical one.
export const SITE_URL = process.env.APP_URL || "https://livvaadmin.com";
