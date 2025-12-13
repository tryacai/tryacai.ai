"use client";
import React from "react";
import { Phone, Calendar, TrendingUp, Database } from "lucide-react";

export const SkeletonOne = () => {
  const services = [
    {
      icon: Phone,
      title: "24/7 AI Call Answering",
      description: "Human-like AI receptionist answers every call, 24/7.",
    },
    {
      icon: Calendar,
      title: "Instant Scheduling",
      description: "AI books appointments directly into your existing calendar tools.",
    },
    {
      icon: TrendingUp,
      title: "Business Growth Tools",
      description: "Capture leads and scale operations without extra staff.",
    },
    {
      icon: Database,
      title: "CRM Integration",
      description: "Customer info automatically synced with zero errors.",
    },
  ];

  return (
    <div className="relative flex p-4 sm:p-8 h-full">
      <div className="w-full mx-auto h-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 h-full">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ServiceCard = ({ service }: { service: any }) => {
  const Icon = service.icon;
  return (
    <div className="flex flex-col items-start space-y-2 p-4 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition-shadow duration-200">
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 via-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h4 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-100">
        {service.title}
      </h4>
      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
        {service.description}
      </p>
    </div>
  );
};
