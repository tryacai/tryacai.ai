import { LoginForm } from "@/components/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - ACAI AI",
  description:
    "Log in to ACAI AI to manage your AI receptionist for your plumbing or HVAC business.",
  openGraph: {
    images: ["/finalwebsitepreviewimage.png"],
  },
};

export default function LoginPage() {
  return <LoginForm />;
}
