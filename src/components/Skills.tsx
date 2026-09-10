"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  return (
    <section className="bg-white/[0.02] px-6 py-14 md:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="skills"
          label="Expertise"
          title="Skills & Technologies"
          description="A comprehensive toolkit for building, optimizing, and scaling e-commerce businesses."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-sm"
            >
              <h3 className="mb-4 text-lg font-semibold text-white">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
