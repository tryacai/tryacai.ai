"use client";
import { useEffect, useState } from "react";
import { Heading } from "./heading";
import { Subheading } from "./subheading";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

// Import logos from app directory
import googleCalendarLogo from "@/app/googlecalendarlogo.png";
import twilioLogo from "@/app/twiliologo.png";
import zapierLogo from "@/app/zapierlogo.png";
import stripeLogo from "@/app/stripelogo.png";
import yelpLogo from "@/app/yelplogo.png";
import goHighLevelLogo from "@/app/gohighlevellogo.png";
import slackLogo from "@/app/Slack_Technologies_Logo.svg.png";

// Helper function to get all logos
function getLogosFromPublic() {
  // Updated logo list with new integration logos
  const logos = [
    { title: "Google Calendar", src: googleCalendarLogo, alt: "Google Calendar logo" },
    { title: "Twilio", src: twilioLogo, alt: "Twilio logo" },
    { title: "Zapier", src: zapierLogo, alt: "Zapier logo" },
    { title: "Stripe", src: stripeLogo, alt: "Stripe logo" },
    { title: "Yelp", src: yelpLogo, alt: "Yelp logo" },
    { title: "GoHighLevel", src: goHighLevelLogo, alt: "GoHighLevel logo" },
    { title: "Slack", src: slackLogo, alt: "Slack logo" },
  ];

  return logos;
}

export const Companies = () => {
  const allLogos = getLogosFromPublic();
  
  // Split logos into sets of 4 for animation
  const logosPerSet = 4;
  const logoSets = [];
  for (let i = 0; i < allLogos.length; i += logosPerSet) {
    logoSets.push(allLogos.slice(i, i + logosPerSet));
  }

  let [logos, setLogos] = useState(logoSets);
  const [activeLogoSet, setActiveLogoSet] = useState(logos[0]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const flipLogos = () => {
    setLogos((currentLogos) => {
      const newLogos = [...currentLogos.slice(1), currentLogos[0]];
      setActiveLogoSet(newLogos[0]);
      setIsAnimating(true);
      return newLogos;
    });
  };

  useEffect(() => {
    if (!isAnimating) {
      const timer = setTimeout(() => {
        flipLogos();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  // Only render if we have logos
  if (allLogos.length === 0) {
    return null;
  }

  return (
    <div className="relative z-20 py-10 md:py-40">
      <Heading as="h2">100+ Seamless Integrations</Heading>
      <Subheading className="text-center ">
        Works instantly with the platforms that power your business from calendar tools to full automation systems.
      </Subheading>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-20 max-w-5xl mx-auto mt-20 min-h-[80px] md:min-h-[120px]">
        <AnimatePresence
          mode="popLayout"
          onExitComplete={() => {
            setIsAnimating(false);
          }}
        >
          {activeLogoSet.map((logo, idx) => (
            <motion.div
              initial={{
                opacity: 0,
                filter: "blur(10px)",
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                filter: "blur(0px)",
                scale: 1,
              }}
              exit={{
                opacity: 0,
                filter: "blur(10px)",
                scale: 0.9,
              }}
              transition={{
                duration: 0.8,
                delay: 0.1 * idx,
                ease: [0.4, 0, 0.2, 1],
              }}
              key={logo.title}
              className="relative flex items-center justify-center"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width="100"
                height="100"
                className="md:h-20 md:w-40 h-10 w-20 object-contain filter"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
