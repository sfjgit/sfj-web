"use client";

import Image from "next/image";
import OrganizationStatsSection from "./_components/StatSection";
import ContentSection from "./_components/ContentSection";
import { Button } from "@/components/ui/button";
import { BellIcon } from "lucide-react";

export default function EmploymentReadyGraduates() {
  return (
    <div>
      <div className="w-full bg-white pt-26 px-4 md:px-8 lg:px-16 pb-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 text-center mb-8 tracking-tight">
            Transforming Graduates & Youth into Job-Ready Professionals
          </h1>

          {/* Subtitle */}
          <p className="text-center text-gray-600 text-sm md:text-base mb-8 max-w-5xl mx-auto leading-relaxed">
            India is emerging as the world’s largest talent hub, and current
            studies suggest that equipping 50 million youth with industry-ready
            skills is essential to meet future economic and technological
            demands
          </p>

          {/* Orange Divider */}
          <div className="w-16 h-1 bg-orange-500 mx-auto mb-12"></div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Image and Stats */}
            <div className="flex flex-col items-center">
              {/* Image */}
              <div className="w-full max-w-md mb-8 relative h-64 md:h-80">
                <Image
                  src="/app/skilldevelopmentprogram.webp"
                  alt="Engineering professional overlooking industrial port"
                  fill
                  className="object-cover rounded-sm"
                />
              </div>

              {/* Statistics */}
              <div className="flex gap-8 md:gap-16 pt-18">
                {/* Students Trained */}
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-orange-500 flex items-center justify-center mb-4">
                    <span className="text-3xl md:text-4xl font-bold text-orange-500">
                      59,000
                    </span>
                  </div>
                  <p className="text-gray-700 font-bold text-center text-sm md:text-base">
                    STUDENTS TRAINED
                  </p>
                </div>

                {/* Global Certification */}
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-orange-500 flex items-center justify-center mb-4">
                    <span className="text-3xl md:text-4xl font-bold text-orange-500">
                      47,500
                    </span>
                  </div>
                  <p className="text-gray-700 font-bold text-center text-sm md:text-base">
                    GLOBAL CERTIFICATION
                    <br />
                    OBTAINED
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Text Content */}
            <div className="space-y-6 text-gray-700 text-justify leading-relaxed">
              <p>
                By 2025, India is positioned to contribute nearly 20% of the
                world’s skilled workforce, making it one of the most critical
                talent suppliers in the global economy.
              </p>

              <p>
                With worldwide industries facing a record talent shortage of
                over 85 million skilled professionals (ManpowerGroup & Deloitte
                reports), India must equip 50+ million youth with future-ready
                skills to meet both domestic and international demand.
              </p>

              <p>
                At SFJ Business Solutions, we are committed to bridging this
                opportunity by empowering learners with industry-aligned
                training, global certifications, and employment-focused pathways
                that strengthen India’s talent pipeline.
              </p>

              <h2 className="text-black text-lg font-semibold">
                India’s Skilling Gap: Challenges That Must Be Addressed
              </h2>

              <p>
                Despite being the youngest nation globally with a median age of
                29, India faces significant skill and employability gaps:
              </p>

              {/* <p>
              Skill development initiatives will help actualize the inert
              potential, for which development and articulation of a national
              policy on skill development is already in progress.
            </p>

            <p>
              As India moves progressively towards becoming a global knowledge
              economy, it must meet the
            </p> */}
              <ul>
                <li className="list-disc ml-5 mb-2">
                  {" "}
                  Only ~4.7% of the workforce has formal vocational training
                  (MSDE Annual Report)
                </li>
                <li className="list-disc ml-5 mb-2">
                  {" "}
                  In comparison, 60–90% of the workforce in developed economies
                  is formally skilled
                </li>
                <li className="list-disc ml-5 mb-2">
                  {" "}
                  Only ~27% of Indian graduates are considered employable for
                  industry roles (India Skills Report 2024)
                </li>
                <li className="list-disc ml-5 mb-2">
                  {" "}
                  93% of India’s workforce remains in the informal sector with
                  limited access to structured skilling
                </li>
                <li className="list-disc ml-5 mb-2">
                  {" "}
                  Rapid technology disruption has widened the digital skills gap
                  across AI, Cloud, Cybersecurity & Data Analytics
                </li>
              </ul>
              <p>
                These gaps underscore the need to rapidly scale structured skill
                development, driven by industry collaboration and future-focused
                learning models.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <OrganizationStatsSection />
      </div>
      <div>
        <ContentSection />
      </div>
      <div className="text-center -mt-10 mb-10">
        <Button className="bg-blue-500 hover:bg-blue-600">
          <BellIcon className="w-6 h-6 mr-2" />
          Subscribe
        </Button>
      </div>
    </div>
  );
}
