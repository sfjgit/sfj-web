"use client";

import { motion, useReducedMotion } from "framer-motion";
import { RefObject, useEffect, useId, useState } from "react";

import { cn } from "@/lib/utils";

interface AnimatedBeamProps {
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  duration?: number;
  delay?: number;
  pathColor?: string;
  pathWidth?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  className?: string;
}

/**
 * A curved connector drawn from the right edge of `fromRef` to the left edge
 * of `toRef`, with a light pulse travelling along it. Based on the
 * shadcnspace / magicui Animated Beam referenced in the META Figma file.
 */
export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  duration = 4,
  delay = 0,
  pathColor = "#E5E7EB",
  pathWidth = 1.5,
  gradientStartColor = "#2BB3A3",
  gradientStopColor = "#5EEAD4",
  className,
}: AnimatedBeamProps) {
  const id = useId();
  const reduceMotion = useReducedMotion();
  const [path, setPath] = useState("");
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const update = () => {
      const container = containerRef.current;
      const from = fromRef.current;
      const to = toRef.current;
      if (!container || !from || !to) return;

      const c = container.getBoundingClientRect();
      const a = from.getBoundingClientRect();
      const b = to.getBoundingClientRect();

      const sx = a.right - c.left;
      const sy = a.top + a.height / 2 - c.top;
      const ex = b.left - c.left;
      const ey = b.top + b.height / 2 - c.top;
      const mx = (sx + ex) / 2;

      setSize({ width: c.width, height: c.height });
      setPath(`M ${sx},${sy} C ${mx},${sy} ${mx},${ey} ${ex},${ey}`);
    };

    const observer = new ResizeObserver(update);
    if (containerRef.current) observer.observe(containerRef.current);
    update();
    return () => observer.disconnect();
  }, [containerRef, fromRef, toRef]);

  return (
    <svg
      aria-hidden="true"
      fill="none"
      width={size.width}
      height={size.height}
      viewBox={`0 0 ${size.width} ${size.height}`}
      className={cn("pointer-events-none absolute left-0 top-0", className)}
    >
      <path
        d={path}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeLinecap="round"
      />
      {!reduceMotion && (
        <>
          <path
            d={path}
            stroke={`url(#${id})`}
            strokeWidth={pathWidth + 0.5}
            strokeLinecap="round"
          />
          <defs>
            <motion.linearGradient
              id={id}
              gradientUnits="userSpaceOnUse"
              initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
              animate={{
                x1: ["10%", "110%"],
                x2: ["0%", "100%"],
                y1: ["0%", "0%"],
                y2: ["0%", "0%"],
              }}
              transition={{
                delay,
                duration,
                ease: [0.16, 1, 0.3, 1],
                repeat: Infinity,
                repeatDelay: 0,
              }}
            >
              <stop stopColor={gradientStartColor} stopOpacity="0" />
              <stop stopColor={gradientStartColor} />
              <stop offset="32.5%" stopColor={gradientStopColor} />
              <stop
                offset="100%"
                stopColor={gradientStopColor}
                stopOpacity="0"
              />
            </motion.linearGradient>
          </defs>
        </>
      )}
    </svg>
  );
}
