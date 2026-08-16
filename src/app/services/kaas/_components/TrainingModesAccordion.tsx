"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

// How long each tab stays active before auto-advancing to the next —
// mirrors the TaaS capability strip's own CYCLE_MS, and reuses that same
// component's capabilityProgress keyframe (defined once in globals.css) for
// the underline fill, rather than redefining an equivalent animation here.
const CYCLE_MS = 6000;

// Three previously-separate sections, merged into one: three tab cards up
// top (click to switch, blue underline marks the active one — same active-
// indicator language as the TaaS capability strip), and below them a single
// "journey" panel for whichever tab is active, reusing the exact layout the
// AWS re/Start page already uses for its own step list (badge, heading, ring-
// marker steps on the left, a tall image on the right). Each group's
// `media` is a placeholder until a real image/video is supplied — swapping
// one in later is a one-line change per group, no structural edits needed.
const GROUPS = [
  {
    tabLabel: "Training Methods",
    badge: "TRAINING METHODS",
    heading: "Which Training Method Should Be Used?",
    subtitle:
      "We offer diverse training methodologies tailored to your organization's specific needs and learning objectives",
    image: undefined as string | undefined,
    media: "/Kaas/Training Methods.mp4" as string | undefined,
    steps: [
      {
        title: "Instructor-Led Training",
        desc: "Allows real-time interaction and immediate feedback.",
      },
      {
        title: "E-Learning",
        desc: "Offers flexibility and self-paced learning.",
      },
      {
        title: "Blended Learning",
        desc: "Combines traditional and online methods for comprehensive learning.",
      },
      {
        title: "On-the-Job Training",
        desc: "Effective for practical skills development in the workplace.",
      },
      {
        title: "Simulation-Based Training",
        desc: "Replicates real-world scenarios for hands-on experience.",
      },
    ],
  },
  {
    tabLabel: "Lifecycle Management",
    badge: "LIFECYCLE MANAGEMENT",
    heading: "Training Lifecycle Management",
    subtitle:
      "From initial candidate to employable professional - our comprehensive transformation process",
    image: undefined as string | undefined,
    media: "/Kaas/Ai 8.webm" as string | undefined,
    steps: [
      {
        title: "Initial Candidate",
        desc: "Lacking specific industry skills.",
      },
      {
        title: "Personalized Assessments",
        desc: "Identify strengths and weaknesses.",
      },
      {
        title: "Structured LMS Learning",
        desc: "Guided educational path with job-aligned modules.",
      },
      {
        title: "Expert-Led Sessions",
        desc: "Interactive, collaborative environment with hands-on projects.",
      },
      {
        title: "Employable Candidate",
        desc: "Industry-ready with job placement support.",
      },
    ],
  },
  {
    tabLabel: "AI Assessment",
    badge: "AI ASSESSMENT",
    heading: "Enhanced AI Assessment Platform",
    subtitle:
      "Cutting-edge assessment technology that ensures accurate skill evaluation and secure testing environment",
    image: undefined as string | undefined,
    media: "/Kaas/Ai Cube.webm" as string | undefined,
    steps: [
      {
        title: "Real-Time Analytics",
        desc: "Provides immediate performance insights.",
      },
      {
        title: "Flexible Assessment Formats",
        desc: "Supports various question types and tasks.",
      },
      {
        title: "Role-Based Skill Mapping",
        desc: "Aligns assessments with specific job roles.",
      },
      {
        title: "AI-Enabled Proctoring",
        desc: "Ensures fair and secure testing.",
      },
      {
        title: "Customizable Test Templates",
        desc: "Allows for reusable and branded tests.",
      },
    ],
  },
];

// Placeholder used by both the small tab-card preview and the large journey
// image until a real photo/video is supplied for that group.
const MediaPlaceholder = ({ compact }: { compact?: boolean }) => (
  <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
    <div className="flex flex-col items-center gap-2 text-gray-500">
      <div
        className={`rounded-full bg-white/10 flex items-center justify-center ${
          compact ? "w-8 h-8" : "w-12 h-12"
        }`}
      >
        <Play className={compact ? "w-3.5 h-3.5 ml-0.5" : "w-5 h-5 ml-0.5"} />
      </div>
      {!compact && (
        <span className="text-xs uppercase tracking-wide">video</span>
      )}
    </div>
  </div>
);

const TrainingModesAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  // Bumped on every switch and used as the underline's key, so React
  // discards the half-filled bar and mounts a fresh one at 0% — same
  // mechanism as the capability strip's own progress bar.
  const [cycle, setCycle] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advanceTo = useCallback((index: number) => {
    setActiveIndex(index);
    setCycle((c) => c + 1);
  }, []);

  // Auto-advance. Re-created whenever `cycle` changes, which is what
  // restarts the countdown after a manual click instead of firing on the
  // old schedule.
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % GROUPS.length);
      setCycle((c) => c + 1);
    }, CYCLE_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [cycle]);

  const active = GROUPS[activeIndex];

  return (
    <section className="py-14 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div className="text-center mb-16" {...fadeInUp}>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How We Train, Develop and Assess Talent
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            One programme, three connected stages — pick a stage to see how it
            works
          </p>
        </motion.div>

        {/* Tab cards — same flat-card language as the TaaS capability strip:
            label overlaid on the image itself (not in a separate strip
            below), rounded-md rather than a heavily-rounded boxed card,
            aspect-video rather than 4:3. The loading-style underline still
            sits below the card, filling over CYCLE_MS and auto-advancing to
            the next group. */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10">
          {GROUPS.map((group, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={group.tabLabel}
                type="button"
                onClick={() => advanceTo(index)}
                aria-pressed={isActive}
                className="text-left"
              >
                <div
                  className={`relative w-full aspect-video rounded-md overflow-hidden flex items-end transition-transform duration-300 ${
                    isActive ? "ring-2 ring-blue-600" : "ring-1 ring-gray-200"
                  }`}
                >
                  {/* image wins over media (video) once one's supplied — a
                      static photo replaces the playing clip for that group
                      without needing the video reference removed. */}
                  {group.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={group.image}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : group.media ? (
                    <video
                      src={group.media}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <MediaPlaceholder compact />
                  )}

                  {/* Very light scrim — the label leans on its own text
                      shadow so the footage stays visible, same as the
                      capability strip. */}
                  <div className="absolute inset-0 bg-black/10" />
                  <span
                    className="relative w-full px-3 py-2.5 text-white font-semibold text-sm leading-tight"
                    style={{ textShadow: "0 1px 6px rgba(0,0,0,0.85)" }}
                  >
                    {group.tabLabel}
                  </span>
                </div>

                {/* Underline — gray track always; while active, a blue fill
                    grows across it over CYCLE_MS (capabilityProgress, same
                    keyframe the TaaS strip uses, defined once in
                    globals.css). Keyed by cycle so switching tabs — by
                    click or auto-advance — discards the old bar and starts
                    a fresh one at 0% instead of resuming mid-fill. */}
                <div className="mt-2 h-[3px] rounded-full bg-gray-200 overflow-hidden">
                  {isActive && (
                    <div
                      key={cycle}
                      className="h-full bg-blue-600"
                      style={{
                        animation: `capabilityProgress ${CYCLE_MS}ms linear forwards`,
                      }}
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Journey panel for the active group — same structure as the AWS
            re/Start page's own step list (badge, heading, ring-marker steps
            on the left, tall image on the right), so switching tabs here
            reads as the same interaction language used elsewhere on the
            site. Key on tabLabel remounts the block on every switch, which
            is what makes the fade/slide-up entrance replay each time. */}
        <motion.div
          key={active.tabLabel}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-gray-100 rounded-2xl p-5 sm:p-8 md:p-10"
        >
          <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-900" />
            <span className="text-gray-900 text-[13px] font-semibold tracking-wide">
              {active.badge}
            </span>
          </div>

          <h3 className="text-gray-900 text-2xl md:text-3xl font-bold mb-2">
            {active.heading}
          </h3>
          <p className="text-gray-600 text-base leading-relaxed mb-6 max-w-2xl">
            {active.subtitle}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:items-stretch">
            <div className="relative pl-12">
              <div className="absolute left-[13px] top-4 bottom-10 w-px bg-gray-300" />

              {active.steps.map((step) => (
                <div key={step.title} className="relative mb-7 last:mb-0">
                  {/* concentric ring marker */}
                  <div className="absolute -left-12 top-0.5 w-[26px] h-[26px] rounded-full bg-[#0d1b1e] flex items-center justify-center shadow-[0_0_0_1px_rgba(255,255,255,0.35)_inset,0_2px_8px_rgba(13,27,30,0.35)]">
                    <div className="w-[19px] h-[19px] rounded-full border border-white/40 flex items-center justify-center">
                      <div className="w-[9px] h-[9px] rounded-full bg-white" />
                    </div>
                  </div>
                  <div className="text-gray-900 text-lg font-semibold mb-1">
                    {step.title}
                  </div>
                  <div className="text-gray-600 text-base leading-relaxed">
                    {step.desc}
                  </div>
                </div>
              ))}
            </div>

            <div className="relative w-full h-[260px] sm:h-[380px] md:h-full md:min-h-[440px] md:-mt-[68px] rounded-xl overflow-hidden">
              {active.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={active.image}
                  alt={active.heading}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : active.media ? (
                // Paused, not autoplay/loop — reads as a still photo rather
                // than a playing clip, unlike the tab cards above (which do
                // keep playing). onLoadedData seeks 0.5s in once the frame
                // is decoded: a <video> with no autoplay renders nothing
                // (a blank/black box) until it has a frame to show, so
                // without this it wouldn't look like a photo, it would look
                // like an empty box.
                <video
                  key={active.tabLabel}
                  src={active.media}
                  muted
                  playsInline
                  preload="auto"
                  onLoadedData={(e) => {
                    const v = e.currentTarget;
                    v.currentTime = 0.5;
                    v.pause();
                  }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <MediaPlaceholder />
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrainingModesAccordion;
