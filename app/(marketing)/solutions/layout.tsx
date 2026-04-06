import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solutions | ACAI AI",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SolutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
