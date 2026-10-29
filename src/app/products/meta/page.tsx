"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  Award,
  BadgeCheck,
  BarChart3,
  BatteryFull,
  Bell,
  BellRing,
  BookOpen,
  CalendarCheck,
  Camera,
  ChevronRight,
  FileText,
  GraduationCap,
  IdCard,
  LayoutGrid,
  Lock,
  Megaphone,
  MessageSquareText,
  Mic,
  Paperclip,
  Phone,
  PieChart,
  ShieldCheck,
  Signal,
  Smartphone,
  Smile,
  TrendingUp,
  Users,
  Video,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import { AnimatedBeam } from "@/components/ui/animated-beam";
import { cn } from "@/lib/utils";

// Photography from the Figma file, exported into public/products/. Step cards
// without a photo yet render the in-code phone mockups below. Paths are left
// null rather than pointing at missing files because `npm run check` fails on
// dangling assets.
const HERO_IMAGE: string | null = "/products/Meta Hero Section.webp";
const STEP_IMAGES: (string | null)[] = [
  "/products/Card 1.webp",
  "/products/Card 2.webp",
  "/products/Card 3.webp",
];

const PHONE_SERVICES: { label: string; icon: LucideIcon; tint: string }[] = [
  { label: "Admit Card", icon: FileText, tint: "bg-blue-50 text-blue-600" },
  {
    label: "Exam Results",
    icon: BarChart3,
    tint: "bg-emerald-50 text-emerald-600",
  },
  { label: "APAAR ID", icon: IdCard, tint: "bg-violet-50 text-violet-600" },
  { label: "Scholarships", icon: Award, tint: "bg-amber-50 text-amber-500" },
  {
    label: "Attendance",
    icon: CalendarCheck,
    tint: "bg-rose-50 text-rose-500",
  },
  { label: "Homework", icon: BookOpen, tint: "bg-sky-50 text-sky-600" },
  { label: "PTM Updates", icon: Users, tint: "bg-green-50 text-green-600" },
  {
    label: "Student Progress",
    icon: TrendingUp,
    tint: "bg-purple-50 text-purple-600",
  },
];

const PLATFORM_SERVICES: {
  title: string;
  desc: string;
  icon: LucideIcon;
  color: string;
}[] = [
  {
    title: "Admit Card",
    desc: "Access & download",
    icon: FileText,
    color: "border-blue-100 bg-blue-50 text-blue-600",
  },
  {
    title: "Exam Result",
    desc: "Check results",
    icon: BarChart3,
    color: "border-emerald-100 bg-emerald-50 text-emerald-600",
  },
  {
    title: "APAAR ID",
    desc: "Verify identity",
    icon: IdCard,
    color: "border-violet-100 bg-violet-50 text-violet-600",
  },
  {
    title: "Scholarship",
    desc: "Discover & track",
    icon: Award,
    color: "border-amber-100 bg-amber-50 text-amber-500",
  },
  {
    title: "Attendance",
    desc: "Get updates",
    icon: CalendarCheck,
    color: "border-rose-100 bg-rose-50 text-rose-500",
  },
  {
    title: "School Update",
    desc: "PTM & homework",
    icon: Bell,
    color: "border-sky-100 bg-sky-50 text-sky-600",
  },
];

const STEPS = [
  { title: "Open WhatsApp", desc: "Start from a familiar interface." },
  { title: "Choose a Service", desc: "Select or simply ask what you need." },
  {
    title: "Get the Information",
    desc: "Receive the requested service or update.",
  },
] as const;

const AUDIENCES = [
  {
    key: "students",
    tab: "Students",
    eyebrow: "Student view",
    title: "Your education services",
    desc: "Quick access to essential academic services and student records.",
    items: ["Admit Card", "Exam Results", "APAAR ID", "Scholarships"],
  },
  {
    key: "parents",
    tab: "Parents",
    eyebrow: "Parent view",
    title: "Stay connected with school",
    desc: "See the updates that matter without navigating multiple portals.",
    items: ["Attendance", "Homework", "PTM Updates", "Student Progress"],
  },
  {
    key: "teachers",
    tab: "Teachers",
    eyebrow: "Teacher view",
    title: "Keep families informed",
    desc: "Share essential school updates through a simple communication flow.",
    items: [
      "Attendance Updates",
      "Homework",
      "PTM Reminders",
      "Progress Updates",
    ],
  },
  {
    key: "administrators",
    tab: "Administrators",
    eyebrow: "Administrator view",
    title: "Support service delivery",
    desc: "Provide clearer access to education services and communication.",
    items: [
      "Service Access",
      "Communication",
      "Program Updates",
      "Usage Overview",
    ],
  },
] as const;

