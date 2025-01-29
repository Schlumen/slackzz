"use client";

import { cn } from "@/lib/utils";
import { useColorPreferences } from "@/providers/color-preferences";

const InfoSection = () => {
  const { color } = useColorPreferences();

  let backgroundColor = "bg-primary-light";

  if (color === "green") {
    backgroundColor = "bg-green-900";
  } else if (color === "blue") {
    backgroundColor = "bg-blue-900";
  }

  return (
    <div
      className={cn(
        "fixed text-white left-20 rounded-l-xl md:w-52 lg:w-[350px] h-[calc(100%-63px)] z-20 flex flex-col items-center",
        backgroundColor
      )}
    >
      {/* Channels */}
      Channels
      {/* DMs */}
      DMs
    </div>
  );
};

export default InfoSection;
