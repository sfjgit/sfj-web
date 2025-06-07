"use client";
import React from "react";
import {
  Banknote,
  Factory,
  Heart,
  Shield,
  Smartphone,
  Globe,
  Target,
} from "lucide-react";

const IndustrySolutions = () => {
  const industries = [
    {
      name: "Banking & Financial Services",
      description: "BFSI Training Programs",
      trainees: "20,000",
      icon: Banknote,
      color: "bg-blue-500",
      specializations: [
        "Digital Banking",
        "Risk Management",
        "Compliance",
        "Fintech",
      ],
    },
    {
      name: "Healthcare & Life Sciences",
      description: "Medical Technology Training",
      trainees: "2,500",
      icon: Heart,
      color: "bg-red-500",
      specializations: [
        "Health Data Analytics",
        "Digital Health",
        "Medical Imaging",
        "Telemedicine",
      ],
    },
    {
      name: "Manufacturing & Industry 4.0",
      description: "Smart Manufacturing Solutions",
      trainees: "4,000",
      icon: Factory,
      color: "bg-orange-500",
      specializations: [
        "IoT Systems",
        "Predictive Maintenance",
        "Digital Twins",
        "Automation",
      ],
    },
    {
      name: "Technology & Software",
      description: "High-Tech Solutions",
      trainees: "8,000",
      icon: Smartphone,
      color: "bg-purple-500",
      specializations: ["DevOps", "Cloud Platforms", "AI/ML", "Cybersecurity"],
    },
    {
      name: "Telecommunications",
      description: "Telecom Infrastructure",
      trainees: "1,500",
      icon: Globe,
      color: "bg-green-500",
      specializations: [
        "5G Networks",
        "OSS/BSS",
        "Network Security",
        "IoT Integration",
      ],
    },
    {
      name: "Government & Defense",
      description: "Public Sector Training",
      trainees: "3,000",
      icon: Shield,
      color: "bg-gray-600",
      specializations: [
        "Cyber Intelligence",
        "Digital Governance",
        "Security Systems",
        "AI Surveillance",
      ],
    },
  ];

  const trainingMethods = [
    {
      name: "Instructor-Led Training",
      description: "Real-time interaction and feedback",
    },
    { name: "E-Learning", description: "Flexible and self-paced learning" },
    {
      name: "Blended Learning",
      description: "Comprehensive learning approach",
    },
    { name: "Simulation-Based", description: "Hands-on experience scenarios" },
    { name: "On-the-Job Training", description: "Practical workplace skills" },
  ];

  return (
    <section id="industries" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Industry-Specific Training Solutions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Tailored programs designed for sector-specific challenges and
            opportunities across diverse industries worldwide.
          </p>
        </div>

        {/* Industry Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg ${industry.color} flex items-center justify-center mr-4`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {industry.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {industry.description}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Professionals Trained
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      {industry.trainees}+
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${industry.color}`}
                      style={{
                        width: `${Math.min(
                          parseInt(industry.trainees) / 200,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700 mb-2">
                    Key Specializations:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {industry.specializations.map((spec, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Image Placeholder */}
                <div className="mt-4 bg-gray-100 rounded-lg h-24 flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <div className="text-sm text-gray-500">Industry Image</div>
                    <div className="text-xs text-gray-400">
                      Visual Content Area
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Training Methods */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Training Methodologies
          </h3>
          <div className="grid md:grid-cols-5 gap-6">
            {trainingMethods.map((method, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                  {method.name}
                </h4>
                <p className="text-xs text-gray-600">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustrySolutions;