const LANGUAGES = [
  { name: "English", request: "I want to check my exam result" },
  { name: "Tamil", request: "நான் என் தேர்வு முடிவைப் பார்க்க விரும்புகிறேன்" },
  {
    name: "Kannada",
    request: "ನಾನು ನನ್ನ ಪರೀಕ್ಷೆಯ ಫಲಿತಾಂಶವನ್ನು ನೋಡಲು ಬಯಸುತ್ತೇನೆ",
  },
  { name: "Hindi", request: "मैं अपना परीक्षा परिणाम देखना चाहता हूँ" },
  { name: "Telugu", request: "నేను నా పరీక్ష ఫలితాన్ని చూడాలనుకుంటున్నాను" },
  { name: "Marathi", request: "मला माझा परीक्षेचा निकाल पाहायचा आहे" },
] as const;

const AUDIENCE_ICONS: Record<string, { icon: LucideIcon; color: string }> = {
  "Admit Card": {
    icon: FileText,
    color: "border-blue-100 bg-blue-50 text-blue-600",
  },
  "Exam Results": {
    icon: BarChart3,
    color: "border-emerald-100 bg-emerald-50 text-emerald-600",
  },
  "APAAR ID": {
    icon: IdCard,
    color: "border-violet-100 bg-violet-50 text-violet-600",
  },
  Scholarships: {
    icon: Award,
    color: "border-amber-100 bg-amber-50 text-amber-500",
  },
  Attendance: {
    icon: CalendarCheck,
    color: "border-rose-100 bg-rose-50 text-rose-500",
  },
  "Attendance Updates": {
    icon: CalendarCheck,
    color: "border-rose-100 bg-rose-50 text-rose-500",
  },
  Homework: { icon: BookOpen, color: "border-sky-100 bg-sky-50 text-sky-600" },
  "PTM Updates": {
    icon: Users,
    color: "border-green-100 bg-green-50 text-green-600",
  },
  "PTM Reminders": {
    icon: BellRing,
    color: "border-green-100 bg-green-50 text-green-600",
  },
  "Student Progress": {
    icon: TrendingUp,
    color: "border-purple-100 bg-purple-50 text-purple-600",
  },
  "Progress Updates": {
    icon: TrendingUp,
    color: "border-purple-100 bg-purple-50 text-purple-600",
  },
  "Service Access": {
    icon: LayoutGrid,
    color: "border-blue-100 bg-blue-50 text-blue-600",
  },
  Communication: {
    icon: MessageSquareText,
    color: "border-emerald-100 bg-emerald-50 text-emerald-600",
  },
  "Program Updates": {
    icon: Megaphone,
    color: "border-amber-100 bg-amber-50 text-amber-500",
  },
  "Usage Overview": {
    icon: PieChart,
    color: "border-violet-100 bg-violet-50 text-violet-600",
  },
};

function AudienceIcon({ item }: { item: string }) {
  const { icon: Icon, color } = AUDIENCE_ICONS[item] ?? {
    icon: FileText,
    color: "border-[#E4E4E7] bg-white text-[#52525B]",
  };
  return (
    <span
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-lg border",
        color,
      )}
    >
      <Icon className="h-4 w-4" />
    </span>
  );
}

const TRUST = [
  {
    icon: ShieldCheck,
    tint: "bg-emerald-50 text-emerald-600",
    title: "Secure Access",
    desc: "Identity and verification steps before sensitive services are accessed.",
  },
  {
    icon: Lock,
    tint: "bg-blue-50 text-blue-600",
    title: "Privacy First",
    desc: "Keep the experience focused on the information needed for each service.",
  },
  {
    icon: BadgeCheck,
    tint: "bg-violet-50 text-violet-600",
    title: "Verified Services",
    desc: "Guide users toward trusted education-service workflows.",
  },
] as const;

const WAVEFORM = [14, 26, 20, 36, 24, 30, 16];

export default function MetaProductPage() {
  return (
    <main className="min-h-screen w-full bg-[#FAFAFA] text-[#0A0A0A]">
      <Hero />
      <Platform />
      <HowItWorks />
      <Audiences />
      <Languages />
      <Trust />
      <ReadyToExplore />
    </main>
  );
}

