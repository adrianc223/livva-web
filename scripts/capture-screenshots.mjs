// Recaptures the product screenshots this site shows (public/screenshots/*.png).
//
// They had been taken ad hoc, which is how they went stale: the set shipped until 2026-09-11
// was captured on 2026-09-08 from a condominium with ₡0 collected and ₡396 000 overdue — the
// marketing image of the payments feature showed nothing collected — and it carried the Title
// Case bug that was fixed in the app the same day. A script means the next recapture is one
// command instead of a memory of what was clicked.
//
// Playwright is deliberately NOT a dependency of this project. Install it wherever you are
// working and point NODE_PATH at it, matching how the Condo-Admin-Tool repo verifies things:
//
//   npm install --no-save playwright   # node_modules only, never package.json
//   cd <Condo-Admin-Tool> && npm run dev
//   CAPTURE_EMAIL=... CAPTURE_PASSWORD=... \
//     node scripts/capture-screenshots.mjs
//
// The account must be an ADMIN of a condominium that looks like a well-run building — real
// collection for the current month, a small but non-zero morosidad, some announcements,
// reservations and marketplace vendors. An empty condominium makes a worse advertisement than
// no screenshot at all. Turn its tutorialsEnabled/pwaTutorialEnabled off first, or the tour
// overlay lands in the middle of the capture.

import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const APP = process.env.CAPTURE_APP_URL ?? "http://localhost:3000";
const EMAIL = process.env.CAPTURE_EMAIL;
const PASSWORD = process.env.CAPTURE_PASSWORD;
const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "screenshots");

// Page name → output basename. Sizes match what the site already ships, so the layout that
// consumes them does not have to change.
const DESKTOP = [
  ["Resumen", "desktop-resumen"],
  ["Cuotas y pagos", "desktop-cuotas"],
  ["Anuncios", "desktop-anuncios"],
  ["Reservas", "desktop-reservas"],
  ["Marketplace", "desktop-marketplace"],
  ["Comercios", "desktop-comercios"],
  ["Mensajes", "desktop-mensajes"],
];
const MOBILE = [
  ["Resumen", "mobile-resumen"],
  ["Cuotas y pagos", "mobile-cuotas"],
  ["Anuncios", "mobile-anuncios"],
  ["Mensajes", "mobile-mensajes"],
];

if (!EMAIL || !PASSWORD) {
  console.error("Faltan CAPTURE_EMAIL y CAPTURE_PASSWORD.");
  process.exit(1);
}

async function signIn(page) {
  // networkidle, not domcontentloaded: the form must be hydrated before the click, or the
  // browser performs the native POST the form now declares instead of running React's handler —
  // no fetch, no cookie, and the app quietly re-renders the login screen.
  await page.goto(APP, { waitUntil: "networkidle" });
  await page.getByLabel("Correo").fill(EMAIL);
  await page.getByLabel("Contraseña", { exact: true }).fill(PASSWORD);

  // Wait on the login response itself. Waiting on `heading level 1` instead — which is what the
  // first version of this script did — passes instantly, because the *login screen* has an h1
  // too ("Tu comunidad, más cerca."). A wait satisfied by the state you are trying to leave
  // proves nothing and lets everything after it run against the wrong page.
  const [response] = await Promise.all([
    page.waitForResponse((r) => r.url().includes("/api/auth/login") && r.request().method() === "POST", { timeout: 30000 }),
    page.getByRole("button", { name: "Iniciar sesión" }).click(),
  ]);
  if (!response.ok()) throw new Error(`Login rechazado (${response.status()}). Revisá CAPTURE_EMAIL/CAPTURE_PASSWORD.`);
  await page.getByRole("heading", { name: /Buenos|Buenas/ }).first().waitFor({ timeout: 30000 });
}

async function dismissOverlays(page) {
  // The PWA install banner is fixed to the bottom on mobile widths and would sit in the frame.
  //
  // `exact: true` is load-bearing. Playwright matches an accessible name by *substring* by
  // default, so { name: "Cerrar" } also matches "Cerrar sesión" — the first version of this
  // script logged itself out right after the first screenshot, and every page after it captured
  // the login screen. Anything that dismisses an overlay by name needs to be exact.
  for (const label of ["Cerrar", "Entendido"]) {
    const button = page.getByRole("button", { name: label, exact: true });
    if (await button.count()) await button.first().click({ timeout: 2000 }).catch(() => {});
  }
}

async function capture(context, size, pages) {
  const page = await context.newPage();
  await page.setViewportSize(size);
  await signIn(page);
  await dismissOverlays(page);

  for (const [pageName, file] of pages) {
    await page.goto(`${APP}/?page=${encodeURIComponent(pageName)}`, { waitUntil: "networkidle" });
    // Assert the *visible* h1 actually says what this page should say. There are two h1s in the
    // DOM at all times (one desktop, one mobile, the other hidden by a breakpoint), so matching
    // on text alone could be satisfied by the one nobody can see.
    const expected = pageName === "Resumen" ? "Buen" : pageName;
    await page.waitForFunction(
      (text) => [...document.querySelectorAll("h1")].some((h) => h.offsetParent !== null && (h.textContent ?? "").includes(text)),
      expected,
      { timeout: 30000 }
    );
    await dismissOverlays(page);
    // Skeletons share their surrounding markup with the loaded state, so "the panel exists" is
    // true before any data arrives — wait for the shimmer to actually be gone.
    await page.waitForFunction(() => document.querySelectorAll(".animate-skeleton").length === 0, null, { timeout: 30000 }).catch(() => {});
    await page.waitForTimeout(600); // let the last re-render settle before the shutter
    await page.screenshot({ path: join(OUT, `${file}.png`) });
    console.log(`  ${file}.png`);
  }
  await page.close();
}

const browser = await chromium.launch();
try {
  await mkdir(OUT, { recursive: true });
  console.log("escritorio 1280x800:");
  await capture(await browser.newContext({ deviceScaleFactor: 2 }), { width: 1280, height: 800 }, DESKTOP);
  console.log("móvil 390x844:");
  await capture(await browser.newContext({ deviceScaleFactor: 2, isMobile: true, hasTouch: true }), { width: 390, height: 844 }, MOBILE);
  console.log("listo.");
} finally {
  await browser.close();
}
