'use client';

import { useLottie } from "lottie-react";
import type { LottieRefCurrentProps } from "lottie-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface LottieAnimationProps {
  animationData?: unknown;
  animationPath?: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

export const LottieAnimation = ({
  animationData,
  animationPath,
  className,
  loop = true,
  autoplay = true,
}: LottieAnimationProps) => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [loadedData, setLoadedData] = useState<unknown>(animationData);

  useEffect(() => {
    if (animationPath && !animationData) {
      fetch(animationPath)
        .then(res => res.json())
        .then(data => setLoadedData(data))
        .catch(err => console.error('Failed to load animation:', err));
    }
  }, [animationPath, animationData]);

  const options = {
    animationData: loadedData,
    loop,
    autoplay,
  };

  const { View } = useLottie(options);

  return (
    <div className={cn("w-full h-full", className)}>
      {View}
    </div>
  );
};
