import { NextResponse } from "next/server";

const API_URL =
  process.env.NEXT_PUBLIC_SFJ_BACKEND_URL || "http://localhost:8008";

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/api/announcements`, {
      method: "GET",
      cache: "no-store",
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Public announcements proxy error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load announcements",
        data: [],
      },
      {
        status: 500,
      },
    );
  }
}
