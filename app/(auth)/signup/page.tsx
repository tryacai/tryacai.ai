import { SignupForm } from "@/components/signup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Sign up for Mica Growth to automate follow up, improve response speed, and convert more inbound demand into booked jobs.",
  openGraph: {
    images: ["https://micagrowth.co/nevermissaleadpreviewimage.png"],
  },
};

export default function SignupPage() {
  return <SignupForm />;
}
