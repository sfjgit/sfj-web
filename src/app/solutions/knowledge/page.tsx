"use client";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

function Knowledge() {
  return (
    <>
      <Head>
        <title>SFJ Business Solutions | Knowledge As A Service</title>
        <meta
          name="description"
          content="The digital services eco-system as we know it is undergoing a paradigm shift. New stacks and standards are emerging faster than ever, and every organization with a digital footprint is under serious pressure to quickly build and maintain a future-ready workforce."
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
        {/* Hero Section */}
        <section className="relative h-[60vh] sm:h-[70vh] overflow-hidden">
          <Image
            layout="fill"
            alt="Knowledge as a Service - Digital Transformation"
            className="brightness-30 scale-105 transition-transform duration-1000 hover:scale-100"
            src="/ouroffering/knowledge1.jpg"
            objectFit="cover"
            priority
          />

          {/* Enhanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-gray-900/85 to-black/90 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>

          {/* Hero Content */}
          <div className="relative z-20 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="animate-fade-in-up">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                  Knowledge As A{" "}
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    Service
                  </span>
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 mx-auto mb-6 rounded-full shadow-lg shadow-blue-500/50"></div>
                <p className="text-xl sm:text-2xl text-gray-200 font-light max-w-3xl mx-auto">
                  Empowering your workforce with cutting-edge skills for the
                  digital future
                </p>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <div className="animate-bounce">
              <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center backdrop-blur-sm">
                <div className="w-1 h-3 bg-white/80 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>
        {/* Main Content Section */}
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 border border-gray-100 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full -translate-y-20 translate-x-20 opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-indigo-50 to-blue-50 rounded-full translate-y-16 -translate-x-16 opacity-50"></div>

                <div className="relative z-10">
                  <div className="text-center mb-12">
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-blue-800 font-medium text-sm mb-4">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                      Digital Transformation Era
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                      The Future of Workforce Development
                    </h2>
                  </div>

                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed text-lg mb-8">
                      The digital services eco-system as we know it is
                      undergoing a paradigm shift. New stacks and standards are
                      emerging faster than ever, and every organization with a
                      digital footprint is under serious pressure to quickly
                      build and maintain a future-ready workforce.
                    </p>

                    <p className="text-gray-700 leading-relaxed text-lg mb-8">
                      It is no secret that even large corporations with immense
                      resources at their disposal are struggling to cope with
                      this challenge. Empowering workforce on the go requires
                      deep expertise that can be brought within the time and
                      cost allocated. Our knowledge services ecosystem is
                      constantly connected/updated with experts who can deliver
                      online/offline trainings on several in-demand technology
                      skills for your project teams and campus recruits.
                    </p>

                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-l-4 border-blue-500">
                      <p className="text-gray-700 text-lg mb-0">
                        <span className="font-semibold text-gray-900">
                          Ready to explore our offerings?
                        </span>{" "}
                        <Link href="/education">
                          Click here to view our current course offerings
                          <svg
                            className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hybrid Learning Section */}
            <div className="mb-20 sm:mb-32">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="order-2 lg:order-1">
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full text-green-800 font-medium text-sm mb-6">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                    Flexible Learning Approach
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                    Hybrid Learning
                  </h2>

                  <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-8"></div>

                  <p className="text-gray-700 leading-relaxed text-lg mb-8">
                    When it comes to workforce training, each organization has
                    specific needs. We at SFJ understand that, and offer a
                    diverse and flexible approach to training without
                    compromising on quality or effectiveness. Our training
                    programs are delivered online and offline, in self-learning
                    mode and an instructor-led mode.
                  </p>

                  <p className="text-gray-700 leading-relaxed text-lg mb-8">
                    We also offer hybrid models, where employees can go through
                    a series of courses online followed by advanced offline
                    sessions with instructors. Whether it&#39;s a project
                    specific training or long-term capacity building,
                    experienced professionals or campus recruits, we got your
                    upskilling needs covered.
                  </p>

                  <div className="inline-flex items-center">
                    <Link href="/contact">
                      Get in touch to know more
                      <svg
                        className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>

                <div className="order-1 lg:order-2">
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                    <div className="relative h-80 lg:h-96 w-full rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        layout="fill"
                        objectFit="cover"
                        alt="Hybrid Learning - Online and Offline Training"
                        src="/solutions/hybrid.png"
                        className="group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="relative mb-20 sm:mb-32">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              </div>
              <div className="relative flex justify-center">
                <div className="bg-white px-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Strong Network Section */}
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div>
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                    <div className="relative h-80 lg:h-96 w-full rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        layout="fill"
                        objectFit="cover"
                        alt="Strong Network - Expert Trainers and SMEs"
                        src="/solutions/network.png"
                        className="group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-blue-800 font-medium text-sm mb-6">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                    Expert Network
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                    Strong Network
                  </h2>

                  <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-8"></div>

                  <p className="text-gray-700 leading-relaxed text-lg mb-8">
                    Our knowledge services ecosystem is constantly connected and
                    updated with experts who can deliver training sessions on
                    demand. We have an exceptional turnaround time when it comes
                    to deploying the training bandwidth your organization needs.
                  </p>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8 border border-blue-100">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                          5000+
                        </div>
                        <div className="text-gray-600 font-medium">
                          Expert Trainers
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">
                          1000+
                        </div>
                        <div className="text-gray-600 font-medium">
                          Subject Matter Experts
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed text-lg mb-8">
                    Through our network of 5000+ trainers, 1000+ SMEs, we are
                    uniquely placed to help your organization achieve your
                    talent transformation goals with the most optimal strategy.
                  </p>

                  <div className="inline-flex items-center">
                    <Link href="/contact">
                      Get in touch to know more
                      <svg
                        className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 sm:py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Workforce?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of organizations that have already empowered their
              teams with our cutting-edge knowledge services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/education">
                Explore Courses
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </Link>
              <Link href="/contact">
                Contact Us
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  );
}

export default Knowledge;
