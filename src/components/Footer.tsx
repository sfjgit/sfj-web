// "use client";
// import Link from "next/link";
// import { MapPin, Phone, Mail, ChevronDown } from "lucide-react";
// import * as Flags from "country-flag-icons/react/3x2";
// import { FaStar } from "react-icons/fa";
// import { FaRegStarHalfStroke, FaX } from "react-icons/fa6";
// import { FcGoogle } from "react-icons/fc";
// import Image from "next/image";
// import { useState } from "react";
// import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

// const socialLinks = [
//   {
//     name: "Instagram",
//     url: "https://www.instagram.com/sfjbs_bangalore/",
//     icon: <FaInstagram className="w-6 h-6" />,
//   }, 
//   {
//     name: "LinkedIn",
//     url: "https://www.linkedin.com/company/sfj-business-solutions-pvt-ltd-/",
//     icon: <FaLinkedin className="w-6 h-6" />,
//   },
//   {
//     name: "Youtube",
//     url: "https://www.youtube.com/channel/UC-Ol7VzrG_xsL6iyhhAIRzw",
//     icon: <FaYoutube className="w-6 h-6" />,
//   },
// ];

// const products = [
//   {
//     name: "CASPA",
//     desc: "AI Sales & Outreach Platform",
//     path: "/products/caspa",
//   },
//   { name: "LMS", desc: "Learning Management System", path: "/products/lms" },
//   {
//     name: "Talent OS",
//     desc: "Talent Acquisition Platform",
//     path: "/products/talent-os",
//   },
// ];

// const solutions = [
//   {
//     name: "Corporate IT Training (KaaS)",
//     desc: "Upskilling, Reskilling & Certification",
//     path: "/services/kaas",
//   },
//   {
//     name: "CSR Skilling Partner",
//     desc: "High-Impact Employability Programs",
//     path: "/services/corporate-social-responsibility",
//   },
//   {
//     name: "Talent as a Service (TaaS)",
//     desc: "Hire | Deploy | Managed Talent",
//     path: "/services/taas",
//   },
//   {
//     name: "Government-Led Skilling Missions",
//     desc: "Central & State Skill Programs",
//     path: "/services/government-ssc-skilling",
//   },
//   {
//     name: "Institutional Training (B2I)",
//     desc: "Universities, Colleges & ITIs",
//     path: "/services/institutional-skilling",
//   },
// ];

// const initiatives = [
//   {
//     name: "Skill Development",
//     desc: "Workforce Transformation",
//     path: "/initiatives/skill-development",
//   },
//   {
//     name: "Faculty Development",
//     desc: "Train-the-Trainer & FDP",
//     path: "/initiatives/faculty-development",
//   },
// ];

