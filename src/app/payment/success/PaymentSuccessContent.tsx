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

// ── Invoice generator — pure frontend, no backend needed ─────────────────────

function downloadInvoice(purchase: UpdatedPurchase) {
  const invoiceNumber = `INV-${purchase.orderId
    .replace(/[^A-Z0-9]/gi, "")
    .toUpperCase()
    .slice(-10)}`;
  const issuedDate = new Date(purchase.updatedAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const amount = parseFloat(purchase.amount);
  const gstRate = 18;
  const baseAmount = +(amount / (1 + gstRate / 100)).toFixed(2);
  const gstAmount = +(amount - baseAmount).toFixed(2);
  const discountAmount = purchase.coupon
    ? purchase.coupon.type === "percentage"
      ? +((baseAmount * purchase.coupon.discount) / 100).toFixed(2)
      : purchase.coupon.discount
    : 0;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Invoice ${invoiceNumber}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Inter', sans-serif;
      background: #fff;
      color: #111;
      padding: 48px;
      font-size: 13px;
      line-height: 1.6;
    }

    /* ── Header ── */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding-bottom: 28px;
      border-bottom: 2px solid #e5e7eb;
      margin-bottom: 32px;
    }
    .logo-block img {
      height: 48px;
      object-fit: contain;
    }
    .logo-block .company-name {
      font-size: 20px;
      font-weight: 700;
      color: #111;
      margin-top: 6px;
    }
    .logo-block .company-sub {
      font-size: 11px;
      color: #6b7280;
    }
    .invoice-meta {
      text-align: right;
    }
    .invoice-meta .invoice-title {
      font-size: 28px;
      font-weight: 700;
      color: #2563eb;
      letter-spacing: -0.5px;
    }
    .invoice-meta .invoice-number {
      font-size: 12px;
      color: #6b7280;
      margin-top: 4px;
    }
    .invoice-meta .invoice-date {
      font-size: 12px;
      color: #374151;
      margin-top: 2px;
    }

    /* ── Status badge ── */
    .status-badge {
      display: inline-block;
      background: #d1fae5;
      color: #065f46;
      font-size: 11px;
      font-weight: 600;
      padding: 3px 10px;
      border-radius: 999px;
      margin-top: 6px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* ── Addresses ── */
    .addresses {
      display: flex;
      justify-content: space-between;
      margin-bottom: 32px;
      gap: 40px;
    }
    .address-block {
      flex: 1;
    }
    .address-block .label {
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #9ca3af;
      margin-bottom: 8px;
    }
    .address-block .name {
      font-weight: 600;
      font-size: 14px;
      color: #111;
    }
    .address-block .detail {
      color: #6b7280;
      font-size: 12px;
    }

    /* ── Items table ── */
    .items-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
    }
    .items-table thead tr {
      background: #f9fafb;
      border-bottom: 1px solid #e5e7eb;
    }
    .items-table th {
      padding: 10px 14px;
      text-align: left;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      color: #6b7280;
    }
    .items-table th:last-child,
    .items-table td:last-child {
      text-align: right;
    }
    .items-table tbody tr {
      border-bottom: 1px solid #f3f4f6;
    }
    .items-table td {
      padding: 12px 14px;
      font-size: 13px;
      color: #374151;
    }
    .items-table td .item-name {
      font-weight: 600;
      color: #111;
    }
    .items-table td .item-sub {
      font-size: 11px;
      color: #9ca3af;
      margin-top: 2px;
    }

    /* ── Totals ── */
    .totals {
      margin-left: auto;
      width: 280px;
      margin-bottom: 32px;
    }
    .totals-row {
      display: flex;
      justify-content: space-between;
      padding: 6px 0;
      font-size: 13px;
      color: #4b5563;
      border-bottom: 1px solid #f3f4f6;
    }
    .totals-row.discount {
      color: #16a34a;
    }
    .totals-row.total {
      padding-top: 10px;
      font-size: 15px;
      font-weight: 700;
      color: #111;
      border-bottom: none;
      border-top: 2px solid #e5e7eb;
      margin-top: 4px;
    }

    /* ── Coupon ── */
    .coupon-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 8px;
      padding: 8px 14px;
      font-size: 12px;
      color: #1d4ed8;
      margin-bottom: 28px;
    }
    .coupon-badge strong {
      font-family: monospace;
      font-size: 13px;
    }

    /* ── Footer ── */
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .footer .note {
      font-size: 11px;
      color: #9ca3af;
      max-width: 320px;
    }
    .footer .thank-you {
      font-size: 13px;
      font-weight: 600;
      color: #2563eb;
    }

    /* ── GST note ── */
    .gst-note {
      font-size: 10px;
      color: #9ca3af;
      margin-top: 4px;
    }

    @media print {
      body { padding: 24px; }
      @page { margin: 0; size: A4; }
    }
  </style>
