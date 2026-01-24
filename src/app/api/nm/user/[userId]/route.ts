/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/nm/user/[userId]/route.ts
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL || "http://localhost:4003";

interface RouteParams {
  params: Promise<{ userId: string }>;
}

export async function GET(req: NextRequest, context: RouteParams) {
  try {
    const { userId } = await context.params;

    console.log("🔍 Fetching user from backend:", userId);

    const response = await fetch(`${BACKEND_URL}/nm/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Don't cache this request
    });

    const data = await response.json();

    console.log("📦 Backend response:", data);

    if (!response.ok) {
      console.error("❌ Backend error:", data);
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("❌ Get user API error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
