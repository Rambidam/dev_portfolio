"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { education } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";

export default function Education() {
  return (
    <section className="bg-white/[0.02] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="education"
          label="Background"
          title="Education"
        />

        <div className="grid gap-6 md:grid-cols-2">
          {education.map((item, i) => (
            <motion.div
              key={item.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 sm:p-8"
            >
              <div className="mb-4 flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h3 className="font-semibold leading-snug text-white">
                    {item.degree}
                  </h3>
                  {"program" in item && item.program && (
                    <p className="mt-0.5 text-sm text-emerald-400">
                      {item.program}
                    </p>
                  )}
                  <p className="mt-1 text-sm text-slate-400">{item.school}</p>
                </div>
              </div>

              <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                {item.period}
              </span>

              <ul className="space-y-2">
                {item.details.map((detail) => (
                  <li
                    key={detail.slice(0, 40)}
                    className="flex gap-3 text-sm leading-relaxed text-slate-400"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500/60" />
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
