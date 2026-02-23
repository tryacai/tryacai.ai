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
};

type GhlPipeline = {
  id?: string;
  name?: string;
  stages?: Array<{ id?: string; name?: string }>;
  pipelineStages?: Array<{ id?: string; name?: string }>;
};

const GHL_BASE_URL = "https://services.leadconnectorhq.com";

function splitFullName(fullName: string) {
  const trimmed = fullName.trim();
  if (!trimmed) {
    return { firstName: "", lastName: "" };
  }

  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: "" };
  }

  return {
    firstName: parts.slice(0, -1).join(" "),
    lastName: parts[parts.length - 1],
  };
}

async function ghlRequest<T>(
  path: string,
  apiKey: string,
  init: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${GHL_BASE_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });

  const bodyText = await response.text();
  const body = bodyText ? JSON.parse(bodyText) : null;

  if (!response.ok) {
    throw new Error(body?.message || body?.error || `GoHighLevel request failed: ${response.status}`);
  }

  return body as T;
}

function findStageInPipelines(
  pipelines: GhlPipeline[],
  targetStageName: string
): { pipelineId: string; pipelineStageId: string } | null {
  const normalizedTarget = targetStageName.toLowerCase();

  for (const pipeline of pipelines) {
    const stages = pipeline.stages || pipeline.pipelineStages || [];
    const matchingStage = stages.find(
      (stage) => stage.name?.toLowerCase() === normalizedTarget
    );

    if (pipeline.id && matchingStage?.id) {
      return {
        pipelineId: pipeline.id,
        pipelineStageId: matchingStage.id,
      };
    }
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
    const callVolume = body.call_volume?.trim() || "";
    const message = body.message?.trim() || "";
    const smsConsent = Boolean(body.sms_consent);
    const demoRequested = Boolean(body.demo_requested);
    const bookingTime = body.booking_time?.trim() || "";
    const eventId = body.event_id?.trim() || "";

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

    if (demoRequested && !eventId) {
      return NextResponse.json(
        { error: "Booking confirmation is required when demo is requested." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GHL_API_KEY;
    const locationId = process.env.GHL_LOCATION_ID;
    const industryFieldId = process.env.GHL_FIELD_INDUSTRY_ID;
    const callVolumeFieldId = process.env.GHL_FIELD_CALL_VOLUME_ID;
    const bookingTimeFieldId = process.env.GHL_FIELD_BOOKING_TIME_ID;
    const demoRequestedFieldId = process.env.GHL_FIELD_DEMO_REQUESTED_ID;
    const smsConsentFieldId = process.env.GHL_FIELD_SMS_CONSENT_ID;
    const messageFieldId = process.env.GHL_FIELD_MESSAGE_ID;

    if (!apiKey || !locationId) {
      return NextResponse.json(
        { error: "Missing GoHighLevel credentials." },
        { status: 500 }
      );
    }

    const missingFieldIds = [
      ["GHL_FIELD_INDUSTRY_ID", industryFieldId],
      ["GHL_FIELD_CALL_VOLUME_ID", callVolumeFieldId],
      ["GHL_FIELD_BOOKING_TIME_ID", bookingTimeFieldId],
      ["GHL_FIELD_DEMO_REQUESTED_ID", demoRequestedFieldId],
      ["GHL_FIELD_SMS_CONSENT_ID", smsConsentFieldId],
      ["GHL_FIELD_MESSAGE_ID", messageFieldId],
    ].filter(([, value]) => !value);

    if (missingFieldIds.length > 0) {
      throw new Error(
        `Missing required GoHighLevel field ID env vars: ${missingFieldIds
          .map(([name]) => name)
          .join(", ")}`
      );
    }

    const { firstName, lastName } = splitFullName(fullName);
    const tags: string[] = [];
    if (eventId) {
      tags.push("demo_booked");
    } else {
      tags.push("warm_lead");
    }

    if (demoRequested) {
      tags.push("demo_requested");
    }

    if (industry) {
      tags.push(`industry_${industry.toLowerCase().replace(/\s+/g, "_")}`);
    }

    if (callVolume) {
      tags.push(
        `volume_${callVolume
          .replace(/\+/g, "plus")
          .replace(/\s/g, "_")
          .toLowerCase()}`
      );
    }

    const stageName = eventId ? "Demo Scheduled" : "Follow Up – No Demo";

    const contactResponse = await ghlRequest<{ contact?: { id?: string } }>(
      "/contacts/upsert",
      apiKey,
      {
        method: "POST",
        body: JSON.stringify({
          locationId,
          firstName,
          lastName,
          name: fullName,
          email: businessEmail,
          phone: phoneNumber,
          companyName,
          tags,
          source: "website_demo_funnel",
          customFields: [
            { id: industryFieldId, value: industry },
            { id: callVolumeFieldId, value: callVolume },
            { id: bookingTimeFieldId, value: bookingTime || "" },
            { id: demoRequestedFieldId, value: demoRequested },
            { id: smsConsentFieldId, value: smsConsent },
            { id: messageFieldId, value: message || "" },
          ],
        }),
      }
    );

    const contactId = contactResponse?.contact?.id;

    if (!contactId) {
      throw new Error("Unable to create or update contact in GoHighLevel.");
    }

    let stageAssigned = false;

    try {
      const pipelineResponse = await ghlRequest<{ pipelines?: GhlPipeline[] }>(
        `/opportunities/pipelines?locationId=${encodeURIComponent(locationId)}`,
        apiKey,
        { method: "GET" }
      );

      const pipelines = pipelineResponse?.pipelines || [];
      const match = findStageInPipelines(pipelines, stageName);

      if (match) {
        await ghlRequest(
          "/opportunities/",
          apiKey,
          {
            method: "POST",
            body: JSON.stringify({
              locationId,
              contactId,
              pipelineId: match.pipelineId,
              pipelineStageId: match.pipelineStageId,
              status: "open",
              name: `${companyName} - ${stageName}`,
              source: "website_demo_funnel",
              notes: message || undefined,
            }),
          }
        );

        stageAssigned = true;
      }
    } catch (pipelineError) {
      console.error("[submit-lead] Pipeline stage assignment failed:", pipelineError);
    }

    return NextResponse.json({
      success: true,
      contact_id: contactId,
      demo_requested: demoRequested,
      event_id: eventId || null,
      booking_time: bookingTime || null,
      stage_name: stageName,
      stage_assigned: stageAssigned,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected server error.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