// const Footer = () => {
//   const [selectedOffice, setSelectedOffice] = useState("india");
//   const [officeMenuOpen, setOfficeMenuOpen] = useState(false);

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const offices: any = {
//     india: {
//       flag: "IN",
//       name: "India - Head Office",
//       company: "SFJ Business Solutions Pvt. Ltd.",
//       address: [
//         "Uma Sree Dream World, Unit -2,",
//         "B-Block, 4th Floor, Kudlu Gate,",
//         "Hosur Main Road,",
//         "Bangalore – 560068. Karnataka, INDIA",
//       ],
//       phone: "+91 9845348601 ",
//       email: "growth@sfjbs.com",
//     },
//     uae: {
//       flag: "AE",
//       name: "UAE Office",
//       company: "SFJ Computers Consulting",
//       address: [
//         "214, Blue Tower, Sheikh Zayed Road,",
//         "(Next To Crown Plaza Hotel)",
//         "P.O. Box : 58575, Dubai, UAE",
//       ],
//       phone: "+971 43 425125",
//       fax: "+971 43 425126",
//     },
//     singapore: {
//       flag: "SG",
//       name: "Singapore Office",
//       company: "SFJ Business Solutions Pte. Ltd.",
//       address: ["2 KALLANG AVENUE,", "#08-16, CT HUB,", "Singapore – 339 407"],
//       phone: "+65 62935695",
//       fax: "+65 62935657",
//     },
//     usa: {
//       flag: "US",
//       name: "United States Office",
//       company: "SFJ Business Solutions LLC",
//       address: [
//         "2055, limestone RD STE 200-C,",
//         "Wilmington,",
//         "DE 19808, USA",
//       ],
//     },
//   };

//   const GoogleReviews = () => {
//     const rating = 3.8;
//     return (
//       <div className="bg-transparent rounded-xl pt-0 mt-6">
//         <div className="flex items-center gap-2 mb-3">
//           <FcGoogle size={22} />
//           <h2 className="text-sm font-medium text-gray-900">Google Reviews</h2>
//         </div>
// <<<<<<< Updated upstream

//         {/* Rating Overview */}
// =======
// >>>>>>> Stashed changes
//         <div className="flex items-center text-base font-medium text-gray-900 mb-3">
//           <span className="mr-3">{rating.toFixed(1)}</span>
//           <div className="flex items-center gap-1">
//             <FaStar className="text-yellow-400" size={16} />
//             <FaStar className="text-yellow-400" size={16} />
//             <FaStar className="text-yellow-400" size={16} />
//             <FaRegStarHalfStroke className="text-yellow-400" size={16} />
//           </div>
//         </div>
//         <div>
//           <a
//             href={`https://g.page/r/CS0LPoJm0AKbEBM/review`}
//             target="_blank"
//             rel="noopener noreferrer"
// <<<<<<< Updated upstream
//             className="text-blue-600 hover:text-blue-700 transition-colors text-sm"
// =======
//             className="text-blue-700 hover:text-blue-800 transition-colors text-sm"
// >>>>>>> Stashed changes
//           >
//             Rate Us on Google
//           </a>
//         </div>
//       </div>
//     );
//   };

//   const OfficeAddress = () => {
//     const currentOffice = offices[selectedOffice];
//     return (
//       <div className="space-y-4">
//         <h3 className="font-semibold text-lg mb-4 text-gray-900">
//           Our Offices
//         </h3>
//         <div className="relative">
//           <button
//             type="button"
//             onClick={() => setOfficeMenuOpen((v) => !v)}
//             className="w-full flex items-center justify-between gap-2 bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           >
//             <span className="flex items-center gap-2">
//               {(() => {
//                 const FlagIcon =
//                   Flags[currentOffice.flag as keyof typeof Flags];
//                 return FlagIcon ? (
//                   <FlagIcon className="w-5 h-3.5 flex-shrink-0 rounded-[2px]" />
//                 ) : null;
//               })()}
//               {currentOffice.name}
//             </span>
//             <ChevronDown className="w-4 h-4 flex-shrink-0" />
//           </button>

// <<<<<<< Updated upstream
//         {/* Office Selector Dropdown */}
//         <select
//           value={selectedOffice}
//           onChange={(e) => setSelectedOffice(e.target.value)}
//           className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//         >
//           {Object.keys(offices).map((officeKey) => (
//             <option key={officeKey} value={officeKey} className="bg-white">
//               {offices[officeKey].flag} {offices[officeKey].name}
//             </option>
//           ))}
//         </select>

//         {/* Selected Office Details */}
//         <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
//           <div className="flex items-center gap-2 mb-2">
//             <span className="text-xl">{currentOffice.flag}</span>
// =======
//           {officeMenuOpen && (
//             <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
//               {Object.keys(offices).map((officeKey) => {
//                 const FlagIcon =
//                   Flags[offices[officeKey].flag as keyof typeof Flags];
//                 return (
//                   <button
//                     key={officeKey}
//                     type="button"
//                     onClick={() => {
//                       setSelectedOffice(officeKey);
//                       setOfficeMenuOpen(false);
//                     }}
//                     className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-gray-100 transition-colors"
//                   >
//                     {FlagIcon ? (
//                       <FlagIcon className="w-5 h-3.5 flex-shrink-0 rounded-[2px]" />
//                     ) : null}
//                     {offices[officeKey].name}
//                   </button>
//                 );
//               })}
//             </div>
//           )}
//         </div>

//         <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
//           <div className="flex items-center gap-2 mb-2">
//             {(() => {
//               const FlagIcon = Flags[currentOffice.flag as keyof typeof Flags];
//               return FlagIcon ? (
//                 <FlagIcon className="w-5 h-3.5 flex-shrink-0 rounded-[2px]" />
//               ) : null;
//             })()}
// >>>>>>> Stashed changes
//             <h4 className="font-medium text-gray-900 text-sm">
//               {currentOffice.name}
//             </h4>
//           </div>

// <<<<<<< Updated upstream
//           <p className="text-xs text-blue-600 font-medium">
// =======
//           <p className="text-xs text-blue-700 font-medium">
// >>>>>>> Stashed changes
//             {currentOffice.company}
//           </p>

//           <div className="space-y-2">
//             <div className="flex items-start gap-2">
//               <MapPin className="w-3 h-3 text-gray-500 mt-0.5 flex-shrink-0" />
//               <div className="text-xs text-gray-600 leading-relaxed">
//                 {currentOffice.address.map((line: string, index: number) => (
//                   <div key={index}>{line}</div>
//                 ))}
//               </div>
//             </div>

//             {currentOffice.phone && (
//               <div className="flex items-center gap-2">
//                 <Phone className="w-3 h-3 text-gray-500" />
//                 <a
//                   href={`tel:${currentOffice.phone}`}
//                   className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
//                 >
//                   {currentOffice.phone}
//                 </a>
//               </div>
//             )}

//             {currentOffice.email && (
//               <div className="flex items-center gap-2">
//                 <Mail className="w-3 h-3 text-gray-500" />
//                 <a
//                   href={`mailto:${currentOffice.email}`}
//                   className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
//                 >
//                   {currentOffice.email}
//                 </a>
//               </div>
//             )}

//             {currentOffice.fax && (
//               <div className="flex items-center gap-2">
//                 <FaX className="w-3 h-3 text-gray-500" />
//                 <span className="text-xs text-gray-600">
//                   {currentOffice.fax}
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
// <<<<<<< Updated upstream
//     <footer className="relative bg-white text-gray-900 overflow-hidden">

//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
// =======
//     <footer className="text-gray-900" style={{ background: "#f2f2f2" }}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
// >>>>>>> Stashed changes
//           {/* Company Logo, Description & Google Reviews */}
//           <div className="lg:col-span-1 space-y-4">
//             <div className="flex items-center space-x-2">
//               <Image
//                 src="/logo/sfj-logo.png"
//                 alt="SFJ Logo"
//                 className="w-12 h-12 object-cover"
//                 quality={100}
//                 width={48}
//                 height={48}
//               />
//               <div>
// <<<<<<< Updated upstream
//                 <h3 className="text-xl font-bold">SFJ Business Solutions</h3>
//                 <p className="text-sm text-gray-500">Pvt. Ltd.</p>
//               </div>
//             </div>

//             <p className="text-gray-600 text-sm leading-relaxed">
// =======
//                 <h3 className="text-sm font-bold leading-tight text-gray-900">
//                   SFJ Business Solutions
//                 </h3>
//                 <p className="text-[10px] text-gray-500">Pvt. Ltd.</p>
//               </div>
//             </div>
//             <p className="text-gray-600 text-[10px] leading-relaxed">
// >>>>>>> Stashed changes
//               Empowering global talent for the AI-driven future through
//               comprehensive workforce development and professional training
//               solutions.
//             </p>
//             <GoogleReviews />
//           </div>

//           {/* Products */}
//           <div className="lg:col-span-1">
//             <h3 className="font-semibold text-xs mb-4 text-blue-700 uppercase tracking-wide">
//               Products
//             </h3>
//             <ul className="space-y-3">
//               {products.map((product) => (
//                 <li key={product.path}>
//                   <Link
//                     href={product.path}
//                     className="block text-gray-700 hover:text-gray-900 transition-colors"
//                   >
//                     <div className="text-xs font-semibold">{product.name}</div>
//                     <div className="text-[10px] text-gray-500">
//                       {product.desc}
//                     </div>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Services */}
//           <div className="lg:col-span-1">
// <<<<<<< Updated upstream
//             <h3 className="font-semibold text-lg mb-6">Services</h3>
//             <ul className="space-y-3">
//               {navigationItems
//                 .find((item) => item.path === "/services")
//                 ?.children?.map((service) => (
//                   <li key={service.path}>
//                     <Link
//                       href={service.path}
//                       className="text-gray-600 hover:text-gray-900 transition-colors text-sm block leading-relaxed"
//                     >
//                       {service.label}
//                     </Link>
//                   </li>
//                 ))}
// =======
//             <h3 className="font-semibold text-xs mb-4 text-blue-700 uppercase tracking-wide">
//               Services
//             </h3>
//             <ul className="space-y-2.5">
//               {solutions.map((solution) => (
//                 <li key={solution.path}>
//                   <Link
//                     href={solution.path}
//                     className="block text-gray-700 hover:text-gray-900 transition-colors"
//                   >
//                     <div className="text-xs font-semibold leading-tight">
//                       {solution.name}
//                     </div>
//                     <div className="text-[10px] text-gray-500">
//                       {solution.desc}
//                     </div>
//                   </Link>
//                 </li>
//               ))}
// >>>>>>> Stashed changes
//             </ul>
//           </div>

//           {/* Initiatives */}
//           <div className="lg:col-span-1">
//             <h3 className="font-semibold text-xs mb-4 text-blue-700 uppercase tracking-wide">
//               Initiatives
//             </h3>
//             <ul className="space-y-3">
// <<<<<<< Updated upstream
//               <li>
//                 <Link
//                   href="/about"
//                   className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
//                 >
//                   About Us
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/careers"
//                   className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
//                 >
//                   Careers
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/blog"
//                   className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
//                 >
//                   Blogs
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/industries"
//                   className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
//                 >
//                   Industries
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/impact"
//                   className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
//                 >
//                   Impact
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/life-at-sfjbs"
//                   className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
//                 >
//                   Life@SFJ
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/contact"
//                   className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
//                 >
//                   Contact Us
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/privacy-policy"
//                   className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
//                 >
//                   Privacy Policy
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/refund-policy"
//                   className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
//                 >
//                   Refund Policy
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/terms-and-conditions"
//                   className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
//                 >
//                   Terms & Conditions
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/extension-privacy-policy"
//                   className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
//                 >
//                   Extension Privacy Policy
//                 </Link>
//               </li>
// =======
//               {initiatives.map((initiative) => (
//                 <li key={initiative.path}>
//                   <Link
//                     href={initiative.path}
//                     className="block text-gray-700 hover:text-gray-900 transition-colors"
//                   >
//                     <div className="text-xs font-semibold">
//                       {initiative.name}
//                     </div>
//                     <div className="text-[10px] text-gray-500">
//                       {initiative.desc}
//                     </div>
//                   </Link>
//                 </li>
//               ))}
// >>>>>>> Stashed changes
//             </ul>
//           </div>

//           {/* Quick Links — regrouped into Company / Resources / Legal */}
//           <div className="lg:col-span-1">
//             <div className="mb-5">
//               <h3 className="font-semibold text-xs mb-3 text-gray-900">
//                 Company
//               </h3>
//               <ul className="space-y-2">
//                 <li>
//                   <Link
//                     href="/about"
//                     className="text-gray-700 hover:text-gray-900 transition-colors text-[11px]"
//                   >
//                     About Us
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/careers"
//                     className="text-gray-700 hover:text-gray-900 transition-colors text-[11px]"
//                   >
//                     Careers
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/life-at-sfjbs"
//                     className="text-gray-700 hover:text-gray-900 transition-colors text-[11px]"
//                   >
//                     Life@SFJ
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/impact"
//                     className="text-gray-700 hover:text-gray-900 transition-colors text-[11px]"
//                   >
//                     Impact
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             <div className="mb-5">
//               <h3 className="font-semibold text-xs mb-3 text-gray-900">
//                 Resources
//               </h3>
//               <ul className="space-y-2">
//                 <li>
//                   <Link
//                     href="/blog"
//                     className="text-gray-700 hover:text-gray-900 transition-colors text-[11px]"
//                   >
//                     Blogs
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/industries"
//                     className="text-gray-700 hover:text-gray-900 transition-colors text-[11px]"
//                   >
//                     Industries
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/contact"
//                     className="text-gray-700 hover:text-gray-900 transition-colors text-[11px]"
//                   >
//                     Contact Us
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h3 className="font-semibold text-xs mb-3 text-gray-900">
//                 Legal
//               </h3>
//               <ul className="space-y-2">
//                 <li>
//                   <Link
//                     href="/privacy-policy"
//                     className="text-gray-700 hover:text-gray-900 transition-colors text-[11px]"
//                   >
//                     Privacy Policy
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/refund-policy"
//                     className="text-gray-700 hover:text-gray-900 transition-colors text-[11px]"
//                   >
//                     Refund Policy
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/terms-and-conditions"
//                     className="text-gray-700 hover:text-gray-900 transition-colors text-[11px]"
//                   >
//                     Terms & Conditions
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/extension-privacy-policy"
//                     className="text-gray-700 hover:text-gray-900 transition-colors text-[11px]"
//                   >
//                     Extension Privacy Policy
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           {/* Follow Us & Office Address */}
//           <div className="lg:col-span-1 space-y-4">
//             <div>
//               <h3 className="font-semibold text-xs mb-3 text-gray-900">
//                 Follow Us
//               </h3>
//               <div className="flex space-x-3">
//                 {socialLinks.map((social) => (
//                   <a
//                     key={social.name}
//                     href={social.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-gray-700 hover:text-gray-900 hover:scale-105 transition-transform [&>svg]:w-4 [&>svg]:h-4"
//                     title={social.name}
//                   >
//                     {social.icon}
//                   </a>
//                 ))}
//               </div>
//             </div>
//             <OfficeAddress />
//           </div>
//         </div>

//         {/* Bottom Section */}
// <<<<<<< Updated upstream
//         <div className="border-t border-gray-200 mt-12 pt-8">
//           <div className="text-center">
//             <p className="text-sm text-gray-600 mb-2">
// =======
//         <div className="border-t border-gray-300 mt-10 pt-6">
//           <div className="text-center">
//             <p className="text-xs text-gray-600 mb-2">
// >>>>>>> Stashed changes
//               SFJ Business Solutions Pvt Ltd | +91-9845348601 | growth@sfjbs.com
//             </p>
//             <p className="text-xs text-gray-500">
//               Copyright © 2011-2026. All rights reserved.
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

"use client";
import Link from "next/link";
import { MapPin, Phone, Mail, ChevronDown } from "lucide-react";
import * as Flags from "country-flag-icons/react/3x2";
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke, FaX } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { useState } from "react";
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const socialLinks = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/sfjbs_bangalore/",
    icon: <FaInstagram className="w-6 h-6" />,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/sfj-business-solutions-pvt-ltd-/",
    icon: <FaLinkedin className="w-6 h-6" />,
  },
  {
    name: "Youtube",
    url: "https://www.youtube.com/channel/UC-Ol7VzrG_xsL6iyhhAIRzw",
    icon: <FaYoutube className="w-6 h-6" />,
  },
];