/* ── Hero ──────────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="relative isolate flex min-h-[90vh] items-center overflow-hidden bg-[#1B1815]">
      {HERO_IMAGE ? (
        // On md+ the photo sits in a narrower right-aligned box so object-cover
        // crops less (a slight zoom-out); its left edge fades into a gradient
        // sampled from the photo's wall colours.
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#CDB7A9] via-[#D9BCA2] to-[#8A7462]">
          <div className="absolute inset-y-0 right-0 w-full md:w-[85%] md:[mask-image:linear-gradient(to_right,transparent,black_20%)]">
            <Image
              src={HERO_IMAGE}
              alt="A person holding a phone showing the Greenfield School WhatsApp chat with education services"
              fill
              priority
              sizes="(min-width: 768px) 85vw, 100vw"
              className="object-cover object-[20%_60%]"
            />
          </div>
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_72%_35%,#8C7D70_0%,#55493F_35%,#2A241F_65%,#16130F_100%)]"
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/75 via-black/50 to-black/30 md:from-black/65 md:via-black/30 md:to-transparent"
      />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 pb-20 pt-40 md:grid-cols-2 md:px-10 md:pb-40 md:pt-32 xl:px-0">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-[56px]">
            Access education services through a simple conversation.
          </h1>
          <p className="mt-5 max-w-md text-base leading-snug text-white/85 md:text-lg">
            Check results, access admit cards, manage APAAR, discover
            scholarships and receive school updates through WhatsApp.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact?type=general"
              className="rounded-md bg-[#1A66FF] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0F55E0]"
            >
              Request a Demo
            </Link>
            <a
              href="#platform"
              className="rounded-md border border-white/70 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              See Services
            </a>
          </div>
        </div>

        {!HERO_IMAGE && (
          <div className="flex justify-center md:justify-start md:pl-6">
            <ChatPhone className="md:rotate-[8deg]" />
          </div>
        )}
      </div>
    </section>
  );
}

function ChatPhone({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative w-[272px] rounded-[46px] bg-[#111] p-[9px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.65)] ring-1 ring-white/10",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-[38px] bg-[#F3F3F1]">
        <div className="relative flex items-center justify-between bg-white px-6 pb-1 pt-3 text-[11px] font-semibold">
          <span>15:15</span>
          <span className="absolute left-1/2 top-2 h-[22px] w-[78px] -translate-x-1/2 rounded-full bg-black" />
          <span className="flex items-center gap-1">
            <Signal className="h-3 w-3" />
            <Wifi className="h-3 w-3" />
            <BatteryFull className="h-3.5 w-3.5" />
          </span>
        </div>

        <div className="flex items-center gap-2 border-b border-black/5 bg-white px-3 py-2">
          <ArrowLeft className="h-4 w-4" />
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1F5F3A] text-white">
            <GraduationCap className="h-4 w-4" />
          </span>
          <div className="flex-1 leading-tight">
            <p className="flex items-center gap-1 text-[11px] font-semibold">
              Greenfield School
              <BadgeCheck className="h-3 w-3 fill-[#25D366] text-white" />
            </p>
            <p className="text-[9px] text-gray-500">Online</p>
          </div>
          <Video className="h-4 w-4" />
          <Phone className="h-3.5 w-3.5" />
        </div>

        <div className="space-y-2 px-3 py-3">
          <div className="max-w-[78%] rounded-xl rounded-tl-sm bg-white px-3 py-2 text-[10px] leading-snug text-gray-800 shadow-sm">
            <p>Hi there! 👋</p>
            <p>How can we help you today?</p>
            <p>Choose a service below:</p>
            <p className="mt-0.5 text-right text-[8px] text-gray-400">10:10</p>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {PHONE_SERVICES.map(({ label, icon: Icon, tint }) => (
              <div
                key={label}
                className="flex flex-col gap-1.5 rounded-lg bg-white p-2 shadow-sm"
              >
                <span
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-md",
                    tint,
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <span className="flex items-center justify-between text-[9.5px] font-semibold text-gray-800">
                  {label}
                  <ChevronRight className="h-3 w-3 text-gray-400" />
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 px-2.5 pb-4 pt-1">
          <div className="flex flex-1 items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[9px] text-gray-400 shadow-sm">
            <Smile className="h-3.5 w-3.5" />
            <span className="flex-1">Type a message...</span>
            <Paperclip className="h-3 w-3" />
            <Camera className="h-3 w-3" />
          </div>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1DA851] text-white">
            <Mic className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Shared section heading ────────────────────────────────────────────── */

