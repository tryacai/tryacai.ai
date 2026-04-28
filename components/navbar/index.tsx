"use client";
import { DesktopNavbar } from "./desktop-navbar";
import { MobileNavbar } from "./mobile-navbar";
import { motion } from "framer-motion";

const navItems = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Mica Growth System",
    link: "/ai",
    highlightAI: true,
  },
  {
    title: "Blog",
    link: "/blog",
  },
  {
    title: "FAQ",
    link: "/faq",
  },
];

export function NavBar() {
  return (
    <>
      <div className="hidden lg:block w-full">
        <DesktopNavbar navItems={navItems} />
      </div>
      <div className="flex h-full w-full items-center lg:hidden ">
        <MobileNavbar navItems={navItems} />
      </div>
    </>
  );
}
