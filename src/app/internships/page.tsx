// app/internships/page.tsx
import type { Metadata } from "next";
import InternshipLanding from "./_components/InternShip";

// Server-side metadata export - this is how Next.js App Router handles SEO
export const metadata: Metadata = {
  // title:
  //   "Discover Internship Opportunities at SFJ Business Solutions | Launch Your Career",
  // description:
  //   "Explore internship programs with India's top companies like Oracle, Qualcomm, TCS, Infosys, Bosch, Wipro, IBM, Accenture, Microsoft and more via SFJ Business Solutions. Find your perfect match to align with your career goals.",
  // keywords:
  //   "internship, internships, IT internship, technology internship, SFJ Business Solutions, Oracle internship, Qualcomm internship, TCS internship, Infosys internship, Bosch internship, Wipro internship, IBM internship, Accenture internship, Microsoft internship, career, launch your career, talent development",

  title: "Internships & Scholarships in India 2025 | Oracle, TCS, Infosys",
  description:
    "Explore top internships and scholarships in India 2025. Apply for Oracle, TCS, Infosys internships, government internships, and student scholarships directly with SFJBS.",
  keywords:
    "Oracle internships, TCS internships, Infosys internships, government internships in India, scholarships for students 2025, IT company internships, summer internships India, engineering internships, management internships, AICTE internships, NSP scholarships",

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
  const schemaData = {
    "@context": "https://schema.org/",
    "@type": "ItemList",
    name: "Internships and Scholarships in India 2025",
    description:
      "Explore IT company internships (Oracle, TCS, Infosys), government internships such as PM Internship Scheme, and scholarships like NSP.",
    numberOfItems: 5,
    itemListElement: [
      {
        "@type": "JobPosting",
        title: "Oracle Internship 2025",
        hiringOrganization: {
          "@type": "Organization",
          name: "Oracle",
          sameAs: "https://www.oracle.com",
        },
        description:
          "Internships in database software, cloud computing, and enterprise solutions.",
        employmentType: "Internship",
        applicantLocationRequirements: {
          "@type": "Country",
          name: "India",
        },
      },
      {
        "@type": "JobPosting",
        title: "TCS Internship 2025",
        hiringOrganization: {
          "@type": "Organization",
          name: "Tata Consultancy Services",
          sameAs: "https://www.tcs.com",
        },
        description:
          "Internships in consulting, digital transformation, and IT services.",
        employmentType: "Internship",
        applicantLocationRequirements: {
          "@type": "Country",
          name: "India",
        },
      },
      {
        "@type": "JobPosting",
        title: "Infosys Internship 2025",
        hiringOrganization: {
          "@type": "Organization",
          name: "Infosys",
          sameAs: "https://www.infosys.com",
        },
        description:
          "Internships in next-gen digital services, consulting, and software development.",
        employmentType: "Internship",
        applicantLocationRequirements: {
          "@type": "Country",
          name: "India",
        },
      },
      {
        "@type": "EducationalOccupationalProgram",
        name: "PM Internship Scheme 2025",
        provider: {
          "@type": "GovernmentOrganization",
          name: "Government of India",
        },
        description:
          "The PM Internship Scheme provides opportunities for students to gain practical exposure in central government departments and ministries.",
        timeOfDay: "Daytime",
        occupationalCategory: "Government Internship",
        programPrerequisites:
          "Students and recent graduates from recognized institutions",
      },
      {
        "@type": "EducationalOccupationalProgram",
        name: "National Scholarship Portal (NSP) 2025",
        provider: {
          "@type": "GovernmentOrganization",
          name: "Government of India",
        },
        description:
          "The National Scholarship Portal offers financial aid and scholarships for students across India, covering engineering, management, science, and social sciences.",
        timeOfDay: "Daytime",
        occupationalCategory: "Scholarship",
        programPrerequisites:
          "Eligible Indian students as per program guidelines",
      },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <InternshipLanding />
    </>
  );
}
