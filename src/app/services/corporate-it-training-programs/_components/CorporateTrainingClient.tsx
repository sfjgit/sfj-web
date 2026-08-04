/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";
// app/corporate-training/CorporateTrainingClient.tsx

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  TrendingUp,
  Target,
  CheckCircle,
  BookOpen,
  Monitor,
  Globe,
  Building2,
  Lightbulb,
  BarChart3,
  Settings,
  Zap,
  Brain,
  Code,
  Database,
  Cloud,
  Shield,
  Smartphone,
  Building,
} from "lucide-react";
import { motion } from "framer-motion";
import Scroller from "./Scroller";

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
  "/Kaas/Ai Cube.mp4",
  "/Kaas/Ai 2.mp4",
  "/Kaas/Ai 3.mp4",
  "/Kaas/Ai 4.mp4",
  "/Kaas/Ai 5.mp4",
  "/Kaas/Ai 6.mp4",
  "/Kaas/Ai9.mp4",
];

// Background clip per "What's Next" card, by position.
const heroGridVideos: (string | undefined)[] = [
  "/Kaas/Ai 7.mp4",
  "/Kaas/Ai 8.mp4",
  "/Kaas/Ai9.mp4",
  "/Kaas/Ai 10.mp4",
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
            <h1 className="mt-2 text-sm sm:text-base font-semibold text-white/80">
              What is the future of AI?
            </h1>
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
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <pattern
                id="training-grid"
                patternUnits="userSpaceOnUse"
                width="20"
                height="20"
              >
                <circle cx="10" cy="10" r="2" fill="#3B82F6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#training-grid)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div className="text-center mb-20" {...fadeInUp}>
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-6">
              <Target className="mr-2 h-4 w-4" />
              Strategic Training Framework
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Our Corporate Training
              <span className="block text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
                Transformation Journey
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              A systematic approach to people supply chain management that
              transforms your workforce from assessment to deployment through
              data-driven methodologies
            </p>
          </motion.div>

          <motion.div
            className="max-w-7xl mx-auto"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* Process Flow */}
            <div className="relative">
              {/* Connection Lines */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-indigo-300 to-blue-200 hidden lg:block transform -translate-y-1/2 z-0"></div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative z-10">
                {[
                  {
                    step: "01",
                    title: "Assess Workforce Readiness",
                    description:
                      "Comprehensive skill mapping and competency evaluation using AI-driven analytics",
                    icon: BarChart3,
                    gradient: "from-blue-500 to-cyan-500",
                    bgGradient: "from-blue-50 to-cyan-50",
                    features: [
                      "Skills Assessment",
                      "Gap Analysis",
                      "Baseline Metrics",
                    ],
                  },
                  {
                    step: "02",
                    title: "Training Need Analysis",
                    description:
                      "Strategic identification of learning priorities aligned with business objectives",
                    icon: Target,
                    gradient: "from-emerald-500 to-teal-500",
                    bgGradient: "from-emerald-50 to-teal-50",
                    features: [
                      "Business Alignment",
                      "Priority Matrix",
                      "ROI Planning",
                    ],
                  },
                  {
                    step: "03",
                    title: "Curate Training Programs",
                    description:
                      "Design personalized learning pathways with industry-leading methodologies",
                    icon: BookOpen,
                    gradient: "from-yellow-500 to-orange-500",
                    bgGradient: "from-yellow-50 to-orange-50",
                    features: [
                      "Custom Curriculum",
                      "Multi-Modal Learning",
                      "Expert Instructors",
                    ],
                  },
                  {
                    step: "04",
                    title: "Monitor Learning Outcomes",
                    description:
                      "Real-time tracking and analytics through advanced ILT & VLT frameworks",
                    icon: TrendingUp,
                    gradient: "from-purple-500 to-pink-500",
                    bgGradient: "from-purple-50 to-pink-50",
                    features: [
                      "Progress Tracking",
                      "Performance Analytics",
                      "Adaptive Learning",
                    ],
                  },
                  {
                    step: "05",
                    title: "People Supply Chain",
                    description:
                      "Strategic talent deployment and continuous workforce optimization",
                    icon: Users,
                    gradient: "from-indigo-500 to-blue-500",
                    bgGradient: "from-indigo-50 to-blue-50",
                    features: [
                      "Talent Allocation",
                      "Career Pathing",
                      "Succession Planning",
                    ],
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="relative"
                  >
                    {/* Step Number Circle */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-r ${item.gradient} flex items-center justify-center shadow-lg border-4 border-white`}
                      >
                        <span className="text-white font-bold text-sm">
                          {item.step}
                        </span>
                      </div>
                    </div>

                    {/* Main Card */}
                    <div
                      className={`bg-gradient-to-br ${item.bgGradient} rounded-2xl p-6 pt-12 h-full border border-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group`}
                    >
                      {/* Icon */}
                      <div
                        className={`w-16 h-16 mx-auto rounded-xl bg-gradient-to-r ${item.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <item.icon className="h-8 w-8 text-white" />
                      </div>

                      {/* Content */}
                      <div className="text-center space-y-4">
                        <h3 className="text-xl font-bold text-gray-900 leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                          {item.description}
                        </p>

                        {/* Features List */}
                        <div className="space-y-2 pt-4">
                          {item.features.map((feature, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-center space-x-2"
                            >
                              <div
                                className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.gradient}`}
                              ></div>
                              <span className="text-xs font-medium text-gray-700">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Accent */}
                      <div
                        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} rounded-b-2xl`}
                      ></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom Stats */}
            <motion.div
              className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={fadeInUp}
            >
              {[
                { number: "500+", label: "Clients Trained", icon: Building },
                { number: "95%", label: "Success Rate", icon: TrendingUp },
                {
                  number: "50K+",
                  label: "Professionals Upskilled",
                  icon: Users,
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-white rounded-xl shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300"
                >
                  <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 max-w-7xl mx-auto bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Fostering Skilled Talent for an AI-Powered Global Economy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From youth skilling to professional reskilling, we cover the
              entire spectrum of workforce development
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Corporate Training - Upskilling",
                description:
                  "Providing advanced training to working professionals for career growth",
                icon: TrendingUp,
                color: "purple",
              },
              {
                title: "Corporate Training - Cross-Skilling",
                description:
                  "Enabling professionals to acquire skills in diverse fields with global certifications",
                icon: Globe,
                color: "orange",
              },
              {
                title: "Corporate Training - Reskilling",
                description:
                  "Helping professionals adapt to new roles and technologies with global certifications",
                icon: Lightbulb,
                color: "blue",
              },
            ].map((service, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

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

      {/* Collaborative Curriculum Development */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Collaborative Curriculum Development
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Working with industry leaders, academic institutions, and aspiring
              learners to create comprehensive learning experiences
            </p>
          </motion.div>

          <motion.div
            className=" max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Aspirational Learners",
                description:
                  "Students and jobseekers gaining future-ready skills",
                icon: Users,
                color: "from-blue-500 to-blue-600",
              },
              {
                title: "Academic Institutions",
                description:
                  "Educational entities providing micro-credentials and infrastructure",
                icon: Building2,
                color: "from-emerald-500 to-emerald-600",
              },
              {
                title: "IT Organizations",
                description:
                  "Tech companies offering infrastructure and mentoring",
                icon: Code,
                color: "from-purple-500 to-purple-600",
              },
              {
                title: "Industry Partners",
                description:
                  "Businesses sharing knowledge and offering opportunities",
                icon: Globe,
                color: "from-orange-500 to-orange-600",
              },
            ].map((stakeholder, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-xl transition-all duration-300">
                  <CardHeader className="text-center">
                    <div
                      className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${stakeholder.color} flex items-center justify-center mb-4`}
                    >
                      <stakeholder.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      {stakeholder.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-gray-600">
                      {stakeholder.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Training Methods Section */}
      <section className="py-20 bg-white max-w-7xl mx-auto">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Which Training Method Should Be Used?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer diverse training methodologies tailored to your
              organization&#39;s specific needs and learning objectives
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Instructor-Led Training",
                description:
                  "Allows real-time interaction and immediate feedback",
                icon: Users,
                color: "blue",
              },
              {
                title: "E-Learning",
                description: "Offers flexibility and self-paced learning",
                icon: Monitor,
                color: "emerald",
              },
              {
                title: "Blended Learning",
                description:
                  "Combines traditional and online methods for comprehensive learning",
                icon: Settings,
                color: "orange",
              },
              {
                title: "On-the-Job Training",
                description:
                  "Effective for practical skills development in the workplace",
                icon: Building2,
                color: "purple",
              },
              {
                title: "Simulation-Based Training",
                description:
                  "Replicates real-world scenarios for hands-on experience",
                icon: Zap,
                color: "pink",
              },
            ].map((method, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`w-12 h-12 rounded-xl bg-${method.color}-100 flex items-center justify-center`}
                      >
                        <method.icon
                          className={`h-6 w-6 text-${method.color}-600`}
                        />
                      </div>
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      {method.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {method.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Training Lifecycle Management */}
      <section className="py-20 bg-gradient-to-br max-w-7xl mx-auto from-slate-50 to-blue-50">
        <div className="container mx-auto ">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Training Lifecycle Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From initial candidate to employable professional - our
              comprehensive transformation process
            </p>
          </motion.div>

          <motion.div
            className="max-w-7xl mx-auto"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {[
                {
                  stage: "Initial Candidate",
                  description: "Lacking specific industry skills",
                  icon: Users,
                  color: "red",
                },
                {
                  stage: "Personalized Assessments",
                  description: "Identify strengths and weaknesses",
                  icon: BarChart3,
                  color: "orange",
                },
                {
                  stage: "Structured LMS Learning",
                  description:
                    "Guided educational path with job-aligned modules",
                  icon: BookOpen,
                  color: "yellow",
                },
                {
                  stage: "Expert-Led Sessions",
                  description:
                    "Interactive, collaborative environment with hands-on projects",
                  icon: Brain,
                  color: "blue",
                },
                {
                  stage: "Employable Candidate",
                  description: "Industry-ready with job placement support",
                  icon: CheckCircle,
                  color: "emerald",
                },
              ].map((stage, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="h-full text-center hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div
                        className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-${stage.color}-500 to-${stage.color}-600 flex items-center justify-center mb-4`}
                      >
                        <stage.icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {stage.stage}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600">
                        {stage.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Assessment Platform */}
      <section className="py-20 bg-white max-w-7xl mx-auto">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Enhanced AI Assessment Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cutting-edge assessment technology that ensures accurate skill
              evaluation and secure testing environment
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Real-Time Analytics",
                description: "Provides immediate performance insights",
                icon: BarChart3,
                color: "blue",
              },
              {
                title: "Flexible Assessment Formats",
                description: "Supports various question types and tasks",
                icon: Settings,
                color: "emerald",
              },
              {
                title: "Role-Based Skill Mapping",
                description: "Aligns assessments with specific job roles",
                icon: Target,
                color: "purple",
              },
              {
                title: "AI-Enabled Proctoring",
                description: "Ensures fair and secure testing",
                icon: Shield,
                color: "orange",
              },
              {
                title: "Customizable Test Templates",
                description: "Allows for reusable and branded tests",
                icon: Database,
                color: "pink",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`w-12 h-12 rounded-xl bg-${feature.color}-100 flex items-center justify-center`}
                      >
                        <feature.icon
                          className={`h-6 w-6 text-${feature.color}-600`}
                        />
                      </div>
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Training Programs Statistics */}
      <section className="py-20 bg-gradient-to-br  mx-auto from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h2 className="text-4xl font-bold mb-4">
              Training Programs by Professional Impact
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              35,000+ learners trained across diverse technology domains in 2024
            </p>
          </motion.div>

          <motion.div
            className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                domain: "Programming & Mobile Development",
                count: "8,000",
                icon: Code,
                color: "from-pink-400 to-pink-600",
              },
              {
                domain: "Generative AI & ML",
                count: "6,000",
                icon: Brain,
                color: "from-purple-400 to-purple-600",
              },
              {
                domain: "Big Data & Analytics",
                count: "6,000",
                icon: BarChart3,
                color: "from-blue-400 to-blue-600",
              },
              {
                domain: "Cloud Technologies",
                count: "5,000",
                icon: Cloud,
                color: "from-cyan-400 to-cyan-600",
              },
              {
                domain: "ERP Systems",
                count: "5,000",
                icon: Database,
                color: "from-emerald-400 to-emerald-600",
              },
              {
                domain: "Software Testing",
                count: "2,500",
                icon: CheckCircle,
                color: "from-yellow-400 to-yellow-600",
              },
              {
                domain: "Cybersecurity",
                count: "1,000",
                icon: Shield,
                color: "from-red-400 to-red-600",
              },
              {
                domain: "IoT & Embedded",
                count: "200",
                icon: Smartphone,
                color: "from-indigo-400 to-indigo-600",
              },
            ].map((program, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="bg-white/10 border-white/20 text-white hover:bg-white/15 transition-all duration-300">
                  <CardHeader className="text-center">
                    <div
                      className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${program.color} flex items-center justify-center mb-4`}
                    >
                      <program.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-white mb-2">
                      {program.count}
                    </CardTitle>
                    <CardDescription className="text-blue-100">
                      {program.domain}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* The site-wide CTA + footer is rendered by ClientProvider, so this
          page no longer carries its own dark CTA block. */}
    </div>
  );
}
