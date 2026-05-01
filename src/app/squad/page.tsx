"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Zap, Target, User, Crown, ChevronDown, ChevronUp } from "lucide-react";
import { players } from "@/data/data";
import Image from "next/image";

const roleColors: Record<string, string> = {
  Batsman: "text-yellow-400 border-yellow-400/30 bg-yellow-400/5",
  Bowler: "text-blue-400 border-blue-400/30 bg-blue-400/5",
  "All-Rounder": "text-neon border-neon/30 bg-neon/5",
  "Wicket-Keeper": "text-purple-400 border-purple-400/30 bg-purple-400/5",
};

const roleFilters = ["All", "Batsman", "Bowler", "All-Rounder", "Wicket-Keeper"];

function StatBar({ value, max = 100, label }: { value: number; max?: number; label: string }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-slate-500 font-body tracking-wider">{label}</span>
        <span className="text-xs text-neon font-body">{value}</span>
      </div>
      <div className="stat-bar">
        <motion.div
          className="stat-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${(value / max) * 100}%` }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function UglyMeter({ value }: { value: number }) {
  const getColor = (v: number) => {
    if (v < 30) return "#22c55e";
    if (v < 60) return "#f59e0b";
    return "#ef4444";
  };
  const getLabel = (v: number) => {
    if (v < 20) return "Pretty Boy";
    if (v < 40) return "Acceptable";
    if (v < 60) return "Questionable";
    if (v < 80) return "Rough";
    return "Legendary";
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-slate-500 font-body tracking-wider">Ugly Meter</span>
        <span className="text-xs font-body" style={{ color: getColor(value) }}>
          {getLabel(value)}
        </span>
      </div>
      <div className="stat-bar">
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          style={{
            background: `linear-gradient(90deg, ${getColor(value)}, ${getColor(Math.min(value + 20, 100))})`,
            boxShadow: `0 0 8px ${getColor(value)}80`,
          }}
        />
      </div>
    </div>
  );
}

