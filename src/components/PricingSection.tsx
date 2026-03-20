const TIERS = [
  {
    icon: "📖",
    label: "Self-Paced",
    price: "₹15,000",
    note: "onwards",
    accent: "#2563eb",
    bg: "#eff6ff",
    features: [
      "Recorded sessions",
      "Community forum",
      "Project review",
      "Certificate",
    ],
  },
  {
    icon: "🎓",
    label: "Live Cohort",
    price: "₹65,000",
    note: "onwards",
    accent: "#d97706",
    bg: "#fffbeb",
    featured: true,
    features: [
      "Live classes + recordings",
      "Weekly 1:1 mentorship",
      "Job referral network",
      "Certificate",
    ],
  },
  {
    icon: "🏢",
    label: "Enterprise",
    price: "₹2,00,000",
    note: "customised",
    accent: "#16a34a",
    bg: "#f0fdf4",
    features: [
      "Custom curriculum",
      "On-site / remote",
      "Dedicated trainer",
      "Batch analytics + Certificate",
    ],
  },
];

export default function PricingSection() {
  return (
    <section
      style={{
        padding: "72px 24px",
        background: "#f8fafc",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      {/* heading */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <span
          style={{
            display: "inline-block",
            background: "linear-gradient(90deg,#2563eb,#7c3aed)",
            color: "#fff",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            padding: "4px 16px",
            borderRadius: 100,
            marginBottom: 16,
          }}
        >
          Flexible Pricing
        </span>
        <h2
          style={{
            fontSize: "clamp(26px,4vw,38px)",
            fontWeight: 800,
            color: "#0f172a",
            margin: "0 0 12px",
            lineHeight: 1.2,
          }}
        >
          Courses Starting at <span style={{ color: "#2563eb" }}>₹15,000</span>
        </h2>
        <p
          style={{
            fontSize: 16,
            color: "#64748b",
            maxWidth: 480,
            margin: "0 auto",
          }}
        >
          From individual upskilling to enterprise-wide training — we scale with
          your needs, all the way up to{" "}
          <strong style={{ color: "#0f172a" }}>₹2,00,000</strong>.
        </p>
      </div>

      {/* cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 20,
          maxWidth: 1000,
          margin: "0 auto 40px",
        }}
      >
        {TIERS.map((t) => (
          <div
            key={t.label}
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: 28,
              border: t.featured
                ? `2px solid ${t.accent}`
                : "1.5px solid #e2e8f0",
              boxShadow: t.featured
                ? `0 8px 32px ${t.accent}22`
                : "0 2px 12px rgba(0,0,0,.05)",
              position: "relative",
            }}
          >
            {t.featured && (
              <div
                style={{
                  position: "absolute",
                  top: -13,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: t.accent,
                  color: "#fff",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                  padding: "3px 14px",
                  borderRadius: 100,
                  whiteSpace: "nowrap",
                }}
              >
                Most Popular
              </div>
            )}

            {/* icon pill */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                borderRadius: 12,
                background: t.bg,
                fontSize: 22,
                marginBottom: 16,
              }}
            >
              {t.icon}
            </div>

            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: t.accent,
                marginBottom: 6,
                textTransform: "uppercase",
                letterSpacing: ".06em",
              }}
            >
              {t.label}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 6,
                marginBottom: 4,
              }}
            >
              <span style={{ fontSize: 30, fontWeight: 800, color: "#0f172a" }}>
                {t.price}
              </span>
            </div>
            <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 20 }}>
              {t.note}
            </div>

            {/* features */}
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {t.features.map((f) => (
                <li
                  key={f}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 13.5,
                    color: "#334155",
                    padding: "7px 0",
                    borderBottom: "1px solid #f1f5f9",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={t.accent}
                    strokeWidth="2.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* bottom note */}
      <p style={{ textAlign: "center", fontSize: 13, color: "#94a3b8" }}>
        EMI options available · All plans include a certificate of completion
      </p>
    </section>
  );
}
