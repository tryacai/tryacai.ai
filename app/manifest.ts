import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mica Growth",
    short_name: "Mica Growth",
    description:
      "Mica Growth is the #1 performance-based marketing agency for floor coating businesses. Guaranteed booked jobs, AI-powered lead follow-up, and results in your first month.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/icon.jpg",
        sizes: "192x192",
        type: "image/jpeg",
      },
      {
        src: "/icon.jpg",
        sizes: "512x512",
        type: "image/jpeg",
      },
      {
        src: "/apple-icon.jpg",
        sizes: "180x180",
        type: "image/jpeg",
      },
    ],
  };
}
