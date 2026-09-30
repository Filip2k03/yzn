import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Yuzana, RN — VIP Clearance apology microsite";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background:
            "radial-gradient(circle at 20% 20%, #3a1522 0%, #10080c 45%, #09090b 100%)",
          color: "#F5E0A3",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 999,
              background: "linear-gradient(135deg, #D4AF37, #996515)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#2A121A",
              fontSize: 28,
              fontWeight: 700,
              marginRight: 18,
            }}
          >
            ♥
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 22,
                letterSpacing: 6,
                color: "#E8829C",
                textTransform: "uppercase",
              }}
            >
              YUZANA, RN // VIP CLEARANCE
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 18,
                color: "#F4C2C2",
                letterSpacing: 3,
              }}
            >
              SILK • PEARLS • NURSE FIRST
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              letterSpacing: 8,
              color: "#F4C2C2",
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            For my favorite girl
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 78,
              lineHeight: 1.05,
              letterSpacing: 2,
              color: "#F5E0A3",
              marginBottom: 18,
            }}
          >
            <div style={{ display: "flex" }}>Her Royal Excellency</div>
            <div style={{ display: "flex", color: "#E8829C" }}>Yuzana</div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#F4C2C2",
              maxWidth: 820,
            }}
          >
            A soft apology, wrapped in love — swipe to forgive.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#D4AF37",
            letterSpacing: 4,
            width: "100%",
          }}
        >
          <div style={{ display: "flex" }}>PEACE TREATY INBOUND</div>
          <div style={{ display: "flex" }}>♥ BESTIES</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
