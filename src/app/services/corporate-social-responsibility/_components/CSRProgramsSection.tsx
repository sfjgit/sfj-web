// "use client";
// import React, { useState } from "react";
// import {
//   GraduationCap,
//   Briefcase,
//   TrendingUp,
//   Users,
//   Heart,
//   Home,
//   Leaf,
//   CreditCard,
//   Trophy,
//   Shield,
//   Lightbulb,
//   Handshake,
//   Accessibility,
//   Cpu,
//   ChevronRight,
// } from "lucide-react";
// import Link from "next/link";

// const CSRProgramsSection = () => {
//   const [activeCategory, setActiveCategory] = useState(null);

//   const programs = [
//     {
//       id: 1,
//       category: "Education & Learning",
//       icon: GraduationCap,
//       color: "from-blue-500 to-cyan-500",
//       bgColor: "bg-blue-50",
//       iconBg: "bg-blue-100",
//       textColor: "text-blue-700",
//       initiatives: [
//         "School education support",
//         "Scholarships & higher education",
//         "Digital education & STEM labs",
//         "Adult literacy & remedial learning",
//       ],
//     },
//     {
//       id: 2,
//       category: "Skill Development & Employability",
//       icon: Briefcase,
//       color: "from-purple-500 to-pink-500",
//       bgColor: "bg-purple-50",
//       iconBg: "bg-purple-100",
//       textColor: "text-purple-700",
//       initiatives: [
//         "Youth employability programs",
//         "IT & non-IT job-linked skilling",
//         "Apprenticeship & on-the-job training",
//         "Future skills (AI, data, cloud, BFSI ops)",
//       ],
//     },
//     {
//       id: 3,
//       category: "Livelihood Enhancement & Entrepreneurship",
//       icon: TrendingUp,
//       color: "from-orange-500 to-red-500",
//       bgColor: "bg-orange-50",
//       iconBg: "bg-orange-100",
//       textColor: "text-orange-700",
//       initiatives: [
//         "Self-employment training",
//         "MSME & micro-enterprise support",
//         "Women SHG capacity building",
//         "Income generation programs",
//       ],
//     },
//     {
//       id: 4,
//       category: "Women Empowerment",
//       icon: Users,
//       color: "from-pink-500 to-rose-500",
//       bgColor: "bg-pink-50",
//       iconBg: "bg-pink-100",
//       textColor: "text-pink-700",
//       initiatives: [
//         "Skill & livelihood programs for women",
//         "Financial independence initiatives",
//         "Leadership & entrepreneurship training",
//         "Digital literacy for women",
//       ],
//     },
//     {
//       id: 5,
//       category: "Healthcare & Nutrition",
//       icon: Heart,
//       color: "from-red-500 to-pink-500",
//       bgColor: "bg-red-50",
//       iconBg: "bg-red-100",
//       textColor: "text-red-700",
//       initiatives: [
//         "Preventive healthcare",
//         "Medical infrastructure support",
//         "Maternal & child health",
//         "Nutrition & wellness programs",
//       ],
//     },
//     {
//       id: 6,
//       category: "Rural Development",
//       icon: Home,
//       color: "from-green-500 to-emerald-500",
//       bgColor: "bg-green-50",
//       iconBg: "bg-green-100",
//       textColor: "text-green-700",
//       initiatives: [
//         "Integrated village development",
//         "Drinking water & sanitation",
//         "Rural infrastructure",
//         "Agri & allied livelihood programs",
//       ],
//     },
//     {
//       id: 7,
//       category: "Environmental Sustainability",
//       icon: Leaf,
//       color: "from-emerald-500 to-teal-500",
//       bgColor: "bg-emerald-50",
//       iconBg: "bg-emerald-100",
//       textColor: "text-emerald-700",
//       initiatives: [
//         "Water conservation",
//         "Tree plantation & biodiversity",
//         "Renewable energy",
//         "Climate action & resilience",
//       ],
//     },
//     {
//       id: 8,
//       category: "Financial Literacy & Inclusion",
//       icon: CreditCard,
//       color: "from-indigo-500 to-purple-500",
//       bgColor: "bg-indigo-50",
//       iconBg: "bg-indigo-100",
//       textColor: "text-indigo-700",
//       initiatives: [
//         "Banking & digital payments literacy",
//         "Savings, insurance & credit awareness",
//         "Inclusion of underserved communities",
//       ],
//     },
//     {
//       id: 9,
//       category: "Disability Inclusion & Special Needs",
//       icon: Accessibility,
//       color: "from-violet-500 to-purple-500",
//       bgColor: "bg-violet-50",
//       iconBg: "bg-violet-100",
//       textColor: "text-violet-700",
//       initiatives: [
//         "Skill training for PwDs",
//         "Assistive devices",
//         "Inclusive education & jobs",
//       ],
//     },
//     {
//       id: 10,
//       category: "Sports, Arts & Culture",
//       icon: Trophy,
//       color: "from-yellow-500 to-orange-500",
//       bgColor: "bg-yellow-50",
//       iconBg: "bg-yellow-100",
//       textColor: "text-yellow-700",
//       initiatives: [
//         "Grassroots sports development",
//         "Traditional arts & culture promotion",
//         "Talent scholarships",
//       ],
//     },
//     {
//       id: 11,
//       category: "Disaster Relief & Rehabilitation",
//       icon: Shield,
//       color: "from-red-600 to-orange-600",
//       bgColor: "bg-red-50",
//       iconBg: "bg-red-100",
//       textColor: "text-red-700",
//       initiatives: [
//         "Emergency response",
//         "Rehabilitation & livelihood restoration",
//         "Climate disaster resilience",
//       ],
//     },
//     {
//       id: 12,
//       category: "Technology for Social Good",
//       icon: Cpu,
//       color: "from-cyan-500 to-blue-500",
//       bgColor: "bg-cyan-50",
//       iconBg: "bg-cyan-100",
//       textColor: "text-cyan-700",
//       initiatives: [
//         "Digital platforms for education/health",
//         "AI tools for employability & governance",
//         "Innovation-led CSR pilots",
//       ],
//     },
//   ];

