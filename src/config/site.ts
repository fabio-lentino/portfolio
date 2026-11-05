/**
 * Central configuration for the portfolio.
 * Replace the placeholder identity, contact details and social URLs below
 * with your own information before publishing.
 */
export const siteConfig = {
  name: "Fábio Lentino",
  firstName: "Fábio",
  monogram: "FL",
  role: "Independent Web Developer",
  email: "develentino@gmail.com",
  availability: "Available for select projects",
  year: new Date().getFullYear(),
  links: {
    whatsapp: "https://wa.me/5554991959842",
    email: "mailto:develentino@gmail.com",
    github: "https://github.com/fabio-lentino",
    linkedin: "https://www.linkedin.com/",
  },
  socials: [
    { label: "WhatsApp", href: "https://wa.me/5554991959842" },
    { label: "GitHub", href: "https://github.com/fabio-lentino" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
  ],
  navigation: [
    { label: "About", href: "#about", index: "01" },
    { label: "Expertise", href: "#expertise", index: "02" },
    { label: "Work", href: "#work", index: "03" },
    { label: "Stack", href: "#stack", index: "04" },
    { label: "Contact", href: "#contact", index: "05" },
  ],
} as const;

export const siteLinks = siteConfig.links;
