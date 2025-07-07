/* eslint-disable @next/next/no-img-element */
import { Metadata } from "next";
import Script from "next/script";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Award,
  Heart,
  FileText,
  Building2,
  TrendingUp,
  Globe,
} from "lucide-react";
import ITStaffingSolutions from "./_components/Section";
import SFJStatsSection from "./_components/SFJStatsSection";
import TaasScroller from "./_components/Taas";
import Link from "next/link";

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
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Staffing & Services Company | 14+ Years in IT Staffing | SFJBS",
    description:
      "SFJBS is a trusted IT staffing and services company with over 14 years of experience, connecting businesses with top-tier tech talent and delivering comprehensive IT solutions.",
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
        {/* Hero Section - Compact */}
        <section className="py-16 px-4 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 pt-28">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <div className="space-y-6">
                <Badge variant="secondary" className="px-3 py-1 text-sm">
                  <Globe className="w-4 h-4 mr-2" />
                  Global IT Staffing Leader
                </Badge>

                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Your Trusted Global
                  <span className="text-blue-600"> IT Staffing</span>
                </h1>

                <div className="space-y-3 text-white">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <p>
                      India&apos;s IT sector contributes 7.5% to GDP, creating
                      massive demand for skilled professionals worldwide
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <p>
                      Finding right technical talent while managing business
                      operations is increasingly challenging globally
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href={"/contact?type=it-staffing"}>
                    <Button
                      size="lg"
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700"
                    >
                      Find IT Talent
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Content - Key Points */}
              <div className="space-y-4">
                <img
                  src="/app/it/hero.png"
                  alt="It-staffing"
                  className="w-full object-cover rounded-md border-4 border-white"
                />
              </div>
            </div>
          </div>
        </section>

        <TaasScroller />

        {/* Services Section */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Our IT Staffing Services
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Comprehensive solutions designed to meet your technical hiring
                needs with precision and efficiency
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
