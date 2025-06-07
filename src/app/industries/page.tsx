"use client";
import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  Building2,
  Heart,
  Shield,
  Car,
  Plane,
  Zap,
  Factory,
  Briefcase,
  Globe,
  TrendingUp,
  Users,
  Cpu,
  Wrench,
  Hammer,
  Truck,
  Phone,
  GraduationCap,
  PiggyBank,
  Landmark,
  Home,
  Utensils,
  ShoppingBag,
  Fuel,
  TreePine,
} from "lucide-react";

const IndustriesPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hoveredIndustry, setHoveredIndustry] = useState(null);

  const categories = [
    { id: "all", label: "All Industries", count: 29 },
    { id: "technology", label: "Technology & Digital", count: 3 },
    { id: "financial", label: "Financial Services", count: 3 },
    { id: "industrial", label: "Industrial & Manufacturing", count: 8 },
    { id: "services", label: "Services & Commerce", count: 7 },
    { id: "infrastructure", label: "Infrastructure & Utilities", count: 6 },
  ];

  const industries = [
    {
      name: "Automotive",
      category: "industrial",
      icon: Car,
      description:
        "Comprehensive solutions for automotive manufacturers, suppliers, and dealerships. From design and manufacturing to sales and maintenance services.",
      keyAreas: [
        "Manufacturing",
        "Supply Chain",
        "Dealership Networks",
        "Electric Vehicles",
      ],
      color: "from-blue-500 to-blue-700",
      stats: "1B+ vehicles globally",
    },
    {
      name: "Healthcare",
      category: "services",
      icon: Heart,
      description:
        "Supporting healthcare providers, medical equipment manufacturers, pharmaceuticals, and insurance companies with innovative solutions.",
      keyAreas: [
        "Medical Equipment",
        "Pharmaceuticals",
        "Healthcare Facilities",
        "Health Insurance",
      ],
      color: "from-red-500 to-red-700",
      stats: "10% of global GDP",
    },
    {
      name: "Financial Services",
      category: "financial",
      icon: PiggyBank,
      description:
        "Empowering banks, investment firms, insurance companies, and fintech startups with secure, scalable financial technology solutions.",
      keyAreas: ["Banking", "Investment Management", "Insurance", "Fintech"],
      color: "from-green-500 to-green-700",
      stats: "$23.7T in US assets",
    },
    {
      name: "Communications",
      category: "technology",
      icon: Phone,
      description:
        "Enabling telecommunications companies and digital communication platforms to deliver seamless connectivity worldwide.",
      keyAreas: [
        "Telecom Infrastructure",
        "5G Networks",
        "Digital Platforms",
        "Satellite Communications",
      ],
      color: "from-purple-500 to-purple-700",
      stats: "5G revolution ongoing",
    },
    {
      name: "Construction and Engineering",
      category: "industrial",
      icon: Hammer,
      description:
        "Supporting construction companies and engineering firms with project management, safety solutions, and infrastructure development.",
      keyAreas: [
        "Project Management",
        "Safety Systems",
        "Infrastructure",
        "Smart Buildings",
      ],
      color: "from-orange-500 to-orange-700",
      stats: "13% of global GDP",
    },
    {
      name: "Consumer Packaged Goods",
      category: "services",
      icon: ShoppingBag,
      description:
        "Helping CPG companies optimize supply chains, enhance customer experience, and drive brand innovation.",
      keyAreas: [
        "Supply Chain",
        "Brand Management",
        "Retail Analytics",
        "E-commerce",
      ],
      color: "from-pink-500 to-pink-700",
      stats: "Fast-moving goods",
    },
    {
      name: "Defense and Intelligence",
      category: "infrastructure",
      icon: Shield,
      description:
        "Providing secure, mission-critical solutions for defense contractors and intelligence agencies.",
      keyAreas: [
        "Cybersecurity",
        "Intelligence Systems",
        "Defense Technology",
        "Secure Communications",
      ],
      color: "from-gray-600 to-gray-800",
      stats: "National security focus",
    },
    {
      name: "Education",
      category: "services",
      icon: GraduationCap,
      description:
        "Transforming educational institutions with digital learning platforms, administrative systems, and student management solutions.",
      keyAreas: [
        "Digital Learning",
        "Student Management",
        "Research Systems",
        "Campus Technology",
      ],
      color: "from-indigo-500 to-indigo-700",
      stats: "Digital transformation",
    },
    {
      name: "Government",
      category: "infrastructure",
      icon: Landmark,
      description:
        "Supporting government agencies with citizen services, digital transformation, and public sector modernization.",
      keyAreas: [
        "Citizen Services",
        "Digital Government",
        "Public Safety",
        "Policy Management",
      ],
      color: "from-blue-600 to-blue-800",
      stats: "Public sector innovation",
    },
    {
      name: "High Technology",
      category: "technology",
      icon: Cpu,
      description:
        "Partnering with tech companies to accelerate innovation in AI, cloud computing, IoT, and emerging technologies.",
      keyAreas: [
        "AI & Machine Learning",
        "Cloud Computing",
        "IoT Solutions",
        "Emerging Tech",
      ],
      color: "from-cyan-500 to-cyan-700",
      stats: "Innovation leaders",
    },
    {
      name: "Hospitality",
      category: "services",
      icon: Home,
      description:
        "Enhancing guest experiences for hotels, resorts, and hospitality companies through technology and service innovation.",
      keyAreas: [
        "Guest Experience",
        "Property Management",
        "Booking Systems",
        "Service Optimization",
      ],
      color: "from-yellow-500 to-yellow-700",
      stats: "Experience economy",
    },
    {
      name: "Industrial Manufacturing",
      category: "industrial",
      icon: Factory,
      description:
        "Optimizing manufacturing processes with automation, quality control, and supply chain management solutions.",
      keyAreas: [
        "Automation",
        "Quality Control",
        "Supply Chain",
        "Industry 4.0",
      ],
      color: "from-slate-500 to-slate-700",
      stats: "Industry 4.0 adoption",
    },
    {
      name: "Life Sciences",
      category: "services",
      icon: TreePine,
      description:
        "Supporting pharmaceutical, biotechnology, and medical device companies with research, development, and regulatory solutions.",
      keyAreas: [
        "Drug Development",
        "Clinical Research",
        "Regulatory Compliance",
        "Biotechnology",
      ],
      color: "from-emerald-500 to-emerald-700",
      stats: "Life-saving innovation",
    },
    {
      name: "Media and Entertainment",
      category: "technology",
      icon: TrendingUp,
      description:
        "Enabling media companies and entertainment platforms to create, distribute, and monetize content globally.",
      keyAreas: [
        "Content Creation",
        "Streaming Platforms",
        "Digital Distribution",
        "Audience Analytics",
      ],
      color: "from-violet-500 to-violet-700",
      stats: "Digital content boom",
    },
    {
      name: "Oil and Gas",
      category: "infrastructure",
      icon: Fuel,
      description:
        "Supporting energy companies with exploration, production, refining, and distribution technologies.",
      keyAreas: [
        "Exploration Technology",
        "Production Optimization",
        "Refining Processes",
        "Distribution Networks",
      ],
      color: "from-amber-600 to-amber-800",
      stats: "Energy sector leader",
    },
    {
      name: "Professional Services",
      category: "services",
      icon: Briefcase,
      description:
        "Empowering consulting firms, legal practices, and professional service providers with operational excellence.",
      keyAreas: [
        "Consulting Solutions",
        "Legal Technology",
        "Knowledge Management",
        "Client Relations",
      ],
      color: "from-teal-500 to-teal-700",
      stats: "Knowledge economy",
    },
    {
      name: "Public Safety",
      category: "infrastructure",
      icon: Shield,
      description:
        "Enhancing public safety through emergency response systems, law enforcement technology, and crisis management.",
      keyAreas: [
        "Emergency Response",
        "Law Enforcement",
        "Crisis Management",
        "Public Security",
      ],
      color: "from-red-600 to-red-800",
      stats: "Community protection",
    },
    {
      name: "Restaurants",
      category: "services",
      icon: Utensils,
      description:
        "Helping restaurants and food service companies optimize operations, enhance customer experience, and drive growth.",
      keyAreas: [
        "Point of Sale",
        "Inventory Management",
        "Customer Experience",
        "Delivery Platforms",
      ],
      color: "from-orange-400 to-orange-600",
      stats: "Food service industry",
    },
    {
      name: "Retail",
      category: "services",
      icon: ShoppingBag,
      description:
        "Transforming retail experiences with omnichannel solutions, inventory management, and customer analytics.",
      keyAreas: [
        "Omnichannel Retail",
        "Inventory Systems",
        "Customer Analytics",
        "E-commerce Platforms",
      ],
      color: "from-rose-500 to-rose-700",
      stats: "Digital retail growth",
    },
    {
      name: "Transportation and Logistics",
      category: "infrastructure",
      icon: Truck,
      description:
        "Optimizing supply chains and transportation networks with smart logistics and fleet management solutions.",
      keyAreas: [
        "Fleet Management",
        "Supply Chain",
        "Route Optimization",
        "Logistics Technology",
      ],
      color: "from-blue-500 to-blue-700",
      stats: "Global connectivity",
    },
    {
      name: "Utilities",
      category: "infrastructure",
      icon: Zap,
      description:
        "Supporting utility companies with smart grid technology, renewable energy integration, and infrastructure modernization.",
      keyAreas: [
        "Smart Grid",
        "Renewable Energy",
        "Infrastructure",
        "Energy Management",
      ],
      color: "from-yellow-600 to-yellow-800",
      stats: "Clean energy transition",
    },
    {
      name: "Wholesale Distribution",
      category: "industrial",
      icon: Building2,
      description:
        "Streamlining wholesale operations with inventory management, order processing, and distribution optimization.",
      keyAreas: [
        "Inventory Management",
        "Order Processing",
        "Distribution",
        "B2B Platforms",
      ],
      color: "from-gray-500 to-gray-700",
      stats: "B2B commerce",
    },
    {
      name: "Aerospace and Defence",
      category: "industrial",
      icon: Plane,
      description:
        "Advancing aerospace and defense capabilities with cutting-edge technology, manufacturing solutions, and mission-critical systems.",
      keyAreas: [
        "Aircraft Manufacturing",
        "Defense Systems",
        "Space Technology",
        "Aviation Services",
      ],
      color: "from-sky-600 to-sky-800",
      stats: "Sky-high innovation",
    },
    {
      name: "Agribusiness",
      category: "industrial",
      icon: TreePine,
      description:
        "Modernizing agriculture with precision farming, supply chain optimization, and sustainable farming solutions.",
      keyAreas: [
        "Precision Farming",
        "Supply Chain",
        "Sustainability",
        "Agricultural Technology",
      ],
      color: "from-green-600 to-green-800",
      stats: "Feeding the world",
    },
    {
      name: "Banking",
      category: "financial",
      icon: Landmark,
      description:
        "Revolutionizing banking with digital transformation, customer experience enhancement, and financial innovation.",
      keyAreas: [
        "Digital Banking",
        "Customer Experience",
        "Risk Management",
        "Payment Systems",
      ],
      color: "from-emerald-600 to-emerald-800",
      stats: "Digital banking era",
    },
    {
      name: "Chemicals",
      category: "industrial",
      icon: Factory,
      description:
        "Supporting chemical companies with process optimization, safety management, and sustainable production methods.",
      keyAreas: [
        "Process Optimization",
        "Safety Management",
        "Sustainability",
        "Quality Control",
      ],
      color: "from-purple-600 to-purple-800",
      stats: "Chemical innovation",
    },
    {
      name: "Consumer Products",
      category: "services",
      icon: Users,
      description:
        "Enhancing consumer product companies with market insights, product development, and customer engagement strategies.",
      keyAreas: [
        "Market Research",
        "Product Development",
        "Customer Engagement",
        "Brand Strategy",
      ],
      color: "from-pink-600 to-pink-800",
      stats: "Consumer-centric",
    },
    {
      name: "Insurance",
      category: "financial",
      icon: Shield,
      description:
        "Transforming insurance operations with digital claims processing, risk assessment, and customer service automation.",
      keyAreas: [
        "Claims Processing",
        "Risk Assessment",
        "Customer Service",
        "Regulatory Compliance",
      ],
      color: "from-blue-700 to-blue-900",
      stats: "$1.9T US premiums",
    },
    {
      name: "Mining",
      category: "industrial",
      icon: Wrench,
      description:
        "Optimizing mining operations with automation, safety systems, and environmental monitoring solutions.",
      keyAreas: [
        "Mining Automation",
        "Safety Systems",
        "Environmental Monitoring",
        "Resource Management",
      ],
      color: "from-stone-600 to-stone-800",
      stats: "Resource extraction",
    },
  ];

  const filteredIndustries = industries.filter((industry) => {
    const matchesSearch =
      industry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      industry.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || industry.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-20">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-400/20 rounded-full text-sm font-medium text-blue-300 backdrop-blur-sm mb-6">
              <Globe className="w-4 h-4 mr-2" />
              Trusted Across Industries
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
              Industries We{" "}
              <span className="bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
                Serve
              </span>
            </h1>

            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Delivering excellence across 29+ diverse sectors with tailored
              solutions that drive growth, innovation, and digital
              transformation for businesses of all sizes
            </p>

            {/* Search and Filter */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-center">
                {/* <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search industries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div> */}

                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedCategory === category.id
                          ? "bg-blue-500 text-white shadow-lg"
                          : "bg-white/10 text-white/80 hover:bg-white/20"
                      }`}
                    >
                      {category.label}
                      <span className="ml-2 text-xs opacity-75">
                        ({category.count})
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Industries Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIndustries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <div
                key={index}
                onMouseEnter={() =>
                  // @ts-expect-error error
                  setHoveredIndustry(index)
                }
                onMouseLeave={() => setHoveredIndustry(null)}
                className="group relative overflow-hidden"
              >
                {/* Card */}
                <div className="relative h-full bg-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2">
                  {/* Header with Icon and Title */}
                  <div className="p-6 pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-r ${industry.color} shadow-lg`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                          {industry.stats}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {industry.name}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed">
                      {industry.description}
                    </p>
                  </div>

                  {/* Key Areas */}
                  <div className="px-6 pb-6">
                    <div className="mb-3">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">
                        Key Areas:
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {industry.keyAreas.map((area, areaIndex) => (
                        <span
                          key={areaIndex}
                          className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors duration-200"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${industry.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}
                  ></div>

                  {/* Bottom Accent Line */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${industry.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl`}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredIndustries.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No industries found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Industry?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of organizations across these industries who trust us
            to deliver innovative solutions that drive growth and digital
            transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center">
              Get Started Today
              <ChevronDown className="w-5 h-5 ml-2 rotate-[-90deg]" />
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200">
              Contact Our Experts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustriesPage;
