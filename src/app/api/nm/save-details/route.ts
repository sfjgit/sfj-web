/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/nm/save-details/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL || "http://localhost:4003";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();

    // Check if verified
    const isVerified = cookieStore.get("nm_verified")?.value === "true";
    const phoneNumber = cookieStore.get("nm_phone_verified")?.value;

    if (!isVerified || !phoneNumber) {
      return NextResponse.json(
        { success: false, message: "Not verified" },
        { status: 401 }
      );
    }

    const body = await req.json();

    // Send to Express backend
    const response = await fetch(`${BACKEND_URL}/nm/save-details`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber,
        ...body,
      }),
    });

    if (!response.ok) {
      // If error, parse as JSON
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
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
