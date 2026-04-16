import type { Metadata } from "next";
import "../globals.css";
import { GeistSans } from "geist/font/sans";
import { NavBar } from "@/components/navbar";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Try ACAI Marketing | Never Miss a Lead Again",
  description:
    "Never miss a lead again. ACAI helps service businesses automate follow up, qualify leads faster, and turn more demand into booked jobs.",
  openGraph: {
    title: "Try ACAI Marketing | Never Miss a Lead Again",
    description:
      "Never miss a lead again. ACAI helps service businesses automate follow up, qualify leads faster, and turn more demand into booked jobs.",
    images: ["https://tryacai.ai/nevermissaleadpreviewimage.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Try ACAI Marketing | Never Miss a Lead Again",
    description:
      "Never miss a lead again. ACAI helps service businesses automate follow up, qualify leads faster, and turn more demand into booked jobs.",
    images: ["https://tryacai.ai/nevermissaleadpreviewimage.png"],
  },
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <NavBar />
      {children}
      <Footer />
    </main>
  );
}
