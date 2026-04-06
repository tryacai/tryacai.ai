import { LoginForm } from "@/components/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | ACAI AI",
  description:
    "Log in to ACAI AI to manage your lead conversion and follow-up automation workflows.",
  openGraph: {
    images: ["https://tryacai.ai/opengraph-image.png"],
  },
};

export default function LoginPage() {
  return <LoginForm />;
}
