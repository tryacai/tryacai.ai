"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

const industryOptions = ["Plumbing", "HVAC", "Barber", "Detailing", "Roofing", "Other"] as const;
const leadBottleneckOptions = ["Slow follow-up", "Missed calls", "Low form conversion", "Poor qualification", "Booking drop-off", "Not sure yet"] as const;
const systemInterestOptions = ["Web Funnel", "Chat Widget", "Voice AI", "Automation Engine"] as const;

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

type BookingDetails = {
  eventId: string;
  startTime: string;
  endTime: string;
};

const formSchema = z.object({
  name: z
    .string({ required_error: "Please enter your full name" })
    .min(1, "Please enter your full name")
    .refine((value) => isLikelyRealName(value), "Please enter your real first and last name."),
  email: z
    .string({ required_error: "Please enter your email" })
    .min(1, "Please enter your email")
    .email("Please enter a valid email"),
  phone: z
    .string({ required_error: "Please enter your phone number" })
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must contain numbers only"),
  company: z
    .string({ required_error: "Please enter your company name" })
    .min(1, "Please enter your company name")
    .refine((value) => !looksLikeSpam(value), "Please enter a valid company name."),
  industry: z
    .string({ required_error: "Please select your industry" })
    .min(1, "Please select your industry")
    .refine((value) => industryOptions.includes(value as (typeof industryOptions)[number]), "Please select a valid industry"),
  biggestLeadBottleneck: z
    .string({ required_error: "Please select your biggest lead bottleneck" })
    .min(1, "Please select your biggest lead bottleneck")
    .refine(
      (value) => leadBottleneckOptions.includes(value as (typeof leadBottleneckOptions)[number]),
      "Please select a valid bottleneck",
    ),
  systemsInterestedIn: z.array(z.enum(systemInterestOptions)).min(1, "Select at least one system"),
  message: z
    .string()
    .max(300, "Message must be 300 characters or fewer")
    .refine((value) => !looksLikeSpam(value || ""), "Please remove spammy links/keywords from your message.")
    .optional(),
  smsConsent: z.boolean().refine((value) => value === true, {
    message: "You must agree to receive SMS messages before submitting.",
  }),
  company_website: z.string().optional(),
  readyToBook: z.boolean().default(false),
});

type ContactFormValues = z.infer<typeof formSchema>;

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

  if (!eventId) {
    return null;
  }

  return {
    eventId: String(eventId || ""),
    startTime: String(startTime || ""),
    endTime: String(endTime || ""),
  };
}

function isBookingSuccessfulCalEvent(rawData: unknown): boolean {
  let data: any = rawData;

  if (typeof data === "string") {
    try {
      data = JSON.parse(data);
    } catch {
      return false;
    }
  }

  if (!data || typeof data !== "object") {
    return false;
  }

  const candidateTypes = [
    data.event,
    data.eventType,
    data.type,
    data.payload?.event,
    data.payload?.eventType,
    data.payload?.type,
    data.data?.event,
    data.data?.eventType,
    data.data?.type,
  ]
    .filter(Boolean)
    .map((value) => String(value));

  return candidateTypes.some((value) => value === "bookingSuccessful");
}

