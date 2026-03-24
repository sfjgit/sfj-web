// app/payment/callback/page.tsx
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import PaymentCallbackContent from "./PaymentCallbackContent";

export const metadata = {
  title: "Verifying Payment — SFJBS",
};

export default function PaymentCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        </div>
      }
    >
      <PaymentCallbackContent />
    </Suspense>
  );
}
