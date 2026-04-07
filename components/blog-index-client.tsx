"use client";

import { BlogWithSlug } from "@/lib/blog";
import { Container } from "./container";
import { Background } from "./background";
import { BlurImage } from "./blur-image";
import { Logo } from "./Logo";
import { Link } from "next-view-transitions";
import { motion } from "framer-motion";
import { format } from "date-fns";

const categories = ["All", "Automation", "Lead Generation", "Web Design"] as const;

export function BlogIndexClient({ blogs }: { blogs: BlogWithSlug[] }) {
  const featured = blogs[0];
  const rest = blogs.slice(1);

  return (
    <div className="relative overflow-hidden py-24 md:py-0">
      <Background />
      <Container className="relative z-20 pb-24 md:pt-36">
        {/* Hero */}
        <section className="mx-auto max-w-3xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-semibold leading-tight text-white md:text-6xl"
          >
            ACAI Insights
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-4 text-base text-neutral-400 md:text-lg"
          >
            Real insights on automation, leads, and growing service businesses.
          </motion.p>
        </section>

        {/* Featured Post */}
        {featured && (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mx-auto mt-14 max-w-5xl"
          >
            <Link
              href={`/blog/${featured.slug}`}
              className="group relative block overflow-hidden rounded-2xl border border-white/[0.08] bg-neutral-950/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/25 hover:shadow-[0_16px_48px_rgba(168,85,247,0.1)]"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-56 md:h-full md:min-h-[320px]">
                  {featured.image ? (
                    <BlurImage
                      src={featured.image}
                      alt={featured.title}
                      height="600"
                      width="800"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-neutral-900">
                      <Logo />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                </div>
                <div className="flex flex-col justify-center p-6 md:p-10">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-purple-400">
                    Featured
                  </span>
                  <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-400">
                    {featured.description}
                  </p>
                  <div className="mt-5 flex items-center gap-3 text-xs text-neutral-500">
                    <span>{featured.author.name}</span>
                    <span className="h-1 w-1 rounded-full bg-neutral-600" />
                    <time dateTime={featured.date}>
                      {format(new Date(featured.date), "MMMM dd, yyyy")}
                    </time>
                  </div>
                </div>
              </div>
            </Link>
          </motion.section>
        )}

        {/* Categories */}
        <div className="mx-auto mt-12 flex max-w-5xl flex-wrap gap-2">
          {categories.map((cat) => (
            <span
              key={cat}
              className="cursor-default rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-1.5 text-xs text-neutral-400 transition hover:border-purple-400/25 hover:text-white"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Posts Grid */}
        <section className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((blog, i) => (
            <motion.div
              key={blog.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link
                href={`/blog/${blog.slug}`}
                className="group block overflow-hidden rounded-2xl border border-white/[0.08] bg-neutral-950/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/25 hover:shadow-[0_12px_32px_rgba(168,85,247,0.08)]"
              >
                <div className="relative h-44">
                  {blog.image ? (
                    <BlurImage
                      src={blog.image}
                      alt={blog.title}
                      height="400"
                      width="600"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-neutral-900">
                      <Logo />
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-white line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-neutral-400">
                    {blog.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-[11px] text-neutral-500">
                    <time dateTime={blog.date}>
                      {format(new Date(blog.date), "MMM dd, yyyy")}
                    </time>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </section>
      </Container>
    </div>
  );
}
