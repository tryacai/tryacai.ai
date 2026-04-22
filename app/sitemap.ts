import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://micagrowth.com";

  const routes = [
    "",
    "/contact",
    "/ai",
    "/web-funnel",
    "/chat-widget",
    "/voice-ai",
    "/automation-engine",
    "/revenue-intelligence",
    "/blog",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