const products = [
  {
    name: "CASPA",
    desc: "AI Sales & Outreach Platform",
    path: "/products/caspa",
  },
  { name: "LMS", desc: "Learning Management System", path: "/products/lms" },
  {
    name: "Talent OS",
    desc: "Talent Acquisition Platform",
    path: "/products/talent-os",
  },
];

const solutions = [
  {
    name: "Corporate IT Training (KaaS)",
    desc: "Upskilling, Reskilling & Certification",
    path: "/services/kaas",
  },
  {
    name: "CSR Skilling Partner",
    desc: "High-Impact Employability Programs",
    path: "/services/corporate-social-responsibility",
  },
  {
    name: "Talent as a Service (TaaS)",
    desc: "Hire | Deploy | Managed Talent",
    path: "/services/taas",
  },
  {
    name: "Government-Led Skilling Missions",
    desc: "Central & State Skill Programs",
    path: "/services/government-ssc-skilling",
  },
  {
    name: "Institutional Training (B2I)",
    desc: "Universities, Colleges & ITIs",
    path: "/services/institutional-skilling",
  },
];

const initiatives = [
  {
    name: "Skill Development",
    desc: "Workforce Transformation",
    path: "/initiatives/skill-development",
  },
  {
    name: "Faculty Development",
    desc: "Train-the-Trainer & FDP",
    path: "/initiatives/faculty-development",
  },
];

