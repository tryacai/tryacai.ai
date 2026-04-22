import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/plumbing",
        "/hvac",
        "/residential-plumbing",
        "/commercial-plumbing",
        "/septic",
        "/sewer-drain",
        "/water-heater",
        "/solutions/ai-receptionist",
      ],
    },
    sitemap: "https://micagrowth.com/sitemap.xml",
  };
}
