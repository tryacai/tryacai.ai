import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { cn } from "@/lib/utils";
import { ViewTransitions } from "next-view-transitions";

const META_PIXEL_ID = "1215596613789536";
 

export const metadata: Metadata = {
  metadataBase: new URL("https://micagrowth.co"),
  title: {
    default: "Mica Growth — Floor Coating Marketing Agency",
    template: "%s | Mica Growth",
  },
  description:
    "Mica Growth is the #1 performance-based marketing agency for floor coating businesses. Guaranteed booked jobs, AI-powered lead follow-up, and results in your first month — or your next month is free.",
  icons: {
    icon: "/Micalogo.png",
  },
  openGraph: {
    title: "Mica Growth — Floor Coating Marketing Agency",
    description:
      "The #1 performance-based marketing agency for floor coating businesses. Guaranteed booked jobs, AI-powered lead follow-up, and results in your first month.",
    url: "https://micagrowth.co",
    siteName: "Mica Growth",
    images: [
      {
        url: "https://micagrowth.co/nevermissaleadpreviewimage.png",
        width: 1200,
        height: 630,
        alt: "Mica Growth — Floor Coating Marketing Agency",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mica Growth — Floor Coating Marketing Agency",
    description:
      "The #1 performance-based marketing agency for floor coating businesses. Guaranteed booked jobs, AI-powered lead follow-up, and results in your first month.",
    images: ["https://micagrowth.co/nevermissaleadpreviewimage.png"],
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
        <head>
          <meta
            name="facebook-domain-verification"
            content="6mk9n6pk4urvjj67f28mamvy22dy65"
          />
        </head>
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
                console.log('[Meta Pixel] Initialized with ID ${META_PIXEL_ID}');
                console.log('[Meta Pixel] PageView fired');
                fbq('track', 'TestEvent');
                console.log('[Meta Pixel] TestEvent fired — remove after verifying in Events Manager');
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
