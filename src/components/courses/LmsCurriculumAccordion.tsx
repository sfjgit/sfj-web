"use client";

import { useState } from "react";

export interface ILmsLesson {
  id: string;
  title: string;
  type: string;
  estimatedDuration: string | null;
  isPreviewAvailable: boolean;
}

export interface ILmsModule {
  id: string;
  title: string;
  description: string | null;
  order: number;
  estimatedDuration: string | null;
  totalMaterials: number;
  lessons: ILmsLesson[];
}

export interface ILmsPricingPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  originalPrice: number | null;
  validityInDays: number | null;
  features: string[];
  description: string | null;
}

export interface ILmsCourse {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  type: "SELF_PACED" | "LIVE" | "HYBRID" | "OFFLINE" | "MATERIAL_ONLY";
  duration: string | null;
  category: string | null;
  subcategory: string | null;
  language: string | null;
  tags: string[];
  createdAt: string;
  certificateEnabled: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  keywords: string[];
  thumbnailUrl: string | null;
  modulesCount: number;
  enrollmentsCount: number;
  totalLessons: number;
  modules: ILmsModule[];
  pricingPlans: ILmsPricingPlan[];
}

export default function LmsCurriculumAccordion({
  modules,
  materialTypeIcon,
}: {
  modules: ILmsModule[];
  materialTypeIcon: Record<string, string>;
}) {
  const [openModules, setOpenModules] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenModules((prev) => {
      const next = new Set(prev);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-2">
      {modules.map((mod, i) => {
        const isOpen = openModules.has(mod.id);
        return (
          <div
            key={mod.id}
            className="border border-gray-200 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggle(mod.id)}
              className="w-full flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-[#0f1117] text-white flex items-center justify-center text-xs font-bold shrink-0">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">
                  {mod.title}
                </p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-gray-500">
                    {mod.lessons.length > 0
                      ? `${mod.lessons.length} lessons`
                      : mod.totalMaterials > 0
                        ? `${mod.totalMaterials} lessons`
                        : ""}
                  </span>
                  {mod.estimatedDuration && (
                    <span className="text-xs text-gray-400">
                      {mod.estimatedDuration}
                    </span>
                  )}
                </div>
              </div>
              <svg
                className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
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
            </button>

            {isOpen && mod.lessons.length > 0 && (
              <div className="divide-y divide-gray-100">
                {mod.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex items-center gap-3 px-4 py-3 bg-white"
                  >
                    <span className="text-base shrink-0 w-5 text-center">
                      {materialTypeIcon[lesson.type] ?? "📄"}
                    </span>
                    <span className="text-sm text-gray-700 flex-1">
                      {lesson.title}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      {lesson.isPreviewAvailable && (
                        <span className="text-xs text-blue-600 font-medium border border-blue-200 px-2 py-0.5 rounded-full">
                          Preview
                        </span>
                      )}
                      {lesson.estimatedDuration && (
                        <span className="text-xs text-gray-400">
                          {lesson.estimatedDuration}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
