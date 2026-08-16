import type { Metadata } from "next";
import { canonical } from "@/config/site";

export const metadata: Metadata = {
  title: "Talent OS — Talent Acquisition Platform | SFJBS",
  description:
    "Talent OS runs the SFJBS hiring pipeline end to end: sourcing, screening, interview panels, offers and deployment, with requisition-level visibility.",
  alternates: { canonical: canonical("/products/talent-os") },
  openGraph: {
    type: "website",
    url: canonical("/products/talent-os"),
    title: "Talent OS — Talent Acquisition Platform | SFJBS",
    description:
      "Sourcing, screening, interview panels, offers and deployment in one pipeline, with requisition-level visibility.",
  },
};

export default function TalentOsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
