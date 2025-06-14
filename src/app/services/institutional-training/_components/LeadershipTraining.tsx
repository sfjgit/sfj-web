"use client";
import React from "react";
import {
  Users,
  Target,
  Zap,
  MessageCircle,
  UserCheck,
  Shield,
  TrendingUp,
  Star,
} from "lucide-react";

const LeadershipTraining = () => {
  const leadershipAreas = [
    {
      title: "Coaching Skills",
      description: "Leaders learn to guide and develop their teams effectively",
      icon: <UserCheck className="h-8 w-8" />,
      color: "bg-blue-500",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Self-Development",
      description:
        "Leaders enhance their self-awareness and emotional intelligence",
      icon: <Star className="h-8 w-8" />,
      color: "bg-green-500",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Change Management",
      description:
        "Leaders adapt to and lead organizational changes in virtual settings",
      icon: <TrendingUp className="h-8 w-8" />,
      color: "bg-purple-500",
      gradient: "from-purple-500 to-violet-500",
    },
    {
      title: "Team Leadership",
      description: "Leaders build high-performing, innovative teams",
      icon: <Users className="h-8 w-8" />,
      color: "bg-orange-500",
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "Delegation",
      description: "Leaders empower teams by delegating tasks effectively",
      icon: <Target className="h-8 w-8" />,
      color: "bg-indigo-500",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      title: "Conflict Resolution",
      description:
        "Leaders resolve conflicts constructively and foster collaboration",
      icon: <MessageCircle className="h-8 w-8" />,
      color: "bg-teal-500",
      gradient: "from-teal-500 to-green-500",
    },
  ];

  const insurancePrograms = [
    {
      category: "Compliance & Regulation",
      roles: ["Compliance Officer", "Audit Analyst"],
      icon: <Shield className="h-6 w-6" />,
      color: "bg-blue-500",
    },
    {
      category: "Claims Management",
      roles: [
        "Claims Processor",
        "Claims Analyst",
        "Claims Adjuster",
        "Claims Manager",
      ],
      icon: <MessageCircle className="h-6 w-6" />,
      color: "bg-green-500",
    },
    {
      category: "Sales & Distribution",
      roles: [
        "Insurance Sales Executive",
        "Agency Manager",
        "Bancassurance Executive",
      ],
      icon: <TrendingUp className="h-6 w-6" />,
      color: "bg-purple-500",
    },
    {
      category: "Actuarial & Risk",
      roles: ["Actuarial Analyst", "Risk Modeler", "Pricing Analyst"],
      icon: <Target className="h-6 w-6" />,
      color: "bg-orange-500",
    },
  ];

  return (
    <section id="leadership" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Leadership Training Programs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive leadership development with specialized training
            modules for building effective leaders
          </p>
        </div>

        {/* Central Leadership Hub */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
              <Users className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Central Leadership Hub
            </h3>
            <p className="text-gray-600">
              6 key areas of leadership development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadershipAreas.map((area, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div
                  className={`bg-gradient-to-r ${area.gradient} p-6 text-white`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      {area.icon}
                    </div>
                    <h4 className="text-xl font-bold">{area.title}</h4>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-4">{area.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insurance Industry Programs */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Insurance Industry Training
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Specialized training programs covering all aspects of the
              insurance industry from compliance to customer experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {insurancePrograms.map((program, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl p-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`${program.color} p-2 rounded-lg text-white`}>
                    {program.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {program.category}
                  </h4>
                </div>

                <div className="space-y-2">
                  {program.roles.map((role, roleIndex) => (
                    <div
                      key={roleIndex}
                      className="flex items-center space-x-2"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{role}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Insurance Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h5 className="font-semibold text-gray-900 mb-2">
                Customer Experience
              </h5>
              <div className="text-sm text-gray-600 space-y-1">
                <div>Customer Success Manager</div>
                <div>Product Innovation Analyst</div>
              </div>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h5 className="font-semibold text-gray-900 mb-2">Underwriting</h5>
              <div className="text-sm text-gray-600 space-y-1">
                <div>Underwriter</div>
                <div>Risk Analyst</div>
                <div>Underwriting Assistant</div>
              </div>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h5 className="font-semibold text-gray-900 mb-2">
                Operations & IT
              </h5>
              <div className="text-sm text-gray-600 space-y-1">
                <div>Insurance Business Analyst</div>
                <div>System Analyst</div>
                <div>Operations Manager</div>
              </div>
            </div>
          </div>
        </div>

        {/* Change Strategies Addition */}
        <div className="mt-12 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1  gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Change Strategies</h3>
              <p className="text-blue-100 mb-6">
                Leaders implement effective change management models to navigate
                organizational transformations successfully
              </p>
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <span className="font-semibold">
                  Advanced Change Management Models
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipTraining;
