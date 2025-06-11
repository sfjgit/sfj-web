import React from "react";
import { Building2, MapPin, Globe, Users } from "lucide-react";

// Office data with icons instead of emojis
const officesData = [
  {
    location: "Singapore",
    type: "Global Headquarters",
    description: "Primary delivery center",
    icon: Building2,
    gradient: "from-blue-500 to-blue-600",
  },
  {
    location: "India",
    type: "Asia-Pacific Hub",
    description: "Regional training center",
    icon: Users,
    gradient: "from-green-500 to-green-600",
  },
  {
    location: "UAE",
    type: "Middle East Operations",
    description: "MENA market focus",
    icon: Globe,
    gradient: "from-purple-500 to-purple-600",
  },
  {
    location: "United States",
    type: "North America",
    description: "Market development",
    icon: MapPin,
    gradient: "from-orange-500 to-orange-600",
  },
];

interface Office {
  location: string;
  type: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
  gradient: string;
}

const OfficeCard: React.FC<{ office: Office }> = ({ office }) => {
  const IconComponent = office.icon;

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      {/* Gradient background overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${office.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
      ></div>

      <div className="relative p-6 sm:p-8">
        {/* Icon */}
        <div
          className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${office.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}
        >
          <IconComponent className="w-7 h-7 text-white" />
        </div>

        {/* Location */}
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
          {office.location}
        </h3>

        {/* Type */}
        <p
          className={`text-sm font-semibold bg-gradient-to-r ${office.gradient} bg-clip-text text-transparent mb-3`}
        >
          {office.type}
        </p>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed">
          {office.description}
        </p>

        {/* Decorative element */}
        <div
          className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${office.gradient} w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl`}
        ></div>
      </div>
    </div>
  );
};

const GlobalPresenceSection: React.FC = () => (
  <section className="py-12 sm:py-20 bg-gradient-to-b from-gray-50 to-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
          Global Presence, Local Impact
        </h2>
        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4 sm:mb-6 rounded-full"></div>
        <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto px-4 font-medium leading-relaxed">
          With offices strategically located across Singapore, UAE, and the
          United States, SFJ delivers consistent, high-quality training
          experiences while adapting to local market needs.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {officesData.map((office, index) => (
          <OfficeCard key={index} office={office} />
        ))}
      </div>

      {/* Optional: Add a subtle pattern or decoration */}
      <div className="mt-16 text-center">
        <div className="inline-flex items-center space-x-2 text-gray-400">
          <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
          <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
          <div className="w-2 h-2 bg-green-300 rounded-full"></div>
          <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
        </div>
      </div>
    </div>
  </section>
);

export default GlobalPresenceSection;
