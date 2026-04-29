"use client";
import { Logo } from "../Logo";
import { Button } from "../button";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";

type Props = {
  navItems: {
    link: string;
    title: string;
    target?: "_blank";
    highlightAI?: boolean;
    children?: { link: string; title: string; highlight?: boolean }[];
  }[];
};

export const DesktopNavbar = ({ navItems }: Props) => {
  const pathname = usePathname();

  return (
    <div className="w-full bg-black border-b border-white/10">
      <div className="h-16 md:h-18 flex items-center justify-between px-6">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <Logo />
        </div>

        {/* Center: Nav Links */}
        <div className="flex-1 flex items-center justify-center gap-8">
          <Link
            href="/"
            className="text-white text-[15px] font-medium hover:opacity-70 transition-opacity"
          >
            Home
          </Link>
          <Link
            href="/ai"
            className="text-white text-[15px] font-medium hover:opacity-70 transition-opacity bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 bg-clip-text text-transparent"
          >
            Mica Growth System
          </Link>
          <Link
            href="/blog"
            className="text-white text-[15px] font-medium hover:opacity-70 transition-opacity"
          >
            Blog
          </Link>
          <Link
            href="/faq"
            className="text-white text-[15px] font-medium hover:opacity-70 transition-opacity"
          >
            FAQ
          </Link>
        </div>

        {/* Right: Get Started Button */}
        <div className="flex-shrink-0">
          <Button 
            as={Link} 
            href="/#contact"
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 hover:from-blue-600 hover:via-purple-600 hover:to-red-600 text-white flex items-center gap-2 border-0 shadow-none"
          >
            <Phone className="h-4 w-4" />
            Claim Your Territory
          </Button>
        </div>
      </div>
    </div>
  );
};
