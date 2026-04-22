export type CalBookingDetails = {
  eventId: string;
  startTime: string;
  endTime: string;
};

type CalLeadPrefill = {
  fullName?: string;
  businessEmail?: string;
  phoneNumber?: string;
  companyName?: string;
  redirectUrl?: string;
};

function parseCalMessage(rawData: unknown): Record<string, unknown> | null {
  if (typeof rawData === "string") {
    try {
      const parsed = JSON.parse(rawData);
      return parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : null;
    } catch {
      return null;
    }
  }

  if (rawData && typeof rawData === "object") {
    return rawData as Record<string, unknown>;
  }

  return null;
}

function collectEventCandidates(message: Record<string, unknown>): string[] {
  const payload = message.payload && typeof message.payload === "object"
    ? (message.payload as Record<string, unknown>)
    : null;
  const data = message.data && typeof message.data === "object"
    ? (message.data as Record<string, unknown>)
    : null;

  return [
    message.event,
    message.eventType,
    message.type,
    payload?.event,
    payload?.eventType,
    payload?.type,
    data?.event,
    data?.eventType,
    data?.type,
  ]
    .filter(Boolean)
    .map((value) => String(value).toLowerCase());
}

export function isCalEmbedOrigin(origin: string): boolean {
  try {
    const hostname = new URL(origin).hostname.toLowerCase();
    return hostname === "cal.com" || hostname.endsWith(".cal.com");
  } catch {
    return false;
  }
}

export function isCalBookingSuccessMessage(rawData: unknown): boolean {
  const message = parseCalMessage(rawData);
  if (!message) {
    return false;
  }

  const candidates = collectEventCandidates(message);
  return candidates.some((value) => {
    return (
      value === "bookingsuccessful" ||
      value === "cal:bookingsuccessful" ||
      value === "booking.created" ||
      value === "cal:bookingcreated" ||
      value === "bookingcreated"
    );
  });
}

export function readCalBookingDetails(rawData: unknown): CalBookingDetails | null {
  const message = parseCalMessage(rawData);
  if (!message) {
    return null;
  }

  const payload = (message.payload || message.data || message) as Record<string, unknown>;
  const booking = (payload.booking || payload) as Record<string, unknown>;

  const eventId =
    booking.eventId ||
    booking.event_id ||
    booking.id ||
    booking.uid ||
    booking.bookingUid ||
    "";

  const startTime =
    booking.startTime || booking.start_time || booking.start || booking.startsAt || "";

  const endTime =
    booking.endTime || booking.end_time || booking.end || booking.endsAt || "";

  return {
    eventId: String(eventId || ""),
    startTime: String(startTime || ""),
    endTime: String(endTime || ""),
  };
}

export function buildCalEmbedUrl(baseCalUrl: string, prefill: CalLeadPrefill): string {
  const url = new URL(baseCalUrl);

  url.searchParams.set("embed", "true");

  const fullName = prefill.fullName?.trim();
  const businessEmail = prefill.businessEmail?.trim();
  const phoneNumber = prefill.phoneNumber?.trim();
  const companyName = prefill.companyName?.trim();
  const redirectUrl = prefill.redirectUrl?.trim();

  if (fullName) {
    url.searchParams.set("name", fullName);
  }

  if (businessEmail) {
    url.searchParams.set("email", businessEmail);
  }

  if (phoneNumber) {
    url.searchParams.set("phone", phoneNumber);
  }

  if (companyName) {
    url.searchParams.set("notes", `Company: ${companyName}`);
  }

  if (redirectUrl) {
    url.searchParams.set("redirectUrl", redirectUrl);
  }

  return url.toString();
}

type PostBookingRedirectParams = {
  callDate?: string;
  eventId?: string;
  fullName?: string;
  businessEmail?: string;
  phoneNumber?: string;
  companyName?: string;
};

export function buildPostBookingRedirectUrl(basePath: string, params: PostBookingRedirectParams): string {
  const query = new URLSearchParams();

  const callDate = params.callDate?.trim();
  const eventId = params.eventId?.trim();
  const fullName = params.fullName?.trim();
  const businessEmail = params.businessEmail?.trim();
  const phoneNumber = params.phoneNumber?.trim();
  const companyName = params.companyName?.trim();

  if (callDate) {
    query.set("call_date", callDate);
  }

  if (eventId) {
    query.set("booking_id", eventId);
  }

  if (fullName) {
    query.set("full_name", fullName);
  }

  if (businessEmail) {
    query.set("business_email", businessEmail);
  }

  if (phoneNumber) {
    query.set("phone_number", phoneNumber);
  }

  if (companyName) {
    query.set("company_name", companyName);
  }

  const queryString = query.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
}