"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCw } from "lucide-react";

// Catches an error thrown in the root layout itself. Must define its own <html>/<body>
// (replaces the root layout when active) and does NOT inherit globals.css or the site's
// `dark:` variant reliably — styled with inline styles/hardcoded light-mode colors so it
// renders correctly regardless of what CSS actually loaded.
export default function GlobalError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="es">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#f7f5f0" }}>
        <div style={{ display: "grid", minHeight: "100vh", placeItems: "center", padding: 24 }}>
          <div
            style={{
              width: "min(100%, 420px)",
              borderRadius: 17,
              border: "1px solid #dde3d7",
              background: "#ffffff",
              padding: "36px 30px",
              textAlign: "center",
              boxShadow: "0 22px 70px rgba(25,35,28,0.1)",
            }}
          >
            <div style={{ fontWeight: 900, fontSize: 15, color: "#2c5943", marginBottom: 22 }}>livva</div>
            <div
              style={{
                margin: "0 auto 18px",
                display: "grid",
                width: 46,
                height: 46,
                placeItems: "center",
                borderRadius: 13,
                background: "#e2ece5",
                color: "#2c5943",
              }}
            >
              <AlertTriangle size={22} />
            </div>
            <h1 style={{ marginBottom: 10, fontSize: 19, letterSpacing: "-0.4px" }}>Algo salió mal</h1>
            <p style={{ marginBottom: 22, fontSize: 12, lineHeight: 1.6, color: "#6c7869" }}>
              Tuvimos un problema inesperado. Podés intentar de nuevo en un momento.
            </p>
            <button
              onClick={() => retry()}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                border: 0,
                borderRadius: 11,
                background: "#2c5943",
                color: "white",
                fontWeight: 800,
                fontSize: 12,
                padding: "11px 15px",
                cursor: "pointer",
              }}
            >
              <RotateCw size={15} /> Reintentar
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
