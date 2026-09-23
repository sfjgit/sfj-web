import { ORGANIZATION_ID, WEBSITE_ID, canonical } from "@/config/site";

/**
 * Reusable FAQ accordion + FAQPage schema, rendered from one array.
 *
 * Same design and rules as HomeFaq: native <details>/<summary> so answers
 * stay in the delivered HTML while collapsed, question headings as H3 under
 * one H2, and schema text identical to the visible text. Server component.
 *
 * Use at most ONE FaqSection per page — Google expects a single FAQPage
 * entity per URL.
 */
export type Faq = { question: string; answer: string };

type Props = {
  //   faqs: Faq[];
  /** Site-relative path of the page this renders on, e.g. "/services/taas". */
  path: string;
  heading?: string;
  subheading?: string;
};

export default function FaqSection({ path }: Props) {
  const headingId = `faq-heading-${path.replace(/[^a-z0-9]+/gi, "-")}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${canonical(path)}#faq`,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    // mainEntity: faqs.map(({ question, answer }) => ({
    //   "@type": "Question",
    //   name: question,
    //   acceptedAnswer: { "@type": "Answer", text: answer },
    // })),
  };

  return (
    <section aria-labelledby={headingId} className="mx-auto max-w-3xl px-6">
      {/* <div className="text-center">
        <h2
          id={headingId}
          className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl"
        >
          {heading}
        </h2>
        {subheading && (
          <p className="mt-3 text-base text-gray-600">{subheading}</p>
        )}
      </div> */}

      {/* <div className="mt-12 space-y-3">
        {faqs.map(({ question, answer }, i) => (
          <details
            key={question}
            name={headingId}
            open={i === 0}
            className="group rounded-xl border border-gray-200 bg-white transition-colors open:border-gray-300 open:bg-gray-50"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
              <h3 className="text-base font-medium text-gray-900 sm:text-lg">
                {question}
              </h3>
              <span
                aria-hidden="true"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  className="h-4 w-4"
                >
                  <path
                    d="M5 7.5l5 5 5-5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </summary>
            <div className="px-5 pb-5 pr-16 leading-7 text-gray-600">
              {answer}
            </div>
          </details>
        ))}
      </div> */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  );
}
