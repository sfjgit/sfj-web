/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/nm/check-verification/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const isVerified = cookieStore.get("nm_verified")?.value === "true";
    const phoneNumber = cookieStore.get("nm_phone_verified")?.value;

    if (!isVerified || !phoneNumber) {
      return NextResponse.json(
        {
          success: false,
          verified: false,
          message: "Not verified",
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      verified: true,
      phoneNumber: phoneNumber,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, verified: false, message: error.message },
      { status: 500 }
    );
  }
}
