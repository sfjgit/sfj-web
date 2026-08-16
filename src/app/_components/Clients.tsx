"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Users, Building2, Globe, Quote } from "lucide-react";
import { METRICS } from "@/config/site";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef } from "react";

interface RevealProps {
  children: React.ReactNode;
  delay?: number; // ms, how long to wait after entering the viewport
  className?: string;
  onVisible?: () => void; // fires the moment the reveal starts, e.g. to kick off a count-up in sync
  threshold?: number; // IntersectionObserver threshold, defaults to 0.3
}

// Fade-in + slide-up entrance. Fires once via IntersectionObserver, respects
// prefers-reduced-motion, and exposes onVisible so a child (like a count-up
// number) can start in sync with the slide rather than on its own timer.
const Reveal = ({
  children,
  delay = 0,
  onVisible,
  threshold = 0.3,
  className,
}: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const hasFired = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasFired.current) {
          hasFired.current = true;
          observer.disconnect();
          const fire = () => {
            setVisible(true);
            onVisible?.();
          };
          if (reducedMotion) {
            fire();
          } else {
            setTimeout(fire, delay);
          }
        }
      },
      { threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, reducedMotion, threshold]);

  return (
    <div
      ref={ref}
      className={className}
      style={
        reducedMotion
          ? undefined
          : {
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(28px)",
              transition:
                "opacity 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 800ms cubic-bezier(0.16, 1, 0.3, 1)",
              willChange: "opacity, transform",
            }
      }
    >
      {children}
    </div>
  );
};

// Count-up now takes a `start` flag instead of its own IntersectionObserver,
// so it can be triggered in sync with the card's Reveal animation.
// const AnimatedNumber = ({
//   target,
//   suffix = "+",
//   start,
// }: {
//   target: number;
//   suffix?: string;
//   start: boolean;
// }) => {
//   const [count, setCount] = useState(0);
//   const hasAnimated = React.useRef(false);

//   useEffect(() => {
//     if (!start || hasAnimated.current) return;
//     hasAnimated.current = true;
//     const duration = 1200;
//     const startTime = performance.now();
//     const step = (now: number) => {
//       const progress = Math.min((now - startTime) / duration, 1);
//       setCount(Math.round(progress * target));
//       if (progress < 1) requestAnimationFrame(step);
//     };
//     requestAnimationFrame(step);
//   }, [start, target]);

//   return (
//     <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
//       {count}
//       {suffix}
//     </div>
//   );
// };
const AnimatedNumber = ({
  target,
  suffix = "+",
  start,
}: {
  target: number;
  suffix?: string;
  start: boolean;
}) => {
  const [count, setCount] = useState(target);
  const hasAnimated = React.useRef(false);

  useEffect(() => {
    if (!start || hasAnimated.current) return;

    hasAnimated.current = true;

    const duration = 1200;
    const startTime = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);

      setCount(Math.round(progress * target));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [start, target]);

  return (
    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
      {count}
      {suffix}
    </div>
  );
};

