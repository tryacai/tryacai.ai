import type { Metadata } from "next";
import { getAllBlogs } from "@/lib/blog";
import { BlogIndexClient } from "@/components/blog-index-client";

export const metadata: Metadata = {
  title: "ACAI Insights | Blog",
  description:
    "Real insights on automation, leads, and growing service businesses in Tampa and across Florida.",
  openGraph: {
    title: "ACAI Insights | Blog",
    description:
      "Real insights on automation, leads, and growing service businesses in Tampa and across Florida.",
    images: ["https://micagrowth.com/nevermissaleadpreviewimage.png"],
  },
};

export default async function BlogIndexPage() {
  const blogs = await getAllBlogs();
  return <BlogIndexClient blogs={blogs} />;
}
