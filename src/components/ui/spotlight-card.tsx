import { useRef, type ReactNode, type PointerEvent } from "react";
import "./spotlight-card.css";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  mobileGlow?: boolean;
}

/** A local spotlight that preserves the existing card's layout and surface. */
export function GlowCard({ children, className = "", mobileGlow = false }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const syncPointer = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const card = cardRef.current;
    if (!card) return;
    const bounds = card.getBoundingClientRect();
    card.style.setProperty("--spotlight-x", `${event.clientX - bounds.left}px`);
    card.style.setProperty("--spotlight-y", `${event.clientY - bounds.top}px`);
    const horizontal = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - .5) * 2));
    const vertical = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - .5) * 2));
    card.style.setProperty("--tilt-x", `${-vertical * 4}deg`);
    card.style.setProperty("--tilt-y", `${horizontal * 4}deg`);
    card.dataset["spotlightActive"] = "true";
  };

  const hideSpotlight = () => {
    if (cardRef.current) cardRef.current.dataset["spotlightActive"] = "false";
  };

  return (
    <div
      ref={cardRef}
      className="spotlight-card"
      data-mobile-glow={mobileGlow ? "true" : undefined}
      onPointerEnter={syncPointer}
      onPointerMove={syncPointer}
      onPointerLeave={hideSpotlight}
      onPointerCancel={hideSpotlight}
    >
      <span className="spotlight-card__glow" aria-hidden="true" />
      <span className="spotlight-card__glass" aria-hidden="true" />
      <div className={`spotlight-card__surface ${className}`}>{children}</div>
    </div>
  );
}