//   return (
//     <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center justify-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
//             <Lightbulb className="w-4 h-4 mr-2" />
//             Our CSR Programs
//           </div>
//           <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
//             Comprehensive Social Impact Initiatives
//           </h2>
//           <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
//             Our CSR programs span across 12 key areas, designed to create
//             sustainable social impact and contribute to nation-building through
//             strategic interventions and community partnerships.
//           </p>
//         </div>

//         {/* Programs Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {programs.map((program) => (
//             <div
//               key={program.id}
//               className={`group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2 ${
//                 activeCategory === program.id
//                   ? "ring-4 ring-blue-500 ring-offset-2"
//                   : ""
//               }`}
//               onClick={() =>
//                 setActiveCategory(
//                   // @ts-expect-error err
//                   activeCategory === program.id ? null : program.id
//                 )
//               }
//             >
//               {/* Gradient Background */}
//               <div
//                 className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${program.color}`}
//               />

//               {/* Card Content */}
//               <div className="p-8">
//                 {/* Icon */}
//                 <div
//                   className={`inline-flex items-center justify-center w-16 h-16 rounded-xl ${program.iconBg} mb-6 group-hover:scale-110 transition-transform duration-300`}
//                 >
//                   <program.icon className={`h-8 w-8 ${program.textColor}`} />
//                 </div>

//                 {/* Title */}
//                 <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
//                   {program.category}
//                 </h3>

//                 {/* Initiatives List */}
//                 <ul className="space-y-3">
//                   {program.initiatives.map((initiative, idx) => (
//                     <li
//                       key={idx}
//                       className="flex items-start text-gray-600 text-sm group/item"
//                     >
//                       <ChevronRight
//                         className={`h-5 w-5 ${program.textColor} mr-2 flex-shrink-0 group-hover/item:translate-x-1 transition-transform`}
//                       />
//                       <span className="leading-relaxed">{initiative}</span>
//                     </li>
//                   ))}
//                 </ul>

//                 {/* Hover Effect Overlay */}
//                 <div
//                   className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Bottom CTA */}
//         <Link href={"/contact?type=csr"}>
//           <div className="mt-16 text-center">
//             <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-6 rounded-2xl shadow-lg">
//               <div className="flex items-center gap-3">
//                 <Handshake className="h-8 w-8" />
//                 <div className="text-left">
//                   <p className="font-semibold text-lg">Partner With Us</p>
//                   <p className="text-blue-100 text-sm">
//                     Create lasting social impact together
//                   </p>
//                 </div>
//               </div>
//               <button className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap">
//                 Get Involved
//               </button>
//             </div>
//           </div>
//         </Link>

//         {/* Stats Footer */}
//         <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
//           <div className="space-y-2">
//             <div className="text-4xl font-bold text-blue-600">12</div>
//             <div className="text-gray-600 text-sm font-medium">
//               Program Categories
//             </div>
//           </div>
//           <div className="space-y-2">
//             <div className="text-4xl font-bold text-purple-600">45+</div>
//             <div className="text-gray-600 text-sm font-medium">
//               Active Initiatives
//             </div>
//           </div>
//           <div className="space-y-2">
//             <div className="text-4xl font-bold text-green-600">100K+</div>
//             <div className="text-gray-600 text-sm font-medium">
//               Lives Impacted
//             </div>
//           </div>
//           <div className="space-y-2">
//             <div className="text-4xl font-bold text-orange-600">25+</div>
//             <div className="text-gray-600 text-sm font-medium">
//               Partner Organizations
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CSRProgramsSection;

"use client";

