import { LoginForm } from "@/components/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Log in to Mica Growth to manage your lead conversion and follow-up automation workflows.",
  openGraph: {
    images: ["https://micagrowth.co/nevermissaleadpreviewimage.png"],
  },
};

export default function LoginPage() {
  return <LoginForm />;
}
