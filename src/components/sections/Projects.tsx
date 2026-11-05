import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { ProjectModal } from "@/components/projects/ProjectModal";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { projects, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  onOpen: (project: Project) => void;
  wide?: boolean;
};

function ProjectCard({ project, onOpen, wide = false }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : ["-4.5%", "4.5%"],
  );

  return (
    <article ref={cardRef} className="group block w-full">
      <button
        type="button"
        onClick={() => onOpen(project)}
        data-cursor
        data-cursor-label="View case"
        className={cn(
          "relative block w-full overflow-hidden rounded-2xl border border-white/[0.09] bg-[#101010] text-left transition-colors duration-500 group-hover:border-white/20",
          wide ? "aspect-[16/10] md:aspect-[16/8]" : "aspect-[4/3]",
        )}
      >
        <motion.span className="absolute inset-[-5%] block" style={{ y }}>
          <img
            src={project.image}
            alt={project.imageAlt}
            width={1600}
            height={1100}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
          />
        </motion.span>

        <span
          className="pointer-events-none absolute inset-0 block bg-gradient-to-t from-black/50 via-transparent to-black/10 opacity-80 transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden="true"
        />

        <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-4 sm:p-6">
          <span className="flex items-center gap-2">
            <span className="rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-[8px] uppercase tracking-[0.16em] text-white/80 backdrop-blur-md">
              Concept
            </span>
            <span className="hidden rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-[8px] uppercase tracking-[0.16em] text-white/60 backdrop-blur-md sm:inline-flex">
              {project.year}
            </span>
          </span>
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white backdrop-blur-md transition-all duration-500 ease-out group-hover:border-acid group-hover:bg-acid group-hover:text-ink sm:h-12 sm:w-12">
            <ArrowUpRight
              size={18}
              className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </span>

        <span className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 text-[8px] uppercase tracking-[0.18em] text-white/60 sm:left-6 sm:top-6 sm:text-[9px]">
          <span className="h-1 w-1 rounded-full bg-acid" />
          {project.index} / Concept work
        </span>

        <span className="sr-only">View project details for {project.title}</span>
      </button>

      <div className="mt-5 flex items-start justify-between gap-5 sm:mt-6">
        <div>
          <p className="text-[9px] uppercase tracking-[0.18em] text-muted">
            {project.category}
          </p>
          <h3 className="mt-2 font-display text-[clamp(1.7rem,4vw,2.6rem)] font-medium leading-tight tracking-[-0.04em] transition-colors duration-300 group-hover:text-acid">
            {project.title}
          </h3>
          <p className="pretty mt-2 max-w-md text-[12px] leading-relaxed text-dim sm:text-[13px]">
            {project.shortDescription}
          </p>
        </div>
        <span className="mt-1 hidden shrink-0 font-display text-[10px] tabular-nums tracking-[0.14em] text-dim sm:block">
          {project.year}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-4">
        <ul className="flex flex-wrap items-center gap-x-3 gap-y-1.5" aria-label="Technologies">
          {project.tech.map((tech) => (
            <li
              key={tech}
              className="text-[8px] uppercase tracking-[0.14em] text-dim"
            >
              {tech}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => onOpen(project)}
          data-cursor
          className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.16em] text-white/75 transition-colors duration-300 hover:text-acid"
          aria-label={`View project details: ${project.title}`}
        >
          View project
          <ArrowUpRight
            size={12}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </button>
      </div>
    </article>
  );
}

export function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const openProject = useCallback((project: Project) => setActiveProject(project), []);
  const closeProject = useCallback(() => setActiveProject(null), []);

  return (
    <section id="work" className="relative border-t border-white/[0.06]">
      <div className="container-page section-pad">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div>
            <Reveal>
              <SectionLabel index="03">Selected works</SectionLabel>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-8 font-display text-[clamp(2.8rem,7vw,5.4rem)] font-medium leading-[0.95] tracking-[-0.055em]">
                Selected Works<span className="text-acid">.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12} className="max-w-sm lg:pb-3">
            <p
              lang="pt-BR"
              className="pretty text-[13px] leading-relaxed text-muted sm:text-[14px]"
            >
              Uma seleção de projetos conceituais que exploram design,
              interfaces e a relação entre estética e engenharia.
            </p>
            <div className="mt-5 flex items-start gap-3 rounded-lg border border-white/[0.08] bg-white/[0.015] p-3.5">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-acid" />
              <p className="text-[9px] uppercase leading-relaxed tracking-[0.12em] text-dim">
                Concept work only — no real clients, brands or results are
                represented.
              </p>
            </div>
          </Reveal>
        </div>

        <ul className="mt-12 grid grid-cols-12 gap-x-4 gap-y-14 sm:mt-16 md:gap-x-6 md:gap-y-20">
          {projects.map((project, index) => (
            <li
              key={project.id}
              className={cn(
                "col-span-12",
                index === 0 && "lg:col-span-7",
                index === 1 && "lg:col-span-5 lg:mt-28",
                index === 2 && "lg:col-span-10 lg:col-start-2 lg:mt-4",
              )}
            >
              <Reveal delay={index === 1 ? 0.08 : 0}>
                <ProjectCard
                  project={project}
                  onOpen={openProject}
                  wide={index === 2}
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      <ProjectModal project={activeProject} onClose={closeProject} />
    </section>
  );
}
