import type { Metadata } from "next";
import "../globals.css";
import { GeistSans } from "geist/font/sans";
import { NavBar } from "@/components/navbar";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "ACAI AI | AI Receptionist for Plumbers & HVAC",
  description:
    "Never miss a call again. ACAI AI is an AI receptionist built for plumbers and HVAC to answer calls and book jobs 24/7.",
  openGraph: {
    images: ["/websitepreviewimage.png"],
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
