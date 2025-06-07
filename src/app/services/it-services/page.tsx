import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Users,
  Award,
  Heart,
  FileText,
  DollarSign,
  Building2,
  TrendingUp,
  Globe,
} from "lucide-react";

export const metadata: Metadata = {
  title:
    "IT Staffing Agency in Bangalore | IT Staffing Services Bangalore | SFJBS",
  description:
    "Premier IT staffing agency in Bangalore providing comprehensive IT staffing services. Connect with top IT professionals through permanent, contract & temporary staffing solutions.",
  keywords:
    "IT staffing agency in Bangalore, IT staffing services Bangalore, IT recruitment agency, professional IT staffing, contract IT staffing",
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
    {
      icon: DollarSign,
      title: "Payroll Management",
      description: "End-to-end payroll, benefits, and tax compliance handling",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section - First Screen */}
      <section className="h-screen flex items-center justify-center px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <Badge
                variant="secondary"
                className="px-4 py-2 text-sm font-medium"
              >
                <Globe className="w-4 h-4 mr-2" />
                Global IT Staffing Leader
              </Badge>

              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your Trusted Global
                <span className="text-blue-600"> IT Staffing</span> Agency
              </h1>

              <div className="space-y-4 text-lg text-gray-700">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <p>
                    India&apos;s IT sector contributes 7.5% to GDP, creating
                    massive demand for skilled professionals worldwide
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <Building2 className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <p>
                    Finding right technical talent while managing business
                    operations is increasingly challenging globally
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700"
              >
                Find IT Talent
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3">
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Content - Key Points */}
          <div className="space-y-6">
            <Card className="border-l-4 border-l-blue-600 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-blue-600">
                  Global Reach
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  SFJBS connects you with exceptional IT professionals who fit
                  your exact requirements anywhere
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-600 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-green-600">
                  Bangalore Expertise
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Leading IT staffing services with strong presence in Bangalore
                  and global reach
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section - Second Screen */}
      <section className="h-screen flex items-center justify-center px-4 bg-white">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our IT Staffing Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions designed to meet your technical hiring
              needs with precision and efficiency
            </p>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5 mb-8">
              <TabsTrigger value="overview" className="text-xs lg:text-sm">
                Overview
              </TabsTrigger>
              <TabsTrigger value="screening" className="text-xs lg:text-sm">
                Screening
              </TabsTrigger>
              <TabsTrigger value="specialists" className="text-xs lg:text-sm">
                Specialists
              </TabsTrigger>
              <TabsTrigger value="culture" className="text-xs lg:text-sm">
                Culture Fit
              </TabsTrigger>
              <TabsTrigger value="support" className="text-xs lg:text-sm">
                Support
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <service.icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <CardTitle className="text-lg">
                          {service.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600">
                        {service.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="screening" className="space-y-6">
              <Card className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Users className="w-12 h-12 text-blue-600" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Pre-Screened IT Professionals
                    </h3>
                    <p className="text-gray-600">
                      Quality assured through rigorous evaluation
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900">
                      Skill Assessment
                    </h4>
                    <p className="text-sm text-blue-700 mt-2">
                      Technical competency evaluation
                    </p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900">
                      Background Verification
                    </h4>
                    <p className="text-sm text-green-700 mt-2">
                      Complete professional history check
                    </p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-900">
                      Quality Hiring
                    </h4>
                    <p className="text-sm text-purple-700 mt-2">
                      Guaranteed professional standards
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="specialists" className="space-y-6">
              <Card className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Award className="w-12 h-12 text-green-600" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Technical Specialists
                    </h3>
                    <p className="text-gray-600">
                      Domain experts with proven experience
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Certifications
                    </h4>
                    <p className="text-gray-600">
                      Industry-recognized credentials and specific technology
                      certifications
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Project Experience
                    </h4>
                    <p className="text-gray-600">
                      Hands-on experience with real-world implementations and
                      solutions
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="culture" className="space-y-6">
              <Card className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Heart className="w-12 h-12 text-red-600" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Cultural Fit Matching
                    </h3>
                    <p className="text-gray-600">
                      Perfect alignment with your team dynamics
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Company Culture
                    </h4>
                    <p className="text-gray-600">
                      Candidates who share your organizational values and work
                      style
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Team Dynamics
                    </h4>
                    <p className="text-gray-600">
                      Professionals who integrate seamlessly with existing teams
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="support" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-8 h-8 text-blue-600" />
                    <h3 className="text-xl font-bold text-gray-900">
                      Complete Documentation
                    </h3>
                  </div>
                  <p className="text-gray-600">
                    Full contract, compliance, and administrative support for
                    seamless operations
                  </p>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <DollarSign className="w-8 h-8 text-green-600" />
                    <h3 className="text-xl font-bold text-gray-900">
                      Payroll Management
                    </h3>
                  </div>
                  <p className="text-gray-600">
                    End-to-end payroll, benefits, and tax compliance handling
                  </p>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
