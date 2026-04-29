"use client";
import { DesktopNavbar } from "./desktop-navbar";
import { MobileNavbar } from "./mobile-navbar";
import { useEffect, useState } from "react";

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
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setAtTop(window.scrollY <= 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[1000] w-full bg-black transition-all duration-300 ${
        atTop ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="hidden lg:block w-full">
        <DesktopNavbar navItems={navItems} />
      </div>
      <div className="flex h-full w-full items-center lg:hidden ">
        <MobileNavbar navItems={navItems} />
      </div>
    </div>
  );
}
