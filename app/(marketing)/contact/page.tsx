import { Background } from "@/components/background";
import { Metadata } from "next";
import { HorizontalGradient } from "@/components/horizontal-gradient";
import { ContactForm } from "../../../components/contact";

export const metadata: Metadata = {
  title: "Contact | ACAI AI",
  description:
    "Never miss a lead again. ACAI helps service businesses automate follow up, qualify leads faster, and turn more demand into booked jobs.",
  openGraph: {
    title: "Try ACAI AI | Never Miss a Lead Again",
    description:
      "Never miss a lead again. ACAI helps service businesses automate follow up, qualify leads faster, and turn more demand into booked jobs.",
    images: ["https://tryacai.ai/opengraph-image.png"],
  },
  twitter: {
    title: "Try ACAI AI | Never Miss a Lead Again",
    description:
      "Never miss a lead again. ACAI helps service businesses automate follow up, qualify leads faster, and turn more demand into booked jobs.",
    images: ["https://tryacai.ai/twitter-image.png"],
  },
};

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden bg-gray-50 dark:bg-black">
      <Background />
      <HorizontalGradient className="bottom-20" />
      <div className="relative z-20 mx-auto max-w-2xl px-6 py-24">
        <div className="text-center mb-10 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
            Close the Gap Between Inquiry and Booked Revenue
          </h1>
          <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-300">
            Request a strategy demo, explore the systems you need, and get help identifying where lead conversion breaks down.
          </p>
        </div>
        <div id="contact-form" className="scroll-mt-24">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
