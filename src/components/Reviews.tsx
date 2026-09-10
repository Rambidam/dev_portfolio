"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Expand, Star, X } from "lucide-react";
import { reviews } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";

type Review = (typeof reviews)[number];

function UpworkMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill="currentColor"
    >
      <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
    </svg>
  );
}

function ReviewCard({
  review,
  onOpen,
}: {
  review: Review;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group w-full text-left"
      aria-label={`View full Upwork review: ${review.title}`}
    >
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#f4f6f8] shadow-xl shadow-black/20 transition-all duration-300 group-hover:border-emerald-500/40 group-hover:shadow-emerald-500/10">
        <div className="relative">
          <Image
            src={review.image}
            alt={review.alt}
            width={review.width}
            height={review.height}
            className="h-auto w-full"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <span className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-slate-950/70 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
            <Expand size={15} />
          </span>
        </div>
      </div>
      <div className="mt-3 flex items-start justify-between gap-3 px-1">
        <div>
          <h3 className="text-sm font-semibold leading-snug text-white">
            {review.title}
          </h3>
          <p className="mt-1 text-xs text-slate-500">{review.period}</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-amber-300">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          {review.rating.toFixed(1)}
        </span>
      </div>
    </button>
  );
}

export default function Reviews() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const featured = reviews[0];
  const rest = reviews.slice(1);
  const activeReview = reviews.find((review) => review.id === activeId);

  useEffect(() => {
    if (!activeId) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveId(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeId]);

  if (!featured) return null;

  return (
    <section className="relative overflow-hidden bg-white/[0.02] px-6 py-14 md:py-20">
      <div className="pointer-events-none absolute right-0 top-1/4 h-80 w-80 translate-x-1/3 rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          id="reviews"
          label="Testimonials"
          title="Client Reviews"
          description="Verified 5.0 feedback from clients on Upwork for Shopify and e-commerce work."
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
          className="mb-10 flex flex-wrap items-center justify-center gap-3"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-300">
            <UpworkMark className="h-4 w-4" />
            From Upwork
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-slate-300">
            <Star size={13} className="fill-amber-400 text-amber-400" />
            5.0 average
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-slate-300">
            {reviews.length} client reviews
          </span>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45 }}
          >
            <ReviewCard
              review={featured}
              onOpen={() => setActiveId(featured.id)}
            />
          </motion.article>

          <div className="flex flex-col gap-8">
            {rest.map((review, i) => (
              <motion.article
                key={review.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: 0.08 * (i + 1) }}
              >
                <ReviewCard
                  review={review}
                  onOpen={() => setActiveId(review.id)}
                />
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm sm:p-8"
            onClick={() => setActiveId(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={activeReview.title}
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.25 }}
              className="relative max-h-full w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#f4f6f8] shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close review"
                onClick={() => setActiveId(null)}
                className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-slate-300/80 bg-white/90 text-slate-700 shadow-sm transition-colors hover:bg-white hover:text-slate-950"
              >
                <X size={16} />
              </button>
              <Image
                src={activeReview.image}
                alt={activeReview.alt}
                width={activeReview.width}
                height={activeReview.height}
                className="h-auto w-full"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
