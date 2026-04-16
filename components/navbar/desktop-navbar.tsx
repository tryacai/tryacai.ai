"use client";
import { Logo } from "../Logo";
import { Button } from "../button";
import { NavBarItem } from "./navbar-item";
import { Phone } from "lucide-react";
import { ChevronDown } from "lucide-react";
import {
  useMotionValueEvent,
  useScroll,
  motion,
  AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";
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
  const { scrollY } = useScroll();
  const pathname = usePathname();

  const [showBackground, setShowBackground] = useState(false);

  useMotionValueEvent(scrollY, "change", (value) => {
    if (value > 100) {
      setShowBackground(true);
    } else {
      setShowBackground(false);
    }
  });
  return (
    <div
      className={cn(
        "w-full flex relative justify-between px-4 py-2 rounded-full bg-transparent transition duration-200",
        showBackground &&
          "bg-neutral-50 dark:bg-neutral-900 shadow-[0px_-2px_0px_0px_var(--neutral-100),0px_2px_0px_0px_var(--neutral-100)] dark:shadow-[0px_-2px_0px_0px_var(--neutral-800),0px_2px_0px_0px_var(--neutral-800)]"
      )}
    >
      <AnimatePresence>
        {showBackground && (
          <motion.div
            key={String(showBackground)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
            }}
            className="absolute inset-0 h-full w-full bg-neutral-100 dark:bg-neutral-800 pointer-events-none [mask-image:linear-gradient(to_bottom,white,transparent,white)] rounded-full"
          />
        )}
      </AnimatePresence>
      <div className="flex flex-row gap-2 items-center">
        <Logo />
        <div className="flex items-center gap-2 ml-4">
          {navItems.map((item) => {
            if (item.children?.length) {
              return (
                <div key={item.title} className="relative group">
                  <button
                    type="button"
                    className="flex items-center justify-center text-sm leading-[110%] px-4 py-2 rounded-md hover:bg-[#F5F5F5] dark:hover:bg-neutral-800 hover:text-black text-muted dark:text-muted-dark"
                  >
                    {item.title}
                    <ChevronDown className="ml-1 h-3.5 w-3.5" />
                  </button>
                  <div className="pointer-events-none absolute left-0 top-full z-50 pt-2 opacity-0 transition-all duration-150 group-hover:pointer-events-auto group-hover:opacity-100">
                    <div className="w-64 rounded-xl border border-white/10 bg-neutral-950/95 p-2 shadow-2xl">
                      {item.children.map((child) => {
                        const isActive = pathname === child.link;
                        const isPricingLink = !!child.highlight;
                        return (
                          <Link
                            key={child.title}
                            href={child.link}
                            className={cn(
                              "block rounded-md px-3 py-2 text-sm transition-colors",
                              isPricingLink
                                ? "mt-1 border-t border-white/10 pt-3 text-neutral-400 hover:text-white"
                                : "text-neutral-200 hover:bg-white/10 hover:text-white",
                              isActive && "bg-white/10 text-white"
                            )}
                          >
                            {child.title}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <NavBarItem
                href={item.link}
                key={item.title}
                target={item.target}
                className={
                  item.highlightAI
                    ? "bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 bg-clip-text text-transparent blur-[0.2px] drop-shadow-[0_0_6px_rgba(123,0,255,0.35)] transition-all duration-200 hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.45)]"
                    : undefined
                }
              >
                {item.title}
              </NavBarItem>
            );
          })}
        </div>
      </div>
      <div className="flex space-x-2 items-center">
        <Button 
          as={Link} 
          href="/#contact"
          className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 hover:from-blue-600 hover:via-purple-600 hover:to-red-600 text-white flex items-center gap-2 border-0 shadow-none"
        >
          <Phone className="h-4 w-4" />
          Get Started
        </Button>
      </div>
    </div>
  );
};
