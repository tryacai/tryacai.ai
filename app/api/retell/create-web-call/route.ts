import { NextResponse } from "next/server";

export async function POST() {
  try {
    const RETELL_API_KEY = process.env.RETELL_API_KEY;
    const RETELL_AGENT_ID = process.env.RETELL_AGENT_ID;

    if (!RETELL_API_KEY || !RETELL_AGENT_ID) {
      return NextResponse.json(
        { error: "Missing credentials" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.retellai.com/v2/create-web-call", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RETELL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ agent_id: RETELL_AGENT_ID }),
    });

    if (!response.ok) {
      throw new Error("Failed to create web call");
    }

    const { access_token } = await response.json();
    return NextResponse.json({ access_token });

  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown server error";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
