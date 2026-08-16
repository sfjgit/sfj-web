import type { Metadata } from "next";
import { canonical } from "@/config/site";

// The three /products/* routes are linked from the footer of every page —
// 42 internal link instances. All three returned 404 in the audited build,
// so a CXO clicking "CASPA AI Sales & Outreach Platform" landed on an error
// page (P0-01). The routes now exist; this file gives each one indexable
// metadata and a self-referencing canonical.
export const metadata: Metadata = {
  title: "CASPA — AI Sales & Outreach Platform | SFJBS",
  description:
    "SFJBS's AI sales and outreach platform: single-point-of-contact tracking, verified pipelines and outreach across B2I, B2G, CSR, KaaS and TaaS.",
  alternates: { canonical: canonical("/products/caspa") },
  openGraph: {
    type: "website",
    url: canonical("/products/caspa"),
    title: "CASPA — AI Sales & Outreach Platform | SFJBS",
    description:
      "SFJBS's AI sales and outreach platform: SPOC tracking, verified pipelines and outreach across every SFJBS vertical.",
  },
};

export default function CaspaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
