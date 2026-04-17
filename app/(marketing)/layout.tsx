import type { Metadata } from "next";
import "../globals.css";
import { GeistSans } from "geist/font/sans";
import { NavBar } from "@/components/navbar";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Try ACAI Marketing | Floor Coating Marketing Agency | Guaranteed Booked Jobs",
  description:
    "ACAI Marketing is the #1 performance-based marketing agency for floor coating businesses. Guaranteed booked jobs, AI-powered lead follow-up, and results in your first month — or your next month is free.",
  openGraph: {
    title: "Try ACAI Marketing | Floor Coating Marketing Agency",
    description:
      "The #1 performance-based marketing agency for floor coating businesses. Guaranteed booked jobs, AI-powered lead follow-up, and results in your first month.",
    images: ["https://tryacai.ai/nevermissaleadpreviewimage.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Try ACAI Marketing | Floor Coating Marketing Agency",
    description:
      "The #1 performance-based marketing agency for floor coating businesses. Guaranteed booked jobs, AI-powered lead follow-up, and results in your first month.",
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
