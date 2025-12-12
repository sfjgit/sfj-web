"use client";
import Image from "next/image";

export default function SkillDevelopmentMission() {
  const indiaNeeds = [
    {
      title: "Modernize and unify the national skilling ecosystem",
      description:
        "Integrate industry, academia, and government under a common framework.",
    },
    {
      title: "Align training to real industry needs",
      description:
        "Focus on high-demand sectors like AI, Cloud, Data Engineering, Cybersecurity, and HealthTech.",
    },
    {
      title: "Scale emerging technology skilling",
      description:
        "More than 50% of today's job roles will require digital skills by 2030.",
    },
    {
      title: "Enhance the quality and depth of training programs",
      description:
        "Shift from theory-driven education to hands-on, workplace-ready learning.",
    },
  ];

  const sfjStrengths = [
    {
      title: "Industry-Aligned Training Programs",
    },
    {
      title: "Global Certification Pathways",
    },
    {
      title: "End-to-End Talent Enablement",
    },
    {
      title: "Employment-Linked Skilling",
    },
    {
      title: "Scalable Youth Development Initiatives",
    },
  ];

  const partnerships = [
    "Educational institutions",
    "Corporates",
    "Sector Skill Councils",
    "Government and industry bodies",
  ];

  return (
    <div>
      <section className="bg-gray-50 py-5 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* India Needs Section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-8 justify-center text-center">
              <span className="text-3xl">🎯</span>
              <h6 className="text-lg md:text-3xl font-bold text-gray-800">
                Why India Needs Rapid, Scalable Skill Development
              </h6>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 mt-12">
              {indiaNeeds.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-blue-600 text-2xl flex-shrink-0 mt-1">
                      ✓
                    </span>
                    <div>
                      <h3 className="text-md font-bold text-gray-800 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
              <p className="text-md leading-relaxed text-center">
                If executed effectively, India can strengthen its position as
                the{" "}
                <span className="font-bold">
                  Human Resource Capital of the World
                </span>
                , driving global innovation and economic progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* SFJ Solutions Section */}
          <div>
            <div className="flex items-center gap-2 mb-8 justify-center text-center">
              <span className="text-3xl">🚀</span>
              <h2 className="text-3xl md:text-3xl font-bold text-gray-800">
                How SFJ Business Solutions Leads the Skilling Mission
              </h2>
            </div>

            <p className="text-md text-gray-700 mb-6 leading-relaxed">
              SFJ Business Solutions plays a pivotal role in advancing
              India&apos;s skilling priorities through partnerships with:
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {partnerships.map((partner, index) => (
                <div
                  key={index}
                  className="bg-blue-50 rounded-lg p-4 shadow-sm text-center border-l-4 border-blue-600"
                >
                  <p className="text-gray-700 font-semibold">{partner}</p>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Our Key Strengths:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sfjStrengths.map((strength, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center border-l-4 border-orange-500"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-blue-600 text-xl flex-shrink-0">
                      ✓
                    </span>
                    <h4 className="text-sm font-semibold text-gray-800 leading-tight">
                      {strength.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-5 px-4 md:px-8 lg:px-16">
        <div className="w-full flex justify-center">
          <div className="relative w-full max-w-3xl h-96 md:h-[600px]">
            <Image
              src="/app/skilldevelopmentframework.webp"
              alt="Comprehensive Skill Development Framework"
              fill
              className="object-contain rounded-sm"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