const Footer = () => {
  const [selectedOffice, setSelectedOffice] = useState("india");
  const [officeMenuOpen, setOfficeMenuOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const offices: any = {
    india: {
      flag: "IN",
      name: "India - Head Office",
      company: "SFJ Business Solutions Pvt. Ltd.",
      address: [
        "Uma Sree Dream World, Unit -2,",
        "B-Block, 4th Floor, Kudlu Gate,",
        "Hosur Main Road,",
        "Bangalore – 560068. Karnataka, INDIA",
      ],
      phone: "+91 9845348601 ",
      email: "growth@sfjbs.com",
    },
    uae: {
      flag: "AE",
      name: "UAE Office",
      company: "SFJ Computers Consulting",
      address: [
        "214, Blue Tower, Sheikh Zayed Road,",
        "(Next To Crown Plaza Hotel)",
        "P.O. Box : 58575, Dubai, UAE",
      ],
      phone: "+971 43 425125",
      fax: "+971 43 425126",
    },
    singapore: {
      flag: "SG",
      name: "Singapore Office",
      company: "SFJ Business Solutions Pte. Ltd.",
      address: ["2 KALLANG AVENUE,", "#08-16, CT HUB,", "Singapore – 339 407"],
      phone: "+65 62935695",
      fax: "+65 62935657",
    },
    usa: {
      flag: "US",
      name: "United States Office",
      company: "SFJ Business Solutions LLC",
      address: [
        "2055, limestone RD STE 200-C,",
        "Wilmington,",
        "DE 19808, USA",
      ],
    },
  };

  const GoogleReviews = () => {
    const rating = 3.8;
    return (
      <div className="bg-transparent rounded-xl pt-0 mt-6">
        <div className="flex items-center gap-2 mb-3">
          <FcGoogle size={22} />
          <h2 className="text-sm font-medium text-gray-900">Google Reviews</h2>
        </div>
        <div className="flex items-center text-base font-medium text-gray-900 mb-3">
          <span className="mr-3">{rating.toFixed(1)}</span>
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-400" size={16} />
            <FaStar className="text-yellow-400" size={16} />
            <FaStar className="text-yellow-400" size={16} />
            <FaRegStarHalfStroke className="text-yellow-400" size={16} />
          </div>
        </div>
        <div>
          <a
            href={`https://g.page/r/CS0LPoJm0AKbEBM/review`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-800 transition-colors text-sm"
          >
            Rate Us on Google
          </a>
        </div>
      </div>
    );
  };

  const OfficeAddress = () => {
    const currentOffice = offices[selectedOffice];
    return (
      <div className="space-y-4">
        <h3 className="font-semibold text-lg mb-4 text-gray-900">
          Our Offices
        </h3>
        <div className="relative">
          <button
            type="button"
            onClick={() => setOfficeMenuOpen((v) => !v)}
            className="w-full flex items-center justify-between gap-2 bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <span className="flex items-center gap-2">
              {(() => {
                const FlagIcon =
                  Flags[currentOffice.flag as keyof typeof Flags];
                return FlagIcon ? (
                  <FlagIcon className="w-5 h-3.5 flex-shrink-0 rounded-[2px]" />
                ) : null;
              })()}
              {currentOffice.name}
            </span>
            <ChevronDown className="w-4 h-4 flex-shrink-0" />
          </button>

          {officeMenuOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
              {Object.keys(offices).map((officeKey) => {
                const FlagIcon =
                  Flags[offices[officeKey].flag as keyof typeof Flags];
                return (
                  <button
                    key={officeKey}
                    type="button"
                    onClick={() => {
                      setSelectedOffice(officeKey);
                      setOfficeMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-gray-100 transition-colors"
                  >
                    {FlagIcon ? (
                      <FlagIcon className="w-5 h-3.5 flex-shrink-0 rounded-[2px]" />
                    ) : null}
                    {offices[officeKey].name}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            {(() => {
              const FlagIcon = Flags[currentOffice.flag as keyof typeof Flags];
              return FlagIcon ? (
                <FlagIcon className="w-5 h-3.5 flex-shrink-0 rounded-[2px]" />
              ) : null;
            })()}
            <h4 className="font-medium text-gray-900 text-sm">
              {currentOffice.name}
            </h4>
          </div>

          <p className="text-xs text-blue-700 font-medium">
            {currentOffice.company}
          </p>

          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <MapPin className="w-3 h-3 text-gray-500 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-gray-600 leading-relaxed">
                {currentOffice.address.map((line: string, index: number) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            </div>

            {currentOffice.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3 text-gray-500" />
                <a
                  href={`tel:${currentOffice.phone}`}
                  className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {currentOffice.phone}
                </a>
              </div>
            )}

            {currentOffice.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3 text-gray-500" />
                <a
                  href={`mailto:${currentOffice.email}`}
                  className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {currentOffice.email}
                </a>
              </div>
            )}

            {currentOffice.fax && (
              <div className="flex items-center gap-2">
                <FaX className="w-3 h-3 text-gray-500" />
                <span className="text-xs text-gray-600">
                  {currentOffice.fax}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <footer className="text-gray-900" style={{ background: "#f2f2f2" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          {/* Company Logo, Description & Google Reviews */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/logo/sfj-logo.png"
                alt="SFJ Logo"
                className="w-12 h-12 object-cover"
                quality={100}
                width={48}
                height={48}
              />
              <div>
                <h3 className="text-sm font-bold leading-tight text-gray-900">
                  SFJ Business Solutions
                </h3>
                <p className="text-[10px] text-gray-500">Pvt. Ltd.</p>
              </div>
            </div>
            <p className="text-gray-600 text-[10px] leading-relaxed">
              Equipping global talent with the skills to succeed in an AI-driven
              world.
            </p>
            <GoogleReviews />
          </div>

          {/* Products */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-xs mb-4 text-blue-700 uppercase tracking-wide">
              Products
            </h3>
            <ul className="space-y-3">
              {products.map((product) => (
                <li key={product.path}>
                  <Link
                    href={product.path}
                    className="block text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    <div className="text-xs font-semibold">{product.name}</div>
                    <div className="text-[10px] text-gray-500">
                      {product.desc}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-xs mb-4 text-blue-700 uppercase tracking-wide">
              Services
            </h3>
            <ul className="space-y-2.5">
              {solutions.map((solution) => (
                <li key={solution.path}>
                  <Link
                    href={solution.path}
                    className="block text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    <div className="text-xs font-semibold leading-tight">
                      {solution.name}
                    </div>
                    <div className="text-[10px] text-gray-500">
                      {solution.desc}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Initiatives */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-xs mb-4 text-blue-700 uppercase tracking-wide">
              Initiatives
            </h3>
            <ul className="space-y-3">
              {initiatives.map((initiative) => (
                <li key={initiative.path}>
                  <Link
                    href={initiative.path}
                    className="block text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    <div className="text-xs font-semibold">
                      {initiative.name}
                    </div>
                    <div className="text-[10px] text-gray-500">
                      {initiative.desc}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links — regrouped into Company / Resources / Legal */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <h3 className="font-semibold text-xs mb-3 text-gray-900">
                Company
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-700 hover:text-gray-900 transition-colors text-[11px]"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-gray-700 hover:text-gray-900 transition-colors text-[11px]"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/life-at-sfjbs"
                    className="text-gray-700 hover:text-gray-900 transition-colors text-[11px]"
                  >
                    Life@SFJ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/impact"
                    className="text-gray-700 hover:text-gray-900 transition-colors text-[11px]"
                  >
                    Impact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="mb-5">
              <h3 className="font-semibold text-xs mb-3 text-gray-900">
                Resources
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-700 hover:text-gray-900 transition-colors text-[11px]"
                  >
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/industries"
                    className="text-gray-700 hover:text-gray-900 transition-colors text-[11px]"
                  >
                    Industries
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-700 hover:text-gray-900 transition-colors text-[11px]"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-xs mb-3 text-gray-900">
                Legal
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-gray-700 hover:text-gray-900 transition-colors text-[11px]"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/refund-policy"
                    className="text-gray-700 hover:text-gray-900 transition-colors text-[11px]"
                  >
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-and-conditions"
                    className="text-gray-700 hover:text-gray-900 transition-colors text-[11px]"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/extension-privacy-policy"
                    className="text-gray-700 hover:text-gray-900 transition-colors text-[11px]"
                  >
                    Extension Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Follow Us & Office Address */}
          <div className="lg:col-span-1 space-y-4">
            <div>
              <h3 className="font-semibold text-xs mb-3 text-gray-900">
                Follow Us
              </h3>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-gray-900 hover:scale-105 transition-transform [&>svg]:w-4 [&>svg]:h-4"
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
            <OfficeAddress />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 mt-10 pt-6">
          <div className="text-center">
            <p className="text-xs text-gray-600 mb-2">
              SFJ Business Solutions Pvt Ltd | +91-9845348601 | growth@sfjbs.com
            </p>
            <p className="text-xs text-gray-500">
              Copyright © 2011-2026. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
