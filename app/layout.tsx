import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { cn } from "@/lib/utils";
import { ViewTransitions } from "next-view-transitions";

const META_PIXEL_ID = "1215596613789536";
 

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
          <Script
            id="meta-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${META_PIXEL_ID}');
                fbq('track', 'PageView');
              `,
            }}
          />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
          {children}
        </body>
      </html>
    </ViewTransitions>
  );
}
