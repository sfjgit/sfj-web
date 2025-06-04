import React from "react";
import Image from "next/image";

export default function Privacy() {
  return (
    <main className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-white overflow-hidden">
        <Image
          src="/ban5.png"
          alt="Privacy Policy"
          fill
          className="object-cover opacity-5"
          priority
        />

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-16 left-8 w-24 h-24 bg-slate-500/5 rounded-full animate-pulse"></div>
          <div className="absolute bottom-16 right-8 w-32 h-32 bg-slate-500/5 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-32 right-16 w-20 h-20 bg-slate-500/5 rounded-full animate-pulse delay-500"></div>
        </div>

        {/* Floating icons */}
        <div className="absolute inset-0">
          <div className="absolute top-24 left-16 animate-bounce delay-300">
            <svg
              className="w-6 h-6 text-slate-500/20"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z" />
            </svg>
          </div>
          <div className="absolute bottom-24 right-24 animate-bounce delay-700">
            <svg
              className="w-7 h-7 text-slate-500/20"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.66,7 15,8.34 15,10C15,11.66 13.66,13 12,13C10.34,13 9,11.66 9,10C9,8.34 10.34,7 12,7Z" />
            </svg>
          </div>
          <div className="absolute top-48 left-1/3 animate-bounce delay-1000">
            <svg
              className="w-5 h-5 text-slate-500/20"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1Z" />
            </svg>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center h-full px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-slate-500/10 backdrop-blur-sm border border-slate-500/20 rounded-2xl p-4">
                <svg
                  className="w-10 h-10 text-slate-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.66,7 15,8.34 15,10C15,11.66 13.66,13 12,13C10.34,13 9,11.66 9,10C9,8.34 10.34,7 12,7Z" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold text-slate-800 mb-4 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
              Your privacy and data protection are our top priorities
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-slate-50 border border-slate-200 rounded-full px-4 py-2 flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-slate-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1Z" />
                </svg>
                <span className="text-slate-800 text-sm font-medium">
                  Secure
                </span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-full px-4 py-2 flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-slate-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-slate-800 text-sm font-medium">
                  Transparent
                </span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-full px-4 py-2 flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-slate-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="text-slate-800 text-sm font-medium">
                  Compliant
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-10">
          {/* Section 1: Acceptance */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl shadow-sm">
            <div className="border-l-4 border-slate-600 bg-slate-50 px-6 py-4 rounded-t-xl">
              <h2 className="text-lg font-semibold text-slate-800">
                1. Acceptance of this Agreement
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-slate-600 leading-relaxed">
                By clicking SIGNUP, you agree to the Terms and Conditions of
                SFJBS. You may not use the website or its services if you do not
                agree to the terms. Your user ID and password are for your
                personal use only. Sharing your account with another user is not
                permitted and will result in your account being blocked.
              </p>

              <div className="bg-white border border-slate-200 rounded-lg p-4">
                <p className="text-sm font-medium text-slate-700 mb-3">
                  Key Points:
                </p>
                <div className="space-y-2">
                  {[
                    'By clicking "SIGNUP," you agree to the Terms and Conditions of SFJBS',
                    "If you do not agree to the terms, you may not use the website or its services",
                    "Your user ID and password are for your personal use only",
                    "Sharing your account with another user is not permitted and will result in your account being blocked",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-slate-600">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed">
                You are responsible for keeping your account information
                confidential and for any activity that occurs on your account.
                If you notice unauthorized activity, you must notify SFJBS
                immediately.
              </p>
            </div>
          </div>

          {/* Section 2: Content and Courseware */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl shadow-sm">
            <div className="border-l-4 border-slate-600 bg-slate-50 px-6 py-4 rounded-t-xl">
              <h2 className="text-lg font-semibold text-slate-800">
                2. Content and Courseware
              </h2>
            </div>
            <div className="p-6">
              <p className="text-slate-600 leading-relaxed">
                SFJBS will grant you access to the content, courseware, practice
                tests, and other information related to the certification
                training course you have registered for. SFJBS reserves the
                right to amend, revise, or update the content and courseware,
                and may require you to pay an additional fee to access the
                amended, revised, or updated content and courseware.
              </p>
            </div>
          </div>

          {/* Section 3: Free Access */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl shadow-sm">
            <div className="border-l-4 border-slate-600 bg-slate-50 px-6 py-4 rounded-t-xl">
              <h2 className="text-lg font-semibold text-slate-800">
                3. Free Access
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                {[
                  "You can access self-learning videos and course resources for free",
                  "Your free access to each course is limited to a certain number of days",
                  "SFJBS can revoke or extend your free access at any time",
                  "You cannot sell or reuse the materials for commercial or non-commercial purposes",
                  "All materials are copyrighted by SFJBS or its partners",
                  "You can only get the regular features of the courses, such as exam vouchers and certifications, by purchasing them",
                  "Your free access days will be added to the number of days that may be generally applicable to the respective courses if you purchase any of these courses",
                  "These terms and conditions are in addition to SFJBS's Terms of Use",
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed mt-4">
                Please also read our Privacy Policy carefully. SFJBS reserves
                all other rights, ingress & egress with respect to the free
                access, and may extend or forfeit the tenure of this offer at
                any time.
              </p>
            </div>
          </div>

          {/* Section 4: Usage of Website */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl shadow-sm">
            <div className="border-l-4 border-slate-600 bg-slate-50 px-6 py-4 rounded-t-xl">
              <h2 className="text-lg font-semibold text-slate-800">
                4. Usage of the Website and Services
              </h2>
            </div>
            <div className="p-6 space-y-3">
              {[
                "You are granted a personal, non-transferable, non-exclusive, and revocable license to use the website, services, and content and courseware for the sole purpose of completing the certification training course you have enrolled for",
                "You acknowledge and agree that SFJBS is the sole and exclusive owner of the website, services, and content and courseware, and that they have all intellectual property rights and other proprietary rights in the website, services, and content and courseware",
                "You acknowledge and agree that this agreement does not convey to you any right, title, or interest in the website, services, or content and courseware, other than the right to use them for the restricted purpose",
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Intellectual Property */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl shadow-sm">
            <div className="border-l-4 border-slate-600 bg-slate-50 px-6 py-4 rounded-t-xl">
              <h2 className="text-lg font-semibold text-slate-800">
                5. Intellectual Property Rights
              </h2>
            </div>
            <div className="p-6 space-y-3">
              {[
                "You are granted a limited, non-exclusive right to use the website, services, and content and courseware for the sole purpose of completing the certification training course you have enrolled for",
                "You acknowledge and agree that SFJBS is the sole and exclusive owner of the website, services, and content and courseware",
                "This agreement does not convey to you any right, title, or interest in the website, services, or content and courseware, other than the right to use them for the restricted purpose",
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 6: Personal Information */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl shadow-sm">
            <div className="border-l-4 border-slate-600 bg-slate-50 px-6 py-4 rounded-t-xl">
              <h2 className="text-lg font-semibold text-slate-800">
                6. Usage of Personal Information of Participants
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-3">
                {[
                  "SFJBS may use your picture in any photos, videos, or other promotional material they use",
                  "SFJBS may use your personal information to inform you about other certification training courses they offer",
                  "SFJBS will not distribute or share your personal information with any third-party marketing database or disclose your personal information to any third party, except on a case-by-case basis after proper verification of such third party or if required under any applicable law",
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed">
                However, they will not share your information with any third
                parties for marketing purposes without your consent, and they
                will only share your information with third parties if required
                by law.
              </p>
            </div>
          </div>

          {/* Continue with remaining sections using same pattern */}
          {[
            {
              title: "7. Limitation of Liability",
              items: [
                "You agree to use the website, services, and content and courseware at your own risk",
                "SFJBS does not guarantee that the website, services, or content and courseware will be uninterrupted or error-free",
                "SFJBS is not liable for any direct, indirect, incidental, special, or consequential damages arising from the use of the website, services, or content and courseware",
                "This disclaimer of liability applies to all damages or injury caused by any failure of performance, error, omission, interruption, deletion, defect, delay in operation or transmission",
                "SFJBS is not liable for any defamatory, offensive, wrongful, or illegal conduct of third parties or other users",
                "SFJBS's liability is limited to the fee you paid to SFJBS for the particular certification training course",
              ],
            },
            {
              title: "8. Term and Termination",
              items: [
                'This agreement will take effect when you click on the "I ACCEPT" button and will remain in effect until you cancel your account or SFJBS terminates your account',
                "SFJBS can terminate this agreement and block your access to the content and courseware immediately by sending you a written notice",
                "If you breach any of the terms of this agreement, SFJBS may exercise all of its rights and remedies",
                "The provisions of clauses 4.3, 7.2, 8, and 11 of this agreement will survive the termination of this agreement",
                "You agree to indemnify and hold Us, Our contractors, licensors, directors, officers, employees, and agents, harmless from and against any and all claims, losses, damages, liabilities, and expenses",
              ],
            },
            {
              title: "9. Waiver",
              items: [
                "If a party does not exercise a right, remedy, power, or privilege under this agreement, it does not mean that the party has waived the right",
                "No term of this agreement can be waived unless it is in writing and signed by the party that is waiving the term",
                "A waiver of one right or breach does not waive any other rights or breaches",
              ],
            },
          ].map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="bg-slate-50 border border-slate-200 rounded-xl shadow-sm"
            >
              <div className="border-l-4 border-slate-600 bg-slate-50 px-6 py-4 rounded-t-xl">
                <h2 className="text-lg font-semibold text-slate-800">
                  {section.title}
                </h2>
              </div>
              <div className="p-6 space-y-3">
                {section.items.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Final sections */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl shadow-sm">
              <div className="border-l-4 border-slate-600 bg-slate-50 px-6 py-4 rounded-t-xl">
                <h3 className="text-lg font-semibold text-slate-800">
                  Entire Agreement
                </h3>
              </div>
              <div className="p-6">
                <p className="text-sm text-slate-600 leading-relaxed">
                  This agreement, along with the privacy policy, refund policy,
                  rescheduling policy, terms of use, and any additional
                  guidelines, rules, and/or disclaimers posted on the website,
                  constitutes the entire agreement governing your use of our
                  website.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl shadow-sm">
              <div className="border-l-4 border-slate-600 bg-slate-50 px-6 py-4 rounded-t-xl">
                <h3 className="text-lg font-semibold text-slate-800">
                  Grievance Redressal
                </h3>
              </div>
              <div className="p-6">
                <p className="text-sm text-slate-600 leading-relaxed">
                  In case you have any concerns or queries, please reach out to
                  our Grievance Officer.
                  <br />
                  <br />
                  <strong>Grievance Officer:</strong> Vishnupriya S<br />
                  <strong>Email:</strong> sfjbs@sfjbs.com
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-slate-50 to-gray-50 border border-slate-200 rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">
              Questions About Our Privacy Policy?
            </h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              If you have any questions or concerns about our privacy practices,
              please don&apos;t hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md">
                Contact Support
              </button>
              <button className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 hover:border-slate-400 px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md">
                View Terms
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
