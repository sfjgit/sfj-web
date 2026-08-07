"use client";
import React, { useEffect, useRef, useState } from "react";

interface Stat {
  target: number;
  suffix: string;
  label: string;
}

const STATS: Stat[] = [
  { target: 5, suffix: "+", label: "Government Partners" },
  { target: 120, suffix: "K+", label: "Students Trained" },
  { target: 95, suffix: "%", label: "Placement Rate" },
  { target: 10, suffix: "+", label: "Training Programs" },
];

// Counts 0 -> target once the row scrolls into view. A single observer on the
// row (rather than one per number) starts every stat together, and a ref
// guards against re-triggering if the row scrolls in and out.
const StatsCounter = () => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);
  const hasStarted = useRef(false);

  useEffect(() => {
    const node = rowRef.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStart(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          setStart(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rowRef} className="flex items-start divide-x divide-white/25">
      {STATS.map((stat, index) => (
        <div
          key={stat.label}
          className={`text-left ${index === 0 ? "pr-4 sm:pr-6" : "px-4 sm:px-6"}`}
        >
          <AnimatedNumber {...stat} start={start} />
          <div className="text-[0.65rem] sm:text-xs text-gray-300 mt-1 whitespace-nowrap">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

const AnimatedNumber = ({ target, suffix, start }: Stat & { start: boolean }) => {
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
    <div
      className="text-white font-bold leading-none"
      style={{ fontSize: "clamp(1.25rem, 1.8vw, 2rem)" }}
    >
      {value}
      {suffix}
    </div>
  );
};

export default StatsCounter;
