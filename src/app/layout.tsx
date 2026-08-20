import "./globals.css";
import { Metadata, Viewport } from "next";
import ClientProvider from "./_components/ClientProvider";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import {
  COMPANY,
  CONTACT,
  METRICS,
  ORGANIZATION_ID,
  SITE_URL,
  SOCIAL_PROFILES,
  WEBSITE_ID,
} from "@/config/site";
// import AnnouncementTicker from "@/components/AnnouncementTicker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Fallback only — every indexable route now defines its own title. Three
  // pages (/careers and two legal pages) previously inherited this one
  // verbatim, so Google saw three identical 82-char titles and collapsed them
  // (OP-02). Deliberately no `template`: each page writes its own complete
  // title so the ≤60-char budget is visible at the call site rather than
  // silently blown by an appended suffix (OP-04).
  title: "Enterprise Upskilling & IT Talent Partner | SFJBS",
  description:
    "SFJBS trains enterprise, institutional and government workforces in AI, cloud and emerging tech, and places IT talent that ships. Bengaluru, India.",
  // `keywords` removed site-wide (OP-08): ignored by every major engine since
  // 2009, and a visible tell of dated SEO practice to anyone reading source.
  authors: [{ name: COMPANY.name }],
  creator: COMPANY.name,
  publisher: COMPANY.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  // Search Console / Bing verification (AN-02). Set the env vars in Vercel;
  // the tags render only when a value is present, so no empty meta ships.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

/**
 * One Organization node, one @id, referenced by everything else.
 *
 * The homepage previously emitted three competing top-level entities — an
 * Organization, an EducationalOrganization and a second Organization carrying
 * a self-declared `aggregateRating` of 3.8 from 150 reviews with no reviews
 * anywhere on the page. Self-serving review markup on Organization is
 * unsupported by Google and a documented cause of manual spam actions, so it
 * is gone entirely and must not come back (P0-05). Entity fragmentation across
 * the other two blocked Knowledge-Panel consolidation (SD-01).
 *
 * These render as plain `<script type="application/ld+json">` in the delivered
 * HTML rather than through the React payload, so Bing, LinkedIn, Slack and
 * LLM crawlers — none of which execute JS — actually see them (SD-02).
 */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "EducationalOrganization"],
  "@id": ORGANIZATION_ID,
  name: COMPANY.name,
  legalName: COMPANY.legalName,
  alternateName: COMPANY.shortName,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: COMPANY.logo,
    width: 512,
    height: 512,
  },
  image: COMPANY.logo,
  description: COMPANY.description,
  foundingDate: String(new Date().getFullYear() - METRICS.yearsOfExperience),
  telephone: `+${CONTACT.phoneHref.replace(/^\+/, "")}`,
  email: CONTACT.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT.address.street,
    addressLocality: CONTACT.address.locality,
    addressRegion: CONTACT.address.region,
    postalCode: CONTACT.address.postalCode,
    addressCountry: CONTACT.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: CONTACT.geo.latitude,
    longitude: CONTACT.geo.longitude,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:30",
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: `+${CONTACT.phoneHref.replace(/^\+/, "")}`,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English"],
    },
  ],
  sameAs: [...SOCIAL_PROFILES],
};

/** WebSite + SearchAction — sitelinks search box eligibility (CR-07). */
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: COMPANY.name,
  publisher: { "@id": ORGANIZATION_ID },
  inLanguage: "en-IN",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/blog?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <meta
          name="p:domain_verify"
          content="3fbce1b134b233e5e76e30c8b3e00d78"
        />
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

        {/* Leadfeeder Script */}
        <Script
          id="leadfeeder-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
      (function(ss,ex){
        window.ldfdr = window.ldfdr || function(){
          (ldfdr._q = ldfdr._q || []).push([].slice.call(arguments));
        };
        (function(d,s){
          var fs = d.getElementsByTagName(s)[0];
          function ce(src){
            var cs = d.createElement(s);
            cs.src = src;
            cs.async = 1;
            fs.parentNode.insertBefore(cs,fs);
          };
          ce('https://sc.lfeeder.com/lftracker_v1_' + ss + (ex ? '_' + ex : '') + '.js');
        })(document,'script');
      })('lYNOR8x5q2N7WQJZ');
    `,
          }}
        />

        {/* RB2B Script */}
        {/* <Script
          id="rb2b-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
      !function(key) {
        if (window.reb2b) return;
        window.reb2b = { loaded: true };
        var s = document.createElement("script");
        s.async = true;
        s.src = "https://ddwl4m2hdecbv.cloudfront.net/b/" + key + "/" + key + ".js.gz";
        document.getElementsByTagName("script")[0].parentNode.insertBefore(
          s,
          document.getElementsByTagName("script")[0]
        );
      }("QO92DHZ7PPN7");
    `,
          }}
        /> */}

        {/* Organization + WebSite schema — one entity, one @id, emitted as
            real script tags in the delivered HTML (SD-01, SD-02, CR-07). */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />

        {/* Google Translate Init Script */}
        {/* <Script
          id="google-translate-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'ar,fr,hi,es,de,zh,ru,pt,it,ja',
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE
              }, 'google_translate_element');
            }
          `,
          }}
        />

        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        /> */}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
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

        {/* <div
          id="google_translate_element"
          className="fixed top-4 right-4 z-50"
        ></div> */}

        <ClientProvider>
          {/* <AnnouncementTicker /> */}
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
