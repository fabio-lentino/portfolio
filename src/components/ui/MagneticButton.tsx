import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  icon?: ReactNode;
  external?: boolean;
  ariaLabel?: string;
};

const variants: Record<Variant, string> = {
  primary:
    "border-acid bg-acid text-ink hover:bg-[#d6ff7d] hover:border-[#d6ff7d] shadow-[0_0_0_0_rgba(198,255,77,0)] hover:shadow-[0_12px_40px_-12px_rgba(198,255,77,0.55)]",
  outline:
    "border-white/20 bg-white/[0.02] text-white hover:border-acid/70 hover:text-acid hover:bg-acid/[0.04]",
  ghost: "border-transparent text-white hover:text-acid",
};

export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  icon,
  external,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 220, damping: 18, mass: 0.4 });

  function handleMove(event: PointerEvent<HTMLElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rawX.set((event.clientX - rect.left - rect.width / 2) * 0.22);
    rawY.set((event.clientY - rect.top - rect.height / 2) * 0.22);
  }

  function handleLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  const classes = cn(
    "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full border px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.18em] transition-[background-color,border-color,color,box-shadow] duration-300 sm:text-[11px]",
    variants[variant],
    className,
  );

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2.5">
        {children}
        {icon ? (
          <span className="transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5">
            {icon}
          </span>
        ) : null}
      </span>
      <span className="pointer-events-none absolute inset-0 z-0 translate-y-full bg-white/10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
    </>
  );

  if (href) {
    return (
      <motion.a
        ref={ref}
        href={href}
        aria-label={ariaLabel}
        className={classes}
        style={{ x, y }}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        onClick={onClick}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        data-cursor
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      aria-label={ariaLabel}
      className={classes}
      style={{ x, y }}
      onClick={onClick}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      data-cursor
    >
      {content}
    </motion.button>
  );
}
