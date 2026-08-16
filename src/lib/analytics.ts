/**
 * Thin GTM dataLayer wrapper.
 *
 * The audit (AN-01) found the GTM container loading on every page with zero
 * dataLayer pushes anywhere in the shipped markup — so there was no way to
 * attribute an enquiry to a service line, and marketing spend was being
 * allocated blind. These are the events in the measurement plan; mark
 * `form_submit` as a GA4 key event and import it to Google Ads.
 */

type DataLayerEvent = Record<string, unknown> & { event: string };

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

function push(payload: DataLayerEvent): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

/** A contact/enquiry form was submitted successfully. GA4 key event. */
export function trackFormSubmit(params: {
  formName: string;
  serviceLine?: string;
  landingPage?: string;
}): void {
  push({
    event: "form_submit",
    form_name: params.formName,
    service_line: params.serviceLine ?? "unspecified",
    landing_page:
      params.landingPage ??
      (typeof window !== "undefined" ? window.location.pathname : ""),
  });
}

/** A form submission failed — needed to alert on submission drop-off. */
export function trackFormError(params: {
  formName: string;
  reason: string;
}): void {
  push({
    event: "form_error",
    form_name: params.formName,
    error_reason: params.reason,
  });
}

/** Any primary call-to-action click, tagged with the service line it sells. */
export function trackCtaClick(params: {
  label: string;
  serviceLine?: string;
  destination?: string;
}): void {
  push({
    event: "cta_click",
    cta_label: params.label,
    service_line: params.serviceLine ?? "unspecified",
    destination: params.destination ?? "",
  });
}

/** A `tel:` link was clicked. */
export function trackPhoneClick(phone: string): void {
  push({ event: "phone_click", phone_number: phone });
}

/** An `mailto:` link was clicked. */
export function trackEmailClick(email: string): void {
  push({ event: "email_click", email_address: email });
}
