"use client";

import { motion } from "framer-motion";
import { ArrowDown, Mail, ShoppingBag } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import LinkedInIcon from "./LinkedInIcon";

export default function Hero() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden px-6 pt-28 pb-12 md:pt-32 md:pb-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute right-0 top-1/2 h-[400px] w-[400px] rounded-full bg-teal-500/5 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-400"
        >
          <ShoppingBag size={14} />
          Available for freelance projects
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {personalInfo.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-2 text-xl font-medium text-emerald-400 sm:text-2xl"
        >
          {personalInfo.title}
          <span className="text-slate-500"> · </span>
          {personalInfo.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg"
        >
          {personalInfo.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-3 text-sm font-semibold text-slate-950 transition-all hover:bg-emerald-400 hover:shadow-xl hover:shadow-emerald-500/25"
          >
            <Mail size={16} />
            Contact Me
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3 text-sm font-semibold text-white transition-all hover:border-emerald-500/50 hover:bg-white/5"
          >
            <LinkedInIcon size={16} />
            LinkedIn
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-10 md:mt-14"
        >
          <a
            href="#about"
            aria-label="Scroll to about section"
            className="inline-flex animate-bounce text-slate-500 transition-colors hover:text-emerald-400"
          >
            <ArrowDown size={24} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