function SectionHeading({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-bold uppercase">{eyebrow}</p>
      <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl md:text-[44px] md:leading-[1.1]">
        {title}
      </h2>
      {desc && (
        <p className="mt-4 max-w-xl text-base leading-snug text-[#3F3F46] md:text-lg">
          {desc}
        </p>
      )}
    </div>
  );
}

/* ── The platform (animated beam) ──────────────────────────────────────── */

function Platform() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const n0 = useRef<HTMLDivElement>(null);
  const n1 = useRef<HTMLDivElement>(null);
  const n2 = useRef<HTMLDivElement>(null);
  const n3 = useRef<HTMLDivElement>(null);
  const n4 = useRef<HTMLDivElement>(null);
  const n5 = useRef<HTMLDivElement>(null);
  const nodeRefs = [n0, n1, n2, n3, n4, n5];

  return (
    <section id="platform" className="scroll-mt-28 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          eyebrow="The platform"
          title="Everything you need, in one place."
          desc="Education services come together through WhatsApp and reach the user in one simple mobile experience."
        />

        <div
          ref={containerRef}
          className="relative mx-auto mt-12 flex max-w-3xl items-center justify-between gap-6 md:mt-16"
        >
          <div className="relative z-10 flex flex-col gap-3">
            {PLATFORM_SERVICES.map(({ icon: Icon, ...s }, i) => (
              <div
                key={s.title}
                ref={nodeRefs[i]}
                className="flex w-[150px] items-center gap-2.5 rounded-xl border border-[#E4E4E7] bg-white px-2.5 py-2 sm:w-[200px] sm:px-3"
              >
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border",
                    s.color,
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="leading-tight">
                  <span className="block text-[12px] font-semibold sm:text-[13px]">
                    {s.title}
                  </span>
                  <span className="block text-[10px] text-[#71717A] sm:text-[11px]">
                    {s.desc}
                  </span>
                </span>
              </div>
            ))}
          </div>

          <div
            ref={hubRef}
            className="relative z-10 flex h-20 w-20 shrink-0 flex-col items-center justify-center gap-1 rounded-full border border-[#E4E4E7] bg-white shadow-sm sm:h-24 sm:w-24"
          >
            <FaWhatsapp className="h-7 w-7 text-[#25D366] sm:h-8 sm:w-8" />

            <span className="text-[11px] font-bold sm:text-[13px]">
              WhatsApp
            </span>
          </div>

          <div
            ref={mobileRef}
            className="relative z-10 hidden shrink-0 items-center gap-2.5 rounded-xl border border-[#E4E4E7] bg-white px-3 py-2.5 sm:flex sm:w-[200px]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#CCFBF1]">
              <Smartphone className="h-4 w-4 text-[#0D9488]" />
            </span>
            <span className="leading-tight">
              <span className="block text-[13px] font-semibold">
                Your Mobile
              </span>
              <span className="block text-[11px] text-[#71717A]">
                Connected
              </span>
            </span>
          </div>

          {nodeRefs.map((ref, i) => (
            <AnimatedBeam
              key={i}
              containerRef={containerRef}
              fromRef={ref}
              toRef={hubRef}
              duration={4}
              delay={i * 0.4}
            />
          ))}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={hubRef}
            toRef={mobileRef}
            duration={3}
            delay={1}
            className="hidden sm:block"
          />
        </div>
      </div>
    </section>
  );
}

/* ── How it works ──────────────────────────────────────────────────────── */

