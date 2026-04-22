import { Background } from "@/components/background";
import { Metadata } from "next";
import { HorizontalGradient } from "@/components/horizontal-gradient";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Contact | ACAI Marketing",
  description:
    "Contact ACAI Marketing — the #1 performance-based marketing agency for floor coating businesses. Guaranteed booked jobs and results in your first month.",
  openGraph: {
    title: "Contact | ACAI Marketing",
    description:
      "Contact ACAI Marketing — the #1 performance-based marketing agency for floor coating businesses. Guaranteed booked jobs and results in your first month.",
    images: ["https://micagrowth.com/nevermissaleadpreviewimage.png"],
  },
  twitter: {
    title: "Contact | ACAI Marketing",
    description:
      "Contact ACAI Marketing — the #1 performance-based marketing agency for floor coating businesses. Guaranteed booked jobs and results in your first month.",
    images: ["https://micagrowth.com/nevermissaleadpreviewimage.png"],
  },
};

export default function ContactPage() {
  redirect("/#contact");
}
