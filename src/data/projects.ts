export type ProjectPreview = "dashboard" | "ecommerce" | "shopify" | "landing";

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  url: string;
  /** Screenshot path under /public, e.g. "/projects/stick-around-print.webp" */
  image?: string;
  preview: ProjectPreview;
  accent: string;
}

export const projects: Project[] = [
  {
    id: "rhags-studio",
    title: "Rhags Studio",
    category: "Shopify Store",
    description:
      "Built and launched a Shopify website from scratch, working directly with the client to understand requirements, implement custom solutions, and ensure the project was delivered on time and to specification.",
    tags: ["Shopify", "Liquid", "Theme Customization", "App Integrations"],
    url: "https://rhagsstudios.com/",
    image: "/projects/rhagsstudio.png",
    preview: "shopify",
    accent: "#a78bfa",
  },
  {
    id: "kitchen-library",
    title: "Kitchen Library",
    category: "Shopify Store",
    description:
      "Worked directly with the client to understand requirements, implement custom solutions, and ensure the project was delivered on time and to specification.",
    tags: ["Shopify", "Liquid", "Theme Customization", "App Integrations"],
    url: "https://kitchenlibrary.au/",
    image: "/projects/kitchenlibrary.png",
    preview: "shopify",
    accent: "#f97316",
  },
  {
    id: "stick-around-print",
    title: "Stick Around Print",
    category: "Shopify Store",
    description:
      "Collaborated directly with the client to gather requirements and deliver on time. Customized the Shopify theme with Liquid, HTML, CSS, and JavaScript, integrated apps and payment gateways, and applied SEO and mobile optimization — improving organic traffic and conversion rates across the full development cycle.",
    tags: ["Shopify", "Liquid", "JavaScript", "SEO", "App Integration"],
    url: "https://stickaroundprint.com/",
    preview: "shopify",
    accent: "#f97316",
    image: "/projects/stickaroundprint.png",
  },
  {
    id: "tea-stop-shop",
    title: "Tea Stop Shop",
    category: "Shopify Store · Australia",
    description:
      "Implemented new Liquid-based features and SEO improvements for this Australian tea retailer — enhancing product pages, search visibility, and overall store functionality.",
    tags: ["Shopify", "Liquid", "SEO", "JavaScript"],
    url: "https://www.teastopshop.com.au/",
    preview: "shopify",
    accent: "#84cc16",
    image: "/projects/teastopshop.png",
  },
  {
    id: "bsh-walls-floors",
    title: "BSH Walls & Floors",
    category: "Shopify Store",
    description:
      "Full Liquid development with custom features and app integrations for a walls and flooring retailer — delivering a scalable, feature-rich storefront built to convert.",
    tags: ["Shopify", "Liquid", "Custom Features", "App Integration"],
    url: "https://bshwallsandfloors.com/",
    image: "/projects/bshwallsandfloors.png",
    preview: "shopify",
    accent: "#38bdf8",
  },
  {
    id: "snacks-of-substance",
    title: "Snacks of Substance",
    category: "Shopify Store",
    description:
      "Drove SEO enhancements, Liquid theme development, and app integrations for this snack brand — improving search rankings, user experience, and post-launch store performance.",
    tags: ["Shopify", "Liquid", "SEO", "App Integration"],
    url: "https://snacksofsubstance.com/",
    image: "/projects/snacksofsubstance.png",
    preview: "shopify",
    accent: "#a78bfa",
  },
];
