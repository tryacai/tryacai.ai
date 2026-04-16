import { Background } from "@/components/background";
import { Metadata } from "next";
import { HorizontalGradient } from "@/components/horizontal-gradient";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Contact | ACAI Marketing",
  description:
    "Never miss a lead again. ACAI helps service businesses automate follow up, qualify leads faster, and turn more demand into booked jobs.",
  openGraph: {
    title: "Try ACAI Marketing | Never Miss a Lead Again",
    description:
      "Never miss a lead again. ACAI helps service businesses automate follow up, qualify leads faster, and turn more demand into booked jobs.",
    images: ["https://tryacai.ai/nevermissaleadpreviewimage.png"],
  },
  twitter: {
    title: "Try ACAI Marketing | Never Miss a Lead Again",
    description:
      "Never miss a lead again. ACAI helps service businesses automate follow up, qualify leads faster, and turn more demand into booked jobs.",
    images: ["https://tryacai.ai/nevermissaleadpreviewimage.png"],
  },
};

export default function ContactPage() {
  redirect("/#contact");
}
