import { type Metadata } from "next";
import { getAllBlogs } from "@/lib/blog";
import { Background } from "@/components/background";
import { Container } from "@/components/container";
import { Heading } from "@/components/heading";
import { Subheading } from "@/components/subheading";
import { BlogCard } from "@/components/blog-card";
import { Roadmap } from "@/components/roadmap";

export const metadata: Metadata = {
  title: "Blog - ACAI AI",
  description:
    "Discover insights and expert advice about AI receptionists for home service businesses. Learn how ACAI AI helps plumbers and HVAC companies never miss a call.",
  openGraph: {
    images: ["/finalwebsitepreviewimage.png"],
  },
};

export default async function ArticlesIndex() {
  let allBlogs = await getAllBlogs();
  
  // Filter out specific blogs
  const blogsToExclude = [
    "cool-things-to-do-with-ai",
    "how-companies-are-working-without-ai",
    "what-is-ai-anyway"
  ];
  
  let blogs = allBlogs.filter(blog => !blogsToExclude.includes(blog.slug));

  return (
    <div className="relative overflow-hidden py-20 md:py-0">
      <Background />
      <Container className="flex flex-col items-center justify-between pb-20">
        <div className="relative z-20 py-10 md:pt-40">
          <Heading as="h1">Blog</Heading>
          <Subheading className="text-center">
            Discover insightful resources and expert advice from our seasoned
            team to elevate your knowledge.
          </Subheading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-20 w-full mb-10">
          {blogs.slice(0, 2).map((blog, index) => (
            <BlogCard blog={blog} key={blog.title + index} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full relative z-20 mb-16">
          {blogs.slice(2).map((blog, index) => (
            <BlogCard blog={blog} key={blog.title + index} />
          ))}
        </div>

        {/* Roadmap Section */}
        <Roadmap />
      </Container>
    </div>
  );
}
