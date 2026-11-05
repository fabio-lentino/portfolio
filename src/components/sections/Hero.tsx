import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Plus } from "lucide-react";
import { lazy, Suspense } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Marquee } from "@/components/ui/Marquee";
import { siteConfig } from "@/config/site";

const HeroScene = lazy(() => import("@/components/three/HeroScene"));

type HeroProps = {
  introComplete: boolean;
};

function SceneFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative flex h-52 w-52 items-center justify-center rounded-full border border-acid/20 bg-[radial-gradient(circle_at_35%_30%,#e8ffe8_0%,#abc08b_20%,#39402a_52%,#0c0d0b_78%)] shadow-[0_0_120px_-20px_rgba(198,255,77,0.35)] sm:h-64 sm:w-64">
        <div className="absolute inset-4 rounded-full border border-white/20" />
        <div className="absolute inset-10 rounded-full border border-acid/30" />
      </div>
    </div>
  );
}

export function Hero({ introComplete }: HeroProps) {
  const reduce = useReducedMotion();

  const lineVariants = {
    hidden: reduce ? { opacity: 0 } : { y: "112%", opacity: 0 },
    visible: { y: "0%", opacity: 1 },
  };

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 16 },
    animate: introComplete ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section id="top" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 grid-pattern grid-fade opacity-60"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-[10%] top-[8%] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(198,255,77,0.10),transparent_65%)] blur-2xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(128,155,255,0.05),transparent_65%)] blur-2xl"
        aria-hidden="true"
      />

      <div className="container-page relative">
        <div className="grid min-h-[100svh] grid-cols-1 content-center gap-4 pb-12 pt-28 sm:gap-6 lg:grid-cols-12 lg:gap-0 lg:pb-16 lg:pt-32">
          <div className="relative z-10 lg:col-span-7 lg:pr-8">
            <motion.div
              {...fade(0.25)}
              className="flex flex-wrap items-center gap-x-5 gap-y-3"
            >
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-[9px] uppercase tracking-[0.16em] text-white/80 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-acid" />
                {siteConfig.availability}
              </span>
              <span className="hidden items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-dim sm:flex">
                <span className="h-px w-7 bg-white/15" />
                Portfolio / 2026
              </span>
            </motion.div>

            <motion.div
              {...fade(0.34)}
              className="mt-9 flex items-center gap-3 sm:mt-12"
            >
              <span className="h-px w-9 bg-acid/70 sm:w-12" />
              <p className="eyebrow text-white/70">Independent web developer</p>
            </motion.div>

            <h1 className="mt-5 font-display text-[clamp(3.3rem,13.5vw,5.6rem)] font-medium leading-[0.86] tracking-[-0.055em] sm:mt-6 sm:text-[clamp(4rem,10vw,6.4rem)] lg:text-[clamp(4.5rem,7.2vw,7.2rem)]">
              {["Building", "Digital", "Experiences."].map((line, index) => (
                <span
                  key={line}
                  className="block overflow-hidden pb-[0.05em]"
                >
                  <motion.span
                    className={`block ${
                      index === 2 ? "text-acid" : "text-white"
                    }`}
                    initial="hidden"
                    animate={introComplete ? "visible" : "hidden"}
                    variants={lineVariants}
                    transition={{
                      duration: 1.05,
                      delay: 0.32 + index * 0.11,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              {...fade(0.72)}
              lang="pt-BR"
              className="pretty mt-7 max-w-[29rem] text-[13px] leading-relaxed text-muted sm:mt-8 sm:text-[14px]"
            >
              Transformando ideias em experiências digitais modernas, funcionais
              e memoráveis. Design, código e movimento trabalhando como um só.
            </motion.p>

            <motion.div
              {...fade(0.84)}
              className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4"
            >
              <MagneticButton
                href="#work"
                icon={<ArrowDown size={14} />}
                className="px-7 py-4"
              >
                View my work
              </MagneticButton>
              <MagneticButton
                href="#contact"
                variant="outline"
                icon={<ArrowUpRight size={14} />}
                className="px-7 py-4"
              >
                Let&apos;s talk
              </MagneticButton>
            </motion.div>

            <motion.div
              {...fade(0.96)}
              className="mt-12 hidden items-center gap-4 sm:mt-16 sm:flex"
            >
              <span className="relative h-10 w-px overflow-hidden bg-white/15">
                <motion.span
                  className="absolute inset-x-0 top-0 h-3 bg-acid"
                  animate={reduce ? undefined : { y: ["-100%", "340%"] }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 0.4,
                  }}
                />
              </span>
              <span className="eyebrow">Scroll to explore</span>
              <span className="ml-3 hidden h-px w-16 bg-white/10 sm:block" />
              <span className="hidden text-[9px] uppercase tracking-[0.18em] text-dim sm:block">
                Design · Code · Motion
              </span>
            </motion.div>
          </div>

          <div className="relative mt-6 h-[360px] sm:h-[460px] lg:col-span-5 lg:mt-0 lg:h-[640px]">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(198,255,77,0.10),transparent_70%)] blur-3xl sm:h-[430px] sm:w-[430px]"
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={introComplete ? { opacity: 1 } : undefined}
              transition={{ duration: 1.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full"
            >
              <Suspense fallback={<SceneFallback />}>
                <HeroScene />
              </Suspense>
            </motion.div>

            <div className="pointer-events-none absolute inset-0">
              <div className="absolute right-0 top-4 flex items-center gap-2 text-[8px] uppercase tracking-[0.2em] text-muted sm:text-[9px]">
                <span className="h-1 w-1 rounded-full bg-acid" />
                WebGL / 01
              </div>
              <div className="absolute left-0 top-[22%] hidden items-center gap-2 text-[8px] uppercase tracking-[0.2em] text-dim sm:flex">
                <Plus size={11} className="text-acid/70" />
                Move your cursor
              </div>
              <div className="absolute bottom-2 right-0 flex flex-col items-end gap-1 text-right">
                <span className="text-[8px] uppercase tracking-[0.2em] text-dim sm:text-[9px]">
                  Chrome study
                </span>
                <span className="font-display text-[10px] tracking-[0.1em] text-white/50">
                  OBJECT_001
                </span>
              </div>
              <div className="absolute bottom-0 left-0 hidden items-center gap-2 text-[8px] uppercase tracking-[0.2em] text-dim sm:flex">
                <span className="h-px w-6 bg-acid/50" />
                Interactive composition
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-y border-white/[0.07] bg-[#0a0a0a]/70">
        <Marquee
          items={[
            "Creative development",
            "Interactive experiences",
            "Web applications",
            "Performance first",
            "Digital identities",
          ]}
          duration={55}
          itemClassName="py-4 text-[10px] uppercase tracking-[0.24em] text-muted sm:text-[11px]"
          separator={
            <span className="mx-5 font-display text-[12px] text-acid/60 sm:mx-8">
              /
            </span>
          }
        />
      </div>
    </section>
  );
}
