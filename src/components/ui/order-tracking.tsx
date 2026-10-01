import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import "./order-tracking.css";

export interface OrderTrackingProps extends React.HTMLAttributes<HTMLDivElement> {
  autoProgress?: boolean;
  onProgressChange?: (completedCount: number) => void;
  steps: {
    name: string;
    timestamp?: string;
    isCompleted?: boolean;
    annotation?: string;
    blockedAfter?: boolean;
  }[];
}

const OrderTracking = React.forwardRef<HTMLDivElement, OrderTrackingProps>(
  ({ steps = [], autoProgress = false, onProgressChange, className, ...props }, ref) => {
    const [completedCount, setCompletedCount] = React.useState(0);
    const listRef = React.useRef<HTMLOListElement>(null);

    React.useEffect(() => {
      if (!autoProgress || !steps.length) return;
      const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
      let count = 0;
      let visible = false;
      let timer: ReturnType<typeof setTimeout>;
      const observer = new IntersectionObserver(([entry]) => { visible = entry?.isIntersecting ?? false; });
      if (listRef.current) observer.observe(listRef.current);

      const tick = () => {
        if (visible && !document.hidden) {
          count = count === steps.length ? 0 : count + 1;
          setCompletedCount(count);
          onProgressChange?.(count);
        }
        timer = setTimeout(tick, count === steps.length ? 3600 : 1800);
      };
      const start = () => {
        clearTimeout(timer);
        count = motion.matches ? steps.length : 0;
        setCompletedCount(count);
        onProgressChange?.(count);
        if (!motion.matches) timer = setTimeout(tick, 1800);
      };
      start();
      motion.addEventListener("change", start);
      return () => {
        clearTimeout(timer);
        observer.disconnect();
        motion.removeEventListener("change", start);
      };
    }, [autoProgress, steps.length, onProgressChange]);

    return <div ref={ref} className={cn("workflow-stepper", className)} {...props}>
      {steps.length ? (
        <ol ref={listRef} className="workflow-stepper__list">
          {steps.map((step, index) => {
            const completed = autoProgress ? index < completedCount : step.isCompleted;
            const active = autoProgress && index === completedCount;
            return <li className={cn("workflow-stepper__step", step.annotation && "workflow-stepper__step--human", completed && "workflow-stepper__step--completed", active && "workflow-stepper__step--active", step.blockedAfter && "workflow-stepper__step--blocked")} aria-current={active ? "step" : undefined} key={step.name}>
              <span className="workflow-stepper__rail" aria-hidden="true">
                <span className="workflow-stepper__marker">
                  {completed ? <Check size={13} /> : index + 1}
                </span>
              </span>
              {step.blockedAfter && index < steps.length - 1 && <span className="workflow-stepper__blocked" role="img" aria-label="Workflow stuck before the next step" title="Workflow stuck before the next step">!</span>}
              <div className="workflow-stepper__content">
                <div><b>{step.name}</b>{step.timestamp && <small>{step.timestamp}</small>}</div>
                {step.annotation && <em>{step.annotation}</em>}
              </div>
            </li>;
          })}
        </ol>
      ) : <p>No workflow steps available.</p>}
    </div>;
  },
);
OrderTracking.displayName = "OrderTracking";

export { OrderTracking };
