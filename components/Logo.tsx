"use client";
import Link from "next/link";
import Image from "next/image";

export const Logo = () => {
  return (
    <Link
      href="/"
      className="mr-4 flex items-center px-2 py-1"
      aria-label="Go to home"
    >
      <Image
        src="/Micalogo.png"
        alt="Mica logo"
        width={140}
        height={56}
        style={{ height: "auto" }}
        priority
      />
    </Link>
  );
};
