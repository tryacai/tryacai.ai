import glob from "fast-glob";

export interface Blog {
  title: string;
  description: string;
  author: {
    name: string;
    src: string;
  };
  date: string;
  image?: string;
}

export interface BlogWithSlug extends Blog {
  slug: string;
}

async function importBlog(blogFilename: string): Promise<BlogWithSlug> {
  const imported = (await import(
    `../app/(marketing)/blog/${blogFilename}`
  )) as {
    default: React.ComponentType;
    blog: Blog;
  };

  const { blog } = imported;

  return {
    slug: blogFilename.replace(/(\/page)?\.mdx$/, ""),
    title: blog.title,
    description: blog.description,
    author: blog.author,
    date: blog.date,
    image: blog.image, // THIS is what the blog card reads
  };
}

export async function getAllBlogs(): Promise<BlogWithSlug[]> {
  const blogFilenames = await glob("*/page.mdx", {
    cwd: "./app/(marketing)/blog",
  });

  const blogs = await Promise.all(blogFilenames.map(importBlog));

  return blogs.sort(
    (a, z) => +new Date(z.date) - +new Date(a.date)
  );
}
