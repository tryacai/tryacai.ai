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
const monthlyCallVolumeOptions = ["0-50", "50-150", "150-300", "300+"] as const;
const freeEmailDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com", "icloud.com"];

const tierOptions = [
  {
    key: "capture",
    label: "Capture",
    description: "Best if your #1 issue is missed calls and weak first response speed.",
    href: "/solutions#capture",
  },
  {
    key: "recover",
    label: "Recover",
    description: "Best if you need follow-up and review automation to recover lost revenue.",
    href: "/solutions#recover",
  },
  {
    key: "optimize",
    label: "Optimize",
    description: "Best for advanced routing and multi-location operational control.",
    href: "/solutions#optimize",
  },
  {
    key: "unsure",
    label: "Not Sure Yet",
    description: "We&apos;ll help you choose the right level based on your team and call volume.",
    href: "/solutions",
  },
] as const;

type TierPreference = (typeof tierOptions)[number]["key"];

type BookingDetails = {
  eventId: string;
  startTime: string;
  endTime: string;
};

const formSchema = z.object({
  name: z.string({ required_error: "Please enter your full name" }).min(1, "Please enter your full name"),
  email: z
    .string({ required_error: "Please enter your business email" })
    .min(1, "Please enter your business email")
    .email("Please enter a valid email")
    .refine((value) => {
      const domain = value.split("@")[1]?.toLowerCase();
      if (!domain) {
        return false;
      }
      return !freeEmailDomains.includes(domain);
    }, "Please use a business email (no free email domains)."),
  phone: z
    .string({ required_error: "Please enter your phone number" })
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must contain numbers only"),
  company: z.string({ required_error: "Please enter your company name" }).min(1, "Please enter your company name"),
  industry: z
    .string({ required_error: "Please select your industry" })
    .min(1, "Please select your industry")
    .refine((value) => industryOptions.includes(value as (typeof industryOptions)[number]), "Please select a valid industry"),
  monthlyCallVolume: z
    .string({ required_error: "Please select estimated monthly call volume" })
    .min(1, "Please select estimated monthly call volume")
    .refine(
      (value) => monthlyCallVolumeOptions.includes(value as (typeof monthlyCallVolumeOptions)[number]),
      "Please select a valid monthly call volume",
    ),
  tierPreference: z.enum(["capture", "recover", "optimize", "unsure"]),
  message: z
    .string()
    .max(300, "Message must be 300 characters or fewer")
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

export function ContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      industry: "",
      monthlyCallVolume: "",
      tierPreference: "unsure",
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
  const tierPreference = form.watch("tierPreference");
  const watchedMessage = form.watch("message") || "";

  useEffect(() => {
    function handleCalMessage(event: MessageEvent) {
      if (!event.origin?.includes("cal.com")) {
        return;
      }

      const parsed = readBookingFromCalMessage(event.data);
      if (!parsed) {
        return;
      }

      setBooking(parsed);
      setIsCalendarModalOpen(false);
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
          call_volume: values.monthlyCallVolume,
          message: values.message || "",
          sms_consent: values.smsConsent,
          demo_requested: values.readyToBook,
          booking_time: booking?.startTime || null,
          booking_end_time: booking?.endTime || null,
          event_id: booking?.eventId || null,
          tier_preference: values.tierPreference,
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
        monthlyCallVolume: "",
        tierPreference: "unsure",
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
                    name="monthlyCallVolume"
                    render={({ field }) => (
                      <FormItem>
                        <label htmlFor="monthlyCallVolume" className="block text-sm font-medium text-neutral-200">
                          Estimated Monthly Call Volume
                        </label>
                        <FormControl>
                          <select
                            id="monthlyCallVolume"
                            className="mt-2 block w-full rounded-lg border border-white/10 bg-neutral-950 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            {...field}
                          >
                            <option value="" className="bg-neutral-950 text-neutral-400">
                              Select call volume
                            </option>
                            {monthlyCallVolumeOptions.map((option) => (
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

                <section className="space-y-3 rounded-xl border border-white/10 bg-black/30 p-4">
                  <p className="text-sm font-semibold text-white">Choose your tier preference</p>

                  <div className="mx-auto grid max-w-xl grid-cols-3 gap-3">
                    {tierOptions
                      .filter((option) => option.key !== "unsure")
                      .map((option) => {
                        const selected = tierPreference === option.key;

                        return (
                          <motion.button
                            key={option.key}
                            type="button"
                            onClick={() => form.setValue("tierPreference", option.key)}
                            whileTap={{ scale: 0.98 }}
                            animate={{ y: selected ? -3 : 0 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className={`rounded-lg border px-3 py-2 text-center text-sm font-semibold transition-all duration-200 ${
                              selected
                                ? "border-transparent bg-gradient-to-r from-red-500/35 via-purple-500/35 to-blue-500/35 text-white shadow-[0_0_12px_rgba(168,85,247,0.35)]"
                                : "border-white/15 bg-neutral-950 text-neutral-200 hover:border-white/30"
                            }`}
                          >
                            {option.label}
                          </motion.button>
                        );
                      })}
                  </div>

                  {(() => {
                    const unsure = tierOptions.find((option) => option.key === "unsure")!;
                    const selected = tierPreference === unsure.key;

                    return (
                      <div className="flex justify-center">
                        <motion.button
                          type="button"
                          onClick={() => form.setValue("tierPreference", unsure.key)}
                          whileTap={{ scale: 0.98 }}
                          animate={{ y: selected ? -2 : 0 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className={`rounded-md border px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
                            selected
                              ? "border-transparent bg-gradient-to-r from-red-500/25 via-purple-500/25 to-blue-500/25 text-white shadow-[0_0_10px_rgba(168,85,247,0.28)]"
                              : "border-white/20 bg-neutral-950 text-neutral-300 hover:border-white/35"
                          }`}
                        >
                          {unsure.label}
                        </motion.button>
                      </div>
                    );
                  })()}

                  <div className="rounded-lg border border-white/10 bg-black/25 px-3 py-2 text-center">
                    <p className="text-xs text-neutral-200">
                      {tierOptions.find((option) => option.key === tierPreference)?.key === "unsure"
                        ? "I'll help you choose the right level based on your team and call volume."
                        : tierOptions.find((option) => option.key === tierPreference)?.description}
                    </p>
                    <Link
                      href={tierOptions.find((option) => option.key === tierPreference)?.href || "/solutions"}
                      className="mt-1 inline-block text-xs text-purple-300 underline underline-offset-4 hover:text-white"
                    >
                      See more about this tier
                    </Link>
                  </div>
                </section>

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
                        Booking confirmed{booking.startTime ? ` for ${new Date(booking.startTime).toLocaleString()}` : ""}.
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
