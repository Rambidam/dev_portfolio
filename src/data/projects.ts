export type ProjectPreview = "dashboard" | "ecommerce" | "shopify" | "landing";

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  url: string;
  image?: string;
  preview: ProjectPreview;
  accent: string;
}

export const projects: Project[] = [
  {
    id: "rhags-studio",
    title: "Rhags Studio",
    category: "Shopify · Sweden",
    description:
      "Built and launched a Shopify website from scratch, working directly with the client to understand requirements, implement custom solutions, and ensure the project was delivered on time and to specification.",
    tags: ["Shopify", "Liquid", "Theme Customization", "App Integrations", "Client Collaboration", "SEO", "Mobile Optimization", "Payment Gateways"],
    url: "https://rhagsstudios.com/",
    image: "/projects/rhagsstudio.png",
    preview: "shopify",
    accent: "#a78bfa",
  },
  {
    id: "kitchen-library",
    title: "Kitchen Library",
    category: "Shopify · Australia",
    description:
      "Worked directly with the client to understand requirements, implement custom solutions, and ensure the project was delivered on time and to specification.",
    tags: ["Shopify", "Liquid", "Theme Customization", "API Integrations", "Email Marketing", "SEO"],
    url: "https://kitchenlibrary.au/",
    image: "/projects/kl.png",
    preview: "shopify",
    accent: "#f97316",
  },
  {
    id: "stick-around-print",
    title: "Stick Around Print",
    category: "Shopify · US",
    description:  
      "Collaborated directly with the client to gather requirements and deliver on time. Customized the Shopify theme with Liquid, HTML, CSS, and JavaScript, integrated apps and payment gateways, and applied SEO and mobile optimization — improving organic traffic and conversion rates across the full development cycle.",
    tags: ["Shopify", "Liquid", "HTML", "CSS", "JavaScript", "SEO", "App Integrations"],
    url: "https://stickaroundprint.com/",
    image: "/projects/stickaroundprint.png",
    preview: "shopify",
    accent: "#FFCBA4",
  },
  {
    id: "beon",
    title: "Beon",
    category: "Shopify · Australia",
    description:
      "Worked directly with the client to understand requirements, implement custom solutions, and ensure the project was delivered on time and to specification.",
    tags: ["Shopify", "Liquid", "Theme Customization", "HTML", "CSS"],
    url: "https://beon.com.au/",
    image: "/projects/beonau.png",
    preview: "shopify",
    accent: "#D4AF37",
  },
  {
    id: "plumbersstock",
    title: "Plumbersstock",
    category: "Web Development · US",
    description:
      "Helped build and maintain the website for Plumbersstock, a plumbing supply company.",
    tags: ["React", "Next.js", "HTML", "CSS", "JavaScript", "SEO"],
    url: "https://www.plumbersstock.com/",
    image: "/projects/ps.png",
    preview: "ecommerce",
    accent: "#D4AF37",
  },
  {
    id: "litefar",
    title: "Litefar",
    category: "Shopify · Australia",
    description:
      "Implemented new Liquid-based features and SEO improvements for this Australian tea retailer — enhancing product pages, search visibility, and overall store functionality.",
    tags: ["Shopify", "Liquid", "SEO", "JavaScript"],
    url: "https://www.litefar.au/",
    image: "/projects/litefar.png",
    preview: "shopify",
    accent: "#84cc16",
  },
  {
    id: "snacks-of-substance",
    title: "Snacks of Substance",
    category: "Shopify · US",
    description:
      "Drove SEO enhancements, Liquid theme development, and app integrations for this snack brand — improving search rankings, user experience, and post-launch store performance.",
    tags: ["Shopify", "Liquid", "SEO", "App Integration", "Analytics"],
    url: "https://snacksofsubstance.com/",
    image: "/projects/snacksofsubstance.png",
    preview: "shopify",
    accent: "#a78bfa",
  },
  {
    id: "bsh-walls-floors",
    title: "BSH Walls & Floors",
    category: "Shopify · UAE",
    description:
      "Full Liquid development with custom features and app integrations for a walls and flooring retailer — delivering a scalable, feature-rich storefront built to convert.",
    tags: ["Shopify", "Liquid", "Custom Features", "App Integration"],
    url: "https://bshwallsandfloors.com/",
    image: "/projects/bshwallsandfloors.png",
    preview: "shopify",
    accent: "#38bdf8",
  },
  {
    id: "web-dev-japan",
    title: "Web Dev Japan",
    category: "Shopify · Japan",
    description:
      "Improved the website’s mobile performance by identifying and addressing speed issues to create a faster, smoother, and more responsive user experience.",
    tags: ["Theme Customization", "Mobile Performance Optimization"],
    url: "https://webdev-japan.com/",
    image: "/projects/webdevjapan.png",
    preview: "shopify",
    accent: "#9CAF88",
  },
  {
    id: "tea-stop-shop",
    title: "Tea Stop Shop",
    category: "Shopify · Australia",
    description:
      "Implemented new Liquid-based features and SEO improvements for this Australian tea retailer — enhancing product pages, search visibility, and overall store functionality.",
    tags: ["Shopify", "Liquid", "SEO", "JavaScript"],
    url: "https://www.teastopshop.com.au/",
    preview: "shopify",
    accent: "#84cc16",
    image: "/projects/teastopshop.png",
  },
];
