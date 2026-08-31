"use client";

import { useCallback, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useSpring,
} from "framer-motion";
import { GraduationCap, BookOpen, Code2, Database } from "lucide-react";
import { education } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";

const detailIcons = [BookOpen, Code2, Database, GraduationCap];

function EducationCard({
  item,
  index,
}: {
  item: (typeof education)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rotateX = useSpring(0, { stiffness: 180, damping: 22 });
  const rotateY = useSpring(0, { stiffness: 180, damping: 22 });
  const glowX = useSpring(50, { stiffness: 120, damping: 20 });
  const glowY = useSpring(50, { stiffness: 120, damping: 20 });

  const borderGlow = useMotionTemplate`radial-gradient(420px circle at ${glowX}% ${glowY}%, rgba(16,185,129,0.4), transparent 65%)`;
  const innerGlow = useMotionTemplate`radial-gradient(500px circle at ${glowX}% ${glowY}%, rgba(16,185,129,0.1), transparent 50%)`;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      rotateX.set((y - 0.5) * -10);
      rotateY.set((x - 0.5) * 10);
      glowX.set(x * 100);
      glowY.set(y * 100);
    },
    [rotateX, rotateY, glowX, glowY],
  );

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
  }, [rotateX, rotateY, glowX, glowY]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className="group relative mx-auto w-full max-w-2xl"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-3xl"
        style={{ background: borderGlow }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 p-8 backdrop-blur-xl sm:p-10">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: innerGlow }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative">
          <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-5">
              <motion.div
                animate={{ rotate: hovered ? [0, -8, 8, 0] : 0 }}
                transition={{ duration: 0.5 }}
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 text-emerald-400 shadow-lg shadow-emerald-500/10"
              >
                <GraduationCap size={26} />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold leading-snug text-white sm:text-2xl">
                  {item.degree}
                </h3>
                {"program" in item && item.program && (
                  <p className="mt-1.5 text-sm font-medium text-emerald-400">
                    {item.program}
                  </p>
                )}
                <p className="mt-1 text-slate-400">{item.school}</p>
              </div>
            </div>

            <span className="inline-flex w-fit shrink-0 items-center rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-emerald-300">
              {item.period}
            </span>
          </div>

          <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

          <ul className="grid gap-3 sm:grid-cols-2">
            {item.details.map((detail, i) => {
              const Icon = detailIcons[i % detailIcons.length];
              return (
                <motion.li
                  key={detail.slice(0, 40)}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className="flex gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-colors duration-300 group-hover:border-emerald-500/10 group-hover:bg-emerald-500/[0.03]"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                    <Icon size={14} />
                  </span>
                  <span className="text-sm leading-relaxed text-slate-400">
                    {detail}
                  </span>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const spotlightX = useSpring(50, { stiffness: 80, damping: 25 });
  const spotlightY = useSpring(50, { stiffness: 80, damping: 25 });
  const spotlight = useMotionTemplate`radial-gradient(700px circle at ${spotlightX}% ${spotlightY}%, rgba(16,185,129,0.08), transparent 55%)`;

  const handleSectionMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;

      spotlightX.set(((e.clientX - rect.left) / rect.width) * 100);
      spotlightY.set(((e.clientY - rect.top) / rect.height) * 100);
    },
    [spotlightX, spotlightY],
  );

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      className="relative overflow-hidden px-6 py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-white/[0.02]" />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: spotlight }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-emerald-500/5 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-teal-500/5 blur-3xl"
        animate={{ x: [0, -25, 0], y: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          id="education"
          label="Background"
          title="Education"
          description="Academic foundation in software development and professional technical skills."
        />

        <div className="mt-4">
          {education.map((item, i) => (
            <EducationCard key={item.degree} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
