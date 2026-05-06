/* eslint-disable @typescript-eslint/no-explicit-any */
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

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_BSKILLING_URL ||
  "https://backend-bskilling-173405861722.asia-south1.run.app";

async function getCourse(
  slug: string
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
  } catch (err) {
    console.error("Error fetching course:", err);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = await getCourse(slug);
  if (!result) return { title: "Course not found — bSkilling" };
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
  const canonicalUrl = `https://www.bskilling.com/course/${
    course.slug || course._id
  }`;
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
    twitter: {
      card:
        (metadata?.twitterCard as
          | "summary"
          | "summary_large_image"
          | "app"
          | "player") ?? "summary_large_image",
      title: metadata?.twitterTitle || title,
      description: metadata?.twitterDescription || description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatPrice(amount: number, currency: string) {
  if (amount === 0) return "Free";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency || "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getCourse(slug);
  if (!result) notFound();
  const { course } = result;

  const thumbnail =
    course.banner?.viewUrl || course.previewImage?.viewUrl || null;
  const logo = course.logoUrl?.viewUrl || null;

  // Only show sections if they have content
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
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <div className="bg-[#0f1117] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <div className="lg:grid lg:grid-cols-3 lg:gap-12">
              {/* Left */}
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

                {/* Logo + Title */}
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

                {/* Description */}
                {course.description && (
                  <p className="text-gray-300 text-base leading-relaxed mb-6 max-w-2xl">
                    {course.description}
                  </p>
                )}

                {/* Meta pills */}
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

                {/* Highlights — shown prominently in hero */}
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

              {/* Right: Sticky enroll card (desktop) */}
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

        {/* ── BODY ─────────────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="lg:grid lg:grid-cols-3 lg:gap-10">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Banner image — mobile only */}
              {thumbnail && (
                <div className="lg:hidden rounded-2xl overflow-hidden border border-gray-200 aspect-video">
                  <img
                    src={thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Outcomes */}
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

              {/* Key Features */}
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

              {/* Skills */}
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

              {/* Curriculum */}
              {hasChapters && (
                <Section title="Course curriculum">
                  <CurriculumAccordion chapters={course.curriculum.chapters} />
                </Section>
              )}

              {/* Eligibility */}
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

              {/* Prerequisites */}
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

              {/* Tools */}
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

              {/* Why Join */}
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

              {/* Certification */}
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

              {/* FAQs */}
              {hasFAQs && (
                <Section title="Frequently asked questions">
                  <FAQAccordion faqs={course.faqs} />
                </Section>
              )}
            </div>

            {/* Sidebar */}
            <div className="mt-8 lg:mt-0">
              {/* Mobile enroll card */}
              <div className="lg:hidden mb-6">
                <EnrollCard
                  course={course}
                  hasPartialPayment={hasPartialPayment}
                  installments={installments}
                  thumbnail={null}
                />
              </div>

              {/* Desktop sidebar extras */}
              <div className="hidden lg:block sticky top-24 space-y-4">
                {/* Quick info card */}
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

// ── Enroll card (shared desktop + mobile) ────────────────────────────────────

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
        {/* Price */}
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
                "en-IN"
              )}
            </span>
          )}
        </div>

        {/* EnrollButton — untouched */}
        <EnrollButton
          courseId={course._id}
          courseName={course.title}
          amount={course.price.amount}
          currency={course.price.currency}
          isPaid={course.isPaid}
          hasPartialPayment={hasPartialPayment}
          installments={installments}
        />

        {/* Quick stats under button */}
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

// ── Sub-components ────────────────────────────────────────────────────────────

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
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border ${
        accent
          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
          : "bg-white/10 text-gray-300 border-white/10"
      }`}
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
