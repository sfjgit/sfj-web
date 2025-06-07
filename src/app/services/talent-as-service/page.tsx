import { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "IT Staffing in Bangalore | IT Staffing Services Bangalore | SFJBS",
  description:
    "Premier IT staffing  in Bangalore providing comprehensive IT staffing services. Connect with top IT professionals through permanent, contract & temporary staffing solutions.",
  keywords:
    "IT staffing  in Bangalore, IT staffing services Bangalore, IT recruitment , professional IT staffing, contract IT staffing",
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
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-10">
      {/* Hero Section - Compact */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <Badge variant="secondary" className="px-3 py-1 text-sm">
                <Globe className="w-4 h-4 mr-2" />
                Global IT Staffing Leader
              </Badge>

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Your Trusted Global
                <span className="text-blue-600"> IT Staffing</span>
              </h1>

              <div className="space-y-3 text-gray-700">
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
                <Button
                  size="lg"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700"
                >
                  Find IT Talent
                </Button>
                <Button variant="outline" size="lg" className="px-6 py-2">
                  Learn More
                </Button>
              </div>
            </div>

            {/* Right Content - Key Points */}
            <div className="space-y-4">
              <Card className="border-l-4 border-l-blue-600 shadow-md">
                <CardContent className="pt-0">
                  <p>
                    <span className="font-semibold">Global Reach</span>
                  </p>
                  <p className="text-gray-700 text-sm mt-2">
                    SFJBS connects you with exceptional IT professionals who fit
                    your exact requirements anywhere
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-600 shadow-md">
                <CardContent className="pt-0">
                  <p>
                    <span className="font-semibold"> Bangalore Expertise</span>
                  </p>
                  <p className="text-gray-700 text-sm mt-2">
                    Leading IT staffing services with strong presence in
                    Bangalore and global reach
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

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
  );
}
