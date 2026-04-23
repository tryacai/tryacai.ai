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
    const fullName = body.full_name?.trim() || "";
    const businessEmail = body.business_email?.trim() || "";
    const phoneNumber = body.phone_number?.trim() || "";
    if (!fullName || !businessEmail || !phoneNumber) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.MAKE_WEBHOOK_URL;
    if (!webhookUrl) {
      return NextResponse.json(
        { success: false, error: "MAKE_WEBHOOK_URL is not configured." },
        { status: 500 }
      );
    }

    const payload = {
      sheet_name: "Website_Leads",
      submitted_at: new Date().toISOString(),
      qualification_status: "new",
      company_name: body.company_name?.trim() || "",
      full_name: fullName,
      business_email: businessEmail,
      phone_number: phoneNumber,
      source: "website",
      booked_call: false,
      call_date: "",
      campaign_name: "",
      ad_set_name: "",
      ad_name: "",
      notes: body.message?.trim() || "",
    };

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 200) {
        return NextResponse.json({ success: true });
      }

      const error = await response.text();
      return NextResponse.json(
        { success: false, error: error || "Make webhook request failed." },
        { status: response.status }
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Make webhook request failed.";

      return NextResponse.json(
        { success: false, error: message },
        { status: 500 }
      );
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected server error.";

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
