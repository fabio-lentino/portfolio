import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: string[];
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
  separator?: ReactNode;
  duration?: number;
};

export function Marquee({
  items,
  reverse = false,
  className,
  itemClassName,
  separator = <span className="mx-6 text-acid/70 sm:mx-9">+</span>,
  duration,
}: MarqueeProps) {
  const content = [...items, ...items];

  return (
    <div className={cn("marquee marquee-pause", className)} aria-hidden="true">
      <div
        className={cn("marquee-track", reverse && "marquee-track-reverse")}
        style={duration ? { animationDuration: `${duration}s` } : undefined}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {content.map((item, index) => (
              <span key={`${copy}-${item}-${index}`} className="flex items-center">
                <span className={cn("whitespace-nowrap", itemClassName)}>{item}</span>
                {separator}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
