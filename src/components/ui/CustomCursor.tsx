import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function CustomCursor() {
  const finePointer = useMediaQuery("(pointer: fine)");
  const reduce = useReducedMotion();
  const enabled = finePointer && !reduce;

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 300, damping: 26, mass: 0.5 });
  const ringY = useSpring(dotY, { stiffness: 300, damping: 26, mass: 0.5 });

  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("has-custom-cursor");

    function handleMove(event: PointerEvent) {
      dotX.set(event.clientX);
      dotY.set(event.clientY);
      setVisible(true);
    }

    function handleOver(event: PointerEvent) {
      const target = (event.target as Element | null)?.closest<HTMLElement>(
        "a, button, [data-cursor]",
      );

      if (target) {
        setActive(true);
        setLabel(target.dataset.cursorLabel ?? "");
      } else {
        setActive(false);
        setLabel("");
      }
    }

    function handleLeave() {
      setVisible(false);
    }

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerover", handleOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", handleLeave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerover", handleOver);
      document.documentElement.removeEventListener("pointerleave", handleLeave);
    };
  }, [dotX, dotY, enabled]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[121] -translate-x-1/2 -translate-y-1/2 rounded-full bg-acid"
        style={{ x: dotX, y: dotY }}
        animate={{
          width: active ? 0 : 5,
          height: active ? 0 : 5,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[120]"
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: visible ? 1 : 0 }}
      >
        <motion.div
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border"
          animate={{
            width: active ? (label ? 92 : 58) : 30,
            height: active ? (label ? 92 : 58) : 30,
            backgroundColor: active ? "rgba(198,255,77,1)" : "rgba(198,255,77,0)",
            borderColor: active ? "rgba(198,255,77,1)" : "rgba(198,255,77,0.55)",
          }}
          transition={{ type: "spring", stiffness: 320, damping: 28, mass: 0.5 }}
        >
          <AnimatePresence>
            {label ? (
              <motion.span
                key={label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="px-2 text-center font-display text-[9px] font-semibold uppercase leading-tight tracking-[0.14em] text-ink"
              >
                {label}
              </motion.span>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
}
