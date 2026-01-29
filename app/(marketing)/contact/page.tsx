import { Background } from "@/components/background";
import { Metadata } from "next";
import { HorizontalGradient } from "@/components/horizontal-gradient";
import { ContactForm } from "@/components/contact";
import { Button } from "@/components/button";
import { IconCircleCheckFilled, IconPhoneCall } from "@tabler/icons-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us - ACAI AI",
  description:
    "Get started with ACAI AI. Contact us to learn how our AI receptionist can help your plumbing or HVAC business answer calls and book jobs 24/7.",
  openGraph: {
    images: ["https://tryacai.ai/V2websitepreviewimage.png"],
  },
};

const demoPoints = [
  "How ACAI answers calls just like your best employee",
  "Real-time job booking and calendar integration",
  "Custom AI training for your specific services and pricing",
  "Simple setup and getting started in under 24 hours",
];

export default function PricingPage() {
  return (
    <div className="relative overflow-hidden px-4 md:px-20 bg-gray-50 dark:bg-black">
      <Background />
      {/* Hero Section */}
      <div className="w-full py-24 text-center relative z-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 leading-tight">
            Never miss a call again.
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 mb-10 leading-relaxed">
            ACAI AI answers calls, books jobs, and helps home service businesses capture more opportunities 24/7.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            Go Back Home
          </Link>
        </div>
        <HorizontalGradient className="top-10" />
        <HorizontalGradient className="bottom-10" />
      </div>
      {/* Content Grid */}
      <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 relative overflow-hidden">
        <div id="contact-form" className="scroll-mt-24">
          <ContactForm />
        </div>
        <div className="relative w-full z-20 hidden md:flex border-l border-neutral-100 dark:border-neutral-900 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-neutral-950 dark:to-black items-center justify-center">
          <div className="max-w-lg mx-auto px-8 py-20">
            <div className="rounded-3xl border border-neutral-200/70 dark:border-neutral-800/70 bg-white/70 dark:bg-neutral-950/70 backdrop-blur-xl shadow-[0_25px_80px_-50px_rgba(0,0,0,0.45)] p-10 space-y-8 text-left">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
                  Ready to Never Miss a Call Again?
                </h2>
                <p className="text-base md:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  Schedule a personalized demo and see how ACAI helps plumbing and HVAC businesses capture more jobs automatically. Our team will walk you through exactly how it works and how it fits into your operation.
                </p>
              </div>
              <ul className="space-y-4">
                {demoPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-red-500/15 via-purple-500/15 to-blue-500/15">
                      <IconCircleCheckFilled className="h-4 w-4 text-purple-300" />
                    </span>
                    <span className="text-base md:text-lg text-neutral-700 dark:text-neutral-200 leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
              <Button
                as={Link}
                href="#contact-form"
                className="w-full md:w-auto gap-2 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/20"
              >
                <IconPhoneCall className="h-5 w-5" />
                Schedule a Demo
              </Button>
            </div>
          </div>
          <HorizontalGradient className="top-20" />
          <HorizontalGradient className="bottom-20" />
          <HorizontalGradient className="-right-80 transform rotate-90 inset-y-0 h-full scale-x-150" />
          <HorizontalGradient className="-left-80 transform rotate-90 inset-y-0 h-full scale-x-150" />
        </div>
      </div>
    </div>
  );
}
