"use client";
import { useState } from "react";
import Image from "next/image";

// Stand-in for any stage without its own photo yet — same image reused
// rather than the empty placeholder box, so the accordion never shows a
// blank panel. Swap each stage's own `image` in as it's supplied; this only
// covers whatever's left over.
const FALLBACK_IMAGE = "/Kaas/Assess workforce readness.png";

const STAGES = [
  {
    number: "01",
    roman: "I",
    shortLabel: "ASSESS READINESS",
    title: "Assess workforce readiness",
    description:
      "Skill mapping and competency evaluation across your teams, so the baseline is measured rather than assumed.",
    image: "/Kaas/Assess workforce readness.png",
  },
  {
    number: "02",
    roman: "II",
    shortLabel: "NEED ANALYSIS",
    title: "Training need analysis",
    description:
      "Learning priorities tied to business objectives, with a clear view of what to fix first and what it returns.",
    image: "/Kaas/Traning need Analysis.png",
  },
  {
    number: "03",
    roman: "III",
    shortLabel: "CURATE PROGRAMMES",
    title: "Curate training programmes",
    description:
      "Role-based learning paths built around your stack, delivered by OEM-certified instructors.",
    image: "/Kaas/Curate Training Programs.png",
  },
  {
    number: "04",
    roman: "IV",
    shortLabel: "MONITOR OUTCOMES",
    title: "Monitor learning outcomes",
    description:
      "Progress and performance tracked live across ILT and VLT, so you see movement before the programme ends.",
    image: "/Kaas/Monitor Learning Outcomes.png",
  },
  {
    number: "05",
    roman: "V",
    shortLabel: "PEOPLE SUPPLY CHAIN",
    title: "People supply chain",
    description:
      "Certified talent allocated to live roles, with career pathing and succession planned alongside.",
    image: "/Kaas/People Supply Chain.png",
  },
];

