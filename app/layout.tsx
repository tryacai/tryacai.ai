import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { cn } from "@/lib/utils";
import { ViewTransitions } from "next-view-transitions";
 

export const metadata: Metadata = {
  metadataBase: new URL("https://tryacai.ai"),
  title: "Try ACAI AI | Never Miss a Lead Again",
  description:
    "Never miss a lead again. ACAI helps service businesses automate follow up, qualify leads faster, and turn more demand into booked jobs.",
  icons: {
    icon: "/icon.jpg",
    shortcut: "/icon.jpg",
    apple: "/apple-icon.jpg",
  },
  openGraph: {
    title: "Try ACAI AI | Never Miss a Lead Again",
    description:
      "Never miss a lead again. ACAI helps service businesses automate follow up, qualify leads faster, and turn more demand into booked jobs.",
    url: "https://tryacai.ai",
    siteName: "ACAI AI",
    images: [
      {
        url: "https://tryacai.ai/nevermissaleadpreviewimage.png",
        width: 1200,
        height: 630,
        alt: "Try ACAI AI | Never Miss a Lead Again",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Try ACAI AI | Never Miss a Lead Again",
    description:
      "Never miss a lead again. ACAI helps service businesses automate follow up, qualify leads faster, and turn more demand into booked jobs.",
    images: ["https://tryacai.ai/nevermissaleadpreviewimage.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning className="dark">
        <body
          className={cn(
            GeistSans.className,
            "bg-black text-white antialiased h-full w-full"
          )}
        >
          {children}
        </body>
      </html>
    </ViewTransitions>
  );
}
