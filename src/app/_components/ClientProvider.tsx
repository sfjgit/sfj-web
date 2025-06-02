import Head from "next/head";
import React from "react";

export default function ClientProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Head>
        <title>
          SFJ Business Solutions | IT Training, Talent Services & Digital
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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
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
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      {children}
    </>
  );
}
