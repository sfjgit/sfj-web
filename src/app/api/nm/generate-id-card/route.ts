// ============================================
// app/api/nm/generate-id-card/route.ts

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL || "http://localhost:4003";
// ============================================
export async function POST(req: NextRequest) {
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

    const response = await fetch(`${BACKEND_URL}/nm/generate-id-card`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phoneNumber,
        ...body,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }

    // Get the image as binary buffer
    const imageBuffer = await response.arrayBuffer();

    // Return the image directly
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `attachment; filename="NM-ID-${body.caspaId}.png"`,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
