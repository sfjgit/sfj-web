/* eslint-disable @next/next/no-img-element */
// components/courses/CourseCard.tsx
"use client";
import React from "react";
import Link from "next/link";
// import Image from "next/image";
import { ICourse } from "@/types/course.types";

interface CourseCardProps {
  course: ICourse;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// function formatPrice(amount: number, currency: string) {
//   if (amount === 0) return "Free";
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: currency || "INR",
//     maximumFractionDigits: 0,
//   }).format(amount);
// }
function formatPrice(amount: number, currency: string) {
  if (!amount) return "Free";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(amount));
}

export default function CourseCard({ course }: CourseCardProps) {
  const thumbnail =
    course.banner?.viewUrl || course.previewImage?.viewUrl || null;
  const logo = course.logoUrl?.viewUrl || null;
  // const isFree = !course.isPaid || course.price.amount === 0;
  const amount =
    typeof course.price === "object"
      ? Number(course.price?.amount || 0) // BSkilling
      : Number(course.price || 0); // LMS

  const currency =
    typeof course.price === "object"
      ? course.price?.currency || "INR"
      : course.currency || "INR";

  const isFree = amount <= 0;
  const totalLessons =
    course.curriculum?.chapters?.reduce(
      (acc, ch) => acc + (ch.lessons?.length || 0),
      0,
    ) ?? 0;

  return (
    <Link href={`/courses/${course.slug}`} className="group block">
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all duration-200 h-full flex flex-col">
        {/* Thumbnail */}
        <div className="relative aspect-video bg-gray-100 overflow-hidden">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
              <svg
                className="w-12 h-12 text-blue-300"
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
          )}

          {/* Logo overlay */}
          {logo && (
            <div className="absolute top-3 left-3 w-8 h-8 rounded-lg overflow-hidden bg-white shadow-md border border-gray-100">
              <img src={logo} alt="" className="w-full h-full object-cover" />
            </div>
          )}

          {/* Price badge */}
          {/* <div
            className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold ${
              isFree ? "bg-green-500 text-white" : "bg-blue-600 text-white"
            }`}
          >
            {isFree
              ? "Free"
              : formatPrice(course.price.amount, course.price.currency)}
          </div> */}
          <div
            className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold ${
              isFree ? "bg-green-500 text-white" : "bg-blue-600 text-white"
            }`}
          >
            {isFree ? "Free" : formatPrice(amount, currency)}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {course.title}
          </h3>

          {course.description && (
            <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">
              {course.description}
            </p>
          )}

          {/* Meta row */}
          <div className="flex items-center gap-3 text-xs text-gray-500 mt-auto pt-3 border-t border-gray-100">
            {course.durationHours && (
              <span className="flex items-center gap-1">
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
                {course.durationHours}h
              </span>
            )}
            {totalLessons > 0 && (
              <span className="flex items-center gap-1">
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                {totalLessons} lessons
              </span>
            )}
            {course.startTime && (
              <span className="flex items-center gap-1 ml-auto">
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
                {formatDate(course.startTime)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
