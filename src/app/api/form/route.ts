import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // For now, just log it so we can confirm it's working
    console.log("Form submission received:", data);

    // TODO: send an email, save to database, etc.
    // (once this works, we can copy whatever contact/route.ts does)

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in /api/form:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
