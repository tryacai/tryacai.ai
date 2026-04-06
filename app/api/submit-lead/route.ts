import { NextResponse } from "next/server";

type SubmitLeadPayload = {
  full_name?: string;
  business_email?: string;
  phone_number?: string;
  company_name?: string;
  industry?: string;
  biggest_lead_bottleneck?: string;
  systems_interested_in?: string;
  call_volume?: string;
  message?: string;
  sms_consent?: boolean;
  ready_to_book?: boolean;
  booking_start_time?: string | null;
  booking_time?: string | null;
  booking_end_time?: string | null;
  booking_event_id?: string | null;
  event_id?: string | null;
  tier_preference?: string;
  demo_requested?: boolean;
};

const GOOGLE_APPS_SCRIPT_ENDPOINT =
  "https://script.google.com/macros/s/AKfycby6UXqt3SZxDEHNR6hUCgTwDuo7Ii6Er1AJ91jJ10E9svxuMsPJwHakE7x4ECln9r02mQ/exec";

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

function getProviderErrorMessage(providerData: Record<string, unknown> | null) {
  if (!providerData) {
    return null;
  }

  const error = providerData.error;
  if (typeof error === "string" && error.trim()) {
    return error.trim();
  }

  const message = providerData.message;
  if (typeof message === "string" && message.trim()) {
    return message.trim();
  }

  const status = providerData.status;
  if (typeof status === "string" && status.toLowerCase() === "error") {
    return "Google Apps Script rejected the submission.";
  }

  return null;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SubmitLeadPayload;

    const fullName = body.full_name?.trim() || "";
    const businessEmail = body.business_email?.trim() || "";
    const phoneNumber = body.phone_number?.trim() || "";
    const companyName = body.company_name?.trim() || "";
    const industry = body.industry?.trim() || "";
    const biggestLeadBottleneck =
      body.biggest_lead_bottleneck?.trim() || body.call_volume?.trim() || "";
    const systemsInterestedIn =
      body.systems_interested_in?.trim() || body.tier_preference?.trim() || "Not Sure Yet";
    const message = body.message?.trim() || "";
    const smsConsent = Boolean(body.sms_consent);
    const readyToBook =
      typeof body.ready_to_book === "boolean" ? body.ready_to_book : Boolean(body.demo_requested);
    const bookingStartTime = body.booking_start_time?.trim() || body.booking_time?.trim() || "";
    const bookingEndTime = body.booking_end_time?.trim() || "";
    const bookingEventId = body.booking_event_id?.trim() || body.event_id?.trim() || "";

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

    if (readyToBook && !bookingEventId) {
      return NextResponse.json(
        { error: "Booking confirmation is required when demo is requested." },
        { status: 400 }
      );
    }

    console.log("[submit-lead] Payload:", {
      fullName,
      businessEmail,
      phoneNumber,
      companyName,
      industry,
      biggestLeadBottleneck,
      systemsInterestedIn,
      readyToBook,
      bookingStartTime,
      bookingEventId,
    });

    const response = await fetch(GOOGLE_APPS_SCRIPT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Accept: "application/json, text/plain, */*",
      },
      body: new URLSearchParams({
        full_name: fullName,
        business_email: businessEmail,
        phone_number: phoneNumber,
        company_name: companyName,
        industry,
        biggest_lead_bottleneck: biggestLeadBottleneck,
        systems_interested_in: systemsInterestedIn,
        message: message || "",
        sms_consent: String(smsConsent),
        ready_to_book: String(readyToBook),
        booking_start_time: bookingStartTime || "",
        booking_end_time: bookingEndTime || "",
        booking_event_id: bookingEventId || "",
        source: "Website Contact Form",
      }).toString(),
      redirect: "follow",
    });

    let providerData: Record<string, unknown> | null = null;
    let providerText = "";
    try {
      providerText = await response.text();
      if (providerText) {
        providerData = JSON.parse(providerText) as Record<string, unknown>;
      }
    } catch {
      providerData = null;
    }

    if (!response.ok) {
      throw new Error(
        getProviderErrorMessage(providerData) || "Form submission failed. Please verify Google Apps Script settings."
      );
    }

    const providerErrorMessage = getProviderErrorMessage(providerData);
    if (providerErrorMessage) {
      throw new Error(providerErrorMessage);
    }

    return NextResponse.json({
      success: true,
      contact_id: null,
      demo_requested: readyToBook,
      event_id: bookingEventId || null,
      booking_time: bookingStartTime || null,
      stage_name: null,
      stage_assigned: false,
      provider: "google-apps-script",
      google_apps_script_ok: response.ok,
      provider_response: providerData ?? (providerText || null),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected server error.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
