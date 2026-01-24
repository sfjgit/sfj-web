// ============================================
// app/api/nm/fetch-caspa-details/route.ts
// ============================================
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL || "http://localhost:4003"; // ============================================
// app/api/nm/update-user-details/route.ts
// ============================================
export async function PUT(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const phoneNumber = cookieStore.get("nm_phone_verified")?.value;

    if (!phoneNumber) {
      return NextResponse.json(
        { success: false, message: "Not verified" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const response = await fetch(`${BACKEND_URL}/nm/update-user-details`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phoneNumber,
        ...body,
      }),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
