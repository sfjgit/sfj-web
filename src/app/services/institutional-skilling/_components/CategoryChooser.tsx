"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Brain,
  Wrench,
  Building,
  BookOpen,
  Settings,
  Sprout,
  Syringe,
  Scale,
  Stethoscope,
  Briefcase,
  ChevronDown,
  ChevronUp,
  type LucideIcon,
} from "lucide-react";
import { AI_TOOLS } from "./Scroller";

export type Category = {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  image: string;
};

// Same anchors the tab strip (Scroller.tsx) already links to, so a card's
// arrow scrolls to the same section a matching tab would.
export const CATEGORIES: Category[] = [
  {
    title: "SkillgenAI",
    description:
      "A four-day AI masterclass for school and college students. Fifteen tools, no coding, and a finished portfolio by day four.",
    icon: Brain,
    href: "#schools",
    image: "/app/b2i/categories/skillgenai.webp",
  },
  {
    title: "ITI",
    description:
      "Trade-certified skilling after class 10, mapped to the industrial and manufacturing roles hiring now.",
    icon: Wrench,
    href: "#iti",
    image: "/app/b2i/categories/iti.webp",
  },
  {
    title: "Polytechnic",
    description:
      "Three-year diploma support across eight engineering specialisations, aligned to what employers hire diploma holders for.",
    icon: Building,
    href: "#polytechnic",
    image: "/app/b2i/categories/polytechnic.webp",
  },
  {
    title: "Arts & Science",
    description:
      "Short employability programmes for nine academic backgrounds, with an 85% placement rate on completion.",
    icon: BookOpen,
    href: "#arts",
    image: "/app/b2i/categories/arts-science.webp",
  },
  {
    title: "Engineering",
    description:
      "Career pathways across six branches, taught on ten live technologies from cloud and data to cybersecurity.",
    icon: Settings,
    href: "#engineering",
    image: "/app/b2i/categories/engineering.webp",
  },
  {
    title: "Agriculture",
    description:
      "Agri-tech and agribusiness skilling — precision farming, supply chain and food processing roles.",
    icon: Sprout,
    href: "#agriculture",
    image: "/app/b2i/categories/agriculture.webp",
  },
  {
    title: "Paramedical",
    description:
      "Diagnostic, technician and allied health programmes that pair clinical practice with employability training.",
    icon: Syringe,
    href: "#paramedical",
    image: "/app/b2i/categories/paramedical.webp",
  },
  {
    title: "Law",
    description:
      "Legal-tech, compliance and contract skilling for law students entering corporate and regulatory practice.",
    icon: Scale,
    href: "#law",
    image: "/app/b2i/categories/law.webp",
  },
  {
    title: "Medical",
    description:
      "Clinical and healthcare-adjacent skilling for medical students, built with HIMSS-certified content.",
    icon: Stethoscope,
    href: "#medical",
    image: "/app/b2i/categories/medical.webp",
  },
  {
    title: "Faculty on Demand",
    description:
      "FDP and train-the-trainer programmes that leave the capability inside your institution after we leave.",
    icon: Briefcase,
    href: "#faculty",
    image: "/app/b2i/categories/faculty-on-demand.webp",
  },
];

// Collapsed view shows one full row; expanding reveals the rest.
const COLLAPSED_COUNT = 4;

const handleJump = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function CategoryChooser({
  categories = CATEGORIES,
}: {
  categories?: Category[];
} = {}) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? categories : categories.slice(0, COLLAPSED_COUNT);

  return (
    <div className="bg-white py-16">
      <div className="max-w-[110rem] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 max-w-2xl">
          Choose your institution category
        </h2>
        <p className="text-gray-600 mt-3 text-base sm:text-lg leading-relaxed max-w-2xl">
          Built for your department, not adapted to it. Ten programmes
          spanning school, trade, diploma, degree and faculty — each with its
          own certification path.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {visible.map((category) => {
            return (
              <button
                key={category.title}
                type="button"
                onClick={() => handleJump(category.href)}
                className="text-left bg-gray-100 border border-gray-200 rounded-2xl overflow-visible hover:shadow-lg transition-shadow p-4"
              >
                <div className="relative">
                  {/* Image is inset (not flush) so the card's own background
                      shows as a margin all the way around it. */}
                  <div className="relative aspect-[4/3] rounded-xl bg-white overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <h3 className="text-base font-bold text-gray-900 mb-1.5">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    {category.description}
                  </p>

                  {/* Scrolling AI-tool logo strip below the text, on the
                      card's own light background — so it uses the same
                      darkened-logo treatment as the AI Tools nav bar rather
                      than the white/inverted version needed on a photo. */}
                  <div
                    className="relative -mx-4 overflow-hidden h-8"
                    style={{
                      maskImage:
                        "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                      WebkitMaskImage:
                        "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                    }}
                  >
                    <div
                      className="marquee-pause-hover flex items-center h-full w-max"
                      style={{
                        animation: "capabilityLogoScroll 22s linear infinite",
                        willChange: "transform",
                        backfaceVisibility: "hidden",
                      }}
                    >
                      {["a", "b"].map((half) => (
                        <div
                          className="flex items-center h-full"
                          key={half}
                          aria-hidden={half === "b"}
                        >
                          {AI_TOOLS.map((tool, index) => (
                            <div
                              key={`${half}-${index}`}
                              className="flex-shrink-0 mx-2.5 flex items-center justify-center h-6 w-16"
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={tool.logo}
                                alt=""
                                loading="lazy"
                                decoding="async"
                                className="max-w-full max-h-full object-contain"
                                style={{ filter: "grayscale(1) brightness(0.5)" }}
                              />
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {categories.length > COLLAPSED_COUNT && (
          <div className="text-center mt-10">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
            >
              {showAll ? (
                <>
                  Show fewer categories <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Show more categories <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
