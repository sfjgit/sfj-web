/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/nm/send-phone-otp/route.ts
import { NextRequest, NextResponse } from "next/server";

const NEXT_PUBLIC_EXPRESS_BACKEND_URL =
  process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL || "http://localhost:4003";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log(body, "body", NEXT_PUBLIC_EXPRESS_BACKEND_URL);

    const response = await fetch(
      `${NEXT_PUBLIC_EXPRESS_BACKEND_URL}/nm/send-phone-otp`,
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

    return NextResponse.json(data);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
