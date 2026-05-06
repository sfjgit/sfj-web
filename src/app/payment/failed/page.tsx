// app/payment/failed/page.tsx
import { Suspense } from "react";
import PaymentFailedContent from "./PaymentFailedContent";

export const metadata = {
  title: "Payment Failed — bSkilling",
};

export default function PaymentFailedPage() {
  return (
    <Suspense fallback={<PaymentFailedSkeleton />}>
      <PaymentFailedContent />
    </Suspense>
  );
}

function PaymentFailedSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mx-auto" />
        <p className="mt-4 text-gray-600">Loading payment details...</p>
      </div>
    </div>
  );
}
