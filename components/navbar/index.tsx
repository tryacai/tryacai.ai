"use client";
import { DesktopNavbar } from "./desktop-navbar";
import { MobileNavbar } from "./mobile-navbar";
import { motion } from "framer-motion";

const navItems = [
  {
    title: "Contractor Services We Support",
    link: "#",
    children: [
      { title: "Plumbing", link: "/plumbing" },
      { title: "HVAC", link: "/hvac" },
      { title: "Sewer & Drain", link: "/sewer-drain" },
      { title: "Septic", link: "/septic" },
      { title: "Water Heater Services", link: "/water-heater" },
      { title: "Residential Plumbing", link: "/residential-plumbing" },
      { title: "Commercial Plumbing", link: "/commercial-plumbing" },
    ],
  },
  {
    title: "FAQ",
    link: "/faq",
  },
  {
    title: "Blog",
    link: "/blog",
  },
  {
    title: "Contact",
    link: "/contact",
  },
  {
    title: "Try Our AI",
    link: "/ai",
    highlightAI: true,
  },
];

export function NavBar() {
  return (
    <motion.nav
      initial={{
        y: -80,
      }}
      animate={{
        y: 0,
      }}
      transition={{
        ease: [0.6, 0.05, 0.1, 0.9],
        duration: 0.8,
      }}
      className="max-w-[90rem] fixed top-4 mx-auto inset-x-0 z-50 w-[95%] lg:w-[98%] xl:w-full"
    >
      <div className="hidden lg:block w-full">
        <DesktopNavbar navItems={navItems} />
      </div>
      <div className="flex h-full w-full items-center lg:hidden ">
        <MobileNavbar navItems={navItems} />
      </div>
    </motion.nav>
  );
}

{
  /* <div className="hidden md:block ">
        <DesktopNavbar />
      </div>
      <div className="flex h-full w-full items-center md:hidden ">
        <MobileNavbar navItems={navItems} />
      </div> */
}
