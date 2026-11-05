import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionLabelProps = {
  index: string;
  children: ReactNode;
  className?: string;
};

export function SectionLabel({ index, children, className }: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-3 sm:gap-4", className)}>
      <span className="font-display text-[11px] font-medium tabular-nums text-acid">
        {index}
      </span>
      <span className="h-px w-8 bg-white/20 sm:w-12" aria-hidden="true" />
      <span className="eyebrow">{children}</span>
    </div>
  );
}
