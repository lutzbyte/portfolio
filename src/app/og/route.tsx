import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";

export async function GET() {
  const [firstName, ...restName] = profile.name.split(" ");
  const host = new URL(siteUrl).host;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          color: "#F8FAFC",
          background: "#080B14",
          backgroundImage:
            "radial-gradient(circle at 85% 5%, rgba(99,102,241,0.45), rgba(8,11,20,0) 55%), radial-gradient(circle at 5% 105%, rgba(139,92,246,0.3), rgba(8,11,20,0) 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 4,
            color: "#A5B4CF",
          }}
        >
          {profile.jobTitle.toUpperCase()}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 150,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: -4,
            }}
          >
            <span>{firstName}</span>
            <span style={{ color: "#A78BFA", marginLeft: 36 }}>
              {restName.join(" ")}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 900,
              marginTop: 32,
              fontSize: 40,
              color: "#A5B4CF",
            }}
          >
            {profile.tagline}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 28, color: "#64748B" }}>
          {host}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}