// Horizontal accordion, five panels. One is always open — default the first.
// Hover previews on desktop, but click is the mechanism that actually holds
// state, so it works identically on touch (hover never fires there).
//
// Sizing is plain responsive Tailwind classes, not inline styles: the axis
// that collapses/expands flips between height (stacked, below md) and width
// (side by side, from md), and inline styles can't respond to a breakpoint —
// only real CSS (Tailwind's md: prefix) can. flex-none (flex: 0 0 auto) on
// every panel is what stops the row from stretching panels to fill the
// container — the spec is explicit that flex-grow drifts collapsed widths.
// Fixed widths are chosen so the row's total width lands close to the
// container's, rather than being forced there via flex-grow.
const ProcessAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        {/* Shared wrapper, centered as one unit (mx-auto) and sized to the
            row's own width (70rem = 4 collapsed panels at 10rem + one
            expanded at 30rem). The heading and the row both stay left-
            aligned WITHIN this wrapper — that's what keeps their edges lined
            up with each other — while the wrapper itself centers on the
            page. Using an explicit max-width here rather than w-fit: a
            w-fit wrapper containing a w-full (mobile) row creates a circular
            sizing dependency that browsers resolve unpredictably. */}
        <div className="max-w-[70rem] mx-auto">
          <div className="relative max-w-2xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 text-xs font-medium uppercase tracking-wide mb-5">
              <span aria-hidden="true">•</span> Strategic Training Framework{" "}
              <span aria-hidden="true">•</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              From skills baseline to people in the roles you need
            </h2>
            <p className="text-gray-600 mt-4 text-base sm:text-lg leading-relaxed">
              One managed programme — measure the baseline, prioritise the
              gaps that matter to your roadmap, deliver OEM-certified
              training, track outcomes while they&apos;re still fixable, and
              move people into the roles that need them.
            </p>
          </div>

          {/* w-full md:w-fit: on mobile the stacked panels should fill the
              available width, but a block-level flex container (display:flex,
              not inline-flex) always stretches to its parent's width by
              default regardless of whether its flex ITEMS grow — that left a
              blank strip of the card's dark background past the fifth panel
              on desktop, where the panels themselves only summed to ~70rem. */}
          <div className="flex flex-col md:flex-row w-full md:w-fit rounded-2xl overflow-hidden bg-neutral-950 shadow-xl">
          {STAGES.map((stage, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={stage.number}
                type="button"
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                aria-expanded={isActive}
                aria-label={`Stage ${stage.number}: ${stage.title}`}
                className={`relative flex-none text-left overflow-hidden border-b md:border-b-0 md:border-r border-white/10 last:border-none w-full transition-[width,height] duration-[450ms] ease-in-out ${
                  isActive
                    ? "h-[26rem] md:h-[28.75rem] md:w-[30rem] bg-neutral-900"
                    : "h-20 md:h-[28.75rem] md:w-[10rem] bg-neutral-950 hover:bg-neutral-900/60"
                }`}
              >
                {!isActive && (
                  <>
                    {/* Same photo as the expanded panel, dimmed, instead of
                        flat black. Dimming comes entirely from the overlay
                        below (bg-black/70), not a CSS filter on the image
                        itself — a `filter` forces the browser to
                        re-rasterize the whole bitmap on every repaint, which
                        was adding real jank here since all 5 of these are
                        animating (width/height transition) at once on every
                        hover switch. A plain overlay is compositor-cheap by
                        comparison. */}
                    <Image
                      src={stage.image ?? FALLBACK_IMAGE}
                      alt=""
                      aria-hidden="true"
                      fill
                      sizes="10rem"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/70" />

                    {/* Desktop collapsed: rotated label through the middle,
                        a small stage marker at the bottom. */}
                    <div className="hidden md:flex absolute inset-0 flex-col items-center justify-between py-8">
                      <span
                        className="uppercase text-[11px] tracking-[0.2em] text-gray-400 whitespace-nowrap"
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                        }}
                      >
                        {stage.shortLabel}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.15em] text-gray-500">
                        Stage&nbsp;·&nbsp;{stage.number}
                      </span>
                    </div>

                    {/* Mobile collapsed: plain horizontal bar. */}
                    <div className="flex md:hidden items-center justify-between h-full px-5">
                      <span className="uppercase text-xs tracking-widest text-gray-300">
                        {stage.shortLabel}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-gray-500 flex-shrink-0 ml-3">
                        Stage&nbsp;·&nbsp;{stage.number}
                      </span>
                    </div>
                  </>
                )}

                {isActive && (
                  <div className="relative h-full">
                    {/* Real photo for every stage now — stages without
                        their own yet reuse FALLBACK_IMAGE instead of the old
                        placeholder box, so the panel is never blank. Swap
                        `image` in per stage as its own photo arrives; the
                        image prop already matches (1648x1648, 1:1), so
                        object-cover barely trims anything. */}
                    <Image
                      src={stage.image ?? FALLBACK_IMAGE}
                      alt={stage.title}
                      fill
                      sizes="(min-width: 768px) 30rem, 100vw"
                      className="object-cover"
                      priority={index === 0}
                    />

                    {/* Decorative corner mark, matching the reference. */}
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-white text-sm">↗</span>
                    </div>

                    {/* Bottom scrim + overlaid copy, same treatment as the
                        other photo cards on this site (B2G hero, college
                        partner strip). This block only exists in the DOM
                        while isActive is true, so it mounts fresh every time
                        a panel is selected — the swipe-up + blur-to-focus
                        animation replays on its own each time, no JS needed
                        to reset it. */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                    <div
                      className="absolute bottom-0 left-0 right-0 p-6"
                      style={{
                        animation:
                          "revealUpBlur 1400ms cubic-bezier(0.16,1,0.3,1) both",
                      }}
                    >
                      <span className="text-[11px] uppercase tracking-[0.15em] text-gray-300">
                        Stage {stage.roman}
                      </span>
                      <h4 className="text-white font-bold text-xl mt-1.5 leading-snug">
                        {stage.title}
                      </h4>
                      <p className="text-gray-300 text-sm mt-2 leading-snug">
                        {stage.description}
                      </p>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessAccordion;
