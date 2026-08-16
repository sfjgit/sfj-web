"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Link from "next/link";
import { ArrowRight, Pause, Play } from "lucide-react";
import { trackCtaClick } from "@/lib/analytics";

// hero-1.webm has its own baked-in title card ("AI Skilled Talent,
// Engineered at Scale") burned into the footage. It's back in and plays
// first, but the text overlay below is hidden for just that first video
// (see TEXT_STARTS_AT_VIDEO) so it never overlaps that baked-in caption.
const BACKGROUND_VIDEOS = [
  "/home-hero/hero-1.webm",
  "/home-hero/hero-2.webm",
  "/home-hero/hero-3.webm",
  "/home-hero/hero-4.webm",
  "/home-hero/hero-5.webm",
  "/home-hero/hero-6.webm",
];

// The overlay carousel only becomes visible once the background video has
// advanced to this index (0-based) — i.e. hero-1 plays with no text, and
// the heading/subheading start appearing from hero-2 on.
const TEXT_STARTS_AT_VIDEO = 1;

// Explicit video-index → text-slide-key mapping, keyed by BACKGROUND_VIDEOS
// index. This makes the correspondence a direct lookup instead of an
// accumulated "advance by one" count, which could drift out of sync.
// hero-1 (index 0) has no entry since the text overlay is hidden then.
const VIDEO_TO_SLIDE_KEY: Record<number, string> = {
  1: "enterprise", // hero-2
  2: "institutional", // hero-3
  3: "government", // hero-4
  4: "csr", // hero-5
  5: "ai-consulting", // hero-6
};

const TEXT_SHADOW = "0 2px 14px rgba(0,0,0,0.85)";

// Dummy overlay copy for the 5 service categories — drafted via a
// 3-angle-then-synthesize pass, meant to be refined later. Cycles
// independently of the background video (5 slides vs. 6 videos don't
// divide evenly, so no attempt is made to sync them).
const SLIDES = [
  {
    key: "enterprise",
    eyebrow: "WHAT WE DO / ENTERPRISE SKILLING",
    heading: "Future-proof your workforce, starting now",
    subheading:
      "500+ enterprise and GCC teams upskilled in AI, cloud and emerging tech, closing capability gaps before they cost you delivery.",
    cta: "Upskill Your Team",
    href: "/services/corporate-it-training-programs",
  },
  {
    key: "institutional",
    eyebrow: "WHAT WE DO / INSTITUTIONAL SKILLING",
    heading: "Turn your campus into a talent engine",
    subheading:
      "Practical learning, industry certifications and placement support that turn campuses into career launchpads.",
    cta: "Partner With Us",
    href: "/services/institutional-training",
  },
  {
    key: "government",
    eyebrow: "WHAT WE DO / GOVERNMENT SKILLING",
    heading: "National missions, measurable employment outcomes",
    subheading:
      "Large-scale, outcome-driven skilling initiatives that convert public investment into job-ready citizens and real economic growth.",
    cta: "Explore Missions",
    href: "/services/government-initiatives",
  },
  {
    key: "csr",
    eyebrow: "WHAT WE DO / CSR SKILLING",
    heading: "Skills that turn potential into livelihoods",
    subheading:
      "Industry-aligned training and digital empowerment programs that move underserved communities from classroom to consistent income.",
    cta: "Drive Impact",
    href: "/services/corporate-social-responsibility",
  },
  {
    key: "ai-consulting",
    eyebrow: "WHAT WE DO / AI CONSULTING",
    heading: "Make your enterprise AI-ready, today",
    subheading:
      "Build the AI strategy, skills and systems your business needs to move from pilots to real transformation.",
    cta: "Go AI-Ready",
    href: "/contact?type=ai-consulting",
  },
];

const HeroCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();

  // Full-bleed background video: one clip at a time, advancing to the next
  // (looping back to the first) whenever the current one finishes playing.
  const [videoIndex, setVideoIndex] = useState(0);
  const advanceVideo = useCallback(() => {
    setVideoIndex((prev) => (prev + 1) % BACKGROUND_VIDEOS.length);
  }, []);

  /**
   * A11-05 — WCAG 2.2.2 (Pause, Stop, Hide). This hero starts moving
   * automatically and never stops: the video advances on `ended` and drags the
   * text carousel with it. Content that auto-animates for more than five
   * seconds has to be pausable, and visitors who have asked their OS for
   * reduced motion should not get it running at all.
   *
   * `paused` starts true under `prefers-reduced-motion: reduce` — the first
   * frame still shows, it just does not cycle — and the control below lets
   * anyone stop or restart it.
   */
  const [paused, setPaused] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = (reduce: boolean) => setPaused(reduce);
    apply(query.matches);
    const onChange = (e: MediaQueryListEvent) => apply(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Keep the actual <video> element in sync with the paused flag, including
  // when a new clip mounts.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (paused) video.pause();
    else void video.play().catch(() => {});
  }, [paused, videoIndex]);

  // Keep the text carousel's position an explicit function of videoIndex
  // (via VIDEO_TO_SLIDE_KEY) rather than nudging it forward by one on every
  // video change — a direct lookup can't drift out of sync the way an
  // accumulated "advance by one" count could.
  useEffect(() => {
    if (!api) return;
    const key = VIDEO_TO_SLIDE_KEY[videoIndex];
    if (!key) return;
    const slideIndex = SLIDES.findIndex((slide) => slide.key === key);
    if (slideIndex >= 0) api.scrollTo(slideIndex);
  }, [api, videoIndex]);

  return (
    <div className="relative overflow-hidden border-b bg-black h-[calc(100dvh-60px)] sm:h-[calc(100dvh-100px)] lg:h-[calc(100dvh-100px)] min-h-[32.5rem] max-h-[53.125rem] transition-all duration-500">
      {/* `key` forces a fresh <video> per clip so autoPlay reliably fires
          on source change. */}
      <video
        key={videoIndex}
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        onEnded={advanceVideo}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={BACKGROUND_VIDEOS[videoIndex]} type="video/webm" />
      </video>
      <div className="absolute inset-0 bg-black/40 sm:bg-black/25" />

      {/* Pause / play for the auto-advancing background — WCAG 2.2.2. */}
      <button
        type="button"
        onClick={() => setPaused((v) => !v)}
        aria-label={
          paused
            ? "Play background animation"
            : "Pause background animation"
        }
        aria-pressed={paused}
        className="absolute bottom-4 right-4 z-20 rounded-full bg-black/50 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {paused ? (
          <Play className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Pause className="h-4 w-4" aria-hidden="true" />
        )}
      </button>

      <div
        className={`relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 pt-14 sm:pt-16 pb-0 h-full flex items-center transition-opacity duration-700 ${
          videoIndex >= TEXT_STARTS_AT_VIDEO
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <Carousel
          setApi={setApi}
          orientation="vertical"
          className="relative w-full h-full"
          opts={{
            align: "start",
            loop: true,
            duration: 22,
          }}
        >
          <CarouselContent className="h-full mt-0">
            {SLIDES.map((slide) => (
              <CarouselItem
                key={slide.key}
                className="h-full pt-0 flex flex-col justify-center "
              >
                <div className="max-w-7xl  w-full -translate-y-18 sm:-translate-y-24 lg:-translate-y-30">
                  {/* Eyebrow breadcrumb, styled after the reference — small
                      letter-spaced label with a thin rule extending beside it. */}
                  <div
                    className="flex items-center gap-3 mb-5"
                    style={{ textShadow: TEXT_SHADOW }}
                  >
                    <span className="text-[11px] sm:text-xs tracking-[0.2em] uppercase font-semibold text-white/90 whitespace-nowrap">
                      {slide.eyebrow}
                    </span>
                    <span className="h-px w-10 sm:w-16 bg-white/40" />
                  </div>

                  {/* Forced onto one line each via whitespace-nowrap — the
                      font size is driven almost entirely by viewport width
                      (vw) rather than a fixed rem, since these are long,
                      unedited sentences that still have to fit edge to edge
                      without wrapping on any screen size. */}
                  <h2
                    className="text-white font-bold leading-tight mb-4"
                    style={{
                      fontSize: "clamp(1rem, 4.2vw, 3.25rem)",
                      textShadow: TEXT_SHADOW,
                    }}
                  >
                    {slide.heading}
                  </h2>

                  <p
                    className="text-slate-100 leading-relaxed mb-6"
                    style={{
                      fontSize: "clamp(0.625rem, 1.7vw, 1.05rem)",
                      textShadow: TEXT_SHADOW,
                    }}
                  >
                    {slide.subheading}
                  </p>
                  <Link
                    href={slide.href}
                    // AN-01: each hero CTA reports which of the five revenue
                    // lines it belongs to, so homepage traffic can be split by
                    // service line instead of landing in one bucket.
                    onClick={() =>
                      trackCtaClick({
                        label: slide.cta,
                        serviceLine: slide.key,
                        destination: slide.href,
                      })
                    }
                    className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-gray-100 text-sm"
                  >
                    {slide.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* No prev/next controls: this carousel is driven by the background
              video (see the videoIndex effect above), so a manual jump would
              be overridden on the next clip change. The vertical variant also
              placed the "previous" arrow at -top-12, which floated it over
              the hero beside the navbar. Pausing is handled by the WCAG
              control on the hero itself. */}
        </Carousel>
      </div>
    </div>
  );
};

export default HeroCarousel;
