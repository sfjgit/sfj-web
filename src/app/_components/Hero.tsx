"use client";
import React, { useCallback, useState } from "react";

// hero-1.webm has its own baked-in title card ("AI Skilled Talent,
// Engineered at Scale") burned into the footage — that used to clash with
// the heading text overlaid on top, so it was left out of the rotation.
// Now that the hero has no text overlay at all, it's back in and plays first.
const BACKGROUND_VIDEOS = [
  "/home-hero/hero-1.webm",
  "/home-hero/hero-2.webm",
  "/home-hero/hero-3.webm",
  "/home-hero/hero-4.webm",
  "/home-hero/hero-5.webm",
  "/home-hero/hero-6.webm",
];

// Pure visual hero: no headings, copy or buttons — just the full-bleed
// background video, cycling one clip at a time (advancing to the next,
// looping back to the first, whenever the current one finishes playing).
const HeroCarousel = () => {
  const [videoIndex, setVideoIndex] = useState(0);
  const advanceVideo = useCallback(() => {
    setVideoIndex((i) => (i + 1) % BACKGROUND_VIDEOS.length);
  }, []);

  return (
    <div className="relative overflow-hidden border-b bg-black h-[calc(100dvh-60px)] sm:h-[calc(100dvh-100px)] lg:h-[calc(100dvh-100px)] min-h-[32.5rem] max-h-[53.125rem] transition-all duration-500">
      {/* `key` forces a fresh <video> per clip so autoPlay reliably fires
          on source change. */}
      <video
        key={videoIndex}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={advanceVideo}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={BACKGROUND_VIDEOS[videoIndex]} type="video/webm" />
      </video>
      <div className="absolute inset-0 bg-black/25 sm:bg-black/15" />
    </div>
  );
};

export default HeroCarousel;
