/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

// Blur-to-focus + swipe-up reveal entrance animation. Replays every time
// `active` flips true — resets both properties instantly (no transition)
// then re-applies them a frame later via double rAF so the reset never
// gets coalesced into the animated transition by the browser.
//
// `src` is only ever attached to the <img> once the slide has been active
// at least once (tracked via `hasLoaded`) — this stops the browser from
// fetching/decoding every reveal image on first paint just because it's
// mounted somewhere off-screen in the carousel.
const RevealImage = ({
  src,
  alt,
  className,
  active,
  delayMs = 0,
  maskColor = "#eaf6f0",
}: {
  src: string;
  alt: string;
  className?: string;
  active: boolean;
  delayMs?: number;
  maskColor?: string;
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (active && !hasLoaded) setHasLoaded(true);
  }, [active, hasLoaded]);

  useEffect(() => {
    const img = imgRef.current;
    const mask = maskRef.current;
    if (!img || !mask) return;

    // Snap back to the starting state with no transition.
    img.style.transition = "none";
    img.style.filter = "blur(12px)";
    img.style.opacity = "0.4";
    mask.style.transition = "none";
    mask.style.transform = "translateY(0%)";

    // An off-screen slide keeps no blur layer alive — a permanently blurred
    // full-size image is expensive to composite even when it isn't visible.
    if (!active) {
      img.style.visibility = "hidden";
      img.style.willChange = "auto";
      return;
    }

    img.style.visibility = "visible";
    img.style.willChange = "filter, opacity";

    // Double rAF: let the browser paint the reset frame first, then
    // switch on the transitions and animate to the final state.
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        img.style.transition = `filter 0.7s ease ${delayMs}ms, opacity 0.7s ease ${delayMs}ms`;
        img.style.filter = "blur(0px)";
        img.style.opacity = "1";
        mask.style.transition = `transform 0.6s cubic-bezier(0.65, 0, 0.35, 1) ${delayMs}ms`;
        mask.style.transform = "translateY(-100%)";
      });
    });

    // Once settled, drop the filter entirely so nothing stays promoted.
    const done = setTimeout(() => {
      img.style.filter = "none";
      img.style.willChange = "auto";
    }, delayMs + 800);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(done);
    };
  }, [active, delayMs]);

  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <img
        ref={imgRef}
        src={hasLoaded ? src : undefined}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="block w-full h-auto"
        style={{ filter: "blur(12px)", opacity: 0.4, visibility: "hidden" }}
      />
      <div
        ref={maskRef}
        className="absolute inset-0"
        style={{ backgroundColor: maskColor, transform: "translateY(0%)" }}
      />
    </div>
  );
};

// The "Hero section.svg" artwork is one flat composite, so the two info
// cards baked into it can't be animated as separate files. Instead the base
// image is masked to punch those two card rectangles out, and a copy of the
// same artwork — masked to show only one card — is layered back on top and
// animated in. Coordinates are in the SVG's own 666x575 viewBox units (they
// match the card <rect>s in the file, padded a little for their shadows).
const HERO_SVG_VIEWBOX = { w: 666, h: 575 };
const HERO_CARD_RECTS = [
  { x: 50, y: 257, w: 218, h: 134 }, // "Learn essential career and life skills"
  { x: 172, y: 461, w: 218, h: 103 }, // "This course in high demand?"
];

const svgMask = (inner: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${HERO_SVG_VIEWBOX.w} ${HERO_SVG_VIEWBOX.h}'>${inner}</svg>`,
  )}")`;

// Full artwork with both card rectangles cut out (even-odd makes the holes).
const HERO_BASE_MASK = svgMask(
  `<path fill-rule='evenodd' d='M0 0h${HERO_SVG_VIEWBOX.w}v${HERO_SVG_VIEWBOX.h}H0Z ${HERO_CARD_RECTS.map(
    (r) => `M${r.x} ${r.y}h${r.w}v${r.h}h-${r.w}Z`,
  ).join(" ")}'/>`,
);

const HERO_CARD_MASKS = HERO_CARD_RECTS.map((r) =>
  svgMask(`<rect x='${r.x}' y='${r.y}' width='${r.w}' height='${r.h}'/>`),
);

const maskStyle = (mask: string) => ({
  maskImage: mask,
  WebkitMaskImage: mask,
  maskSize: "100% 100%",
  WebkitMaskSize: "100% 100%",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
});

