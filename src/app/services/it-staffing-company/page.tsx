import { Metadata } from "next";
import Script from "next/script";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Award, Heart, FileText } from "lucide-react";
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
  const services = [
    {
      icon: Users,
      title: "Pre-Screened IT Professionals",
      description:
        "Rigorous evaluation, skill assessment, and background verification for quality hiring",
    },
    {
      icon: Award,
      title: "Technical Specialists",
      description:
        "Domain experts with specific certifications and hands-on project experience",
    },
    {
      icon: Heart,
      title: "Cultural Fit Matching",
      description:
        "Candidates aligned with your company culture and team dynamics",
    },
    {
      icon: FileText,
      title: "Complete Documentation",
      description: "Full contract, compliance, and administrative support",
    },
  ];

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

        {/* Services Section */}
        <section className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Our Services
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Comprehensive solutions designed to meet your technical hiring
                needs with precision and efficiency
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-shadow h-full"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <service.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <CardTitle className="text-lg leading-tight">
                        {service.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-gray-600 text-sm leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <ITStaffingSolutions />
        <SFJStatsSection />
      </div>
    </>
  );
}
