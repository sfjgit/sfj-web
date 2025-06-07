import React from "react";
import { LucideIcon } from "lucide-react";

interface IndustryImpactItem {
  title: string;
  description: string;
  contribution: string;
  icon: LucideIcon;
  color: string;
  stats?: string;
}

interface IndustryImpactProps {
  industryImpacts: IndustryImpactItem[];
}

const IndustryImpact: React.FC<IndustryImpactProps> = ({ industryImpacts }) => {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm border border-slate-200 rounded-full mb-4">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3 animate-pulse"></div>
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Industry Impact
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text">
            Empowering Industries{" "}
            <span className=" text-blue-600">Enabling Growth</span>
          </h2>

          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Our CSR initiatives drive meaningful change across diverse sectors
            through strategic partnerships and innovative solutions.
          </p>
        </div>

        {/* Enhanced Industry Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industryImpacts.map((industry, index) => (
            <div
              key={index}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Floating Accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full -translate-y-10 translate-x-10 group-hover:translate-y-0 group-hover:translate-x-0 transition-transform duration-700"></div>

              <div className="relative z-10">
                {/* Icon & Title Row */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-xl ${industry.color} flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300`}
                    >
                      <industry.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-700 transition-colors duration-300">
                        {industry.title}
                      </h3>
                      {industry.stats && (
                        <div className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md inline-block">
                          {industry.stats}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Impact Section */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Market Impact
                    </h4>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {industry.description}
                  </p>
                </div>

                {/* Contribution Section */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-4 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Our Contribution
                    </h4>
                  </div>
                  <p className="text-sm text-slate-800 leading-relaxed font-medium">
                    {industry.contribution}
                  </p>
                </div>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustryImpact;
