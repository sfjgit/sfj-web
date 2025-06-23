import React from "react";
import IndustriesPage from "./_components/Page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries We Serve | SFJBS IT Solutions & Expertise",
  description:
    "SFJBS partners with diverse industries, offering tailored IT staffing, training, and technology solutions to drive innovation and efficiency across various sectors.",
  keywords:
    "industries served, industry expertise, IT solutions by industry, sector-specific IT, industry verticals, technology for industries, diversified IT services",
  openGraph: {
    title: "Industries We Serve | SFJBS IT Solutions & Expertise",
    description:
      "SFJBS partners with diverse industries, offering tailored IT staffing, training, and technology solutions to drive innovation and efficiency across various sectors.",
    url: "https://www.sfjbs.com/industries",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Industries We Serve | SFJBS IT Solutions & Expertise",
    description:
      "SFJBS partners with diverse industries, offering tailored IT staffing, training, and technology solutions to drive innovation and efficiency across various sectors.",
  },
  alternates: {
    canonical: "https://www.sfjbs.com/industries",
  },
};
export default function page() {
  return <IndustriesPage />;
}
