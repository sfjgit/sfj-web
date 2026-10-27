"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  HeartHandshake,
  Images,
  PartyPopper,
  Sparkles,
  X,
  type LucideIcon,
} from "lucide-react";

// Layout follows nsdcindia.org/life-at-nsdc: a run of alternating
// text/photo blocks (icon, heading, sub-heading, two check-bullets and a
// "View Gallery" button), then a pull-quote and a closing statement. All
// photos are the existing /public/fac set.
// Full literal paths (not built from a number) so scripts/check-site.mjs
// can verify each one exists.

type Photo = { src: string; alt: string };

type CultureBlock = {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  points: { lead: string; text: string }[];
  // First two are shown in the block; the full list opens in the gallery.
  photos: Photo[];
};

const photo = (src: string, alt: string): Photo => ({ src, alt });

const BLOCKS: CultureBlock[] = [
  {
    id: "purpose",
    icon: Building2,
    title: "Purpose-Driven Culture",
    subtitle: "A workplace designed for collaboration and impact",
    points: [
      {
        lead: "Collaborate every day:",
        text: "Open floors and shared spaces keep trainers, recruiters and delivery teams a conversation away from each other.",
      },
      {
        lead: "Purpose in every project:",
        text: "Every batch we train and every role we fill is someone's next step forward — and that is what we show up for.",
      },
    ],
    photos: [
      photo("/fac/f1.jpeg", "The SFJBS team together in the office lobby"),
      photo("/fac/f7.jpeg", "The SFJBS open-plan office floor"),
      photo("/fac/f9.jpeg", "Colleagues across the SFJBS office floor"),
    ],
  },
  {
    id: "learning",
    icon: GraduationCap,
    title: "Learning & Capability Building",
    subtitle: "Continuous growth through lifelong learning",
    points: [
      {
        lead: "Learn without limits:",
        text: "Workshops, brainstorming sessions and internal training keep our people as sharp as the professionals we upskill.",
      },
      {
        lead: "Grow with purpose:",
        text: "Ideas are shared on the wall, debated at the table and turned into better programmes for our clients.",
      },
    ],
    photos: [
      photo("/fac/f2.jpeg", "Team members discussing ideas in a group workshop"),
      photo("/fac/f3.jpeg", "Colleagues working through a workshop exercise"),
      photo("/fac/f5.jpeg", "Team members presenting during a workshop"),
      photo("/fac/f6.jpeg", "A team session around the conference table"),
    ],
  },
  {
    id: "together",
    icon: PartyPopper,
    title: "Growing Together",
    subtitle: "Building connections. Inspiring growth.",
    points: [
      {
        lead: "Celebrate beyond work:",
        text: "From Independence Day to milestones big and small, we make time to celebrate as one team.",
      },
      {
        lead: "A culture of recognition:",
        text: "Wins are shared, effort is noticed and every contribution counts.",
      },
    ],
    photos: [
      photo("/fac/f8.jpeg", "Independence Day decorations in tricolour balloons"),
      photo("/fac/f9.jpeg", "Colleagues celebrating Independence Day at the office"),
      photo("/fac/f7.jpeg", "The office decorated for Independence Day"),
    ],
  },
  {
    id: "inclusion",
    icon: Sparkles,
    title: "Inclusion That Goes Beyond Words",
    subtitle: "Where every voice matters and every individual belongs",
    points: [
      {
        lead: "Celebrating people & perspectives:",
        text: "Festivals from across India are celebrated together, at the office and from wherever our people are.",
      },
      {
        lead: "A culture of respect & belonging:",
        text: "Different backgrounds, one team — everyone has a seat at the table.",
      },
    ],
    photos: [
      photo("/fac/f12.jpeg", "Colleagues celebrating Diwali with candles"),
      photo("/fac/f13.jpeg", "The team lighting candles together for Diwali"),
      photo("/fac/f14.jpeg", "Team members celebrating Diwali at the office"),
      photo("/fac/f11.jpeg", "Team members sharing Diwali wishes"),
      photo("/fac/f15.jpeg", "A Diwali greetings collage from the team"),
    ],
  },
  {
    id: "wellbeing",
    icon: HeartHandshake,
    title: "Well-being & Togetherness",
    subtitle: "Supporting balance, health and everyday well-being",
    points: [
      {
        lead: "Step away to recharge:",
        text: "Team outings and offsites give everyone room to rest, reset and get to know each other outside work.",
      },
      {
        lead: "Thrive together:",
        text: "A team that looks out for each other does its best work — for each other and for our learners.",
      },
    ],
    photos: [
      photo("/fac/f14.jpeg", "Team members spending time together"),
    ],
  },
];

