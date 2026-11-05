import {
  ArrowUpRight,
  Code2,
  LayoutDashboard,
  MousePointer2,
  ShoppingBag,
} from "lucide-react";
import type { MouseEvent } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const specialties = [
  {
    index: "01",
    title: "Web Development",
    description:
      "Sites institucionais, landing pages e plataformas personalizadas com código limpo e estrutura sólida.",
    tags: ["Landing pages", "Institutional sites", "Custom builds"],
    Icon: Code2,
  },
  {
    index: "02",
    title: "Interactive Experiences",
    description:
      "Interfaces modernas, animações e experiências digitais interativas que transformam navegação em memória.",
    tags: ["Motion", "WebGL", "Micro-interactions"],
    Icon: MousePointer2,
  },
  {
    index: "03",
    title: "E-commerce",
    description:
      "Lojas virtuais com foco em usabilidade, conversão e performance — do catálogo ao checkout.",
    tags: ["Storefronts", "Checkout", "Conversion"],
    Icon: ShoppingBag,
  },
  {
    index: "04",
    title: "Web Applications",
    description:
      "Sistemas web, dashboards e aplicações personalizadas desenhadas para clareza e escala.",
    tags: ["Dashboards", "Systems", "Integrations"],
    Icon: LayoutDashboard,
  },
];

function handleSpotlight(event: MouseEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
}

export function Specialties() {
  return (
    <section id="expertise" className="relative border-t border-white/[0.06]">
      <div className="container-page section-pad">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div>
            <Reveal>
              <SectionLabel index="02">Expertise</SectionLabel>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-8 font-display text-[clamp(2.8rem,7vw,5.4rem)] font-medium leading-[0.95] tracking-[-0.055em]">
                Specialties<span className="text-acid">.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12} className="max-w-sm lg:pb-2">
            <p
              lang="pt-BR"
              className="pretty text-[13px] leading-relaxed text-muted sm:text-[14px]"
            >
              Quatro disciplinas, um processo integrado. Do primeiro esboço à
              última interação, cada decisão serve à experiência.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:mt-16 md:grid-cols-2 md:gap-5">
          {specialties.map(({ index, title, description, tags, Icon }, itemIndex) => (
            <Reveal
              key={title}
              delay={0.05 * itemIndex}
              className={itemIndex % 2 === 1 ? "md:mt-10" : undefined}
            >
              <article
                onMouseMove={handleSpotlight}
                className="hover-spotlight group relative flex h-full min-h-[310px] flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0b0b0b] p-6 transition-colors duration-500 hover:border-acid/30 sm:p-8"
              >
                <span
                  className="pointer-events-none absolute -bottom-8 right-3 select-none font-display text-[7rem] font-medium leading-none tracking-[-0.08em] text-white/[0.025] transition-colors duration-500 group-hover:text-acid/[0.055] sm:text-[8.5rem]"
                  aria-hidden="true"
                >
                  {index}
                </span>

                <div className="relative flex items-start justify-between">
                  <span className="font-display text-[10px] tabular-nums tracking-[0.18em] text-acid">
                    {index} / 04
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.02] text-white/80 transition-all duration-500 ease-out group-hover:rotate-6 group-hover:border-acid group-hover:bg-acid group-hover:text-ink">
                    <Icon size={18} strokeWidth={1.6} />
                  </span>
                </div>

                <div className="relative mt-auto pt-16">
                  <h3 className="font-display text-[clamp(1.45rem,3.4vw,2.1rem)] font-medium uppercase leading-tight tracking-[-0.02em]">
                    {title}
                  </h3>
                  <p
                    lang="pt-BR"
                    className="pretty mt-3.5 max-w-sm text-[13px] leading-relaxed text-muted"
                  >
                    {description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/[0.09] px-2.5 py-1 text-[8px] uppercase tracking-[0.14em] text-dim transition-colors duration-300 group-hover:border-white/15 group-hover:text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-4">
                    <span className="text-[8px] uppercase tracking-[0.18em] text-dim">
                      Capability
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="text-dim transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-acid"
                    />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
