/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/nm/clear-verification/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();

    // Delete verification cookies
    cookieStore.delete("nm_verified");
    cookieStore.delete("nm_phone_verified");

    return NextResponse.json({
      success: true,
      message: "Verification cleared successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
