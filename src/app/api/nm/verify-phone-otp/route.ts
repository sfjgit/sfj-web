/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/nm/verify-phone-otp/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const NEXT_PUBLIC_EXPRESS_BACKEND_URL =
  process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL || "http://localhost:4003";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await fetch(
      `${NEXT_PUBLIC_EXPRESS_BACKEND_URL}/nm/verify-phone-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    // If verification successful, set secure HTTP-only cookie
    if (data.success) {
      const cookieStore = await cookies();

      // Store phone number in secure HTTP-only cookie
      cookieStore.set("nm_phone_verified", body.phoneNumber, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      // Store verification status
      cookieStore.set("nm_verified", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
