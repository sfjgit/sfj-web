import React from "react";
import Image from "next/image";

export default function RefundPolicy() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-white overflow-hidden">
        <Image
          src="/ban5.png"
          alt="Refund Policy"
          fill
          className="object-cover opacity-5"
          priority
        />

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/5 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/5 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-blue-500/5 rounded-full animate-pulse delay-500"></div>
        </div>

        {/* Floating icons */}
        <div className="absolute inset-0">
          <div className="absolute top-32 left-20 animate-bounce delay-300">
            <svg
              className="w-8 h-8 text-blue-500/20"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <div className="absolute bottom-32 right-32 animate-bounce delay-700">
            <svg
              className="w-10 h-10 text-blue-500/20"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
            </svg>
          </div>
          <div className="absolute top-60 left-1/3 animate-bounce delay-1000">
            <svg
              className="w-6 h-6 text-blue-500/20"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center h-full px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-4">
                <svg
                  className="w-12 h-12 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold text-slate-800 mb-4 tracking-tight">
              Cancellation & Refund Policy
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
              Clear, transparent terms for all our educational programs
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-full px-4 py-2 flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-blue-800 text-sm font-medium">
                  7-Day Policy
                </span>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-full px-4 py-2 flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <span className="text-blue-800 text-sm font-medium">
                  Easy Process
                </span>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-full px-4 py-2 flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="text-blue-800 text-sm font-medium">
                  Fair Terms
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="space-y-12">
          {/* Self-Placed Learning */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="border-l-4 border-blue-600 bg-blue-50 px-6 py-4 rounded-t-xl">
              <h2 className="text-xl font-semibold text-slate-800">
                Self-Placed Learning
              </h2>
            </div>
            <div className="p-6">
              <p className="text-slate-600 leading-relaxed">
                You can request a refund for a course within{" "}
                <span className="font-semibold text-slate-800">
                  7 days of purchase
                </span>
                . If you have accessed more than 25% of the course content or
                downloaded the ebook, you will not be eligible for a refund.
                Refund requests received after 7 days will not be processed.
              </p>
            </div>
          </div>

          {/* Instructor-Led Training */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="border-l-4 border-emerald-600 bg-emerald-50 px-8 py-6 rounded-t-xl">
              <h2 className="text-2xl font-semibold text-slate-800">
                Instructor-Led Training
              </h2>
            </div>
            <div className="p-8">
              <p className="text-slate-600 text-lg leading-relaxed">
                You can request a refund for an e-learning course within{" "}
                <span className="font-semibold text-slate-800">
                  7 days of purchase
                </span>
                . However, if you have accessed more than 25% of the course
                content, attended online classrooms or received recordings for
                more than 1 day, or downloaded the e-book, you will not be
                eligible for a refund. Refund requests received after 7 days
                will not be processed.
              </p>
            </div>
          </div>

          {/* University Programs */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="border-l-4 border-purple-600 bg-purple-50 px-8 py-6 rounded-t-xl">
              <h2 className="text-2xl font-semibold text-slate-800">
                University Partnered Programs / Bootcamps
              </h2>
            </div>
            <div className="p-8">
              <p className="text-slate-600 text-lg leading-relaxed">
                Raise refund requests within{" "}
                <span className="font-semibold text-slate-800">
                  7 days from the start date
                </span>{" "}
                of the regular class (Live or Recorded as the case may be)
                whether attended or not. The Money-back guarantee is void if the
                participant raises any refund request beyond 7 days from the
                regular class.
              </p>
            </div>
          </div>

          {/* Certification Programs */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="border-l-4 border-orange-600 bg-orange-50 px-8 py-6 rounded-t-xl">
              <h2 className="text-2xl font-semibold text-slate-800">
                Cancellation & Refunds: CSM, CSPO, PSM, and PSPO Programs
              </h2>
            </div>
            <div className="p-8 space-y-5">
              {[
                "SFJBS may postpone, cancel, or change the location of an event due to insufficient enrolment, instructor illness, or force majeure events (such as floods, earthquakes, political instability, etc.)",
                "If SFJBS cancels an event, 100% of the course fees will be refunded to the delegate if the refund request is made within 10 days of purchase. However, travel, logistics, or any personal expenses incurred by learners/participants will not be refunded",
                "If SFJBS postpones/cancels an event, participants who purchased the course more than 10 days ago will be rescheduled to the next available batch without any additional charges",
                "If a delegate cancels their participation in an event 10 business days (or more) prior to the event, 10% of the total paid fee will be deducted and the remaining amount will be refunded to the delegate",
                "All materials are copyrighted by SFJBS or its partners",
                "If a delegate cancels their participation in an event within 10 business days (or less) of the event, no refunds will be made",
                "No refunds or credits will be given to participants who do not attend both days of the course",
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Process Section */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="border-l-4 border-indigo-600 bg-indigo-50 px-8 py-6 rounded-t-xl">
                <h3 className="text-xl font-semibold text-slate-800">
                  How to Request Refunds
                </h3>
              </div>
              <div className="p-8">
                <p className="text-slate-600 leading-relaxed">
                  From the{" "}
                  <span className="font-semibold text-slate-800">
                    &quot;My Orders&quot;
                  </span>{" "}
                  section of the website, by clicking on{" "}
                  <span className="font-semibold text-slate-800">
                    &quot;Initiate Refund&quot;
                  </span>{" "}
                  next to the specific item in the order. This method can only
                  be used for orders with one item. If the order has more than
                  one item, please contact the support team through the
                  <span className="font-semibold text-slate-800">
                    {" "}
                    &quot;Help & Support&quot;
                  </span>{" "}
                  section of the website.
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="border-l-4 border-slate-600 bg-slate-50 px-8 py-6 rounded-t-xl">
                <h3 className="text-xl font-semibold text-slate-800">
                  Duplicate Payment Refunds
                </h3>
              </div>
              <div className="p-8">
                <p className="text-slate-600 leading-relaxed">
                  Refund of the duplicate payment made by the delegate will be
                  processed via the same source (original method of payment) in{" "}
                  <span className="font-semibold text-slate-800">
                    10 working days
                  </span>{" "}
                  post intimation by the customer. SFJBS reserves the right to
                  revise the terms & conditions of this policy without any prior
                  notice.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 border border-slate-200 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-semibold text-slate-800 mb-4">
              Need Assistance?
            </h3>
            <p className="text-slate-600 text-lg mb-8 max-w-2xl mx-auto">
              Our support team is ready to help you with any questions regarding
              refunds or cancellations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-sm hover:shadow-md">
                Contact Support
              </button>
              <button className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 hover:border-slate-400 px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md">
                View My Orders
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
