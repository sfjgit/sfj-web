import React from "react";
import {
  Code,
  Shield,
  Cloud,
  Database,
  Brain,
  Settings,
  BarChart3,
  Users,
  Briefcase,
  GraduationCap,
  Target,
} from "lucide-react";

const TrainingPrograms = () => {
  const programCategories = [
    {
      title: "B2B Corporate Training",
      description: "Upskilling & Reskilling for Working Professionals",
      icon: Briefcase,
      color: "blue",
      programs: [
        { name: "Programming & Development", count: "8000", icon: Code },
        { name: "Cloud Technologies", count: "5000", icon: Cloud },
        { name: "Cybersecurity", count: "1000", icon: Shield },
        { name: "Data Analytics", count: "6000", icon: BarChart3 },
        { name: "Generative AI & ML", count: "4000", icon: Brain },
        { name: "Software Testing", count: "2500", icon: Settings },
      ],
    },
    {
      title: "B2I Student Employability",
      description: "College & Graduate Skills Enhancement",
      icon: GraduationCap,
      color: "green",
      programs: [
        { name: "Engineering Career Pathways", count: "15000", icon: Code },
        { name: "MBA with Global Certification", count: "3000", icon: Target },
        { name: "Arts & Science Programs", count: "5000", icon: Database },
        { name: "Campus to Corporate", count: "8000", icon: Users },
      ],
    },
    {
      title: "Industry-Specific Solutions",
      description: "Sector-focused Training Programs",
      icon: Settings,
      color: "purple",
      programs: [
        { name: "BFSI Training", count: "20000", icon: Briefcase },
        { name: "Healthcare & Life Sciences", count: "2500", icon: Shield },
        { name: "Manufacturing & IoT", count: "4000", icon: Settings },
        { name: "Leadership Development", count: "1500", icon: Users },
      ],
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-50 border-blue-200 text-blue-800",
      green: "bg-green-50 border-green-200 text-green-800",
      purple: "bg-purple-50 border-purple-200 text-purple-800",
    };
    // @ts-expect-error error
    return colors[color] || colors.blue;
  };

  const getIconColor = (color: string) => {
    const colors = {
      blue: "text-blue-600",
      green: "text-green-600",
      purple: "text-purple-600",
    };
    // @ts-expect-error error
    return colors[color] || colors.blue;
  };

  return (
    <section id="programs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Comprehensive Training Ecosystem
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From technical skills to leadership development, we offer end-to-end
            solutions for institutions and corporations worldwide.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {programCategories.map((category, index) => {
            const CategoryIcon = category.icon;
            return (
              <div
                key={index}
                className={`border-2 rounded-2xl p-6 ${getColorClasses(
                  category.color
                )}`}
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`w-12 h-12 rounded-full bg-white flex items-center justify-center mr-4`}
                  >
                    <CategoryIcon
                      className={`w-6 h-6 ${getIconColor(category.color)}`}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{category.title}</h3>
                    <p className="text-sm opacity-80">{category.description}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {category.programs.map((program, idx) => {
                    const ProgramIcon = program.icon;
                    return (
                      <div
                        key={idx}
                        className="bg-white rounded-lg p-3 flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <ProgramIcon className="w-5 h-5 text-gray-600 mr-3" />
                          <span className="text-sm font-medium text-gray-900">
                            {program.name}
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {program.count}+
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 pt-4 border-t border-white/50">
                  <div className="bg-white rounded-lg p-3 text-center">
                    <div className="text-sm text-gray-600">Leave space for</div>
                    <div className="text-xs text-gray-500 italic">
                      Program Images
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrainingPrograms;
