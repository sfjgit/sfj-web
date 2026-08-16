import ContactForm from "./ContactPage";
import { CONTACT, COMPANY } from "@/config/site";

/**
 * The contact page used to be a `"use client"` component wrapped in a Suspense
 * boundary whose fallback was the bare text "Loading...". Because the form read
 * `useSearchParams()`, Next bailed out of server-rendering the whole subtree —
 * so the delivered HTML for /contact contained 0 `<input>`, 0 `<label>` and
 * 0 `<h1>` elements (P0-08, A11-03, A11-04). One JS error and the only inbound
 * lead channel went dark silently.
 *
 * The `type` query parameter is now read on the server and handed down as a
 * prop, which removes the bail-out: the form markup, its labels and the NAP
 * block below all render in the initial HTML.
 */
export default function ContactWrapper({
  defaultType,
}: {
  defaultType?: string;
}) {
  return (
    <>
      <ContactForm defaultType={defaultType} />

      {/* Server-rendered name/address/phone. Local-SEO signal, and the fallback
          route to a human if the form ever fails. */}
      <section
        aria-labelledby="contact-details-heading"
        className="bg-white px-4 py-14 sm:px-6 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <h2
            id="contact-details-heading"
            className="text-2xl font-bold tracking-tight text-gray-900"
          >
            Reach us directly
          </h2>
          <address className="mt-4 not-italic leading-relaxed text-gray-700">
            <strong className="font-semibold text-gray-900">
              {COMPANY.legalName}
            </strong>
            <br />
            {CONTACT.address.street}
            <br />
            {CONTACT.address.locality}, {CONTACT.address.region}{" "}
            {CONTACT.address.postalCode}, India
            <br />
            <a
              className="text-blue-700 underline-offset-4 hover:underline"
              href={`tel:${CONTACT.phoneHref}`}
            >
              {CONTACT.phoneDisplay}
            </a>
            {" · "}
            <a
              className="text-blue-700 underline-offset-4 hover:underline"
              href={`mailto:${CONTACT.email}`}
            >
              {CONTACT.email}
            </a>
          </address>
          <p className="mt-3 text-sm text-gray-600">
            Office hours: Monday to Friday, 9:00 am – 6:30 pm IST.
          </p>
        </div>
      </section>
    </>
  );
}
