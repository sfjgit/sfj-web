import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { token, title, body } = await req.json();

  const response = await fetch("https://fcm.googleapis.com/fcm/send", {
    method: "POST",
    headers: {
      Authorization: `key=YOUR_SERVER_KEY`, // FCM server key from Firebase
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: token,
      notification: { title, body },
    }),
  });

  const data = await response.json();
  return NextResponse.json(data);
}
