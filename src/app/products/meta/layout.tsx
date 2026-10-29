import type { Metadata } from "next";
import { canonical } from "@/config/site";

export const metadata: Metadata = {
  title: "META — Education Services on WhatsApp | SFJBS",
  description:
    "Check results, access admit cards, manage APAAR, discover scholarships and receive school updates through one simple WhatsApp conversation.",
  alternates: { canonical: canonical("/products/meta") },
  openGraph: {
    type: "website",
    url: canonical("/products/meta"),
    title: "META — Education Services on WhatsApp | SFJBS",
    description:
      "Results, admit cards, APAAR, scholarships and school updates for students, parents, teachers and administrators, all through WhatsApp.",
  },
};

export default function MetaProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