export function ContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      industry: "",
      biggestLeadBottleneck: "",
      systemsInterestedIn: [],
      message: "",
      smsConsent: false,
      company_website: "",
      readyToBook: false,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);

  const readyToBook = form.watch("readyToBook");
  const systemsInterestedIn = form.watch("systemsInterestedIn");
  const watchedMessage = form.watch("message") || "";

  useEffect(() => {
    function handleCalMessage(event: MessageEvent) {
      if (!event.origin?.includes("cal.com")) {
        return;
      }

      if (!isBookingSuccessfulCalEvent(event.data)) {
        return;
      }

      const parsed = readBookingFromCalMessage(event.data);
      if (!parsed) {
        return;
      }

      setBooking(parsed);
      setSubmitError(null);
    }

    window.addEventListener("message", handleCalMessage);
    return () => window.removeEventListener("message", handleCalMessage);
  }, []);

  useEffect(() => {
    if (!readyToBook) {
      setBooking(null);
      setIsCalendarModalOpen(false);
    } else if (!booking?.eventId) {
      setIsCalendarModalOpen(true);
    }
  }, [readyToBook, booking?.eventId]);

  const submitDisabled = isSubmitting || (readyToBook && !booking?.eventId);
  const messageCount = useMemo(() => watchedMessage.length, [watchedMessage]);

  async function onSubmit(values: ContactFormValues) {
    if (values.company_website && values.company_website.trim().length > 0) {
      return;
    }

    if (values.readyToBook && !booking?.eventId) {
      setSubmitError("Please confirm your booking before submitting.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: values.name,
          business_email: values.email,
          phone_number: values.phone,
          company_name: values.company,
          industry: values.industry,
          call_volume: values.biggestLeadBottleneck,
          message: values.message || "",
          sms_consent: values.smsConsent,
          demo_requested: values.readyToBook,
          booking_time: booking?.startTime || null,
          booking_end_time: booking?.endTime || null,
          event_id: booking?.eventId || null,
          tier_preference: values.systemsInterestedIn.join(", "),
        }),
      });

      if (!response.ok) {
        const failed = await response.json().catch(() => ({}));
        throw new Error(failed?.error || "Failed to submit form. Please try again.");
      }

      setSubmitted(true);
      setBooking(null);
      setIsCalendarModalOpen(false);
      form.reset({
        name: "",
        email: "",
        phone: "",
        company: "",
        industry: "",
        biggestLeadBottleneck: "",
        systemsInterestedIn: [],
        message: "",
        smsConsent: false,
        company_website: "",
        readyToBook: false,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred. Please try again.";
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-8 bg-gradient-to-r from-red-500/20 via-purple-500/20 to-blue-500/20 blur-3xl opacity-20" />
      <div className="group relative rounded-2xl p-[1px] transition-all duration-300">
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 opacity-35 transition-opacity duration-300 group-hover:opacity-70" />
        <div className="relative rounded-2xl border border-white/10 bg-black/40 p-6 sm:p-8 backdrop-blur-md shadow-lg">
          {submitted ? (
            <div className="space-y-4 py-4 text-center">
              <h2 className="text-2xl font-semibold text-white">Thanks — we got your details.</h2>
              <p className="text-sm text-neutral-300">
                Our team will review your business information and follow up if there’s a fit.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  form.reset();
                }}
                className="mx-auto text-sm text-neutral-300 hover:text-white transition-colors"
              >
                Submit another response
              </button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit as (values: ContactFormValues) => Promise<void>)} className="space-y-6">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <label htmlFor="name" className="block text-sm font-medium text-neutral-200">
                          Full Name
                        </label>
                        <FormControl>
                          <input
                            id="name"
                            type="text"
                            className="mt-2 block w-full rounded-lg border border-white/10 bg-neutral-950 px-4 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-200">
                          Business Email
                        </label>
                        <FormControl>
                          <input
                            id="email"
                            type="email"
                            className="mt-2 block w-full rounded-lg border border-white/10 bg-neutral-950 px-4 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <label htmlFor="phone" className="block text-sm font-medium text-neutral-200">
                          Phone Number
                        </label>
                        <FormControl>
                          <input
                            id="phone"
                            type="tel"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            minLength={10}
                            className="mt-2 block w-full rounded-lg border border-white/10 bg-neutral-950 px-4 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={field.value}
                            onChange={(event) => {
                              const digitsOnly = event.target.value.replace(/\D/g, "");
                              field.onChange(digitsOnly);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <label htmlFor="company" className="block text-sm font-medium text-neutral-200">
                          Company Name
                        </label>
                        <FormControl>
                          <input
                            id="company"
                            type="text"
                            className="mt-2 block w-full rounded-lg border border-white/10 bg-neutral-950 px-4 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <label htmlFor="industry" className="block text-sm font-medium text-neutral-200">
                          Industry
                        </label>
                        <FormControl>
                          <select
                            id="industry"
                            className="mt-2 block w-full rounded-lg border border-white/10 bg-neutral-950 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            {...field}
                          >
                            <option value="" className="bg-neutral-950 text-neutral-400">
                              Select your industry
                            </option>
                            {industryOptions.map((option) => (
                              <option key={option} value={option} className="bg-neutral-950 text-white">
                                {option}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="biggestLeadBottleneck"
                    render={({ field }) => (
                      <FormItem>
                        <label htmlFor="biggestLeadBottleneck" className="block text-sm font-medium text-neutral-200">
                          Biggest lead bottleneck
                        </label>
                        <FormControl>
                          <select
                            id="biggestLeadBottleneck"
                            className="mt-2 block w-full rounded-lg border border-white/10 bg-neutral-950 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            {...field}
                          >
                            <option value="" className="bg-neutral-950 text-neutral-400">
                              Select a bottleneck
                            </option>
                            {leadBottleneckOptions.map((option) => (
                              <option key={option} value={option} className="bg-neutral-950 text-white">
                                {option}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="systemsInterestedIn"
                  render={({ field }) => (
                    <FormItem className="space-y-3 rounded-xl border border-white/10 bg-black/30 p-4">
                      <p className="text-sm font-semibold text-white">What are you most interested in?</p>
                      <p className="text-xs text-neutral-400">Select the systems you&apos;d like to explore or improve.</p>
                      <div className="flex flex-wrap gap-2">
                        {systemInterestOptions.map((option) => {
                          const selected = field.value.includes(option);

                          return (
                            <motion.button
                              key={option}
                              type="button"
                              whileTap={{ scale: 0.98 }}
                              onClick={() => {
                                const current = field.value || [];
                                const next = current.includes(option)
                                  ? current.filter((item) => item !== option)
                                  : [...current, option];
                                field.onChange(next);
                              }}
                              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                                selected
                                  ? "border-transparent bg-gradient-to-r from-red-500/35 via-purple-500/35 to-blue-500/35 text-white shadow-[0_0_14px_rgba(168,85,247,0.32)]"
                                  : "border-white/20 bg-neutral-950 text-neutral-200 hover:border-white/35"
                              }`}
                            >
                              {option}
                            </motion.button>
                          );
                        })}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <label htmlFor="message" className="block text-sm font-medium text-neutral-200">
                        Message (Optional)
                      </label>
                      <FormControl>
                        <textarea
                          id="message"
                          maxLength={300}
                          rows={4}
                          className="mt-2 block w-full rounded-lg border border-white/10 bg-neutral-950 px-4 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          {...field}
                        />
                      </FormControl>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-neutral-500">Max 300 characters.</p>
                        <p className="text-xs text-neutral-500">{messageCount}/300</p>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="smsConsent"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-3 rounded-lg border border-white/10 bg-neutral-950 p-4">
                        <label htmlFor="smsConsent" className="flex items-start gap-3 text-sm text-neutral-200">
                          <FormControl>
                            <input
                              id="smsConsent"
                              type="checkbox"
                              name="sms_consent"
                              className="mt-1 h-4 w-4 rounded border border-white/20 bg-neutral-950"
                              checked={Boolean(field.value)}
                              onChange={(event) => field.onChange(event.target.checked)}
                            />
                          </FormControl>
                          <span>
                            I agree to receive SMS messages from ACAI Enterprises LLC regarding demo scheduling and product updates. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help.
                          </span>
                        </label>

                        <p className="text-xs text-neutral-400">
                          <Link href="/privacy-policy" className="underline hover:text-white">
                            Privacy Policy
                          </Link>{" "}
                          •{" "}
                          <Link href="/terms" className="underline hover:text-white">
                            Terms
                          </Link>{" "}
                          •{" "}
                          <Link href="/sms-consent" className="underline hover:text-white">
                            SMS Disclosure
                          </Link>
                        </p>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="readyToBook"
                  render={({ field }) => (
                    <FormItem>
                      <label className="flex items-center gap-3 text-sm font-medium text-white">
                        <FormControl>
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border border-white/20 bg-neutral-950"
                            checked={Boolean(field.value)}
                            onChange={(event) => field.onChange(event.target.checked)}
                          />
                        </FormControl>
                        <span>I&apos;m ready to book my live demo now.</span>
                      </label>
                    </FormItem>
                  )}
                />

                {readyToBook && (
                  <div className="space-y-3 rounded-xl border border-white/10 bg-black/30 p-4">
                    <button
                      type="button"
                      onClick={() => setIsCalendarModalOpen(true)}
                      className="w-full rounded-lg border border-white/20 bg-neutral-950 px-4 py-2 text-sm font-medium text-white transition hover:border-white/40"
                    >
                      {booking?.eventId ? "Review booking" : "Open calendar"}
                    </button>
                    {!booking?.eventId ? (
                      <p className="text-xs text-amber-300">Complete your booking to enable submission.</p>
                    ) : (
                      <p className="text-xs text-emerald-300">
                        Demo requested. We will confirm within 24 hours.
                      </p>
                    )}
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="company_website"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          type="text"
                          id="company_website"
                          style={{ display: "none" }}
                          tabIndex={-1}
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="space-y-4 pt-2">
                  <Button
                    type="submit"
                    disabled={submitDisabled}
                    className="w-full rounded-xl bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>

                  {submitError && (
                    <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-300">
                      {submitError}
                    </p>
                  )}
                </div>
              </form>
            </Form>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isCalendarModalOpen && readyToBook && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/75 p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/15 bg-neutral-950 shadow-2xl"
            >
              <button
                type="button"
                aria-label="Close calendar"
                onClick={() => setIsCalendarModalOpen(false)}
                className="absolute right-3 top-3 z-10 rounded-full border border-white/20 bg-black/50 px-2.5 py-1 text-sm text-white hover:border-white/40"
              >
                ✕
              </button>
              <iframe
                src="https://cal.com/tryacai.ai/30min?embed=true"
                title="Book your ACAI live demo"
                className="w-full"
                style={{ minHeight: "700px" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
