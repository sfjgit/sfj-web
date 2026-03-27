"use client";
// components/courses/CourseTour.tsx
// Drop this anywhere in the course page — it auto-shows on first visit and never again.

import { useState, useEffect } from "react";

const TOUR_KEY = "bskilling_course_tour_done";

const STEPS = [
  {
    emoji: "👀",
    title: "Check the curriculum",
    body: "Scroll down to see all modules and lessons. Tap any module to expand it.",
    anchor: "curriculum",
  },
  {
    emoji: "🎯",
    title: "See what you'll learn",
    body: "The 'What you'll learn' section shows exactly what skills you'll walk away with.",
    anchor: "outcomes",
  },
  {
    emoji: "💳",
    title: "Enroll when ready",
    body: "Hit Enroll Now to see the price breakdown. You can apply a coupon or pay in installments if available.",
    anchor: "enroll",
  },
  {
    emoji: "✅",
    title: "You're all set!",
    body: "After payment, you'll get instant access. Questions? Check the FAQs section below.",
    anchor: null,
  },
];

export default function CourseTour() {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const done = localStorage.getItem(TOUR_KEY);
      if (!done) setVisible(true);
    } catch {}
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(TOUR_KEY, "1");
    } catch {}
    setVisible(false);
  };

  const next = () => {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
    } else {
      dismiss();
    }
  };

  if (!visible) return null;

  const current = STEPS[step];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100vw-2rem)] max-w-sm">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Progress bar */}
        <div className="h-1 bg-gray-100">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        <div className="p-4">
          {/* Step dots */}
          <div className="flex items-center gap-1.5 mb-3">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === step
                    ? "w-4 bg-blue-500"
                    : i < step
                    ? "w-1.5 bg-blue-300"
                    : "w-1.5 bg-gray-200"
                }`}
              />
            ))}
            <span className="ml-auto text-xs text-gray-400">
              {step + 1}/{STEPS.length}
            </span>
          </div>

          {/* Content */}
          <div className="flex items-start gap-3">
            <span className="text-2xl shrink-0 mt-0.5">{current.emoji}</span>
            <div>
              <p className="font-semibold text-gray-900 text-sm">
                {current.title}
              </p>
              <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">
                {current.body}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={dismiss}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              Skip tour
            </button>
            <button
              onClick={next}
              className="ml-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              {step < STEPS.length - 1 ? "Next →" : "Got it!"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
