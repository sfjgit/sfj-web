import Life from "./_components/Page";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Life@SFJBS | Our Workplace Culture & Team Environment | SFJBS",
  description:
    "Discover the vibrant culture and passionate community at SFJBS. Where celebrations are a way of life and our people are the foundation of our success.",
  keywords:
    "SFJBS culture, workplace environment, team celebrations, office culture, work life balance, company culture, team building, employee engagement",
  openGraph: {
    title: "Life@SFJBS | Our Workplace Culture & Team Environment | SFJBS",
    description:
      "Discover the vibrant culture and passionate community at SFJBS. Where celebrations are a way of life and our people are the foundation of our success.",
    url: "https://www.sfjbs.com/life-at-sfjbs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Life@SFJBS | Our Workplace Culture & Team Environment | SFJBS",
    description:
      "Discover the vibrant culture and passionate community at SFJBS. Where celebrations are a way of life and our people are the foundation of our success.",
  },
  alternates: {
    canonical: "https://www.sfjbs.com/life-at-sfjbs",
  },
};

export default function page() {
  return (
    <>
      <Life />
    </>
  );
}
