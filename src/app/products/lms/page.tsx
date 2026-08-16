"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const TRACKS = [
  {
    code: "FSD",
    label: "Full Stack Development",
    desc: "Java, .NET, MERN & mobile stacks",
  },
  {
    code: "DAI",
    label: "Data, AI & Analytics",
    desc: "Data engineering, ML & GenAI",
  },
  {
    code: "CLD",
    label: "Cloud & DevOps",
    desc: "AWS, Azure, Kubernetes & CI/CD",
  },
  {
    code: "QAT",
    label: "Testing & Quality",
    desc: "Automation, performance & SDET",
  },
  {
    code: "SEC",
    label: "Cyber Security",
    desc: "SOC, network & application security",
  },
] as const;

const MODULES = [
  { code: "MOD-01", title: "Foundations", status: "COMPLETE", progress: 100 },
  {
    code: "MOD-02",
    title: "Core Engineering",
    status: "COMPLETE",
    progress: 100,
  },
  {
    code: "MOD-03",
    title: "Applied Labs",
    status: "IN PROGRESS",
    progress: 68,
  },
  { code: "MOD-04", title: "Capstone Project", status: "QUEUED", progress: 0 },
  {
    code: "MOD-05",
    title: "Assessment & Certificate",
    status: "ON COMPLETION",
    progress: 0,
  },
] as const;

const ENROLMENT_ROWS = [
  "LRN-04471 · Full Stack · Cohort 12 · module 4 of 8",
  "LRN-03928 · Data & AI · Cohort 07 · assessment due",
  "LRN-05102 · Cloud & DevOps · Cohort 03 · lab submitted",
  "LRN-02214 · Testing & QA · Cohort 11 · certificate issued",
  "LRN-04890 · Cyber Security · Cohort 05 · in progress",
  "LRN-03310 · Full Stack · Cohort 12 · mentor review",
  "LRN-05577 · Data & AI · Cohort 08 · enrolled",
  "LRN-01984 · Cloud & DevOps · Cohort 04 · module 2 of 6",
];

const STATUS_COLOR: Record<string, string> = {
  COMPLETE: "text-[#3E8E82]",
  "IN PROGRESS": "text-[#C89B3C]",
  QUEUED: "text-[#5A6270]",
  "ON COMPLETION": "text-[#5A6270]",
};

