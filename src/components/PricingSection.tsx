"use client";
import React from "react";
import { motion } from "framer-motion";

const TIERS = [
  {
    label: "Self-Paced",
    price: "₹15,000",
    note: "onwards",
    description: "Ideal for individuals getting started at their own pace.",
    cta: "Start Learning",
    featured: false,
    features: [
      "Recorded sessions",
      "Community forum",
      "Project review",
      "Certificate",
    ],
  },
  {
    label: "Live Cohort",
    price: "₹65,000",
    note: "onwards",
    description: "For teams that need live guidance and a mentorship start.",
    cta: "Get Started",
    featured: true,
    features: [
      "Live classes + recordings",
      "Weekly 1:1 mentorship",
      "Job referral network",
      "Certificate",
    ],
  },
  {
    label: "Enterprise",
    price: "₹2,00,000",
    note: "customised",
    description: "For large organizations needing a dedicated, custom program.",
    cta: "Contact Sales",
    featured: false,
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
    <section style={{ padding: "72px 24px", background: "#fff" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <h2
          style={{
            fontSize: "clamp(28px,4vw,40px)",
            fontWeight: 700,
            color: "#0f172a",
            margin: "0 0 12px",
            lineHeight: 1.2,
          }}
        >
          Courses Starting at ₹15,000
        </h2>
        <p
          style={{
            fontSize: 15,
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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 20,
          maxWidth: 1000,
          margin: "0 auto 40px",
        }}
      >
        {TIERS.map((t, index) => (
          <motion.div
            key={t.label}
            initial={{
              opacity: 0,
              y: t.featured ? 30 : 20,
              scale: 0.96,
              filter: "blur(8px)",
            }}
            whileInView={{
              opacity: 1,
              y: t.featured ? -8 : 0,
              scale: 1,
              filter: "blur(0px)",
            }}
            transition={{ duration: 0.6, delay: index * 0.35, ease: "easeOut" }}
            viewport={{ once: true }}
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 24,
              border: t.featured ? "2px solid #2563eb" : "1px solid #e2e8f0",
            }}
          >
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#0f172a",
                marginBottom: 16,
              }}
            >
              {t.label}
            </div>

            <div style={{ fontSize: 34, fontWeight: 800, color: "#0f172a" }}>
              {t.price}
            </div>
            <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 16 }}>
              {t.note}
            </div>

            <p
              style={{
                fontSize: 13.5,
                color: "#64748b",
                lineHeight: 1.5,
                marginBottom: 20,
              }}
            >
              {t.description}
            </p>

            <button
              style={{
                width: "100%",
                padding: "10px 0",
                borderRadius: 8,
                fontSize: 13.5,
                fontWeight: 600,
                marginBottom: 24,
                cursor: "pointer",
                border: t.featured ? "none" : "1px solid #cbd5e1",
                background: t.featured ? "#2563eb" : "#fff",
                color: t.featured ? "#fff" : "#0f172a",
              }}
            >
              {t.cta}
            </button>

            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#94a3b8",
                textTransform: "uppercase",
                letterSpacing: ".06em",
                borderTop: "1px solid #f1f5f9",
                paddingTop: 16,
                marginBottom: 12,
              }}
            >
              Features
            </div>

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
                    padding: "6px 0",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="1.8"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <polyline points="8.5 12.5 11 15 15.5 9.5" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <p style={{ textAlign: "center", fontSize: 13, color: "#94a3b8" }}>
        EMI options available · All plans include a certificate of completion
      </p>
    </section>
  );
}
