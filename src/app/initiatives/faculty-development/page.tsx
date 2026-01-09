import type { Metadata } from "next";
import FacultyDevelopmentPage from "./_components/FacultyDevelopmentPage";

export const metadata: Metadata = {
  title: "Faculty Development Program in IT | Industry-Aligned FDPs - SFJ",
  description:
    "Empower faculty with industry-aligned IT skills through SFJ's Faculty Development Programs in AI, Cloud, Cybersecurity, Data Science & emerging technologies.",
};

export default function Page() {
  return <FacultyDevelopmentPage />;
}
