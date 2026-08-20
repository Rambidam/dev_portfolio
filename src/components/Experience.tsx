"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { experiences } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="experience"
          label="Career"
          title="Work Experience"
          description="A track record of delivering high-impact e-commerce and web development solutions."
        />

        <div className="relative space-y-8">
          <div className="absolute bottom-0 left-[19px] top-0 hidden w-px bg-gradient-to-b from-emerald-500/50 via-emerald-500/20 to-transparent md:block" />

          {experiences.map((job, i) => (
            <motion.article
              key={`${job.role}-${job.period}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative md:pl-14"
            >
              <div className="absolute left-0 top-6 hidden h-10 w-10 items-center justify-center rounded-full border border-emerald-500/30 bg-slate-950 md:flex">
                <Briefcase size={16} className="text-emerald-400" />
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {job.role}
                      {"type" in job && job.type && (
                        <span className="ml-2 text-base font-normal text-emerald-400">
                          ({job.type})
                        </span>
                      )}
                    </h3>
                    <p className="mt-1 text-slate-400">{job.company}</p>
                  </div>
                  <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
                    {job.period}
                  </span>
                </div>

                <ul className="space-y-2.5">
                  {job.highlights.map((point) => (
                    <li
                      key={point.slice(0, 40)}
                      className="flex gap-3 text-sm leading-relaxed text-slate-400"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
