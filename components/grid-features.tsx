import { cn } from "@/lib/utils";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";

export const GridFeatures = () => {
  const features = [
    {
      title: "Built for Service Businesses",
      description:
        "Designed specifically for plumbing and HVAC teams, not generic call centers.",
      icon: <IconTerminal2 />,
    },
    {
      title: "Set Up in Minutes",
      description:
        "No technical setup. No learning curve. We handle everything.",
      icon: <IconEaseInOut />,
    },
    {
      title: "Simple, Transparent Pricing",
      description:
        "One clear price. No contracts. No surprises.",
      icon: <IconCurrencyDollar />,
    },
    {
      title: "Always-On Call Coverage",
      description: "Your phones are answered 24/7, even after hours.",
      icon: <IconCloud />,
    },
    {
      title: "One System. Every Location.",
      description: "Manage multiple technicians or locations from one dashboard.",
      icon: <IconRouteAltLeft />,
    },
    {
      title: "Real Human Support",
      description:
        "Talk to real people when you need help. No ticket limbo.",
      icon: <IconHelp />,
    },
    {
      title: "Risk-Free to Try",
      description:
        "If it's not working for you, we'll make it right.",
      icon: <IconAdjustmentsBolt />,
    },
    {
      title: "Built to Grow With You",
      description: "ACAI scales as your business grows with no rework required.",
      icon: <IconHeart />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
};

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover:opacity-100 transition duration-200 group absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover:opacity-100 transition duration-200 group absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10">{icon}</div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover:bg-blue-500 transition duration-200" />
        <span className="group-hover:translate-x-2 transition duration-200 inline-block">
          {title}
        </span>
      </div>
      <p className="text-sm text-muted dark:text-muted-dark max-w-xs mx-auto relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
