"use client";

import { motion, type MotionStyle, type Transition } from "framer-motion";
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  transition?: Transition;
  className?: string;
  style?: React.CSSProperties;
  reverse?: boolean;
  initialOffset?: number;
  borderWidth?: number;
}

export function BorderBeam({
  className,
  size = 50,
  delay = 0,
  duration = 6,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  transition,
  style,
  reverse = false,
  initialOffset = 0,
  borderWidth = 1,
}: BorderBeamProps) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-[-2px] z-[2] overflow-visible">
      <motion.div
        className={cn("absolute left-0 top-0", className)}
        style={
          {
            width: size,
            height: borderWidth,
            background: `linear-gradient(90deg, transparent, ${colorFrom} 25%, ${colorTo} 75%, transparent)`,
            ...style,
          } as MotionStyle
        }
        initial={{ left: `${initialOffset}%`, x: 0 }}
        animate={{
          left: reverse
            ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
            : [`${initialOffset}%`, "100%"],
          x: reverse ? [-size, 0] : [0, -size],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
          delay: -delay,
          ...transition,
        }}
      />
    </div>
  );
}
