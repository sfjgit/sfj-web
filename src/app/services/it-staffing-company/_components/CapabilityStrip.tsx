/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";

// How long each card stays active before the strip advances, and how long the
// logo row takes to travel one full set. Both are referenced by the inline
// keyframes below, so changing them here changes the animation too.
const CYCLE_MS = 6000;
const LOGO_SCROLL_SECONDS = 40;

const AGENTIC_LOGOS = [
  "Antropic.svg",
  // Filename really does carry a double dot.
  "bedrock..svg",
  "llamaindex-text.svg",
  "Langchain (2).svg",
  "googlegemini.svg",
  "Milvus--Streamline-Svg-Logos.svg",
  "nvidia.svg",
  "openai.svg",
  "Pinecone.svg",
  "Vertex_AI_Logo.svg",
  "weaviate.svg",
].map((file) => `/Taas/Agentic Ai & Gen Ai/${file}`);

const APP_ENGINEERING_LOGOS = [
  "angular.svg",
  "dotnet.svg",
  "github.svg",
  "Java.svg",
  "nodedotjs.svg",
  "python (1).svg",
  "react.svg",
  "spring.svg",
].map(
  (file) =>
    `/Taas/Agentic Ai & Gen Ai/Application Engineering & Full Stack/${file}`,
);

const CLOUD_DEVOPS_LOGOS = [
  "aws (1).svg",
  "docker.svg",
  "gitlab.svg",
  "googlecloud.svg",
  "kubernetes.svg",
  "microsoft-azure.svg",
  "redhat.svg",
  "terraform.svg",
].map(
  (file) => `/Taas/Agentic Ai & Gen Ai/Cloud DevOps & Platform Eng/${file}`,
);

const DATA_AI_LOGOS = [
  "apachekafka.svg",
  "apachespark.svg",
  "databricks.svg",
  "microsoft-power-bi.svg",
  "qlik.svg",
  "snowflake.svg",
  "tableau.svg",
].map(
  (file) =>
    `/Taas/Agentic Ai & Gen Ai/Data Engineering, AI & Analytics/${file}`,
);

const ENTERPRISE_APP_LOGOS = [
  "adobe.svg",
  "Logo (1).svg",
  "Microsoft_Dynamics_365_Logo_(2021–present).svg",
  "oracle.svg",
  "salesforce.svg",
  "sap (1).svg",
  "Workday_2024_logo.svg",
  "zoho.svg",
].map((file) => `/Taas/Agentic Ai & Gen Ai/Enterprise Application/${file}`);

const CYBERSECURITY_LOGOS = [
  "cisco.svg",
  "CrowdStrike_logo.svg",
  "Cyberark-logo-dark.svg",
  "fortinet.svg",
  "microsoft (1).svg",
  "paloaltonetworks.svg",
  "splunk.svg",
  "zscaler-logo.svg",
].map((file) => `/Taas/Agentic Ai & Gen Ai/Cybersecurity/${file}`);

const TESTING_LOGOS = [
  "apachejmeter.svg",
  "appium.svg",
  "cypress.svg",
  "opentext.svg",
  "playwright.svg",
  "postman.svg",
  "selenium.svg",
  "tricentis.svg",
].map(
  (file) =>
    `/Taas/Agentic Ai & Gen Ai/Testing & Quality Engineering/${file}`,
);

// Folder name is misspelled on disk ("devolopment") — referenced as-is.
const MOBILE_LOGOS = [
  "android.svg",
  "dotnet (1).svg",
  "firebase.svg",
  "flutter.svg",
  "ios.svg",
  "kotlin.svg",
  "react (1).svg",
  "swift.svg",
].map(
  (file) =>
    `/Taas/Agentic Ai & Gen Ai/Mobile Application devolopment/${file}`,
);

const INTEGRATION_LOGOS = [
  "Boomi-logo-no-tagline.svg",
  "IBM_logo.svg",
  "Microsoft_Power_Automate.svg",
  "MuleSoft Logo.png",
  "oracle (1).svg",
  "sap (2).svg",
  "uipath.svg",
  "WSO2-Logo-Black.svg",
].map((file) => `/Taas/Agentic Ai & Gen Ai/Integration & Automation/${file}`);

const DATA_CENTER_LOGOS = [
  "dell.svg",
  "IBM_logo (1).svg",
  "logo-lm.svg",
  "netapp.svg",
  "nutanix.svg",
  "Pure-storage-vector-logo.svg",
  "redhat (1).svg",
  "veeam.svg",
].map(
  (file) => `/Taas/Agentic Ai & Gen Ai/Data Center & Infrastructure/${file}`,
);

