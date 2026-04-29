import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { scenario = 'acai' } = body;

    console.log("[API] Received scenario:", scenario);

    // Validate scenario
    const validScenarios = ['acai', 'plumbing', 'barber'];
    if (!validScenarios.includes(scenario)) {
      console.error("[API] Invalid scenario:", scenario);
      return NextResponse.json(
        { error: "Invalid scenario" },
        { status: 400 }
      );
    }

    const RETELL_API_KEY = process.env.RETELL_API_KEY_CRM;
    
    // Select the correct agent ID based on scenario
    let RETELL_AGENT_ID: string | undefined;
    switch (scenario) {
      case 'acai':
        RETELL_AGENT_ID = process.env.RETELL_AGENT_ID_ACAI;
        break;
      case 'plumbing':
        RETELL_AGENT_ID = process.env.RETELL_AGENT_ID_PLUMBING;
        break;
      case 'barber':
        RETELL_AGENT_ID = process.env.RETELL_AGENT_ID_BARBER;
        break;
      default:
        RETELL_AGENT_ID = undefined;
    }

    console.log("[API] Selected agent ID for scenario:", scenario, "- Agent ID exists:", !!RETELL_AGENT_ID);

    if (!RETELL_API_KEY) {
      console.error("[API] Missing Retell API key");
      return NextResponse.json(
        { error: "Missing API credentials" },
        { status: 500 }
      );
    }

    if (!RETELL_AGENT_ID) {
      console.error(`[API] Missing Retell Agent ID for scenario: ${scenario}`);
      return NextResponse.json(
        { error: `Missing Agent ID for scenario: ${scenario}` },
        { status: 400 }
      );
    }

    console.log("[API] Calling Retell API...");
    const response = await fetch("https://api.retellai.com/v2/create-web-call", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RETELL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ agent_id: RETELL_AGENT_ID }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[API] Retell API error:", response.status, errorText);
      return NextResponse.json(
        { error: errorText || "Retell API failed" },
        { status: response.status }
      );
    }

    const { access_token } = await response.json();
    console.log("[API] Successfully created web call");
    return NextResponse.json({ access_token });

  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown server error";
    
    console.error("[API] Unexpected error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
