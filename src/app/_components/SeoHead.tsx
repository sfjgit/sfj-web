"use client";
import Head from "next/head";

const SEOHead = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SFJ Business Solutions",
    alternateName: "SFJ Business Solutions Pvt Ltd",
    url: "https://www.sfjbs.com/",
    logo: "https://www.sfjbs.com/logo.png",
    description:
      "Leading IT training and talent services provider with global presence, specializing in workforce development and digital transformation.",
    foundingDate: "2011",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Bangalore",
      addressLocality: "Bangalore",
      addressRegion: "Karnataka",
      postalCode: "560001",
      addressCountry: "IN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-XXXXXXXXXX",
        contactType: "customer service",
        email: "info@sfjbs.com",
        availableLanguage: ["English"],
      },
    ],
    sameAs: [
      "https://www.linkedin.com/company/sfjbs",
      "https://twitter.com/sfjbs",
      "https://www.facebook.com/sfjbs",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "IT Training Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Knowledge as a Service",
            description:
              "Comprehensive training programs across 640+ specialized courses",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Talent as a Service",
            description: "15,000+ IT placements with top-tier professionals",
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "1250",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <Head>
      {/* Basic SEO */}
      <title>
        SFJ1 Business Solutions | IT Training, Talent Services & Digital
        Transformation
      </title>
      <meta
        name="description"
        content="Leading IT training provider with 300,000+ professionals trained. Offering Knowledge as a Service, Talent as a Service, and IT Solutions across 8 industries globally. Expert training in Java, SAP, Oracle, Salesforce, React, Azure, and more."
      />
      <meta
        name="keywords"
        content="IT training, talent services, digital transformation, SAP training, Oracle training, Salesforce training, Java training, React training, Azure training, workforce development, enterprise training, professional development, technology consulting, IT placement services, corporate training, skill development, certification programs, business solutions, IT consulting, talent acquisition"
      />
      <meta name="author" content="SFJ Business Solutions" />
      <meta name="creator" content="SFJ Business Solutions" />
      <meta name="publisher" content="SFJ Business Solutions" />
      <meta name="robots" content="index, follow" />
      <meta
        name="googlebot"
        content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"
      />

      {/* Viewport */}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=5"
      />

      {/* Canonical URL */}
      <link rel="canonical" href="https://www.sfjbs.com/" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.sfjbs.com/" />
      <meta
        property="og:title"
        content="SFJ Business Solutions | Leading IT Training & Talent Services Provider"
      />
      <meta
        property="og:description"
        content="Bridge the global skills gap with innovative technology training. 300,000+ IT professionals trained across diverse domains. Expert training in SAP, Oracle, Salesforce, Java, React, Azure and emerging technologies."
      />
      <meta property="og:image" content="https://www.sfjbs.com/og-image.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:image:alt"
        content="SFJ Business Solutions - IT Training and Talent Services"
      />
      <meta property="og:site_name" content="SFJ Business Solutions" />
      <meta property="og:locale" content="en_US" />

      {/* Business Contact Info */}
      <meta property="og:phone_number" content="+91-XXXXXXXXXX" />
      <meta property="og:email" content="info@sfjbs.com" />
      <meta property="og:latitude" content="12.9716" />
      <meta property="og:longitude" content="77.5946" />
      <meta property="og:street-address" content="Bangalore, Karnataka" />
      <meta property="og:locality" content="Bangalore" />
      <meta property="og:region" content="Karnataka" />
      <meta property="og:postal-code" content="560001" />
      <meta property="og:country-name" content="India" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content="https://www.sfjbs.com/" />
      <meta
        name="twitter:title"
        content="SFJ Business Solutions | IT Training & Talent Services"
      />
      <meta
        name="twitter:description"
        content="Leading IT training provider with global presence. Specializing in workforce development, digital transformation, and professional certification programs."
      />
      <meta
        name="twitter:image"
        content="https://www.sfjbs.com/twitter-image.jpg"
      />
      <meta
        name="twitter:image:alt"
        content="SFJ Business Solutions - Transforming Careers Through Technology Training"
      />
      <meta name="twitter:site" content="@sfjbs" />
      <meta name="twitter:creator" content="@sfjbs" />

      {/* Additional Meta Tags */}
      <meta name="application-name" content="SFJ Business Solutions" />
      <meta name="theme-color" content="#667eea" />
      <meta name="msapplication-TileColor" content="#667eea" />
      <meta name="msapplication-config" content="/browserconfig.xml" />

      {/* Verification Tags - Replace with your actual codes */}
      <meta
        name="google-site-verification"
        content="your-google-verification-code"
      />
      <meta name="msvalidate.01" content="your-bing-verification-code" />
      <meta
        name="yandex-verification"
        content="your-yandex-verification-code"
      />
      <meta
        name="facebook-domain-verification"
        content="your-facebook-verification-code"
      />

      {/* Favicons */}
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/favicon-96x96.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Language Alternatives */}
      <link rel="alternate" hrefLang="en-US" href="https://www.sfjbs.com/" />
      <link
        rel="alternate"
        hrefLang="en-GB"
        href="https://www.sfjbs.com/en-gb"
      />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
};

export default SEOHead;
