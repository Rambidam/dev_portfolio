"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import ProjectPreviewMock from "./ProjectPreviewMock";

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative w-[min(85vw,400px)] shrink-0 snap-center sm:w-[420px]">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/40 transition-transform duration-500 group-hover:scale-[1.02]">
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} website screenshot`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 85vw, 420px"
            />
          ) : (
            <ProjectPreviewMock type={project.preview} accent={project.accent} />
          )}
        </div>

        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/70 to-black/20 p-6 opacity-0 backdrop-blur-[2px] transition-all duration-400 group-hover:opacity-100">
          <span
            className="mb-2 w-fit rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
            style={{
              backgroundColor: `${project.accent}22`,
              color: project.accent,
            }}
          >
            {project.category}
          </span>
          <h3 className="mb-2 text-xl font-bold text-white">{project.title}</h3>
          <p className="mb-4 text-sm leading-relaxed text-slate-300">
            {project.description}
          </p>
          <div className="mb-4 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300"
            >
              View project
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function FeaturedProjects() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("article")?.clientWidth ?? 420;
    el.scrollBy({
      left: direction === "left" ? -(cardWidth + 24) : cardWidth + 24,
      behavior: "smooth",
    });
  };

  return (
    <section id="projects" className="relative overflow-hidden px-6 py-28">
      <div className="pointer-events-none absolute inset-0 bg-black" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Featured{" "}
            <span className="bg-gradient-to-r from-sky-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              projects
            </span>
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
            A selection of products and sites I&apos;ve built — hover a card for
            details, or swipe through to explore more.
          </p>
        </motion.div>

        <div className="relative">
          <button
            type="button"
            aria-label="Previous project"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="absolute -left-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-slate-900/90 text-white shadow-xl backdrop-blur-sm transition-all hover:border-white/20 hover:bg-slate-800 disabled:pointer-events-none disabled:opacity-0 sm:flex"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            aria-label="Next project"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="absolute -right-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-slate-900/90 text-white shadow-xl backdrop-blur-sm transition-all hover:border-white/20 hover:bg-slate-800 disabled:pointer-events-none disabled:opacity-0 sm:flex"
          >
            <ChevronRight size={20} />
          </button>

          <div
            ref={scrollRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{
              paddingLeft: "max(1rem, calc(50% - 210px))",
              paddingRight: "max(1rem, calc(50% - 210px))",
            }}
          >
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>

          <div className="mt-6 flex justify-center gap-3 sm:hidden">
            <button
              type="button"
              aria-label="Previous project"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/90 text-white disabled:opacity-30"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Next project"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/90 text-white disabled:opacity-30"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
