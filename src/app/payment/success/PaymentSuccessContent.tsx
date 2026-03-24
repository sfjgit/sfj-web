"use client";
// app/payment/success/PaymentSuccessContent.tsx
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Coupon {
  _id: string;
  code: string;
  type: "percentage" | "fixed";
  discount: number;
  expiresAt: string;
  isActive: boolean;
  usageLimit?: number;
  usedCount: number;
  minPurchaseAmount?: number;
}

interface UpdatedPurchase {
  _id: string;
  userId: string;
  courseId: string;
  orderId: string;
  amount: string;
  currency: string;
  status: "SUCCESS" | "PENDING" | "FAILED";
  createdAt: string;
  updatedAt: string;
  coupon?: Coupon;
}

export default function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const paymentId = searchParams.get("paymentId");

  const [purchaseData, setPurchaseData] = useState<UpdatedPurchase | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!paymentId) {
      setLoading(false);
      return;
    }

    const fetchPurchase = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/purchase-details/${paymentId}`
        );
        setPurchaseData(response.data?.data);
        toast.success("Payment confirmed.");
      } catch (error) {
        console.error("Error fetching purchase:", error);
        toast.error("Failed to load payment details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPurchase();
  }, [paymentId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto" />
          <p className="mt-4 text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 m-4">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-3">
            <svg
              className="w-7 h-7 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900">
            Payment Successful
          </h2>
          <p className="mt-1 text-sm text-gray-500 text-center">
            Your enrollment has been confirmed.
          </p>
        </div>

        {/* Purchase details */}
        {purchaseData && (
          <div className="border border-gray-100 rounded-lg overflow-hidden divide-y divide-gray-100 mb-4">
            <DetailRow label="Status">
              <span className="font-semibold text-green-600">
                {purchaseData.status}
              </span>
            </DetailRow>
            <DetailRow label="Amount">
              <span className="font-medium text-gray-800">
                {purchaseData.currency} {purchaseData.amount}
              </span>
            </DetailRow>
            <DetailRow label="Order ID">
              <span className="font-mono text-xs text-gray-700 break-all text-right max-w-[60%]">
                {purchaseData.orderId}
              </span>
            </DetailRow>
            <DetailRow label="Updated At">
              <span className="text-gray-600 text-xs">
                {new Date(purchaseData.updatedAt).toLocaleString("en-IN")}
              </span>
            </DetailRow>
          </div>
        )}

        {/* Coupon section */}
        {purchaseData?.coupon && (
          <div className="border border-blue-100 rounded-lg overflow-hidden divide-y divide-blue-50 mb-4">
            <div className="px-4 py-2.5 bg-blue-50">
              <span className="text-sm font-semibold text-blue-700">
                Coupon Applied
              </span>
            </div>
            <DetailRow label="Code">
              <span className="font-mono text-xs font-semibold text-gray-800 uppercase tracking-wider">
                {purchaseData.coupon.code}
              </span>
            </DetailRow>
            <DetailRow label="Discount">
              <span className="font-semibold text-green-600">
                {purchaseData.coupon.type === "percentage"
                  ? `${purchaseData.coupon.discount}% off`
                  : `₹${purchaseData.coupon.discount} off`}
              </span>
            </DetailRow>
            <DetailRow label="Expires">
              <span className="text-gray-600 text-xs">
                {new Date(purchaseData.coupon.expiresAt).toLocaleDateString(
                  "en-IN"
                )}
              </span>
            </DetailRow>
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 space-y-3">
          <button
            className="w-full py-2.5 px-4 bg-green-600 hover:bg-green-700 transition-colors text-white text-sm font-medium rounded-lg"
            onClick={() => router.push("/")}
          >
            Go to Dashboard
          </button>
          <button
            className="w-full py-2.5 px-4 border border-gray-200 hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 rounded-lg"
            onClick={() => router.push("/courses")}
          >
            Browse More Courses
          </button>
        </div>
      </div>
    </section>
  );
}

function DetailRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3 text-sm">
      <span className="text-gray-500 shrink-0">{label}</span>
      {children}
    </div>
  );
}
