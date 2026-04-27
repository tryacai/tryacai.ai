import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Voice AI",
  description:
    "Use Mica Growth Voice AI to answer, qualify, and route high-intent calls quickly as part of your lead conversion and automation system.",
};

export default function VoiceAiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
