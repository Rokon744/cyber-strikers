"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, Activity, ChevronRight, Wifi } from "lucide-react";
import { liveScore } from "@/data/data";

function BallIndicator({ ball }: { ball: string }) {
  const getStyle = (b: string) => {
    if (b === "W") return "bg-red-500 text-white border-red-600 shadow-[0_0_10px_rgba(239,68,68,0.5)]";
    if (b === "6") return "bg-neon text-dark-base border-neon shadow-[0_0_10px_rgba(0,255,231,0.5)]";
    if (b === "4") return "bg-blue-400 text-dark-base border-blue-500 shadow-[0_0_10px_rgba(96,165,250,0.5)]";
    if (b === "0") return "bg-dark-card text-slate-500 border-dark-border";
    return "bg-dark-base text-slate-300 border-slate-700";
  };

  return (
    <div
      className={`w-9 h-9 rounded-full border-2 flex items-center justify-center font-display font-bold text-sm ${getStyle(ball)}`}
    >
      {ball}
    </div>
  );
}

export default function LiveScorePage() {
  const [pulse, setPulse] = useState(true);
  const [ticker, setTicker] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((p) => !p);
      setTicker((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const score = liveScore;

  return (
    <div className="min-h-screen bg-dark-base bg-grid pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">

        {/* Live Indicator Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <motion.div
              animate={{ scale: pulse ? 1 : 1.3, opacity: pulse ? 1 : 0.6 }}
              transition={{ duration: 0.5 }}
              className="w-2.5 h-2.5 rounded-full bg-red-500"
              style={{ boxShadow: "0 0 10px rgba(239,68,68,0.8)" }}
            />
            <span
              className="font-display font-bold text-sm tracking-[0.5em] text-red-500"
              style={{ textShadow: "0 0 10px rgba(239,68,68,0.6)" }}
            >
              LIVE
            </span>
            <Wifi size={14} className="text-red-500 animate-pulse" />
          </div>
          <p className="text-xs text-slate-500 font-body tracking-widest">{score.tournament}</p>
        </motion.div>

        {/* Main Scoreboard */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative border border-red-500/20 bg-dark-card clip-card overflow-hidden mb-6"
          style={{ boxShadow: "0 0 40px rgba(239,68,68,0.05)" }}
        >
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />

          {/* Match title bar */}
          <div className="px-6 py-3 border-b border-dark-border flex items-center justify-between flex-wrap gap-2">
            <span className="font-display font-bold text-white tracking-wider text-sm sm:text-base">
              {score.match}
            </span>
            <div className="flex items-center gap-2">
              <Activity size={14} className="text-red-500 animate-pulse" />
              <span className="text-xs font-body text-red-500 tracking-widest">INNINGS {score.innings}</span>
            </div>
          </div>

          {/* Main Score Display */}
          <div className="px-6 py-10 text-center relative">
            {/* Batting team */}
            <p className="text-xs text-slate-500 tracking-[0.4em] mb-3 font-body">BATTING</p>
            <div className="mb-2">
              <motion.span
                key={ticker}
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 1 }}
                className="font-display font-bold text-7xl sm:text-9xl text-white"
                style={{ textShadow: "0 0 40px rgba(255,255,255,0.1)" }}
              >
                {score.score.runs}
                <span className="text-slate-500 text-5xl sm:text-7xl">/{score.score.wickets}</span>
              </motion.span>
            </div>

            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="text-center">
                <p className="font-display text-2xl text-neon font-bold">{score.score.overs}</p>
                <p className="text-xs text-slate-600 font-body tracking-widest mt-1">OVERS</p>
              </div>
              <div className="w-px h-10 bg-dark-border" />
              <div className="text-center">
                <p className="font-display text-2xl text-yellow-400 font-bold">{score.crr}</p>
                <p className="text-xs text-slate-600 font-body tracking-widest mt-1">CRR</p>
              </div>
              {score.rrr && (
                <>
                  <div className="w-px h-10 bg-dark-border" />
                  <div className="text-center">
                    <p className="font-display text-2xl text-red-400 font-bold">{score.rrr}</p>
                    <p className="text-xs text-slate-600 font-body tracking-widest mt-1">RRR</p>
                  </div>
                </>
              )}
            </div>

            {/* Batting team name */}
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 border border-neon/20 bg-neon/5">
              <span className="text-neon text-xs font-body tracking-widest">{score.batting}</span>
            </div>
          </div>

          {/* Recent Balls */}
          <div className="px-6 py-4 border-t border-dark-border">
            <p className="text-[10px] text-slate-600 tracking-widest mb-3 font-body">THIS OVER</p>
            <div className="flex items-center gap-2 flex-wrap">
              {score.recentBalls.map((ball, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <BallIndicator ball={ball} />
                </motion.div>
              ))}
              <div className="w-9 h-9 rounded-full border-2 border-dashed border-slate-700 flex items-center justify-center">
                <ChevronRight size={12} className="text-slate-700" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Two column: Batsmen + Bowler */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

          {/* Batsmen */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="border border-dark-border bg-dark-card clip-card overflow-hidden"
          >
            <div className="px-4 py-2.5 border-b border-dark-border">
              <p className="text-[10px] text-slate-500 tracking-widest font-body">BATSMEN AT CREASE</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-dark-border">
                    {["NAME", "R", "B", "4s", "6s", "SR"].map((h) => (
                      <th key={h} className="px-4 py-2 text-[10px] text-slate-600 font-body tracking-widest text-left first:text-left text-right">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {score.batsmen.map((bat) => (
                    <tr
                      key={bat.name}
                      className={`border-b border-dark-border last:border-0 ${bat.onStrike ? "bg-neon/5" : ""}`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="font-display font-semibold text-white tracking-wider text-sm">
                            {bat.name}
                          </span>
                          {bat.onStrike && (
                            <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right font-display font-bold text-neon">{bat.runs}</td>
                      <td className="px-4 py-3 text-right font-body text-slate-400 text-xs">{bat.balls}</td>
                      <td className="px-4 py-3 text-right font-body text-slate-400 text-xs">{bat.fours}</td>
                      <td className="px-4 py-3 text-right font-body text-slate-400 text-xs">{bat.sixes}</td>
                      <td className="px-4 py-3 text-right font-body text-xs text-yellow-400">{bat.strikeRate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Bowler */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="border border-dark-border bg-dark-card clip-card overflow-hidden"
          >
            <div className="px-4 py-2.5 border-b border-dark-border">
              <p className="text-[10px] text-slate-500 tracking-widest font-body">CURRENT BOWLER</p>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 border border-slate-700 flex items-center justify-center"
                  style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                >
                  <Radio size={16} className="text-slate-400" />
                </div>
                <div>
                  <p className="font-display font-bold text-white tracking-wider">{score.bowler.name}</p>
                  <p className="text-xs text-slate-600 font-body">Bowling</p>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: "O", value: score.bowler.overs },
                  { label: "M", value: score.bowler.maidens },
                  { label: "R", value: score.bowler.runs },
                  { label: "W", value: score.bowler.wickets },
                ].map(({ label, value }) => (
                  <div key={label} className="text-center p-3 border border-dark-border">
                    <p className="font-display font-bold text-xl text-white">{value}</p>
                    <p className="text-[10px] text-slate-600 font-body tracking-widest mt-1">{label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-center p-2 border border-dark-border">
                <span className="text-xs text-slate-500 font-body">Economy: </span>
                <span className="text-sm text-red-400 font-display font-bold">{score.bowler.economy}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Fall of Wickets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="border border-dark-border bg-dark-card clip-card overflow-hidden"
        >
          <div className="px-4 py-2.5 border-b border-dark-border">
            <p className="text-[10px] text-slate-500 tracking-widest font-body">FALL OF WICKETS</p>
          </div>
          <div className="p-4 flex flex-wrap gap-3">
            {score.fallOfWickets.map((fow) => (
              <div
                key={fow.wicket}
                className="flex items-center gap-2 px-3 py-2 border border-dark-border text-xs font-body"
              >
                <span className="text-red-500 font-bold">{fow.wicket}W</span>
                <span className="text-white font-display">{fow.score}</span>
                <span className="text-slate-600">({fow.batsman}, {fow.over})</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Ball color legend */}
        <div className="mt-6 flex flex-wrap items-center gap-4 justify-center text-[10px] font-body text-slate-600">
          {[
            { color: "bg-neon", label: "Six" },
            { color: "bg-blue-400", label: "Four" },
            { color: "bg-red-500", label: "Wicket" },
            { color: "bg-dark-card border border-slate-700", label: "Dot/Single" },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded-full ${color}`} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
