import { ArrowUp } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.08] bg-ink">
      <div className="container-page py-10 md:py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <a href="#top" className="group inline-flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-acid font-display text-[11px] font-bold text-ink transition-transform duration-500 group-hover:rotate-6">
                {siteConfig.monogram}
              </span>
              <span className="font-display text-[15px] font-medium tracking-wide">
                {siteConfig.name}
              </span>
              <span className="sr-only">Back to top</span>
            </a>
            <p className="mt-4 max-w-xs text-[12px] leading-relaxed text-muted">
              Independent web developer crafting thoughtful digital experiences
              from concept to code.
            </p>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-16">
            <div>
              <p className="mb-3 text-[9px] uppercase tracking-[0.2em] text-dim">
                Elsewhere
              </p>
              <div className="flex gap-5">
                {siteConfig.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-[11px] uppercase tracking-[0.12em] text-white/80 hover:text-acid"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
            <a
              href="#top"
              className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors duration-300 hover:border-acid hover:bg-acid hover:text-ink"
              aria-label="Back to top"
              data-cursor
            >
              <ArrowUp
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-1"
              />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/[0.07] pt-6 text-[10px] uppercase tracking-[0.14em] text-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-muted">
            Designed with curiosity. Built with code.
          </p>
        </div>
      </div>
    </footer>
  );
}
