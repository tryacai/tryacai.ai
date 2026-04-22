import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mica Growth System | ACAI Marketing",
  description:
    "Explore ACAI's lead response automation stack: Web Funnel, Chat Widget, Voice AI, and Automation Engine to capture more inbound demand.",
};

export default function AiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
