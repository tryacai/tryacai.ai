import { Background } from "@/components/background";
import { Metadata } from "next";
import { cn } from "@/lib/utils";
import { HorizontalGradient } from "@/components/horizontal-gradient";
import { ContactForm } from "@/components/contact";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us - ACAI AI",
  description:
    "Get started with ACAI AI. Contact us to learn how our AI receptionist can help your plumbing or HVAC business answer calls and book jobs 24/7.",
  openGraph: {
    images: ["/finalwebsitepreviewimage.png"],
  },
};

export default function PricingPage() {
  return (
    <div className="relative overflow-hidden py-20 md:py-0 px-4 md:px-20 bg-gray-50 dark:bg-black">
      <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 relative overflow-hidden">
        <Background />
        <ContactForm />
        <div className="relative w-full z-20 hidden md:flex border-l border-neutral-100 dark:border-neutral-900 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-neutral-950 dark:to-black items-center justify-center">
          <div className="max-w-lg mx-auto px-8 py-20 text-center">
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
          <HorizontalGradient className="top-20" />
          <HorizontalGradient className="bottom-20" />
          <HorizontalGradient className="-right-80 transform rotate-90 inset-y-0 h-full scale-x-150" />
          <HorizontalGradient className="-left-80 transform rotate-90 inset-y-0 h-full scale-x-150" />
        </div>
      </div>
    </div>
  );
}
