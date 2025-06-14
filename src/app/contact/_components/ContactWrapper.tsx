"use client";

import { Suspense } from "react";
import ContactForm from "./ContactPage";
// import ContactForm from "../page";
// import CareersPage from "./CareersPage";

function ContactsContent() {
  return <ContactForm />;
}

export default function ContactWrapper() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <ContactsContent />
    </Suspense>
  );
}
