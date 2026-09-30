import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 30% 30%, #3a1522, #10080c 70%)",
          color: "#F5E0A3",
          fontSize: 84,
        }}
      >
        ♥
      </div>
    ),
    { ...size },
  );
}
