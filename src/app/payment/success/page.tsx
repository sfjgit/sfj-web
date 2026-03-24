// app/payment/success/page.tsx
import { Suspense } from "react";
import PaymentSuccessContent from "./PaymentSuccessContent";

export const metadata = {
  title: "Payment Successful — bSkilling",
};

function PaymentSuccessSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto" />
        <p className="mt-4 text-gray-600">Loading payment details...</p>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<PaymentSuccessSkeleton />}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
