import { ArrowUpRight, Check, Copy, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { siteConfig, siteLinks } from "@/config/site";

const socials = [
  { label: "WhatsApp", href: siteLinks.whatsapp, Icon: MessageCircle },
  { label: "Email", href: siteLinks.email, Icon: Mail },
  { label: "GitHub", href: siteLinks.github, Icon: GithubIcon },
  { label: "LinkedIn", href: siteLinks.linkedin, Icon: LinkedinIcon },
];

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = siteLinks.email;
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/[0.06]">
      <div
        className="pointer-events-none absolute inset-0 grid-pattern grid-fade opacity-40"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-[20%] left-1/2 h-[720px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(198,255,77,0.11),transparent_62%)] blur-3xl"
        aria-hidden="true"
      />

      <div className="container-page section-pad relative">
        <Reveal>
          <SectionLabel index="05">Contact</SectionLabel>
        </Reveal>

        <div className="mt-10 grid gap-14 sm:mt-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <h2 className="font-display text-[clamp(2.9rem,8.4vw,6.5rem)] font-medium leading-[0.9] tracking-[-0.06em]">
              <RevealText
                lines={["Have an idea?", "Let's build it."]}
                highlight="Let's build it."
                highlightClassName="text-acid"
                delay={0.04}
              />
            </h2>

            <Reveal delay={0.12}>
              <p
                lang="pt-BR"
                className="pretty mt-8 max-w-lg text-[14px] leading-[1.8] text-muted sm:text-[15px]"
              >
                Estou aberto a novos projetos, colaborações e oportunidades
                profissionais. Se você tem uma ideia, vamos conversar sobre como
                transformá-la em algo real.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-wrap items-center gap-3 sm:mt-11 sm:gap-4">
                <MagneticButton
                  href={siteLinks.whatsapp}
                  external
                  icon={<ArrowUpRight size={14} />}
                  className="px-7 py-4"
                >
                  Let&apos;s talk
                </MagneticButton>
                <MagneticButton
                  href={siteLinks.email}
                  variant="outline"
                  icon={<Mail size={14} />}
                  className="px-7 py-4"
                >
                  Send an email
                </MagneticButton>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 sm:mt-16">
                <div className="flex items-center gap-2.5 text-[9px] uppercase tracking-[0.16em] text-muted">
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-acid" />
                  {siteConfig.availability}
                </div>
                <span className="hidden h-px w-14 bg-white/15 sm:block" />
                <span className="text-[9px] uppercase tracking-[0.16em] text-dim">
                  Web · Interfaces · Interactive
                </span>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.16}>
              <div className="rounded-2xl border border-white/[0.1] bg-white/[0.02] p-6 backdrop-blur-sm sm:p-7">
                <div className="flex items-center justify-between">
                  <p className="eyebrow text-white/60">Direct channel</p>
                  <span className="h-1.5 w-1.5 rounded-full bg-acid" />
                </div>

                <div className="mt-5">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-dim">
                    Email
                  </p>
                  <div className="mt-2 flex items-start justify-between gap-3">
                    <a
                      href={siteLinks.email}
                      className="font-display text-[clamp(1.1rem,2.3vw,1.35rem)] tracking-[-0.02em] text-white transition-colors hover:text-acid"
                      data-cursor
                    >
                      {siteConfig.email}
                    </a>
                    <button
                      type="button"
                      onClick={copyEmail}
                      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-muted transition-colors duration-300 hover:border-acid hover:bg-acid hover:text-ink"
                      aria-label={copied ? "Email copied" : "Copy email address"}
                      data-cursor
                    >
                      {copied ? <Check size={13} /> : <Copy size={13} />}
                    </button>
                  </div>
                  <span className="sr-only" aria-live="polite">
                    {copied ? "Email address copied to clipboard" : ""}
                  </span>
                </div>

                <div className="mt-7 border-t border-white/[0.08] pt-2">
                  {socials.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                      className="group flex items-center justify-between border-b border-white/[0.06] py-3.5 text-[11px] uppercase tracking-[0.14em] text-white/75 transition-colors duration-300 hover:text-acid"
                      data-cursor
                    >
                      <span className="flex items-center gap-3">
                        <Icon size={14} strokeWidth={1.6} className="text-dim transition-colors group-hover:text-acid" />
                        {label}
                      </span>
                      <ArrowUpRight
                        size={14}
                        className="text-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-acid"
                      />
                    </a>
                  ))}
                </div>

                <p className="mt-5 text-[9px] uppercase leading-relaxed tracking-[0.14em] text-dim">
                  Open to remote collaborations and select projects worldwide.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal className="mt-16 sm:mt-24">
          <div className="relative overflow-hidden border-t border-white/[0.08] pt-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[9px] uppercase tracking-[0.2em] text-dim">
                05 / Contact — 2026
              </p>
              <p className="text-[9px] uppercase tracking-[0.2em] text-dim">
                Let&apos;s make something memorable
              </p>
            </div>
            <p className="mt-6 select-none whitespace-nowrap font-display text-[clamp(2.7rem,11.2vw,10.5rem)] font-medium leading-[0.8] tracking-[-0.075em] text-white/[0.055] sm:mt-8">
              {siteConfig.name}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