</head>
<body>

  <!-- Header -->
  <div class="header">
    <div class="logo-block">
      <img src="/logo/sfj-logo.png" alt="SFJ Business Solutions" onerror="this.style.display='none'" />
      <div class="company-name">bSkilling</div>
      <div class="company-sub">SFJ Business Solutions Pvt. Ltd.</div>
      <div class="company-sub">GSTIN: 29AAXCS1234F1Z5 · India</div>
    </div>
    <div class="invoice-meta">
      <div class="invoice-title">INVOICE</div>
      <div class="invoice-number">${invoiceNumber}</div>
      <div class="invoice-date">Issued: ${issuedDate}</div>
      <div><span class="status-badge">✓ Paid</span></div>
    </div>
  </div>

  <!-- Addresses -->
  <div class="addresses">
    <div class="address-block">
      <div class="label">Bill From</div>
      <div class="name">SFJ Business Solutions Pvt. Ltd.</div>
      <div class="detail">bSkilling Platform</div>
      <div class="detail">Bengaluru, Karnataka 560001</div>
      <div class="detail">support@bskilling.com</div>
    </div>
    <div class="address-block" style="text-align:right">
      <div class="label">Bill To</div>
      <div class="name">Student</div>
      <div class="detail">Order ID: ${purchase.orderId}</div>
      <div class="detail">User ID: ${purchase.userId}</div>
    </div>
  </div>

  <!-- Items table -->
  <table class="items-table">
    <thead>
      <tr>
        <th style="width:50%">Description</th>
        <th>HSN/SAC</th>
        <th>GST Rate</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <div class="item-name">Course Enrollment</div>
          <div class="item-sub">Online Education Service · ${
            purchase.currency
          }</div>
        </td>
        <td>9992</td>
        <td>18%</td>
        <td>₹${baseAmount.toFixed(2)}</td>
      </tr>
    </tbody>
  </table>

  <!-- Coupon if applied -->
  ${
    purchase.coupon
      ? `<div class="coupon-badge">
      🏷 Coupon Applied: <strong>${purchase.coupon.code}</strong>
      &nbsp;·&nbsp;
      ${
        purchase.coupon.type === "percentage"
          ? `${purchase.coupon.discount}% off`
          : `₹${purchase.coupon.discount} off`
      }
    </div>`
      : ""
  }

  <!-- Totals -->
  <div class="totals">
    <div class="totals-row">
      <span>Subtotal</span>
      <span>₹${baseAmount.toFixed(2)}</span>
    </div>
    ${
      discountAmount > 0
        ? `<div class="totals-row discount">
      <span>Discount (${purchase.coupon?.code})</span>
      <span>−₹${discountAmount.toFixed(2)}</span>
    </div>`
        : ""
    }
    <div class="totals-row">
      <span>CGST (9%)</span>
      <span>₹${(gstAmount / 2).toFixed(2)}</span>
    </div>
    <div class="totals-row">
      <span>SGST (9%)</span>
      <span>₹${(gstAmount / 2).toFixed(2)}</span>
    </div>
    <div class="totals-row total">
      <span>Total Paid</span>
      <span>₹${amount.toFixed(2)}</span>
    </div>
    <div class="gst-note">GST split as CGST + SGST for intra-state transactions</div>
  </div>

  <!-- Footer -->
  <div class="footer">
    <div class="note">
      This is a computer-generated invoice and does not require a physical signature.
      For queries, contact support@bskilling.com
    </div>
    <div class="thank-you">Thank you for enrolling! 🎓</div>
  </div>

</body>
</html>`;

  // Open in new tab → user prints/saves as PDF
  const win = window.open("", "_blank");
  if (!win) {
    toast.error("Popup blocked. Please allow popups for this site.");
    return;
  }
  win.document.write(html);
  win.document.close();
  win.focus();
  setTimeout(() => {
    win.print();
  }, 600); // slight delay so fonts load
}

// ── Main component ────────────────────────────────────────────────────────────

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
          `${process.env.NEXT_PUBLIC_BACKEND_BSKILLING_URL}/api/purchase-details/${paymentId}`
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
          {/* ── NEW: Download Invoice button ── */}
          {purchaseData && (
            <button
              onClick={() => downloadInvoice(purchaseData)}
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download Invoice
            </button>
          )}

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
