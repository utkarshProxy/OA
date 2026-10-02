"use client";

import { useEffect, useId, useRef } from "react";
import { cn } from "@/lib/utils";

const morphTime = 1.5;
const cooldownTime = 0.5;

interface MorphingTextProps {
  className?: string;
  texts: readonly string[];
}

export function MorphingText({ texts, className }: MorphingTextProps) {
  const filterId = `morph-${useId().replace(/:/g, "")}`;
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const current1 = text1Ref.current;
    const current2 = text2Ref.current;
    if (!current1 || !current2 || texts.length === 0) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrameId = 0;
    let previousTime: number | undefined;
    let elapsed = 0;

    const reset = () => {
      current1.textContent = texts[0] ?? "";
      current1.style.filter = "none";
      current1.style.opacity = "1";
      current2.textContent = "";
      current2.style.opacity = "0";
    };

    const animate = (now: number) => {
      // Freeze while the tab is hidden instead of skipping through words on return.
      if (previousTime !== undefined && !document.hidden) {
        elapsed += Math.min((now - previousTime) / 1000, 0.1);
      }
      previousTime = now;
      const cycleTime = morphTime + cooldownTime;
      const index = Math.floor(elapsed / cycleTime) % texts.length;
      const fraction = Math.max(0, (elapsed % cycleTime - cooldownTime) / morphTime);
      current1.textContent = texts[index] ?? "";
      current2.textContent = texts[(index + 1) % texts.length] ?? "";
      current2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      current2.style.opacity = `${Math.pow(fraction, 0.4)}`;
      const invertedFraction = 1 - fraction;
      current1.style.filter = `blur(${Math.min(8 / invertedFraction - 8, 100)}px)`;
      current1.style.opacity = `${Math.pow(invertedFraction, 0.4)}`;
      animationFrameId = requestAnimationFrame(animate);
    };

    const start = () => {
      cancelAnimationFrame(animationFrameId);
      previousTime = undefined;
      elapsed = 0;
      reset();
      if (!motion.matches && texts.length > 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    start();
    motion.addEventListener("change", start);
    return () => {
      cancelAnimationFrame(animationFrameId);
      motion.removeEventListener("change", start);
    };
  }, [texts]);

  return (
    <span className={cn("morphing-text", className)}>
      <span className="sr-only">{texts.join(", ")}</span>
      <span className="morphing-text-visual" aria-hidden="true" style={{ filter: `url(#${filterId}) blur(0.6px)` }}>
        {/* All words reserve their actual font width, so the headline never shifts. */}
        {texts.map((text, index) => <span className="morphing-text-sizer" key={`${text}-${index}`}>{text}</span>)}
        <span className="morphing-text-layer" ref={text1Ref}>{texts[0]}</span>
        <span className="morphing-text-layer" ref={text2Ref} style={{ opacity: 0 }} />
      </span>
      <svg className="morphing-text-filters" aria-hidden="true" focusable="false">
        <defs>
          <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
            <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140" />
          </filter>
        </defs>
      </svg>
    </span>
  );
}
