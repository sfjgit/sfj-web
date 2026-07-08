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

export default function Naan() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <section className="py-16 mt-12 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 border border-blue-200 rounded-full mb-4">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm font-semibold text-blue-700">
              Our Training Partnership
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Naan Mudhalvan Training Program
          </h2>

          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-lg text-gray-700 leading-relaxed">
              As proud training partners in the Naan Mudhalvan initiative,
              we&apos;ve provided completely FREE training to over 20,000
              students across Tamil Nadu, making quality education accessible to
              all backgrounds.
            </p>

            {/* <p className="text-base text-gray-600 leading-relaxed">
              Students only pay a minimal Free for essential training materials
              and lifetime access to our comprehensive learning platform,
              ensuring everyone can afford industry-relevant technology skills
              and career guidance.
            </p> */}
          </div>

          {/* Our Impact */}
          <div className="grid md:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
              <div className="text-2xl font-bold text-blue-600">20,000+</div>
              <div className="text-sm text-gray-600">
                Free Training Provided
              </div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-cyan-100">
              <div className="text-2xl font-bold text-cyan-600">10+</div>
              <div className="text-sm text-gray-600">
                Vocational Skilled Courses
              </div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-purple-100">
              <div className="text-2xl font-bold text-purple-600">Lifetime</div>
              <div className="text-sm text-gray-600">
                Learning Platform Access
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
            <CarouselItem className="pl-2 md:pl-4 md:basis-1/3">
              <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <img
                  src="/app/CSR/gallery/1.jpeg"
                  alt="Our skill development training session for Naan Mudhalvan students"
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-sm font-semibold">
                    Our Training Sessions
                  </div>
                </div>
              </div>
            </CarouselItem>

            <CarouselItem className="pl-2 md:pl-4 md:basis-1/3">
              <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <img
                  src="/app/CSR/gallery/2.jpeg"
                  alt="Students in our affordable technology workshops"
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-sm font-semibold">
                    Hands-on Workshops
                  </div>
                </div>
              </div>
            </CarouselItem>

            <CarouselItem className="pl-2 md:pl-4 md:basis-1/3">
              <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <img
                  src="/app/CSR/gallery/3.jpeg"
                  alt="Our mentorship and career guidance programs"
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-sm font-semibold">
                    Mentorship Programs
                  </div>
                </div>
              </div>
            </CarouselItem>

            <CarouselItem className="pl-2 md:pl-4 md:basis-1/3">
              <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <img
                  src="/app/CSR/gallery/4.jpeg"
                  alt="Student success stories from our training programs"
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-sm font-semibold">
                    Student Success Stories
                  </div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>

          <CarouselPrevious className="md:flex hidden -left-12 bg-white/90 border-blue-200 hover:bg-blue-50 text-blue-600" />
          <CarouselNext className="md:flex hidden -right-12 bg-white/90 border-blue-200 hover:bg-blue-50 text-blue-600" />
        </Carousel>
      </div>
    </section>
  );
}
