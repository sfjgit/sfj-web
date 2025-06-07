"use client";
import React, { useState } from "react";
import {
  FaUsers,
  FaClock,
  FaUserTie,
  FaFileContract,
  FaUserCheck,
  FaProjectDiagram,
  FaClipboardList,
  FaSearch,
  FaCheckCircle,
  FaUserPlus,
  FaHandshake,
  FaStar,
  FaShieldAlt,
  FaDollarSign,
  FaBullseye,
  FaBrain,
} from "react-icons/fa";

const staffingSolutions = [
  {
    id: 1,
    title: "Temporary Staffing",
    description:
      "Flexible support for project peaks and immediate requirements",
    icon: FaClock,
    features: [
      "Immediate deployment",
      "Project-based duration",
      "Scalable teams",
      "No long-term commitments",
    ],
    color: "bg-blue-50 border-blue-200 text-blue-600",
  },
  {
    id: 2,
    title: "Permanent Staffing",
    description: "Long-term professionals for sustained organizational growth",
    icon: FaUserTie,
    features: [
      "Full-time employees",
      "Long-term commitment",
      "Cultural fit focus",
      "Growth-oriented roles",
    ],
    color: "bg-green-50 border-green-200 text-green-600",
  },
  {
    id: 3,
    title: "Contract Staffing",
    description:
      "Specialized expertise for defined periods without commitments",
    icon: FaFileContract,
    features: [
      "Fixed-term contracts",
      "Specialized skills",
      "Cost-effective",
      "Defined deliverables",
    ],
    color: "bg-purple-50 border-purple-200 text-purple-600",
  },
  {
    id: 4,
    title: "Contract-to-Hire",
    description: "Trial periods before permanent placement decisions",
    icon: FaUserCheck,
    features: [
      "Risk-free evaluation",
      "Performance assessment",
      "Cultural alignment",
      "Conversion option",
    ],
    color: "bg-orange-50 border-orange-200 text-orange-600",
  },
  {
    id: 5,
    title: "Project-Based",
    description: "Expert teams for specific initiatives and niche technologies",
    icon: FaProjectDiagram,
    features: [
      "Complete project teams",
      "Niche expertise",
      "Outcome-focused",
      "Technology specialists",
    ],
    color: "bg-indigo-50 border-indigo-200 text-indigo-600",
  },
];

const processSteps = [
  {
    step: 1,
    title: "Planning",
    description:
      "Understand requirements and create customized recruitment strategies",
    icon: FaClipboardList,
    details: [
      "Requirement analysis",
      "Strategy development",
      "Timeline planning",
      "Resource allocation",
    ],
  },
  {
    step: 2,
    title: "Shortlisting",
    description:
      "Identify best-fit candidates from extensive professional database",
    icon: FaSearch,
    details: [
      "Database screening",
      "Skills matching",
      "Experience validation",
      "Initial filtering",
    ],
  },
  {
    step: 3,
    title: "Assessment",
    description:
      "Technical interviews, practical evaluations, and skills verification",
    icon: FaCheckCircle,
    details: [
      "Technical interviews",
      "Practical tests",
      "Skills verification",
      "Reference checks",
    ],
  },
  {
    step: 4,
    title: "Selection",
    description: "Streamlined candidate comparison and decision support",
    icon: FaUserPlus,
    details: [
      "Candidate comparison",
      "Interview coordination",
      "Decision support",
      "Final evaluation",
    ],
  },
  {
    step: 5,
    title: "Onboarding",
    description:
      "Smooth integration with documentation and orientation support",
    icon: FaHandshake,
    details: [
      "Documentation support",
      "Integration planning",
      "Orientation assistance",
      "Follow-up support",
    ],
  },
];

const benefits = [
  {
    title: "Premium Talent Access",
    description:
      "Extensive network of qualified IT specialists across all domains",
    icon: FaStar,
    color: "text-yellow-600",
  },
  {
    title: "Risk Reduction",
    description:
      "Thorough verification and assessment minimize hiring mistakes",
    icon: FaShieldAlt,
    color: "text-green-600",
  },
  {
    title: "Cost Effective",
    description: "Reduced recruitment expenses and faster time-to-hire",
    icon: FaDollarSign,
    color: "text-blue-600",
  },
  {
    title: "Business Focus",
    description:
      "We handle recruitment globally while you focus on core operations",
    icon: FaBullseye,
    color: "text-purple-600",
  },
  {
    title: "Industry Expertise",
    description:
      "Deep market knowledge and competitive insights across international markets",
    icon: FaBrain,
    color: "text-indigo-600",
  },
];

export default function ITStaffingSolutions() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-600 text-sm font-medium mb-6">
            <FaUsers className="mr-2" />
            Staffing Solutions
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Comprehensive IT{" "}
            <span className="text-blue-600">Staffing Solutions</span>
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From temporary support to permanent placements, we provide tailored
            staffing solutions to meet your unique business requirements.
          </p>
        </div>

        {/* Staffing Solutions Grid */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Our Staffing Solutions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staffingSolutions.map((solution) => {
              const IconComponent = solution.icon;
              return (
                <div
                  key={solution.id}
                  className={`border-2 rounded-xl p-6 hover:shadow-lg transition-all duration-300 ${solution.color}`}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4">
                      <IconComponent className="text-xl" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">
                      {solution.title}
                    </h4>
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {solution.description}
                  </p>

                  <div className="space-y-2">
                    {solution.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center text-sm text-gray-700"
                      >
                        <div className="w-1.5 h-1.5 bg-current rounded-full mr-3"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5-Step Process */}
        <div className="mb-20 bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Our 5-Step Staffing Process
          </h3>

          {/* Process Steps Navigation */}
          <div className="flex flex-wrap justify-center mb-8 gap-4">
            {processSteps.map((step) => (
              <button
                key={step.step}
                onClick={() => setActiveStep(step.step)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeStep === step.step
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                Step {step.step}: {step.title}
              </button>
            ))}
          </div>

          {/* Active Step Details */}
          {processSteps.map((step) => {
            const IconComponent = step.icon;
            return activeStep === step.step ? (
              <div
                key={step.step}
                className="bg-white rounded-xl p-8 shadow-sm animate-fadeIn"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-6">
                    <IconComponent className="text-2xl text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">
                      Step {step.step}: {step.title}
                    </h4>
                    <p className="text-gray-600 text-lg">{step.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {step.details.map((detail, index) => (
                    <div
                      key={index}
                      className="bg-blue-50 p-4 rounded-lg border border-blue-200"
                    >
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        <span className="text-gray-700 font-medium">
                          {detail}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null;
          })}

          {/* Process Flow Indicator */}
          <div className="flex justify-center items-center mt-8 space-x-2">
            {processSteps.map((step) => (
              <div key={step.step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    activeStep === step.step
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {step.step}
                </div>
                {step.step < processSteps.length && (
                  <div
                    className={`w-8 h-0.5 ${
                      activeStep > step.step ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Benefits of Our IT Staffing Agency
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 bg-gray-50 ${benefit.color}`}
                    >
                      <IconComponent className="text-xl" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-blue-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Find Your Perfect IT Team?
          </h3>
          <p className="text-blue-100 mb-6 text-lg">
            Let us help you build a world-class technology team with our
            comprehensive staffing solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Started Today
            </button>
            <button className="px-8 py-3 border border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