function PlayerCard({ player, index }: { player: (typeof players)[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const roleClass = roleColors[player.role] || "text-slate-400 border-slate-600 bg-slate-800";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      layout
      className="group relative bg-dark-card border border-dark-border hover:border-neon/30 transition-all duration-300 clip-card overflow-hidden"
      style={{
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      }}
    >
      {/* Top neon line on hover */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon/0 to-transparent group-hover:via-neon/60 transition-all duration-500" />

      {/* Captain badge */}
      {player.isCaptain && (
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 bg-neon/10 border border-neon/30 text-neon text-xs font-body tracking-wider z-10">
          <Crown size={10} />
          <span>CPT</span>
        </div>
      )}

      {/* Jersey number */}
      <div className="absolute top-3 left-3 font-display font-bold text-5xl text-white/5 select-none leading-none">
        #{player.jersey}
      </div>

      {/* Avatar */}
      <div className="relative pt-6 pb-4 px-6 flex flex-col items-center">
        <div
          className="w-36 h-36 relative mb-4 border-2 border-dark-border group-hover:border-neon/40 transition-all duration-300"
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
        >
          <Image
            src={player.avatar}
            alt={player.name}
            fill
            className="w-full h-full object-cover bg-dark-base"
          />
        </div>

        <h3 className="font-display font-bold text-xl text-white tracking-widest mb-1">
          {player.name}
        </h3>

        <span className={`text-xs px-3 py-1 border font-body tracking-widest ${roleClass}`}>
          {player.role}
        </span>

        <p className="text-xs text-slate-600 font-body mt-2 tracking-widest">
          {player.matches} MATCHES
        </p>
      </div>

      {/* Quick stats */}
      <div className="px-6 pb-4 grid grid-cols-3 gap-3 border-t border-dark-border pt-4">
        {player.role === "Bowler" ? (
          <>
            <div className="text-center">
              <p className="font-display font-bold text-lg text-white">{player.stats.wickets}</p>
              <p className="text-[10px] text-slate-600 tracking-wider">WKTS</p>
            </div>
            <div className="text-center border-x border-dark-border">
              <p className="font-display font-bold text-lg text-neon">{player.stats.economy}</p>
              <p className="text-[10px] text-slate-600 tracking-wider">ECON</p>
            </div>
            <div className="text-center">
              <p className="font-display font-bold text-lg text-white">{player.stats.average}</p>
              <p className="text-[10px] text-slate-600 tracking-wider">AVG</p>
            </div>
          </>
        ) : (
          <>
            <div className="text-center">
              <p className="font-display font-bold text-lg text-white">{player.stats.runs}</p>
              <p className="text-[10px] text-slate-600 tracking-wider">RUNS</p>
            </div>
            <div className="text-center border-x border-dark-border">
              <p className="font-display font-bold text-lg text-neon">{player.stats.average}</p>
              <p className="text-[10px] text-slate-600 tracking-wider">AVG</p>
            </div>
            <div className="text-center">
              <p className="font-display font-bold text-lg text-white">{player.stats.strikeRate}</p>
              <p className="text-[10px] text-slate-600 tracking-wider">SR</p>
            </div>
          </>
        )}
      </div>

      {/* Expand button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-center gap-1 py-2 text-xs text-slate-600 hover:text-neon border-t border-dark-border transition-colors duration-200 font-body tracking-widest"
      >
        {expanded ? (
          <><ChevronUp size={12} /> LESS</>
        ) : (
          <><ChevronDown size={12} /> STATS</>
        )}
      </button>

      {/* Expanded stats */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-dark-border"
          >
            <div className="px-6 py-4 space-y-3">
              <StatBar value={player.stats.skillLevel} label="Skill Level" />
              <UglyMeter value={player.stats.uglyMeter} />
              {player.stats.wickets !== undefined && player.role !== "Wicket-Keeper" && (
                <StatBar value={player.stats.wickets} max={50} label="Wickets" />
              )}
              {player.stats.dismissals !== undefined && (
                <StatBar value={player.stats.dismissals} max={50} label="Dismissals" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function SquadPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? players
    : players.filter((p) => p.role === activeFilter);

  return (
    <div className="min-h-screen bg-dark-base bg-grid pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-xs text-neon tracking-[0.4em] mb-3 font-body">MEET THE WARRIORS</p>
          <h1 className="font-display font-bold text-4xl sm:text-6xl text-white tracking-wider mb-4">
            THE SQUAD
          </h1>
          <div className="h-px w-24 bg-neon/40 mx-auto" />
          <p className="text-slate-500 text-sm mt-4 font-body">{players.length} Players · Season 2025</p>
        </motion.div>

        {/* Role Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          {roleFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-xs font-body tracking-widest border transition-all duration-200 clip-card ${
                activeFilter === filter
                  ? "border-neon text-neon bg-neon/10 shadow-[0_0_15px_rgba(0,255,231,0.2)]"
                  : "border-dark-border text-slate-500 hover:border-slate-600 hover:text-slate-300"
              }`}
            >
              {filter.toUpperCase()}
            </button>
          ))}
        </motion.div>

        {/* Squad Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence>
            {filtered.map((player, i) => (
              <PlayerCard key={player.id} player={player} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 border border-dark-border bg-dark-card p-6 clip-card"
        >
          <p className="text-xs text-slate-500 tracking-widest mb-4 font-body flex items-center gap-2">
            <Target size={12} className="text-neon" />
            STAT GUIDE
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-body text-slate-600">
            <div><span className="text-slate-400">Skill Level</span> — Overall player rating (0-100)</div>
            <div><span className="text-slate-400">Ugly Meter</span> — A fun chaos rating unique to CS</div>
            <div><span className="text-slate-400">SR</span> — Strike Rate (runs per 100 balls)</div>
            <div><span className="text-slate-400">Econ</span> — Runs conceded per over</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
