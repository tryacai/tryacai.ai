import { SignupForm } from "@/components/signup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - ACAI AI",
  description:
    "Sign up for ACAI AI and get an AI receptionist that answers calls and books jobs for your plumbing or HVAC business 24/7.",
  openGraph: {
    images: ["/og-image.png"],
  },
};

export default function SignupPage() {
  return <SignupForm />;
}
