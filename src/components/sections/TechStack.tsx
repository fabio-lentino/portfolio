import { Reveal } from "@/components/ui/Reveal";
import { Marquee } from "@/components/ui/Marquee";
import { SectionLabel } from "@/components/ui/SectionLabel";

const marqueeOne = ["HTML5", "CSS3", "JavaScript", "Three.js", "PHP", "Laravel"];
const marqueeTwo = ["Python", "FastAPI", "MySQL", "Git", "Creative coding"];

const stackGroups = [
  {
    index: "01",
    label: "Front-end",
    items: [
      { name: "HTML5", note: "Semantic structure" },
      { name: "CSS3", note: "Layout & motion" },
      { name: "JavaScript", note: "Interaction" },
      { name: "Three.js", note: "Real-time 3D" },
    ],
  },
  {
    index: "02",
    label: "Back-end",
    items: [
      { name: "PHP", note: "Server-side logic" },
      { name: "Laravel", note: "Web applications" },
      { name: "Python", note: "Tooling & services" },
      { name: "FastAPI", note: "Fast APIs" },
    ],
  },
  {
    index: "03",
    label: "Data & workflow",
    items: [
      { name: "MySQL", note: "Relational data" },
      { name: "Git", note: "Version control" },
      { name: "Figma", note: "Interface design" },
      { name: "Vite", note: "Build tooling" },
    ],
  },
];

export function TechStack() {
  return (
    <section id="stack" className="relative overflow-hidden border-t border-white/[0.06]">
      <div className="container-page section-pad pb-0">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div>
            <Reveal>
              <SectionLabel index="04">Technologies</SectionLabel>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-8 max-w-2xl font-display text-[clamp(2.8rem,7vw,5.4rem)] font-medium leading-[0.95] tracking-[-0.055em]">
                Tools behind the{" "}
                <span className="text-acid">experience.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12} className="max-w-sm lg:pb-3">
            <p
              lang="pt-BR"
              className="pretty text-[13px] leading-relaxed text-muted sm:text-[14px]"
            >
              Tecnologias escolhidas pelo que permitem criar — não pela moda.
              Uma base sólida, do front-end ao back-end.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="relative mt-14 border-y border-white/[0.07] bg-[#0a0a0a]/60 py-6 sm:mt-20 sm:py-8">
        <Marquee
          items={marqueeOne}
          duration={48}
          itemClassName="font-display text-[clamp(2.2rem,5.5vw,4.8rem)] font-medium tracking-[-0.045em] text-white/90"
          separator={
            <span className="mx-5 font-display text-[clamp(1.2rem,3vw,2.4rem)] text-acid/60 sm:mx-8">
              +
            </span>
          }
        />
        <Marquee
          items={marqueeTwo}
          reverse
          duration={55}
          className="mt-1 sm:mt-2"
          itemClassName="font-display text-[clamp(2.2rem,5.5vw,4.8rem)] font-medium tracking-[-0.045em] text-stroke"
          separator={
            <span className="mx-5 font-display text-[clamp(1.2rem,3vw,2.4rem)] text-acid/30 sm:mx-8">
              +
            </span>
          }
        />
      </div>

      <div className="container-page section-pad pt-14 sm:pt-20">
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {stackGroups.map((group, groupIndex) => (
            <Reveal key={group.label} delay={0.06 * groupIndex}>
              <div>
                <div className="flex items-center justify-between border-b border-white/[0.12] pb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-[9px] tabular-nums tracking-[0.16em] text-acid">
                      {group.index}
                    </span>
                    <h3 className="text-[10px] uppercase tracking-[0.18em] text-white/80">
                      {group.label}
                    </h3>
                  </div>
                  <span className="text-[8px] uppercase tracking-[0.14em] text-dim">
                    {String(group.items.length).padStart(2, "0")} tools
                  </span>
                </div>

                <ul>
                  {group.items.map((item, itemIndex) => (
                    <li
                      key={item.name}
                      className="group flex items-baseline justify-between gap-4 border-b border-white/[0.06] py-3.5 transition-colors duration-300 hover:border-acid/30"
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="w-4 font-display text-[8px] tabular-nums text-dim">
                          {String(itemIndex + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-[17px] tracking-[-0.01em] text-white/85 transition-all duration-300 group-hover:translate-x-1 group-hover:text-acid">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-right text-[8px] uppercase tracking-[0.1em] text-dim transition-colors duration-300 group-hover:text-muted">
                        {item.note}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 sm:mt-20">
          <div className="flex flex-col gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.015] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-start gap-4">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 animate-pulse-dot rounded-full bg-acid" />
              <div>
                <p className="font-display text-lg tracking-[-0.02em] text-white/90">
                  Always in progress.
                </p>
                <p lang="pt-BR" className="mt-1.5 text-[12px] leading-relaxed text-muted">
                  Explorando constantemente shaders, motion systems e novas
                  formas de interação.
                </p>
              </div>
            </div>
            <span className="shrink-0 self-start text-[9px] uppercase tracking-[0.18em] text-dim sm:self-center">
              Continuous learning / 2026
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
