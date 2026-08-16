"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const VERTICALS = [
  {
    code: "B2I",
    label: "Institutes",
    desc: "Colleges, universities & training bodies",
  },
  {
    code: "B2G",
    label: "Government & PSU",
    desc: "CPSU, SPSU & skilling missions",
  },
  {
    code: "CSR",
    label: "Corporate",
    desc: "CSR partners & sustainability accounts",
  },
  {
    code: "KaaS",
    label: "Knowledge as a Service",
    desc: "Content & curriculum delivery",
  },
  {
    code: "TaaS",
    label: "Training as a Service",
    desc: "Delivery & faculty operations",
  },
] as const;

const LEDGER_ROWS = [
  "SPOC-04471 · B2I · Karnataka · assigned",
  "SPOC-03928 · B2G · Skilling Mission · under review",
  "SPOC-05102 · CSR · West Zone · verified",
  "SPOC-02214 · KaaS · Content Partner · active",
  "SPOC-04890 · TaaS · Faculty Ops · assigned",
  "SPOC-03310 · B2G · CPSU · verified",
  "SPOC-05577 · CSR · South Zone · active",
  "SPOC-01984 · B2I · Institute Network · assigned",
];

export default function CaspaComingSoonPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "invalid" | "submitted">(
    "idle",
  );
  const [stamped, setStamped] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStamped(true), 500);
    return () => clearTimeout(t);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setStatus("invalid");
      return;
    }
    setStatus("submitted");
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#0D1117] text-[#EDEFF2]">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap");

        .font-display {
          font-family: "Space Grotesk", sans-serif;
        }
        .font-body {
          font-family: "Inter", sans-serif;
        }
        .font-record {
          font-family: "IBM Plex Mono", monospace;
        }

        @keyframes marquee {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        .ledger-track {
          animation: marquee 22s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .ledger-track {
            animation: none;
          }
        }

        @keyframes stamp-in {
          0% {
            opacity: 0;
            transform: scale(1.6) rotate(-14deg);
          }
          60% {
            opacity: 1;
            transform: scale(0.92) rotate(-8deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(-8deg);
          }
        }
        .stamp-anim {
          animation: stamp-in 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }

        @keyframes stamp-in-big {
          0% {
            opacity: 0;
            transform: scale(2.2) rotate(-14deg);
          }
          55% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(-6deg);
          }
        }
        .stamp-anim-big {
          animation: stamp-in-big 0.7s cubic-bezier(0.16, 0.9, 0.2, 1) both;
          animation-delay: 0.15s;
        }
        @media (prefers-reduced-motion: reduce) {
          .stamp-anim-big {
            animation: none;
            transform: rotate(-6deg);
          }
        }

        @keyframes drift {
          0%,
          100% {
            transform: translateY(0px) rotate(var(--r, 0deg));
          }
          50% {
            transform: translateY(-6px) rotate(var(--r, 0deg));
          }
        }
        .card-drift {
          animation: drift 7s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .card-drift,
          .stamp-anim {
            animation: none;
          }
        }

        .perforated {
          background-image: radial-gradient(
            circle,
            #232b36 1.5px,
            transparent 1.5px
          );
          background-size: 14px 14px;
        }
      `}</style>

      {/* faint grid backdrop, evokes an index / ledger sheet */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#EDEFF2 1px, transparent 1px), linear-gradient(90deg, #EDEFF2 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-10 sm:px-10">
        {/* top bar */}
        <header className="flex items-center justify-between">
          <Link
            href="/"
            className="font-record text-xs tracking-wider text-[#8D97A6] transition-colors hover:text-[#EDEFF2]"
          >
            ← SFJ BUSINESS SOLUTIONS
          </Link>
          <span className="font-record text-xs tracking-wider text-[#8D97A6]">
            REG. NO. CASPA/2026
          </span>
        </header>

        {/* hero */}
        <section className="relative mt-14 grid flex-1 grid-cols-1 items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:mt-16">
          {/* big catchy stamp, overlaps both columns */}
          <div
            className="stamp-anim-big pointer-events-none absolute left-1/2 top-[-2.75rem] z-40 -translate-x-1/2 sm:left-[8%] sm:translate-x-0"
            style={{ transform: "rotate(-6deg)" }}
          >
            <div className="font-display rounded-md border-[3px] border-[#C89B3C] bg-[#0D1117]/90 px-5 py-2 text-2xl font-700 tracking-wide text-[#C89B3C] shadow-[0_10px_36px_rgba(200,155,60,0.18)] sm:px-8 sm:py-3 sm:text-4xl md:text-5xl">
              COMING SOON
            </div>
          </div>

          <div>
            <p className="font-record mb-5 inline-block rounded-sm border border-[#232B36] px-3 py-1 text-[11px] tracking-[0.2em] text-[#C89B3C]">
              INTERNAL SYSTEMS · SINGLE POINT OF CONTACT REGISTRY
            </p>

            <h1 className="font-display mt-10 text-6xl font-600 leading-[0.95] tracking-tight text-[#EDEFF2] sm:mt-14 sm:text-7xl">
              CASPA
            </h1>

            <p className="font-body mt-6 max-w-md text-lg leading-relaxed text-[#8D97A6]">
              One index for every relationship SFJ holds across India —
              institutes, government bodies, corporate partners, and skilling
              delivery — replacing five scattered sheets with one running
              record.
            </p>

            <div className="font-record mt-8 flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3E8E82] opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#3E8E82]" />
              </span>
              <span className="text-[13px] tracking-wide text-[#8D97A6]">
                BUILD IN PROGRESS — LAUNCHING FOR SFJ TEAMS SOON
              </span>
            </div>

            {/* notify form, styled like a registration slip */}
            <form
              onSubmit={handleSubmit}
              className="font-body mt-10 max-w-md rounded-md border border-[#232B36] bg-[#151B24] p-5"
            >
              <p className="font-record mb-3 text-[11px] tracking-[0.15em] text-[#8D97A6]">
                REQUEST ACCESS ON LAUNCH
              </p>
              {status === "submitted" ? (
                <p className="text-sm text-[#EDEFF2]">
                  Logged. We&rsquo;ll reach out when CASPA opens for your team.
                </p>
              ) : (
                <>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === "invalid") setStatus("idle");
                      }}
                      placeholder="you@sfjbs.com"
                      className="w-full flex-1 rounded-sm border border-[#232B36] bg-[#0D1117] px-3 py-2 text-sm text-[#EDEFF2] placeholder-[#5A6270] outline-none focus:border-[#C89B3C]"
                    />
                    <button
                      type="submit"
                      className="whitespace-nowrap rounded-sm bg-[#C89B3C] px-4 py-2 text-sm font-500 text-[#0D1117] transition-opacity hover:opacity-90"
                    >
                      Notify me
                    </button>
                  </div>
                  {status === "invalid" && (
                    <p className="mt-2 text-[13px] text-[#E4A5A5]">
                      Enter a valid email address first.
                    </p>
                  )}
                </>
              )}
            </form>
          </div>

          {/* signature element: stamped record card stack */}
          <div className="relative mx-auto h-[380px] w-full max-w-sm select-none">
            {VERTICALS.map((v, i) => {
              const offsets = [
                { r: -8, x: 0, y: 0, z: 50 },
                { r: 6, x: 28, y: 18, z: 40 },
                { r: -4, x: -20, y: 40, z: 30 },
                { r: 10, x: 34, y: 62, z: 20 },
                { r: -10, x: -14, y: 86, z: 10 },
              ];
              const o = offsets[i];
              const isTop = i === 0;
              return (
                <div
                  key={v.code}
                  className={`absolute left-1/2 top-6 w-64 rounded-md border border-[#232B36] bg-[#151B24] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.35)] ${
                    isTop ? "card-drift" : ""
                  }`}
                  style={{
                    zIndex: o.z,
                    transform: `translate(calc(-50% + ${o.x}px), ${o.y}px) rotate(${o.r}deg)`,
                    ["--r" as string]: `${o.r}deg`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-record text-[11px] tracking-wider text-[#8D97A6]">
                      VERTICAL
                    </span>
                    <span className="font-record text-[11px] text-[#8D97A6]">
                      IN-{String(i + 1).padStart(3, "0")}
                    </span>
                  </div>
                  <p className="font-display mt-2 text-xl font-600 text-[#EDEFF2]">
                    {v.code}
                  </p>
                  <p className="font-body mt-1 text-[13px] text-[#8D97A6]">
                    {v.label}
                  </p>

                  {isTop && (
                    <div
                      className={`font-record pointer-events-none absolute -right-4 -top-3 rounded-sm border-2 border-[#C89B3C] px-2 py-1 text-[10px] font-500 tracking-widest text-[#C89B3C] ${
                        stamped ? "stamp-anim" : "opacity-0"
                      }`}
                      style={{ transform: "rotate(-8deg)" }}
                    >
                      REGISTERED
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* scrolling ledger strip */}
        <section className="perforated mt-20 overflow-hidden rounded-md border-y border-[#232B36] bg-[#0F141B] py-3">
          <div className="ledger-track flex flex-col">
            {[...LEDGER_ROWS, ...LEDGER_ROWS].map((row, i) => (
              <span
                key={i}
                className="font-record px-6 py-1.5 text-[12px] tracking-wide text-[#5A6270]"
              >
                {row}
              </span>
            ))}
          </div>
        </section>

        {/* vertical index footer */}
        <footer className="font-body mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#232B36] pt-6 text-[13px] text-[#8D97A6]">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {VERTICALS.map((v) => (
              <span key={v.code} className="whitespace-nowrap">
                <span className="font-record text-[#C89B3C]">{v.code}</span> ·{" "}
                {v.desc}
              </span>
            ))}
          </div>
          <span className="font-record whitespace-nowrap text-[#5A6270]">
            © {new Date().getFullYear()} SFJ Business Solutions
          </span>
        </footer>
      </div>
    </main>
  );
}
