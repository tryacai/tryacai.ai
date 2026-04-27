import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industry Solutions",
  description:
    "Lead conversion and follow-up automation for service businesses.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PlumbingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
