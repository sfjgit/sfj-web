"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

/* Subtle scroll-in fade. Kept small and quick — no theatrics. */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-500 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* Count-up that fires once on scroll into view. */
export function CountUp({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !done.current) {
          done.current = true;
          const dur = 1100;
          let t0: number | null = null;
          const step = (t: number) => {
            if (t0 === null) t0 = t;
            const p = Math.min((t - t0) / dur, 1);
            setVal(Math.floor(p * target));
            if (p < 1) requestAnimationFrame(step);
            else setVal(target);
          };
          requestAnimationFrame(step);
          io.unobserve(el);
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

/* Standard centered section header: small blue eyebrow + title + optional subtitle. */
export function SectionIntro({
  eyebrow,
  title,
  subtitle,
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={`mx-auto max-w-3xl text-center ${className}`}>
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
