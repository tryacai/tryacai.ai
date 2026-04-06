import { NextResponse } from "next/server";

type SubmitLeadPayload = {
  full_name?: string;
  business_email?: string;
  phone_number?: string;
  company_name?: string;
  industry?: string;
  call_volume?: string;
  message?: string;
  sms_consent?: boolean;
  demo_requested?: boolean;
  booking_time?: string | null;
  booking_end_time?: string | null;
  event_id?: string | null;
  tier_preference?: string;
};

type FormspreeResponse = {
  next?: string;
  ok?: boolean;
  errors?: Array<{ message?: string; field?: string; code?: string }>;
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

function getFormspreeEndpoint() {
  const explicitEndpoint = process.env.FORMSPREE_ENDPOINT?.trim();
  if (explicitEndpoint) {
    return explicitEndpoint;
  }

  const formId = process.env.FORMSPREE_FORM_ID?.trim();
  if (formId) {
    return `https://formspree.io/f/${formId}`;
  }

  return "https://formspree.io/f/maqyarlv";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SubmitLeadPayload;

    const fullName = body.full_name?.trim() || "";
    const businessEmail = body.business_email?.trim() || "";
    const phoneNumber = body.phone_number?.trim() || "";
    const companyName = body.company_name?.trim() || "";
    const industry = body.industry?.trim() || "";
    const callVolume = body.call_volume?.trim() || "";
    const message = body.message?.trim() || "";
    const smsConsent = Boolean(body.sms_consent);
    const demoRequested = Boolean(body.demo_requested);
    const bookingTime = body.booking_time?.trim() || "";
    const eventId = body.event_id?.trim() || "";
    const tierPreference = body.tier_preference?.trim() || "Not Sure Yet";

    if (
      !fullName ||
      !businessEmail ||
      !phoneNumber ||
      !companyName ||
      !industry ||
      !callVolume ||
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

    if (demoRequested && !eventId) {
      return NextResponse.json(
        { error: "Booking confirmation is required when demo is requested." },
        { status: 400 }
      );
    }

    const formspreeEndpoint = getFormspreeEndpoint();

    if (!formspreeEndpoint) {
      return NextResponse.json(
        { error: "Missing Formspree configuration. Set FORMSPREE_ENDPOINT or FORMSPREE_FORM_ID." },
        { status: 500 }
      );
    }

    console.log("[submit-lead] Payload:", {
      fullName,
      businessEmail,
      phoneNumber,
      companyName,
      industry,
      callVolume,
      tierPreference,
      demoRequested,
      bookingTime,
      eventId,
    });

    const formspreeKey = process.env.FORMSPREE_API_KEY?.trim();
    const response = await fetch(formspreeEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(formspreeKey ? { Authorization: `Bearer ${formspreeKey}` } : {}),
      },
      body: JSON.stringify({
        name: fullName,
        email: businessEmail,
        phone: phoneNumber,
        company: companyName,
        industry,
        lead_bottleneck: callVolume,
        tier_preference: tierPreference,
        message: message || "",
        sms_consent: smsConsent,
        demo_requested: demoRequested,
        booking_time: bookingTime || "",
        booking_end_time: body.booking_end_time?.trim() || "",
        event_id: eventId || "",
        source: "Website Contact Form",
        _subject: `New lead: ${companyName} (${industry})`,
      }),
    });

    let formspreeData: FormspreeResponse | null = null;
    try {
      formspreeData = (await response.json()) as FormspreeResponse;
    } catch {
      formspreeData = null;
    }

    if (!response.ok) {
      const firstError = formspreeData?.errors?.[0]?.message;
      throw new Error(firstError || "Form submission failed. Please verify Formspree settings.");
    }

    return NextResponse.json({
      success: true,
      contact_id: null,
      demo_requested: demoRequested,
      event_id: eventId || null,
      booking_time: bookingTime || null,
      stage_name: null,
      stage_assigned: false,
      provider: "formspree",
      formspree_ok: formspreeData?.ok ?? true,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected server error.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
