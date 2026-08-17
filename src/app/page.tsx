import ClientsSection from "./_components/Clients";
import PartnersSection from "./_components/PartnersSection";
// import FloatingActionButton from "./_components/FloatingActionButton";
import HeroCarousel from "./_components/Hero";
import { Metadata } from "next";
import { COMPANY, canonical } from "@/config/site";

// Title is 48 chars, description 148 — both inside the limits Google
// truncates at (~60 / ~155). See OP-03, OP-04.
//
// Written as literals rather than interpolated from METRICS so the character
// count is checkable at rest (`npm run check` asserts it). The numbers below
// must match src/config/site.ts — the claims check in scripts/check-site.mjs
// fails the build if a stale year count reappears anywhere in source.
const HOME_TITLE = "Enterprise Upskilling & IT Talent Partner | SFJBS";
const HOME_DESCRIPTION =
  "15 years training enterprise, campus and government workforces in AI, cloud and emerging tech. 300,000+ professionals upskilled.";

export const metadata: Metadata = {
  title: HOME_TITLE,

  description: HOME_DESCRIPTION,

  authors: [{ name: COMPANY.name }],
  creator: COMPANY.name,
  publisher: COMPANY.name,

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: canonical("/"),
  },

  openGraph: {
    type: "website",
    url: canonical("/"),
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    siteName: COMPANY.name,
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "SFJ Business Solutions — enterprise upskilling and IT talent",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: ["/preview.png"],
  },

  other: {
    "p:domain_verify": "3fbce1b134b233e5e76e30c8b3e00d78",
  },
};

//front end
// export const metadata: Metadata = {
//   title:
//     "Enterprise Upskilling Partner in Bangalore, India | Enterprise Training Programs & Tech Solutions",
//   description:
//     "SFJBS is an enterprise upskilling partner in Bangalore, India, offering enterprise training programs, IT consulting services, and tech solutions for future-ready teams.",
//   keywords:
//     "IT Services, Corporate Training, Technology Solutions, IT Consulting, Tech Recruitment, IT Skill Development, Professional Services, Enterprise Training Programs, IT Talent Solutions, Bengaluru IT Company",
//   openGraph: {
//     title:
//       "Enterprise Upskilling Partner in Bangalore, India | Enterprise Training & Tech Solutions",
//     description:
//       "SFJBS is an enterprise upskilling partner in Bangalore, India, offering enterprise training, IT consulting services, and tech solutions for future-ready teams.",
//     url: "https://www.sfjbs.com",
//     type: "website",
//     images: [
//       {
//         url: "https://www.sfjbs.com/ind.png", // Replace with your actual image URL
//         width: 1200,
//         height: 630,
//         alt: "SFJBS - Enterprise Upskilling Partner in Bangalore",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title:
//       "Enterprise Upskilling Partner in Bangalore, India | Enterprise Training Programs & Tech Solutions",
//     description:
//       "SFJBS is an enterprise upskilling partner in Bangalore, India, offering enterprise training, IT consulting services, and tech solutions for future-ready teams.",
//     images: ["https://www.sfjbs.com/ind.png"], // Replace with your actual image URL
//   },
//   alternates: {
//     canonical: "https://www.sfjbs.com",
//   },
// };

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* The homepage previously had no H1 at all — the only one on the page
          was "Our Global Impact", a decorative stats-band label carrying zero
          commercial keywords (OP-01). The hero is a 5-slide carousel, so
          promoting a slide heading would emit five competing H1s; a single
          visually-hidden H1 states what the page is once, in keyword-led
          language, and every hero slide heading stays an H2 beneath it. */}
      <h1 className="sr-only">
        Enterprise upskilling and workforce transformation partner — Bengaluru,
        India
      </h1>

      <HeroCarousel />

      <ClientsSection />

      <PartnersSection />
      {/* <FloatingActionButton /> */}
    </div>
  );
}

// export default HomePage;
