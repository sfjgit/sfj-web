/* eslint-disable @next/next/no-img-element */
// app/courses/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { ICourse, IMetadata } from "@/types/course.types";
import EnrollButton from "@/components/courses/EnrollButton";
import CurriculumAccordion from "@/components/courses/CurriculumAccordion";
import FAQAccordion from "@/components/courses/FAQAccordion";
import CourseTour from "@/components/courses/CourseTour"; // ← NEW
import Link from "next/link";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_BSKILLING_URL ||
  "https://backend-bskilling-173405861722.asia-south1.run.app";

// ---- Data fetching ----

async function getCourse(
  slug: string
): Promise<{ course: ICourse; metadata: IMetadata | null } | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/courses/slug/${slug}`, {
      headers: { accept: "application/json" },
      next: { revalidate: 60 },
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

// ---- Metadata ----

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

// ---- Helpers ----

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

// ---- Page ----

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
  const hasChapters = course.curriculum?.chapters?.length > 0;
  const hasFAQs = course.faqs?.length > 0;
  const hasOutcomes = course.outcomes?.length > 0;
  const hasSkills = course.skills?.length > 0;

  // ── NEW: partial payment props ────────────────────────────────────────────
  const hasPartialPayment = course.partialPayment?.isAllowed ?? false;
  const installments = course.partialPayment?.installments ?? [];
  // ─────────────────────────────────────────────────────────────────────────

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

      {/* ── NEW: Tour guide (client, shows once) ── */}
      <CourseTour />

      <main className="min-h-screen bg-gray-50 pt-20">
        {/* Hero */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
            <div className="lg:grid lg:grid-cols-3 lg:gap-10">
              {/* Left: Course info */}
              <div className="lg:col-span-2">
                <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
                  <Link
                    href="/courses"
                    className="hover:text-gray-600 transition-colors"
                  >
                    Courses
                  </Link>
                  <span>/</span>
                  <span className="text-gray-600 truncate max-w-xs">
                    {course.title}
                  </span>
                </nav>

                <div className="flex items-start gap-3 mb-4">
                  {logo && (
                    <img
                      src={logo}
                      alt=""
                      className="w-12 h-12 rounded-xl object-cover border border-gray-200 shrink-0 mt-0.5"
                    />
                  )}
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                    {course.title}
                  </h1>
                </div>

                {course.overview?.description && (
                  <p className="text-gray-600 text-base leading-relaxed mb-6 max-w-2xl">
                    {course.overview.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 mb-6">
                  {course.durationHours && (
                    <MetaPill color="blue">
                      <ClockIcon />
                      {course.durationHours} hours
                    </MetaPill>
                  )}
                  {course.startTime && (
                    <MetaPill color="green">
                      <CalendarIcon />
                      Starts {formatDate(course.startTime)}
                    </MetaPill>
                  )}
                  {course.endTime && (
                    <MetaPill color="orange">
                      <ClockIcon />
                      Ends {formatDate(course.endTime)}
                    </MetaPill>
                  )}
                  {course.appliedCount > 0 && (
                    <MetaPill color="purple">
                      <UsersIcon />
                      {course.appliedCount} enrolled
                    </MetaPill>
                  )}
                  {/* ── NEW: installment badge ── */}
                  {hasPartialPayment && (
                    <MetaPill color="green">
                      <CalendarIcon />
                      EMI available
                    </MetaPill>
                  )}
                </div>
              </div>

              {/* Right: Sticky enroll card (desktop) */}
              <div className="hidden lg:block">
                <div className="sticky top-20">
                  <CourseEnrollCard
                    course={course}
                    hasPartialPayment={hasPartialPayment}
                    installments={installments}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-10">
            <div className="lg:col-span-2 space-y-8">
              {thumbnail && (
                <div className="rounded-2xl overflow-hidden border border-gray-200 aspect-video">
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
                        <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
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
                        className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100"
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

              {course.overview?.keyFeatures?.length > 0 && (
                <Section title="Key features">
                  <ul className="space-y-2">
                    {course.overview.keyFeatures.map((f, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm text-gray-700"
                      >
                        <CircleCheckIcon className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </Section>
              )}

              {course.curriculum?.prerequisites?.length > 0 && (
                <Section title="Prerequisites">
                  <ul className="space-y-2">
                    {course.curriculum.prerequisites.map((p, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm text-gray-700"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </Section>
              )}

              {hasFAQs && (
                <Section title="Frequently asked questions">
                  <FAQAccordion faqs={course.faqs} />
                </Section>
              )}
            </div>

            {/* Mobile enroll card */}
            <div className="lg:hidden mt-8">
              <CourseEnrollCard
                course={course}
                hasPartialPayment={hasPartialPayment}
                installments={installments}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

// ---- Server sub-components ----

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

function MetaPill({
  color,
  children,
}: {
  color: "blue" | "green" | "orange" | "purple";
  children: React.ReactNode;
}) {
  const colors = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    orange: "bg-orange-50 text-orange-700",
    purple: "bg-purple-50 text-purple-700",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full ${colors[color]}`}
    >
      {children}
    </span>
  );
}

// ── NEW: accepts installment props ────────────────────────────────────────────
function CourseEnrollCard({
  course,
  hasPartialPayment,
  installments,
}: {
  course: ICourse;
  hasPartialPayment: boolean;
  installments: {
    installmentNumber: number;
    amount: number;
    dueDate: string;
    label?: string;
  }[];
}) {
  const isFree = !course.isPaid || course.price.amount === 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      {(course.previewImage?.viewUrl || course.banner?.viewUrl) && (
        <div className="aspect-video overflow-hidden">
          <img
            src={course.previewImage?.viewUrl || course.banner?.viewUrl}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-5 space-y-4">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-900">
            {isFree
              ? "Free"
              : formatPrice(course.price.amount, course.price.currency)}
          </span>
          {!isFree && hasPartialPayment && installments.length > 0 && (
            <span className="text-xs font-medium bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full">
              EMI from ₹
              {Math.min(...installments.map((i) => i.amount)).toLocaleString(
                "en-IN"
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

        <div className="space-y-2.5 pt-2 border-t border-gray-100">
          {course.durationHours && (
            <InfoRow
              icon="clock"
              label={`${course.durationHours} hours of content`}
            />
          )}
          {course.curriculum?.chapters?.length > 0 && (
            <InfoRow
              icon="book"
              label={`${course.curriculum.chapters.length} modules`}
            />
          )}
          {course.startTime && (
            <InfoRow
              icon="calendar"
              label={`Starts ${formatDate(course.startTime)}`}
            />
          )}
          {course.endTime && (
            <InfoRow icon="flag" label={`Ends ${formatDate(course.endTime)}`} />
          )}
          {course.certification?.title && (
            <InfoRow icon="badge" label="Certificate on completion" />
          )}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label }: { icon: string; label: string }) {
  const icons: Record<string, React.ReactNode> = {
    clock: <ClockIcon />,
    book: <BookIcon />,
    calendar: <CalendarIcon />,
    flag: <FlagIcon />,
    badge: <BadgeIcon />,
  };
  return (
    <div className="flex items-center gap-2.5 text-sm text-gray-600">
      <span className="text-gray-400">{icons[icon]}</span>
      <span>{label}</span>
    </div>
  );
}

// ---- Inline SVG icons ----

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
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? "w-4 h-4"}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
function CircleCheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? "w-4 h-4"}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
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
function FlagIcon() {
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
        d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6H13l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
      />
    </svg>
  );
}
function BadgeIcon() {
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
        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
      />
    </svg>
  );
}
