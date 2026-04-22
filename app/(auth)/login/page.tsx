import { LoginForm } from "@/components/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | ACAI Marketing",
  description:
    "Log in to ACAI Marketing to manage your lead conversion and follow-up automation workflows.",
  openGraph: {
    images: ["https://micagrowth.com/nevermissaleadpreviewimage.png"],
  },
};

export default function LoginPage() {
  return <LoginForm />;
}
