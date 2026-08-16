import ClientsSection from "./_components/Clients";
import PartnersSection from "./_components/PartnersSection";
// import FloatingActionButton from "./_components/FloatingActionButton";
import HeroCarousel from "./_components/Hero";
import { Metadata } from "next";
import Script from "next/script";

// import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sfjbs.com"),

  title: {
    default: "SFJBS — Future-Proof Your Workforce, AI-Ready Today",
    template: "%s | SFJ Business Solutions",
  },

  description:
    "15 years of workforce transformation across enterprises, institutions, and governments. Join 300,000+ professionals upskilled in AI, cloud, and emerging tech with SFJ Business Solutions.",

  keywords: [
    "IT Training",
    "Corporate Upskilling",
    "Enterprise Training Programs",
    "IT Consulting",
    "Tech Recruitment",
    "Talent as a Service",
    "Institutional Training",
    "Government Skilling Missions",
    "Bangalore IT Company",
  ],

  authors: [{ name: "SFJ Business Solutions" }],
  creator: "SFJ Business Solutions",
  publisher: "SFJ Business Solutions",

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
    canonical: "https://www.sfjbs.com",
  },

  openGraph: {
    type: "website",
    url: "https://www.sfjbs.com",
    title: "SFJBS — Future-Proof Your Workforce, AI-Ready Today",
    description:
      "15 years of workforce transformation across enterprises, institutions, and governments. Join 300,000+ professionals upskilled in AI, cloud, and emerging tech with SFJ Business Solutions.",
    siteName: "SFJ Business Solutions",
    images: [
      {
        url: "https://www.sfjbs.com/ind.png",
        width: 1200,
        height: 630,
        alt: "SFJBS - Future-Proof Your Workforce",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "SFJBS — Future-Proof Your Workforce, AI-Ready Today",
    description:
      "15 years of workforce transformation. 300,000+ professionals upskilled in AI, cloud, and emerging tech.",
    images: ["https://www.sfjbs.com/ind.png"],
  },

  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },

  manifest: "/site.webmanifest",

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
      <Script
        id="aggregate-rating"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "SFJ Business Solutions",
            url: "https://www.sfjbs.com",
            // aggregateRating: {
            //   "@type": "AggregateRating",
            //   ratingValue: "3.8",
            //   reviewCount: "150",
            // },
          }),
        }}
      />

      {/* <div className=" bg-g00">
        <button className="p-2 bg-blue-500 text-white rounded">
          Test Button
        </button>
      </div> */}

      <HeroCarousel />

      <ClientsSection />

      <PartnersSection />
      {/* <FloatingActionButton /> */}
    </div>
  );
}

// export default HomePage;