import React from "react";
import {
  GraduationCap,
  Briefcase,
  TrendingUp,
  Users,
  Heart,
  Home,
  Leaf,
  CreditCard,
  Trophy,
  Shield,
  Handshake,
  Accessibility,
  Cpu,
  Check,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { CountUp, Reveal, SectionIntro } from "./Anim";

type Program = {
  id: number;
  category: string;
  icon: LucideIcon;
  initiatives: string[];
};

const programs: Program[] = [
  {
    id: 1,
    category: "Education & Learning",
    icon: GraduationCap,
    initiatives: [
      "School education support",
      "Scholarships & higher education",
      "Digital education & STEM labs",
      "Adult literacy & remedial learning",
    ],
  },
  {
    id: 2,
    category: "Skill Development & Employability",
    icon: Briefcase,
    initiatives: [
      "Youth employability programs",
      "IT & non-IT job-linked skilling",
      "Apprenticeship & on-the-job training",
      "Future skills (AI, data, cloud, BFSI ops)",
    ],
  },
  {
    id: 3,
    category: "Livelihood Enhancement & Entrepreneurship",
    icon: TrendingUp,
    initiatives: [
      "Self-employment training",
      "MSME & micro-enterprise support",
      "Women SHG capacity building",
      "Income generation programs",
    ],
  },
  {
    id: 4,
    category: "Women Empowerment",
    icon: Users,
    initiatives: [
      "Skill & livelihood programs for women",
      "Financial independence initiatives",
      "Leadership & entrepreneurship training",
      "Digital literacy for women",
    ],
  },
  {
    id: 5,
    category: "Healthcare & Nutrition",
    icon: Heart,
    initiatives: [
      "Preventive healthcare",
      "Medical infrastructure support",
      "Maternal & child health",
      "Nutrition & wellness programs",
    ],
  },
  {
    id: 6,
    category: "Rural Development",
    icon: Home,
    initiatives: [
      "Integrated village development",
      "Drinking water & sanitation",
      "Rural infrastructure",
      "Agri & allied livelihood programs",
    ],
  },
  {
    id: 7,
    category: "Environmental Sustainability",
    icon: Leaf,
    initiatives: [
      "Water conservation",
      "Tree plantation & biodiversity",
      "Renewable energy",
      "Climate action & resilience",
    ],
  },
  {
    id: 8,
    category: "Financial Literacy & Inclusion",
    icon: CreditCard,
    initiatives: [
      "Banking & digital payments literacy",
      "Savings, insurance & credit awareness",
      "Inclusion of underserved communities",
    ],
  },
  {
    id: 9,
    category: "Disability Inclusion & Special Needs",
    icon: Accessibility,
    initiatives: [
      "Skill training for PwDs",
      "Assistive devices",
      "Inclusive education & jobs",
    ],
  },
  {
    id: 10,
    category: "Sports, Arts & Culture",
    icon: Trophy,
    initiatives: [
      "Grassroots sports development",
      "Traditional arts & culture promotion",
      "Talent scholarships",
    ],
  },
  {
    id: 11,
    category: "Disaster Relief & Rehabilitation",
    icon: Shield,
    initiatives: [
      "Emergency response",
      "Rehabilitation & livelihood restoration",
      "Climate disaster resilience",
    ],
  },
  {
    id: 12,
    category: "Technology for Social Good",
    icon: Cpu,
    initiatives: [
      "Digital platforms for education/health",
      "AI tools for employability & governance",
      "Innovation-led CSR pilots",
    ],
  },
];

const stats = [
  { target: 12, suffix: "", label: "Program Categories" },
  { target: 45, suffix: "+", label: "Active Initiatives" },
  { target: 100, suffix: "K+", label: "Lives Impacted" },
  { target: 25, suffix: "+", label: "Partner Organizations" },
];

const CSRProgramsSection = () => {
  return (
    <section className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <SectionIntro
          eyebrow="Our CSR Programs"
          title="Comprehensive social impact initiatives"
          subtitle="Our CSR programs span across 12 key areas, designed to create sustainable social impact and contribute to nation-building through strategic interventions and community partnerships."
        />

        {/* grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, i) => {
            const Icon = program.icon;
            return (
              <Reveal key={program.id} delay={(i % 3) * 50}>
                <div className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-7 transition-shadow hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">
                    {program.category}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {program.initiatives.map((initiative, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-sm text-slate-600"
                      >
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" />
                        <span>{initiative}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* CTA */}
        <Reveal className="mt-12">
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm sm:flex-row">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Handshake className="h-6 w-6" />
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-900">
                  Partner With Us
                </p>
                <p className="text-sm text-slate-600">
                  Create lasting social impact together
                </p>
              </div>
            </div>
            <Link
              href="/contact?type=csr"
              className="inline-flex flex-shrink-0 items-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Get Involved
            </Link>
          </div>
        </Reveal>

        {/* stats */}
        <div className="mt-14 grid grid-cols-2 gap-8 border-t border-gray-200 pt-12 text-center md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-4xl font-semibold tracking-tight text-slate-900">
                <CountUp target={s.target} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm text-slate-600">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CSRProgramsSection;
