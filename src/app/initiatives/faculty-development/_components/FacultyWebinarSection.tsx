"use client";

import { Fragment, useEffect, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

// The one line to edit when the cohort moves. A real fixed instant, not a
// rolling "always 2 days" timer — the countdown reaches zero and stays there
// rather than resetting on every page load.
const REGISTRATION_CLOSES_AT = "2026-08-19T23:59:59+05:30";

// Presentation only, matching the login dialog's approach — no API call, no
// OTP request, no persistence. "Send code" and "Confirm my seat" are inert;
// the two handlers below are where wiring goes.

// Institutional leadership, matching the section's copy — this is pitched at
// people who can commit a department, not at individual teaching staff.
const ROLES = [
  "Vice Chancellor / Director / Principal",
  "Dean / Head of Department",
  "Training & Placement Officer (TPO)",
  "IQAC Coordinator",
  "Registrar / Administration",
  "Other academic leader",
];

const DISCIPLINES = [
  "Engineering",
  "Arts & Science",
  "Management",
  "Computer Applications",
  "Pharmacy",
  "Architecture",
  "Law",
  "Medical & Allied Health",
  "Education",
  "Other",
];

const FACULTY_STRENGTHS = ["Under 50", "50 – 150", "150 – 400", "400+"];

// Each item leads with a bold claim, then the supporting sentence.
const BENEFITS = [
  {
    lead: "Unlock AWS Academy status.",
    body: "See how a single cohort of certified faculty makes your campus eligible for global AWS partnership benefits.",
  },
  {
    lead: "Walk away with 8 accreditation assets.",
    body: "AI usage policy, assessment banks, outcome maps — documentation your institution owns permanently.",
  },
  {
    lead: "Lift placement outcomes.",
    body: "Map industry-demanded AI skills onto your existing syllabus across 8 disciplines — without a curriculum rewrite.",
  },
];

// The dark version's #d2862c only reaches ~2.6:1 on white, so accent text uses
// a darker gold. The filled button keeps the original shade — its contrast is
// carried by the dark label on top, not by the fill against the page.
const GOLD_TEXT = "#a56a15";

// One teal for the whole section — the check markers and the Send code button.
// Deliberately not a second, near-identical green just for the checks.
const TEAL = "#0f7a5e";

// The trailing `!` is load-bearing. globals.css:283 has an UNLAYERED
// `* { @apply border-border outline-ring/50 }`, and unlayered normal
// declarations outrank anything in @layer utilities regardless of specificity
// — so a plain `border-gray-300` or `focus:border-…` is silently discarded and
// every border renders as var(--border). Only !important escapes that.
const FIELD_CLASSES =
  "h-9 w-full rounded-md border border-gray-300! bg-white px-3 text-sm text-slate-900 placeholder:text-gray-400 outline-none transition-colors focus:border-[#c8912e]! focus:ring-1 focus:ring-[#c8912e]/40";

const LABEL_CLASSES = "mb-1 block text-[0.78rem] font-medium text-gray-600";

const pad = (n: number) => String(n).padStart(2, "0");

// Returns null until mounted. The server has no idea what time it is on the
// client, so rendering real digits during SSR would guarantee a hydration
// mismatch on the seconds field — the placeholder frame avoids it.
function useCountdown(target: string) {
  const [msLeft, setMsLeft] = useState<number | null>(null);

  useEffect(() => {
    const deadline = new Date(target).getTime();
    const tick = () => setMsLeft(Math.max(0, deadline - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  if (msLeft === null) return null;

  const total = Math.floor(msLeft / 1000);
  return {
    days: pad(Math.floor(total / 86400)),
    hours: pad(Math.floor(total / 3600) % 24),
    minutes: pad(Math.floor(total / 60) % 60),
    seconds: pad(total % 60),
  };
}

export default function FacultyWebinarSection() {
  const [role, setRole] = useState(ROLES[0]);
  const [discipline, setDiscipline] = useState(DISCIPLINES[0]);
  // Starts empty so the placeholder shows and the required check forces a
  // deliberate pick, rather than silently defaulting to the smallest band.
  const [strength, setStrength] = useState("");
  const left = useCountdown(REGISTRATION_CLOSES_AT);

  const units = [
    { label: "Days", value: left?.days ?? "––" },
    { label: "Hours", value: left?.hours ?? "––" },
    { label: "Minutes", value: left?.minutes ?? "––" },
    { label: "Seconds", value: left?.seconds ?? "––" },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    // Target for the "Reserve a seat" link in the syllabus sign-in dialog.
    <section
      id="reserve-your-seat"
      className="scroll-mt-28 bg-white py-10 sm:py-12"
    >
      {/* Same 96rem measure as FacultyCtaSection lower down the page, rather
          than a fourth width of its own. */}
      <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* ---------------- Left: the pitch ---------------- */}
          <div>
            <p
              className="font-mono text-[0.7rem] uppercase tracking-[0.2em]"
              style={{ color: GOLD_TEXT }}
            >
              {/* Free webinar <span className="mx-2">·</span> 60 minutes */}
            </p>

            <h2 className="mt-3 text-[1.7rem] font-bold leading-tight text-slate-900 sm:text-[1.85rem]">
              Register for the Webinar to Reserve Your Seat
            </h2>

            <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-gray-600">
              A 75-minute executive briefing on clearing the AWS Academy
              accreditation bottleneck, turning faculty upskilling into
              permanent NAAC/NBA evidence, and locking down student data before
              the DPDP rules bite.
            </p>

            <ul className="mt-5 space-y-4">
              {BENEFITS.map((benefit) => (
                <li key={benefit.lead} className="flex gap-3">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md"
                    style={{ backgroundColor: TEAL }}
                    aria-hidden="true"
                  >
                    <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                  </span>
                  <p className="text-sm leading-relaxed text-gray-600">
                    <strong className="font-semibold text-slate-900">
                      {benefit.lead}
                    </strong>{" "}
                    {benefit.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------------- Right: the form ---------------- */}
          <div className="self-start">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
              <form
                onSubmit={handleSubmit}
                className="grid gap-3 sm:grid-cols-2"
              >
                <div>
                  <label htmlFor="webinar-name" className={LABEL_CLASSES}>
                    Your name
                  </label>
                  <input
                    id="webinar-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Full name"
                    className={FIELD_CLASSES}
                  />
                </div>

                <div>
                  <label
                    htmlFor="webinar-institution"
                    className={LABEL_CLASSES}
                  >
                    Institution
                  </label>
                  <input
                    id="webinar-institution"
                    name="institution"
                    type="text"
                    required
                    autoComplete="organization"
                    placeholder="College or university"
                    className={FIELD_CLASSES}
                  />
                </div>

                <div>
                  <label htmlFor="webinar-role" className={LABEL_CLASSES}>
                    Role
                  </label>
                  <div className="relative">
                    <select
                      id="webinar-role"
                      name="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className={`${FIELD_CLASSES} appearance-none pr-9`}
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="webinar-discipline" className={LABEL_CLASSES}>
                    Discipline
                  </label>
                  <div className="relative">
                    <select
                      id="webinar-discipline"
                      name="discipline"
                      value={discipline}
                      onChange={(e) => setDiscipline(e.target.value)}
                      className={`${FIELD_CLASSES} appearance-none pr-9`}
                    >
                      {DISCIPLINES.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="webinar-email" className={LABEL_CLASSES}>
                    Work email
                  </label>
                  <input
                    id="webinar-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="name@institution.edu"
                    className={FIELD_CLASSES}
                  />
                </div>

                <div>
                  <label htmlFor="webinar-course" className={LABEL_CLASSES}>
                    One course you teach{" "}
                    <span className="text-gray-400">— optional</span>
                  </label>
                  <input
                    id="webinar-course"
                    name="course"
                    type="text"
                    placeholder="e.g. Strength of Materials"
                    className={FIELD_CLASSES}
                  />
                </div>

                {/* Nested grid rather than two plain grid cells: the mobile
                    row carries three controls, so it needs the larger share
                    of the width or the number input gets squeezed. */}
                <div className="grid gap-3 sm:col-span-2 sm:grid-cols-[1.6fr_1fr]">
                  <div>
                    <label htmlFor="webinar-mobile" className={LABEL_CLASSES}>
                      Mobile{" "}
                      <span className="text-gray-400">
                        — verified by one-time code
                      </span>
                    </label>
                    <div className="flex gap-2">
                      <span className="flex h-9 shrink-0 items-center rounded-md border border-gray-300! bg-white px-3 text-sm text-gray-700">
                        +91
                      </span>
                      <input
                        id="webinar-mobile"
                        name="mobile"
                        type="tel"
                        required
                        inputMode="numeric"
                        pattern="[0-9]{10}"
                        maxLength={10}
                        autoComplete="tel-national"
                        placeholder="10-digit mobile number"
                        className={`${FIELD_CLASSES} flex-1`}
                      />
                      <button
                        type="button"
                        className="h-9 shrink-0 rounded-md bg-[#c1cac8] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#0d6b52] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f7a5e]!"
                      >
                        Send code
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="webinar-strength" className={LABEL_CLASSES}>
                      Approx. faculty strength
                    </label>
                    <div className="relative">
                      <select
                        id="webinar-strength"
                        name="strength"
                        required
                        value={strength}
                        onChange={(e) => setStrength(e.target.value)}
                        className={`${FIELD_CLASSES} appearance-none pr-9 ${
                          strength ? "" : "text-gray-400"
                        }`}
                      >
                        <option value="" disabled>
                          Select range…
                        </option>
                        {FACULTY_STRENGTHS.map((band) => (
                          <option key={band} value={band}>
                            {band}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-500"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-1 flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    className="h-10 shrink-0 rounded-md bg-[#0d1621] px-6 text-sm font-semibold text-[#ebebeb] transition-colors hover:bg-[#b8831f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8912e]!"
                  >
                    Confirm my seat
                  </button>
                  <p className="text-[0.78rem] leading-relaxed text-gray-500">
                    We use your email and number for the joining link and the
                    follow-up material. Nothing else.
                  </p>
                </div>
              </form>
            </div>

            {/* Deliberately the dark block from the reference: on an otherwise
                white section it reads as the one urgent thing on the page. */}
            <div className="mt-4 rounded-xl border border-[#1c2b38]! bg-[#0d1621] px-6 py-5">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-gray-400">
                Registration closes in
              </p>

              <div className="mt-3 flex items-start gap-2 sm:gap-4">
                {units.map((unit, i) => (
                  <Fragment key={unit.label}>
                    {i > 0 && (
                      <span
                        className="font-mono text-[1.7rem] font-bold leading-none text-gray-600"
                        aria-hidden="true"
                      >
                        :
                      </span>
                    )}
                    <div className="text-center">
                      <div className="font-mono text-[1.7rem] font-bold leading-none tabular-nums text-white">
                        {unit.value}
                      </div>
                      <div className="mt-2 text-[0.6rem] uppercase tracking-[0.15em] text-gray-500">
                        {unit.label}
                      </div>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
