"use client";
import { stagger, useAnimate } from "framer-motion";
import React, { useState } from "react";

export const SkeletonTwo = () => {
  const [scope, animate] = useAnimate();
  const [animating, setAnimating] = useState(false);

  const handleAnimation = async () => {
    if (animating) return;

    setAnimating(true);
    await animate(
      ".message",
      {
        opacity: [0, 1],
        y: [20, 0],
      },
      {
        delay: stagger(0.5),
      }
    );
    setAnimating(false);
  };
  return (
    <div className="relative h-full w-full mt-4">
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-white via-white dark:from-black dark:via-black to-transparent w-full pointer-events-none" />
      <div className="p-4 border border-neutral-200 bg-neutral-100 dark:bg-neutral-800 dark:border-neutral-700 rounded-[32px] h-full z-20">
        <div className="p-2 bg-white dark:bg-black dark:border-neutral-700 border border-neutral-200 rounded-[24px] h-full">
          <div className="w-20 rounded-full bg-neutral-200/80 dark:bg-neutral-800/80 mx-auto h-6" />
          <div
            onMouseEnter={handleAnimation}
            ref={scope}
            className="content mt-4 w-[90%] mx-auto"
          >
            <AIMessage>
              Hi Sarah, this is ACAI AI calling on behalf of Johnson Plumbing. You have a water heater maintenance appointment tomorrow at 9 AM. Does that still work for you?
            </AIMessage>
            <CustomerMessage>
              Yes, that works.
            </CustomerMessage>
            <AIMessage>
              Great! Your technician Mike will arrive within the 9–11 AM window. Would you like us to text you when he&apos;s on the way?
            </AIMessage>
            <CustomerMessage>
              Yes please.
            </CustomerMessage>
            <AIMessage>
              Perfect. We&apos;ll send a text as soon as he&apos;s on the way. Thanks for choosing Johnson Plumbing!
            </AIMessage>
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomerMessage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="message bg-neutral-200 dark:bg-neutral-700 dark:text-white text-black p-2 sm:p-4 text-[10px] sm:text-xs my-2 rounded-2xl max-w-[80%]">
      {children}
    </div>
  );
};
const AIMessage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="message bg-blue-500 text-white p-2 sm:p-4 text-[10px] sm:text-xs my-2 rounded-2xl max-w-[80%] ml-auto">
      {children}
    </div>
  );
};
