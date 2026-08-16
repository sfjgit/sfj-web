/* eslint-disable @next/next/no-img-element */
"use client";
// app/corporate-training/CorporateTrainingClient.tsx

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Scroller from "./Scroller";
import ProcessAccordion from "./ProcessAccordion";
import TrainingModesAccordion from "./TrainingModesAccordion";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Counts 0 -> target once the row scrolls into view, then holds. A single
// observer on the row (passed in as `rowRef`) starts every number in it
// together rather than each firing its own observer independently.
const AnimatedStatNumber = ({
  target,
  suffix,
  start,
}: {
  target: number;
  suffix: string;
  start: boolean;
}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    const duration = 1400;
    const startTime = performance.now();
    let frame: number;
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      // Ease-out: fast climb, gentle settle on the final number.
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [start, target]);

  return (
    <span>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
};

const heroCards = [
  {
    era: "1990s–2010",
    title: "Rule-Based Systems & Early ML",
    body: "Expert systems and statistical models powered early fraud detection, search, and recommendations. Intelligence was narrow and hand-engineered — every rule written by humans, setting the stage for machine learning's rise.",
    tags: ["RULES", "EARLY ML"],
    stat: "27.3",
  },
  {
    era: "2010–2015",
    title: "Deep Learning Breakthrough",
    body: "Deep neural networks moved AI from labs into products. Breakthroughs in image recognition and speech processing proved data plus compute could outperform hand-coded rules, laying the foundation for modern AI.",
    tags: ["NEURAL", "VISION"],
    stat: "31.8",
  },
  {
    era: "2015–2018",
    title: "Transformers & Attention",
    body: "Transformer architecture and attention mechanisms redefined language understanding. Processing entire sequences in parallel unlocked translation, summarization, and comprehension — becoming the blueprint for every modern AI system that followed.",
    tags: ["NLP", "ATTENTION"],
    stat: "44.1",
  },
  {
    era: "2018–2021",
    title: "Large Language Models",
    body: "Scaling transformers with massive datasets produced models that write, reason, and answer with human-like fluency. Enterprises began adopting AI for content, code, and customer engagement at scale.",
    tags: ["LLM", "SCALE"],
    stat: "58.6",
  },
  {
    era: "2021–2023",
    title: "Generative AI at Scale",
    body: "Generative AI went mainstream — text, images, and code created on demand. Millions adopted AI assistants, and businesses raced to embed generative capabilities into products, workflows, and everyday operations.",
    tags: ["GEN AI", "MULTIMODAL"],
    stat: "72.4",
  },
  {
    era: "2023–2026",
    title: "Agentic & Autonomous AI",
    body: "AI evolved from answering questions to completing work. Autonomous agents plan, reason, and execute multi-step tasks — driving urgent demand for professionals who can build and govern intelligent systems.",
    tags: ["AGENTS", "AUTONOMY"],
    stat: "89.5",
  },
];

const heroGridCards = [
  {
    era: "Upskilling",
    title: "Role-Based Learning Paths",
    body: "Structured learning paths mapped to specific job roles deepen expertise where it matters. Hands-on labs and expert-led sessions ensure every professional advances with skills aligned to business outcomes.",
    tags: ["PATHS"],
    stat: "12.4",
  },
  {
    era: "Cross-Skilling",
    title: "Adjacent Capability Builds",
    body: "Cross-skilling builds capabilities adjacent to core roles — developers learning cloud, engineers adopting ML. Versatile teams collaborate across functions and adapt quickly as technology and priorities evolve.",
    tags: ["BREADTH"],
    stat: "18.9",
  },
  {
    era: "Reskilling",
    title: "Redeployment Programs",
    body: "Reskilling moves talent from declining roles into high-demand functions. Training, projects, and mentorship redeploy employees into AI, cloud, and data roles — retaining knowledge while reducing hiring costs.",
    tags: ["REDEPLOY"],
    stat: "24.7",
  },
  {
    era: "Certification",
    title: "OEM-Certified Outcomes",
    body: "Programs culminate in industry-recognized OEM certifications validating real capability. Certified outcomes give enterprises measurable proof of workforce readiness and skills that accelerate delivery from day one.",
    tags: ["CERTIFIED"],
    stat: "36.2",
  },
];

// Background clip per staircase card, by position. Leave a slot undefined and
// that card falls back to the still image.
const heroCardVideos: (string | undefined)[] = [
  "/Kaas/Ai Cube.webm",
  "/Kaas/Ai 2.webm",
  "/Kaas/Ai 3.webm",
  "/Kaas/Ai 4.webm",
  "/Kaas/Ai 5.webm",
  "/Kaas/Ai 6.webm",
  "/Kaas/Ai9.webm",
];

