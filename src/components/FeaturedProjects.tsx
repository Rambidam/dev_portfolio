"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import ProjectPreviewMock from "./ProjectPreviewMock";

const ITEMS_PER_PAGE = 3;

function ProjectCard({
  project,
  isActive,
  onActivate,
  onDeactivate,
}: {
  project: Project;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  return (
    <motion.article
      layout
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onClick={() => {
        // Touch devices don't get hover — tap to expand/collapse
        if (window.matchMedia("(hover: none)").matches) {
          if (isActive) onDeactivate();
          else onActivate();
        }
      }}
      animate={{
        scale: isActive ? 1.06 : 1,
        zIndex: isActive ? 30 : 1,
      }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      className={`relative w-full ${isActive ? "z-30" : "z-0"}`}
    >
      <div
        className={`relative overflow-hidden rounded-2xl border bg-slate-900 shadow-2xl transition-colors duration-300 ${
          isActive
            ? "border-emerald-500/40 shadow-emerald-500/20"
            : "border-white/10 shadow-black/40"
        }`}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} website screenshot`}
              fill
              className={`object-cover object-top transition-transform duration-500 ${
                isActive ? "scale-105" : "scale-100"
              }`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <ProjectPreviewMock type={project.preview} accent={project.accent} />
          )}

          {/* Soft dim so the card still reads as a screenshot when idle */}
          <div
            className={`pointer-events-none absolute inset-0 bg-black/20 transition-opacity duration-300 ${
              isActive ? "opacity-0" : "opacity-100"
            }`}
          />
        </div>

        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 flex flex-col justify-end"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/40 backdrop-blur-[3px]" />

              <div className="relative max-h-full overflow-y-auto overscroll-contain p-5 sm:p-6 [-ms-overflow-style:none] [scrollbar-width:thin] [scrollbar-color:rgba(16,185,129,0.4)_transparent]">
                <button
                  type="button"
                  aria-label="Close project details"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeactivate();
                  }}
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/40 text-slate-300 transition-colors hover:bg-white/10 hover:text-white sm:hidden"
                >
                  <X size={14} />
                </button>

                <span
                  className="mb-2 inline-block w-fit rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                  style={{
                    backgroundColor: `${project.accent}22`,
                    color: project.accent,
                  }}
                >
                  {project.category}
                </span>

                <h3 className="mb-2 text-lg font-bold text-white sm:text-xl">
                  {project.title}
                </h3>

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
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300"
                  >
                    View project
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

export default function FeaturedProjects() {
  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const [page, setPage] = useState(0);
  const [activeId, setActiveId] = useState<string | null>(null);

  const visibleProjects = projects.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
  );

  const goToPage = (next: number) => {
    setActiveId(null);
    setPage(Math.max(0, Math.min(totalPages - 1, next)));
  };

  useEffect(() => {
    setActiveId(null);
  }, [page]);

  return (
    <section id="projects" className="relative overflow-hidden px-6 py-14 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-black" />
      <div className="pointer-events-none absolute left-0 top-0 h-96 w-96 -translate-x-1/3 -translate-y-1/3 rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center md:mb-10"
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Featured{" "}
            <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-500 bg-clip-text text-transparent">
              projects
            </span>
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
            A selection of websites I&apos;ve built and maintained. Hover over or tap each card to view the full project details.
          </p>
        </motion.div>

        <div className="relative">
          {totalPages > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous projects"
                onClick={() => goToPage(page - 1)}
                disabled={page === 0}
                className="absolute -left-1 top-1/2 z-40 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-slate-900/90 text-white shadow-xl backdrop-blur-sm transition-all hover:border-white/20 hover:bg-slate-800 disabled:pointer-events-none disabled:opacity-0 sm:-left-5 sm:h-11 sm:w-11"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                aria-label="Next projects"
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages - 1}
                className="absolute -right-1 top-1/2 z-40 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-slate-900/90 text-white shadow-xl backdrop-blur-sm transition-all hover:border-white/20 hover:bg-slate-800 disabled:pointer-events-none disabled:opacity-0 sm:-right-5 sm:h-11 sm:w-11"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 gap-5 overflow-visible py-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
            >
              {visibleProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                  className="relative"
                >
                  <ProjectCard
                    project={project}
                    isActive={activeId === project.id}
                    onActivate={() => setActiveId(project.id)}
                    onDeactivate={() => setActiveId(null)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to page ${i + 1}`}
                  aria-current={i === page ? "true" : undefined}
                  onClick={() => goToPage(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === page
                      ? "h-2 w-7 bg-emerald-400"
                      : "h-2 w-2 bg-slate-600 hover:bg-slate-500"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
