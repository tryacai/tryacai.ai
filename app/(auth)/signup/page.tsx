import { SignupForm } from "@/components/signup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | ACAI Marketing",
  description:
    "Sign up for ACAI Marketing to automate follow up, improve response speed, and convert more inbound demand into booked jobs.",
  openGraph: {
    images: ["https://micagrowth.com/nevermissaleadpreviewimage.png"],
  },
};

export default function SignupPage() {
  return <SignupForm />;
}
