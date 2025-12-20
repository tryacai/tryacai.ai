import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { cn } from "@/lib/utils";
import { ViewTransitions } from "next-view-transitions";
import { ThemeProvider } from "@/context/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://tryacai.ai"),
  title: "ACAI AI | AI Receptionist for Plumbers & HVAC",
  description: "Never miss a call again. ACAI AI is an AI receptionist built for plumbers and HVAC to answer calls and book jobs 24/7.",
  openGraph: {
    title: "ACAI AI | AI Receptionist for Plumbers & HVAC",
    description: "Never miss a call again. ACAI AI is an AI receptionist built for plumbers and HVAC to answer calls and book jobs 24/7.",
    url: "https://tryacai.ai",
    siteName: "ACAI AI",
    images: [
      {
        url: "https://tryacai.ai/finalwebsitepreviewimage.png",
        width: 1200,
        height: 630,
        alt: "ACAI AI – AI Receptionist for Plumbers & HVAC",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ACAI AI | AI Receptionist for Plumbers & HVAC",
    description: "Never miss a call again. ACAI AI is an AI receptionist built for plumbers and HVAC to answer calls and book jobs 24/7.",
    images: ["https://tryacai.ai/finalwebsitepreviewimage.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            GeistSans.className,
            "bg-black text-white antialiased h-full w-full"
          )}
        >
          <ThemeProvider
            attribute="class"
            enableSystem
            disableTransitionOnChange
            defaultTheme="dark"
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
