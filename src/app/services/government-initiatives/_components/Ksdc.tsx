/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
export default function Ksdc() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-100 to-amber-100 border border-orange-200 rounded-full mb-4">
            <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm font-semibold text-orange-700">
              KSDC Training Partnership
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Karnataka Skill Development Program
          </h2>

          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-lg text-gray-700 leading-relaxed">
              As authorized training partners with Karnataka Skill Development
              Corporation (KSDC), we&apos;re currently empowering 500+ learners
              with industry-ready skills and comprehensive career guidance
              across Karnataka.
            </p>

            {/* <p className="text-base text-gray-600 leading-relaxed">
              Our partnership with KSDC enables us to provide FREE skill
              development training with students paying only ₹500 for essential
              study materials and lifetime access to our advanced learning
              platform, ensuring quality education reaches every corner of
              Karnataka.
            </p> */}
          </div>

          {/* Our Impact */}
          <div className="grid md:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-orange-100">
              <div className="text-2xl font-bold text-orange-600">500+</div>
              <div className="text-sm text-gray-600">
                Current Active Learners
              </div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-amber-100">
              <div className="text-2xl font-bold text-amber-600">12+</div>
              <div className="text-sm text-gray-600">
                Vocational Skilled Courses
              </div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-red-100">
              <div className="text-2xl font-bold text-red-600">Lifetime</div>
              <div className="text-sm text-gray-600">
                Learning Platform Access+
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Carousel */}
        <Carousel
          plugins={[plugin.current]}
          className="w-full m-0 p-0"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <>
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/3">
                  <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <img
                      src={`/app/CSR/ksdc/ksdc${index + 1}.JPG`}
                      alt="KSDC vocational training sessions conducted by our expert trainers"
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-sm font-semibold">
                        Vocational Training Sessions
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              </>
            ))}
          </CarouselContent>

          <CarouselPrevious className="md:flex hidden -left-12 bg-white/90 border-orange-200 hover:bg-orange-50 text-orange-600" />
          <CarouselNext className="md:flex hidden -right-12 bg-white/90 border-orange-200 hover:bg-orange-50 text-orange-600" />
        </Carousel>

        {/* Program Features */}
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-orange-100 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-orange-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">CMKKY Training</h3>
            <p className="text-sm text-gray-600">
              Chief Minister&apos;s Kaushalya Karnataka Yojane certified
              programs
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-amber-100 text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-amber-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Job Placement</h3>
            <p className="text-sm text-gray-600">
              Direct industry connections and employment assistance
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-red-100 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Government Certified
            </h3>
            <p className="text-sm text-gray-600">
              Nationally recognized KSDC certification programs
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-orange-100 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-orange-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Entrepreneurship
            </h3>
            <p className="text-sm text-gray-600">
              Business development and self-employment guidance
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
