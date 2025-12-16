"use client";
import React from "react";
import { IconTool, IconCalendar, IconPhone } from "@tabler/icons-react";

export const SkeletonThree = () => {
  return (
    <div className="h-full w-full sm:w-[80%] mx-auto bg-white dark:bg-neutral-800 shadow-2xl dark:shadow-white/40 mt-10 group rounded-md">
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-white via-white dark:from-black dark:via-black to-transparent w-full pointer-events-none z-[11]" />

      <div className="flex flex-1 w-full h-full flex-col space-y-2">
        <div className="border-b dark:border-neutral-700 pb-3 p-4 sm:p-6">
          <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
            Our AI receptionist is built specifically for plumbers, HVAC, and other home service businesses. It answers calls, understands real customer needs, and books jobs 24/7 without you lifting a finger.
          </p>
        </div>
        <div className="flex flex-col space-y-3 p-4 sm:p-6">
          <ServiceFeature 
            icon={<IconPhone className="h-5 w-5" />}
            title="24/7 Call Answering"
            description="Never miss another opportunity"
          />
          <ServiceFeature 
            icon={<IconCalendar className="h-5 w-5" />}
            title="Instant Scheduling"
            description="Books appointments automatically"
          />
          <ServiceFeature 
            icon={<IconTool className="h-5 w-5" />}
            title="Service-Specific"
            description="Built for plumbing and HVAC"
          />
          <div className="pt-2 border-t dark:border-neutral-700">
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              You do not need to configure anything. We manage the AI brain so you can focus on running your business.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServiceFeature = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex items-start space-x-3">
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 via-purple-500 to-blue-500 flex items-center justify-center text-white">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
          {title}
        </p>
        <p className="text-xs text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
      </div>
    </div>
  );
};
