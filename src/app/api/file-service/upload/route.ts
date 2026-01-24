/* eslint-disable @typescript-eslint/no-explicit-any */
// ============================================
// app/api/file-service/upload/route.ts
// (Proxy to your file service)

import { NextRequest, NextResponse } from "next/server";

// ============================================
const FILE_SERVICE_URL =
  process.env.NEXT_PUBLIC_FILE_SERVICE_URL || "http://localhost:4006";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    console.log("📦 FormData:", formData);

    const response = await fetch(`${FILE_SERVICE_URL}/nm/file/upload`, {
      method: "POST",
      body: formData,

      //   headers: {
      //     // Add authorization if needed
      //     // 'Authorization': `Bearer ${token}`
      //   },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
