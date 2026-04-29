import type { Metadata } from "next";
import "../globals.css";
import { GeistSans } from "geist/font/sans";
import { NavBar } from "@/components/navbar";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: {
    default: "Mica Growth — Floor Coating Marketing Agency",
    template: "%s | Mica Growth",
  },
  description:
    "Mica Growth is the #1 performance-based marketing agency for floor coating businesses. Guaranteed booked jobs, AI-powered lead follow-up, and results in your first month — or your next month is free.",
  openGraph: {
    title: "Mica Growth — Floor Coating Marketing Agency",
    description:
      "The #1 performance-based marketing agency for floor coating businesses. Guaranteed booked jobs, AI-powered lead follow-up, and results in your first month.",
    images: ["https://micagrowth.co/nevermissaleadpreviewimage.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mica Growth — Floor Coating Marketing Agency",
    description:
      "The #1 performance-based marketing agency for floor coating businesses. Guaranteed booked jobs, AI-powered lead follow-up, and results in your first month.",
    images: ["https://micagrowth.co/nevermissaleadpreviewimage.png"],
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