export default function LmsComingSoonPage() {
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

        /* signature motion: progress travelling down the learning path */
        @keyframes rail-fill {
          0% {
            transform: scaleY(0);
            opacity: 1;
          }
          62% {
            transform: scaleY(1);
            opacity: 1;
          }
          88% {
            transform: scaleY(1);
            opacity: 1;
          }
          100% {
            transform: scaleY(1);
            opacity: 0;
          }
        }
        .rail-fill {
          transform-origin: top;
          animation: rail-fill 6s ease-in-out infinite;
        }

        @keyframes node-lit {
          0%,
          100% {
            background-color: #0d1117;
            border-color: #232b36;
            box-shadow: none;
          }
          10%,
          72% {
            background-color: #3e8e82;
            border-color: #3e8e82;
            box-shadow: 0 0 0 4px rgba(62, 142, 130, 0.16);
          }
        }
        .node-lit {
          animation: node-lit 6s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .ledger-track,
          .stamp-anim,
          .rail-fill,
          .node-lit {
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

      {/* faint grid backdrop, evokes a course index sheet */}
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
            COURSE INDEX · LMS/2026
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
            <p className="font-record mb-5 inline-block rounded-sm border border-[#232B36] px-3 py-1 text-[11px] tracking-[0.2em] text-[#3E8E82]">
              LEARNING SYSTEMS · COURSES, COHORTS & CERTIFICATION
            </p>

            <h1 className="font-display mt-10 text-6xl font-semibold leading-[0.95] tracking-tight text-[#EDEFF2] sm:mt-14 sm:text-7xl">
              LMS
            </h1>

            <p className="font-body mt-6 max-w-md text-lg leading-relaxed text-[#8D97A6]">
              One platform for every learner SFJ trains — curriculum, cohorts,
              labs, mentor reviews and certification — so a program runs the
              same way whether it is delivered on campus, on site, or online.
            </p>

            <div className="font-record mt-8 flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3E8E82] opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#3E8E82]" />
              </span>
              <span className="text-[13px] tracking-wide text-[#8D97A6]">
                BUILD IN PROGRESS — FIRST COHORTS OPEN SOON
              </span>
            </div>

            {/* notify form, styled like an enrolment slip */}
            <form
              onSubmit={handleSubmit}
              className="font-body mt-10 max-w-md rounded-md border border-[#232B36] bg-[#151B24] p-5"
            >
              <p className="font-record mb-3 text-[11px] tracking-[0.15em] text-[#8D97A6]">
                REQUEST EARLY ACCESS
              </p>
              {status === "submitted" ? (
                <p className="text-sm text-[#EDEFF2]">
                  Logged. We&rsquo;ll reach out when the LMS opens for your
                  cohort.
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
                      className="w-full flex-1 rounded-sm border border-[#232B36] bg-[#0D1117] px-3 py-2 text-sm text-[#EDEFF2] placeholder-[#5A6270] outline-none focus:border-[#3E8E82]"
                    />
                    <button
                      type="submit"
                      className="whitespace-nowrap rounded-sm bg-[#3E8E82] px-4 py-2 text-sm font-medium text-[#0D1117] transition-opacity hover:opacity-90"
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

          {/* signature element: a learning path that fills as it runs */}
          <div className="relative mx-auto w-full max-w-sm select-none">
            <div className="absolute bottom-4 left-[12px] top-4 w-px bg-[#232B36]">
              <div className="rail-fill absolute inset-0 bg-gradient-to-b from-[#3E8E82] via-[#3E8E82] to-[#3E8E82]/25" />
            </div>

            <ul className="space-y-3">
              {MODULES.map((m, i) => {
                const isActive = m.status === "IN PROGRESS";
                const isLast = i === MODULES.length - 1;
                return (
                  <li key={m.code} className="relative pl-10">
                    <span
                      className="node-lit absolute left-[6px] top-7 h-3 w-3 rounded-full border-2 border-[#232B36] bg-[#0D1117]"
                      style={{ animationDelay: `${i * 0.9}s` }}
                    />
                    <div
                      className={`relative rounded-md border bg-[#151B24] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.35)] ${
                        isActive
                          ? "border-[#3E8E82]/50 ring-1 ring-[#3E8E82]/20"
                          : "border-[#232B36]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-record text-[11px] tracking-wider text-[#8D97A6]">
                          {m.code}
                        </span>
                        <span
                          className={`font-record text-[10px] tracking-widest ${
                            STATUS_COLOR[m.status] ?? "text-[#5A6270]"
                          }`}
                        >
                          {m.status}
                        </span>
                      </div>

                      <p className="font-display mt-2 text-base font-semibold text-[#EDEFF2]">
                        {m.title}
                      </p>

                      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-[#0D1117]">
                        <div
                          className="h-full rounded-full bg-[#3E8E82]"
                          style={{ width: `${m.progress}%` }}
                        />
                      </div>

                      {isLast && (
                        <div
                          className={`font-record pointer-events-none absolute -right-4 -top-3 rounded-sm border-2 border-[#C89B3C] bg-[#0D1117]/90 px-2 py-1 text-[10px] font-medium tracking-widest text-[#C89B3C] ${
                            stamped ? "stamp-anim" : "opacity-0"
                          }`}
                          style={{ transform: "rotate(-8deg)" }}
                        >
                          CERTIFIED
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* scrolling enrolment strip */}
        <section className="perforated mt-20 overflow-hidden rounded-md border-y border-[#232B36] bg-[#0F141B] py-3">
          <div className="ledger-track flex flex-col">
            {[...ENROLMENT_ROWS, ...ENROLMENT_ROWS].map((row, i) => (
              <span
                key={i}
                className="font-record px-6 py-1.5 text-[12px] tracking-wide text-[#5A6270]"
              >
                {row}
              </span>
            ))}
          </div>
        </section>

        {/* track index footer */}
        <footer className="font-body mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#232B36] pt-6 text-[13px] text-[#8D97A6]">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {TRACKS.map((t) => (
              <span key={t.code} className="whitespace-nowrap">
                <span className="font-record text-[#3E8E82]">{t.code}</span> ·{" "}
                {t.desc}
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