function HowItWorks() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          eyebrow="How it works"
          title="As simple as sending a message."
          desc="Choose a service, send your request through WhatsApp, and get the information you need in just a few steps."
        />

        <div className="mt-10 grid gap-4 rounded-2xl bg-white p-3 sm:grid-cols-3 md:p-4">
          {STEPS.map((step, i) => {
            const image = STEP_IMAGES[i];
            return (
              <article
                key={step.title}
                className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#D9D9D9]"
              >
                {image ? (
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <StepVisual step={i} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-center text-white">
                  <h3 className="text-[15px] font-semibold">{step.title}</h3>
                  <p className="mt-0.5 text-[12px] text-white/85">
                    {step.desc}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StepVisual({ step }: { step: number }) {
  return (
    <div className="absolute inset-0 flex items-start justify-center bg-[radial-gradient(ellipse_at_50%_20%,#F1ECE4_0%,#D8CFC2_55%,#B9AE9F_100%)] pt-5">
      <div className="h-[150%] w-[38%] -rotate-[8deg] rounded-[22px] bg-[#111] p-[5px] shadow-xl">
        <div className="h-full overflow-hidden rounded-[18px] bg-white px-2 pt-4">
          <div className="mb-2 flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#1F5F3A]" />
            <span className="h-1.5 w-12 rounded-full bg-gray-300" />
          </div>
          {step === 0 && (
            <div className="space-y-1.5">
              {[0, 1, 2, 3, 4].map((r) => (
                <div key={r} className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      "h-3.5 w-3.5 shrink-0 rounded-full",
                      r === 0 ? "bg-[#1DA851]" : "bg-gray-200",
                    )}
                  />
                  <span className="h-1.5 flex-1 rounded-full bg-gray-200" />
                </div>
              ))}
            </div>
          )}
          {step === 1 && (
            <div className="grid grid-cols-2 gap-1">
              {[0, 1, 2, 3, 4, 5].map((t) => (
                <span
                  key={t}
                  className={cn(
                    "h-5 rounded-md",
                    t === 1 ? "bg-[#1DA851]/80" : "bg-gray-100",
                  )}
                />
              ))}
            </div>
          )}
          {step === 2 && (
            <div className="space-y-1.5">
              <span className="ml-auto block h-4 w-3/4 rounded-md bg-[#D9FDD3]" />
              <div className="space-y-1 rounded-md bg-gray-100 p-1.5">
                <span className="block h-1.5 w-2/3 rounded-full bg-gray-300" />
                <span className="block h-1.5 w-full rounded-full bg-gray-300" />
                <span className="block h-1.5 w-1/2 rounded-full bg-[#1DA851]" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Who it's for ──────────────────────────────────────────────────────── */

function Audiences() {
  const [active, setActive] =
    useState<(typeof AUDIENCES)[number]["key"]>("students");
  const audience = AUDIENCES.find((a) => a.key === active) ?? AUDIENCES[0];

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Who it's for"
          title="Built for everyone in education."
          desc="Students, parents, teachers and administrators can access the services and information relevant to them all through one simple experience."
        />

        <div role="tablist" className="mt-6 flex flex-wrap gap-2">
          {AUDIENCES.map((a) => (
            <button
              key={a.key}
              role="tab"
              type="button"
              aria-selected={a.key === active}
              aria-controls="audience-panel"
              onClick={() => setActive(a.key)}
              className={cn(
                "rounded-md border px-4 py-1.5 text-sm transition-colors",
                a.key === active
                  ? "border-[#0A0A0A] bg-white font-medium"
                  : "border-[#D4D4D8] bg-white text-[#3F3F46] hover:border-[#A1A1AA]",
              )}
            >
              {a.tab}
            </button>
          ))}
        </div>

        <div
          id="audience-panel"
          role="tabpanel"
          className="mt-8 rounded-3xl border border-[#EBEBEB] bg-[#F4F4F4] p-5 md:p-6"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={audience.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="grid gap-6 md:grid-cols-[1fr_1.4fr]"
            >
              <div className="md:pt-2">
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#52525B]">
                  {audience.eyebrow}
                </p>
                <h3 className="mt-3 text-xl font-bold tracking-tight md:text-2xl">
                  {audience.title}
                </h3>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#71717A]">
                  {audience.desc}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {audience.items.map((item, i) => (
                  <div
                    key={item}
                    className="flex min-h-[120px] flex-col justify-between rounded-2xl border border-[#E7E7E7] bg-[#FCFCFC] p-4 md:min-h-[150px]"
                  >
                    <span className="flex items-start justify-between">
                      <AudienceIcon item={item} />
                      <span className="text-[11px] font-semibold text-[#A1A1AA]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </span>
                    <span className="text-sm font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ── Language & accessibility ──────────────────────────────────────────── */

function Languages() {
  const reduceMotion = useReducedMotion();
  const [lang, setLang] =
    useState<(typeof LANGUAGES)[number]["name"]>("English");
  const selected = LANGUAGES.find((l) => l.name === lang) ?? LANGUAGES[0];

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid overflow-hidden rounded-3xl border border-[#E7E7E7] bg-[#F7F7F7] md:grid-cols-2">
          <div className="p-6 md:p-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#52525B]">
              Language &amp; accessibility
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
              Ask in your
              <br />
              language.
            </h2>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-[#71717A] md:text-lg">
              Speak or type naturally and access education services in a way
              that feels familiar and easy to understand.
            </p>
            <p className="mt-6 text-sm font-semibold">Choose a language</p>
            <div className="mt-3 flex max-w-sm flex-wrap gap-2">
              {LANGUAGES.map((l) => (
                <button
                  key={l.name}
                  type="button"
                  aria-pressed={l.name === lang}
                  onClick={() => setLang(l.name)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-xs font-semibold transition-colors",
                    l.name === lang
                      ? "border-[#D4D4D8] bg-white shadow-sm"
                      : "border-[#E4E4E7] bg-[#FAFAFA] text-[#3F3F46] hover:bg-white",
                  )}
                >
                  {l.name}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-[#E7E7E7] p-4 md:border-l md:border-t-0 md:p-6">
            <div className="h-full rounded-2xl border border-[#E7E7E7] bg-[#FBFBFB] p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#52525B]">
                    Voice input
                  </p>
                  <p className="mt-1 text-sm font-semibold">
                    {selected.name} selected
                  </p>
                </div>
                <span className="rounded-full border border-[#F2CFC7] bg-white px-2.5 py-0.5 text-[11px] text-[#52525B]">
                  Listening
                </span>
              </div>

              <div className="mt-6 flex items-start justify-between px-2 sm:px-4">
                <div className="flex flex-col items-center gap-3">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#E4E4E7] bg-white sm:h-16 sm:w-16">
                    <Mic className="h-6 w-6 text-[#0D9488]" />
                  </span>
                  <span className="text-[11px] text-[#71717A]">
                    Speak naturally
                  </span>
                </div>
                <div className="relative mt-7 h-px flex-1 bg-[#D4D4D8] sm:mt-8 mx-4">
                  <motion.span
                    className="absolute -top-[1.5px] h-1 w-3 rounded-full bg-[#2BB3A3]"
                    initial={{ left: "0%" }}
                    animate={
                      reduceMotion ? { left: "70%" } : { left: ["0%", "88%"] }
                    }
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
                <div className="flex flex-col items-center gap-3">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#E4E4E7] bg-white sm:h-16 sm:w-16">
                    <FaWhatsapp className="h-7 w-7 text-[#25D366]" />
                  </span>
                  <span className="text-[11px] text-[#71717A]">WhatsApp</span>
                </div>
              </div>

              <div
                aria-hidden="true"
                className="mt-6 flex h-10 items-end justify-center gap-1"
              >
                {WAVEFORM.map((h, i) => (
                  <motion.span
                    key={i}
                    className="w-1.5 rounded-full bg-[#2BB3A3]"
                    style={{ height: h }}
                    animate={
                      reduceMotion ? undefined : { height: [h, h * 0.45, h] }
                    }
                    transition={{
                      duration: 0.9,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>

              <p className="mt-6 text-[11px] font-semibold uppercase text-[#52525B]">
                Your request
              </p>
              <div className="mt-2 min-h-[44px] rounded-xl border border-[#E4E4E7] bg-white px-4 py-3 text-sm">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={selected.name}
                    className="block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {selected.request}
                  </motion.span>
                </AnimatePresence>
              </div>
              <p className="mt-4 text-center text-[11px] text-[#71717A]">
                Voice → Understand → Service → Response
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Trust ─────────────────────────────────────────────────────────────── */

function Trust() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#52525B]">
          Trust
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
          Simple for users. Built with trust in mind.
        </h2>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {TRUST.map(({ icon: Icon, ...t }) => (
            <div
              key={t.title}
              className="rounded-2xl border border-[#E7E7E7] bg-white p-5"
            >
              <span
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg",
                  t.tint,
                )}
              >
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-6 text-base font-semibold">{t.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[#71717A]">
                {t.desc}
              </p>
            </div>
          ))}
        </div>
        <hr className="mt-6 border-[#E7E7E7]" />
      </div>
    </section>
  );
}

/* ── Ready to explore ──────────────────────────────────────────────────── */

function ReadyToExplore() {
  return (
    <section className="pb-20 md:pb-28">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="rounded-3xl border border-[#E7E7E7] bg-[#F7F7F7] px-6 py-12 text-center md:py-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#52525B]">
            Ready to explore?
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold leading-tight tracking-tight md:text-[44px]">
            Make education services easier to access.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-[#71717A] md:text-base">
            One simple conversational experience for students, parents, teachers
            and institutions.
          </p>
          <Link
            href="/contact?type=general"
            className="mt-8 inline-block rounded-lg bg-[#3B82F6] px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-[#2563EB]"
          >
            Request a Demo
          </Link>
        </div>
      </div>
    </section>
  );
}
