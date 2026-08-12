/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";

// Counts 0 -> target once the row scrolls into view, then holds. A single
// observer on the row (statsRowRef) starts every number in it together
// rather than each firing its own observer independently. Same component as
// the KaaS page's stats section (CorporateTrainingClient.tsx).
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

const stats = [
  { target: 15, suffix: "+", label: "Years in business" },
  {
    target: 10,
    suffix: "K+",
    label: "IT professionals placed, 3-25+ yrs experience",
  },
  {
    target: 400,
    suffix: "K+",
    label: "IT professionals trained in certified programs",
  },
  { target: 30, suffix: "K+", label: "ILP programs delivered" },
];

export default function SFJStatsSection() {
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
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Same layout as the KaaS page's stats section: a portrait image
            card on the left, plain unboxed stat typography on the right —
            no icons, no bordered tiles. items-stretch matches the right
            column's height to the image so the title+info block and the
            stats row can spread across it with justify-between. */}
        <div className="grid grid-cols-1 lg:grid-cols-[21rem_1fr] gap-10 lg:gap-16 items-stretch">
          <div className="relative w-full max-w-md mx-auto lg:mx-0 aspect-[4/5] rounded-2xl overflow-hidden self-start">
            <img
              src="/app/it/taas-hero.webp"
              alt="SFJBS technology professionals at work"
              className="absolute inset-0 w-full h-full object-cover object-[23%_center]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="text-white font-bold text-lg leading-snug">
                450+ global clients served
              </div>
              <div className="text-gray-300 text-sm mt-1">
                Across 24+ countries, since 2011
              </div>
            </div>
          </div>

          <div className="h-full flex flex-col justify-between">
            <div className="max-w-5xl text-left">
              <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900">
                Our Impact & Expertise
              </h2>
              <p className="text-gray-600 mt-3 text-base sm:text-lg leading-relaxed">
                Access skills-validated professionals across application
                engineering, cloud, DevOps, data, AI, enterprise platforms,
                cybersecurity, testing, mobile, integration and
                infrastructure — hired permanent, deployed subcontract, or
                scaled as project teams through structured sourcing,
                assessment, onboarding and workforce management.
              </p>
            </div>

            <div
              ref={statsRowRef}
              className="grid grid-cols-2 gap-x-10 sm:gap-x-12 gap-y-10 mt-10"
            >
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-2xl sm:text-3xl xl:text-4xl font-semibold text-gray-900 leading-none whitespace-nowrap">
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
        </div>
      </div>
    </div>
  );
}
