"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const STAGES = [
  {
    code: "SRC",
    label: "Sourced",
    count: 248,
    desc: "Resume capture & talent pool",
  },
  {
    code: "SCR",
    label: "Screened",
    count: 96,
    desc: "Screening & shortlisting",
  },
  {
    code: "INT",
    label: "Interview",
    count: 34,
    desc: "Panels & client rounds",
  },
  {
    code: "OFR",
    label: "Offer",
    count: 12,
    desc: "Offers & documentation",
  },
  {
    code: "DEP",
    label: "Deployed",
    count: 8,
    desc: "Onboarding & deployment",
  },
] as const;

const REQUISITION_ROWS = [
  "REQ-2214 · Java Developer · Bengaluru · 12 screened",
  "REQ-1980 · Data Engineer · Hyderabad · 3 shortlisted",
  "REQ-2341 · QA Automation · Pune · interview scheduled",
  "REQ-1875 · Cloud Engineer · Chennai · offer released",
  "REQ-2402 · Support Analyst · Bengaluru · 1 deployed",
  "REQ-2098 · React Developer · Remote · 24 sourced",
  "REQ-1766 · SAP Consultant · Mumbai · client review",
  "REQ-2455 · Network Engineer · Noida · resume captured",
];

export default function TalentOsComingSoonPage() {
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

        /* signature motion: candidates moving down the funnel */
        @keyframes stage-sweep {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          65% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        .stage-sweep {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(108, 124, 217, 0.22),
            transparent
          );
          animation: stage-sweep 3.4s ease-in-out infinite;
        }

        @keyframes token-drop {
          0%,
          100% {
            transform: translateY(0);
            opacity: 0.55;
          }
          50% {
            transform: translateY(-4px);
            opacity: 1;
          }
        }
        .token-drop {
          animation: token-drop 3.4s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .ledger-track,
          .stamp-anim,
          .stage-sweep,
          .token-drop {
            animation: none;
          }
          .stamp-anim-big {
            animation: none;
            transform: rotate(-6deg);
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

      {/* faint grid backdrop, evokes a requisition board */}
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
            REQ. INDEX · TALENTOS/2026
          </span>
        </header>

        {/* hero */}
        <section className="relative mt-14 grid flex-1 grid-cols-1 items-center gap-16 lg:mt-16 lg:grid-cols-[1.1fr_0.9fr]">
          {/* big catchy stamp, overlaps both columns */}
          <div className="pointer-events-none absolute left-1/2 top-[-2.75rem] z-40 -translate-x-1/2 sm:left-[8%] sm:translate-x-0">
            <div className="stamp-anim-big font-display rounded-md border-[3px] border-[#C89B3C] bg-[#0D1117]/90 px-5 py-2 text-2xl font-bold tracking-wide text-[#C89B3C] shadow-[0_10px_36px_rgba(200,155,60,0.18)] sm:px-8 sm:py-3 sm:text-4xl md:text-5xl">
              COMING SOON
            </div>
          </div>

          <div>
            <p className="font-record mb-5 inline-block rounded-sm border border-[#232B36] px-3 py-1 text-[11px] tracking-[0.2em] text-[#6C7CD9]">
              TALENT SYSTEMS · SOURCE, SCREEN & DEPLOY
            </p>

            <h1 className="font-display mt-10 text-5xl font-semibold leading-[0.95] tracking-tight text-[#EDEFF2] sm:mt-14 sm:text-7xl">
              TALENT OS
            </h1>

            <p className="font-body mt-6 max-w-md text-lg leading-relaxed text-[#8D97A6]">
              One pipeline for every role SFJ hires for — requirements, captured
              resumes, screening notes, interviews and deployment — so
              recruiters, clients and delivery teams all read the same record.
            </p>

            <div className="font-record mt-8 flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3E8E82] opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#3E8E82]" />
              </span>
              <span className="text-[13px] tracking-wide text-[#8D97A6]">
                BUILD IN PROGRESS — ROLLING OUT TO RECRUITER TEAMS
              </span>
            </div>

            {/* notify form, styled like a requisition slip */}
            <form
              onSubmit={handleSubmit}
              className="font-body mt-10 max-w-md rounded-md border border-[#232B36] bg-[#151B24] p-5"
            >
              <p className="font-record mb-3 text-[11px] tracking-[0.15em] text-[#8D97A6]">
                REQUEST ACCESS ON LAUNCH
              </p>
              {status === "submitted" ? (
                <p className="text-sm text-[#EDEFF2]">
                  Logged. We&rsquo;ll reach out when Talent OS opens for your
                  team.
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
                      className="w-full flex-1 rounded-sm border border-[#232B36] bg-[#0D1117] px-3 py-2 text-sm text-[#EDEFF2] placeholder-[#5A6270] outline-none focus:border-[#6C7CD9]"
                    />
                    <button
                      type="submit"
                      className="whitespace-nowrap rounded-sm bg-[#6C7CD9] px-4 py-2 text-sm font-medium text-[#0D1117] transition-opacity hover:opacity-90"
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

          {/* signature element: a hiring funnel that keeps moving */}
          <div className="relative mx-auto w-full max-w-sm select-none">
            {STAGES.map((s, i) => {
              const isShortlist = s.code === "INT";
              return (
                <div
                  key={s.code}
                  className="relative mx-auto mb-3 rounded-md border border-[#232B36] bg-[#151B24] px-4 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
                  style={{ width: `${100 - i * 11}%` }}
                >
                  {/* clipped layer so the sweep stays inside the row */}
                  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-md">
                    <div
                      className="stage-sweep absolute inset-0"
                      style={{ animationDelay: `${i * 0.45}s` }}
                    />
                  </div>

                  <div className="relative flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <span className="font-record text-[11px] tracking-wider text-[#6C7CD9]">
                        {s.code}
                      </span>
                      <p className="font-display mt-0.5 truncate text-sm font-semibold text-[#EDEFF2]">
                        {s.label}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-1.5">
                        {Array.from({
                          length: Math.max(2, 5 - i),
                        }).map((_, d) => (
                          <span
                            key={d}
                            className="token-drop h-2 w-2 rounded-full bg-[#6C7CD9]"
                            style={{ animationDelay: `${i * 0.45 + d * 0.1}s` }}
                          />
                        ))}
                      </div>
                      <div className="text-right">
                        <p className="font-display text-lg font-semibold leading-none text-[#EDEFF2]">
                          {s.count}
                        </p>
                        <p className="font-record mt-1 text-[9px] tracking-widest text-[#5A6270]">
                          CANDIDATES
                        </p>
                      </div>
                    </div>
                  </div>

                  {isShortlist && (
                    <div
                      className={`font-record pointer-events-none absolute -right-4 -top-3 rounded-sm border-2 border-[#C89B3C] bg-[#0D1117]/90 px-2 py-1 text-[10px] font-medium tracking-widest text-[#C89B3C] ${
                        stamped ? "stamp-anim" : "opacity-0"
                      }`}
                      style={{ transform: "rotate(-8deg)" }}
                    >
                      SHORTLISTED
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* scrolling requisition strip */}
        <section className="perforated mt-20 overflow-hidden rounded-md border-y border-[#232B36] bg-[#0F141B] py-3">
          <div className="ledger-track flex flex-col">
            {[...REQUISITION_ROWS, ...REQUISITION_ROWS].map((row, i) => (
              <span
                key={i}
                className="font-record px-6 py-1.5 text-[12px] tracking-wide text-[#5A6270]"
              >
                {row}
              </span>
            ))}
          </div>
        </section>

        {/* stage index footer */}
        <footer className="font-body mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#232B36] pt-6 text-[13px] text-[#8D97A6]">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {STAGES.map((s) => (
              <span key={s.code} className="whitespace-nowrap">
                <span className="font-record text-[#6C7CD9]">{s.code}</span> ·{" "}
                {s.desc}
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
