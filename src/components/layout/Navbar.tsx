import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type NavbarProps = {
  introComplete: boolean;
};

export function Navbar({ introComplete }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    document.body.dataset.lock = "true";

    const main = document.getElementById("main");
    const footer = document.querySelector("footer");
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      delete document.body.dataset.lock;
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={reduce ? { opacity: 0 } : { y: -20, opacity: 0 }}
        animate={introComplete ? { y: 0, opacity: 1 } : undefined}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-[92] transition-colors duration-500",
          scrolled && !open
            ? "border-b border-white/[0.06] bg-ink/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-page flex h-[72px] items-center justify-between md:h-[84px]">
          <a href="#top" className="group flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-acid font-display text-[11px] font-bold text-ink transition-transform duration-500 ease-out group-hover:rotate-6">
              {siteConfig.monogram}
            </span>
            <span className="flex flex-col">
              <span className="font-display text-[12px] font-medium leading-tight tracking-wide sm:text-[13px]">
                {siteConfig.name}
              </span>
              <span className="text-[8px] uppercase tracking-[0.18em] text-muted sm:text-[9px]">
                Creative developer
              </span>
            </span>
            <span className="sr-only">Back to top</span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {siteConfig.navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted transition-colors duration-300 hover:text-white"
                data-cursor
              >
                <span className="mr-1.5 font-display text-[8px] text-acid/0 transition-colors duration-300 group-hover:text-acid/80">
                  {item.index}
                </span>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="#contact"
              className="group hidden items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:border-acid hover:bg-acid hover:text-ink sm:flex"
              data-cursor
            >
              Let&apos;s talk
              <ArrowUpRight
                size={13}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="group flex h-10 items-center gap-2 rounded-full border border-white/15 px-3.5 text-[10px] uppercase tracking-[0.16em] text-white transition-colors hover:border-acid hover:text-acid lg:hidden"
              data-cursor
            >
              <span>{open ? "Close" : "Menu"}</span>
              {open ? <X size={14} /> : <Menu size={14} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[91] flex flex-col overflow-y-auto bg-ink lg:hidden"
          >
            <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />
            <div className="pointer-events-none absolute -right-32 top-0 h-[420px] w-[420px] rounded-full bg-acid/[0.07] blur-[110px]" />

            <div className="container-page relative flex flex-1 flex-col pb-10 pt-[104px]">
              <p className="eyebrow mb-8">Navigation</p>
              <nav aria-label="Mobile" className="flex flex-col">
                {siteConfig.navigation.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.14 + index * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group flex items-center justify-between border-b border-white/[0.09] py-5"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-display text-[10px] tabular-nums text-acid">
                        {item.index}
                      </span>
                      <span className="font-display text-[clamp(2.2rem,9vw,3.5rem)] leading-none tracking-[-0.04em] text-white transition-colors group-hover:text-acid">
                        {item.label}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={22}
                      className="text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-acid"
                    />
                  </motion.a>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.48 }}
                className="mt-auto pt-14"
              >
                <div className="mb-8 flex items-center gap-2.5 text-[10px] uppercase tracking-[0.16em] text-muted">
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-acid" />
                  {siteConfig.availability}
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {siteConfig.socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline text-[11px] uppercase tracking-[0.14em] text-white/80 hover:text-acid"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="mt-6 inline-block font-display text-lg text-white underline decoration-acid/60 decoration-1 underline-offset-4 transition-colors hover:text-acid"
                >
                  {siteConfig.email}
                </a>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
