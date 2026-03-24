"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
  coupon: {
    _id: string;
    code: string;
    type: "percentage" | "fixed";
    discount: number;
    expiresAt: string;
    isActive: boolean;
    usageLimit?: number;
    usedCount: number;
    minPurchaseAmount?: number;
  };
}

export default function PaymentSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const paymentId = searchParams.get("paymentId");

  const [purchaseData, setPurchaseData] = useState<UpdatedPurchase | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updatePaymentStatus = async () => {
      if (!paymentId) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/purchase-details/${paymentId}`
        );

        toast.success("Payment confirmed and updated.");
        setPurchaseData(response.data?.data);
      } catch (error: any) {
        console.error("Error updating purchase:", error);
        toast.error("Failed to update payment status.");
      } finally {
        setLoading(false);
      }
    };

    updatePaymentStatus();
  }, [paymentId]);

  // ✅ Loading UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 m-4">
        <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
          Payment Successful
        </h2>

        {purchaseData && (
          <>
            <div className="flex justify-between border-t pt-2">
              <span>Status</span>
              <span className="text-green-600 font-semibold">
                {purchaseData.status}
              </span>
            </div>

            <div className="flex justify-between border-t pt-2">
              <span>Currency</span>
              <span>{purchaseData.currency}</span>
            </div>

            <div className="flex justify-between border-t pt-2">
              <span>Amount</span>
              <span>{purchaseData.amount}</span>
            </div>

            <div className="flex justify-between border-t pt-2">
              <span>Order ID</span>
              <span>{purchaseData.orderId}</span>
            </div>

            <div className="flex justify-between border-t pt-2">
              <span>Updated At</span>
              <span>{new Date(purchaseData.updatedAt).toLocaleString()}</span>
            </div>
          </>
        )}

        {purchaseData?.coupon && (
          <>
            <div className="mt-4 text-blue-700 font-semibold">
              Coupon Applied
            </div>

            <div className="flex justify-between border-t pt-2">
              <span>Code</span>
              <span className="uppercase">{purchaseData.coupon.code}</span>
            </div>

            <div className="flex justify-between border-t pt-2">
              <span>Discount</span>
              <span className="text-red-600">
                {purchaseData.coupon.type === "percentage"
                  ? `${purchaseData.coupon.discount}%`
                  : `₹${purchaseData.coupon.discount}`}
              </span>
            </div>

            <div className="flex justify-between border-t pt-2">
              <span>Used Count</span>
              <span>{purchaseData.coupon.usedCount}</span>
            </div>

            <div className="flex justify-between border-t pt-2">
              <span>Expires At</span>
              <span>
                {new Date(purchaseData.coupon.expiresAt).toLocaleDateString()}
              </span>
            </div>
          </>
        )}

        <div className="mt-6 space-y-3">
          <button
            className="w-full py-2 px-4 bg-green-600 text-white rounded-md"
            onClick={() => router.push("/")}
          >
            Go to Dashboard
          </button>

          <button
            className="w-full py-2 px-4 border rounded-md"
            onClick={() => router.push("/courses")}
          >
            Browse More Courses
          </button>
        </div>
      </div>
    </section>
  );
}
