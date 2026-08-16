import type { Metadata } from "next";
import { canonical } from "@/config/site";

// Client component page — metadata has to live in a layout. Previously this
// route inherited the site-wide fallback title/description and canonicalised
// to the homepage (P0-03, OP-02).
export const metadata: Metadata = {
  title: "Terms & Conditions | SFJBS",
  description:
    "The terms governing use of the SFJ Business Solutions website, training programmes and services, including enrolment, payment and intellectual property.",
  alternates: { canonical: canonical("/terms-and-conditions") },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
