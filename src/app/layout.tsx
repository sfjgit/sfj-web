import Footer from "@/components/Footer";
import "./globals.css";
import { Metadata } from "next";
import ClientProvider from "./_components/ClientProvider";
import Navigation from "@/components/Navigation";
import Script from "next/script";
export const metadata: Metadata = {
  title:
    "SFJ Business Solutions | IT Training, Talent Services & Digital Transformation",
  description:
    "Leading IT training provider with 300,000+ professionals trained. Offering Knowledge as a Service, Talent as a Service, and IT Solutions across 8 industries globally. Expert training in Java, SAP, Oracle, Salesforce, React, Azure, and more.",
  keywords:
    "IT training, talent services, digital transformation, SAP training, Oracle training, Salesforce training, Java training, React training, Azure training, workforce development, enterprise training, professional development, technology consulting, IT placement services, corporate training, skill development, certification programs, business solutions, IT consulting, talent acquisition",
  authors: [{ name: "SFJ Business Solutions" }],
  creator: "SFJ Business Solutions",
  publisher: "SFJ Business Solutions",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://www.sfjbs.com/",
  },
  other: {
    googlebot:
      "index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1",
    // Organization Schema
    "script:ld+json:organization": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "SFJ Business Solutions",
      url: "https://www.sfjbs.com",
      logo: "https://bskilling-documents.s3.ap-south-1.amazonaws.com/public/image/1751274803180_so6m88f31ti_SFJ_.png",
      description:
        "SFJBS is committed to upskilling India for the AI era through enterprise training and cutting-edge technology solutions. With over 14 years of expertise, we empower organizations with tailored learning programs, IT consulting, and tech-driven strategies to build future-ready teams and accelerate innovation across industries.",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91-9845348601",
          contactType: "customer service",
          areaServed: "IN",
          availableLanguage: ["English"],
        },
      ],
      sameAs: [
        "https://www.linkedin.com/company/sfj-business-solutions-pvt-ltd-/",
        "https://www.facebook.com/SFJBusinessSolutions",
        "https://www.facebook.com/sfjbsofficial",
      ],
    }),
    // Local Business / Educational Organization Schema
    "script:ld+json:localbusiness": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: "SFJ Business Solutions",
      image:
        "https://bskilling-documents.s3.ap-south-1.amazonaws.com/public/image/1751274803180_so6m88f31ti_SFJ_.png",
      url: "https://www.sfjbs.com",
      telephone: "+91-9845348601",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "Uma Sree Dream World, Unit -2, B-Block, 4th Floor, Kudlu Gate, Hosur Main Road",
        addressLocality: "Bangalore",
        addressRegion: "Karnataka",
        postalCode: "560068",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 12.891054,
        longitude: 77.647187,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:30",
        },
      ],
      sameAs: [
        "https://www.linkedin.com/company/sfj-business-solutions-pvt-ltd-/",
        "https://www.facebook.com/SFJBusinessSolutions",
        "https://www.facebook.com/sfjbsofficial",
      ],
    }),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-KKM45FLN');
            `,
          }}
        />
      </head>
      <body className="font-sans">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KKM45FLN"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "rxnkg1ty2o");
            `,
          }}
        />

        <ClientProvider>
          <Navigation />
          {children}
          <Footer />
        </ClientProvider>
      </body>
    </html>
  );
}
