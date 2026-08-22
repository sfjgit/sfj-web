"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { Pause, Play, X } from "lucide-react";

// Mirrors the payload of GET /api/announcements. Verified against the live
// backend: it sends `message`, NOT `description`, and carries isActive /
// startAt / endAt / displayOrder, all of which decide whether and in what
// order an item may appear.
type ApiAnnouncement = {
  id: string;
  title: string;
  message?: string | null;
  link?: string | null;
  linkText?: string | null;
  isActive?: boolean;
  displayOrder?: number;
  startAt?: string | null;
  endAt?: string | null;
  createdAt?: string;
};

// What this component renders. `description` is fed from the API's `message`.
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
  data?: ApiAnnouncement[];
  announcements?: ApiAnnouncement[];
};

/**
 * Turn the raw API list into what the bar should actually display.
 *
 * The backend publishes scheduling metadata that the ticker previously
 * ignored, so deactivated and expired notices rendered anyway — at the time
 * of writing the feed contains one item whose endAt has already passed.
 * Honouring it here is the difference between "fetching" and "fetching
 * properly".
 *
 *   isActive === false   -> hidden
 *   startAt in future    -> not yet live, hidden
 *   endAt in past        -> expired, hidden
 *
 * Ordering follows displayOrder, then newest first as a tiebreak, since the
 * whole feed currently shares displayOrder 0.
 */
function toDisplayList(items: ApiAnnouncement[]): Announcement[] {
  const now = Date.now();

  return items
    .filter((a) => {
      if (a.isActive === false) return false;
      if (a.startAt && new Date(a.startAt).getTime() > now) return false;
      if (a.endAt && new Date(a.endAt).getTime() < now) return false;
      return true;
    })
    .sort((a, b) => {
      const order = (a.displayOrder ?? 0) - (b.displayOrder ?? 0);
      if (order !== 0) return order;
      return (
        new Date(b.createdAt ?? 0).getTime() -
        new Date(a.createdAt ?? 0).getTime()
      );
    })
    .map((a) => ({
      id: a.id,
      title: a.title,
      // The field rename that kept every description invisible. Editors
      // routinely paste the same text into both title and message; rendering
      // both then prints the announcement twice on one line, so treat an
      // identical message as absent.
      description:
        a.message && a.message.trim() !== a.title.trim() ? a.message : null,
      link: a.link ?? null,
      linkText: a.linkText ?? null,
      createdAt: a.createdAt,
    }));
}

// Marquee scrolls right -> left (translateX 0 to -50%). To reverse direction,
// swap the keyframe's `from`/`to` values below.
//
// On: the bar scrolls. Set to false to hold it still — the still layout
// (no edge fade, left-aligned) is wired up and comes back automatically.
const MARQUEE_ENABLED = true;

/**
 * Announcement text is authored in a plain-text CMS field, but editors write
 * **like this** expecting emphasis. Without this the asterisks render
 * literally. Deliberately only `**bold**` — the bar is one line of copy, not
 * a markdown surface, and anything richer invites HTML injection from a
 * field that is not sanitised.
 */
