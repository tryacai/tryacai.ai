"use client";
import { useEffect, useState } from "react";
import { Heading } from "./heading";
import { Subheading } from "./subheading";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

// Helper function to get all logos from /public/logos/
function getLogosFromPublic() {
  // In a real implementation, we would use fs.readdirSync on the server
  // For now, we'll hardcode the list of logos that exist in /public/logos/
  const logoFiles = [
    "amazon.png",
    "digital-ocean.svg",
    "google.webp",
    "logo-figma.svg",
    "logo-google.svg",
    "logo-zoom.svg",
    "meta.png",
    "netflix.png",
    "onlyfans.png",
    "uber.png",
    "vercel.png",
  ];

  return logoFiles.map((file) => {
    const name = file.replace(/\.(png|svg|webp)$/, "").replace(/^logo-/, "");
    return {
      title: name.charAt(0).toUpperCase() + name.slice(1),
      src: `/logos/${file}`,
      alt: `${name.charAt(0).toUpperCase() + name.slice(1)} logo`,
    };
  });
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

      <div className="flex gap-10 flex-wrap justify-center md:gap-40 relative h-full w-full mt-20">
        <AnimatePresence
          mode="popLayout"
          onExitComplete={() => {
            setIsAnimating(false);
          }}
        >
          {activeLogoSet.map((logo, idx) => (
            <motion.div
              initial={{
                y: 40,
                opacity: 0,
                filter: "blur(10px)",
              }}
              animate={{
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
              }}
              exit={{
                y: -40,
                opacity: 0,
                filter: "blur(10px)",
              }}
              transition={{
                duration: 0.8,
                delay: 0.1 * idx,
                ease: [0.4, 0, 0.2, 1],
              }}
              key={logo.title}
              className="relative"
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
