import { Background } from "@/components/background";
import { Metadata } from "next";
import { HorizontalGradient } from "@/components/horizontal-gradient";
import { ContactForm } from "@/components/contact";

export const metadata: Metadata = {
  title: "Contact Us - ACAI AI",
  description:
    "Get started with ACAI AI. Contact us to learn how our AI receptionist can help your plumbing or HVAC business answer calls and book jobs 24/7.",
  openGraph: {
    images: ["https://tryacai.ai/V2websitepreviewimage.png"],
  },
};

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden bg-gray-50 dark:bg-black">
      <Background />
      <HorizontalGradient className="top-20" />
      <HorizontalGradient className="bottom-20" />
      <div className="relative z-20 mx-auto max-w-2xl px-6 py-24">
        <div className="text-center mb-10 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
            Let’s See If ACAI Is a Fit For You
          </h1>
          <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-300">
            Fill this out so we can evaluate your business.
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            To move forward, you’ll need to fill out the official contact form on our website.
          </p>
        </div>
        <div id="contact-form" className="scroll-mt-24">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
