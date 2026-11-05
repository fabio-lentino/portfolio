import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import type { Project } from "@/data/projects";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousLock = document.body.dataset.lock;
    document.body.dataset.lock = "true";

    const timer = window.setTimeout(() => closeRef.current?.focus(), 40);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null);

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", handleKeyDown);

      if (previousLock) {
        document.body.dataset.lock = previousLock;
      } else {
        delete document.body.dataset.lock;
      }

      previouslyFocused?.focus();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          key="project-modal"
          className="fixed inset-0 z-[95] overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          <div className="relative flex min-h-full items-start justify-center p-3 sm:p-6 md:p-10">
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`project-title-${project.id}`}
              initial={{ opacity: 0, y: 32, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.99 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative my-2 w-full max-w-5xl overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0b0b0b] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)] sm:my-4"
            >
              <div className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.08] bg-[#101010] sm:aspect-[16/8]">
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  width={1600}
                  height={1100}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-transparent to-black/20" />
                <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2 sm:left-6 sm:top-6">
                  <span className="inline-flex items-center gap-2 rounded-full border border-acid/30 bg-black/50 px-3 py-1.5 text-[8px] uppercase tracking-[0.16em] text-acid backdrop-blur-md sm:text-[9px]">
                    <span className="h-1 w-1 rounded-full bg-acid" />
                    Concept project
                  </span>
                  <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-[8px] uppercase tracking-[0.16em] text-white/70 backdrop-blur-md sm:text-[9px]">
                    {project.year}
                  </span>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close project details"
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-md transition-colors duration-300 hover:border-acid hover:bg-acid hover:text-ink sm:right-6 sm:top-6"
                  data-cursor
                >
                  <X size={17} />
                </button>
              </div>

              <div className="p-5 sm:p-8 md:p-10">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[9px] uppercase tracking-[0.16em] text-muted">
                  <span className="text-acid">{project.index}</span>
                  <span className="h-px w-6 bg-white/15" />
                  <span>{project.category}</span>
                  <span className="h-px w-6 bg-white/15" />
                  <span>{project.scope[0]}</span>
                </div>

                <h3
                  id={`project-title-${project.id}`}
                  className="mt-4 font-display text-[clamp(2rem,5vw,3.7rem)] font-medium leading-[0.98] tracking-[-0.05em]"
                >
                  {project.title}
                </h3>

                <div className="mt-8 grid gap-10 md:grid-cols-12 md:gap-8">
                  <div className="md:col-span-7">
                    <p className="pretty text-[14px] leading-relaxed text-white/75">
                      {project.description}
                    </p>

                    <div className="mt-8 space-y-6">
                      <div>
                        <h4 className="mb-2 text-[9px] uppercase tracking-[0.18em] text-acid">
                          The challenge
                        </h4>
                        <p className="pretty text-[13px] leading-relaxed text-muted">
                          {project.challenge}
                        </p>
                      </div>
                      <div>
                        <h4 className="mb-2 text-[9px] uppercase tracking-[0.18em] text-acid">
                          The approach
                        </h4>
                        <p className="pretty text-[13px] leading-relaxed text-muted">
                          {project.approach}
                        </p>
                      </div>
                    </div>

                    <p className="mt-8 rounded-lg border border-white/[0.08] bg-white/[0.02] p-4 text-[11px] leading-relaxed text-dim">
                      This is a conceptual demonstration created to explore
                      design and development ideas. It is not a client engagement
                      and does not represent real results, brands or testimonials.
                    </p>
                  </div>

                  <div className="md:col-span-5">
                    <div className="rounded-xl border border-white/[0.08] bg-white/[0.015] p-5">
                      <h4 className="mb-4 text-[9px] uppercase tracking-[0.18em] text-muted">
                        Project details
                      </h4>
                      <dl className="space-y-4">
                        <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] pb-3">
                          <dt className="text-[10px] uppercase tracking-[0.12em] text-dim">
                            Year
                          </dt>
                          <dd className="text-[12px] text-white/80">{project.year}</dd>
                        </div>
                        <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] pb-3">
                          <dt className="text-[10px] uppercase tracking-[0.12em] text-dim">
                            Type
                          </dt>
                          <dd className="text-right text-[12px] text-white/80">
                            Concept
                          </dd>
                        </div>
                        <div>
                          <dt className="mb-3 text-[10px] uppercase tracking-[0.12em] text-dim">
                            Scope
                          </dt>
                          <dd className="flex flex-wrap gap-1.5">
                            {project.scope.map((item) => (
                              <span
                                key={item}
                                className="rounded-full border border-white/[0.09] px-2.5 py-1 text-[8px] uppercase tracking-[0.12em] text-muted"
                              >
                                {item}
                              </span>
                            ))}
                          </dd>
                        </div>
                        <div>
                          <dt className="mb-3 text-[10px] uppercase tracking-[0.12em] text-dim">
                            Technology
                          </dt>
                          <dd className="flex flex-wrap gap-1.5">
                            {project.tech.map((item) => (
                              <span
                                key={item}
                                className="rounded-full border border-acid/20 bg-acid/[0.04] px-2.5 py-1 text-[8px] uppercase tracking-[0.12em] text-acid/90"
                              >
                                {item}
                              </span>
                            ))}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <div className="mt-5 flex flex-col gap-3">
                      <MagneticButton
                        href="#contact"
                        onClick={onClose}
                        icon={<ArrowUpRight size={14} />}
                        className="w-full"
                      >
                        Start a project
                      </MagneticButton>
                      <MagneticButton
                        variant="outline"
                        onClick={onClose}
                        className="w-full"
                      >
                        Back to works
                      </MagneticButton>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
