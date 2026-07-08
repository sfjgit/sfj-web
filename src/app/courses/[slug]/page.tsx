/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @next/next/no-img-element */
// // app/courses/[slug]/page.tsx
// import { Metadata } from "next";
// import { notFound } from "next/navigation";
// import Script from "next/script";
// import { ICourse, IMetadata } from "@/types/course.types";
// import EnrollButton from "@/components/courses/EnrollButton";
// import CurriculumAccordion from "@/components/courses/CurriculumAccordion";
// import FAQAccordion from "@/components/courses/FAQAccordion";
// import CourseTour from "@/components/courses/CourseTour";
// import Link from "next/link";
// import env from "@/config/env";

// const BACKEND_URL =
//   process.env.NEXT_PUBLIC_BACKEND_BSKILLING_URL ||
//   "https://backend-bskilling-173405861722.asia-south1.run.app";

// const LMS_COURSE_URL = env.NEXT_PUBLIC_LMS_COURSE_URL;

// async function getCourse(
//   slug: string,
// ): Promise<{ course: ICourse; metadata: IMetadata | null } | null> {
//   try {
//     const res = await fetch(`${BACKEND_URL}/api/courses/slug/${slug}`, {
//       headers: { accept: "application/json" },
//       cache: "no-store",
//     });
//     if (!res.ok) return null;
//     const data = await res.json();
//     if (!data.success || !data.data?.course) return null;
//     return { course: data.data.course, metadata: data.data.metadata || null };
//   } catch (err) {
//     console.error("Error fetching course:", err);
//     return null;
//   }
// }

// // async function getLmsCourse(slug: string): Promise<ICourse | null> {
// //   try {
// //     const res = await fetch(
// //       `${LMS_COURSE_URL}/courses/${slug}/preview/public`,
// //       {
// //         headers: { accept: "application/json" },
// //         cache: "no-store",
// //       },
// //     );
// //     if (!res.ok) {
// //       console.error("Failed to fetch LMS course:", res.status, res.statusText);
// //       return null;
// //     }
// //     const data = await res.json();
// //     if (!data.success || !data.data?.course) return null;
// //     return data.data.course;
// //   } catch (err) {
// //     console.error("Error fetching course:", err);
// //     return null;
// //   }
// // }
// async function getLmsCourse(slug: string): Promise<ICourse | null> {
//   try {
//     const res = await fetch(
//       `${LMS_COURSE_URL}/courses/${slug}/preview/public`,
//       {
//         headers: { accept: "application/json" },
//         cache: "no-store",
//       },
//     );
//     if (!res.ok) {
//       console.error("Failed to fetch LMS course:", res.status, res.statusText);
//       return null;
//     }
//     const data = await res.json();

//     // data.data is the course directly, not data.data.course
//     if (!data.success || !data.data) return null;
//     return data.data as ICourse; // ← fix here
//   } catch (err) {
//     console.error("Error fetching course:", err);
//     return null;
//   }
// }

// async function getCourseData(slug: string) {
//   const backend = await getCourse(slug);
//   if (backend) return backend;

//   const lms = await getLmsCourse(slug);
//   if (lms) return { course: lms, metadata: null };

