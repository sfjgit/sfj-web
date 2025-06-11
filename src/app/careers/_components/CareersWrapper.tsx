// src/app/careers/CareersWrapper.tsx
"use client";

import { Suspense } from "react";
import CareersPage from "./CareersPage";

function CareersContent() {
  return <CareersPage />;
}

export default function CareersWrapper() {
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
      <CareersContent />
    </Suspense>
  );
}