// One card sliced out of the composite: blur-to-focus on the artwork plus a
// swipe-up colour mask over just that card's rectangle — same entrance as
// RevealImage on the "Transform Talent" slide.
//
// Same lazy-src treatment as RevealImage: the underlying artwork only gets
// attached to the <img> once this card has actually been active at least
// once, instead of decoding it the moment the carousel mounts.
const HeroCardReveal = ({
  src,
  mask,
  rect,
  active,
  delayMs,
  maskColor,
}: {
  src: string;
  mask: string;
  rect: { x: number; y: number; w: number; h: number };
  active: boolean;
  delayMs: number;
  maskColor: string;
}) => {
  const ref = useRef<HTMLImageElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (active && !hasLoaded) setHasLoaded(true);
  }, [active, hasLoaded]);

  useEffect(() => {
    const img = ref.current;
    const wipe = wipeRef.current;
    if (!img || !wipe) return;

    img.style.transition = "none";
    img.style.filter = "blur(12px)";
    img.style.opacity = "0.4";
    wipe.style.transition = "none";
    wipe.style.transform = "translateY(0%)";

    if (!active) {
      img.style.visibility = "hidden";
      img.style.willChange = "auto";
      return;
    }

    img.style.visibility = "visible";
    img.style.willChange = "filter, opacity";

    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        img.style.transition = `filter 0.7s ease ${delayMs}ms, opacity 0.7s ease ${delayMs}ms`;
        img.style.filter = "blur(0px)";
        img.style.opacity = "1";
        wipe.style.transition = `transform 0.6s cubic-bezier(0.65, 0, 0.35, 1) ${delayMs}ms`;
        wipe.style.transform = "translateY(-100%)";
      });
    });

    const done = setTimeout(() => {
      img.style.filter = "none";
      img.style.willChange = "auto";
    }, delayMs + 800);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(done);
    };
  }, [active, delayMs]);

  // The wipe box tracks the card's rectangle as a % of the artwork.
  const box = {
    left: `${(rect.x / HERO_SVG_VIEWBOX.w) * 100}%`,
    top: `${(rect.y / HERO_SVG_VIEWBOX.h) * 100}%`,
    width: `${(rect.w / HERO_SVG_VIEWBOX.w) * 100}%`,
    height: `${(rect.h / HERO_SVG_VIEWBOX.h) * 100}%`,
  };

  return (
    <>
      <img
        ref={ref}
        src={hasLoaded ? src : undefined}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute top-0 left-0 w-full h-auto pointer-events-none"
        style={{
          ...maskStyle(mask),
          filter: "blur(12px)",
          opacity: 0.4,
          visibility: "hidden",
        }}
      />
      <div className="absolute overflow-hidden pointer-events-none" style={box}>
        <div
          ref={wipeRef}
          className="absolute inset-0"
          style={{ backgroundColor: maskColor, transform: "translateY(0%)" }}
        />
      </div>
    </>
  );
};

// One entry per slide, in slide order. Every slide currently uses a flat
// colour background; a slide backed by a mesh video would name its file here
// at that slide's index instead of `null`.
const slideVideos: (string | null)[] = [null, null, null, null, null];

// Flat background per slide, keyed by slide index.
const staticSlideColors: Record<number, string> = {
  0: "#eaf6f0",
  1: "#ddeefe",
  2: "#f7f7f7",
  3: "#fae6df",
  4: "#F4F6FF",
};

const HeroCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveredRef = useRef(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  // Only the current slide's video and its immediate neighbours are ever
  // mounted. Downloading all of them up front is what made the hero stall on
  // first paint; once a video has been loaded it stays mounted so revisiting
  // a slide is still instant.
  const [loadedVideos, setLoadedVideos] = useState<number[]>([0]);

  useEffect(() => {
    setLoadedVideos((prev) => {
      const next = new Set(prev);
      [activeIndex - 1, activeIndex, activeIndex + 1].forEach((i) => {
        if (i >= 0 && i < slideVideos.length) next.add(i);
      });
      return next.size === prev.length ? prev : Array.from(next);
    });
  }, [activeIndex]);

  // Keep only the active slide's video playing; the rest stay loaded and
  // paused so switching slides is instant, with no stutter or reload flash.
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeIndex) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeIndex]);

  // Optimized autoplay function
  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (api && !isHoveredRef.current) {
        api.scrollNext();
      }
    }, 3000);
  }, [api]);

  // Fixed: this previously had its body commented out, meaning autoplay
  // never actually paused on hover — the interval kept firing underneath
  // whatever the user was doing, which is a common cause of felt "lag".
  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Handle mouse events
  const handleMouseEnter = useCallback(() => {
    isHoveredRef.current = true;
    stopAutoplay();
  }, [stopAutoplay]);

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
    startAutoplay();
  }, [startAutoplay]);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setActiveIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api) return;

    // Start autoplay
    startAutoplay();

    // Add event listeners
    const carouselElement = api.rootNode();
    carouselElement.addEventListener("mouseenter", handleMouseEnter);
    carouselElement.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup
    return () => {
      stopAutoplay();
      carouselElement.removeEventListener("mouseenter", handleMouseEnter);
      carouselElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [api, startAutoplay, stopAutoplay, handleMouseEnter, handleMouseLeave]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAutoplay();
    };
  }, [stopAutoplay]);

  // No top padding on this root: it would offset the slides downward while
  // they still size to h-full, leaving the bottom-aligned artwork floating
  // above the section's real bottom edge. Each slide carries its own top
  // padding instead.
  return (
    <div className="relative overflow-hidden border-b bg-black h-[calc(100dvh-60px)] sm:h-[calc(100dvh-100px)] lg:h-[calc(100dvh-100px)] min-h-[32.5rem] max-h-[53.125rem] transition-all duration-500">
      {slideVideos.map((src, index) =>
        src && loadedVideos.includes(index) ? (
          <video
            key={src}
            ref={(el) => {
              videoRefs.current[index] = el;
            }}
            autoPlay={index === 0}
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
            style={{ opacity: activeIndex === index ? 1 : 0 }}
          >
            <source src={src} type="video/webm" />
          </video>
        ) : null,
      )}

      {/* Extra static-color slide backgrounds */}
      {Object.entries(staticSlideColors).map(([index, color]) => (
        <div
          key={color}
          className="absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out"
          style={{
            backgroundColor: color,
            opacity: activeIndex === Number(index) ? 1 : 0,
          }}
        />
      ))}

      <Carousel
        setApi={setApi}
        orientation="vertical"
        className="relative z-10 w-full h-full"
        opts={{
          align: "start",
          loop: true,
          duration: 22,
        }}
      >
        <CarouselContent className="h-full mt-0">
          <CarouselItem className="h-full pt-0">
            <div className="h-full w-full">
              <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 pt-14 sm:pt-16 pb-0 h-full">
                <div className="grid grid-rows-[auto_minmax(0,1fr)] lg:grid-rows-1 lg:grid-cols-2 gap-4 lg:gap-8 h-full items-stretch">
                  <div className="space-y-3 sm:space-y-5 pt-4 lg:pt-10 pb-4 lg:pb-8 flex flex-col justify-center xl:-ml-10 2xl:-ml-20 max-w-full">
                    <h2 className="text-gray-900 font-bold leading-tight" style={{ fontSize: "clamp(1.5rem, 2.6vw, 3rem)" }}>
                      Transform Talent into High Performing Enterprise Workforce
                    </h2>
                    <p className="text-gray-700 leading-relaxed max-w-lg" style={{ fontSize: "clamp(0.875rem, 0.95vw, 1.05rem)" }}>
                      Drive organizational growth, foster leadership, and bridge
                      key capability gaps across tech, domain expertise, and
                      executive leadership through customized corporate learning
                      programs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <Link
                        href="/services/corporate-it-training-programs"
                        className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-center text-sm"
                      >
                        Explore Now
                      </Link>
                    </div>
                  </div>

                  <div className="relative h-full min-h-0 flex justify-end items-end pb-0">
                    <div className="relative w-full max-w-[min(15rem,30vh)] sm:max-w-[min(20rem,36vh)] lg:max-w-[min(28rem,44vh)]">
                      <img
                        src="/app/home/Kaas.svg"
                        alt="Learner using AI-powered learning platform"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto"
                      />
                      <RevealImage
                        src="/app/home/Certified Domain Expert.svg"
                        alt="Certified Domain Expert — 9+ years industry experience"
                        className="absolute top-[2%] left-1/2 -translate-x-1/2 w-[62%] max-w-[17.5rem] rounded-2xl drop-shadow-lg"
                        active={activeIndex === 0}
                        delayMs={0}
                      />
                      <RevealImage
                        src="/app/home/Market Demand.svg"
                        alt="Market Demand — learn essential career and new skills"
                        className="absolute top-[38%] -left-16 w-[58%] max-w-[16.25rem] rounded-2xl drop-shadow-lg"
                        active={activeIndex === 0}
                        delayMs={150}
                      />
                      <RevealImage
                        src="/app/home/AI Learning Coach.svg"
                        alt="AI Learning Coach generating a learning path"
                        className="absolute top-[55%] -right-20 w-[62%] max-w-[17.5rem] rounded-2xl drop-shadow-lg"
                        active={activeIndex === 0}
                        delayMs={300}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>

          <CarouselItem className="h-full pt-0">
            <div className="h-full w-full">
              <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 pt-14 sm:pt-16 pb-0 h-full">
                <div className="grid grid-rows-[auto_minmax(0,1fr)] lg:grid-rows-1 lg:grid-cols-2 gap-4 lg:gap-8 h-full items-stretch">
                  <div className="space-y-3 sm:space-y-5 pt-4 lg:pt-10 pb-4 lg:pb-8 flex flex-col justify-center xl:-ml-10 2xl:-ml-20 max-w-full">
                    <h2 className="text-gray-900 font-bold leading-tight" style={{ fontSize: "clamp(1.5rem, 2.6vw, 3rem)" }}>
                      Empowering Institutions to Build Industry Ready, Future
                      Ready Graduates
                    </h2>
                    <p className="text-gray-700 leading-relaxed max-w-2xl" style={{ fontSize: "clamp(0.875rem, 0.95vw, 1.05rem)" }}>
                      Helping institutions develop industry-ready graduates
                      through practical learning, emerging technology training,
                      industry certifications, internships, and placement
                      support.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <Link
                        href="/services/institutional-training"
                        className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-center text-sm"
                      >
                        Join Us
                      </Link>
                    </div>
                  </div>

                  <div className="relative h-full min-h-0 flex justify-end items-end pb-0 xl:-mr-12 2xl:-mr-24">
                    <div className="relative w-full max-w-[min(19rem,32vh)] sm:max-w-[min(26rem,40vh)] lg:max-w-[min(50rem,72vh)]">
                      <img
                        src="/app/home/Hero section.svg"
                        alt="Professional exploring career-ready courses with AI guidance"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto"
                        style={maskStyle(HERO_BASE_MASK)}
                      />
                      {HERO_CARD_MASKS.map((mask, i) => (
                        <HeroCardReveal
                          key={i}
                          src="/app/home/Hero section.svg"
                          mask={mask}
                          rect={HERO_CARD_RECTS[i]}
                          maskColor="#ddeefe"
                          active={activeIndex === 1}
                          delayMs={200 + i * 350}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>

          <CarouselItem className="h-full pt-0">
            <div className="h-full w-full">
              <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 pt-14 sm:pt-16 pb-0 h-full">
                <div className="grid grid-rows-[auto_minmax(0,1fr)] lg:grid-rows-1 lg:grid-cols-2 gap-4 lg:gap-8 h-full items-stretch">
                  <div className="space-y-3 sm:space-y-5 pt-4 lg:pt-10 pb-4 lg:pb-8 flex flex-col justify-center xl:-ml-10 2xl:-ml-20 max-w-full">
                    <h2 className="text-gray-900 font-bold leading-tight" style={{ fontSize: "clamp(1.5rem, 2.6vw, 3rem)" }}>
                      Scale Your Digital Capabilities with Agile
                      Talent-as-a-Service
                    </h2>
                    <p className="text-gray-700 leading-relaxed max-w-lg" style={{ fontSize: "clamp(0.875rem, 0.95vw, 1.05rem)" }}>
                      Access pre-vetted, project-ready professionals on demand.
                      Seamlessly integrate specialized tech talent, domain
                      experts, and project leads into your team without long
                      recruitment cycles or hiring overhead.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <Link
                        href="/services/talent-as-service"
                        className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-center text-sm"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>

                  <div className="relative h-full min-h-0 flex justify-center items-end pb-0 lg:mr-0 xl:mr-8">
                    <div className="relative w-full max-w-[min(11rem,23vh)] sm:max-w-[min(14rem,29vh)] lg:max-w-[min(17rem,36vh)] xl:max-w-[min(19rem,39vh)] translate-x-[15%]">
                      <img
                        src="/app/home/Taas Hero Section.svg"
                        alt="Pre-vetted professional ready to join your team"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto"
                      />
                      {/* Screening Complete — top right, overlapping the photo */}
                      <RevealImage
                        src="/app/home/Taas Hero Section E1.svg"
                        alt="Screening complete — top 3 candidates selected"
                        className="absolute top-[10%] left-[72%] w-[52%] max-w-[14.875rem]"
                        active={activeIndex === 2}
                        delayMs={0}
                        maskColor="#f7f7f7"
                      />
                      {/* Match Score — mid left */}
                      <RevealImage
                        src="/app/home/Taas Hero Section E3.svg"
                        alt="Match score 96 — AI-powered matching for faster, smarter hiring"
                        className="absolute top-[40%] left-[-25%] w-[63%] max-w-[15.3125rem]"
                        active={activeIndex === 2}
                        delayMs={150}
                        maskColor="#f7f7f7"
                      />
                      {/* AI Matching Engine — bottom right */}
                      <RevealImage
                        src="/app/home/Taas Hero Section E2.svg"
                        alt="AI matching engine searching best talent"
                        className="absolute top-[63%] left-[74%] w-[61%] max-w-[17.75rem]"
                        active={activeIndex === 2}
                        delayMs={300}
                        maskColor="#f7f7f7"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>

          <CarouselItem className="h-full pt-0">
            <div className="h-full w-full">
              <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 pt-14 sm:pt-16 pb-0 h-full">
                <div className="grid grid-rows-[auto_minmax(0,1fr)] lg:grid-rows-1 lg:grid-cols-2 gap-4 lg:gap-8 h-full items-stretch">
                  <div className="space-y-3 sm:space-y-5 pt-4 lg:pt-10 pb-4 lg:pb-8 flex flex-col justify-center xl:-ml-10 2xl:-ml-20 max-w-full">
                    <h2 className="text-gray-900 font-bold leading-tight" style={{ fontSize: "clamp(1.5rem, 2.6vw, 3rem)" }}>
                      Transforming CSR Investments into Sustainable Social
                      Impact
                    </h2>
                    <p className="text-gray-700 leading-relaxed max-w-lg" style={{ fontSize: "clamp(0.875rem, 0.95vw, 1.05rem)" }}>
                      We partner with organizations to deliver industry-aligned
                      skill development, digital empowerment, and employability
                      programs that create measurable social impact and
                      sustainable livelihood opportunities.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <Link
                        href="/services/corporate-social-responsibility"
                        className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-center text-sm"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>

                  <div className="relative h-full min-h-0 flex justify-end items-end pb-0 xl:-mr-6 2xl:-mr-12">
                    <RevealImage
                      src="/app/home/CSR Hero Section.svg"
                      alt="Communities empowered through CSR skilling programs"
                      className="relative w-full max-w-[min(17rem,30vh)] sm:max-w-[min(24rem,38vh)] lg:max-w-[min(35rem,70vh)] xl:max-w-[min(40rem,74vh)]"
                      active={activeIndex === 3}
                      maskColor="#fdede6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>

          <CarouselItem className="h-full pt-0">
            <div className="h-full w-full">
              <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 pt-14 sm:pt-16 pb-0 h-full">
                <div className="grid grid-rows-[auto_minmax(0,1fr)] lg:grid-rows-1 lg:grid-cols-2 gap-4 lg:gap-8 h-full items-stretch">
                  <div className="space-y-3 sm:space-y-5 pt-4 lg:pt-10 pb-4 lg:pb-8 flex flex-col justify-center xl:-ml-10 2xl:-ml-20 max-w-full">
                    <h2 className="text-gray-900 font-bold leading-tight" style={{ fontSize: "clamp(1.5rem, 2.6vw, 3rem)" }}>
                      Empowering Government Skill Development &amp; Public
                      Sector Missions
                    </h2>
                    <p className="text-gray-700 leading-relaxed max-w-2xl" style={{ fontSize: "clamp(0.875rem, 0.95vw, 1.05rem)" }}>
                      Partnering with public sector entities and government to
                      execute large-scale workforce transformation. We deliver
                      outcome-driven, industry-aligned skilling initiatives to
                      build future-ready public institutions and drive
                      national economic growth.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <Link
                        href="/services/government-initiatives"
                        className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-center text-sm"
                      >
                        Explore Programs
                      </Link>
                    </div>
                  </div>

                  {/* Centred rather than right-aligned: this artwork carries
                      ~16% transparent canvas on each side, so pinning the box
                      to the column's outer edge leaves the figure itself
                      stranded well short of it. */}
                  <div className="relative h-full min-h-0 flex justify-center items-end pb-0">
                    <RevealImage
                      src="/app/home/B2G 1.svg"
                      alt="Public sector workforce transformation programs"
                      className="relative w-full max-w-[min(15rem,28vh)] sm:max-w-[min(20rem,36vh)] lg:max-w-[min(27.5rem,56vh)] xl:max-w-[min(31.25rem,60vh)]"
                      active={activeIndex === 4}
                      maskColor="#F4F6FF"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="left-4 bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg" />
        <CarouselNext className="right-4 bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg" />
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
