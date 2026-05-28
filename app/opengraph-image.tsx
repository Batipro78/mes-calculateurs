import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Mes Calculateurs - Calculateurs et simulateurs gratuits en ligne";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #f8fafc 0%, #dbeafe 50%, #e0e7ff 100%)",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div
            style={{
              width: "96px",
              height: "96px",
              background: "linear-gradient(135deg, #3b82f6, #6366f1)",
              borderRadius: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "44px",
              fontWeight: 800,
              boxShadow: "0 12px 32px rgba(59,130,246,0.3)",
            }}
          >
            MC
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "48px", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.5px" }}>
              Mes Calculateurs
            </div>
            <div style={{ fontSize: "22px", color: "#64748b", marginTop: "4px" }}>
              Gratuit · Simple · Rapide
            </div>
          </div>
        </div>

        <div style={{ flex: 1, display: "flex" }} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "72px",
            fontWeight: 800,
            color: "#0f172a",
            lineHeight: 1.05,
            letterSpacing: "-1.5px",
          }}
        >
          <div>Calculateurs &</div>
          <div>simulateurs gratuits</div>
        </div>

        <div style={{ fontSize: "30px", color: "#475569", marginTop: "24px", lineHeight: 1.3 }}>
          Salaire · Impots · Pret immo · IMC · TVA · 145+ outils
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginTop: "48px",
          }}
        >
          <div
            style={{
              fontSize: "28px",
              color: "#2563eb",
              fontWeight: 700,
              background: "white",
              padding: "12px 24px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
            }}
          >
            mescalculateurs.fr
          </div>
          <div style={{ fontSize: "22px", color: "#64748b" }}>
            Mis a jour 2026
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
