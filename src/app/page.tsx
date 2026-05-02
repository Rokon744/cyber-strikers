"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Shield,
  Trophy,
  Swords,
  MapPin,
  Calendar,
  ChevronRight,
  Zap,
  Target,
  Star,
  Tag,
  Newspaper,
} from "lucide-react";
import Link from "next/link";
import Countdown from "@/components/Countdown";
import { newsItems, teamInfo, upcomingMatch } from "@/data/data";
import cyber_strikers from "../../public/cyber-strikers.png";
import Image from "next/image";
import { useState } from "react";

// ─── Category badge colors ────────────────────────────────────────────────────
const categoryColors: Record<string, string> = {
  "Match Result": "text-neon border-neon/30 bg-neon/5",
  Training: "text-blue-400 border-blue-400/30 bg-blue-400/5",
  Award: "text-yellow-400 border-yellow-400/30 bg-yellow-400/5",
  Announcement: "text-purple-400 border-purple-400/30 bg-purple-400/5",
  Milestone: "text-orange-400 border-orange-400/30 bg-orange-400/5",
  Tournament: "text-pink-400 border-pink-400/30 bg-pink-400/5",
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

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
      <div className="relative h-40 md:h-60 overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-dark-card/40 to-transparent" />
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

export default function HomePage() {
  const [newsFilter, setNewsFilter] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(newsItems.map((n) => n.category))),
  ];
  const filtered =
    newsFilter === "All"
      ? newsItems.slice(0, 3)
      : newsItems.filter((n) => n.category === newsFilter);

  return (
    <div className="min-h-screen bg-grid bg-dark-base">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Glowing orbs background */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
            style={{
              background:
                "radial-gradient(circle, rgba(0,255,231,0.8) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-5"
            style={{
              background:
                "radial-gradient(circle, rgba(0,150,255,0.8) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 mb-8"
            >
              <div className="h-px w-12 bg-neon/50" />
              <span className="text-xs text-neon tracking-[0.3em] font-body uppercase">
                CST- Tech Titans Trophy 2026 (Season 2)
              </span>
              <div className="h-px w-12 bg-neon/50" />
            </motion.div>

            {/* Team Name with Glitch */}
            <motion.div variants={fadeUp} className="mb-4">
              <h1
                className="font-display font-bold text-5xl sm:text-7xl lg:text-9xl tracking-tight leading-none"
                style={{ color: "white" }}
              >
                CYBER
                <span
                  className="block text-neon"
                  style={{
                    textShadow:
                      "0 0 30px rgba(0,255,231,0.5), 0 0 80px rgba(0,255,231,0.2)",
                  }}
                >
                  STRIKERS
                </span>
              </h1>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="text-slate-400 text-sm sm:text-base tracking-[0.4em] mb-16 font-body"
            >
              {teamInfo.tagline}
            </motion.p>

            {/* Stats Row */}
            <motion.div
              variants={fadeUp}
              className="flex items-center justify-center gap-8 sm:gap-16 mb-20"
            >
              {[
                { icon: Trophy, value: teamInfo.trophies, label: "Trophies" },
                { icon: Target, value: teamInfo.wins, label: "Wins" },
                { icon: Shield, value: teamInfo.losses, label: "Losses" },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="text-center">
                  <Icon
                    size={18}
                    className="text-neon mx-auto mb-2 opacity-70"
                  />
                  <p className="font-display font-bold text-3xl sm:text-4xl text-white">
                    {value}
                  </p>
                  <p className="text-xs text-slate-500 tracking-widest mt-1">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              className="flex items-center justify-center gap-4"
            >
              <Link href="/squad">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-6 py-3 font-display font-semibold text-sm tracking-widest bg-neon text-dark-base hover:shadow-[0_0_30px_rgba(0,255,231,0.5)] transition-all duration-300 clip-card"
                >
                  <Zap size={16} />
                  VIEW SQUAD
                </motion.button>
              </Link>
              <Link href="/fixtures">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-6 py-3 font-display font-semibold text-sm tracking-widest border border-neon/40 text-neon hover:bg-neon/10 hover:border-neon transition-all duration-300 clip-card"
                >
                  FIXTURES
                  <ChevronRight size={16} />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs text-slate-600 tracking-widest">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-10 bg-gradient-to-b from-neon/50 to-transparent"
          />
        </div>
      </section>

      {/* Upcoming Match / VS Section */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <p className="text-xs text-neon tracking-[0.4em] mb-3 font-body">
              NEXT BATTLE
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-wider">
              UPCOMING MATCH
            </h2>
            <div className="h-px w-24 bg-neon/40 mx-auto mt-4" />
          </motion.div>

          {/* VS Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative border border-dark-border bg-dark-card clip-card overflow-hidden mb-8"
            style={{ boxShadow: "0 0 40px rgba(0,255,231,0.05)" }}
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon/60 to-transparent" />

            {/* Match info header */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-dark-border">
              <span className="text-xs text-slate-500 tracking-widest font-body">
                {upcomingMatch.tournament}
              </span>
              <span className="text-xs px-3 py-1 border border-neon/30 text-neon font-body tracking-widest">
                {upcomingMatch.round}
              </span>
            </div>

            {/* Teams VS layout */}
            <div className="grid grid-cols-3 items-center py-12 px-6">
              {/* Team A */}
              <div className="text-center">
                <div
                  className="w-20 h-20 sm:w-28 sm:h-28 mx-auto mb-4 border-2 border-neon/40 flex items-center justify-center clip-card"
                  style={{ background: "rgba(0,255,231,0.05)" }}
                >
                  <Image
                    src={upcomingMatch.teamAlogo}
                    alt="team a logo"
                    className="w-[100px] h-[100px] object-cover"
                  />
                  {/* <Swords size={32} className="text-neon" /> */}
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-wider">
                  {upcomingMatch.teamA}
                </h3>
                <p className="text-xs text-neon mt-1 tracking-widest">HOME</p>
              </div>

              {/* VS Center */}
              <div className="text-center">
                <div className="relative">
                  <motion.p
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="font-display font-bold text-5xl sm:text-7xl text-neon"
                    style={{ textShadow: "0 0 40px rgba(0,255,231,0.6)" }}
                  >
                    VS
                  </motion.p>
                  <p className="text-xs text-slate-600 tracking-[0.3em] mt-2">
                    BATTLE
                  </p>
                </div>
              </div>

              {/* Team B */}
              <div className="text-center">
                <div
                  className="w-20 h-20 sm:w-28 sm:h-28 mx-auto mb-4 border-2 border-slate-600/40 flex items-center justify-center clip-card"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <Image
                    src={upcomingMatch.teamBlogo}
                    alt="team b logo"
                    className="w-[100px] h-[100px] object-cover"
                  />
                  <Shield size={32} className="text-slate-400" />
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-wider">
                  {upcomingMatch.teamB}
                </h3>
                <p className="text-xs text-slate-500 mt-1 tracking-widest">
                  AWAY
                </p>
              </div>
            </div>

            {/* Match details */}
            <div className="flex flex-wrap items-center justify-center gap-6 px-6 py-5 border-t border-dark-border">
              <div className="flex items-center gap-2 text-slate-400 text-sm font-body">
                <Calendar size={14} className="text-neon" />
                {new Date(upcomingMatch.date).toLocaleDateString("en-BD", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <div className="w-px h-4 bg-dark-border hidden sm:block" />
              <div className="flex items-center gap-2 text-slate-400 text-sm font-body">
                <MapPin size={14} className="text-neon" />
                {upcomingMatch.venue}
              </div>
            </div>

            {/* Corner decoration */}
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-r-[30px] border-t-neon/20 border-r-transparent" />
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center gap-6"
          >
            <p className="text-xs text-slate-500 tracking-[0.4em] font-body">
              MATCH STARTS IN
            </p>
            <Countdown targetDate={upcomingMatch.date} />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-4 sm:px-6 border-t border-dark-border">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
          >
            {/* Text */}
            <div>
              <p className="text-xs text-neon tracking-[0.4em] mb-4 font-body">
                ABOUT US
              </p>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-6 tracking-wide leading-tight">
                THE TEAM THAT
                <br />
                <span className="text-neon">REWRITES RULES</span>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-4 font-body">
                Cyber Strikers is not just a cricket team — it&apos;s a
                movement. Founded in 2023, we bring together Dhaka&apos;s
                sharpest players under one banner to compete with fearless
                energy and tactical precision.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 font-body">
                Our philosophy: analyze the field like a computer, strike like
                lightning. Every match is a system to crack, every opponent is a
                puzzle to solve.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Star, label: "Captain", value: teamInfo.captain },
                  {
                    icon: MapPin,
                    label: "Home Ground",
                    value: teamInfo.homeGround,
                  },
                  { icon: Calendar, label: "Founded", value: teamInfo.founded },
                  {
                    icon: Trophy,
                    label: "Trophies Won",
                    value: `${teamInfo.trophies} Cups`,
                  },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="p-4 border border-dark-border bg-dark-card hover:border-neon/30 transition-colors duration-300"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon size={12} className="text-neon" />
                      <span className="text-xs text-slate-500 tracking-wider">
                        {label}
                      </span>
                    </div>
                    <p className="font-display font-semibold text-white text-sm tracking-wider">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative element */}
            <div className="relative hidden md:flex items-center justify-center">
              <div
                className="w-64 h-64 border border-neon/20 rotate-45"
                style={{ boxShadow: "0 0 60px rgba(0,255,231,0.05)" }}
              />
              <div className="absolute w-48 h-48 border border-neon/10 rotate-45" />
              <div className="absolute text-center -rotate-0">
                <Image
                  src={cyber_strikers}
                  alt="logo"
                  className="w-10/12 m-auto"
                />
                {/* <p className="font-display font-bold text-6xl text-neon"
                  style={{ textShadow: "0 0 30px rgba(0,255,231,0.5)" }}>CS</p>
                <p className="text-xs text-slate-500 tracking-[0.4em] mt-2">EST. 2023</p> */}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* ── NEWS SECTION ───────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 border-t border-dark-border">
        <div className="max-w-6xl mx-auto">
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

          <Link href="/news">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-3 font-display font-semibold text-sm tracking-widest bg-neon text-dark-base hover:shadow-[0_0_30px_rgba(0,255,231,0.5)] transition-all duration-300 clip-card mt-5 mx-auto"
            >
              <Zap size={16} />
              ALL NEWS
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
}
