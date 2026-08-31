"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { aboutText, aboutSkills, workProcess } from "@/data/portfolio";

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-black px-6 py-28">
      <div className="pointer-events-none absolute left-0 top-1/4 h-80 w-80 -translate-x-1/3 rounded-full bg-emerald-500/15 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
          {/* Profile photo */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none"
          >
            <div className="relative aspect-[3/4] w-full">
              <div className="absolute -inset-3 rounded-3xl bg-emerald-400/20 blur-2xl" />
              <div className="relative h-full overflow-hidden rounded-2xl border-[5px] border-white bg-white shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                <Image
                  src="/profile.png"
                  alt="Louie Franz Gualingco"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 400px, 480px"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col"
          >
            {/* Status badge */}
            <div className="mb-8 inline-flex w-fit items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[11px] font-medium uppercase tracking-widest text-slate-400">
                Open to freelance & full-time
              </span>
            </div>

            {/* Label */}
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              About me
            </p>

            {/* Headline */}
            <h2 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              I turn ideas into{" "}
              <span className="text-emerald-400">fully launched Shopify stores</span>
            </h2>

            {/* Description */}
            <p className="mb-10 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
              {aboutText}
            </p>

            {/* How I work */}
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              How I work
            </p>

            <div className="mb-10 space-y-6">
              {workProcess.map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
                  className="flex gap-5"
                >
                  <span className="shrink-0 text-2xl font-bold text-emerald-900/80 sm:text-3xl">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="mb-1 font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-400 sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Skill bar */}
            <div className="border-t border-white/10 pt-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
                <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {aboutSkills.label}
                </span>
                <span className="text-sm font-semibold text-white sm:text-base">
                  {aboutSkills.skills}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
