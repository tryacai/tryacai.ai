"use client";

import { Container } from "@/components/container";
import { FormEvent, useEffect, useMemo, useState } from "react";

const INDUSTRY_OPTIONS = [
  "Barber",
  "Plumbing",
  "HVAC",
  "Roofing",
  "Electricians",
  "Landscaping",
  "Pest Control",
  "Cleaning",
  "Mechanics",
  "Med Spa",
  "Other",
];

const CALL_VOLUME_OPTIONS = ["0-50", "51-150", "151-300", "301-600", "600+"];

type BookingDetails = {
  eventId: string;
  startTime: string;
  endTime: string;
};

type FormState = {
  fullName: string;
  businessEmail: string;
  phoneNumber: string;
  companyName: string;
  industry: string;
  monthlyCallVolume: string;
  message: string;
  smsConsent: boolean;
  demoRequested: boolean;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialFormState: FormState = {
  fullName: "",
  businessEmail: "",
  phoneNumber: "",
  companyName: "",
  industry: "",
  monthlyCallVolume: "",
  message: "",
  smsConsent: false,
  demoRequested: false,
};

function readBookingFromCalMessage(rawData: unknown): BookingDetails | null {
  let data: any = rawData;

  if (typeof data === "string") {
    try {
      data = JSON.parse(data);
    } catch {
      return null;
    }
  }

  if (!data || typeof data !== "object") {
    return null;
  }

  const eventName = String(
    data.event || data.type || data.name || data?.data?.event || ""
  ).toLowerCase();

  const bookingSignal =
    eventName.includes("book") &&
    (eventName.includes("success") || eventName.includes("confirm") || eventName.includes("created"));

  const payload = data.payload || data.data || data;
  const booking = payload.booking || payload;

  const eventId =
    booking.eventId ||
    booking.event_id ||
    booking.id ||
    booking.uid ||
    booking.bookingUid ||
    "";

  const startTime =
    booking.startTime || booking.start_time || booking.start || booking.startsAt || "";

  const endTime = booking.endTime || booking.end_time || booking.end || booking.endsAt || "";

  if (!bookingSignal && !(eventId && startTime)) {
    return null;
  }

  return {
    eventId: String(eventId || ""),
    startTime: String(startTime || ""),
    endTime: String(endTime || ""),
  };
}

export default function ScheduleDemoPage() {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [booking, setBooking] = useState<BookingDetails | null>(null);

  const isBookingRequired = formState.demoRequested;
  const isBookingConfirmed = Boolean(booking?.eventId);

  useEffect(() => {
    function handleCalMessage(event: MessageEvent) {
      const origin = event.origin || "";
      if (!origin.includes("cal.com")) {
        return;
      }

      const parsedBooking = readBookingFromCalMessage(event.data);
      if (!parsedBooking) {
        return;
      }

      if (!parsedBooking.eventId) {
        return;
      }

      setBooking(parsedBooking);
      setSubmitError(null);
    }

    window.addEventListener("message", handleCalMessage);
    return () => window.removeEventListener("message", handleCalMessage);
  }, []);

  useEffect(() => {
    if (!formState.demoRequested) {
      setBooking(null);
    }
  }, [formState.demoRequested]);

  const messageCharacters = useMemo(() => formState.message.length, [formState.message]);

  function validateForm(values: FormState): FormErrors {
    const nextErrors: FormErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const digits = values.phoneNumber.replace(/\D/g, "");

    if (!values.fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!values.businessEmail.trim()) {
      nextErrors.businessEmail = "Business email is required.";
    } else if (!emailPattern.test(values.businessEmail)) {
      nextErrors.businessEmail = "Enter a valid email address.";
    }

    if (!digits) {
      nextErrors.phoneNumber = "Phone number is required.";
    } else if (digits.length < 10) {
      nextErrors.phoneNumber = "Enter at least 10 digits.";
    }

    if (!values.companyName.trim()) nextErrors.companyName = "Company name is required.";
    if (!values.industry) nextErrors.industry = "Industry is required.";
    if (!values.monthlyCallVolume) nextErrors.monthlyCallVolume = "Estimated monthly call volume is required.";
    if (values.message.length > 300) nextErrors.message = "Message must be 300 characters or fewer.";
    if (!values.smsConsent) nextErrors.smsConsent = "SMS consent is required.";

    if (values.demoRequested && !isBookingConfirmed) {
      nextErrors.demoRequested = "Please complete your Cal.com booking before submitting.";
    }

    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);

    const validationErrors = validateForm(formState);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: formState.fullName.trim(),
          business_email: formState.businessEmail.trim(),
          phone_number: formState.phoneNumber.trim(),
          company_name: formState.companyName.trim(),
          industry: formState.industry,
          call_volume: formState.monthlyCallVolume,
          message: formState.message.trim(),
          sms_consent: formState.smsConsent,
          demo_requested: formState.demoRequested,
          booking_time: booking?.startTime || null,
          booking_end_time: booking?.endTime || null,
          event_id: booking?.eventId || null,
        }),
      });

      if (!response.ok) {
        const failed = await response.json().catch(() => ({}));
        throw new Error(failed?.error || "Failed to submit your details.");
      }

      setSubmitSuccess(true);
      setFormState(initialFormState);
      setErrors({});
      setBooking(null);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const submitDisabled = isSubmitting || (isBookingRequired && !isBookingConfirmed);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Container className="py-20 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <h1 className="mb-4 text-4xl font-bold text-black dark:text-white md:text-6xl">
              Book Your ACAI Demo
            </h1>
            <p className="mx-auto max-w-2xl text-base text-neutral-600 dark:text-neutral-400">
              Share a few details so we can tailor your walkthrough. If you&apos;re ready now,
              book your live 30-minute ACAI demo directly below.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xl dark:border-neutral-800 dark:bg-neutral-900 sm:p-8">
            {submitSuccess ? (
              <div className="space-y-4 py-8 text-center">
                <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
                  You&apos;re all set.
                </h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Your details were submitted successfully. We&apos;ll follow up shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitSuccess(false)}
                  className="mx-auto rounded-full border border-neutral-300 px-4 py-2 text-sm text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
                >
                  Submit another response
                </button>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-800 dark:text-neutral-200">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formState.fullName}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, fullName: e.target.value }))
                      }
                      className="block w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:focus:border-neutral-500"
                    />
                    {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-800 dark:text-neutral-200">
                      Business Email
                    </label>
                    <input
                      type="email"
                      value={formState.businessEmail}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, businessEmail: e.target.value }))
                      }
                      className="block w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:focus:border-neutral-500"
                    />
                    {errors.businessEmail && (
                      <p className="mt-1 text-xs text-red-500">{errors.businessEmail}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-800 dark:text-neutral-200">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formState.phoneNumber}
                      onChange={(e) =>
                        setFormState((prev) => ({
                          ...prev,
                          phoneNumber: e.target.value.replace(/[^\d+()\-\s]/g, ""),
                        }))
                      }
                      className="block w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:focus:border-neutral-500"
                    />
                    {errors.phoneNumber && (
                      <p className="mt-1 text-xs text-red-500">{errors.phoneNumber}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-800 dark:text-neutral-200">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={formState.companyName}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, companyName: e.target.value }))
                      }
                      className="block w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:focus:border-neutral-500"
                    />
                    {errors.companyName && (
                      <p className="mt-1 text-xs text-red-500">{errors.companyName}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-800 dark:text-neutral-200">
                      Industry
                    </label>
                    <select
                      value={formState.industry}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, industry: e.target.value }))
                      }
                      className="block w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:focus:border-neutral-500"
                    >
                      <option value="">Select industry</option>
                      {INDUSTRY_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.industry && <p className="mt-1 text-xs text-red-500">{errors.industry}</p>}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-800 dark:text-neutral-200">
                      Estimated Monthly Call Volume
                    </label>
                    <select
                      value={formState.monthlyCallVolume}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, monthlyCallVolume: e.target.value }))
                      }
                      className="block w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:focus:border-neutral-500"
                    >
                      <option value="">Select call volume</option>
                      {CALL_VOLUME_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.monthlyCallVolume && (
                      <p className="mt-1 text-xs text-red-500">{errors.monthlyCallVolume}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-800 dark:text-neutral-200">
                    Message (Optional)
                  </label>
                  <textarea
                    maxLength={300}
                    rows={4}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, message: e.target.value }))
                    }
                    className="block w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:focus:border-neutral-500"
                  />
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Max 300 characters</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{messageCharacters}/300</p>
                  </div>
                  {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                </div>

                <div className="space-y-3 rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-950/50">
                  <label className="flex items-start gap-3 text-sm text-neutral-700 dark:text-neutral-300">
                    <input
                      type="checkbox"
                      checked={formState.smsConsent}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, smsConsent: e.target.checked }))
                      }
                      className="mt-0.5 h-4 w-4 rounded border-neutral-400 bg-transparent"
                    />
                    <span>
                      I agree to receive SMS updates from ACAI related to my demo request.
                    </span>
                  </label>
                  {errors.smsConsent && <p className="text-xs text-red-500">{errors.smsConsent}</p>}

                  <label className="flex items-start gap-3 text-sm font-medium text-neutral-900 dark:text-white">
                    <input
                      type="checkbox"
                      checked={formState.demoRequested}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, demoRequested: e.target.checked }))
                      }
                      className="mt-0.5 h-4 w-4 rounded border-neutral-400 bg-transparent"
                    />
                    <span>I&apos;m ready for my live 30-minute ACAI demo</span>
                  </label>

                  {formState.demoRequested && !isBookingConfirmed && (
                    <p className="text-xs text-amber-600 dark:text-amber-400">
                      Complete your booking below to enable form submission.
                    </p>
                  )}

                  {formState.demoRequested && isBookingConfirmed && (
                    <p className="text-xs text-emerald-600 dark:text-emerald-400">
                      Booking confirmed{booking?.startTime ? ` for ${new Date(booking.startTime).toLocaleString()}` : ""}.
                    </p>
                  )}

                  {errors.demoRequested && (
                    <p className="text-xs text-red-500">{errors.demoRequested}</p>
                  )}
                </div>

                {formState.demoRequested && (
                  <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
                    <iframe
                      src="https://cal.com/tryacai.ai/30min?embed=true"
                      title="Schedule your live 30-minute ACAI demo"
                      className="w-full"
                      style={{ minHeight: "700px" }}
                    />
                  </div>
                )}

                {submitError && <p className="text-sm text-red-500">{submitError}</p>}

                <button
                  type="submit"
                  disabled={submitDisabled}
                  className="w-full rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
