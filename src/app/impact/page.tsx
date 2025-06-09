"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  BookOpen,
  Globe,
  Award,
  Building2,
  GraduationCap,
  TrendingUp,
} from "lucide-react";

const Impact = () => {
  const keyMetrics = [
    {
      icon: Users,
      value: "300,000+",
      label: "Professionals Trained",
      description: "Across diverse technology domains",
    },
    {
      icon: BookOpen,
      value: "640+",
      label: "Specialized Courses",
      description: "Covering emerging technologies",
    },
    {
      icon: Globe,
      value: "35,000",
      label: "Learners in 2024",
      description: "Successfully completed programs",
    },
    {
      icon: Award,
      value: "50,000+",
      label: "Partnership Training",
      description: "Through strategic collaborations",
    },
  ];

  const technologyDistribution = [
    {
      domain: "Programming & Mobile Development",
      learners: 8000,
      percentage: 23,
    },
    { domain: "Big Data & Analytics", learners: 6000, percentage: 17 },
    { domain: "Cloud Technologies", learners: 5000, percentage: 14 },
    { domain: "ERP Systems (SAP, Oracle)", learners: 5000, percentage: 14 },
    {
      domain: "Generative AI & Machine Learning",
      learners: 4000,
      percentage: 11,
    },
    { domain: "Software Testing", learners: 2500, percentage: 7 },
    { domain: "Cybersecurity", learners: 1000, percentage: 3 },
  ];

  const governmentPrograms = [
    {
      partner: "Tamil Nadu Skill Development Corporation",
      learners: 27000,
      focus: "Digital skills training",
    },
    {
      partner: "MP State Skill Development Mission",
      learners: 1600,
      focus: "Generative AI applications",
    },
    {
      partner: "Karnataka Skill Development Corporation",
      learners: 500,
      focus: "Emerging technology domains",
    },
    {
      partner: "National Skill Development Corporation (NSDC)",
      learners: 4000,
      focus: "Cloud Computing and Generative AI",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Compact Header Section */}
      <section className="relative   overflow-hidden flex items-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 py-40">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="text-white">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                <Award className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">
                  Proven Excellence Since 2011
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                Our{" "}
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Impact
                </span>{" "}
                Speaks Volumes
              </h1>

              <p className="text-lg text-blue-100 mb-6 leading-relaxed">
                From training 300,000+ professionals to partnering with
                governments across India, our measurable success story spans
                continents and transforms careers at scale.
              </p>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center bg-white/10 rounded-full px-3 py-1">
                  <Users className="h-4 w-4 mr-2" />
                  300K+ Trained
                </div>
                <div className="flex items-center bg-white/10 rounded-full px-3 py-1">
                  <Globe className="h-4 w-4 mr-2" />
                  Global Presence
                </div>
                <div className="flex items-center bg-white/10 rounded-full px-3 py-1">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Data-Driven Results
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative">
                <div className="w-80 h-80 bg-white/10 backdrop-blur-sm rounded-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="w-full h-full bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 rounded-xl flex items-center justify-center relative overflow-hidden">
                    {/* Geometric Pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-4 left-4 w-16 h-16 border-2 border-white rounded-lg"></div>
                      <div className="absolute top-8 right-8 w-12 h-12 border-2 border-white rounded-full"></div>
                      <div className="absolute bottom-8 left-8 w-20 h-20 border-2 border-white rounded-lg transform rotate-45"></div>
                      <div className="absolute bottom-4 right-4 w-8 h-8 border-2 border-white rounded-full"></div>
                    </div>

                    {/* Central Content */}
                    <div className="text-center text-white relative z-10">
                      <TrendingUp className="h-16 w-16 mx-auto mb-4" />
                      <div className="text-3xl font-bold mb-2">300K+</div>
                      <div className="text-sm font-medium">
                        Lives Transformed
                      </div>
                      <div className="mt-4 flex justify-center space-x-2">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <div
                          className="w-2 h-2 bg-white rounded-full animate-pulse"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-white rounded-full animate-pulse"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                  <Award className="h-6 w-6 text-gray-800" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center animate-pulse">
                  <Globe className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Description Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Driving Excellence Through Data-Driven Impact
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our comprehensive impact metrics showcase over a decade of
            transformational success across technology training, government
            partnerships, and enterprise solutions. From individual skill
            development to large-scale workforce transformation, explore how
            we&apos;re shaping the future of professional education globally.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2 text-blue-600">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="font-medium">Real-time Analytics</span>
            </div>
            <div className="flex items-center gap-2 text-purple-600">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <span className="font-medium">Global Reach</span>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <span className="font-medium">Measurable Outcomes</span>
            </div>
            <div className="flex items-center gap-2 text-orange-600">
              <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
              <span className="font-medium">Strategic Partnerships</span>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content with Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="technology" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Technology</span>
            </TabsTrigger>
            <TabsTrigger value="government" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">Government</span>
            </TabsTrigger>
            <TabsTrigger value="sectors" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              <span className="hidden sm:inline">Sectors</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {keyMetrics.map((metric, index) => {
                const IconComponent = metric.icon;
                return (
                  <Card
                    key={index}
                    className="text-center p-4 hover:shadow-md transition-shadow"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-center mb-2">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <IconComponent className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                      <CardTitle className="text-2xl font-bold text-blue-900 mb-1">
                        {metric.value}
                      </CardTitle>
                      <h3 className="text-sm font-semibold text-gray-900">
                        {metric.label}
                      </h3>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs text-gray-600">
                        {metric.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Global Reach */}
            <Card className="p-6">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-center">
                  Global Reach & Recognition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-3">
                    <Globe className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-sm">Singapore</h3>
                    <p className="text-xs text-gray-600">Asia-Pacific hub</p>
                  </div>
                  <div className="text-center p-3">
                    <Globe className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-sm">UAE</h3>
                    <p className="text-xs text-gray-600">Middle East center</p>
                  </div>
                  <div className="text-center p-3">
                    <Globe className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-sm">United States</h3>
                    <p className="text-xs text-gray-600">
                      North American market
                    </p>
                  </div>
                  <div className="text-center p-3">
                    <Globe className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-sm">India</h3>
                    <p className="text-xs text-gray-600">Global headquarters</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Technology Tab */}
          <TabsContent value="technology" className="space-y-4">
            <Card className="p-6">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-center">
                  Technology Training Distribution (2024)
                </CardTitle>
                <p className="text-center text-gray-600">
                  35,000 learners across diverse technology domains
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {technologyDistribution.map((tech, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold text-gray-900">
                          {tech.domain}
                        </h3>
                        <span className="text-lg font-bold text-blue-600">
                          {tech.learners.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${tech.percentage}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        {tech.percentage}% of total training volume
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Government Tab */}
          <TabsContent value="government" className="space-y-4">
            <Card className="p-6">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-center">
                  Government Partnership Impact
                </CardTitle>
                <p className="text-center text-gray-600">
                  40,000 total learners through strategic government
                  collaborations
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {governmentPrograms.map((program, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="mb-2">
                        <h3 className="font-semibold text-sm mb-1">
                          {program.partner}
                        </h3>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-2xl font-bold text-blue-600">
                            {program.learners.toLocaleString()}
                          </span>
                          <span className="text-xs text-gray-600">
                            learners trained
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600">
                        Focus: {program.focus}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sectors Tab */}
          <TabsContent value="sectors" className="space-y-4">
            <Card className="p-6">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-center">
                  BFSI Sector Excellence
                </CardTitle>
                <p className="text-center text-gray-600 mb-6">
                  20,000 learners trained across banking, financial services,
                  and insurance sectors
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <div className="text-lg font-bold text-blue-600 mb-2">
                      Retail Banking
                    </div>
                    <p className="text-sm text-gray-600">
                      Core banking operations and customer relationship
                      management
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg text-center">
                    <div className="text-lg font-bold text-purple-600 mb-2">
                      Strategic Roles
                    </div>
                    <p className="text-sm text-gray-600">
                      Risk management, compliance, and treasury operations
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg text-center">
                    <div className="text-lg font-bold text-green-600 mb-2">
                      Digital Banking
                    </div>
                    <p className="text-sm text-gray-600">
                      Fintech development and digital platform innovation
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Impact;
