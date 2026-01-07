import Link from "next/link";
import React from "react";
import { Logo } from "./Logo";

export const Footer = () => {
  const primaryLinks = [
    {
      name: "Pricing",
      href: "/pricing",
    },
    {
      name: "Schedule Demo",
      href: "/schedule-demo",
    },
    {
      name: "Blog",
      href: "/blog",
    },
    {
      name: "Contact",
      href: "/contact",
    },
  ];
  
  const socials = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/acai-ai",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/tryacai.ai/?next=%2F&hl=en",
    },
  ];
  return (
    <div className="relative">
      <div className="border-t border-neutral-100  dark:border-neutral-800 px-8 pt-20 pb-8 relative bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto text-sm text-neutral-500 dark:text-neutral-400 flex sm:flex-row flex-col justify-between items-start ">
          <div>
            <div className="mr-4  md:flex mb-4">
              <Logo />
            </div>
            <div className="mt-2 text-xs sm:text-sm max-w-md">
              24/7 AI customer assistant built for plumbing and HVAC businesses. Never miss another call and never miss another client.
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mt-10 md:mt-0">
            <div className="flex justify-start space-y-4 flex-col">
              <h3 className="font-semibold text-sm text-neutral-800 dark:text-neutral-200 mb-2">
                Navigation
              </h3>
              {primaryLinks.map((link) => (
                <Link
                  key={link.name}
                  className="transition-colors hover:text-black text-muted dark:text-muted-dark dark:hover:text-neutral-400 text-xs sm:text-sm"
                  href={link.href}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="flex justify-start space-y-4 flex-col">
              <h3 className="font-semibold text-sm text-neutral-800 dark:text-neutral-200 mb-2">
                Connect
              </h3>
              {socials.map((link) => (
                <Link
                  key={link.name}
                  className="transition-colors hover:text-black text-muted dark:text-muted-dark dark:hover:text-neutral-400 text-xs sm:text-sm"
                  href={link.href}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* Separator line and copyright section */}
        <div className="max-w-7xl mx-auto mt-16">
          <div className="border-t border-neutral-200 dark:border-neutral-700 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-500 dark:text-neutral-400">
              <div className="mb-4 sm:mb-0">
                © {new Date().getFullYear()} ACAI. All rights reserved.
              </div>
              <div className="flex gap-6">
                <Link
                  href="/privacy-policy"
                  className="transition-colors hover:text-black dark:hover:text-neutral-300"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="transition-colors hover:text-black dark:hover:text-neutral-300"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-5xl md:text-9xl lg:text-[18rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 dark:from-neutral-950 to-neutral-200 dark:to-neutral-800 inset-x-0">
        ACAI AI
      </p>
    </div>
  );
};