const ClientsSection = () => {
  const [hoveredService, setHoveredService] = React.useState(0);

  const clientLogos = [
    {
      src: "/logo1/Accenture.svg",
      name: "Accenture",
      industry: "Consulting",
      description: "Leading technology consulting",
    },
    {
      src: "/logo1/Capgemini.svg",
      name: "Capgemini",
      industry: "Technology",
      description: "Digital transformation leader",
    },
    {
      src: "/logo1/HCL.svg",
      name: "HCL Technologies",
      industry: "IT Services",
      description: "Next-generation IT services",
    },
    {
      src: "/logo1/Wipro.svg",
      name: "Wipro",
      industry: "Technology",
      description: "Global IT consulting services",
      scale: 1.9,
    },
    {
      src: "/logo1/Sap.svg",
      name: "SAP",
      industry: "Software",
      description: "Enterprise software solutions",
    },
    {
      src: "/logo1/Cognizant.svg",
      name: "Cognizant",
      industry: "Software",
      description: "Enterprise software solutions",
    },
    {
      src: "/logo1/LTIMindtree.svg",
      name: "LTI Mindtree",
      industry: "Software",
      description: "Enterprise software solutions",
    },
    {
      src: "/logo1/Mphasis.svg",
      name: "Mphasis",
      industry: "Software",
      description: "Enterprise software solutions",
    },
    {
      src: "/logo1/NTT Data.svg",
      name: "NTT Data",
      industry: "Software",
      description: "Enterprise software solutions",
    },
    {
      src: "/logo1/Pwc.svg",
      name: "PWC",
      industry: "Software",
      description: "Enterprise software solutions",
      scale: 2,
    },
    {
      src: "/logo1/Samsung.svg",
      name: "Samsung",
      industry: "Software",
      description: "Enterprise software solutions",
    },
    {
      src: "/logo1/Siemens.svg",
      name: "Siemens",
      industry: "Software",
      description: "Enterprise software solutions",
    },
    {
      src: "/logo1/Tcs.svg",
      name: "TCS",
      industry: "Software",
      description: "Enterprise software solutions",
      scale: 2.1,
    },
    {
      src: "/logo1/Aws.svg",
      name: "AWS",
      industry: "Cloud",
      description: "Cloud computing platform",
    },
  ];
  const services = [
    {
      path: "/services/corporate-social-responsibility",
      label: "CSR Skilling Partner",
      img: "/services/CSR2.webp",
      description:
        "Partnering with leading CSR organizations to create opportunities for inclusive groups.",
    },
    {
      path: "/services/government-ssc-skilling",
      label: "Government-Led Skilling Missions",
      img: "/services/Gvt2.webp",
      description:
        "Partnering with KSDC, Naan Mudhalavan and state programs to build skilled workforce.",
    },
    {
      path: "/services/institutional-training",
      label: "Institutional Training (B2I)",
      img: "/services/Institutional Training2.webp",
      description:
        "Gen AI training transforming paramedical, dental, and medical professions.",
    },
    {
      path: "/services/kaas",
      label: "Corporate IT Training Programs",
      img: "/services/Corporate IT Training programs2.webp",
      description:
        "640+ specialized courses designed by industry experts to accelerate your career growth.",
    },
    {
      path: "/services/taas",
      label: "Talent as a Service",
      img: "/services/Talent as a Service3.webp",
      description:
        "15,000+ successful placements with top-tier IT professionals.",
    },
    {
      path: "/initiatives/faculty-development",
      label: "Faculty Development",
      img: "/services/Faculty Development.webp",
      description:
        "State and institutional faculty development programs aimed at upskilling educators and researchers.",
    },
  ];

  const testimonials = [
    {
      quote:
        "SFJ's expertise in SAP implementation helped us streamline our operations across 15+ countries.",
      author: "CTO, Fortune 500 Manufacturing Company",
      rating: 5,
    },
    {
      quote:
        "Outstanding talent placement services. They understand our technical requirements perfectly.",
      author: "HR Director, Leading Technology Firm",
      rating: 5,
    },
    {
      quote:
        "Their training programs have upskilled over 300 of our professionals in cloud technologies.",
      author: "VP Engineering, Global Consulting Firm",
      rating: 5,
    },
  ];

  // Every number here reads from config/site.ts. The stats band used to
  // hard-code 350 enterprise clients while the KaaS page claimed 350+, the
  // corporate training page claimed 500+ and the homepage CTA claimed
  // 300,000+ professionals — three different answers to the same question,
  // all on the same site (TR-01). `npm run check` fails the build if a
  // contradicting figure reappears.
  const stats = [
    {
      icon: <Building2 className="w-6 h-6" />,
      number: METRICS.enterpriseClients,
      suffix: "+",
      label: "Enterprise Clients",
    },
    {
      icon: <Star className="w-6 h-6" />,
      number: METRICS.clientSatisfactionPct,
      suffix: "%",
      label: "Client Satisfaction",
    },
    {
      icon: <Users className="w-6 h-6" />,
      number: METRICS.yearsOfExperience,
      suffix: "+",
      label: "Years Partnership",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      number: METRICS.countriesServed,
      suffix: "+",
      label: "Countries Served",
    },
  ];

  // Tracks which stat cards have started their count-up, keyed by index.
  const [startedCounts, setStartedCounts] = useState<boolean[]>(() =>
    stats.map(() => false),
  );
  const markStarted = (index: number) => {
    setStartedCounts((prev) => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  // No negative top margin on this section: it carries its own opaque gradient
  // background, so pulling it up over the hero repaints the hero's last few----
  // pixels while the hero's carousel (z-10) still draws above it — the artwork
  // then appears to spill past the section boundary instead of sitting in it.
  return (
    <section
      id="clients"
      className="py-5 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-100 to-transparent rounded-full blur-3xl opacity-30 translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-100 to-transparent rounded-full blur-3xl opacity-30 -translate-x-48 translate-y-48"></div>

      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header + Stats block — fade-in/slide-up stagger via Reveal */}
        <div className="mb-24">
          {/* Label (left) + Fading scrolling logos (right) */}
          <Reveal delay={0}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 py-3 sm:py-4 lg:py-5 border-b border-gray-200 mb-6 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
              <div className="flex-shrink-0">
                {/* TR-03: these fourteen marks (Accenture, TCS, Wipro, SAP,
                    Siemens, …) are third-party trademarks. "Partners" asserts
                    a formal relationship; several of these firms actively
                    enforce against that claim where no partner agreement
                    exists. "Teams we've trained at" states the same commercial
                    fact without asserting an endorsement. Reserve the word
                    "Partner" — and the official badge — for AWS, Microsoft,
                    CompTIA and PeopleCert, where SFJBS holds real
                    authorisation. Legal should still confirm display rights
                    per logo before release. */}
                <h2 className="text-base sm:text-lg md:text-xl font-medium text-gray-700 tracking-tight whitespace-nowrap">
                  Teams we&rsquo;ve trained at:
                </h2>
              </div>

              <div
                className="relative flex-1 min-w-0 overflow-hidden"
                style={{
                  maskImage:
                    "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                }}
              >
                <div className="client-marquee flex items-center w-max">
                  <div className="flex items-center" aria-hidden="false">
                    {clientLogos.map((client, index) => (
                      <div
                        key={`a-${index}`}
                        className="flex items-center justify-center h-10 sm:h-11 lg:h-12 w-24 mx-6 flex-shrink-0"
                      >
                        <Image
                          src={client.src}
                          alt={`${client.name} logo`}
                          width={96}
                          height={36}
                          className="h-full w-auto max-w-full object-contain"
                          style={{
                            filter:
                              "grayscale(1) brightness(0.75) contrast(1.3)",
                            transform: client.scale
                              ? `scale(${client.scale})`
                              : undefined,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center" aria-hidden="true">
                    {clientLogos.map((client, index) => (
                      <div
                        key={`b-${index}`}
                        className="flex items-center justify-center h-10 sm:h-11 lg:h-12 w-24 mx-6 flex-shrink-0"
                      >
                        <Image
                          src={client.src}
                          alt=""
                          width={96}
                          height={36}
                          className="h-full w-auto max-w-full object-contain"
                          style={{
                            filter:
                              "grayscale(1) brightness(0.75) contrast(1.3)",
                            transform: client.scale
                              ? `scale(${client.scale})`
                              : undefined,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* SFJBS Enterprise Section - Integrated */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-left mb-20"
        >
          <Reveal delay={0}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
              Our Global Impact
            </h2>
          </Reveal>

          <Reveal delay={70}>
            <p className="text-lg text-gray-600 max-w-4xl leading-relaxed mb-4">
              {METRICS.yearsOfExperience} years of workforce transformation
              across enterprises, government, and institutions
            </p>
          </Reveal>

          {/* Stats Cards — moved here, right below the link */}
          <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-between gap-6 mb-12">
            {stats.map((stat, index) => (
              <Reveal
                key={index}
                delay={200 + index * 80}
                onVisible={() => markStarted(index)}
              >
                <div className="flex flex-col items-center text-center group">
                  <AnimatedNumber
                    target={stat.number}
                    suffix={stat.suffix}
                    start={startedCounts[index]}
                  />
                  <div className="text-xs text-gray-600 font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Heading + services list (left) + image + text (right), aligned at top */}
          <div className="grid md:grid-cols-[0.8fr_1.4fr] gap-10 items-start text-left max-w-[100rem] mt-16 mb-16">
            <div>
              <Reveal delay={0}>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight leading-tight">
                  Enterprise training
                  <br />
                  outcomes that speak
                  <br />
                  for themselves
                </h2>
              </Reveal>
              <Reveal delay={70}>
                <p className="text-gray-600 text-base leading-relaxed mb-8">
                  For {METRICS.yearsOfExperience}+ years, SFJBS has partnered
                  with global enterprises on Gen AI upskilling, cross-skilling,
                  and reskilling. These numbers reflect the scale and trust
                  behind that work.
                </p>
              </Reveal>

              {services.map((service, index) => (
                <button
                  key={service.path}
                  type="button"
                  onMouseEnter={() => setHoveredService(index)}
                  className={`block w-full text-left py-3 border-b font-semibold text-[1.3rem] transition-colors duration-200 ${
                    hoveredService === index
                      ? "border-gray-900 text-gray-900"
                      : "border-gray-200 text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {service.label}
                </button>
              ))}
            </div>

            <div>
              <div className="relative w-full h-56 sm:h-80 md:h-[26rem] lg:h-[32rem] xl:h-[36rem] rounded-xl overflow-hidden">
                {/* PF-03: without `sizes`, a `fill` image defaults to 100vw
                    and next/image fetches it at the largest configured width —
                    this slot was pulling a 3840px asset for a half-width card. */}
                <Image
                  src={services[hoveredService].img}
                  alt={services[hoveredService].label}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-5 mb-3">
                {services[hoveredService].label}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-5">
                {services[hoveredService].description}
              </p>
              <div className="flex gap-3">
                <Link
                  href={services[hoveredService].path}
                  className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors duration-200"
                >
                  Read More
                </Link>
                <Link
                  href="/contact"
                  className="inline-block bg-white border border-blue-900 text-blue-900 hover:bg-blue-50 font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors duration-200"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className=""
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              What Our{" "}
              <span className="bg-black-to-r from-indigo-600 via-purple-600 to-teal-600 bg-clip-text text-black">
                Clients Say
              </span>
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from the leaders who trust us with their most critical
              business transformations
            </p>
          </div>

          <div
            className="relative overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }}
          >
            <div className="testimonial-marquee flex gap-6 w-max">
              <div className="flex gap-6">
                {testimonials.map((testimonial, index) => (
                  <Card
                    key={`a-${index}`}
                    className="h-full bg-[#f3f5f7] border-0 shadow-none w-80 flex-shrink-0"
                  >
                    <CardContent className="p-6">
                      <Quote className="w-7 h-7 text-blue-600 mb-3" />
                      <blockquote className="text-gray-800 mb-5 leading-relaxed">
                        {testimonial.quote}
                      </blockquote>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-medium text-sm flex items-center justify-center flex-shrink-0">
                          {testimonial.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">
                            {testimonial.author}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="flex gap-6" aria-hidden="true">
                {testimonials.map((testimonial, index) => (
                  <Card
                    key={`b-${index}`}
                    className="h-full bg-[#f3f5f7] border-0 shadow-none w-80 flex-shrink-0"
                  >
                    <CardContent className="p-6">
                      <Quote className="w-7 h-7 text-blue-600 mb-3" />
                      <blockquote className="text-gray-800 mb-5 leading-relaxed">
                        {testimonial.quote}
                      </blockquote>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-medium text-sm flex items-center justify-center flex-shrink-0">
                          {testimonial.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">
                            {testimonial.author}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Custom Swiper Styles */}
      <style jsx global>{`
        /* WCAG 2.2.2 / 2.3.3 — both logo strips scroll forever on their own.
           Visitors who have asked their OS for reduced motion get the static
           first frame instead. Hovering already pauses them for everyone. */
        @media (prefers-reduced-motion: reduce) {
          .client-marquee,
          .testimonial-marquee {
            animation: none !important;
            transform: none !important;
          }
        }

        .client-marquee {
          animation: clientScroll 25s linear infinite;
        }
        .client-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes clientScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .client-flow-swiper {
          overflow: visible !important;
        }

        .client-flow-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }

        .client-flow-swiper .swiper-slide {
          transition: transform 0.3s ease !important;
        }

        .testimonials-swiper .swiper-pagination {
          bottom: 0 !important;
        }

        .testimonials-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(59, 130, 246, 0.3);
          opacity: 1;
          margin: 0 6px;
          transition: all 0.3s ease;
        }

        .testimonials-swiper .swiper-pagination-bullet-active {
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          transform: scale(1.2);
        }

        .client-flow-swiper .swiper-slide:hover {
          z-index: 10;
        }
        .testimonial-marquee {
          animation: testimonialScroll 30s linear infinite;
        }
        .testimonial-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes testimonialScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes statFloat {
          0%,
          75%,
          100% {
            transform: translateY(0);
          }

          37% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </section>
  );
};

export default ClientsSection;
