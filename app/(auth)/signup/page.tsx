import { SignupForm } from "@/components/signup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | ACAI AI",
  description:
    "Sign up for ACAI AI to automate follow up, improve response speed, and convert more inbound demand into booked jobs.",
  openGraph: {
    images: ["https://tryacai.ai/nevermissaleadpreviewimage.png"],
  },
};

export default function SignupPage() {
  return <SignupForm />;
}
