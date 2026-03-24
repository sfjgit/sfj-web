"use client";
// components/courses/CurriculumAccordion.tsx
import { useState } from "react";
import { ICourse } from "@/types/course.types";

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}

export default function CurriculumAccordion({
  chapters,
}: {
  chapters: ICourse["curriculum"]["chapters"];
}) {
  const [openChapters, setOpenChapters] = useState<Record<string, boolean>>({
    [chapters[0]?._id]: true,
  });

  const toggle = (id: string) =>
    setOpenChapters((prev) => ({ ...prev, [id]: !prev[id] }));

  const totalLessons = chapters.reduce((acc, ch) => acc + ch.lessons.length, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          {chapters.length} modules · {totalLessons} lessons
        </p>
      </div>
      <div className="space-y-2">
        {chapters.map((chapter, idx) => (
          <div
            key={chapter._id}
            className="border border-gray-200 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggle(chapter._id)}
              className="w-full flex items-center justify-between px-4 py-3.5 bg-white hover:bg-gray-50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="text-sm font-semibold text-gray-800">
                  {chapter.title}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400 shrink-0 ml-2">
                <span>{chapter.lessons.length} lessons</span>
                <ChevronIcon open={!!openChapters[chapter._id]} />
              </div>
            </button>

            {openChapters[chapter._id] && chapter.lessons.length > 0 && (
              <div className="bg-gray-50 border-t border-gray-100 divide-y divide-gray-100">
                {chapter.lessons.map((lesson) => (
                  <div
                    key={lesson._id}
                    className="flex items-center gap-3 px-4 py-3"
                  >
                    <span className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center shrink-0">
                      <span className="w-2 h-2 rounded-full bg-gray-400" />
                    </span>
                    <span className="text-sm text-gray-700">
                      {lesson.title}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
