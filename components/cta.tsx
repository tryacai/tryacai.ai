"use client";
import React from "react";
import Balancer from "react-wrap-balancer";
import Link from "next/link";
import { Button } from "./button";
export const CTA = () => {
  return (
    <section className="py-60 w-full  overflow-hidden relative z-30">
      <div className="bg-white dark:bg-black">
        <div className="mx-auto w-full relative z-20 sm:max-w-[40rem]  md:max-w-[48rem] lg:max-w-[64rem] xl:max-w-[80rem] bg-gradient-to-br from-slate-800 dark:from-neutral-900 to-gray-900 sm:rounded-2xl">
          <div className="relative -mx-6   sm:mx-0 sm:rounded-2xl overflow-hidden px-6  md:px-8 ">
            <div
              className="absolute inset-0 w-full h-full opacity-10 bg-noise fade-vignette [mask-image:radial-gradient(#fff,transparent,75%)]"
              style={{
                backgroundImage: "url(/images/demo-gradient.svg), url(/noise.webp)",
                backgroundSize: "cover, 30%",
                backgroundBlendMode: "overlay",
              }}
            ></div>
            <div
              className="pointer-events-none absolute inset-y-0 right-0 select-none overflow-hidden rounded-2xl"
              style={{
                mask: "radial-gradient(33.875rem 33.875rem at calc(100% - 8.9375rem) 0, white 3%, transparent 70%)",
              }}
            ></div>

            <div className="relative px-6 pb-14 pt-20 sm:px-10 sm:pb-20 lg:px-[4.5rem]">
              <h2 className="  text-center text-balance mx-auto text-3xl md:text-5xl font-semibold tracking-[-0.015em] text-white">
                Ready to transform your business?
              </h2>
              <p className="mt-4 max-w-[26rem] text-center mx-auto  text-base/6 text-neutral-200">
                <Balancer>
                  Schedule a demo
                </Balancer>
              </p>

              <div className="relative z-10 mx-auto flex justify-center mt-8">
                <Link href="/schedule-demo">
                  <button className="group relative px-8 py-4 text-lg font-semibold text-white rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50">
                    {/* Gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 transition-all duration-300 group-hover:from-blue-500 group-hover:via-purple-500 group-hover:to-red-500"></div>
                    
                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                    
                    {/* Button text */}
                    <span className="relative z-10 flex items-center gap-2">
                      Schedule Demo
                      <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </button>
                </Link>
              </div>

              {/* Optional "Get Connected" supporting text */}
              <p className="mt-6 text-center text-sm text-neutral-300">
                Get Connected
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
