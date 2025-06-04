"use client";
import React, { useState, useEffect } from "react";
import {
  Shield,
  User,
  Lock,
  BookOpen,
  Gift,
  Globe,
  Copyright,
  Camera,
  AlertTriangle,
  Clock,
  FileText,
  Eye,
  Edit3,
  CheckCircle,
  HelpCircle,
  ChevronRight,
  ChevronDown,
  Sparkles,
  ArrowUp,
} from "lucide-react";

export default function TermOfUse() {
  const [activeSection, setActiveSection] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sections = [
    {
      id: 1,
      title: "Acceptance of this Agreement",
      icon: Shield,
      color: "from-blue-500 to-purple-600",
    },
    {
      id: 2,
      title: "User ID and Password",
      icon: Lock,
      color: "from-purple-500 to-pink-600",
    },
    {
      id: 3,
      title: "Content and Courseware",
      icon: BookOpen,
      color: "from-pink-500 to-red-600",
    },
    {
      id: 4,
      title: "Free Access",
      icon: Gift,
      color: "from-orange-500 to-yellow-600",
    },
    {
      id: 5,
      title: "Usage of the Website and Services",
      icon: Globe,
      color: "from-green-500 to-blue-600",
    },
    {
      id: 6,
      title: "Intellectual Property Rights",
      icon: Copyright,
      color: "from-blue-500 to-indigo-600",
    },
    {
      id: 7,
      title: "Usage of Personal Information of Participants",
      icon: Camera,
      color: "from-indigo-500 to-purple-600",
    },
    {
      id: 8,
      title: "Limitation of Liability",
      icon: AlertTriangle,
      color: "from-red-500 to-pink-600",
    },
    {
      id: 9,
      title: "Term and Termination",
      icon: Clock,
      color: "from-yellow-500 to-orange-600",
    },
    {
      id: 10,
      title: "Indemnity",
      icon: Shield,
      color: "from-teal-500 to-green-600",
    },
    {
      id: 11,
      title: "Waiver",
      icon: FileText,
      color: "from-cyan-500 to-blue-600",
    },
    {
      id: 12,
      title: "Severability",
      icon: Eye,
      color: "from-violet-500 to-purple-600",
    },
    {
      id: 13,
      title: "Amendment and Assignment",
      icon: Edit3,
      color: "from-rose-500 to-pink-600",
    },
    {
      id: 14,
      title: "Entire Agreement",
      icon: CheckCircle,
      color: "from-emerald-500 to-teal-600",
    },
    {
      id: 15,
      title: "Query Redressal",
      icon: HelpCircle,
      color: "from-amber-500 to-orange-600",
    },
  ];

  const toggleSection = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-blue-900/90"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        ></div>
        <div className="relative h-96 flex items-center justify-center">
          <div className="text-center space-y-6 animate-fade-in">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Sparkles className="w-8 h-8 text-yellow-400 animate-spin" />
              <FileText className="w-12 h-12 text-white" />
              <Sparkles className="w-8 h-8 text-yellow-400 animate-spin" />
            </div>
            <h1 className="text-6xl font-bold text-white bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent animate-gradient">
              Terms Of Use
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="relative max-w-6xl mx-auto px-4 py-12">
        <div className="grid gap-8">
          {/* Section 1 */}
          <div className="group">
            <div
              onClick={() => toggleSection(1)}
              className="flex items-center space-x-4 p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 cursor-pointer transition-all duration-300 hover:bg-white/15 hover:scale-105 hover:shadow-2xl"
            >
              <div
                className={`p-3 rounded-xl bg-gradient-to-r ${sections[0].color} shadow-lg`}
              >
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white flex-1">
                1. Acceptance of this Agreement
              </h2>
              {activeSection === 1 ? (
                <ChevronDown className="w-6 h-6 text-white transition-transform duration-300" />
              ) : (
                <ChevronRight className="w-6 h-6 text-white transition-transform duration-300" />
              )}
            </div>
            {activeSection === 1 && (
              <div className="mt-4 p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 animate-slide-down">
                <p className="text-gray-300 leading-relaxed">
                  By clicking on the 'SIGNUP' option, the participant ("You" or
                  "Your") agrees to the Terms and Conditions, obligations,
                  representations, warranties, and agreements contained herein
                  (the "Agreement"). In the event, You are not willing to accept
                  the Agreement, You shall not be authorized or allowed to
                  proceed further to view or use in any manner any content,
                  information, courseware, products and services ("Services")
                  published, available or provided on sfjbs@sfjbs.com (the
                  "Website"), which is owned, maintained and monitored by SFJ
                  BUSINESS SOLUTIONS PVT LTD ("Us", "We" or "Our").
                </p>
              </div>
            )}
          </div>

          {/* Section 2 */}
          <div className="group">
            <div
              onClick={() => toggleSection(2)}
              className="flex items-center space-x-4 p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 cursor-pointer transition-all duration-300 hover:bg-white/15 hover:scale-105 hover:shadow-2xl"
            >
              <div
                className={`p-3 rounded-xl bg-gradient-to-r ${sections[1].color} shadow-lg`}
              >
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white flex-1">
                2. User ID and Password
              </h2>
              {activeSection === 2 ? (
                <ChevronDown className="w-6 h-6 text-white transition-transform duration-300" />
              ) : (
                <ChevronRight className="w-6 h-6 text-white transition-transform duration-300" />
              )}
            </div>
            {activeSection === 2 && (
              <div className="mt-4 p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 animate-slide-down space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                    I
                  </div>
                  <p className="text-gray-300 leading-relaxed flex-1">
                    By entering into this Agreement, You acknowledge and agree
                    that Your user ID and password ("Participant Account") are
                    for Your exclusive use only. Use or sharing of Your
                    Participant Account with another user is not permitted and
                    is cause for the immediate blocking of Your access to the
                    Website, the Services and the Content, the Courseware, and
                    termination of this Agreement.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                    II
                  </div>
                  <p className="text-gray-300 leading-relaxed flex-1">
                    You agree that You are solely responsible for maintaining
                    the confidentiality of Your Participant Account and for all
                    activities that occur under it. You agree to immediately
                    notify our Grievance Officer if You become aware of or have
                    reason to believe that there is any unauthorized use of Your
                    Participant Account. You also agree to take all reasonable
                    steps to stop such unauthorized use and to cooperate with Us
                    in any investigation of such unauthorized uses. We shall not
                    under any circumstances be held liable for any claims
                    related to the use or misuse of Your Participant Account due
                    to the activities of any third party outside of our control
                    or due to Your failure to maintain the confidentiality and
                    security of Your Participant Account.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Section 3 */}
          <div className="group">
            <div
              onClick={() => toggleSection(3)}
              className="flex items-center space-x-4 p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 cursor-pointer transition-all duration-300 hover:bg-white/15 hover:scale-105 hover:shadow-2xl"
            >
              <div
                className={`p-3 rounded-xl bg-gradient-to-r ${sections[2].color} shadow-lg`}
              >
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white flex-1">
                3. Content and Courseware
              </h2>
              {activeSection === 3 ? (
                <ChevronDown className="w-6 h-6 text-white transition-transform duration-300" />
              ) : (
                <ChevronRight className="w-6 h-6 text-white transition-transform duration-300" />
              )}
            </div>
            {activeSection === 3 && (
              <div className="mt-4 p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 animate-slide-down space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center text-white font-bold text-sm">
                    I
                  </div>
                  <p className="text-gray-300 leading-relaxed flex-1">
                    As a part of our Services offered through our Website, We
                    shall grant you access to our content, courseware, practice
                    tests, and other information, documents, and data which may
                    be in audio, video, written, graphic, recorded,
                    photographic, or any machine-readable format in relation to
                    the specific certification training course You have
                    registered for ("Content and Courseware").
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center text-white font-bold text-sm">
                    II
                  </div>
                  <p className="text-gray-300 leading-relaxed flex-1">
                    We reserve the right to amend, revise or update the Content
                    and Courseware offered to You. If such an amendment,
                    revision or updation occurs, We may require you to pay an
                    additional fee to access such amended, revised, or updated
                    Content and Courseware.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Section 4 */}
          <div className="group">
            <div
              onClick={() => toggleSection(4)}
              className="flex items-center space-x-4 p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 cursor-pointer transition-all duration-300 hover:bg-white/15 hover:scale-105 hover:shadow-2xl"
            >
              <div
                className={`p-3 rounded-xl bg-gradient-to-r ${sections[3].color} shadow-lg`}
              >
                <Gift className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white flex-1">
                4. Free Access
              </h2>
              {activeSection === 4 ? (
                <ChevronDown className="w-6 h-6 text-white transition-transform duration-300" />
              ) : (
                <ChevronRight className="w-6 h-6 text-white transition-transform duration-300" />
              )}
            </div>
            {activeSection === 4 && (
              <div className="mt-4 p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 animate-slide-down space-y-4">
                {[
                  'The selected courses of free access (hereinafter the "Courses") are brought to you by SFJ BUSINESS SOLUTIONS PVT LTD ("SFJBS"). Your access to the said Courses is limited to the extent of self-learning videos and course resources only. Nothing herein shall at any time be construed to mean unhindered or unconditional access to all the features of the said Courses, as may be available upon purchase of the respective Courses.',
                  "courses shall be limited to such respective number of days, as may be notified against each Course on the date of your enrolment and shall be revoked at the instance of expiry of the respective number of days. However, SFJBS at its sole option reserves the right to revoke or extend your free access to all contents made available to you at any early instance under the free access without any notice or liability.",
                  "Upon your enrolment in these free courses, no license is deemed to be granted to you for further sale or to utilize the materials for any reuse, reproduction, or re-publication for commercial/non-commercial purposes.",
                  "All materials provided to you under the free access are copyright products of SFJBS or its partners. Any violation of laws herein, or otherwise, shall make you liable to the maximum extent available under law.",
                  "All regular features of the Courses, including exam vouchers and certifications, but not limited to them, shall be available upon a full value complete purchase of the respective Courses only. Upon such full value complete purchase of any of these Courses, your balance of the free access days shall be added onto the number of days that may be generally applicable to the respective Courses.",
                  "The above terms shall be read along with SFJBS's Terms of Use and in the event of any conflicts, the ones stated here shall prevail, but to the extent of the said free access Courses only.",
                  "Please also read our Privacy Policy carefully. SFJBS reserves all other rights, 'ingress' & 'egress' with respect to the free access and may extend or forfeit the tenure of this offer at any time.",
                ].map((text, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center text-white font-bold text-sm">
                      {["I", "II", "III", "IV", "V", "VI", "VII"][index]}
                    </div>
                    <p className="text-gray-300 leading-relaxed flex-1">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sections 5-15 with similar structure */}
          {sections.slice(4).map((section, index) => {
            const sectionNumber = index + 5;
            const isActive = activeSection === sectionNumber;

            let content;
            switch (sectionNumber) {
              case 5:
                content =
                  "For the sole purpose of completing the certification training course you have registered for, we grant you a personal, non-transferable, and revocable license to use the Website, Services, Content, and Courseware up until completion or termination of this Agreement, whichever occurs first. The Content and Courseware are only available for your own personal, non- commercial use. Without Our written authorization, it is strictly forbidden to reproduce, distribute, or modify the Content and Courseware in any way for any use other than the Restricted Purpose.";
                break;
              case 6:
                content =
                  "You acknowledge that we are the sole owners of the Website, the Services, the Content, and the Courseware and that you may only use them for the Restricted Purpose described in this Agreement. All the intellectual property rights and other proprietary rights in and to the Website, Services, Content, and Courseware are owned by us as the owner. Beyond what is required to use the Website, Services, Content, and Courseware for the Restricted Purpose, nothing in this Agreement grants you any right, title, or interest in them.";
                break;
              case 7:
                content =
                  "We may use any photographs or videos of you for promotional purposes and may inform you about our other certification training courses using your personal information. However, we will not share your personal information with any third-party marketing database or disclose it to any third party without proper verification or if required by law on a case-by-case basis.";
                break;
              case 8:
                content =
                  "You use the Website, Services, Content, and Courseware at your own risk. We do not promise that the Website, Services, or access to the Content and Courseware will be error-free or uninterrupted, and we do not promise that any information you obtain through them will be accurate or dependable. We will not be responsible for any losses that result from your use of them, nor will we or any other party involved in their creation, production, or distribution. This covers any inability to perform, mistake, omission, interruption, deletion, defect, delay, computer virus, broken communication line, theft, or destruction, as well as any unauthorized access to, alteration of, or use of records or other data. You agree that we have no responsibility or liability for any libelous, slanderous, tortious, or unlawful acts of any third parties or other users of the website, services, content, or courseware. The amount you paid for the certification training course will serve as the maximum amount of our liability for any legal claims related to the Services, Content, or Courseware.";
                break;
              case 9:
                content = [
                  'By selecting "I ACCEPT," you agree to this Agreement. It is valid for as long as your Participant Account is active and paid in full, or until we decide to terminate it. If you falsify information, default, act improperly, or violate this Agreement\'s terms, we may immediately terminate this Agreement and your access to the Content and Courseware by providing you a written notice through email.',
                  "We can use all of our rights and remedies under this Agreement and any relevant legislation if an Event of Default takes place.",
                ];
                break;
              case 10:
                content =
                  "By using the Website, Services, Content, and Courseware without authorization or in violation of this Agreement, you agree to hold us and our contractors, licensors, directors, officers, employees, and agents harmless from any claims, losses, damages, liabilities, and expenses, including legal fees.";
                break;
              case 11:
                content =
                  "No failure or delay in exercising any remedy, power, or privilege provided for in this Agreement shall operate as a waiver of such right or of any other right. Unless we expressly confirm in writing and by our signature, we will not be deemed to have waived any provision of this Agreement or consented to any breach. Any rights waived or breaches accepted will not affect any other rights or violations.";
                break;
              case 12:
                content =
                  "The remainder of this Agreement will still be applicable if any portion is declared invalid or unenforceable under Indian law. The invalid or unenforceable clause will be replaced by a legitimate provision that as closely as possible reflects the parties' intentions.";
                break;
              case 13:
                content =
                  "This agreement is subject to change without prior notice, and the revised version will be posted online. You are responsible for checking for updates, and by using the website going forward, you agree to any modifications. This Agreement is personal to you and may not be assigned or otherwise transferred by you.";
                break;
              case 14:
                content =
                  "This Agreement, the Terms of Use, the Privacy Statement, the Refund and Rescheduling Policies, and any other guidelines, rules, and/or disclaimers posted on the Website together make up the entire agreement governing Your use of our Website and supersede any prior agreements, if any, relating to any subject matter covered by this Agreement.";
                break;
              case 15:
                content =
                  "In case you have any concerns or queries, please reach out to our Support Team. Our team shall undertake all reasonable efforts to address your queries in the shortest possible time. You may contact us at: sfjbs@sfjbs.com";
                break;
            }

            return (
              <div key={sectionNumber} className="group">
                <div
                  onClick={() => toggleSection(sectionNumber)}
                  className="flex items-center space-x-4 p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 cursor-pointer transition-all duration-300 hover:bg-white/15 hover:scale-105 hover:shadow-2xl"
                >
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-r ${section.color} shadow-lg`}
                  >
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white flex-1">
                    {sectionNumber}. {section.title}
                  </h2>
                  {isActive ? (
                    <ChevronDown className="w-6 h-6 text-white transition-transform duration-300" />
                  ) : (
                    <ChevronRight className="w-6 h-6 text-white transition-transform duration-300" />
                  )}
                </div>
                {isActive && (
                  <div className="mt-4 p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 animate-slide-down">
                    {Array.isArray(content) ? (
                      <div className="space-y-4">
                        {content.map((text, idx) => (
                          <div key={idx} className="flex items-start space-x-3">
                            <div
                              className={`w-8 h-8 rounded-full bg-gradient-to-r ${section.color} flex items-center justify-center text-white font-bold text-sm`}
                            >
                              {["I", "II"][idx]}
                            </div>
                            <p className="text-gray-300 leading-relaxed flex-1">
                              {text}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-300 leading-relaxed">{content}</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-110 z-50"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
