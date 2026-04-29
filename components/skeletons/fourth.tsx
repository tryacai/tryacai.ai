import React from "react";
import { Globe } from "../globe";

export const SkeletonFour = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center relative bg-white dark:bg-black mt-10">
      <Globe className="absolute -right-2 md:-right-40 -bottom-40" />
    </div>
  );
};
