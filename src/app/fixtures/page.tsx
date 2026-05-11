"use client";

import { motion } from "framer-motion";
import { Trophy, Calendar, MapPin, Clock, CheckCircle2, Circle, ArrowRight, Crown } from "lucide-react";
import { tournament } from "@/data/data";

type MatchData = {
  id: string;
  teamA: string;
  teamB: string;
  date: string;
  time: string;
  venue: string;
  winner: string | null;
  scoreA: string | null;
  scoreB: string | null;
};

function MatchCard({
  match,
  round,
  delay = 0,
}: {
  match: MatchData;
  round: string;
  delay?: number;
}) {
  const isCompleted = !!match.winner;
  const isPending = !match.winner && match.teamA !== "TBD" && match.teamB !== "TBD";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`relative border bg-dark-card clip-card overflow-hidden transition-all duration-300 ${
        isCompleted
          ? "border-neon/30"
          : isPending
          ? "border-yellow-500/30 hover:border-yellow-500/50"
          : "border-dark-border opacity-60"
      }`}
      style={{
        boxShadow: isCompleted
          ? "0 0 20px rgba(0,255,231,0.05)"
          : "0 4px 15px rgba(0,0,0,0.2)",
      }}
    >
      {/* Top line */}
      <div
        className={`absolute top-0 left-0 right-0 h-px ${
          isCompleted
            ? "bg-gradient-to-r from-transparent via-neon/50 to-transparent"
            : isPending
            ? "bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent"
            : "bg-transparent"
        }`}
      />

      {/* Round badge */}
      <div className="px-4 py-2 border-b border-dark-border flex items-center justify-between">
        <span className="text-[10px] text-slate-600 tracking-widest font-body">{round}</span>
        <span
          className={`text-[10px] font-body tracking-widest flex items-center gap-1 ${
            isCompleted
              ? "text-neon"
              : isPending
              ? "text-yellow-500"
              : "text-slate-600"
          }`}
        >
          {isCompleted ? (
            <><CheckCircle2 size={10} /> COMPLETED</>
          ) : isPending ? (
            <><Circle size={10} /> UPCOMING</>
          ) : (
            <><Circle size={10} /> TBD</>
          )}
        </span>
      </div>

      {/* Teams */}
      <div className="p-4 space-y-2">
        {[
          { name: match.teamA, score: match.scoreA },
          { name: match.teamB, score: match.scoreB },
        ].map(({ name, score }, i) => {
          const isWinner = match.winner === name;
          const isLoser = isCompleted && !isWinner;

          return (
            <div
              key={i}
              className={`flex items-center justify-between p-3 border transition-all ${
                isWinner
                  ? "border-neon/30 bg-neon/5"
                  : isLoser
                  ? "border-dark-border opacity-50"
                  : "border-dark-border"
              }`}
            >
              <div className="flex items-center gap-2">
                {isWinner && <Trophy size={12} className="text-neon flex-shrink-0" />}
                <span
                  className={`font-display font-semibold tracking-wider text-sm ${
                    isWinner
                      ? "text-neon"
                      : name === "TBD"
                      ? "text-slate-600"
                      : "text-white"
                  }`}
                >
                  {name}
                </span>
              </div>
              {score && (
                <span
                  className={`font-mono text-sm ${isWinner ? "text-neon font-bold" : "text-slate-500"}`}
                >
                  {score}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Match details */}
      <div className="px-4 pb-3 flex flex-wrap gap-3">
        <div className="flex items-center gap-1 text-slate-600 text-[10px] font-body">
          <Calendar size={10} className="text-neon/60" />
          {match.date}
        </div>
        <div className="flex items-center gap-1 text-slate-600 text-[10px] font-body">
          <Clock size={10} className="text-neon/60" />
          {match.time}
        </div>
        <div className="flex items-center gap-1 text-slate-600 text-[10px] font-body">
          <MapPin size={10} className="text-neon/60" />
          {match.venue}
        </div>
      </div>
    </motion.div>
  );
}

function RoundConnector() {
  return (
    <div className="hidden lg:flex items-center justify-center w-8">
      <div className="flex flex-col items-center">
        <ArrowRight size={20} className="text-neon/30" />
      </div>
    </div>
  );
}

export default function FixturesPage() {
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
          <p className="text-xs text-neon tracking-[0.4em] mb-3 font-body">TOURNAMENT BRACKET</p>
          <h1 className="font-display font-bold text-4xl sm:text-6xl text-white tracking-wider mb-4">
            {tournament.name}
          </h1>
          <div className="h-px w-24 bg-neon/40 mx-auto mb-4" />

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 text-xs font-body">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border border-neon/60 bg-neon/10" />
              <span className="text-slate-500">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border border-yellow-500/60 bg-yellow-500/10" />
              <span className="text-slate-500">Upcoming</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border border-dark-border" />
              <span className="text-slate-500">TBD</span>
            </div>
          </div>
        </motion.div>

        {/* Knockout Bracket */}
        <div className="space-y-12">

          {/* Quarter Finals */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-px flex-1 bg-dark-border" />
              <h2 className="font-display font-bold text-xl text-white tracking-[0.2em] whitespace-nowrap">
                QUARTER-FINALS
              </h2>
              <div className="h-px flex-1 bg-dark-border" />
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {tournament.quarterFinals.map((match, i) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  round={`QF${i + 1}`}
                  delay={i * 0.1}
                />
              ))}
            </div>
          </div>

          {/* Arrow indicators */}
          <div className="hidden lg:flex items-center justify-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-neon/20" />
            <div className="flex items-center gap-2 text-neon/30">
              <ArrowRight size={16} />
              <span className="text-xs font-body tracking-widest text-neon/40">WINNERS ADVANCE</span>
              <ArrowRight size={16} />
            </div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-neon/20" />
          </div>

          {/* Semi Finals */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-px flex-1 bg-dark-border" />
              <h2 className="font-display font-bold text-xl text-white tracking-[0.2em] whitespace-nowrap">
                SEMI-FINALS
              </h2>
              <div className="h-px flex-1 bg-dark-border" />
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {tournament.semiFinals.map((match, i) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  round={`SF${i + 1}`}
                  delay={0.4 + i * 0.1}
                />
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="flex items-center gap-2 text-neon/30">
              <ArrowRight size={16} />
              <span className="text-xs font-body tracking-widest text-neon/40">GRAND FINAL</span>
              <ArrowRight size={16} />
            </div>
          </div>

          {/* Final */}
          <div className="py-10">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-10"
      >
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
        <h2
          className="font-display font-black text-3xl md:text-4xl tracking-[0.1em] md:tracking-[0.4em] whitespace-nowrap flex items-center gap-4"
          style={{ color: "#ffd700", textShadow: "0 0 30px rgba(255,215,0,0.6)" }}
        >
          <Trophy className="animate-pulse" size={32} />
          GRAND FINAL
          <Trophy className="animate-pulse" size={32} />
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
      </motion.div>

      {/* Final Match Card */}
      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative border-2 border-yellow-500/40 bg-[#05070a] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(255,215,0,0.1)]"
        >
          {/* Winner Highlight Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,215,0,0.15),transparent)]" />
          
          {/* Top Banner */}
          <div className="relative px-6 py-3 border-b border-yellow-500/20 bg-yellow-500/5 flex items-center justify-between">
            <span className="text-xs text-yellow-500 font-black tracking-[0.3em]">CHAMPIONSHIP MATCH</span>
            <div className="flex items-center gap-2">
               <span className="text-[10px] text-yellow-200/60 uppercase">Official Result</span>
               <div className="h-2 w-2 bg-yellow-500 rounded-full animate-ping" />
            </div>
          </div>

          {/* Teams Battle Area */}
          <div className="relative p-8 flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* Team A - Winner */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <motion.div 
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="absolute -top-6 left-1/2 -translate-x-1/2 text-yellow-400"
                >
                  <Crown size={32} />
                </motion.div>
                <div className="w-24 h-24 rounded-full bg-yellow-500/10 border-2 border-yellow-500 flex items-center justify-center text-white font-bold text-2xl shadow-[0_0_20px_rgba(255,215,0,0.2)]">
                   BT
                </div>
              </div>
              <div>
                <h3 className="text-white font-display font-bold text-lg leading-tight mb-1">{tournament.final.teamA}</h3>
                <p className="text-yellow-500 font-black text-4xl">{tournament.final.scoreA}</p>
              </div>
            </div>

            {/* VS Divider */}
            <div className="flex flex-col items-center">
               <div className="text-yellow-500/30 font-black text-xl italic mb-2">VS</div>
               <div className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-gray-400">FINAL SCORE</div>
            </div>

            {/* Team B */}
            <div className="flex flex-col items-center text-center space-y-4 opacity-70">
              <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-slate-500 font-bold text-2xl">
                 TG
              </div>
              <div>
                <h3 className="text-slate-300 font-display font-bold text-lg leading-tight mb-1">{tournament.final.teamB}</h3>
                <p className="text-slate-400 font-black text-4xl">{tournament.final.scoreB}</p>
              </div>
            </div>
          </div>

          {/* Victory Message */}
          <div className="text-center pb-6">
             <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               className="inline-block px-6 py-2 rounded-full bg-yellow-500 text-black font-black text-sm uppercase tracking-tighter"
             >
               🏆 {tournament.final.winner} ARE THE CHAMPIONS!
             </motion.div>
          </div>

          {/* Footer Info */}
          <div className="relative p-6 bg-yellow-500/5 border-t border-yellow-500/10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-center gap-2 text-slate-400 text-xs">
              <Calendar size={14} className="text-yellow-500" />
              {tournament.final.date}
            </div>
            <div className="flex items-center justify-center gap-2 text-slate-400 text-xs border-x border-white/5">
              <Clock size={14} className="text-yellow-500" />
              {tournament.final.time}
            </div>
            <div className="flex items-center justify-center gap-2 text-slate-400 text-xs">
              <MapPin size={14} className="text-yellow-500" />
              {tournament.final.venue}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
        </div>

        {/* Tournament stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 border border-dark-border bg-dark-card p-6 clip-card grid grid-cols-2 sm:grid-cols-4 gap-6"
        >
          {[
            { label: "TEAMS", value: "7" },
            { label: "MATCHES", value: "6" },
            { label: "COMPLETED", value: "6" },
            { label: "REMAINING", value: "0" },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="font-display font-bold text-3xl text-neon">{value}</p>
              <p className="text-xs text-slate-600 font-body tracking-widest mt-1">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
