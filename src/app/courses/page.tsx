"use client";

import { useState, useEffect } from "react";
import { ICourse, ICoursesResponse } from "@/types/course.types";
import CourseCard from "@/components/courses/CourseCard";
import env from "@/config/env";

const CATEGORY_ID = "69c1146aa22353efe2f54052";
const LMS_COURSE_CATEGORY = "sfj";
const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_BSKILLING_URL ||
  "https://backend-bskilling-173405861722.asia-south1.run.app";

const LMS_COURSE_URL = env.NEXT_PUBLIC_LMS_COURSE_URL;

export default function CoursesPage() {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [pagination, setPagination] = useState<{
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      try {
        const [res1, res2] = await Promise.allSettled([
          fetch(
            `${BACKEND_URL}/api/courses?limit=100&page=1&category=${CATEGORY_ID}&isPublished=true&type=b2c`,
            { headers: { accept: "application/json" } },
          ),
          fetch(
            `${LMS_COURSE_URL}/courses/preview/public?limit=100&page=1&category=${LMS_COURSE_CATEGORY}&isPublished=true`,
            { headers: { accept: "application/json" } },
          ),
        ]);

        // let mainCourses: ICourse[] = [];
        let mainPagination = null;

        if (res1.status === "fulfilled" && res1.value.ok) {
          const data: ICoursesResponse = await res1.value.json();
          // mainCourses = data.data?.courses || [];
          mainPagination = data.data?.pagination || null;
        } else {
          setError("Failed to fetch courses");
        }

        let lmsCourses: ICourse[] = [];
        if (res2.status === "fulfilled" && res2.value.ok) {
          const data = await res2.value.json();
          lmsCourses = data?.data?.courses || [];
        }

        // setCourses([...mainCourses, ...lmsCourses]);
        setCourses([...lmsCourses]);
        setPagination(mainPagination);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      {/* Hero banner */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Explore Courses
          </h1>
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl">
            Industry-recognized certifications and hands-on skill programs to
            accelerate your career.
          </p>
          {pagination && (
            <p className="mt-3 text-sm text-gray-400">
              {pagination.totalItems} course
              {pagination.totalItems !== 1 ? "s" : ""} available
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-gray-400 text-sm">Loading courses...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">
              Unable to load courses
            </h3>
            <p className="text-gray-500 text-sm">{error}</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">No courses yet</h3>
            <p className="text-gray-500 text-sm">
              Check back soon for new courses.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
