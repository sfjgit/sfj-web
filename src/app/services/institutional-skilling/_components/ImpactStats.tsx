"use client";
import React from "react";
import {
  Users,
  Award,
  Building2,
  TrendingUp,
  Star,
  Globe,
  Target,
} from "lucide-react";

const ImpactStats = () => {
  const stats = [
    {
      number: "20,000+",
      label: "Students Trained",
      description: "Across multiple disciplines",
      icon: <Users className="h-8 w-8" />,
      color: "bg-blue-500",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      number: "50+",
      label: "Training Modules",
      description: "Industry-specific programs",
      icon: <Award className="h-8 w-8" />,
      color: "bg-green-500",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      number: "200+",
      label: "Partner Institutions",
      description: "Colleges and universities",
      icon: <Building2 className="h-8 w-8" />,
      color: "bg-purple-500",
      gradient: "from-purple-500 to-violet-500",
    },
    {
      number: "95%",
      label: "Placement Success",
      description: "Industry placement rate",
      icon: <TrendingUp className="h-8 w-8" />,
      color: "bg-orange-500",
      gradient: "from-orange-500 to-red-500",
    },
    {
      number: "100+",
      label: "Industry Certifications",
      description: "Global recognition",
      icon: <Star className="h-8 w-8" />,
      color: "bg-indigo-500",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      number: "25+",
      label: "Countries Reached",
      description: "International presence",
      icon: <Globe className="h-8 w-8" />,
      color: "bg-teal-500",
      gradient: "from-teal-500 to-green-500",
    },
  ];

  const successMetrics = [
    {
      title: "Student Satisfaction",
      percentage: 98,
      description: "Positive feedback rating",
    },
    {
      title: "Industry Partnerships",
      percentage: 92,
      description: "Active corporate collaborations",
    },
    {
      title: "Course Completion",
      percentage: 94,
      description: "Program completion rate",
    },
    {
      title: "Skill Certification",
      percentage: 89,
      description: "Students achieving certifications",
    },
  ];

  const audienceCoverage = [
    {
      field: "Engineering",
      students: "8,500+",
      color: "bg-blue-100 text-blue-800",
    },
    {
      field: "MBA & Management",
      students: "4,200+",
      color: "bg-green-100 text-green-800",
    },
    {
      field: "Arts & Science",
      students: "3,800+",
      color: "bg-purple-100 text-purple-800",
    },
    {
      field: "B.Com",
      students: "2,100+",
      color: "bg-orange-100 text-orange-800",
    },
    {
      field: "Polytechnic",
      students: "1,400+",
      color: "bg-indigo-100 text-indigo-800",
    },
  ];

  return (
    <section id="impact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Impact & Achievements
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transforming education and careers across diverse fields with
            measurable results and industry recognition
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="relative group">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.gradient} rounded-xl mb-6 text-white`}
                >
                  {stat.icon}
                </div>

                <div className="space-y-2">
                  <div className="text-3xl lg:text-4xl font-bold text-gray-900">
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold text-gray-700">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-500">
                    {stat.description}
                  </div>
                </div>

                {/* Visual accent */}
                <div
                  className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-bl-full`}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Success Metrics */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Performance Metrics
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {successMetrics.map((metric, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg
                    className="w-24 h-24 transform -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#3b82f6"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${metric.percentage * 2.51} ${
                        251 - metric.percentage * 2.51
                      }`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-900">
                      {metric.percentage}%
                    </span>
                  </div>
                </div>

                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {metric.title}
                </h4>
                <p className="text-sm text-gray-600">{metric.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Audience Coverage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Diverse Audience Coverage
            </h3>
            <p className="text-gray-600 mb-8">
              We cater to a vast and inclusive audience across multiple
              educational backgrounds, ensuring comprehensive skill development
              for all students.
            </p>

            <div className="space-y-4">
              {audienceCoverage.map((audience, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="font-medium text-gray-900">
                      {audience.field}
                    </span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${audience.color}`}
                  >
                    {audience.students}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            {/* Placeholder for impact visualization */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 h-96 flex flex-col items-center justify-center">
              <div className="text-center mb-6">
                <Target className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  Impact Visualization
                </h4>
                <p className="text-gray-600">
                  Interactive charts and success stories
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">24/7</div>
                  <div className="text-xs text-gray-600">Learning Support</div>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">365</div>
                  <div className="text-xs text-gray-600">Days Uptime</div>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">15+</div>
                  <div className="text-xs text-gray-600">Years Experience</div>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-600">500+</div>
                  <div className="text-xs text-gray-600">Expert Trainers</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Transform Your Institution?
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join thousands of institutions that have already partnered with us
            to enhance their students career prospects
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Started Today
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
