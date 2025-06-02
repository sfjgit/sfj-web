"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, Globe, Award } from "lucide-react";

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
    <div className="min-h-screen bg-white">
      <section className="relative h-[70vh] pt-24 pb-12 text-white overflow-hidden flex items-center">
        {/* Background Video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={(e) => console.log("Video error:", e)}
        >
          <source src="/app/home/hero-section.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay for readability */}

        {/* Text Content */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Measurable Success Across Global Markets
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Transforming careers and organizations through data-driven
              training excellence
            </p>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {keyMetrics.map((metric, index) => {
              const IconComponent = metric.icon;
              return (
                <Card
                  key={index}
                  className="text-center p-6 hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-blue-100 rounded-full">
                        <IconComponent className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                    <CardTitle className="text-3xl font-bold text-blue-900 mb-2">
                      {metric.value}
                    </CardTitle>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {metric.label}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{metric.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology Training Distribution */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Technology Training Distribution (2024)
            </h2>
            <p className="text-xl text-gray-600">
              35,000 learners across diverse technology domains
            </p>
          </div>

          <div className="space-y-6">
            {technologyDistribution.map((tech, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {tech.domain}
                  </h3>
                  <span className="text-2xl font-bold text-blue-600">
                    {tech.learners.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${tech.percentage}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {tech.percentage}% of total training volume
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Government Partnerships */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Government Partnership Impact
            </h2>
            <p className="text-xl text-gray-600">
              40,000 total learners through strategic government collaborations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {governmentPrograms.map((program, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <CardTitle className="text-lg">{program.partner}</CardTitle>
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl font-bold text-blue-600">
                      {program.learners.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-600">
                      learners trained
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Focus: {program.focus}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* BFSI Sector Impact */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              BFSI Sector Excellence
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              20,000 learners trained across banking, financial services, and
              insurance sectors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                Retail Banking
              </div>
              <p className="text-gray-600">
                Core banking operations and customer relationship management
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                Strategic Roles
              </div>
              <p className="text-gray-600">
                Risk management, compliance, and treasury operations
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">
                Digital Banking
              </div>
              <p className="text-gray-600">
                Fintech development and digital platform innovation
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Global Reach */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Global Reach & Recognition
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 text-center">
              <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Singapore</h3>
              <p className="text-gray-600">Asia-Pacific regional hub</p>
            </Card>
            <Card className="p-6 text-center">
              <Globe className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">UAE</h3>
              <p className="text-gray-600">Middle East operations center</p>
            </Card>
            <Card className="p-6 text-center">
              <Globe className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">United States</h3>
              <p className="text-gray-600">North American market</p>
            </Card>
            <Card className="p-6 text-center">
              <Globe className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">India</h3>
              <p className="text-gray-600">Global headquarters</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Impact;
