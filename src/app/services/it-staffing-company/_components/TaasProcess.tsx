/* eslint-disable @next/next/no-img-element */
"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

// Single source of truth for the auto-advance interval — the JS advance
// loop and the CSS progress-line fill both derive their timing from this
// one constant.
const DUR = 5000;
// How long the outgoing image takes to turn away like a book page.
const TURN_MS = 1000;
// How long the caption text takes to fade out / swap / fade back in.
const TEXT_FADE_MS = 380;
// Delay between each tab's one-time entrance reveal, once the section
// first scrolls into view.
const ENTRANCE_STAGGER_MS = 90;

const STEPS = [
  {
    label: "Planning",
    description:
      "We start with the role, the team it sits in and the date you need it filled. You get a sourcing strategy and a timeline before anyone screens a single CV.",
    image: "/taas/process/01-planning.webp",
    alt: "Recruiter and hiring manager discussing a role brief across the table",
  },
  {
    label: "Shortlisting",
    description:
      "We search our bench and our network against your actual requirement, not against a keyword. Only profiles that clear the brief reach your desk.",
    image: "/taas/process/02-shortlisting.webp",
    alt: "Recruiter marking up a shortlist of candidate profiles",
  },
  {
    label: "Assessment",
    description:
      "Technical evaluation, skills validation and background verification — all done by us, before your panel spends an hour on anyone.",
    image: "/taas/process/03-assessment.webp",
    alt: "Professional completing a technical assessment at a dual-monitor workstation",
  },
  {
    label: "Selection",
    description:
      "You interview a short list, not a long one. We coordinate the panels, carry the feedback both ways and close the offer.",
    image: "/taas/process/04-selection.webp",
    alt: "Candidate speaking with an interview panel around a conference table",
  },
  {
    label: "Onboarding",
    description:
      "Contracts, compliance and documentation handled end to end, so your new hire starts on the date you agreed.",
    image: "/taas/process/05-onboarding.webp",
    alt: "New hire wearing an ID badge greeting colleagues in the office",
  },
];

type Turn = { from: number; id: number };

