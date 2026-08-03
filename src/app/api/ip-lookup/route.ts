import { NextRequest, NextResponse } from "next/server";

const IPINFO_TOKEN = process.env.IPINFO_TOKEN!;

export async function GET(req: NextRequest) {
  try {
    // Get the visitor's IP address
    const forwardedFor = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");

    const ip = forwardedFor?.split(",")[0].trim() || realIp || "8.8.8.8"; // fallback for local development

    // Call IPInfo API
    const response = await fetch(
      `https://ipinfo.io/${ip}?token=${IPINFO_TOKEN}`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: "IP lookup failed" },
        { status: response.status },
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      visitor: {
        ip: data.ip,
        city: data.city,
        region: data.region,
        country: data.country,
        organization: data.org,
        timezone: data.timezone,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
