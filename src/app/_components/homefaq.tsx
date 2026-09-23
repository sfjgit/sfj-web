import { COMPANY, ORGANIZATION_ID, WEBSITE_ID, canonical } from "@/config/site";

/**
 * Homepage FAQ — visible Q&A and FAQPage schema from ONE array.
 *
 * Google only honours FAQPage markup when every question and answer is
 * visible on the page, word for word. Rendering both from the same data makes
 * drift impossible. Server component: the questions, answers and JSON-LD are
 * all in the delivered HTML, so non-JS crawlers (LLM bots, Bing) see them.
 *
 * Every answer must be a claim the business can stand behind. The figures
 * below mirror HOME_DESCRIPTION in page.tsx; the lines marked TODO need a
 * human to confirm or replace them before shipping.
 */
type Faq = { question: string; answer: string };

const FAQS: Faq[] = [
  {
    question: "What does SFJBS do?",
    answer:
      "SFJ Business Solutions (SFJBS) is an enterprise upskilling and IT talent partner based in Bengaluru, India. We train enterprise, campus and government workforces in AI, cloud and emerging technologies, and we place skilled IT professionals with companies that need them.",
  },
  {
    question: "Who does SFJBS train?",
    answer:
      "We work with three groups: enterprises reskilling their technology teams, universities and colleges preparing students for industry roles, and government bodies building digital capability. Over 15 years we have upskilled more than 300,000 professionals.",
  },
  {
    question: "Which technologies does SFJBS offer training in?",
    // TODO: replace with your actual core catalogue (keep it to 6–10 items).
    answer:
      "Our programs cover artificial intelligence and machine learning, generative AI, cloud platforms, data engineering, cybersecurity, DevOps and full-stack development, among other emerging technologies.",
  },
  {
    question: "Can SFJBS customise a training program for our company?",
    // TODO: confirm delivery formats you actually offer.
    answer:
      "Yes. Enterprise programs are designed around your team's current skill levels, your technology stack and your business goals, and can be delivered on-site, live online or in a blended format.",
  },
  {
    question: "Does SFJBS provide IT staffing and talent placement?",
    // TODO: confirm models (contract, contract-to-hire, permanent).
    answer:
      "Yes. Alongside training, we place job-ready IT professionals with client companies, drawing on the talent we have trained and assessed ourselves.",
  },
  {
    question: "Where is SFJBS located?",
    answer:
      "Our head office is in Bengaluru, Karnataka, India. We deliver training for clients across India and internationally.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${canonical("/")}#faq`,
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": ORGANIZATION_ID },
  mainEntity: FAQS.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export default function HomeFaq() {
  return (
    <section
      aria-labelledby="home-faq-heading"
      className="mx-auto max-w-3xl px-6 py-20"
    >
      <div className="text-center">
        <h2
          id="home-faq-heading"
          className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl"
        >
          Frequently asked questions
        </h2>
        <p className="mt-3 text-base text-gray-600">
          Everything you need to know about working with {COMPANY.shortName}.
        </p>
      </div>

      {/*
        Native <details>/<summary> rather than a JS accordion: the answers stay
        in the delivered HTML while collapsed, so crawlers and the FAQPage
        schema still match the page, it works with JavaScript off, and keyboard
        and screen-reader support come built in. The shared `name` makes it an
        exclusive accordion (opening one closes the others) in current
        browsers; older ones simply allow several open at once.
      */}
      <div className="mt-12 space-y-3">
        {FAQS.map(({ question, answer }, i) => (
          <details
            key={question}
            name="home-faq"
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
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  );
}
