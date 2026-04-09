import { createClient } from "@supabase/supabase-js";

export default async function DriverLinkPage({ params, searchParams }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const resolvedParams = await params;
  const resolvedSearch = await searchParams;
  const slug = resolvedParams.slug;
  const unit = resolvedSearch?.u || null;

  const { data: building } = await supabase
    .from("buildings")
    .select("*, building_photos(*)")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (!building) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f8f9f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "320px" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
          <h1 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px", color: "#0f172a" }}>
            Link not found
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px", lineHeight: "1.6" }}>
            This link may have expired or never existed. Ask your contact to send a new one.
          </p>
          <div style={{ marginTop: "24px" }}>
            <a
              href="/"
              style={{
                display: "inline-block",
                color: "#00c46f",
                fontFamily: "ui-monospace, monospace",
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                textDecoration: "none",
              }}
            >
              FindFoundFast →
            </a>
          </div>
        </div>
      </div>
    );
  }

  const photos = (building.building_photos || []).sort((a, b) => a.step_number - b.step_number);

  let sessionActive = false;
  if (unit) {
    const { data: session } = await supabase
      .from("sessions")
      .select("*")
      .eq("building_id", building.id)
      .eq("unit_number", unit)
      .eq("is_active", true)
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    sessionActive = !!session;
  }
  const showCodes = !unit || sessionActive;

  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "system-ui, sans-serif" }}>
      {/* App bar — dark green, brand-aligned */}
      <div style={{ background: "#14532d", padding: "16px 20px 14px" }}>
        <p
          style={{
            color: "rgba(134,239,172,0.85)",
            fontSize: "10px",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            fontFamily: "ui-monospace, monospace",
            marginBottom: "4px",
          }}
        >
          FindFoundFast
        </p>
        <h1 style={{ color: "#fff", fontWeight: "700", fontSize: "18px", marginBottom: "2px" }}>{building.name}</h1>
        {building.address && (
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>{building.address}</p>
        )}
        {unit && sessionActive && (
          <div
            style={{
              marginTop: "10px",
              display: "inline-block",
              background: "#00FF87",
              borderRadius: "20px",
              padding: "4px 14px",
            }}
          >
            <span
              style={{
                color: "#0a0a0a",
                fontSize: "12px",
                fontWeight: "700",
                fontFamily: "ui-monospace, monospace",
              }}
            >
              Delivering to Unit {unit}
            </span>
          </div>
        )}
      </div>

      {building.notes && (
        <div
          style={{
            background: "#fefce8",
            borderBottom: "1px solid #fde047",
            padding: "12px 20px",
          }}
        >
          <p style={{ fontSize: "14px", color: "#854d0e", lineHeight: "1.5" }}>📝 {building.notes}</p>
        </div>
      )}

      {showCodes && (building.gate_code || building.lobby_code) && (
        <div
          style={{
            background: "#f0fdf4",
            borderBottom: "1px solid #bbf7d0",
            padding: "16px 20px",
          }}
        >
          <p
            style={{
              fontSize: "10px",
              fontWeight: "700",
              color: "#14532d",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontFamily: "ui-monospace, monospace",
              marginBottom: "12px",
            }}
          >
            Access codes
          </p>
          <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
            {building.gate_code && (
              <div>
                <p
                  style={{
                    fontSize: "11px",
                    color: "#64748b",
                    marginBottom: "2px",
                    fontFamily: "ui-monospace, monospace",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Gate code
                </p>
                <p
                  style={{
                    fontFamily: "ui-monospace, monospace",
                    fontSize: "28px",
                    fontWeight: "900",
                    color: "#14532d",
                    letterSpacing: "0.2em",
                  }}
                >
                  {building.gate_code}
                </p>
              </div>
            )}
            {building.lobby_code && (
              <div>
                <p
                  style={{
                    fontSize: "11px",
                    color: "#64748b",
                    marginBottom: "2px",
                    fontFamily: "ui-monospace, monospace",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Lobby code
                </p>
                <p
                  style={{
                    fontFamily: "ui-monospace, monospace",
                    fontSize: "28px",
                    fontWeight: "900",
                    color: "#14532d",
                    letterSpacing: "0.2em",
                  }}
                >
                  {building.lobby_code}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <div style={{ maxWidth: "500px", margin: "0 auto", padding: "24px 16px" }}>
        {photos.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px", color: "#94a3b8" }}>
            <p style={{ fontSize: "40px", marginBottom: "12px" }}>📸</p>
            <p style={{ fontSize: "15px" }}>No photos uploaded yet.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {photos.map((photo) => (
              <div
                key={photo.id}
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                }}
              >
                <div style={{ position: "relative" }}>
                  <img
                    src={photo.public_url}
                    alt={photo.label}
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      maxHeight: "280px",
                      display: "block",
                      background: "#f1f5f9",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      background: "#00FF87",
                      color: "#0a0a0a",
                      fontSize: "10px",
                      fontWeight: "800",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontFamily: "ui-monospace, monospace",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Step {photo.step_number}
                  </div>
                </div>
                <div style={{ padding: "14px 16px", background: "#fff" }}>
                  <p style={{ fontWeight: "700", fontSize: "15px", marginBottom: "3px", color: "#0f172a" }}>
                    {photo.label}
                  </p>
                  {photo.caption && (
                    <p style={{ color: "#64748b", fontSize: "14px", lineHeight: "1.55" }}>{photo.caption}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          style={{
            marginTop: "40px",
            paddingTop: "20px",
            borderTop: "1px solid #e2e8f0",
            textAlign: "center",
          }}
        >
          <a href="/" style={{ textDecoration: "none" }}>
            <p
              style={{
                fontWeight: "800",
                fontSize: "15px",
                color: "#0f172a",
                fontFamily: "ui-monospace, monospace",
              }}
            >
              Find<span style={{ color: "#00c46f" }}>Found</span>Fast
            </p>
          </a>
          <p
            style={{
              marginTop: "4px",
              fontSize: "11px",
              color: "#94a3b8",
              fontFamily: "ui-monospace, monospace",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Micro-location guidance
          </p>
        </div>
      </div>
    </div>
  );
}
