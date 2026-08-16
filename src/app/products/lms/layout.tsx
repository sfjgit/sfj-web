import type { Metadata } from "next";
import { canonical } from "@/config/site";

export const metadata: Metadata = {
  title: "LMS — Enterprise Learning Management System | SFJBS",
  description:
    "The SFJBS learning platform: structured tracks in full-stack, data and AI, cloud and DevOps, testing and security, with cohort progress and assessments.",
  alternates: { canonical: canonical("/products/lms") },
  openGraph: {
    type: "website",
    url: canonical("/products/lms"),
    title: "LMS — Enterprise Learning Management System | SFJBS",
    description:
      "Structured learning tracks in full-stack, data and AI, cloud and DevOps, testing and security, with cohort progress and assessments.",
  },
};

export default function LmsProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
