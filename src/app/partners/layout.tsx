import type { Metadata } from "next";
import { canonical } from "@/config/site";

export const metadata: Metadata = {
  title: "Partners — Certification & Delivery Alliances | SFJBS",
  description:
    "SFJBS partner programmes for training providers, colleges, certification bodies and hiring partners — how the alliances work and how to apply.",
  alternates: { canonical: canonical("/partners") },
};

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
