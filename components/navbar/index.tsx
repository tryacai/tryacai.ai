"use client";
import { DesktopNavbar } from "./desktop-navbar";
import { MobileNavbar } from "./mobile-navbar";
import { motion } from "framer-motion";

const navItems = [
  {
    title: "Industries We Support",
    link: "#",
    children: [
      { title: "Plumbing", link: "/plumbing" },
      { title: "HVAC", link: "/hvac" },
      { title: "Barbers", link: "/barbers" },
      { title: "Roofing", link: "/roofing" },
      { title: "Mechanics", link: "/mechanics" },
      { title: "Detailing", link: "/detailing" },
      { title: "Electricians", link: "/electricians" },
      { title: "Landscaping", link: "/landscaping" },
      { title: "Pest Control", link: "/pest-control" },
      { title: "Med Spa", link: "/med-spa" },
      { title: "Chiropractor", link: "/chiropractor" },
      { title: "See Pricing", link: "/pricing", highlight: true },
    ],
  },
  {
    title: "Pricing",
    link: "/pricing",
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