//   return null;
// }

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }): Promise<Metadata> {
//   const { slug } = await params;
//   const result = await getCourse(slug);
//   if (!result) return { title: "Course not found — bSkilling" };
//   const { course, metadata } = result;
//   const title = metadata?.metaTitle ?? course.title ?? "Course Details";
//   const description =
//     metadata?.metaDescription ??
//     (course.description && course.description.length > 160
//       ? course.description.substring(0, 157) + "..."
//       : course.description) ??
//     "Explore our comprehensive online course";
//   const ogImage =
//     metadata?.ogImage?.viewUrl ??
//     course.previewImage?.viewUrl ??
//     course.banner?.viewUrl ??
//     "";
//   const canonicalUrl = `https://www.bskilling.com/course/${
//     course.slug || course._id
//   }`;
//   return {
//     title: `${title} — bSkilling`,
//     description,
//     alternates: { canonical: canonicalUrl },
//     robots: {
//       index: metadata?.robotsIndex !== false,
//       follow: metadata?.robotsFollow !== false,
//     },
//     openGraph: {
//       type: "website",
//       title: metadata?.ogTitle || title,
//       description: metadata?.ogDescription || description,
//       url: canonicalUrl,
//       images: ogImage ? [{ url: ogImage }] : [],
//     },
//     twitter: {
//       card:
//         (metadata?.twitterCard as
//           | "summary"
//           | "summary_large_image"
//           | "app"
//           | "player") ?? "summary_large_image",
//       title: metadata?.twitterTitle || title,
//       description: metadata?.twitterDescription || description,
//       images: ogImage ? [ogImage] : [],
//     },
//   };
// }

// function formatDate(dateStr: string) {
//   return new Date(dateStr).toLocaleDateString("en-IN", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });
// }

// function formatPrice(amount: number, currency: string) {
//   if (amount === 0) return "Free";
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: currency || "INR",
//     maximumFractionDigits: 0,
//   }).format(amount);
// }

// export default async function CoursePage({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const { slug } = await params;
//   const result = await getCourseData(slug);
//   if (!result) notFound();
//   const { course } = result;

//   const thumbnail =
//     course.banner?.viewUrl || course.previewImage?.viewUrl || null;
//   const logo = course.logoUrl?.viewUrl || null;

//   // Only show sections if they have content
//   const hasChapters = (course.curriculum?.chapters?.length ?? 0) > 0;
//   const hasFAQs = (course.faqs?.length ?? 0) > 0;
//   const hasOutcomes = (course.outcomes?.length ?? 0) > 0;
//   const hasSkills = (course.skills?.length ?? 0) > 0;
//   const hasHighlights = (course.highlights?.length ?? 0) > 0;
//   const hasWhyJoin = (course.whyJoin?.length ?? 0) > 0;
//   const hasKeyFeatures = (course.overview?.keyFeatures?.length ?? 0) > 0;
//   const hasPrerequisites = (course.curriculum?.prerequisites?.length ?? 0) > 0;
//   const hasEligibility = (course.curriculum?.eligibility?.length ?? 0) > 0;
//   const hasTools = (course.tools?.length ?? 0) > 0;
//   const hasCertification = !!course.certification?.title;

//   const hasPartialPayment = course.partialPayment?.isAllowed ?? false;
//   const installments = course.partialPayment?.installments ?? [];

//   const jsonLd = {
//     "@context": "https://schema.org",
//     "@type": "Course",
//     name: course.title,
//     description: course.description,
//     provider: { "@type": "Organization", name: "bSkilling" },
//     ...(course.durationHours
//       ? { timeRequired: `PT${course.durationHours}H` }
//       : {}),
//   };

//   return (
//     <>
//       <Script
//         id="course-jsonld"
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//       />
//       <CourseTour />

//       <main className="min-h-screen bg-[#f5f5f0] pt-20">
//         {/* ── HERO ─────────────────────────────────────────────────────────── */}
//         <div className="bg-[#0f1117] text-white">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
//             <div className="lg:grid lg:grid-cols-3 lg:gap-12">
//               {/* Left */}
//               <div className="lg:col-span-2 flex flex-col justify-center">
//                 <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-5">
//                   <Link
//                     href="/courses"
//                     className="hover:text-white transition-colors"
//                   >
//                     Courses
//                   </Link>
//                   <span>/</span>
//                   <span className="text-gray-300 truncate max-w-xs">
//                     {course.title}
//                   </span>
//                 </nav>

//                 {/* Logo + Title */}
//                 <div className="flex items-start gap-4 mb-5">
//                   {logo && (
//                     <img
//                       src={logo}
//                       alt=""
//                       className="w-14 h-14 rounded-xl object-cover border border-white/10 shrink-0 mt-1"
//                     />
//                   )}
//                   <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight">
//                     {course.title}
//                   </h1>
//                 </div>

//                 {/* Description */}
//                 {course.description && (
//                   <p className="text-gray-300 text-base leading-relaxed mb-6 max-w-2xl">
//                     {course.description}
//                   </p>
//                 )}

//                 {/* Meta pills */}
//                 <div className="flex flex-wrap gap-2 mb-6">
//                   {course.durationHours && (
//                     <Pill
//                       icon={<ClockIcon />}
//                       label={`${course.durationHours} hrs`}
//                     />
//                   )}
//                   {course.startTime && (
//                     <Pill
//                       icon={<CalendarIcon />}
//                       label={`Starts ${formatDate(course.startTime)}`}
//                     />
//                   )}
//                   {course.endTime && (
//                     <Pill
//                       icon={<FlagIcon />}
//                       label={`Ends ${formatDate(course.endTime)}`}
//                     />
//                   )}
//                   {course.appliedCount > 0 && (
//                     <Pill
//                       icon={<UsersIcon />}
//                       label={`${course.appliedCount} enrolled`}
//                     />
//                   )}
//                   {hasPartialPayment && (
//                     <Pill icon={<CardIcon />} label="EMI available" accent />
//                   )}
//                   {hasCertification && (
//                     <Pill
//                       icon={<BadgeIcon />}
//                       label="Certificate included"
//                       accent
//                     />
//                   )}
//                 </div>

//                 {/* Highlights — shown prominently in hero */}
//                 {hasHighlights && (
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                     {course.highlights.map((h, i) => (
//                       <div
//                         key={i}
//                         className="flex items-start gap-2 text-sm text-gray-200"
//                       >
//                         <span className="text-emerald-400 mt-0.5 shrink-0">
//                           ✓
//                         </span>
//                         <span>{h.trim()}</span>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Right: Sticky enroll card (desktop) */}
//               <div className="hidden lg:block mt-0">
//                 <div className="sticky top-24">
//                   <EnrollCard
//                     course={course}
//                     hasPartialPayment={hasPartialPayment}
//                     installments={installments}
//                     thumbnail={thumbnail}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ── BODY ─────────────────────────────────────────────────────────── */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//           <div className="lg:grid lg:grid-cols-3 lg:gap-10">
//             {/* Main content */}
//             <div className="lg:col-span-2 space-y-6">
//               {/* Banner image — mobile only */}
//               {thumbnail && (
//                 <div className="lg:hidden rounded-2xl overflow-hidden border border-gray-200 aspect-video">
//                   <img
//                     src={thumbnail}
//                     alt={course.title}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               )}

//               {/* Outcomes */}
//               {hasOutcomes && (
//                 <Section title="What you'll learn">
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                     {course.outcomes.map((item, i) => (
//                       <div key={i} className="flex items-start gap-2.5">
//                         <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs shrink-0 mt-0.5">
//                           ✓
//                         </span>
//                         <span className="text-sm text-gray-700 leading-snug">
//                           {item.trim()}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </Section>
//               )}

//               {/* Key Features */}
//               {hasKeyFeatures && (
//                 <Section title="Key Features">
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                     {course.overview.keyFeatures!.map((f, i) => (
//                       <div key={i} className="flex items-start gap-2.5">
//                         <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs shrink-0 mt-0.5">
//                           ★
//                         </span>
//                         <span className="text-sm text-gray-700 leading-snug">
//                           {f.trim()}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </Section>
//               )}

//               {/* Skills */}
//               {hasSkills && (
//                 <Section title="Skills you'll gain">
//                   <div className="flex flex-wrap gap-2">
//                     {course.skills.map((skill, i) => (
//                       <span
//                         key={i}
//                         className="px-3 py-1.5 bg-[#0f1117] text-white text-xs font-medium rounded-lg border border-gray-700"
//                       >
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                 </Section>
//               )}

//               {/* Curriculum */}
//               {hasChapters && (
//                 <Section title="Course curriculum">
//                   <CurriculumAccordion chapters={course.curriculum.chapters} />
//                 </Section>
//               )}

//               {/* Eligibility */}
//               {hasEligibility && (
//                 <Section title="Who is this for?">
//                   <ul className="space-y-2">
//                     {course.curriculum.eligibility.map((e, i) => (
//                       <li
//                         key={i}
//                         className="flex items-start gap-2.5 text-sm text-gray-700"
//                       >
//                         <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
//                         {e.trim()}
//                       </li>
//                     ))}
//                   </ul>
//                 </Section>
//               )}

//               {/* Prerequisites */}
//               {hasPrerequisites && (
//                 <Section title="Prerequisites">
//                   <ul className="space-y-2">
//                     {course.curriculum.prerequisites.map((p, i) => (
//                       <li
//                         key={i}
//                         className="flex items-start gap-2.5 text-sm text-gray-700"
//                       >
//                         <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 shrink-0" />
//                         {p.trim()}
//                       </li>
//                     ))}
//                   </ul>
//                 </Section>
//               )}

//               {/* Tools */}
//               {hasTools && (
//                 <Section title="Tools covered">
//                   <div className="flex flex-wrap gap-4">
//                     {(course.tools as any[]).map((tool: any, i: number) => (
//                       <div key={i} className="flex flex-col items-center gap-1">
//                         {tool?.logo?.viewUrl && (
//                           <img
//                             src={tool.logo.viewUrl}
//                             alt={tool.title}
//                             className="w-12 h-12 object-contain"
//                           />
//                         )}
//                         {tool?.title && (
//                           <span className="text-xs text-gray-500">
//                             {tool.title}
//                           </span>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </Section>
//               )}

//               {/* Why Join */}
//               {hasWhyJoin && (
//                 <Section title="Why join this program?">
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                     {course.whyJoin.map((reason, i) => (
//                       <div
//                         key={i}
//                         className="flex items-start gap-3 p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100"
//                       >
//                         <span className="text-blue-500 text-lg shrink-0">
//                           →
//                         </span>
//                         <span className="text-sm text-gray-700 leading-snug">
//                           {reason.trim()}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </Section>
//               )}

//               {/* Certification */}
//               {hasCertification && (
//                 <Section title="Certification">
//                   <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl">
//                     <span className="text-3xl shrink-0">🏅</span>
//                     <div>
//                       <p className="font-semibold text-gray-900">
//                         {course.certification.title}
//                       </p>
//                       <p className="text-sm text-gray-500 mt-0.5">
//                         Issued upon successful completion
//                       </p>
//                     </div>
//                   </div>
//                 </Section>
//               )}

//               {/* FAQs */}
//               {hasFAQs && (
//                 <Section title="Frequently asked questions">
//                   <FAQAccordion faqs={course.faqs} />
//                 </Section>
//               )}
//             </div>

//             {/* Sidebar */}
//             <div className="mt-8 lg:mt-0">
//               {/* Mobile enroll card */}
//               <div className="lg:hidden mb-6">
//                 <EnrollCard
//                   course={course}
//                   hasPartialPayment={hasPartialPayment}
//                   installments={installments}
//                   thumbnail={null}
//                 />
//               </div>

//               {/* Desktop sidebar extras */}
//               <div className="hidden lg:block sticky top-24 space-y-4">
//                 {/* Quick info card */}
//                 <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3 shadow-sm">
//                   <h3 className="font-semibold text-gray-800 text-sm">
//                     Course details
//                   </h3>
//                   <div className="space-y-2.5">
//                     {course.durationHours && (
//                       <InfoRow
//                         icon={<ClockIcon />}
//                         label={`${course.durationHours} hours of content`}
//                       />
//                     )}
//                     {hasChapters && (
//                       <InfoRow
//                         icon={<BookIcon />}
//                         label={`${course.curriculum.chapters.length} modules`}
//                       />
//                     )}
//                     {course.startTime && (
//                       <InfoRow
//                         icon={<CalendarIcon />}
//                         label={`Starts ${formatDate(course.startTime)}`}
//                       />
//                     )}
//                     {course.endTime && (
//                       <InfoRow
//                         icon={<FlagIcon />}
//                         label={`Ends ${formatDate(course.endTime)}`}
//                       />
//                     )}
//                     {hasCertification && (
//                       <InfoRow
//                         icon={<BadgeIcon />}
//                         label="Certificate on completion"
//                       />
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }

// // ── Enroll card (shared desktop + mobile) ────────────────────────────────────

// function EnrollCard({
//   course,
//   hasPartialPayment,
//   installments,
//   thumbnail,
// }: {
//   course: ICourse;
//   hasPartialPayment: boolean;
//   installments: {
//     installmentNumber: number;
//     amount: number;
//     dueDate: string;
//     label?: string;
//   }[];
//   thumbnail: string | null;
// }) {
//   const isFree = !course.isPaid || course.price.amount === 0;

//   return (
//     <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-md">
//       {thumbnail && (
//         <div className="aspect-video overflow-hidden">
//           <img
//             src={thumbnail}
//             alt={course.title}
//             className="w-full h-full object-cover"
//           />
//         </div>
//       )}
//       <div className="p-5 space-y-4">
//         {/* Price */}
//         <div className="flex items-baseline gap-2 flex-wrap">
//           <span className="text-3xl font-bold text-gray-900">
//             {isFree
//               ? "Free"
//               : formatPrice(course.price.amount, course.price.currency)}
//           </span>
//           {!isFree && course.gst && !course.gst.isInclusive && (
//             <span className="text-xs text-gray-400">
//               + {course.gst.percentage}% GST
//             </span>
//           )}
//           {!isFree && hasPartialPayment && installments.length > 0 && (
//             <span className="text-xs font-semibold bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full">
//               EMI from ₹
//               {Math.min(...installments.map((i) => i.amount)).toLocaleString(
//                 "en-IN",
//               )}
//             </span>
//           )}
//         </div>

//         {/* EnrollButton — untouched */}
//         <EnrollButton
//           courseId={course._id}
//           courseName={course.title}
//           amount={course.price.amount}
//           currency={course.price.currency}
//           isPaid={course.isPaid}
//           hasPartialPayment={hasPartialPayment}
//           installments={installments}
//         />

//         {/* Quick stats under button */}
//         <div className="space-y-2 pt-1 border-t border-gray-100">
//           {course.durationHours && (
//             <InfoRow
//               icon={<ClockIcon />}
//               label={`${course.durationHours} hours of content`}
//             />
//           )}
//           {(course.curriculum?.chapters?.length ?? 0) > 0 && (
//             <InfoRow
//               icon={<BookIcon />}
//               label={`${course.curriculum.chapters.length} modules`}
//             />
//           )}
//           {course.startTime && (
//             <InfoRow
//               icon={<CalendarIcon />}
//               label={`Starts ${formatDate(course.startTime)}`}
//             />
//           )}
//           {course.endTime && (
//             <InfoRow
//               icon={<FlagIcon />}
//               label={`Ends ${formatDate(course.endTime)}`}
//             />
//           )}
//           {course.certification?.title && (
//             <InfoRow icon={<BadgeIcon />} label="Certificate on completion" />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── Sub-components ────────────────────────────────────────────────────────────

// function Section({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="bg-white rounded-2xl border border-gray-200 p-6">
//       <h2 className="text-lg font-bold text-gray-900 mb-5">{title}</h2>
//       {children}
//     </div>
//   );
// }

// function Pill({
//   icon,
//   label,
//   accent = false,
// }: {
//   icon: React.ReactNode;
//   label: string;
//   accent?: boolean;
// }) {
//   return (
//     <span
//       className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border ${
//         accent
//           ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
//           : "bg-white/10 text-gray-300 border-white/10"
//       }`}
//     >
//       {icon}
//       {label}
//     </span>
//   );
// }

// function InfoRow({ icon, label }: { icon: React.ReactNode; label: string }) {
//   return (
//     <div className="flex items-center gap-2.5 text-sm text-gray-600">
//       <span className="text-gray-400 w-4 shrink-0">{icon}</span>
//       <span>{label}</span>
//     </div>
//   );
// }

// // ── Icons ─────────────────────────────────────────────────────────────────────

// function ClockIcon() {
//   return (
//     <svg
//       className="w-3.5 h-3.5"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//       />
//     </svg>
//   );
// }
// function CalendarIcon() {
//   return (
//     <svg
//       className="w-3.5 h-3.5"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//       />
//     </svg>
//   );
// }
// function UsersIcon() {
//   return (
//     <svg
//       className="w-3.5 h-3.5"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
//       />
//     </svg>
//   );
// }
// function FlagIcon() {
//   return (
//     <svg
//       className="w-3.5 h-3.5"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6H13l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
//       />
//     </svg>
//   );
// }
// function BadgeIcon() {
//   return (
//     <svg
//       className="w-3.5 h-3.5"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
//       />
//     </svg>
//   );
// }
// function BookIcon() {
//   return (
//     <svg
//       className="w-4 h-4"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
//       />
//     </svg>
//   );
// }
// function CardIcon() {
//   return (
//     <svg
//       className="w-3.5 h-3.5"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
//       />
//     </svg>
//   );
// }

/* eslint-disable @next/next/no-img-element */
// app/courses/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { ICourse, IMetadata } from "@/types/course.types";
import EnrollButton from "@/components/courses/EnrollButton";
import CurriculumAccordion from "@/components/courses/CurriculumAccordion";
import FAQAccordion from "@/components/courses/FAQAccordion";
import CourseTour from "@/components/courses/CourseTour";
import Link from "next/link";
import env from "@/config/env";
import LmsCurriculumAccordion from "@/components/courses/LmsCurriculumAccordion";
import LmsEnrollCard from "@/components/courses/LmsEnrollCard";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_BSKILLING_URL ||
  "https://backend-bskilling-173405861722.asia-south1.run.app";
const LMS_COURSE_URL = env.NEXT_PUBLIC_LMS_COURSE_URL;

// ── Fetchers ──────────────────────────────────────────────────────────────────

async function getBskillingCourse(
  slug: string,
): Promise<{ course: ICourse; metadata: IMetadata | null } | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/courses/slug/${slug}`, {
      headers: { accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.success || !data.data?.course) return null;
    return { course: data.data.course, metadata: data.data.metadata || null };
  } catch {
    return null;
  }
}

async function getLmsCourse(slug: string) {
  try {
    const res = await fetch(
      `${LMS_COURSE_URL}/courses/${slug}/preview/public`,
      { headers: { accept: "application/json" }, cache: "no-store" },
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.success || !data.data) return null;
    return data.data;
  } catch {
    return null;
  }
}

type CourseResult =
  | { source: "bskilling"; course: ICourse; metadata: IMetadata | null }
  | { source: "lms"; course: any };

async function getCourseData(slug: string): Promise<CourseResult | null> {
  const bskilling = await getBskillingCourse(slug);
  if (bskilling)
    return {
      source: "bskilling",
      course: bskilling.course,
      metadata: bskilling.metadata,
    };

  const lms = await getLmsCourse(slug);
  if (lms) return { source: "lms", course: lms };

  return null;
}

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = await getCourseData(slug);
  if (!result) return { title: "Course not found — bSkilling" };

  if (result.source === "bskilling") {
    const { course, metadata } = result;
    const title = metadata?.metaTitle ?? course.title ?? "Course Details";
    const description =
      metadata?.metaDescription ??
      (course.description && course.description.length > 160
        ? course.description.substring(0, 157) + "..."
        : course.description) ??
      "Explore our comprehensive online course";
    const ogImage =
      metadata?.ogImage?.viewUrl ??
      course.previewImage?.viewUrl ??
      course.banner?.viewUrl ??
      "";
    const canonicalUrl = `https://www.bskilling.com/courses/${course.slug || course._id}`;
    return {
      title: `${title} — bSkilling`,
      description,
      alternates: { canonical: canonicalUrl },
      robots: {
        index: metadata?.robotsIndex !== false,
        follow: metadata?.robotsFollow !== false,
      },
      openGraph: {
        type: "website",
        title: metadata?.ogTitle || title,
        description: metadata?.ogDescription || description,
        url: canonicalUrl,
        images: ogImage ? [{ url: ogImage }] : [],
      },
    };
  }

  // LMS course metadata
  const { course } = result;
  const description = course.description
    ? course.description.length > 160
      ? course.description.substring(0, 157) + "..."
      : course.description
    : "Explore our comprehensive online course";
  return {
    title: `${course.title} — bSkilling`,
    description,
    openGraph: {
      type: "website",
      title: course.title,
      description,
      images: course.thumbnailUrl ? [{ url: course.thumbnailUrl }] : [],
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getCourseData(slug);
  if (!result) notFound();

  if (result.source === "lms") {
    return <LmsCourseDetail course={result.course} />;
  }

  // ── bSkilling course (original rendering unchanged) ───────────────────────
  const { course } = result;
  const thumbnail =
    course.banner?.viewUrl || course.previewImage?.viewUrl || null;
  const logo = course.logoUrl?.viewUrl || null;

  const hasChapters = (course.curriculum?.chapters?.length ?? 0) > 0;
  const hasFAQs = (course.faqs?.length ?? 0) > 0;
  const hasOutcomes = (course.outcomes?.length ?? 0) > 0;
  const hasSkills = (course.skills?.length ?? 0) > 0;
  const hasHighlights = (course.highlights?.length ?? 0) > 0;
  const hasWhyJoin = (course.whyJoin?.length ?? 0) > 0;
  const hasKeyFeatures = (course.overview?.keyFeatures?.length ?? 0) > 0;
  const hasPrerequisites = (course.curriculum?.prerequisites?.length ?? 0) > 0;
  const hasEligibility = (course.curriculum?.eligibility?.length ?? 0) > 0;
  const hasTools = (course.tools?.length ?? 0) > 0;
  const hasCertification = !!course.certification?.title;
  const hasPartialPayment = course.partialPayment?.isAllowed ?? false;
  const installments = course.partialPayment?.installments ?? [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    provider: { "@type": "Organization", name: "bSkilling" },
    ...(course.durationHours
      ? { timeRequired: `PT${course.durationHours}H` }
      : {}),
  };

  return (
    <>
      <Script
        id="course-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CourseTour />
      <main className="min-h-screen bg-[#f5f5f0] pt-20">
        {/* ── HERO ── */}
        <div className="bg-[#0f1117] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <div className="lg:grid lg:grid-cols-3 lg:gap-12">
              <div className="lg:col-span-2 flex flex-col justify-center">
                <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-5">
                  <Link
                    href="/courses"
                    className="hover:text-white transition-colors"
                  >
                    Courses
                  </Link>
                  <span>/</span>
                  <span className="text-gray-300 truncate max-w-xs">
                    {course.title}
                  </span>
                </nav>
                <div className="flex items-start gap-4 mb-5">
                  {logo && (
                    <img
                      src={logo}
                      alt=""
                      className="w-14 h-14 rounded-xl object-cover border border-white/10 shrink-0 mt-1"
                    />
                  )}
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight">
                    {course.title}
                  </h1>
                </div>
                {course.description && (
                  <p className="text-gray-300 text-base leading-relaxed mb-6 max-w-2xl">
                    {course.description}
                  </p>
                )}
                <div className="flex flex-wrap gap-2 mb-6">
                  {course.durationHours && (
                    <Pill
                      icon={<ClockIcon />}
                      label={`${course.durationHours} hrs`}
                    />
                  )}
                  {course.startTime && (
                    <Pill
                      icon={<CalendarIcon />}
                      label={`Starts ${formatDate(course.startTime)}`}
                    />
                  )}
                  {course.endTime && (
                    <Pill
                      icon={<FlagIcon />}
                      label={`Ends ${formatDate(course.endTime)}`}
                    />
                  )}
                  {course.appliedCount > 0 && (
                    <Pill
                      icon={<UsersIcon />}
                      label={`${course.appliedCount} enrolled`}
                    />
                  )}
                  {hasPartialPayment && (
                    <Pill icon={<CardIcon />} label="EMI available" accent />
                  )}
                  {hasCertification && (
                    <Pill
                      icon={<BadgeIcon />}
                      label="Certificate included"
                      accent
                    />
                  )}
                </div>
                {hasHighlights && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {course.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-200"
                      >
                        <span className="text-emerald-400 mt-0.5 shrink-0">
                          ✓
                        </span>
                        <span>{h.trim()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="hidden lg:block mt-0">
                <div className="sticky top-24">
                  <EnrollCard
                    course={course}
                    hasPartialPayment={hasPartialPayment}
                    installments={installments}
                    thumbnail={thumbnail}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="lg:grid lg:grid-cols-3 lg:gap-10">
            <div className="lg:col-span-2 space-y-6">
              {thumbnail && (
                <div className="lg:hidden rounded-2xl overflow-hidden border border-gray-200 aspect-video">
                  <img
                    src={thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {hasOutcomes && (
                <Section title="What you'll learn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {course.outcomes.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span className="text-sm text-gray-700 leading-snug">
                          {item.trim()}
                        </span>
                      </div>
                    ))}
                  </div>
                </Section>
              )}
              {hasKeyFeatures && (
                <Section title="Key Features">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {course.overview.keyFeatures!.map((f, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs shrink-0 mt-0.5">
                          ★
                        </span>
                        <span className="text-sm text-gray-700 leading-snug">
                          {f.trim()}
                        </span>
                      </div>
                    ))}
                  </div>
                </Section>
              )}
              {hasSkills && (
                <Section title="Skills you'll gain">
                  <div className="flex flex-wrap gap-2">
                    {course.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-[#0f1117] text-white text-xs font-medium rounded-lg border border-gray-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </Section>
              )}
              {hasChapters && (
                <Section title="Course curriculum">
                  <CurriculumAccordion chapters={course.curriculum.chapters} />
                </Section>
              )}
              {hasEligibility && (
                <Section title="Who is this for?">
                  <ul className="space-y-2">
                    {course.curriculum.eligibility.map((e, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm text-gray-700"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                        {e.trim()}
                      </li>
                    ))}
                  </ul>
                </Section>
              )}
              {hasPrerequisites && (
                <Section title="Prerequisites">
                  <ul className="space-y-2">
                    {course.curriculum.prerequisites.map((p, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm text-gray-700"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 shrink-0" />
                        {p.trim()}
                      </li>
                    ))}
                  </ul>
                </Section>
              )}
              {hasTools && (
                <Section title="Tools covered">
                  <div className="flex flex-wrap gap-4">
                    {(course.tools as any[]).map((tool: any, i: number) => (
                      <div key={i} className="flex flex-col items-center gap-1">
                        {tool?.logo?.viewUrl && (
                          <img
                            src={tool.logo.viewUrl}
                            alt={tool.title}
                            className="w-12 h-12 object-contain"
                          />
                        )}
                        {tool?.title && (
                          <span className="text-xs text-gray-500">
                            {tool.title}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </Section>
              )}
              {hasWhyJoin && (
                <Section title="Why join this program?">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {course.whyJoin.map((reason, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100"
                      >
                        <span className="text-blue-500 text-lg shrink-0">
                          →
                        </span>
                        <span className="text-sm text-gray-700 leading-snug">
                          {reason.trim()}
                        </span>
                      </div>
                    ))}
                  </div>
                </Section>
              )}
              {hasCertification && (
                <Section title="Certification">
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl">
                    <span className="text-3xl shrink-0">🏅</span>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {course.certification.title}
                      </p>
                      <p className="text-sm text-gray-500 mt-0.5">
                        Issued upon successful completion
                      </p>
                    </div>
                  </div>
                </Section>
              )}
              {hasFAQs && (
                <Section title="Frequently asked questions">
                  <FAQAccordion faqs={course.faqs} />
                </Section>
              )}
            </div>
            <div className="mt-8 lg:mt-0">
              <div className="lg:hidden mb-6">
                <EnrollCard
                  course={course}
                  hasPartialPayment={hasPartialPayment}
                  installments={installments}
                  thumbnail={null}
                />
              </div>
              <div className="hidden lg:block sticky top-24 space-y-4">
                <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3 shadow-sm">
                  <h3 className="font-semibold text-gray-800 text-sm">
                    Course details
                  </h3>
                  <div className="space-y-2.5">
                    {course.durationHours && (
                      <InfoRow
                        icon={<ClockIcon />}
                        label={`${course.durationHours} hours of content`}
                      />
                    )}
                    {hasChapters && (
                      <InfoRow
                        icon={<BookIcon />}
                        label={`${course.curriculum.chapters.length} modules`}
                      />
                    )}
                    {course.startTime && (
                      <InfoRow
                        icon={<CalendarIcon />}
                        label={`Starts ${formatDate(course.startTime)}`}
                      />
                    )}
                    {course.endTime && (
                      <InfoRow
                        icon={<FlagIcon />}
                        label={`Ends ${formatDate(course.endTime)}`}
                      />
                    )}
                    {hasCertification && (
                      <InfoRow
                        icon={<BadgeIcon />}
                        label="Certificate on completion"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

// ── LMS Course Detail Component ───────────────────────────────────────────────

function LmsCourseDetail({ course }: { course: any }) {
  const hasPricingPlans = course.pricingPlans.length > 0;
  const hasModules = course.modules.length > 0;

  const lowestPlan = hasPricingPlans
    ? course.pricingPlans.reduce((a: any, b: any) =>
        a.price <= b.price ? a : b,
      )
    : null;
  const highestPlan = hasPricingPlans
    ? course.pricingPlans.reduce((a: any, b: any) =>
        a.price >= b.price ? a : b,
      )
    : null;
  const isFree = !lowestPlan || lowestPlan.price === 0;

  const levelLabel: Record<string, string> = {
    BEGINNER: "Beginner",
    INTERMEDIATE: "Intermediate",
    ADVANCED: "Advanced",
  };
  const typeLabel: Record<string, string> = {
    SELF_PACED: "Self-paced",
    LIVE: "Live",
    HYBRID: "Hybrid",
    OFFLINE: "Offline",
    MATERIAL_ONLY: "Material only",
  };

  const materialTypeIcon: Record<string, string> = {
    VIDEO_LESSON: "▶",
    VIDEO_YOUTUBE: "▶",
    VIDEO_VIMEO: "▶",
    VIDEO_STREAM: "▶",
    PDF_DOCUMENT: "📄",
    PRESENTATION_SLIDES: "📊",
    QUIZ_INTERACTIVE: "❓",
    ARTICLE_TEXT: "📝",
    MARKDOWN_CONTENT: "📝",
    CODE_TUTORIAL: "💻",
    EXTERNAL_LINK: "🔗",
    DOWNLOADABLE_RESOURCE: "⬇",
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    provider: { "@type": "Organization", name: "bSkilling" },
    numberOfCredits: course.totalLessons,
  };

  return (
    <>
      <Script
        id="lms-course-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-[#f5f5f0] pt-20">
        {/* ── HERO ── */}
        <div className="bg-[#0f1117] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <div className="lg:grid lg:grid-cols-3 lg:gap-12">
              {/* Left */}
              <div className="lg:col-span-2 flex flex-col justify-center">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-5">
                  <Link
                    href="/courses"
                    className="hover:text-white transition-colors"
                  >
                    Courses
                  </Link>
                  <span>/</span>
                  {course.category && (
                    <>
                      <span className="text-gray-400">{course.category}</span>
                      <span>/</span>
                    </>
                  )}
                  <span className="text-gray-300 truncate max-w-xs">
                    {course.title}
                  </span>
                </nav>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight mb-4">
                  {course.title}
                </h1>

                {/* Description */}
                {course.description && (
                  <p className="text-gray-300 text-base leading-relaxed mb-6 max-w-2xl">
                    {course.description}
                  </p>
                )}

                {/* Meta pills */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {course.duration && (
                    <Pill icon={<ClockIcon />} label={course.duration} />
                  )}
                  {course.totalLessons > 0 && (
                    <Pill
                      icon={<BookIcon />}
                      label={`${course.totalLessons} lessons`}
                    />
                  )}
                  {course.modulesCount > 0 && (
                    <Pill
                      icon={<BookIcon />}
                      label={`${course.modulesCount} modules`}
                    />
                  )}
                  <Pill
                    icon={<BookIcon />}
                    label={levelLabel[course.level] ?? course.level}
                  />
                  <Pill
                    icon={<ClockIcon />}
                    label={typeLabel[course.type] ?? course.type}
                  />
                  {course.language && (
                    <Pill icon={<GlobeIcon />} label={course.language} />
                  )}
                  {course.enrollmentsCount > 0 && (
                    <Pill
                      icon={<UsersIcon />}
                      label={`${course.enrollmentsCount} enrolled`}
                    />
                  )}
                  {hasPricingPlans && (
                    <Pill icon={<CardIcon />} label="EMI available" accent />
                  )}
                  {course.certificateEnabled && (
                    <Pill
                      icon={<BadgeIcon />}
                      label="Certificate included"
                      accent
                    />
                  )}
                </div>

                {/* Tags */}
                {course.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {course.tags.map((tag: any, i: number) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 text-xs rounded-full bg-white/10 text-gray-300 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: enroll card desktop */}
              <div className="hidden lg:block">
                <div className="sticky top-24">
                  <LmsEnrollCard
                    course={course}
                    isFree={isFree}
                    lowestPlan={lowestPlan}
                    highestPlan={highestPlan}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="lg:grid lg:grid-cols-3 lg:gap-10">
            {/* Main */}
            <div className="lg:col-span-2 space-y-6">
              {/* Thumbnail — mobile only */}
              {course.thumbnailUrl && (
                <div className="lg:hidden rounded-2xl overflow-hidden border border-gray-200 aspect-video">
                  <img
                    src={course.thumbnailUrl}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Mobile enroll card */}
              <div className="lg:hidden">
                <LmsEnrollCard
                  course={course}
                  isFree={isFree}
                  lowestPlan={lowestPlan}
                  highestPlan={highestPlan}
                />
              </div>

              {/* Curriculum — expandable accordion */}
              {hasModules && (
                <Section title="Course curriculum">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span>{course.modulesCount} modules</span>
                    <span>·</span>
                    <span>{course.totalLessons} lessons</span>
                    {course.duration && (
                      <>
                        <span>·</span>
                        <span>{course.duration} total length</span>
                      </>
                    )}
                  </div>
                  <LmsCurriculumAccordion
                    modules={course.modules}
                    materialTypeIcon={materialTypeIcon}
                  />
                </Section>
              )}

              {/* Pricing plans */}
              {hasPricingPlans && (
                <Section title="Choose a plan">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {course.pricingPlans.map((plan: any) => {
                      const isHighest = plan.id === highestPlan?.id;
                      const discount =
                        plan.originalPrice && plan.originalPrice > plan.price
                          ? Math.round(
                              (1 - plan.price / plan.originalPrice) * 100,
                            )
                          : null;
                      return (
                        <div
                          key={plan.id}
                          className={`relative rounded-2xl border-2 p-5 transition-all ${
                            isHighest && course.pricingPlans.length > 1
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 bg-white"
                          }`}
                        >
                          {isHighest && course.pricingPlans.length > 1 && (
                            <span className="absolute -top-3 left-4 px-2 py-0.5 bg-blue-500 text-white text-xs font-semibold rounded-full">
                              Most popular
                            </span>
                          )}
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-2xl font-bold text-gray-900">
                              {plan.price === 0
                                ? "Free"
                                : new Intl.NumberFormat("en-IN", {
                                    style: "currency",
                                    currency: plan.currency || "INR",
                                    maximumFractionDigits: 0,
                                  }).format(plan.price)}
                            </span>
                            {plan.originalPrice &&
                              plan.originalPrice > plan.price && (
                                <span className="text-sm text-gray-400 line-through">
                                  {new Intl.NumberFormat("en-IN", {
                                    style: "currency",
                                    currency: plan.currency || "INR",
                                    maximumFractionDigits: 0,
                                  }).format(plan.originalPrice)}
                                </span>
                              )}
                            {discount && (
                              <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                {discount}% off
                              </span>
                            )}
                          </div>
                          <p className="font-semibold text-gray-800 text-sm mb-1">
                            {plan.name}
                          </p>
                          {plan.description && (
                            <p className="text-xs text-gray-500 mb-3">
                              {plan.description}
                            </p>
                          )}
                          {plan.validityInDays ? (
                            <p className="text-xs text-gray-400 mb-3">
                              ⏱ Valid for {plan.validityInDays} days
                            </p>
                          ) : (
                            <p className="text-xs text-gray-400 mb-3">
                              ♾ Lifetime access
                            </p>
                          )}
                          {plan.features.length > 0 && (
                            <ul className="space-y-1.5 mt-2">
                              {plan.features.map((f: any, i: any) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2 text-xs text-gray-700"
                                >
                                  <span className="text-emerald-500 mt-0.5 shrink-0">
                                    ✓
                                  </span>
                                  {f}
                                </li>
                              ))}
                            </ul>
                          )}
                          <a
                            href={`${process.env.NEXT_PUBLIC_LMS_URL ?? "#"}/courses/${course.slug}?plan=${plan.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`mt-4 block w-full py-2.5 px-4 text-sm font-semibold text-center rounded-xl transition-colors ${
                              isHighest && course.pricingPlans.length > 1
                                ? "bg-blue-600 hover:bg-blue-700 text-white"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                            }`}
                          >
                            {plan.price === 0 ? "Enroll free" : "Get this plan"}
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </Section>
              )}

              {/* Certificate */}
              {course.certificateEnabled && (
                <Section title="Certification">
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl">
                    <span className="text-3xl shrink-0">🏅</span>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Certificate of completion
                      </p>
                      <p className="text-sm text-gray-500 mt-0.5">
                        Issued upon successful completion of the course
                      </p>
                    </div>
                  </div>
                </Section>
              )}
            </div>

            {/* Desktop sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-24 space-y-4">
                <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3 shadow-sm">
                  <h3 className="font-semibold text-gray-800 text-sm">
                    Course details
                  </h3>
                  <div className="space-y-2.5">
                    <InfoRow
                      icon={<BookIcon />}
                      label={levelLabel[course.level] ?? course.level}
                    />
                    <InfoRow
                      icon={<ClockIcon />}
                      label={typeLabel[course.type] ?? course.type}
                    />
                    {course.duration && (
                      <InfoRow icon={<ClockIcon />} label={course.duration} />
                    )}
                    {course.modulesCount > 0 && (
                      <InfoRow
                        icon={<BookIcon />}
                        label={`${course.modulesCount} modules`}
                      />
                    )}
                    {course.totalLessons > 0 && (
                      <InfoRow
                        icon={<BookIcon />}
                        label={`${course.totalLessons} lessons`}
                      />
                    )}
                    {course.language && (
                      <InfoRow icon={<GlobeIcon />} label={course.language} />
                    )}
                    {course.certificateEnabled && (
                      <InfoRow
                        icon={<BadgeIcon />}
                        label="Certificate on completion"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

// ── Shared helpers (bSkilling EnrollCard + sub-components unchanged) ──────────

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function EnrollCard({
  course,
  hasPartialPayment,
  installments,
  thumbnail,
}: {
  course: ICourse;
  hasPartialPayment: boolean;
  installments: {
    installmentNumber: number;
    amount: number;
    dueDate: string;
    label?: string;
  }[];
  thumbnail: string | null;
}) {
  const isFree = !course.isPaid || course.price.amount === 0;
  const formatPrice = (amount: number, currency: string) =>
    amount === 0
      ? "Free"
      : new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: currency || "INR",
          maximumFractionDigits: 0,
        }).format(amount);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-md">
      {thumbnail && (
        <div className="aspect-video overflow-hidden">
          <img
            src={thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-5 space-y-4">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-3xl font-bold text-gray-900">
            {isFree
              ? "Free"
              : formatPrice(course.price.amount, course.price.currency)}
          </span>
          {!isFree && course.gst && !course.gst.isInclusive && (
            <span className="text-xs text-gray-400">
              + {course.gst.percentage}% GST
            </span>
          )}
          {!isFree && hasPartialPayment && installments.length > 0 && (
            <span className="text-xs font-semibold bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full">
              EMI from ₹
              {Math.min(...installments.map((i) => i.amount)).toLocaleString(
                "en-IN",
              )}
            </span>
          )}
        </div>
        <EnrollButton
          courseId={course._id}
          courseName={course.title}
          amount={course.price.amount}
          currency={course.price.currency}
          isPaid={course.isPaid}
          hasPartialPayment={hasPartialPayment}
          installments={installments}
        />
        <div className="space-y-2 pt-1 border-t border-gray-100">
          {course.durationHours && (
            <InfoRow
              icon={<ClockIcon />}
              label={`${course.durationHours} hours of content`}
            />
          )}
          {(course.curriculum?.chapters?.length ?? 0) > 0 && (
            <InfoRow
              icon={<BookIcon />}
              label={`${course.curriculum.chapters.length} modules`}
            />
          )}
          {course.startTime && (
            <InfoRow
              icon={<CalendarIcon />}
              label={`Starts ${formatDate(course.startTime)}`}
            />
          )}
          {course.endTime && (
            <InfoRow
              icon={<FlagIcon />}
              label={`Ends ${formatDate(course.endTime)}`}
            />
          )}
          {course.certification?.title && (
            <InfoRow icon={<BadgeIcon />} label="Certificate on completion" />
          )}
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-5">{title}</h2>
      {children}
    </div>
  );
}

function Pill({
  icon,
  label,
  accent = false,
}: {
  icon: React.ReactNode;
  label: string;
  accent?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border ${accent ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : "bg-white/10 text-gray-300 border-white/10"}`}
    >
      {icon}
      {label}
    </span>
  );
}

function InfoRow({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2.5 text-sm text-gray-600">
      <span className="text-gray-400 w-4 shrink-0">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────
function ClockIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}
function FlagIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6H13l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
      />
    </svg>
  );
}
function BadgeIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
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
  );
}
function BookIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  );
}
function CardIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
      />
    </svg>
  );
}
function GlobeIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
