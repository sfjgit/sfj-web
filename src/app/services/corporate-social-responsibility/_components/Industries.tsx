import { useState } from "react";

const IndustriesSection = () => {
  const [showAll, setShowAll] = useState(false);

  // Industries array
  const industries = [
    "Automotive",
    "Communications",
    "Construction and Engineering",
    "Consumer Packaged Goods",
    "Defense and Intelligence",
    "Education",
    "Financial Services",
    "Government",
    "Health",
    "High Technology",
    "Hospitality",
    "Industrial Manufacturing",
    "Life Sciences",
    "Media and Entertainment",
    "Oil and Gas",
    "Professional Services",
    "Public Safety",
    "Restaurants",
    "Retail",
    "Transportation and Logistics",
    "Utilities",
    "Wholesale Distribution",
    "Aerospace and Defence",
    "Agribusiness",
    "Banking",
    "Chemicals",
    "Consumer Products",
    "Defence and Security",
    "Insurance",
    "Mining",
  ];

  const displayedIndustries = showAll ? industries : industries.slice(0, 8);

  return (
    <section className="relative py-20  overflow-hidden">
      {/* Advanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400/20 rotate-45 animate-bounce"></div>
        <div className="absolute top-40 right-16 w-6 h-6 bg-sky-400/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-20 w-5 h-5 bg-indigo-400/20 rotate-12 animate-bounce delay-500"></div>
        <div className="absolute bottom-20 right-32 w-8 h-2 bg-blue-400/20 rounded-full animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-400/20 rounded-full text-sm font-medium text-blue-300 backdrop-blur-sm mb-6">
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
            Trusted Across Industries
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Industries We{" "}
            <span className="bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
              Serve
            </span>
          </h2>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Delivering excellence across diverse sectors with tailored solutions
            that drive growth and innovation for businesses of all sizes
          </p>
        </div>

        {/* Industries Grid with Enhanced Design */}
        <div className="relative">
          {/* Background Container with Multiple Layers */}
          <div className="relative p-8 lg:p-12 rounded-3xl overflow-hidden">
            {/* Glassmorphism Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/2 to-transparent backdrop-blur-xl border border-white/10 rounded-3xl"></div>

            {/* Inner Glow */}
            <div className="absolute inset-2 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-2xl"></div>

            {/* Content Grid */}
            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedIndustries.map((industry, index) => (
                <div key={index} className="group relative overflow-hidden">
                  {/* Card Background with Gradient Border */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-sky-500/20 to-indigo-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>

                  {/* Main Card */}
                  <div className="relative flex flex-col items-center text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10">
                    {/* Icon Container */}
                    <div className="mb-4 p-4 rounded-full bg-gradient-to-br from-blue-500/10 to-indigo-500/10 group-hover:from-blue-500/20 group-hover:to-indigo-500/20 transition-all duration-300 ring-1 ring-white/10 group-hover:ring-white/20">
                      <img
                        src={`/app/CSR/${index + 1}.png`}
                        alt={industry}
                        className="w-12 h-12 object-contain transition-all duration-500 group-hover:scale-110 filter brightness-0 invert group-hover:drop-shadow-lg"
                      />
                    </div>

                    {/* Industry Name */}
                    <p className="text-base font-semibold text-white group-hover:text-blue-200 transition-colors duration-300 leading-tight">
                      {industry}
                    </p>

                    {/* Hover Effect Indicator */}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-sky-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Show More/Less Button */}
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setShowAll(!showAll)}
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 overflow-hidden"
              >
                {/* Button Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Button Content */}
                <span className="relative flex items-center">
                  {showAll ? (
                    <>
                      Show Less Industries
                      <svg
                        className="ml-2 w-5 h-5 transition-transform group-hover:-translate-y-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      View All Industries
                      <svg
                        className="ml-2 w-5 h-5 transition-transform group-hover:translate-y-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </>
                  )}
                </span>

                {/* Counter Badge */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
