// app/internships/page.tsx
import type { Metadata } from "next";
import InternshipLanding from "./_components/InternShip";

// Server-side metadata export - this is how Next.js App Router handles SEO
export const metadata: Metadata = {
  title:
    "Discover Internship Opportunities at SFJ Business Solutions | Launch Your Career",
  description:
    "Explore internship programs with India's top companies like Oracle, Qualcomm, TCS, Infosys, Bosch, Wipro, IBM, Accenture, Microsoft and more via SFJ Business Solutions. Find your perfect match to align with your career goals.",
  keywords:
    "internship, internships, IT internship, technology internship, SFJ Business Solutions, Oracle internship, Qualcomm internship, TCS internship, Infosys internship, Bosch internship, Wipro internship, IBM internship, Accenture internship, Microsoft internship, career, launch your career, talent development",

  // Open Graph metadata
  openGraph: {
    title:
      "Discover Internship Opportunities at SFJ Business Solutions | Launch Your Career",
    description:
      "Explore internship programs with India's top firms—Oracle, Qualcomm, TCS, Infosys, Bosch, Wipro, IBM, Accenture, Microsoft and more—through SFJ Business Solutions.",
    url: "https://www.sfjbs.com/internships",
    type: "website",
    images: [
      {
        url: "https://www.sfjbs.com/path/to/your/internships-banner.jpg",
        width: 1200,
        height: 630,
        alt: "SFJ Business Solutions Internship Opportunities",
      },
    ],
  },

  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title:
      "Discover Internship Opportunities at SFJ Business Solutions | Launch Your Career",
    description:
      "Explore internship programs with leading companies like Oracle, Qualcomm, TCS, Infosys, Bosch, Wipro, IBM, Accenture, Microsoft and more via SFJ Business Solutions.",
    images: ["https://www.sfjbs.com/path/to/your/internships-banner.jpg"],
  },

  // Additional SEO metadata
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

  // Canonical URL
  alternates: {
    canonical: "https://www.sfjbs.com/internships",
  },
};

// Server component - automatically runs on server
export default function InternshipsPage() {
  return (
    <>
      <InternshipLanding />
    </>
  );
}