function renderEmphasis(text: string) {
  return text.split(/(\*\*[^\*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
      <strong key={i} className="font-bold text-white">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  );
}

const PIXELS_PER_SECOND = 15; // constant visual speed regardless of item count
const MIN_DURATION_SECONDS = 40; // floor so a short list doesn't fly past

export default function AnnouncementTicker() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [closed, setClosed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(MARQUEE_ENABLED);
  const [duration, setDuration] = useState(MIN_DURATION_SECONDS);
  // How many copies of the announcement list make up ONE marquee group. The
  // track animates by translating -50%, i.e. exactly one group width. If a
  // group is narrower than the visible strip, that translation ends before
  // the copy behind it arrives and a blank gap crosses the bar every cycle.
  // Repeating short content until a group outgrows the container closes it.
  const [repeat, setRepeat] = useState(1);

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
          setAnnouncements(toDisplayList(items));
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

    const groupWidth = group.getBoundingClientRect().width;
    const containerWidth = container.clientWidth;

    // Scroll unconditionally — a single short notice moves just like a long
    // list. Previously this only animated when the content overflowed, so
    // anything that fitted sat motionless.
    setShouldAnimate(MARQUEE_ENABLED);
    if (!MARQUEE_ENABLED || groupWidth <= 0 || containerWidth <= 0) return;

    // Width of the list at a single repeat, used to work out how many copies
    // are needed to cover the strip.
    const unitWidth = groupWidth / repeat;
    if (unitWidth <= 0) return;

    const needed = Math.max(1, Math.ceil(containerWidth / unitWidth) + 1);
    if (needed !== repeat) {
      setRepeat(needed);
      return; // re-measure once the extra copies are laid out
    }

    const next = Math.max(MIN_DURATION_SECONDS, groupWidth / PIXELS_PER_SECOND);
    // Ignore sub-pixel resize noise — changing animation-duration mid-flight
    // makes the track visibly jump.
    setDuration((prev) => (Math.abs(prev - next) < 0.5 ? prev : next));
  }, [repeat]);

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

  const visible = announcements;

  const hasUrgent = visible.some(
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
          <span className="shrink-0 rounded-full bg-white px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#0040E8]">
            New
          </span>
        )}

        <span className="font-medium text-white">
          {renderEmphasis(a.title)}
        </span>

        {a.description && (
          <span className="hidden text-white/60 lg:inline">
            — {renderEmphasis(a.description)}
          </span>
        )}

        {a.linkText && (
          <span className="ml-1 shrink-0 font-bold text-white underline underline-offset-2">
            {a.linkText}
          </span>
        )}

        {/* Separator between items in the marquee. With scrolling off there is
            only one item, so the dot would just dangle after it. */}
        {MARQUEE_ENABLED && (
          <span
            aria-hidden
            className="ml-3 h-1 w-1 shrink-0 rounded-full bg-white/20"
          />
        )}
      </>
    );

    return (
      <div
        key={key}
        className={
          MARQUEE_ENABLED
            ? "flex shrink-0 items-center whitespace-nowrap text-sm"
            : "flex min-w-0 items-center whitespace-nowrap text-sm"
        }
      >
        {a.link ? (
          <a
            href={a.link}
            target={a.link.startsWith("http") ? "_blank" : undefined}
            rel={a.link.startsWith("http") ? "noopener noreferrer" : undefined}
            tabIndex={focusable ? 0 : -1}
            className="flex items-center gap-2.5 px-6 transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0040E8]"
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
            : "bg-gradient-to-r from-[#0040E8] via-[#2364EC] to-[#0040E8]"
        }
      >
        <div className="mx-auto flex h-8 max-w-[1280px] items-center gap-3 px-4 sm:px-6 lg:px-8">
          {/* Marquee */}
          <div
            ref={containerRef}
            className={
              // The edge fade exists so marquee items slide in and out of
              // view. Held still it just eats the first and last words, so
              // it only applies while scrolling.
              MARQUEE_ENABLED
                ? "relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent_0,black_24px,black_calc(100%-24px),transparent_100%)]"
                : "relative min-w-0 flex-1 overflow-hidden"
            }
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
                {Array.from({ length: repeat }, (_, r) =>
                  visible.map((a, i) =>
                    // Only the first copy is reachable by keyboard; the rest
                    // are visual padding and must not add tab stops.
                    renderItem(a, `a-${r}-${i}`, r === 0),
                  ),
                )}
              </div>

              {shouldAnimate && (
                <div aria-hidden="true" className="flex shrink-0 items-center">
                  {Array.from({ length: repeat }, (_, r) =>
                    visible.map((a, i) => renderItem(a, `b-${r}-${i}`, false)),
                  )}
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
