import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";

type PreloaderProps = {
  onComplete: () => void;
};

export function Preloader({ onComplete }: PreloaderProps) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const completeRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const duration = reduce ? 350 : 1500;
    const hold = reduce ? 60 : 320;
    let frame = 0;
    let timer = 0;
    let startedAt = 0;

    document.body.dataset.lock = "true";

    const tick = (time: number) => {
      if (!startedAt) startedAt = time;
      const progress = Math.min(1, (time - startedAt) / duration);
      setCount(Math.round(progress * 100));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        timer = window.setTimeout(() => {
          if (!completeRef.current) {
            completeRef.current = true;
            onCompleteRef.current();
          }
        }, hold);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      delete document.body.dataset.lock;
    };
  }, [reduce]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col overflow-hidden bg-ink"
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: reduce ? 0.25 : 0.85, ease: [0.76, 0, 0.24, 1] }}
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-[0.35]" />
      <div className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-acid/[0.055] blur-[120px]" />

      <div className="container-page relative flex items-center justify-between border-b border-white/[0.07] py-5">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-acid font-display text-[11px] font-bold text-ink">
            {siteConfig.monogram}
          </span>
          <span className="font-display text-[12px] font-medium tracking-wide">
            {siteConfig.name}
          </span>
        </div>
        <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.22em] text-muted">
          <span>Portfolio</span>
          <span className="h-px w-6 bg-white/20" />
          <span>2026</span>
        </div>
      </div>

      <div className="container-page relative flex flex-1 flex-col justify-between py-8 md:py-12">
        <div className="flex items-start justify-between">
          <p className="eyebrow max-w-[160px] leading-relaxed sm:max-w-none">
            Creative development
            <br />
            Design · Code · Motion
          </p>
          <span className="hidden font-display text-[10px] uppercase tracking-[0.2em] text-dim sm:block">
            Loading experience
          </span>
        </div>

        <div className="flex items-end justify-between gap-6">
          <div className="select-none font-display text-[clamp(4.5rem,16vw,13rem)] font-medium leading-[0.8] tracking-[-0.07em]">
            <span className="text-stroke">LA</span>
            <span className="text-acid">.</span>
          </div>
          <div className="mb-1 text-right sm:mb-3">
            <div className="font-display text-[clamp(2.5rem,7vw,5rem)] font-light leading-none tabular-nums tracking-tight">
              {String(count).padStart(3, "0")}
              <span className="ml-1 align-top font-sans text-[0.28em] font-medium tracking-normal text-acid">
                %
              </span>
            </div>
            <p className="mt-3 text-[9px] uppercase tracking-[0.22em] text-muted">
              {siteConfig.role}
            </p>
          </div>
        </div>

        <div className="mt-10">
          <div className="relative h-px w-full bg-white/10">
            <motion.div
              className="absolute inset-y-0 left-0 bg-acid"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: count / 100 }}
              transition={{ ease: "linear", duration: 0.1 }}
              style={{ originX: 0, width: "100%" }}
            />
          </div>
          <div className="mt-4 flex items-center justify-between text-[9px] uppercase tracking-[0.18em] text-dim">
            <span>{count < 100 ? "Preparing the canvas" : "Ready"}</span>
            <span>Est. 2026</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
