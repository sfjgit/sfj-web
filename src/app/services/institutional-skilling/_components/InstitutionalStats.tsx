"use client";

import { useEffect, useRef, useState } from "react";

// Counts 0 -> target once the row scrolls into view, then holds. Same
// pattern as the other plain-typography stats rows on the site (KaaS,
// TaaS) — a single observer on the row starts every number together.
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
  {
    target: 15000,
    suffix: "+",
    label: "graduates placed through BFSI programmes",
  },
  {
    target: 85,
    suffix: "%",
    label: "placement rate in the arts & science stream",
  },
  {
    target: 32,
    suffix: "+",
    label: "specialisations across eight academic streams",
  },
  {
    target: 50,
    suffix: "+",
    label: "career roles mapped to programmes",
  },
];

export default function InstitutionalStats() {
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
        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
          Institutional training insights
        </h2>
        <p className="text-gray-600 mt-3 text-base sm:text-lg leading-relaxed">
          Industry-aligned programmes across eight academic streams
        </p>

        <div
          ref={statsRowRef}
          className="grid grid-cols-2 sm:grid-cols-4 gap-x-10 sm:gap-x-12 gap-y-10 mt-12"
        >
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-4xl sm:text-5xl font-bold text-gray-900 leading-none">
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
  );
}