// One entry per card. `logos` drives the row underneath — swap the empty
// arrays for real paths as each capability's logo set lands.
export const capabilityCards: {
  id: string;
  title: string;
  logos: string[];
  video?: string;
}[] = [
  {
    id: "agentic-ai",
    title: "Agentic AI & Generative AI",
    logos: AGENTIC_LOGOS,
    video: "/Kaas/Ai Cube.mp4",
  },
  {
    id: "app-engineering",
    title: "Application Engineering & Full Stack",
    logos: APP_ENGINEERING_LOGOS,
    video:
      "/Taas/Agentic Ai & Gen Ai/vedios/Application Engineering & Full Stack.mp4",
  },
  {
    id: "cloud-devops",
    title: "Cloud, DevOps & Platform Engineering",
    logos: CLOUD_DEVOPS_LOGOS,
    video:
      "/Taas/Agentic Ai & Gen Ai/vedios/Cloud, DevOps & Platform Engineering.mp4",
  },
  {
    id: "data-ai",
    title: "Data Engineering, AI & Analytics",
    logos: DATA_AI_LOGOS,
    video: "/Taas/Agentic Ai & Gen Ai/vedios/Data Engineering, AI & Analytics.mp4",
  },
  {
    id: "enterprise-apps",
    title: "Enterprise Applications",
    logos: ENTERPRISE_APP_LOGOS,
    video: "/Taas/Agentic Ai & Gen Ai/vedios/Enterprise Applications.mp4",
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    logos: CYBERSECURITY_LOGOS,
    video: "/Taas/Agentic Ai & Gen Ai/vedios/Cybersecurity.mp4",
  },
  {
    id: "testing-qe",
    title: "Testing & Quality Engineering",
    logos: TESTING_LOGOS,
    video: "/Kaas/Ai 8.mp4",
  },
  {
    id: "mobile-apps",
    title: "Mobile Application Development",
    logos: MOBILE_LOGOS,
    video: "/Kaas/Ai9.mp4",
  },
  {
    id: "integration-automation",
    title: "Integration & Automation",
    logos: INTEGRATION_LOGOS,
    video: "/Taas/Agentic Ai & Gen Ai/vedios/Integration Automation.mp4",
  },
  {
    id: "data-center",
    title: "Data Center & Infrastructure",
    logos: DATA_CENTER_LOGOS,
    video:
      "/Taas/Agentic Ai & Gen Ai/vedios/Data Center & Infrastructure1.mp4",
  },
];

// Every logo is capped by the same height and width, then `object-contain`
// picks whichever limit it hits first — square icons fill the height, wide
// wordmarks fill the width. That alone equalises most of the set.
//
// The exceptions are files whose artboard carries padding around the mark
// (measured from each SVG's ink bounding box), so they render smaller than
// their neighbours at the same cap. Those get a scale nudge to compensate.
const LOGO_SCALE_OVERRIDES: Record<string, string> = {
  "Vertex_AI_Logo.svg": "scale-[1.3]", // ink is 68x78 inside a 100x100 board
  // These sit on square artboards with the mark occupying only a short band —
  // Milvus is 98x24 ink inside 100x100, LangChain 100x52. `object-contain`
  // fits the empty artboard, not the mark, so they render a fraction of the
  // size of the others. Scale is the ratio needed to bring the ink back up.
  "Milvus--Streamline-Svg-Logos.svg": "scale-[2.6]",
  "Langchain (2).svg": "scale-[1.7]",
  "weaviate.svg": "scale-[1.45]",
  "llamaindex-text.svg": "scale-[1.1]",
  "googlegemini.svg": "scale-105",
  "nvidia.svg": "scale-[1.25]",
  "bedrock..svg": "scale-105",
};

const logoScaleClass = (path: string) =>
  LOGO_SCALE_OVERRIDES[path.split("/").pop() ?? ""] ?? "";