const Gallery = ({
  photos,
  title,
  startIndex,
  onClose,
}: {
  photos: Photo[];
  title: string;
  startIndex: number;
  onClose: () => void;
}) => {
  const [index, setIndex] = useState(startIndex);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + photos.length) % photos.length),
    [photos.length],
  );
  const next = useCallback(
    () => setIndex((i) => (i + 1) % photos.length),
    [photos.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose, prev, next]);

  const current = photos[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} gallery`}
      className="fixed inset-0 z-[60] flex flex-col bg-slate-950/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-4 py-4 text-white sm:px-8">
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-xs text-white/60">
            {index + 1} / {photos.length}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center px-4 sm:px-20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-full max-h-[70vh] w-full max-w-5xl">
          <Image
            key={current.src}
            src={current.src}
            alt={current.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-contain"
          />
        </div>
        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-2 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 sm:left-6"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next photo"
              className="absolute right-2 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 sm:right-6"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
      </div>

      <p className="px-4 pt-3 text-center text-sm text-white/80">
        {current.alt}
      </p>

      <div
        className="flex justify-center gap-2 overflow-x-auto px-4 py-4"
        onClick={(e) => e.stopPropagation()}
      >
        {photos.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show photo ${i + 1}`}
            className={`relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-md transition ${
              i === index ? "ring-2 ring-white" : "opacity-50 hover:opacity-90"
            }`}
          >
            <Image
              src={p.src}
              alt=""
              fill
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

const Block = ({
  block,
  reverse,
  onOpenGallery,
}: {
  block: CultureBlock;
  reverse: boolean;
  onOpenGallery: (startIndex: number) => void;
}) => {
  const Icon = block.icon;
  const [main, secondary] = block.photos;

  return (
    <section
      id={block.id}
      className={`py-16 sm:py-20 ${reverse ? "bg-slate-50" : "bg-white"}`}
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className={reverse ? "lg:order-2" : ""}>
          <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Icon className="h-6 w-6" />
          </div>
          <h2
            className="text-3xl font-bold text-slate-900 sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {block.title}
          </h2>
          <p className="mt-3 text-lg font-medium text-blue-600">
            {block.subtitle}
          </p>
          <ul className="mt-6 space-y-4">
            {block.points.map((point) => (
              <li key={point.lead} className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.58l7.3-7.3a1 1 0 0 1 1.4 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <p className="leading-relaxed text-slate-600">
                  <span className="font-semibold text-slate-900">
                    {point.lead}
                  </span>{" "}
                  {point.text}
                </p>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => onOpenGallery(0)}
            className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-slate-900 px-6 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-900 hover:text-white"
          >
            <Images className="h-4 w-4" />
            View Gallery
          </button>
        </div>

        <div
          className={`relative pb-10 sm:pb-12 ${reverse ? "lg:order-1" : ""} ${
            secondary ? "pr-10 sm:pr-16" : ""
          }`}
        >
          <button
            type="button"
            onClick={() => onOpenGallery(0)}
            aria-label={`Open ${block.title} gallery`}
            className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl"
          >
            <Image
              src={main.src}
              alt={main.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </button>
          {secondary && (
            <button
              type="button"
              onClick={() => onOpenGallery(1)}
              aria-label={`Open ${block.title} gallery`}
              className="group absolute bottom-0 right-0 block aspect-square w-2/5 overflow-hidden rounded-2xl border-4 border-white shadow-xl"
            >
              <Image
                src={secondary.src}
                alt={secondary.alt}
                fill
                sizes="240px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

const LifeAtSfjbs = () => {
  const [gallery, setGallery] = useState<{
    block: CultureBlock;
    startIndex: number;
  } | null>(null);
  const closeGallery = useCallback(() => setGallery(null), []);

  return (
    <div className="bg-white" style={{ fontFamily: "var(--font-body)" }}>
      {/* Hero */}
      <section className="relative flex min-h-[28rem] w-full flex-col justify-end overflow-hidden bg-slate-900 px-4 pb-14 pt-32 sm:min-h-[34rem] sm:px-6 lg:min-h-[40rem] lg:px-8">
        <Image
          src="/fac/f1.jpeg"
          alt="The SFJBS team together in the office lobby"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
        <div className="relative mx-auto w-full max-w-6xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-blue-200">
            SFJ Business Solutions · Our Culture
          </p>
          <h1
            className="mt-3 text-white"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              lineHeight: 1.05,
            }}
          >
            Life at SFJBS
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Where celebrations are a way of life and our people are the
            foundation of everything we build.
          </p>
        </div>
      </section>

      {BLOCKS.map((block, i) => (
        <Block
          key={block.id}
          block={block}
          reverse={i % 2 === 1}
          onOpenGallery={(startIndex) => setGallery({ block, startIndex })}
        />
      ))}

      {/* Pull-quote */}
      <section className="bg-slate-900 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p
            className="text-3xl font-bold leading-tight sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            SFJBS is not just a workplace — it&apos;s a community.
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/75">
            Here, you will find purpose in your projects, pride in your
            progress, and joy in the journey.
          </p>
          <p className="mt-4 text-lg font-semibold text-blue-200">
            Be part of something bigger, bolder, and full of heart.
          </p>
        </div>
      </section>

      {/* Closing statement */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <h2
              className="text-3xl font-bold text-slate-900 sm:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Life at SFJBS
            </h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600" />
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              At SFJBS, every role contributes to one goal: building
              future-ready talent for the organisations, institutions and
              communities we work with. Our values — collaboration, continuous
              learning and respect for every individual — shape how we work with
              each other every day.
            </p>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl">
            <Image
              src="/fac/f6.jpeg"
              alt="A team session around the conference table"
              fill
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {gallery && (
        <Gallery
          photos={gallery.block.photos}
          title={gallery.block.title}
          startIndex={gallery.startIndex}
          onClose={closeGallery}
        />
      )}
    </div>
  );
};

export default LifeAtSfjbs;
