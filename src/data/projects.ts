export type Project = {
  id: string;
  index: string;
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  challenge: string;
  approach: string;
  year: string;
  tech: string[];
  image: string;
  imageAlt: string;
  accent: string;
  scope: string[];
};

export const projects: Project[] = [
  {
    id: "aura-ecommerce",
    index: "01",
    title: "E-commerce Experience",
    category: "E-commerce / Art direction",
    shortDescription:
      "A calm, editorial shopping experience for a fictional objects brand.",
    description:
      "A digital flagship for a small-objects label, built around restraint, tactility and a slow-browsing rhythm.",
    challenge:
      "Translate a physical, sculptural product range into a digital storefront without losing the sense of material and quiet that defines the brand.",
    approach:
      "An editorial grid, warm surfaces and generous negative space let the products lead. Motion is used sparingly — reveals, image parallax and considered hover states keep the experience feeling alive without becoming noisy.",
    year: "2026",
    tech: ["React", "TypeScript", "Three.js", "Tailwind CSS"],
    image: "/works/ecommerce.svg",
    imageAlt:
      "Conceptual e-commerce website with a cream editorial layout, abstract vases and product cards",
    accent: "#c6ff4d",
    scope: ["Art direction", "UI design", "Front-end", "Motion"],
  },
  {
    id: "form-agency",
    index: "02",
    title: "Digital Agency",
    category: "Brand site / Interaction",
    shortDescription:
      "An expressive identity site for a fictional creative studio.",
    description:
      "A concept site for a creative studio that treats the browser as a stage — bold type, a chrome orb and a confident rhythm.",
    challenge:
      "Create a digital presence that feels as distinctive as the studio it represents, while keeping the underlying structure clear for real content.",
    approach:
      "Typography carries the identity. A single, tactile 3D object anchors the hero, while an asymmetrical layout and acid accents build a memorable visual language across the page.",
    year: "2026",
    tech: ["React", "TypeScript", "Three.js", "Framer Motion"],
    image: "/works/agency.svg",
    imageAlt:
      "Conceptual creative agency website with oversized type, a chrome orb and a lime marquee",
    accent: "#c6ff4d",
    scope: ["Concept", "Art direction", "Front-end", "3D"],
  },
  {
    id: "north-dashboard",
    index: "03",
    title: "Business Dashboard",
    category: "Web app / Product design",
    shortDescription:
      "A focused analytics interface for fictional business data.",
    description:
      "A concept dashboard that balances information density with calm: clear hierarchy, quiet surfaces and a single accent color.",
    challenge:
      "Present several layers of business data without overwhelming the user or falling into generic dashboard patterns.",
    approach:
      "A fixed navigation rail, modular cards and carefully paced typography create a readable structure. The acid accent is reserved for action and insight, while soft depth keeps the interface precise.",
    year: "2026",
    tech: ["React", "TypeScript", "Tailwind CSS", "Data visualisation"],
    image: "/works/dashboard.svg",
    imageAlt:
      "Conceptual analytics dashboard with revenue charts, KPI cards and a dark interface",
    accent: "#c6ff4d",
    scope: ["Product design", "UI system", "Front-end", "Charts"],
  },
];
