"use client";
import FacultyHeroSection from "./FacultyHeroSection";
import FacultyWebinarSection from "./FacultyWebinarSection";
import FacultyCtaSection from "./FacultyCtaSection";
import CategoryChooser, {
  CATEGORIES,
} from "@/app/services/institutional-skilling/_components/CategoryChooser";

// Same component/content as the institutional-skilling page, minus
// SkillgenAI and Faculty on Demand — dropped on this page only, the
// institutional-skilling page still shows all 10.
const FACULTY_CATEGORIES = CATEGORIES.filter(
  (c) => c.title !== "SkillgenAI" && c.title !== "Faculty on Demand",
);

// Two in-page anchors, nothing more: #fdp-program on the hero section and
// #fdp-webinar on the webinar section. Both are plain fragment targets, so a
// link just scrolls the page — no section is hidden and no dialog is bound.
export default function FacultyDevelopmentPage() {
  return (
    <div className="min-h-screen bg-white">
      <FacultyHeroSection />

      <FacultyWebinarSection />

      <CategoryChooser
        categories={FACULTY_CATEGORIES}
        heading="WHO IT IS FOR"
        description="Teaching faculty, trainers, instructors, Heads of Department and academic coordinators. No prior AI experience or programming background is assumed — the 30-hour core runs without mathematics. The AWS track is tiered by whether it genuinely helps the discipline."
      />

      <FacultyCtaSection />
    </div>
  );
}
