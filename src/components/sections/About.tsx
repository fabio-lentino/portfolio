import { ArrowUpRight } from "lucide-react";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const principles = [
  {
    index: "01",
    title: "Creative Development",
    description:
      "Onde design e engenharia se encontram. Interfaces com identidade, movimento e intenção — construídas para serem lembradas.",
  },
  {
    index: "02",
    title: "Performance First",
    description:
      "Cada milissegundo importa. Código enxuto, assets otimizados e animações aceleradas por GPU para uma experiência fluida.",
  },
  {
    index: "03",
    title: "User Experience",
    description:
      "Clareza antes de complexidade. Estruturas digitais que guiam, acolhem e transformam intenção em ação.",
  },
];

export function About() {
  return (
    <section id="about" className="relative border-t border-white/[0.06]">
      <div className="container-page section-pad">
        <Reveal>
          <SectionLabel index="01">About</SectionLabel>
        </Reveal>

        <div className="mt-10 grid gap-14 sm:mt-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <h2 className="font-display text-[clamp(2.8rem,7.4vw,5.6rem)] font-medium leading-[0.94] tracking-[-0.055em]">
              <RevealText
                lines={["Beyond code.", "I create", "experiences."]}
                highlight="experiences."
                highlightClassName="text-acid"
                delay={0.05}
              />
            </h2>

            <Reveal delay={0.15}>
              <p
                lang="pt-BR"
                className="pretty mt-8 max-w-xl text-[14px] leading-[1.8] text-muted sm:text-[15px]"
              >
                Sou desenvolvedor web e acredito que tecnologia, design e
                estratégia precisam trabalhar juntos. Desenvolvo experiências
                digitais que unem estética, performance e funcionalidade para
                transformar ideias em produtos reais.
              </p>
            </Reveal>

            <Reveal delay={0.22} className="mt-10 sm:mt-14">
              <div className="relative aspect-[5/4] overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0b0b0b]">
                <div className="absolute inset-0 grid-pattern opacity-40" aria-hidden="true" />
                <div
                  className="absolute -right-16 top-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(198,255,77,0.12),transparent_65%)] blur-2xl"
                  aria-hidden="true"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative flex h-[62%] w-[62%] items-center justify-center rounded-full border border-white/[0.12]">
                    <div className="absolute inset-[9%] animate-spin-slow rounded-full border border-dashed border-acid/25" />
                    <div className="absolute inset-[24%] rounded-full border border-white/[0.1]" />
                    <span className="select-none font-display text-[clamp(3rem,6.5vw,6rem)] font-medium leading-none tracking-[-0.08em] text-stroke">
                      LA
                    </span>
                    <span className="absolute right-[4%] top-[13%] h-2 w-2 animate-pulse-dot rounded-full bg-acid" />
                    <span className="absolute -left-4 top-1/2 h-px w-8 bg-acid/50" />
                    <span className="absolute -right-4 top-1/2 h-px w-8 bg-white/20" />
                  </div>
                </div>

                <div className="absolute left-5 top-5 flex items-center gap-2 text-[8px] uppercase tracking-[0.2em] text-muted sm:left-7 sm:top-7 sm:text-[9px]">
                  <span className="h-1 w-1 rounded-full bg-acid" />
                  Form / Function / Feeling
                </div>
                <div className="absolute right-5 top-5 text-[8px] uppercase tracking-[0.2em] text-dim sm:right-7 sm:top-7 sm:text-[9px]">
                  Est. 2026
                </div>
                <div className="absolute bottom-5 left-5 text-[8px] uppercase tracking-[0.2em] text-dim sm:bottom-7 sm:left-7 sm:text-[9px]">
                  Independent practice
                </div>
                <div className="absolute bottom-5 right-5 hidden text-[8px] uppercase tracking-[0.2em] text-muted sm:bottom-7 sm:right-7 sm:block sm:text-[9px]">
                  Design + Code
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 lg:pt-6">
            <Reveal>
              <p className="eyebrow mb-6 text-white/60">How I approach the work</p>
            </Reveal>

            <div>
              {principles.map((principle, index) => (
                <Reveal key={principle.title} delay={0.08 * index}>
                  <div className="group border-t border-white/[0.1] py-7 transition-colors duration-300 hover:border-acid/40 sm:py-8">
                    <div className="flex items-start gap-5">
                      <span className="pt-1.5 font-display text-[10px] tabular-nums tracking-[0.16em] text-acid">
                        {principle.index}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-4">
                          <h3 className="font-display text-[clamp(1.35rem,3vw,1.9rem)] font-medium tracking-[-0.03em] text-white transition-transform duration-500 ease-out group-hover:translate-x-1">
                            {principle.title}
                          </h3>
                          <ArrowUpRight
                            size={18}
                            className="shrink-0 text-dim transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-acid"
                          />
                        </div>
                        <p
                          lang="pt-BR"
                          className="pretty mt-3 max-w-md text-[13px] leading-relaxed text-muted"
                        >
                          {principle.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
              <Reveal>
                <div className="border-t border-white/[0.1]" />
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <div className="mt-10 flex items-center gap-4 rounded-full border border-white/[0.08] px-5 py-4">
                <span className="h-1.5 w-1.5 shrink-0 animate-pulse-dot rounded-full bg-acid" />
                <p className="text-[10px] uppercase leading-relaxed tracking-[0.14em] text-muted">
                  Available for select projects and long-term collaborations
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
