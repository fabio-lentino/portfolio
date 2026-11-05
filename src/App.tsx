import { AnimatePresence, MotionConfig } from "framer-motion";
import { useCallback, useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Specialties } from "@/components/sections/Specialties";
import { TechStack } from "@/components/sections/TechStack";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Preloader } from "@/components/ui/Preloader";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="fixed left-4 top-4 z-[200] -translate-y-24 rounded-full bg-acid px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink transition-transform duration-300 focus:translate-y-0"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <CustomCursor />
      <div className="grain" aria-hidden="true" />

      <AnimatePresence>
        {!introComplete ? (
          <Preloader key="preloader" onComplete={handleIntroComplete} />
        ) : null}
      </AnimatePresence>

      <Navbar introComplete={introComplete} />

      <main id="main" tabIndex={-1}>
        <Hero introComplete={introComplete} />
        <About />
        <Specialties />
        <Projects />
        <TechStack />
        <Contact />
      </main>

      <Footer />
    </MotionConfig>
  );
}
