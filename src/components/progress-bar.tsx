"use client";

import { useEffect, useState } from "react";
import { Progress } from "./ui/progress";
import { useColorPreferences } from "@/providers/color-preferences";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  const { color } = useColorPreferences();
  let backgroundColor = "bg-primary-dark";

  if (color === "green") {
    backgroundColor = "bg-green-700";
  } else if (color === "blue") {
    backgroundColor = "bg-blue-700";
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => (prevProgress + 1) % 101);
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return <Progress className={backgroundColor} value={progress} max={100} />;
};

export default ProgressBar;