// Background clip per "What's Next" card, by position.
const heroGridVideos: (string | undefined)[] = [
  "/Kaas/Ai 7.webm",
  "/Kaas/Ai 8.webm",
  "/Kaas/Ai9.webm",
  "/Kaas/Ai 10.webm",
];

type HeroCardData = (typeof heroCards)[number];

// `stacked` cards sit in a normal responsive grid, so they take fixed type
// sizes; the staircase cards are sized as a % of the viewport, so theirs has
// to scale with vw or it overflows on smaller screens.
const HeroCard = ({
  card,
  video,
  stacked,
}: {
  card: HeroCardData;
  video?: string;
  stacked?: boolean;
}) => (
  <div className="relative h-full w-full overflow-hidden rounded-md bg-[#041F26] ring-1 ring-white/10 shadow-lg">
    {/* Media wash behind the copy — a looping clip when one is supplied,
        otherwise the still used on the rest of the cards. */}
    {video ? (
      <video
        src={video}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />
    ) : (
      <div
        className="absolute inset-0 opacity-30 bg-cover bg-center"
        style={{ backgroundImage: "url('/Kaashero1.webp')" }}
      />
    )}
    <div className="absolute inset-0 bg-gradient-to-r from-[#041F26]/75 via-[#041F26]/45 to-transparent" />
    {/* Light black scrim on the top layer so the copy stays legible */}
    <div className="absolute inset-0 bg-black/5" />

    {/* Type scales with the viewport because the cards themselves are sized
        as a percentage of it — fixed rem sizes overflowed on smaller laptops. */}
    <div className="relative h-full flex flex-col justify-center p-[7%] text-white overflow-hidden">
      {/* Title */}
      <h2
        className="leading-tight font-bold text-white"
        style={{
          // Staircase type is pure vw so the whole composition scales in exact
          // proportion to the 1920 reference at any window width.
          fontSize: stacked ? "clamp(0.7rem, 1.4vw, 0.95rem)" : "0.85cqw",
        }}
      >
        {card.era}
      </h2>
      {/* Subtitle */}
      <h3
        className="mt-[3%] leading-tight font-semibold"
        style={{
          fontSize: stacked ? "clamp(0.62rem, 1.1vw, 0.8rem)" : "0.68cqw",
        }}
      >
        {card.title}
      </h3>
      <div
        className="mt-auto flex gap-[4%] pt-[4%] uppercase tracking-wider text-white/50"
        style={{
          fontSize: stacked ? "clamp(0.4rem, 0.7vw, 0.5rem)" : "0.36cqw",
        }}
      >
        {card.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </div>
  </div>
);

export default function CorporateTrainingClient() {
  // Drives the count-up on the four stat numbers below — a single observer
  // on the row starts every number together once it scrolls into view.
  const statsRowRef = useRef<HTMLDivElement>(null);
  const [statsStarted, setStatsStarted] = useState(false);

  useEffect(() => {
    const node = statsRowRef.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStatsStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      {/* --- Hero: phones get the stacked layout; every size from 640px up
              gets the desktop composition, scaled proportionally --- */}
      <section
        className="sm:hidden pt-24 pb-12 px-5"
        style={{
          backgroundImage: "linear-gradient(to bottom, #041F26, #DFE2E8)",
        }}
      >
        {/* Capped width so the cards stay card-sized on tablets and scaled
            laptops instead of stretching to fill the viewport. */}
        <div className="mx-auto max-w-5xl">
          <div className="text-center text-black">
            <div className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-white">
              AI Technology Milestone
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              EVOLUTION
            </h2>
            <h2 className="mt-2 text-sm sm:text-base font-semibold text-white/80">
              What is the future of AI?
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {heroCards.map((card, i) => (
              <div key={card.era} className="aspect-[16/9]">
                <HeroCard card={card} video={heroCardVideos[i]} stacked />
              </div>
            ))}
          </div>

          <div className="mt-14">
            <div className="text-sm sm:text-base font-extrabold uppercase text-black">
              What Next ?..
            </div>
            <h2 className="mt-1 max-w-2xl text-sm sm:text-base font-semibold leading-relaxed text-black">
              Every era demanded new skills, This one demands them faster
            </h2>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {heroGridCards.map((card, i) => (
                <div key={card.era} className="aspect-video">
                  <HeroCard card={card} video={heroGridVideos[i]} stacked />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* From 640px up the layout never reflows — the 1920x950 composition is
          rendered at whatever scale fits. Below lg the canvas is a normal block
          whose height comes from its aspect ratio, so the section is exactly as
          tall as the artwork (no letterbox whitespace on a tablet). From lg up
          it letterboxes inside the tall viewport hero as before. */}
      <section
        className="hidden sm:flex overflow-hidden pt-10 flex-col lg:h-[88dvh] lg:max-h-[56.25rem]"
        style={{
          backgroundImage: "linear-gradient(to right, #041F26, #DFE2E8)",
        }}
      >
        <div className="relative flex-1 flex items-end min-h-0 w-full">
          {/* Content slots. Six 4:3 cards climbing left-to-right, plus a 2x2
              block of 16:9 cards in the bottom-right corner.

              Everything inside is positioned as a % of this canvas, and the
              canvas is a size container, so type measured in `cqw` scales with
              it. The canvas holds the 1920x950 reference ratio and shrinks to
              fit whichever axis runs out first — so a short window (e.g.
              1915x785) gets the same composition, just smaller, instead of
              cards spilling past the fold. */}
          <div
            className="relative w-full lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 pointer-events-none"
            style={{
              aspectRatio: "1920 / 950",
              maxWidth: "100%",
              maxHeight: "100%",
              containerType: "size",
            }}
          >
            {/* Artwork lives inside the canvas so it scales with the rest of
                the composition rather than with the raw viewport height. */}
            <img
              src="/Kaashero1.webp"
              alt="Knowledge-as-a-Service training"
              className="absolute left-0 bottom-0 h-full w-auto max-w-full object-contain object-left-bottom -translate-x-[5%]"
            />

            {/* Section title above the staircase */}
            <div className="absolute left-[42%] top-[13%] inline-flex flex-col items-center text-center text-[#041F26]">
              <div
                className="font-bold uppercase tracking-[0.25em] text-black"
                style={{ fontSize: "0.95cqw" }}
              >
                AI Technology Milestone
              </div>
              <h2
                className="mt-2 font-extrabold tracking-tight text-black"
                style={{ fontSize: "3.2cqw" }}
              >
                EVOLUTION
              </h2>
            </div>
            {/* Eyebrow + heading above the 2x2 block, centred over its width */}
            <div className="absolute left-[72.5%] top-[50%] w-[24%] flex flex-col items-start text-left text-black">
              <div
                className="font-extrabold uppercase tracking-normal"
                style={{ fontSize: "1cqw" }}
              >
                What Next ?..
              </div>
              <h2
                className="mt-2 font-semibold leading-normal"
                style={{ fontSize: "0.95cqw" }}
              >
                Every era demanded new skills, This one demands them faster
              </h2>
            </div>

            {heroCards.map((card, i) => (
              <div
                key={card.era}
                className="absolute w-[10.75%] aspect-[4/3]"
                style={{
                  left: `${27.25 + i * 10.75}%`,
                  top: `${61.2 - i * 8.5}%`,
                }}
              >
                <HeroCard card={card} video={heroCardVideos[i]} />
              </div>
            ))}

            <div className="absolute left-[72.5%] top-[62%] w-[24%] grid grid-cols-2 gap-1">
              {heroGridCards.map((card, i) => (
                <div key={card.era} className="aspect-video">
                  <HeroCard card={card} video={heroGridVideos[i]} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Client logos — their own band directly under the hero, like the
          partner strip on the home page. */}
      <div className="bg-white border-b border-gray-200">
        <Scroller />
      </div>

      {/* Training Mandate Section */}
      {/* Training Mandate Section - Enhanced */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <motion.div
            className="max-w-[96rem] mx-auto"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* Stats section, restyled to the reference: a portrait image
                card on the left (placeholder — swap the src once the real
                photo is supplied) and plain, unboxed stat typography on the
                right instead of the old bordered/shadowed white tiles, with
                a thin rule underneath separating it from the heading below. */}
            {/* items-stretch (the grid default) rather than items-start: the
                right column now matches the image's full height, and the
                flex column inside it spreads the title+info block and the
                stats+divider block across that height with justify-between,
                so the pair covers the image top-to-bottom instead of
                stacking at the top with a gap left below. */}
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-[22rem_1fr] gap-10 lg:gap-16 items-stretch pb-10 border-b border-gray-200"
              variants={fadeInUp}
            >
              <div className="relative w-full max-w-md mx-auto lg:mx-0 aspect-[4/5] rounded-2xl overflow-hidden">
                <img
                  src="/Kaas/Stats Kaas.png"
                  alt="Enterprise team collaborating on a corporate training program"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-white font-bold text-lg leading-snug">
                    500+ enterprise clients served
                  </div>
                  <div className="text-gray-300 text-sm mt-1">
                    Including Accenture, TCS, Wipro, SAP and Siemens
                  </div>
                </div>
              </div>

              {/* h-full + flex column + justify-between: spreads the title
                  block and the stats block apart to fill this column's full
                  height (now equal to the image's, via items-stretch above)
                  instead of both sitting bunched at the top. */}
              <div className="h-full flex flex-col justify-between">
                {/* Title + copy above the stats. */}
                <div className="max-w-5xl text-left">
                  <h3 className="text-4xl sm:text-5xl font-semibold text-gray-900">
                    Every era demanded new skills. This one demands them faster.
                  </h3>
                  <p className="text-gray-600 mt-3 text-base sm:text-lg leading-relaxed">
                    We upskill, cross-skill and reskill working professionals
                    across cloud, data, AI, security and enterprise applications
                    — with OEM-certified outcomes and delivery that fits how
                    your teams actually work. From skills assessment to
                    redeployment, run as one managed programme.
                  </p>
                </div>

                {/* Plain stat typography — large bold number, small grey
                    label underneath, no card, no icon, no border. Each
                    number counts up from 0 once the row scrolls into view
                    (statsRowRef + statsStarted, set up above in the
                    component body). */}
                <div
                  ref={statsRowRef}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-x-10 sm:gap-x-12 gap-y-10"
                >
                  {[
                    {
                      target: 35,
                      suffix: "K",
                      label: "Professionals trained",
                    },
                    {
                      target: 45,
                      suffix: "+",
                      label: "Technologies taught across 8 domains",
                    },
                    {
                      target: 95,
                      suffix: "%",
                      label: "Certification pass rate on OEM programmes",
                    },
                    {
                      target: 300,
                      suffix: "K+",
                      label: "Careers advanced since inception",
                    },
                  ].map((stat, index) => (
                    <div key={index}>
                      <div className="text-4xl sm:text-5xl font-semibold text-gray-900 leading-none">
                        <AnimatedStatNumber
                          target={stat.target}
                          suffix={stat.suffix}
                          start={statsStarted}
                        />
                      </div>
                      <div className="text-gray-500 mt-3 leading-snug">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Badge + heading + 5-card grid used to render here — replaced by the
          horizontal accordion, which owns its own dark section. */}
      <ProcessAccordion />

      {/* Journey Section */}
      {/* <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Journey to Global Talent Empowerment
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Over a decade of excellence in transforming careers and
              organizations worldwide
            </p>
          </motion.div>

          <motion.div
            className="max-w-7xl mx-auto"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  year: "2011",
                  title: "Founding",
                  description: "Established a strong foundation in IT training",
                  icon: Building2,
                  color: "blue",
                },
                {
                  year: "2015",
                  title: "Training 3,00,000+",
                  description:
                    "Achieved a significant milestone in training IT professionals",
                  icon: Users,
                  color: "orange",
                },
                {
                  year: "2018",
                  title: "Delivering 640+ Courses",
                  description:
                    "Expanded educational offerings with high-impact courses",
                  icon: BookOpen,
                  color: "yellow",
                },
                {
                  year: "2020",
                  title: "Partnering with Key Organizations",
                  description:
                    "Collaborated with Universities, Skill Mission, NSDC & NASSCOM",
                  icon: Globe,
                  color: "purple",
                },
                {
                  year: "2022",
                  title: "Global Presence",
                  description:
                    "Established offices in multiple countries (SG, UAE, US)",
                  icon: Award,
                  color: "orange",
                },
                {
                  year: "2023",
                  title: "Digital Literacy Programs",
                  description:
                    "Initiated programs to bridge the digital divide in schools",
                  icon: Monitor,
                  color: "blue",
                },
                {
                  year: "2024",
                  title: "CSR Initiatives",
                  description:
                    "Actively engaged in Partners CSR-led digital education initiatives",
                  icon: Star,
                  color: "indigo",
                },
              ].map((milestone, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-6 p-6 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50 hover:shadow-md transition-all duration-300"
                  variants={fadeInUp}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r from-${milestone.color}-500 to-${milestone.color}-600 flex items-center justify-center flex-shrink-0`}
                  >
                    <milestone.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className={`bg-${milestone.color}-500 text-white`}>
                        {milestone.year}
                      </Badge>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {milestone.title}
                      </h3>
                    </div>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section> */}

      {/* Training Methods + Lifecycle Management + AI Assessment Platform —
          merged into one accordion (TrainingModesAccordion): one group open
          at a time, each with its own video slot and card row. */}
      <TrainingModesAccordion />

      {/* The site-wide CTA + footer is rendered by ClientProvider, so this
          page no longer carries its own dark CTA block. */}
    </div>
  );
}
