/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { BookOpen, Building, GraduationCap, Handshake } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

const offerings = [
  {
    id: 1,
    icon: BookOpen,
    title: "Corporate Training",
    subtitle:
      "Empowering professionals through Gen AI corporate upskilling and reskilling  programs.",
    description:
      "640+ specialized courses designed by industry experts to accelerate your career growth.",
    cta: "Start Learning",
    secondaryCta: "Browse Courses",
    img: "/app/home/knowledge-as-service.png",
    link: "/services/knowledge-as-service",
    clients: "200+",
    features: [
      "640+ Courses",
      "Industry Experts",
      "Flexible Learning",
      "Global Certifications",
    ],
    bgColor: "from-blue-50 to-indigo-100",
    iconColor: "bg-blue-600",
  },
  //   {
  //     id: 2,
  //     icon: Users,
  //     title: "Talent as a Service",
  //     subtitle: "Strategic Talent Solutions Program",
  //     description: "15,000+ successful placements connecting top-tier IT professionals with leading companies worldwide.",
  //     cta: "Find Talent",
  //     secondaryCta: "How It Works",
  //     img: "/app/home/talent-as-service.png",
  //     link: "/services/talent-as-service",
  //     clients: "50+",
  //     features: ["15K+ Placements", "Pre-vetted Talent", "Quick Matching", "Global Network"],
  //     bgColor: "from-emerald-50 to-teal-100",
  //     iconColor: "bg-emerald-600"
  //   },
  //   {
  //     id: 3,
  //     icon: Settings,
  //     title: "IT Services",
  //     subtitle: "Enterprise Solutions Program",
  //     description: "Complete digital transformation solutions across SAP, Oracle, and cloud platforms for enterprise growth.",
  //     cta: "Get Solutions",
  //     secondaryCta: "Free Consultation",
  //     img: "/app/home/it-service.jpeg",
  //     link: "/services/it-services",
  //     clients: "100+",
  //     features: ["Enterprise Solutions", "Cloud Migration", "24/7 Support", "Scalable Tech"],
  //     bgColor: "from-purple-50 to-violet-100",
  //     iconColor: "bg-purple-600"
  //   },
  {
    id: 4,
    icon: Building,
    title: "Government Initiatives",
    subtitle: "Public Sector Excellence Program",
    description:
      "Partnering with KSDC, Naan Mudhalavan and state programs to build skilled workforce.",
    cta: "Explore Programs",
    secondaryCta: "Partnership Info",
    img: "/app/home/govt.png",
    link: "/services/government-initiatives",
    clients: "3+",
    features: [
      "KSDC Partnership",
      "State Programs",
      "Skill Development",
      "Employment Focus",
    ],
    bgColor: "from-orange-50 to-amber-100",
    iconColor: "bg-orange-600",
  },
  {
    id: 5,
    icon: GraduationCap,
    title: "Institutional Training",
    subtitle:
      "Empowering Polytechnic, Arts, Science, Engineering & MBA Students With Gen AI, Fintech & SMAC For Future-Ready Careers",
    description:
      "Gen AI training transforming paramedical, dental, and medical professions.",
    cta: "Join Program",
    secondaryCta: "Institution Portal",
    img: "/app/home/institution.png",
    link: "/services/institutional-training",
    clients: "10+",
    features: [
      "Industry Integration",
      "Job Ready Skills",
      "Academic Partnerships",
      "Career Support",
    ],
    bgColor: "from-green-50 to-emerald-100",
    iconColor: "bg-green-600",
  },
  {
    id: 6,
    icon: Handshake,
    title: "Corporate Social Responsibility",
    subtitle:
      "Partnering with leading CSR organizations to create opportunities for inclusive groups like Women, PWD, LGBTQ+ communities.",
    description: "",
    cta: "Learn More",
    secondaryCta: "Our Partners",
    img: "/app/home/CSR.png",
    link: "/services/corporate-social-responsibility",
    clients: "5+",
    features: [
      "Inclusive Programs",
      "Women Empowerment",
      "PWD Support",
      "LGBTQ+ Friendly",
    ],
    bgColor: "from-pink-50 to-rose-100",
    iconColor: "bg-pink-600",
    inclusive: true,
  },
];

const HeroCarousel = () => {
  return (
    <div className="  relative  pt-8 pb-4 overflow-hidden border-b">
      <Carousel
        className="w-full  px-4 h-full "
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="h-full ">
          {offerings.map((offering) => {
            // const IconComponent = offering.icon;
            return (
              <CarouselItem key={offering.id} className="h-full ">
                <div
                  className={`bg-white rounded-2xl overflow-hidden  h-full pt-10 max-w-7xl mx-auto`}
                >
                  <div className="container mx-auto px-6 py-8 ">
                    <div className="grid lg:grid-cols-2 gap-8  h-full">
                      {/* Left Content */}
                      <div className="space-y-4 pt-10">
                        {/* Header Section */}
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3 flex-wrap gap-2">
                            {/* <div
                              className={`${offering.iconColor} p-2 rounded-lg shadow-lg`}
                            >
                              <IconComponent size={20} className="text-white" />
                            </div> */}
                            {/* <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                              {offering.clients} Clients
                            </span> */}
                          </div>

                          <div className="space-y-2">
                            {/* Main Title as Badge */}
                            <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full   shadow-lg">
                              {offering.title}
                            </div>
                            {/* Subtitle - Bigger Text */}
                            <h2 className="text-2xl lg:text-3xl text-gray-800 font-bold leading-tight mt-3">
                              {offering.subtitle}
                            </h2>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-base text-gray-600 leading-relaxed">
                          {offering.description}
                        </p>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-2">
                          {offering.features.map((feature, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2 bg-white/50 p-2 rounded"
                            >
                              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
                              <span className="text-sm font-medium text-gray-700">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                          <a
                            href={offering.link}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center text-sm"
                          >
                            {offering.cta}
                          </a>
                          <Link href="/contact">
                            <button className="bg-white/90 hover:cursor-pointer backdrop-blur-sm hover:bg-white text-gray-700 hover:text-gray-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md text-sm">
                              Reach Us
                            </button>
                          </Link>
                        </div>
                      </div>

                      {/* Right Content - Image & Stats */}
                      <div className="relative h-full  flex-col flex justify-end items-end">
                        <img
                          src={offering.img}
                          alt={offering.title}
                          className="w-[80%]  object-cover rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="left-4 bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg" />
        <CarouselNext className="right-4 bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg" />
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