const CapabilityStrip = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  // Bumped on every switch and used as the progress bar's key, so React
  // discards the half-filled bar and mounts a fresh one at 0%.
  const [cycle, setCycle] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const advanceTo = useCallback((index: number) => {
    setActiveIndex(index);
    setCycle((c) => c + 1);
  }, []);

  // Auto-advance. Re-created whenever `cycle` changes, which is what restarts
  // the countdown after a manual click instead of firing on the old schedule.
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % capabilityCards.length);
      setCycle((c) => c + 1);
    }, CYCLE_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [cycle]);

  // Below xl the ten cards can't all fit, so the row scrolls. Auto-advance
  // would otherwise move the highlight to a card that is off-screen and the
  // strip would look frozen — keep the active card centred in view. Scrolls
  // the row itself rather than using scrollIntoView, which would also drag
  // the whole page vertically.
  useEffect(() => {
    const row = rowRef.current;
    const card = cardRefs.current[activeIndex];
    if (!row || !card) return;
    if (row.scrollWidth <= row.clientWidth) return; // everything already fits

    row.scrollTo({
      left: Math.max(0, card.offsetLeft - (row.clientWidth - card.clientWidth) / 2),
      behavior: "smooth",
    });
  }, [activeIndex]);

  // All ten clips run together by design — the strip is meant to read as a
  // wall of live footage, not a slideshow. Autoplay can be refused (a tab
  // restored from bfcache, a browser that paused it while backgrounded), so
  // nudge any stalled video back into playing rather than leaving it frozen.
  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video?.paused) video.play().catch(() => {});
    });
  }, [activeIndex]);

  const activeCard = capabilityCards[activeIndex];
  // Duplicated once so the -50% travel loops with no visible seam.
  const marqueeLogos = [...activeCard.logos, ...activeCard.logos];

  return (
    <div className="relative mt-auto w-full max-w-[100rem] mx-auto space-y-2 sm:space-y-3 pt-5 sm:pt-8">
      {/* All ten boxes share the row width, so they grow with the screen
          instead of sitting at a fixed size and overflowing. Below xl they
          no longer fit, so the row scrolls: `snap-x` makes dragging land on
          a card, the padding gives the active card's scale-105 room to grow
          without being clipped by the scroll box, and the scrollbar is hidden
          because the strip sits on artwork. */}
      <div
        ref={rowRef}
        className="flex gap-2 sm:gap-3 overflow-x-auto overscroll-x-contain snap-x px-1 py-1.5 -mx-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {capabilityCards.map((card, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={card.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              type="button"
              onClick={() => advanceTo(i)}
              aria-pressed={isActive}
              className={`relative snap-center flex-1 basis-0 min-w-[10rem] sm:min-w-[9rem] lg:min-w-[8rem] aspect-video rounded-md overflow-hidden bg-white/90 flex items-center justify-center text-center px-2 text-gray-600 text-sm transition-transform duration-300 ${
                isActive
                  ? "border-2 border-blue-600 scale-105 z-10"
                  : "ring-1 ring-white/40"
              }`}
            >
              {card.video && (
                <>
                  <video
                    ref={(el) => {
                      videoRefs.current[i] = el;
                    }}
                    src={card.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  {/* Very light scrim — the title leans on its own shadow so
                      the footage stays visible. */}
                  <div className="absolute inset-0 bg-black/10" />
                </>
              )}

              <span
                className={`relative ${card.video ? "text-white font-normal text-[0.7rem] sm:text-[0.68rem] lg:text-[0.65rem] leading-tight px-1 line-clamp-4" : ""}`}
                style={
                  card.video
                    ? { textShadow: "0 1px 5px rgba(0,0,0,0.85)" }
                    : undefined
                }
              >
                {card.title}
              </span>

              {isActive && (
                <span
                  key={cycle}
                  className="absolute bottom-0 left-0 h-[3px] bg-blue-600"
                  style={{
                    animation: `capabilityProgress ${CYCLE_MS}ms linear forwards`,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Stacked on phones: a fixed 7rem caption column left the marquee under
          150px wide on a 375px screen, so the logos barely appeared before
          being masked out again. From sm up it returns to a single row. */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 pb-1">
        {/* Caption for the highlighted card, sitting in the logo row exactly
            as in the reference. */}
        <span
          className="flex-shrink-0 w-full sm:w-40 lg:w-48 text-white font-medium"
          style={{
            fontSize: "clamp(0.7rem, 1vw, 1.05rem)",
            textShadow: "0 2px 12px rgba(0,0,0,0.85)",
          }}
        >
          {activeCard.title}
        </span>

        {/* Keyed by card id: switching cards remounts the track, so the old
            logos never mix with the new set and the scroll starts over. */}
        {/* Same edge fade as the "Our Clients" strip — logos dissolve in and
            out instead of being cut off at the ends. */}
        <div
          className="relative flex-1 min-w-0 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          {marqueeLogos.length > 0 ? (
            <div
              key={activeCard.id}
              className="flex w-max"
              style={{
                animation: `capabilityLogoScroll ${LOGO_SCROLL_SECONDS}s linear infinite`,
                willChange: "transform",
                backfaceVisibility: "hidden",
              }}
            >
              {marqueeLogos.map((logo, i) => (
                <div
                  key={`${logo}-${i}`}
                  className="flex-shrink-0 w-24 sm:w-36 lg:w-44 h-11 sm:h-14 mx-4 sm:mx-6 lg:mx-8 flex items-center justify-center"
                >
                  <img
                    src={logo}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className={`max-h-12 max-w-full w-auto object-contain ${logoScaleClass(logo)}`}
                    // Flatten each mark to solid white so they read against
                    // the photo without their own plate behind them.
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div key={activeCard.id} className="flex gap-3">
              {Array.from({ length: 9 }, (_, i) => (
                <div
                  key={i}
                  className="flex-1 basis-0 min-w-[8rem] h-12 rounded-md bg-white/90 ring-1 ring-white/40 flex items-center justify-center text-gray-500 text-xs"
                >
                  Logo
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default CapabilityStrip;
