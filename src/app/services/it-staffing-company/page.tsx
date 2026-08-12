import { Metadata } from "next";
import Script from "next/script";
import ITStaffingSolutions from "./_components/Section";
import SFJStatsSection from "./_components/SFJStatsSection";
import TaasScroller from "./_components/Taas";
import CapabilityStrip from "./_components/CapabilityStrip";

export const metadata: Metadata = {
  title: "IT Staffing & Services Company | 14+ Years in IT Staffing | SFJBS",
  description:
    "SFJBS is a trusted IT staffing and services company with over 14 years of experience, connecting businesses with top-tier tech talent and delivering comprehensive IT solutions.",
  keywords:
    "IT staffing, IT services, tech staffing, technology staffing, IT recruitment, IT staffing company, Bengaluru IT staffing",
  openGraph: {
    title: "IT Staffing & Services Company | 14+ Years in IT Staffing | SFJBS",
    description:
      "SFJBS is a trusted IT staffing and services company with over 14 years of experience, connecting businesses with top-tier tech talent and delivering comprehensive IT solutions.",
    url: "https://www.sfjbs.com/services/it-staffing-company",
    type: "website",
    images: [
      {
        url: "https://bskilling-documents.s3.ap-south-1.amazonaws.com/files/1754911941402_Talent%20As%20A%20Service.webp", // Replace with your actual image URL
        width: 1200,
        height: 630,
        alt: "Global IT staffing and services company connecting businesses with vetted technical talent",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Staffing & Services Company | 14+ Years in IT Staffing | SFJBS",
    description:
      "SFJBS is a trusted IT staffing and services company with over 14 years of experience, connecting businesses with top-tier tech talent and delivering comprehensive IT solutions.",
    images: [
      {
        url: "https://bskilling-documents.s3.ap-south-1.amazonaws.com/files/1754911941402_Talent%20As%20A%20Service.webp", // Replace with your actual image URL
        width: 1200,
        height: 630,
        alt: "Global IT staffing and services company connecting businesses with vetted technical talent",
      },
    ],
  },
  alternates: {
    canonical: "https://www.sfjbs.com/services/it-staffing-company",
  },
};

export default function ITStaffingPage() {
  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.sfjbs.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "IT Staffing Company",
                item: "https://www.sfjbs.com/services/it-staffing-company",
              },
            ],
          }),
        }}
      />

      <div className=" ">
        {/* Height is a floor, never a ceiling. A fixed max-height clipped the
            copy + 10-card strip + logo row on phones, where the stacked
            content is far taller than any desktop-derived cap; the cap only
            makes sense from lg up, where the layout is side-by-side. */}
        <section
          className="relative px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 lg:pt-32 pb-8 sm:pb-10 flex flex-col bg-center bg-no-repeat bg-cover bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 min-h-[32rem] sm:min-h-[36rem] lg:min-h-[max(38rem,min(60vw,calc(100dvh-120px)))] lg:max-h-[56rem]"
          style={{
            backgroundImage: "url('/app/it/taas-hero-2.webp')",
          }}
        >
          {/* Fade over the artwork so the white copy reads cleanly. Heavier on
              phones: bg-cover crops the wide photo to a narrow centre slice
              there, which lands the bright window on top of the copy. */}
          <div className="absolute inset-0 bg-black/45 sm:bg-black/25" />

          <div className="max-w-[100rem] mx-auto w-full relative">
            {/* Single column now that the hero photo is gone. */}
            <div className="grid gap-8 items-center">
              <div className="space-y-4 sm:space-y-6 max-w-3xl">
                <h1 className="hidden">IT Staffing & Services Company</h1>
                {/* Lower floors on the clamps than the desktop design would
                    suggest: on a 360px phone this copy ran to 3 heading lines
                    plus 9 body lines and pushed the capability strip off the
                    first screen. */}
                <h2
                  className="font-bold text-white leading-tight"
                  style={{ fontSize: "clamp(1.5rem, 2.6vw, 3rem)" }}
                >
                  Build Future-Ready Technology Teams, Faster
                </h2>

                <p
                  className="text-white leading-normal sm:leading-relaxed"
                  style={{ fontSize: "clamp(0.8125rem, 0.95vw, 1.05rem)" }}
                >
                  Access skills-validated professionals across application
                  engineering, cloud, DevOps, data, AI, enterprise platforms,
                  cybersecurity, testing, mobile, integration and
                  infrastructure. SFJBS helps enterprises, GCCs and
                  public-sector organisations hire permanent employees, deploy
                  subcontract professionals and scale project teams through
                  structured sourcing, assessment, onboarding and workforce
                  management.
                </p>

              </div>
            </div>
          </div>

          {/* Interactive capability strip: 10 cards with auto-advance and a
              logo carousel that follows the active card. */}
          <CapabilityStrip />
        </section>

        <TaasScroller />
        <SFJStatsSection />
        <ITStaffingSolutions />
      </div>
    </>
  );
}
