"use client";

import { motion } from "framer-motion";
import { Code2, Rocket, TrendingUp } from "lucide-react";
import { aboutText } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";

const highlights = [
  {
    icon: Rocket,
    title: "5+ Years Experience",
    description: "E-commerce, web development, and Shopify store customization.",
  },
  {
    icon: TrendingUp,
    title: "Conversion Focused",
    description: "CRO, SEO, and performance optimization that drives revenue.",
  },
  {
    icon: Code2,
    title: "Full-Stack Skills",
    description: "Liquid, React, JavaScript, PHP Laravel, and REST APIs.",
  },
];

export default function About() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="about"
          label="About Me"
          title="Crafting Digital Storefronts That Convert"
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            {aboutText.map((paragraph, i) => (
              <p key={i} className="leading-relaxed text-slate-400">
                {paragraph}
              </p>
            ))}
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-1">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-emerald-500/30 hover:bg-emerald-500/[0.03]"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 transition-colors group-hover:bg-emerald-500/20">
                  <item.icon size={20} />
                </div>
                <h3 className="mb-1 font-semibold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate-400">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
