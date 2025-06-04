/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import {
  Shield,
  Lock,
  BookOpen,
  Gift,
  Globe,
  Copyright,
  User,
  AlertTriangle,
  Clock,
  FileText,
  Eye,
  Edit3,
  CheckCircle,
  HelpCircle,
  ChevronRight,
  ChevronDown,
  ArrowUp,
  Scale,
  Building,
} from "lucide-react";

export default function TermOfUse() {
  const [activeSection, setActiveSection] = useState(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      color: "bg-blue-600",
    },
    {
      id: 2,
      title: "User ID and Password",
      icon: Lock,
      color: "bg-slate-600",
    },
    {
      id: 3,
      title: "Content and Courseware",
      icon: BookOpen,
      color: "bg-emerald-600",
    },
    {
      id: 4,
      title: "Free Access",
      icon: Gift,
      color: "bg-amber-600",
    },
    {
      id: 5,
      title: "Usage of the Website and Services",
      icon: Globe,
      color: "bg-indigo-600",
    },
    {
      id: 6,
      title: "Intellectual Property Rights",
      icon: Copyright,
      color: "bg-red-600",
    },
    {
      id: 7,
      title: "Usage of Personal Information of Participants",
      icon: User,
      color: "bg-purple-600",
    },
    {
      id: 8,
      title: "Limitation of Liability",
      icon: AlertTriangle,
      color: "bg-orange-600",
    },
    {
      id: 9,
      title: "Term and Termination",
      icon: Clock,
      color: "bg-gray-600",
    },
    {
      id: 10,
      title: "Indemnity",
      icon: Scale,
      color: "bg-teal-600",
    },
    {
      id: 11,
      title: "Waiver",
      icon: FileText,
      color: "bg-cyan-600",
    },
    {
      id: 12,
      title: "Severability",
      icon: Eye,
      color: "bg-violet-600",
    },
    {
      id: 13,
      title: "Amendment and Assignment",
      icon: Edit3,
      color: "bg-rose-600",
    },
    {
      id: 14,
      title: "Entire Agreement",
      icon: CheckCircle,
      color: "bg-green-600",
    },
    {
      id: 15,
      title: "Query Redressal",
      icon: HelpCircle,
      color: "bg-blue-700",
    },
  ];

  const toggleSection = (sectionId: any) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Building className="w-12 h-12 text-blue-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900">Terms of Use</h1>
            </div>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              SFJ Business Solutions Private Limited
            </p>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Overview
            </h2>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms of Use constitute a legally binding agreement
                between you (the Participant or User) and SFJ Business Solutions
                Private Limited (SFJBS, Company, we, us, or our) governing your
                access to and use of our website, educational content,
                courseware, and related services.
              </p>
              <p className="text-gray-700 leading-relaxed">
                By accessing our platform at sfjbs@sfjbs.com or creating an
                account, you acknowledge that you have read, understood, and
                agree to be bound by these terms and all applicable laws and
                regulations. If you do not agree with these terms, you must not
                access or use our services.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Scope of Services
                </h3>
                <p className="text-gray-600 text-sm">
                  Our platform provides certification training courses,
                  educational content, practice tests, and related courseware
                  designed to enhance professional skills and knowledge in
                  various business domains.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  User Responsibilities
                </h3>
                <p className="text-gray-600 text-sm">
                  Users are expected to maintain account security, use content
                  appropriately, respect intellectual property rights, and
                  comply with all terms and conditions outlined in this
                  agreement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terms Sections */}
      <div className="bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            Detailed Terms and Conditions
          </h2>

          <div className="space-y-4">
            {/* Section 1 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div
                onClick={() => toggleSection(1)}
                className="flex items-center p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="p-3 rounded-lg bg-blue-600 mr-4">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 flex-1">
                  1. Acceptance of this Agreement
                </h3>
                {activeSection === 1 ? (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </div>
              {activeSection === 1 && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="pt-4">
                    <p className="text-gray-700 leading-relaxed">
                      By clicking on the SIGNUP option, the participant (You or
                      Your) agrees to the Terms and Conditions, obligations,
                      representations, warranties, and agreements contained
                      herein (the Agreement). In the event, You are not willing
                      to accept the Agreement, You shall not be authorized or
                      allowed to proceed further to view or use in any manner
                      any content, information, courseware, products and
                      services (Services) published, available or provided on
                      sfjbs@sfjbs.com (the Website), which is owned, maintained
                      and monitored by SFJ BUSINESS SOLUTIONS PVT LTD (Us, We or
                      Our).
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Section 2 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div
                onClick={() => toggleSection(2)}
                className="flex items-center p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="p-3 rounded-lg bg-slate-600 mr-4">
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 flex-1">
                  2. User ID and Password
                </h3>
                {activeSection === 2 ? (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </div>
              {activeSection === 2 && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="pt-4 space-y-4">
                    <div className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center text-white text-xs font-bold mr-3 mt-0.5">
                        I
                      </div>
                      <p className="text-gray-700 leading-relaxed flex-1">
                        By entering into this Agreement, You acknowledge and
                        agree that Your user ID and password (Participant
                        Account) are for Your exclusive use only. Use or sharing
                        of Your Participant Account with another user is not
                        permitted and is cause for the immediate blocking of
                        Your access to the Website, the Services and the
                        Content, the Courseware, and termination of this
                        Agreement.
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center text-white text-xs font-bold mr-3 mt-0.5">
                        II
                      </div>
                      <p className="text-gray-700 leading-relaxed flex-1">
                        You agree that You are solely responsible for
                        maintaining the confidentiality of Your Participant
                        Account and for all activities that occur under it. You
                        agree to immediately notify our Grievance Officer if You
                        become aware of or have reason to believe that there is
                        any unauthorized use of Your Participant Account.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Remaining sections with similar structure */}
            {sections.slice(2).map((section, index) => {
              const sectionNumber = index + 3;
              const isActive = activeSection === sectionNumber;

              // Content for each section
              let content;
              switch (sectionNumber) {
                case 3:
                  content = [
                    "As a part of our Services offered through our Website, We shall grant you access to our content, courseware, practice tests, and other information, documents, and data which may be in audio, video, written, graphic, recorded, photographic, or any machine-readable format in relation to the specific certification training course You have registered for (Content and Courseware).",
                    "We reserve the right to amend, revise or update the Content and Courseware offered to You. If such an amendment, revision or updation occurs, We may require you to pay an additional fee to access such amended, revised, or updated Content and Courseware.",
                  ];
                  break;
                case 4:
                  content = [
                    "The selected courses of free access (hereinafter the Courses) are brought to you by SFJ BUSINESS SOLUTIONS PVT LTD (SFJBS). Your access to the said Courses is limited to the extent of self-learning videos and course resources only.",
                    "courses shall be limited to such respective number of days, as may be notified against each Course on the date of your enrolment and shall be revoked at the instance of expiry of the respective number of days.",
                    "Upon your enrolment in these free courses, no license is deemed to be granted to you for further sale or to utilize the materials for any reuse, reproduction, or re-publication for commercial/non-commercial purposes.",
                  ];
                  break;
                case 5:
                  content =
                    "For the sole purpose of completing the certification training course you have registered for, we grant you a personal, non-transferable, and revocable license to use the Website, Services, Content, and Courseware up until completion or termination of this Agreement, whichever occurs first.";
                  break;
                case 6:
                  content =
                    "You acknowledge that we are the sole owners of the Website, the Services, the Content, and the Courseware and that you may only use them for the Restricted Purpose described in this Agreement. All the intellectual property rights and other proprietary rights in and to the Website, Services, Content, and Courseware are owned by us as the owner.";
                  break;
                case 7:
                  content =
                    "We may use any photographs or videos of you for promotional purposes and may inform you about our other certification training courses using your personal information. However, we will not share your personal information with any third-party marketing database or disclose it to any third party without proper verification or if required by law on a case-by-case basis.";
                  break;
                case 8:
                  content =
                    "You use the Website, Services, Content, and Courseware at your own risk. We do not promise that the Website, Services, or access to the Content and Courseware will be error-free or uninterrupted, and we do not promise that any information you obtain through them will be accurate or dependable.";
                  break;
                case 9:
                  content = [
                    "By selecting I ACCEPT, you agree to this Agreement. It is valid for as long as your Participant Account is active and paid in full, or until we decide to terminate it.",
                    "We can use all of our rights and remedies under this Agreement and any relevant legislation if an Event of Default takes place.",
                  ];
                  break;
                case 10:
                  content =
                    "By using the Website, Services, Content, and Courseware without authorization or in violation of this Agreement, you agree to hold us and our contractors, licensors, directors, officers, employees, and agents harmless from any claims, losses, damages, liabilities, and expenses, including legal fees.";
                  break;
                case 11:
                  content =
                    "No failure or delay in exercising any remedy, power, or privilege provided for in this Agreement shall operate as a waiver of such right or of any other right. Unless we expressly confirm in writing and by our signature, we will not be deemed to have waived any provision of this Agreement or consented to any breach.";
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
                <div
                  key={sectionNumber}
                  className="bg-white rounded-lg shadow-sm border border-gray-200"
                >
                  <div
                    onClick={() => toggleSection(sectionNumber)}
                    className="flex items-center p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className={`p-3 rounded-lg ${section.color} mr-4`}>
                      <section.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 flex-1">
                      {sectionNumber}. {section.title}
                    </h3>
                    {isActive ? (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  {isActive && (
                    <div className="px-6 pb-6 border-t border-gray-100">
                      <div className="pt-4">
                        {Array.isArray(content) ? (
                          <div className="space-y-4">
                            {content.map((text, idx) => (
                              <div key={idx} className="flex items-start">
                                <div
                                  className={`w-6 h-6 rounded-full ${section.color} flex items-center justify-center text-white text-xs font-bold mr-3 mt-0.5`}
                                >
                                  {["I", "II", "III"][idx]}
                                </div>
                                <p className="text-gray-700 leading-relaxed flex-1">
                                  {text}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-700 leading-relaxed">
                            {content}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-gray-600 mb-2">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} SFJ Business Solutions Private
              Limited. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
