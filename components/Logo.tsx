"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import logoImage from "@/app/justlogowithoutwordsACAI.jpeg";

export const Logo = () => {
  const pathname = usePathname();
  const router = useRouter();
  
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const isHomePage = pathname === "/";
    const scrollY = window.scrollY;
    
    if (!isHomePage) {
      // Navigate to home page
      router.push("/");
    } else if (scrollY > 100) {
      // Scroll to top if not already at top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      // Already at top on home page - scroll to "Never Miss a Call Again" section
      const heroSection = document.querySelector('h1');
      if (heroSection) {
        heroSection.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  };
  
  return (
    <Link
      href="/"
      onClick={handleLogoClick}
      className="font-normal flex space-x-2 items-center text-sm mr-4 text-black px-2 py-1 relative z-20 group"
      aria-label="Go to top"
    >
      <div className="relative">
        {/* Glowing ring background */}
        <div className="absolute inset-0 -m-1.5 rounded-full bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-300" />
        
        {/* Logo image with hover effects - transparent background to remove black box */}
        <div className="relative w-8 h-8 transition-transform duration-300 ease-out group-hover:rotate-3 group-hover:scale-105">
          <Image
            src={logoImage}
            alt="ACAI AI Logo"
            fill
            className="object-contain"
            style={{ background: 'transparent' }}
            priority
          />
        </div>
      </div>
      <span className="font-medium text-black dark:text-white">ACAI AI</span>
    </Link>
  );
};
