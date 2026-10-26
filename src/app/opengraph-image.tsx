import { ImageResponse } from "next/og";
import { getProfile } from "@/lib/data";

export const alt = "Portfolio preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Generates the 1200x630 image shown when the site is shared on LinkedIn, X, WhatsApp, etc. */
export default async function OpengraphImage() {
  const profile = await getProfile();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0a0e14 0%, #131b2e 100%)",
          color: "#e6e9ef",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#34d1bf", letterSpacing: 4 }}>PORTFOLIO</div>
        <div style={{ display: "flex", fontSize: 96, fontWeight: 700, marginTop: 24 }}>{profile.name}</div>
        <div style={{ display: "flex", fontSize: 44, color: "#5b86ff", marginTop: 12 }}>{profile.headline}</div>
        <div style={{ display: "flex", fontSize: 28, color: "#9099a9", marginTop: 32, maxWidth: 900 }}>
          React · Next.js · Node.js · React Native · MERN
        </div>
      </div>
    ),
    size,
  );
}
