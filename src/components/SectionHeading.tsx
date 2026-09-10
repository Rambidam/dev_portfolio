"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  id?: string;
  label: string;
  title: string;
  description?: string;
}

export default function SectionHeading({
  id,
  label,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mb-8 text-center"
    >
      <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-400">
        {label}
      </p>
      <h2 className="mb-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto max-w-2xl text-slate-400">{description}</p>
      )}
    </motion.div>
  );
}
