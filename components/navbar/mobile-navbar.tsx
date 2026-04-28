"use client";
import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";
import { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import { Button } from "../button";
import { Phone } from "lucide-react";
import { Logo } from "../Logo";

export const MobileNavbar = ({ navItems }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10">
      <div className="h-16 flex items-center justify-between px-4">
        <Logo />
        <IoIosMenu
          className="text-white h-6 w-6 cursor-pointer"
          onClick={() => setOpen(!open)}
        />
        {open && (
          <div className="fixed inset-0 bg-black z-40 flex flex-col items-start justify-start pt-20 px-6">
            <IoIosClose
              className="absolute top-6 right-6 h-8 w-8 text-white cursor-pointer"
              onClick={() => setOpen(false)}
            />
            <div className="flex flex-col items-start justify-start gap-6 w-full">
              {navItems.map((navItem: any, idx: number) => {
                if (navItem.children && navItem.children.length > 0) {
                  return (
                    <div key={`group-${idx}`} className="flex flex-col items-start gap-3 w-full">
                      <span className="text-sm text-neutral-400 font-medium uppercase">
                        {navItem.title}
                      </span>
                      {navItem.children.map((childNavItem: any, childIdx: number) => (
                        <Link
                          key={`child=${idx}-${childIdx}`}
                          href={childNavItem.link}
                          onClick={() => setOpen(false)}
                          className="text-white text-base font-medium hover:opacity-70 transition-opacity"
                        >
                          {childNavItem.title}
                        </Link>
                      ))}
                    </div>
                  );
                }

                return (
                  <Link
                    key={`link=${idx}`}
                    href={navItem.link}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "text-white text-lg font-medium hover:opacity-70 transition-opacity",
                      navItem.highlightAI &&
                        "bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 bg-clip-text text-transparent"
                    )}
                  >
                    {navItem.title}
                  </Link>
                );
              })}
            </div>
            <div className="w-full mt-8">
              <Button 
                as={Link} 
                href="/#contact"
                className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 hover:from-blue-600 hover:via-purple-600 hover:to-red-600 text-white flex items-center justify-center gap-2 border-0 shadow-none"
                onClick={() => setOpen(false)}
              >
                <Phone className="h-4 w-4" />
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
