"use client";
import { DesktopNavbar } from "./desktop-navbar";
import { MobileNavbar } from "./mobile-navbar";

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
    <div className="fixed top-0 left-0 right-0 z-[1000] w-full bg-black">
      <div className="hidden lg:block w-full">
        <DesktopNavbar navItems={navItems} />
      </div>
      <div className="flex h-full w-full items-center lg:hidden ">
        <MobileNavbar navItems={navItems} />
      </div>
    </div>
  );
}
