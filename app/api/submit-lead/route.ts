import { NextResponse } from "next/server";

type SubmitLeadPayload = {
  full_name?: string;
  business_email?: string;
  phone_number?: string;
  company_name?: string;
  industry?: string;
  biggest_lead_bottleneck?: string;
  systems_interested_in?: string;
  message?: string;
  sms_consent?: boolean;
  found_from?: string;
  booked_call?: boolean;
  call_date?: string;
  company_website?: string;
};

const suspiciousTextPattern = /(https?:\/\/|www\.|\b(crypto|bitcoin|casino|viagra|porn|seo|backlink|loan)\b)/i;
const repeatedCharactersPattern = /(.)\1{4,}/;

function isLikelyRealName(input: string) {
  const trimmed = input.trim();
  const parts = trimmed.split(/\s+/).filter(Boolean);

  if (parts.length < 2) {
    return false;
  }

  if (!/^[a-zA-Z][a-zA-Z'\- ]*[a-zA-Z]$/.test(trimmed)) {
    return false;
  }

  if (parts.some((part) => part.length < 2)) {
    return false;
  }

  if (repeatedCharactersPattern.test(trimmed.toLowerCase())) {
    return false;
  }

  return true;
}

function looksLikeSpam(input: string) {
  const trimmed = input.trim();
  if (!trimmed) {
    return false;
  }

  if (suspiciousTextPattern.test(trimmed)) {
    return true;
  }

  if (repeatedCharactersPattern.test(trimmed.toLowerCase())) {
    return true;
  }

  return false;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SubmitLeadPayload;

    // Honeypot check
    if (body.company_website && body.company_website.trim().length > 0) {
      // Silently reject bot submissions
      return NextResponse.json({ success: true });
    }

    const fullName = body.full_name?.trim() || "";
    const businessEmail = body.business_email?.trim() || "";
    const phoneNumber = body.phone_number?.trim() || "";
    const companyName = body.company_name?.trim() || "";
    const industry = body.industry?.trim() || "";
    const biggestLeadBottleneck = body.biggest_lead_bottleneck?.trim() || "";
    const systemsInterestedIn = body.systems_interested_in?.trim() || "";
    const message = body.message?.trim() || "";
    const smsConsent = Boolean(body.sms_consent);
    const foundFrom = body.found_from?.trim() || "";
    const bookedCall = Boolean(body.booked_call);
    const callDate = body.call_date?.trim() || "";

    if (
      !fullName ||
      !businessEmail ||
      !phoneNumber ||
      !companyName ||
      !industry ||
      !biggestLeadBottleneck ||
      !smsConsent
    ) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    if (!isLikelyRealName(fullName)) {
      return NextResponse.json(
        { error: "Please enter a real first and last name." },
        { status: 400 }
      );
    }

    if (looksLikeSpam(companyName) || looksLikeSpam(message || "")) {
      return NextResponse.json(
        { error: "Submission blocked. Please remove spammy links/keywords and try again." },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.MAKE_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("[submit-lead] MAKE_WEBHOOK_URL is not configured.");
      return NextResponse.json(
        { error: "Server configuration error. Please try again later." },
        { status: 500 }
      );
    }

    const payload = {
      submitted_at: new Date().toISOString(),
      full_name: fullName,
      business_email: businessEmail,
      phone_number: phoneNumber,
      company_name: companyName,
      industry,
      biggest_lead_bottleneck: biggestLeadBottleneck,
      systems_interested_in: systemsInterestedIn,
      message,
      source: "website_form",
      found_from: foundFrom,
      booked_call: bookedCall ? "yes" : "no",
      call_date: callDate,
    };

    console.log("[submit-lead] Forwarding payload to Make.com:", {
      ...payload,
      business_email: "***",
      phone_number: "***",
    });

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "No response body");
      console.error(
        `[submit-lead] Make.com webhook returned ${response.status}: ${errorText}`
      );
      return NextResponse.json(
        { error: "Failed to process submission. Please try again." },
        { status: 502 }
      );
    }

    console.log("[submit-lead] Successfully forwarded to Make.com");

    return NextResponse.json({
      success: true,
      booked_call: bookedCall,
      call_date: callDate || null,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected server error.";
    console.error("[submit-lead] Error:", message);

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
