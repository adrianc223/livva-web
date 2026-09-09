// Single source of truth for the deployed URL — layout.tsx, robots.ts, and sitemap.ts all read
// this instead of each hardcoding their own fallback (a mismatch between them bit us once
// already: the fallback drifted from the real *.vercel.app domain after the Vercel project was
// renamed). Vercel's APP_URL env var (set in project settings) always wins once deployed.
export const SITE_URL = process.env.APP_URL || "https://livva-web.vercel.app";
