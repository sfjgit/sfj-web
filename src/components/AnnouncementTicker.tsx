"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { Bell, Pause, Play, X } from "lucide-react";

type Announcement = {
  id: string;
  title: string;
  description?: string | null;
  link?: string | null;
  linkText?: string | null;
  priority?: string;
  createdAt?: string;
};

type AnnouncementResponse = {
  success?: boolean;
  data?: Announcement[];
  announcements?: Announcement[];
};

// Marquee scrolls right -> left (translateX 0 to -50%). To reverse direction,
// swap the keyframe's `from`/`to` values below.
const PIXELS_PER_SECOND = 30; // constant visual speed regardless of item count
const MIN_DURATION_SECONDS = 20; // floor so a short list doesn't fly past

export default function AnnouncementTicker() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [closed, setClosed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [duration, setDuration] = useState(MIN_DURATION_SECONDS);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadAnnouncements() {
      try {
        const response = await fetch("/api/announcements", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch announcements");
        }

        const result: AnnouncementResponse | Announcement[] =
          await response.json();
        const items = Array.isArray(result)
          ? result
          : (result.data ?? result.announcements ?? []);

        if (!cancelled) {
          setAnnouncements(items);
        }
      } catch (error) {
        console.error("Announcement fetch failed:", error);
        if (!cancelled) {
          setAnnouncements([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadAnnouncements();

    return () => {
      cancelled = true;
    };
  }, []);

  // Measure the real (non-duplicated) content to decide whether it needs to
  // scroll at all, and to pick a duration that keeps scroll speed constant
  // no matter how many announcements are active.
  // const measure = useCallback(() => {
  //   const group = firstGroupRef.current;
  //   const container = containerRef.current;
  //   if (!group || !container) return;

  //   const contentWidth = group.scrollWidth;
  //   const fits = contentWidth <= container.clientWidth;

  //   setShouldAnimate(!fits);
  //   if (!fits) return;

  //   setDuration(
  //     Math.max(MIN_DURATION_SECONDS, contentWidth / PIXELS_PER_SECOND),
  //   );
  // }, []);
  const measure = useCallback(() => {
    const group = firstGroupRef.current;
    const container = containerRef.current;
    if (!group || !container) return;

    const contentWidth = group.getBoundingClientRect().width;
    const fits = contentWidth <= container.clientWidth;

    setShouldAnimate(!fits);
    if (fits) return;

    const next = Math.max(
      MIN_DURATION_SECONDS,
      contentWidth / PIXELS_PER_SECOND,
    );
    // Ignore sub-pixel resize noise — changing animation-duration mid-flight
    // makes the track visibly jump.
    setDuration((prev) => (Math.abs(prev - next) < 0.5 ? prev : next));
  }, []);

  useEffect(() => {
    measure();

    const container = containerRef.current;
    if (!container || typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }

    const observer = new ResizeObserver(() => measure());
    observer.observe(container);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure, announcements]);

  if (loading || closed || announcements.length === 0) {
    return null;
  }

  const hasUrgent = announcements.some(
    (a) => a.priority === "URGENT" || a.priority === "HIGH",
  );

  const isNew = (createdAt?: string) =>
    createdAt
      ? Date.now() - new Date(createdAt).getTime() < 7 * 24 * 60 * 60 * 1000
      : false;

  // const renderItem = (a: Announcement, key: string, focusable: boolean) => {
  //   const urgent = a.priority === "URGENT" || a.priority === "HIGH";
  //   const fresh = isNew(a.createdAt);

  //   return (
  //     <div
  //       key={key}
  //       className="flex shrink-0 items-center gap-2.5 whitespace-nowrap px-6 text-sm"
  //     >
  //       {urgent && (
  //         <span className="relative flex h-1.5 w-1.5 shrink-0">
  //           <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-300 opacity-75" />
  //           <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-300" />
  //         </span>
  //       )}

  //       {fresh && !urgent && (
  //         <span className="shrink-0 rounded-full bg-white px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#07152f]">
  //           New
  //         </span>
  //       )}

  //       <span className="font-medium text-white">{a.title}</span>

  //       {a.description && (
  //         <span className="hidden text-white/60 lg:inline">
  //           — {a.description}
  //         </span>
  //       )}

  //       {a.link && (
  //         <a
  //           href={a.link}
  //           target={a.link.startsWith("http") ? "_blank" : undefined}
  //           rel={a.link.startsWith("http") ? "noopener noreferrer" : undefined}
  //           tabIndex={focusable ? 0 : -1}
  //           className="group inline-flex items-center gap-1 font-semibold text-white underline decoration-white/40 underline-offset-4 transition hover:decoration-white"
  //         >
  //           {a.linkText || "Learn more"}
  //           <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
  //         </a>
  //       )}

  //       <span
  //         aria-hidden
  //         className="ml-3 h-1 w-1 shrink-0 rounded-full bg-white/20"
  //       />
  //     </div>
  //   );
  // };

  const renderItem = (a: Announcement, key: string, focusable: boolean) => {
    const urgent = a.priority === "URGENT" || a.priority === "HIGH";
    const fresh = isNew(a.createdAt);

    const content = (
      <>
        {urgent && (
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-300 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-300" />
          </span>
        )}

        {fresh && !urgent && (
          <span className="shrink-0 rounded-full bg-white px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#07152f]">
            New
          </span>
        )}

        <span className="font-medium text-white">{a.title}</span>

        {a.description && (
          <span className="hidden text-white/60 lg:inline">
            — {a.description}
          </span>
        )}

        <span
          aria-hidden
          className="ml-3 h-1 w-1 shrink-0 rounded-full bg-white/20"
        />
      </>
    );

    return (
      <div
        key={key}
        className="flex shrink-0 items-center whitespace-nowrap text-sm"
      >
        {a.link ? (
          <a
            href={a.link}
            target={a.link.startsWith("http") ? "_blank" : undefined}
            rel={a.link.startsWith("http") ? "noopener noreferrer" : undefined}
            tabIndex={focusable ? 0 : -1}
            className="flex items-center gap-2.5 px-6 transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07152f]"
          >
            {content}
          </a>
        ) : (
          <div className="flex items-center gap-2.5 px-6">{content}</div>
        )}
      </div>
    );
  };

  const trackStyle = shouldAnimate
    ? ({
        "--marquee-duration": `${duration}s`,
        "--marquee-state": paused ? "paused" : "running",
      } as CSSProperties)
    : undefined;

  return (
    <section
      aria-label="Announcements"
      // className="relative z-40 w-full"
      className="fixed left-0 top-0 z-[100] w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className={
          hasUrgent
            ? "bg-gradient-to-r from-red-600 via-rose-600 to-red-600"
            : "bg-gradient-to-r from-[#07152f] via-[#0b2859] to-[#07152f]"
        }
      >
        <div className="mx-auto flex h-11 max-w-[1600px] items-center gap-3 px-4 sm:px-6 lg:px-8">
          {/* Icon + Label */}
          <div className="flex shrink-0 items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
              <Bell className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="hidden text-[11px] font-bold uppercase tracking-[0.16em] text-white/90 sm:block">
              Updates
            </span>
          </div>

          <span
            aria-hidden
            className="hidden h-4 w-px shrink-0 bg-white/20 sm:block"
          />

          {/* Marquee */}
          <div
            ref={containerRef}
            className="relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent_0,black_24px,black_calc(100%-24px),transparent_100%)]"
          >
            <div
              ref={trackRef}
              style={trackStyle}
              className={
                shouldAnimate
                  ? "marquee-track flex w-max items-center"
                  : "flex w-full items-center justify-center"
              }
            >
              <div ref={firstGroupRef} className="flex shrink-0 items-center">
                {announcements.map((a, i) => renderItem(a, `a-${i}`, true))}
              </div>

              {shouldAnimate && (
                <div aria-hidden="true" className="flex shrink-0 items-center">
                  {announcements.map((a, i) => renderItem(a, `b-${i}`, false))}
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="ml-1 flex shrink-0 items-center gap-0.5">
            {shouldAnimate && (
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={
                  paused ? "Play announcements" : "Pause announcements"
                }
                aria-pressed={paused}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                {paused ? (
                  <Play className="h-3.5 w-3.5" />
                ) : (
                  <Pause className="h-3.5 w-3.5" />
                )}
              </button>
            )}

            <button
              type="button"
              onClick={() => setClosed(true)}
              aria-label="Close announcements"
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translate3d(0, 0, 0);
          }

          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .marquee-track {
          animation: marquee var(--marquee-duration, 30s) linear infinite;
          animation-play-state: var(--marquee-state, running);
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-font-smoothing: antialiased; /* stops glyph reflow during transform */
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
