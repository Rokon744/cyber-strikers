"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
  Images,
  Newspaper,
  Tag,
} from "lucide-react";
import { newsItems, galleryItems } from "@/data/data";
import Image from "next/image";

// ─── Category badge colors ────────────────────────────────────────────────────
const categoryColors: Record<string, string> = {
  "Match Result": "text-neon border-neon/30 bg-neon/5",
  Training: "text-blue-400 border-blue-400/30 bg-blue-400/5",
  Award: "text-yellow-400 border-yellow-400/30 bg-yellow-400/5",
  Announcement: "text-purple-400 border-purple-400/30 bg-purple-400/5",
  Milestone: "text-orange-400 border-orange-400/30 bg-orange-400/5",
  Tournament: "text-pink-400 border-pink-400/30 bg-pink-400/5",
};

// ─── News Card ────────────────────────────────────────────────────────────────
function NewsCard({
  item,
  index,
}: {
  item: (typeof newsItems)[0];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const catClass =
    categoryColors[item.category] ??
    "text-slate-400 border-slate-600 bg-slate-800";

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      layout
      className="group relative bg-dark-card border border-dark-border hover:border-neon/30 clip-card overflow-hidden transition-all duration-300"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}
    >
      {/* Top glow on hover */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon/0 to-transparent group-hover:via-neon/50 transition-all duration-500" />

      {/* Cover Image */}
      <div className="relative h-60 overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-dark-card/40 to-transparent" />

        {/* Category badge — sits on the image */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 border text-[10px] font-body tracking-widest ${catClass}`}
          >
            <Tag size={9} />
            {item.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Date */}
        <div className="flex items-center gap-1.5 text-slate-600 text-[10px] font-body tracking-widest mb-3">
          <Calendar size={10} className="text-neon/60" />
          {new Date(item.date).toLocaleDateString("en-BD", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-lg text-white tracking-wide leading-snug mb-3 group-hover:text-neon transition-colors duration-300">
          {item.title}
        </h3>

        {/* Description — collapsible */}
        <AnimatePresence initial={false}>
          {expanded ? (
            <motion.p
              key="full"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="text-slate-400 text-sm font-body leading-relaxed overflow-hidden"
            >
              {item.description}
            </motion.p>
          ) : (
            <motion.p
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-slate-500 text-sm font-body leading-relaxed line-clamp-2"
            >
              {item.description}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Read more / less */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 flex items-center gap-1.5 text-xs text-neon/60 hover:text-neon transition-colors duration-200 font-body tracking-widest"
        >
          {expanded ? "← COLLAPSE" : "READ MORE →"}
        </button>
      </div>

      {/* Corner cut decoration */}
      <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[20px] border-r-[20px] border-b-neon/10 border-r-transparent" />
    </motion.article>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({
  items,
  startIndex,
  onClose,
}: {
  items: typeof galleryItems;
  startIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(startIndex);

  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length);
  const next = () => setCurrent((c) => (c + 1) % items.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="relative max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-slate-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        {/* Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.2 }}
            className="border border-dark-border overflow-hidden"
          >
            <Image
              src={items[current].image}
              alt={items[current].caption}
              className="w-full max-h-[70vh] object-cover"
            />
            <div className="bg-dark-card px-5 py-3 flex items-center justify-between">
              <div>
                <p className="font-display font-semibold text-white tracking-wider text-sm">
                  {items[current].caption}
                </p>
                <p className="text-xs text-slate-600 font-body mt-0.5">
                  {new Date(items[current].date).toLocaleDateString("en-BD", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <span className="text-xs text-slate-600 font-body tracking-widest">
                {current + 1} / {items.length}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Prev / Next */}
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 w-10 h-10 border border-dark-border bg-dark-card hover:border-neon/40 hover:text-neon text-slate-400 flex items-center justify-center transition-all duration-200"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 w-10 h-10 border border-dark-border bg-dark-card hover:border-neon/40 hover:text-neon text-slate-400 flex items-center justify-center transition-all duration-200"
        >
          <ChevronRight size={20} />
        </button>
      </motion.div>
    </motion.div>
  );
}

// ─── Gallery Card ─────────────────────────────────────────────────────────────
function GalleryCard({
  item,
  index,
  onClick,
}: {
  item: (typeof galleryItems)[0];
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden border border-dark-border hover:border-neon/40 transition-all duration-300 "
      style={{ aspectRatio: "5/3" }}
    >
      <Image
        src={item.image}
        alt={item.caption}
        fill
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-dark-base/0 group-hover:bg-dark-base/60 transition-all duration-300 flex items-end">
        <div className="w-full p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="font-display text-white text-sm font-semibold tracking-wide leading-snug">
            {item.caption}
          </p>
          <p className="text-[10px] text-neon font-body mt-1 tracking-widest">
            {new Date(item.date).toLocaleDateString("en-BD", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
      {/* Neon corner */}
      <div className="absolute top-0 right-0 w-0 h-0 border-t-[24px] border-r-[24px] border-t-neon/0 border-r-transparent group-hover:border-t-neon/30 transition-all duration-300" />
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function NewsPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [newsFilter, setNewsFilter] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(newsItems.map((n) => n.category))),
  ];
  const filtered =
    newsFilter === "All"
      ? newsItems
      : newsItems.filter((n) => n.category === newsFilter);

  return (
    <div className="min-h-screen bg-dark-base bg-grid pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-xs text-neon tracking-[0.4em] mb-3 font-body">
            STAY UPDATED
          </p>
          <h1 className="font-display font-bold text-4xl sm:text-6xl text-white tracking-wider mb-4">
            NEWS & GALLERY
          </h1>
          <div className="h-px w-24 bg-neon/40 mx-auto mb-4" />
          <p className="text-slate-500 text-sm font-body">
            Latest updates, match reports & moments from Cyber Strikers
          </p>
        </motion.div>

        {/* ── NEWS SECTION ───────────────────────────────────────────────────── */}
        <section className="mb-24">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="flex items-center gap-2">
              <Newspaper size={16} className="text-neon" />
              <h2 className="font-display font-bold text-2xl text-white tracking-widest">
                LATEST NEWS
              </h2>
            </div>
            <div className="h-px flex-1 bg-dark-border" />
            <span className="text-xs text-slate-600 font-body">
              {newsItems.length} articles
            </span>
          </motion.div>

          {/* Category filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setNewsFilter(cat)}
                className={`px-3 py-1.5 text-[10px] font-body tracking-widest border clip-card transition-all duration-200 ${
                  newsFilter === cat
                    ? "border-neon text-neon bg-neon/10 shadow-[0_0_12px_rgba(0,255,231,0.15)]"
                    : "border-dark-border text-slate-500 hover:border-slate-600 hover:text-slate-300"
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </motion.div>

          {/* News grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <AnimatePresence>
              {filtered.map((item, i) => (
                <NewsCard key={item.id} item={item} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* ── GALLERY SECTION ────────────────────────────────────────────────── */}
        <section>
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="flex items-center gap-2">
              <Images size={16} className="text-neon" />
              <h2 className="font-display font-bold text-2xl text-white tracking-widest">
                PHOTO GALLERY
              </h2>
            </div>
            <div className="h-px flex-1 bg-dark-border" />
            <span className="text-xs text-slate-600 font-body">
              {galleryItems.length} photos
            </span>
          </motion.div>

          <p className="text-xs text-slate-600 font-body tracking-wider mb-6">
            ↗ Click any photo to view full size
          </p>

          {/* Gallery grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {galleryItems.map((item, i) => (
              <GalleryCard
                key={item.id}
                item={item}
                index={i}
                onClick={() => setLightboxIndex(i)}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={galleryItems}
            startIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
