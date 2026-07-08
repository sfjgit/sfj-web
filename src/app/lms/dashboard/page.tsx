/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// app/lms/dashboard/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useAxios } from "@/hooks/useAxios";
import {
  GraduationCap,
  BookOpen,
  Clock,
  AlertCircle,
  Loader2,
  ShoppingCart,
  Play,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface User {
  _id: string;
  firstName?: string;
  name?: string;
  email?: string;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail?: string;
  thumbnailUrl?: string;
  slug: string;
  duration?: string;
  instructor?: string;
  level?: string;
  category?: string;
  price?: number;
  pricingPlans?: Array<{
    id: string;
    name: string;
    price: number;
    currency: string;
  }>;
}

interface Enrollment {
  id: string;
  courseId: string;
  userId: string;
  enrollmentDate: string;
  progress?: number;
  status?: string;
  course?: Course;
}

const LMS_COURSE_URL = process.env.NEXT_PUBLIC_LMS_BASE_URL + "/course/api";
const LMS_COURSE_CATEGORY = "sfj";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const api = useAxios();

  useEffect(() => {
    const initDashboard = async () => {
      try {
        setIsLoading(true);

        // Fetch user profile
        const userResponse = await api.get("/auth/me");
        if (userResponse.data?.success && userResponse.data?.data) {
          setUser(userResponse.data.data.user);
        }

        // Fetch user enrollments - ORIGINAL API
        const enrollmentResponse = await api.get(
          `${LMS_COURSE_URL}/courses/enrollments/user`,
        );

        const userEnrollments =
          enrollmentResponse.data?.data?.enrollments || [];
        setEnrollments(userEnrollments);

        // Fetch all available LMS courses
        const coursesResponse = await fetch(
          `${LMS_COURSE_URL}/courses/preview/public?limit=100&page=1&category=${LMS_COURSE_CATEGORY}&isPublished=true`,
          {
            headers: { accept: "application/json" },
          },
        );

        if (coursesResponse.ok) {
          const coursesData = await coursesResponse.json();
          const allCourses = coursesData?.data?.courses || [];

          // Filter out enrolled courses
          const enrolledCourseIds = new Set(
            userEnrollments.map((e: Enrollment) => e.courseId),
          );
          const available = allCourses.filter(
            (course: Course) => !enrolledCourseIds.has(course._id),
          );

          setAvailableCourses(available);
        }
      } catch (err: any) {
        console.error("Dashboard init error:", err);
        setError(err.response?.data?.message || "Failed to load dashboard");
      } finally {
        setIsLoading(false);
      }
    };

    initDashboard();
  }, []);

  const handlePurchase = async (course: Course) => {
    try {
      const lowestPlan = course.pricingPlans?.reduce((a, b) =>
        a.price <= b.price ? a : b,
      );

      if (!lowestPlan) {
        alert("No pricing plan available");
        return;
      }

      // Redirect to LMS payment page
      const planParam = lowestPlan.id ? `?plan=${lowestPlan.id}` : "";
      window.location.href = `${process.env.NEXT_PUBLIC_LMS_URL}/courses/${course.slug}${planParam}`;
    } catch (error) {
      console.error("Purchase error:", error);
      alert("Failed to initiate purchase");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const inProgressCount = enrollments.filter(
    (e) => e.progress && e.progress < 100,
  ).length;
  const completedCount = enrollments.filter((e) => e.progress === 100).length;

  return (
    <main className="min-h-screen bg-gray-50 mt-5">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Welcome back, {user?.firstName || user?.name || "Learner"}! 👋
              </h1>
              <p className="text-blue-100 text-lg">
                Continue your learning journey
              </p>
            </div>
            <Link
              href="#available-courses"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-colors font-semibold shadow-lg"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Browse More Courses
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={<GraduationCap className="w-6 h-6" />}
            label="Enrolled Courses"
            value={enrollments.length}
            bgColor="bg-blue-500"
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6" />}
            label="In Progress"
            value={inProgressCount}
            bgColor="bg-green-500"
            iconBg="bg-green-100"
            iconColor="text-green-600"
          />
          <StatCard
            icon={<CheckCircle className="w-6 h-6" />}
            label="Completed"
            value={completedCount}
            bgColor="bg-purple-500"
            iconBg="bg-purple-100"
            iconColor="text-purple-600"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-10">
        {/* My Enrolled Courses */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              My Enrolled Courses
            </h2>
            {enrollments.length > 0 && (
              <span className="text-sm text-gray-500">
                {enrollments.length} course{enrollments.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {error ? (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          ) : enrollments.length === 0 ? (
            <EmptyState
              icon={<BookOpen className="w-12 h-12 text-gray-400" />}
              title="No courses enrolled yet"
              description="Start learning by browsing our course catalog below"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrollments.map((enrollment) => (
                <EnrolledCourseCard
                  key={enrollment.id}
                  enrollment={enrollment}
                />
              ))}
            </div>
          )}
        </section>

        {/* Available Courses */}
        <section id="available-courses">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Explore More Courses
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Discover new skills and expand your knowledge
              </p>
            </div>
            {availableCourses.length > 0 && (
              <span className="text-sm text-gray-500">
                {availableCourses.length} available
              </span>
            )}
          </div>

          {availableCourses.length === 0 ? (
            <EmptyState
              icon={<CheckCircle className="w-12 h-12 text-green-500" />}
              title="You're all caught up!"
              description="You've enrolled in all available courses"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableCourses.map((course) => (
                <AvailableCourseCard
                  key={course._id}
                  course={course}
                  onPurchase={() => handlePurchase(course)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

// ─── Components ───────────────────────────────────────────────────────────────

function StatCard({
  icon,
  label,
  value,
  iconBg,
  iconColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  bgColor: string;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div
          className={`w-14 h-14 ${iconBg} rounded-xl flex items-center justify-center ${iconColor}`}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-600 font-medium">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
      </div>
    </div>
  );
}

function EnrolledCourseCard({ enrollment }: { enrollment: Enrollment }) {
  const course = enrollment.course;
  const progress = enrollment.progress || 0;
  const thumbnail = course?.thumbnailUrl || course?.thumbnail;

  const handleStartCourse = async () => {
    try {
      // 🔥 Step 1: get fresh tokens
      const response = await fetch("/auth/refresh", {
        method: "POST",
        credentials: "include", // VERY IMPORTANT
      });

      const data = await response.json();

      if (!data?.success) {
        throw new Error("Failed to refresh token");
      }

      const refreshToken = data.data.refreshToken;

      if (!refreshToken) {
        throw new Error("No refresh token received");
      }

      // 🔥 Step 2: construct SSO URL
      const ssoUrl = `https://learn.bskilling.com/new-sso?refreshToken=${refreshToken}&enrollmentId=${enrollment.id}&courseId=${enrollment.courseId}`;

      // 🔥 Step 3: open in new tab
      window.open(ssoUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error("SSO start failed:", err);

      // fallback
      window.location.href = "/signin";
    }
  };
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 group">
      {/* Thumbnail */}
      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-blue-600 overflow-hidden">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={course?.title || "Course"}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <GraduationCap className="w-16 h-16 text-white/60" />
          </div>
        )}
        {/* Progress Badge */}
        {progress > 0 && (
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
            <span className="text-xs font-semibold text-gray-900">
              {Math.round(progress)}% Complete
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {course?.title || "Untitled Course"}
        </h3>

        {course?.instructor && (
          <p className="text-xs text-gray-500 mb-4 flex items-center gap-1">
            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
            By {course.instructor}
          </p>
        )}

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleStartCourse}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-sm font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          <Play className="w-4 h-4" />
          {progress > 0 ? "Continue Learning" : "Start Course"}
        </button>
      </div>
    </div>
  );
}

function AvailableCourseCard({
  course,
  onPurchase,
}: {
  course: Course;
  onPurchase: () => void;
}) {
  const thumbnail = course.thumbnailUrl || course.thumbnail;
  const lowestPlan = course.pricingPlans?.reduce((a, b) =>
    a.price <= b.price ? a : b,
  );
  const isFree = !lowestPlan || lowestPlan.price === 0;

  const levelColors: Record<string, { bg: string; text: string }> = {
    BEGINNER: { bg: "bg-green-100", text: "text-green-700" },
    INTERMEDIATE: { bg: "bg-yellow-100", text: "text-yellow-700" },
    ADVANCED: { bg: "bg-red-100", text: "text-red-700" },
  };

  const levelConfig = levelColors[course.level || ""] || {
    bg: "bg-gray-100",
    text: "text-gray-700",
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 group">
      {/* Thumbnail */}
      <div className="relative h-48 bg-gradient-to-br from-purple-500 to-purple-600 overflow-hidden">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-white/60" />
          </div>
        )}
        {/* Level Badge */}
        {course.level && (
          <div
            className={`absolute top-3 left-3 ${levelConfig.bg} px-3 py-1 rounded-full shadow-lg`}
          >
            <span className={`text-xs font-semibold ${levelConfig.text}`}>
              {course.level}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
          {course.title}
        </h3>

        {course.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {course.description}
          </p>
        )}

        <div className="flex items-center justify-between mb-4">
          {course.duration && (
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Clock className="w-3.5 h-3.5" />
              {course.duration}
            </div>
          )}
          <div className="text-right">
            {isFree ? (
              <span className="text-lg font-bold text-green-600">Free</span>
            ) : (
              <div className="flex flex-col items-end">
                <span className="text-lg font-bold text-gray-900">
                  ₹{lowestPlan.price.toLocaleString("en-IN")}
                </span>
                {course.pricingPlans && course.pricingPlans.length > 1 && (
                  <span className="text-xs text-gray-500">
                    {course.pricingPlans.length} plans available
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link
            href={`/courses/${course.slug}`}
            className="flex-1 py-2.5 px-4 bg-gray-100 text-gray-900 rounded-xl hover:bg-gray-200 transition-colors text-sm font-semibold text-center"
          >
            View Details
          </Link>
          <button
            onClick={onPurchase}
            className="flex-1 py-2.5 px-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 text-sm font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            {isFree ? "Enroll Free" : "Purchase"}
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyState({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center">
      <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm max-w-md mx-auto">{description}</p>
    </div>
  );
}
