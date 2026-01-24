"use client";
import React, { Suspense } from "react";
import IDCardPreviewPage from "./_components/IDCardPreviewPage";

export default function Preview() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <IDCardPreviewPage />
    </Suspense>
  );
}
