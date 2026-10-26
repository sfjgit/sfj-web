// import Life from "./_components/Page";

// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Life at SFJBS — Our Culture & Team | SFJBS",
//   description:
//     "Discover the vibrant culture and passionate community at SFJBS. Where celebrations are a way of life and our people are the foundation of our success.",
//   openGraph: {
//     title: "Life at SFJBS — Our Culture & Team | SFJBS",
//     description:
//       "Discover the vibrant culture and passionate community at SFJBS. Where celebrations are a way of life and our people are the foundation of our success.",
//     url: "https://www.sfjbs.com/life-at-sfjbs",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Life at SFJBS — Our Culture & Team | SFJBS",
//     description:
//       "Discover the vibrant culture and passionate community at SFJBS. Where celebrations are a way of life and our people are the foundation of our success.",
//   },
//   alternates: {
//     canonical: "https://www.sfjbs.com/life-at-sfjbs",
//   },
// };

// export default function page() {
//   return (
//     <>
//       <Life />
//     </>
//   );
// }

import { Metadata } from "next";
import { canonical } from "@/config/site";
import LifeAtSfjbs from "./_components/LifeAtSfjbs";

const TITLE = "Life at SFJBS — Our Culture & Team | SFJBS";
const DESCRIPTION =
  "Discover the culture and community at SFJBS: collaboration, continuous learning, celebrations and a team where every voice belongs.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: canonical("/life-at-sfjbs"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  alternates: {
    canonical: canonical("/life-at-sfjbs"),
  },
};

export default function Page() {
  return <LifeAtSfjbs />;
}
