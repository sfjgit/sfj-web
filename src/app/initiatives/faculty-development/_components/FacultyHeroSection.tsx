import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CapabilityStrip, {
  capabilityCards,
} from "@/app/services/it-staffing-company/_components/CapabilityStrip";

// Real titles for the Faculty Development strip. Logos still borrow the
// TaaS strip's as a placeholder — all 7 videos are now real.
const FACULTY_CAPABILITY_TITLES = [
  "AI Literacy & the Landscape",
  "Generative AI Tools & Prompt Craft",
  "Teaching, Content & Course Design",
  "Assessment, Evaluation & OBE",
  "Research, Writing & Supervision",
  "Responsible AI, Integrity & Policy",
  "Academic Administration & Productivity",
];

const FACULTY_CAPABILITY_VIDEOS: Record<number, string> = {
  0: "/fac/Fac1.webm",
  1: "/fac/Fac2.webm",
  2: "/fac/Fac3.webm",
  3: "/fac/Assesement.webm",
  4: "/fac/Research.webm",
  5: "/fac/Reasposible.webm",
  6: "/fac/Accademic.webm",
};

const FACULTY_CAPABILITY_CARDS = capabilityCards.slice(0, 7).map((card, i) => ({
  ...card,
  id: `faculty-${i}`,
  title: FACULTY_CAPABILITY_TITLES[i],
  video: FACULTY_CAPABILITY_VIDEOS[i] ?? card.video,
}));

// Same full-bleed-photo + dark scrim + clamp-sized heading pattern used on
// the other rebuilt service hero sections (CSRHeroSection.tsx,
// government-initiatives/Hero.tsx, institutional-training/HeroSection.tsx,
// the TaaS hero in it-staffing-company/page.tsx).
const FacultyHeroSection = () => (
  <section className="relative w-full min-h-[26rem] sm:min-h-[30rem] lg:min-h-[88dvh] flex flex-col justify-start pt-28 sm:pt-32 lg:pt-40 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-8 bg-slate-900">
    <Image
      src="/fac/faculty-hero-3.webp"
      alt="Educators collaborating together in discussion, with a holographic globe representing global, technology-driven learning"
      fill
      priority
      sizes="100vw"
      className="object-cover object-center"
    />
    <div className="absolute inset-0 bg-black/15" />

    <div className="relative max-w-[100rem] mx-auto w-full">
      <div className="max-w-2xl space-y-4 sm:space-y-6">
        <div className="flex items-center space-x-2 text-white">
          <span className="text-xs font-semibold tracking-wide uppercase"></span>
        </div>

        <h1
          className="font-bold text-white leading-tight"
          style={{
            fontSize: "clamp(1.5rem, 2.6vw, 3rem)",
            textShadow: "0 2px 14px rgba(0,0,0,0.85)",
          }}
        >
          The AI Tool Stack for Faculty
          <br />
          Development
        </h1>

        <p
          className="text-white leading-normal sm:leading-relaxed"
          style={{
            fontSize: "clamp(1rem, 1.3vw, 1.35rem)",
            textShadow: "0 2px 14px rgba(0,0,0,0.85)",
          }}
        >
          Every tool in the 50-hour Faculty Development Programme is
          purpose-built for teaching, labs, and assessment — with select
          industry tools included to prepare learners for the workplace.
        </p>

        <div className="pt-2">
          <Link
            href="/contact?type=b2i"
            className="inline-flex items-center px-6 py-3 bg-white text-slate-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Apply now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>

    {/* Same interactive strip component as the TaaS hero, reused rather than
        duplicated — but with its own 7-card set instead of the TaaS 10. */}
    <CapabilityStrip cards={FACULTY_CAPABILITY_CARDS} />
  </section>
);

export default FacultyHeroSection;