export default function TaasProcess() {
  const reactId = useId();
  const tabId = (i: number) => `${reactId}-taas-tab-${i}`;
  const panelId = `${reactId}-taas-panel`;

  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState(0);
  // The page currently turning away. `from` is the outgoing step, `id`
  // remounts the layer so its animation replays from frame one.
  const [turn, setTurn] = useState<Turn | null>(null);
  const [textFading, setTextFading] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});
  const [hasEntered, setHasEntered] = useState(false);

  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const mountedRef = useRef(false);
  const pausedRef = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);
  // Mirrors activeIndex synchronously so advanceTo always knows which
  // step is leaving, without waiting for a render to commit.
  const activeRef = useRef(0);
  const turnIdRef = useRef(0);

  // Both auto-advance and a manual tab click go through here: record the
  // outgoing page, jump to the new step, and bump `cycle`, which restarts
  // the progress line and the advance timer fresh. Autoplay itself never
  // stops — a manual click just resets the clock on the step you picked.
  const advanceTo = useCallback((index: number) => {
    if (index !== activeRef.current) {
      turnIdRef.current += 1;
      setTurn({ from: activeRef.current, id: turnIdRef.current });
    }
    activeRef.current = index;
    setActiveIndex(index);
    setCycle((c) => c + 1);
  }, []);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const handler = () => setPageHidden(document.visibilityState === "hidden");
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);

  useEffect(() => {
    pausedRef.current = hoverPaused || pageHidden;
  }, [hoverPaused, pageHidden]);

  // One-time entrance reveal: the five tabs stagger in (Step 1 first,
  // then 2, 3, 4, 5) the first time the section scrolls into view. This
  // is separate from — and doesn't gate — the auto-advance loop below.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setHasEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Auto-advance loop. Elapsed time only accumulates while pausedRef is
  // false, so a hover/visibility pause freezes progress in place — on
  // resume it continues from where it left off instead of resetting or
  // jumping ahead. Runs fresh (elapsed = 0) every time `cycle` changes,
  // i.e. every step change, whether auto or manual.
  useEffect(() => {
    if (reducedMotion) return;
    let raf: number;
    let last = performance.now();
    let elapsed = 0;
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      if (!pausedRef.current) {
        elapsed += dt;
        if (elapsed >= DUR) {
          advanceTo((activeRef.current + 1) % STEPS.length);
          return;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cycle, reducedMotion]);

  // Caption text: fades out (old content, same node — no remount yet),
  // then swaps and fades back in. Skipped on first mount, and skipped
  // entirely under reduced motion (instant swap instead).
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    if (reducedMotion) {
      setDisplayIndex(activeIndex);
      return;
    }
    setTextFading(true);
    const t = setTimeout(() => {
      setDisplayIndex(activeIndex);
      setTextFading(false);
    }, TEXT_FADE_MS);
    return () => clearTimeout(t);
  }, [activeIndex, reducedMotion]);

  // Keep the active tab in view when the strip is horizontally scrollable
  // (mobile).
  useEffect(() => {
    tabRefs.current[activeIndex]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeIndex]);

  const handleTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next: number | null = null;
    if (e.key === "ArrowRight") next = (i + 1) % STEPS.length;
    else if (e.key === "ArrowLeft")
      next = (i - 1 + STEPS.length) % STEPS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = STEPS.length - 1;
    else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      advanceTo(focusedIndex);
      return;
    }
    if (next !== null) {
      e.preventDefault();
      setFocusedIndex(next);
      tabRefs.current[next]?.focus();
    }
  };

  const nextIndex = (activeIndex + 1) % STEPS.length;
  const current = STEPS[displayIndex];
  const showAnimatedBar = !reducedMotion;
  // Drives animation-play-state on the progress line, so a hover or
  // tab-visibility pause freezes the line instead of drifting out of
  // sync with the (also paused) advance timer above. The page turn
  // itself is deliberately NOT paused — it lasts 1s, and freezing a
  // half-turned page mid-air looks broken.
  const isPaused = hoverPaused || pageHidden;
  // Render the turning page only when there's a real step change to
  // animate, the outgoing photo actually loaded, and motion is allowed.
  const showTurn = !reducedMotion && turn !== null && !imgError[turn.from];

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 px-4 sm:px-6 lg:px-8"
      style={{ background: "#ffffff" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="taasHeader">
          <div className="taasPill">Our process</div>
          <div>
            <h2 className="taasHeadline">
              Five steps from open role to first day
            </h2>
            <p className="taasSubtitle">
              One account team throughout. The people who take your requirement
              are the same people who close the offer and handle the paperwork.
            </p>
          </div>
        </div>

        {/* Preloads the next step's photo so the turn never reveals an
            unloaded image underneath. */}
        <img
          src={STEPS[nextIndex].image}
          alt=""
          aria-hidden="true"
          className="taasPreload"
          onError={() =>
            setImgError((prev) => ({ ...prev, [nextIndex]: true }))
          }
        />

        <div
          className="taasStage"
          role="tabpanel"
          id={panelId}
          aria-live="polite"
          aria-labelledby={tabId(activeIndex)}
          onMouseEnter={() => setHoverPaused(true)}
          onMouseLeave={() => setHoverPaused(false)}
        >
          {/* The book: perspective lives here so the stage itself can
              keep overflow:hidden and its rounded top corners. */}
          <div className="taasBook" aria-hidden={false}>
            {/* Bottom page — the incoming step. Already in place before
                the turn starts, so it's revealed rather than faded in. */}
            <div className="taasPage taasPageBase">
              {!imgError[activeIndex] ? (
                <img
                  src={STEPS[activeIndex].image}
                  alt={STEPS[activeIndex].alt}
                  className="taasImage"
                />
              ) : (
                <div className="taasImageFallback" />
              )}
              {/* Shadow thrown by the page lifting off it. */}
              {showTurn && (
                <span
                  key={`cast-${turn!.id}`}
                  className="taasCast"
                  aria-hidden="true"
                />
              )}
            </div>

            {/* Top page — the outgoing step, hinged at its left edge and
                swinging right-to-left. Remounts on every turn (key) so
                the animation always replays from the start. */}
            {showTurn && (
              <div
                key={`turn-${turn!.id}`}
                className="taasPage taasPageTurning"
                aria-hidden="true"
              >
                <div className="taasPageFace taasPageFront">
                  <img
                    src={STEPS[turn!.from].image}
                    alt=""
                    className="taasImage"
                  />
                  {/* Light falling off the sheet as it angles away. */}
                  <span className="taasShade" />
                </div>
                {/* The back of the sheet, seen once it passes 90°. */}
                <div className="taasPageFace taasPageBack" />
              </div>
            )}
          </div>

          <div className="taasStageScrim" aria-hidden="true" />

          <div className="taasCaption">
            <div
              className="taasCaptionBody"
              style={{
                opacity: textFading ? 0 : 1,
                transition: reducedMotion
                  ? "none"
                  : `opacity ${TEXT_FADE_MS}ms ease`,
              }}
            >
              <div
                key={displayIndex}
                className={reducedMotion ? "" : "taasTextSlideUp"}
              >
                <div className="taasEyebrowRow">
                  <span className="taasRule" />
                  <span className="taasEyebrow">
                    Step {displayIndex + 1} of {STEPS.length}
                  </span>
                </div>
                <h3 className="taasStepTitle">{current.label}</h3>
                <p className="taasStepDesc">{current.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="taasTabStrip"
          role="tablist"
          aria-label="Staffing process steps"
        >
          {STEPS.map((step, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={step.label}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                id={tabId(i)}
                role="tab"
                type="button"
                aria-selected={isActive}
                aria-controls={panelId}
                tabIndex={focusedIndex === i ? 0 : -1}
                className={hasEntered ? "taasTab taasTabEntered" : "taasTab"}
                style={{
                  transitionDelay: hasEntered
                    ? `${i * ENTRANCE_STAGGER_MS}ms`
                    : "0ms",
                }}
                onFocus={() => setFocusedIndex(i)}
                onKeyDown={(e) => handleTabKeyDown(e, i)}
                onClick={() => {
                  setFocusedIndex(i);
                  advanceTo(i);
                }}
              >
                {isActive && showAnimatedBar && (
                  <span
                    key={cycle}
                    className="taasProgressBar"
                    style={{
                      animationPlayState: isPaused ? "paused" : "running",
                    }}
                  />
                )}
                {isActive && reducedMotion && (
                  <span className="taasProgressBar taasProgressBarFull" />
                )}
                <span className="taasTabStep">Step {i + 1}</span>
                <span
                  className={
                    isActive ? "taasTabName taasTabNameActive" : "taasTabName"
                  }
                >
                  {step.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .taasHeader {
          display: grid;
          grid-template-columns: 150px 1fr;
          gap: 24px;
          margin-bottom: 28px;
        }
        .taasPill {
          align-self: start;
          width: fit-content;
          border: 1px solid rgba(20, 20, 19, 0.18);
          border-radius: 20px;
          padding: 4px 12px;
          font-size: 11px;
          color: rgba(20, 20, 19, 0.7);
          white-space: nowrap;
        }
        .taasHeadline {
          font-size: clamp(22px, 3vw, 40px);
          font-weight: 500;
          letter-spacing: -0.3px;
          line-height: 1.2;
          color: #141413;
          margin: 0 0 10px;
        }
        .taasSubtitle {
          font-size: 13px;
          line-height: 1.7;
          color: rgba(20, 20, 19, 0.6);
          margin: 0;
          max-width: 56ch;
        }

        .taasPreload {
          position: absolute;
          width: 1px;
          height: 1px;
          opacity: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .taasStage {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 12px 12px 0 0;
          overflow: hidden;
          background: #1c1b19;
        }

        /* ---------- the book ---------- */
        .taasBook {
          position: absolute;
          inset: 0;
          perspective: 2000px; /* lower = heavier fold */
          perspective-origin: 38% 50%;
          transform-style: preserve-3d;
        }
        .taasPage {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
          transform-origin: left center; /* the spine */
        }
        .taasPageBase {
          z-index: 1;
        }
        .taasPageTurning {
          z-index: 3;
          will-change: transform, opacity;
          animation: taasPageTurn ${TURN_MS}ms cubic-bezier(0.58, 0.03, 0.36, 1)
            forwards;
        }
        /* Flip the sign (108deg) if you'd rather the page lift toward
           the viewer than away from it. */
        @keyframes taasPageTurn {
          0% {
            transform: rotateY(0deg);
            opacity: 1;
          }
          72% {
            opacity: 1;
          }
          100% {
            transform: rotateY(-108deg);
            opacity: 0;
          }
        }

        .taasPageFace {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          overflow: hidden;
        }
        .taasPageFront {
          isolation: isolate;
        }
        .taasPageBack {
          transform: rotateY(180deg);
          background: linear-gradient(
            100deg,
            #0e0e0d 0%,
            #191817 45%,
            #0b0b0a 100%
          );
        }

        .taasImage {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 35%;
        }
        .taasImageFallback {
          position: absolute;
          inset: 0;
          background: #1c1b19;
        }

        /* Light falling off the turning sheet + a catch on its edge. */
        .taasShade {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          background: linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.72) 0%,
            rgba(0, 0, 0, 0.22) 38%,
            rgba(0, 0, 0, 0) 72%,
            rgba(255, 255, 255, 0.16) 99%
          );
          animation: taasShade ${TURN_MS}ms cubic-bezier(0.58, 0.03, 0.36, 1)
            forwards;
        }
        @keyframes taasShade {
          0% {
            opacity: 0;
          }
          55% {
            opacity: 0.9;
          }
          100% {
            opacity: 1;
          }
        }

        /* Shadow the lifting page casts on the one underneath. */
        .taasCast {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.6) 0%,
            rgba(0, 0, 0, 0.32) 26%,
            rgba(0, 0, 0, 0) 58%
          );
          animation: taasCast ${TURN_MS}ms ease-out forwards;
        }
        @keyframes taasCast {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        .taasStageScrim {
          position: absolute;
          inset: 0;
          z-index: 4;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.75) 0%,
            rgba(0, 0, 0, 0.32) 42%,
            rgba(0, 0, 0, 0) 72%
          );
          pointer-events: none;
        }

        .taasCaption {
          position: absolute;
          left: 0;
          bottom: 0;
          z-index: 5;
          max-width: min(620px, 62%);
          padding: 28px 32px 36px;
        }
        .taasEyebrowRow {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }
        .taasRule {
          display: inline-block;
          width: 32px;
          height: 1px;
          background: rgba(241, 239, 232, 0.5);
        }
        .taasEyebrow {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: rgba(241, 239, 232, 0.6);
        }
        .taasStepTitle {
          font-size: clamp(32px, 5vw, 76px);
          font-weight: 500;
          line-height: 1.05;
          letter-spacing: -0.6px;
          color: #f1efe8;
          margin: 0 0 10px;
        }
        .taasStepDesc {
          font-size: clamp(14px, 1.4vw, 19px);
          line-height: 1.6;
          max-width: 44ch;
          color: rgba(241, 239, 232, 0.75);
          margin: 0;
        }
        .taasTextSlideUp {
          animation: taasTextSlideUp ${TEXT_FADE_MS}ms ease-out both;
        }
        @keyframes taasTextSlideUp {
          from {
            transform: translateY(10px);
          }
          to {
            transform: translateY(0);
          }
        }

        .taasTabStrip {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          background: #141413;
          border-radius: 0 0 12px 12px;
          overflow: hidden;
        }
        .taasTab {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
          padding: 14px 16px;
          background: transparent;
          border: none;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          cursor: pointer;
          text-align: left;
          opacity: 0;
          transform: translateY(10px);
          transition:
            opacity 420ms ease,
            transform 420ms ease;
        }
        .taasTab.taasTabEntered {
          opacity: 1;
          transform: translateY(0);
        }
        .taasTab:last-child {
          border-right: none;
        }
        .taasTab:focus-visible {
          outline: 2px solid #f1efe8;
          outline-offset: -2px;
        }
        .taasTabStep {
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: rgba(255, 255, 255, 0.38);
        }
        .taasTabName {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.45);
        }
        .taasTabNameActive {
          color: #ffffff;
          font-weight: 500;
        }

        /* Same treatment as the hero's CapabilityStrip progress line: blue,
           3px, bottom edge, linear fill — reuses that component's shared
           capabilityProgress keyframe (defined once in globals.css) rather
           than duplicating an equivalent one here. */
        .taasProgressBar {
          position: absolute;
          bottom: 0;
          left: 0;
          z-index: 1;
          height: 3px;
          width: 0%;
          background: #2563eb;
          animation: capabilityProgress ${DUR}ms linear forwards;
        }
        .taasProgressBarFull {
          animation: none;
          width: 100%;
        }

        @media (max-width: 1024px) {
          .taasBook {
            perspective: 1500px;
          }
        }
        @media (max-width: 768px) {
          .taasBook {
            perspective: 1100px;
          }
          .taasHeader {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .taasCaption {
            max-width: 88%;
            padding: 18px 18px 22px;
          }
          .taasTabStrip {
            grid-template-columns: unset;
            grid-auto-flow: column;
            grid-auto-columns: minmax(120px, 1fr);
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scrollbar-width: none;
          }
          .taasTabStrip::-webkit-scrollbar {
            display: none;
          }
          .taasTab {
            scroll-snap-align: start;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .taasPageTurning,
          .taasShade,
          .taasCast {
            animation: none;
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
