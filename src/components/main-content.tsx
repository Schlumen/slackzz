"use client";

import { cn } from "@/lib/utils";
import { useColorPreferences } from "@/providers/color-preferences";
// import { useTheme } from "next-themes";
import { FC, ReactNode } from "react";

const MainContent: FC<{ children: ReactNode }> = ({ children }) => {
  //const { theme } = useTheme();
  const { color } = useColorPreferences();

  let backgroundColor = "bg-primary-dark";
  if (color === "green") {
    backgroundColor = "bg-green-700";
  } else if (color === "blue") {
    backgroundColor = "bg-blue-700";
  }

  return (
    <div
      className={cn("md:px-2 md:pt-14 md:pb-2 md:h-screen", backgroundColor)}
    >
      <main
        className={cn(
          "md:ml-[280px] lg:ml-[420px] md:h-full overflow-y-hidden  bg-white dark:bg-[#232529]"
          //theme === "dark" ? "bg-[#232529]" : "bg-white"
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default MainContent;
