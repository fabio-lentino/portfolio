import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-12% 0px -8% 0px" }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

type RevealTextProps = {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  highlight?: string;
  highlightClassName?: string;
};

export function RevealText({
  lines,
  className,
  lineClassName,
  delay = 0,
  highlight,
  highlightClassName,
}: RevealTextProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <span ref={ref} className={cn("block", className)}>
      {lines.map((line, index) => (
        <span
          key={`${line}-${index}`}
          className={cn("block overflow-hidden pb-[0.08em]")}
        >
          <motion.span
            className={cn("block", lineClassName)}
            initial={reduce ? { opacity: 0 } : { y: "115%", opacity: 0 }}
            animate={
              inView
                ? { y: "0%", opacity: 1 }
                : reduce
                  ? { opacity: 0 }
                  : { y: "115%", opacity: 0 }
            }
            transition={{
              duration: 1,
              delay: delay + index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {highlight && line.includes(highlight) ? (
              <>
                {line.split(highlight)[0]}
                <span className={highlightClassName}>{highlight}</span>
                {line.split(highlight)[1]}
              </>
            ) : (
              line
            )}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
