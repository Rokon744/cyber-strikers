"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchScorecardFromSheet, type ScorecardData } from "@/lib/fetchScorecard";

const REFRESH_INTERVAL = 60_000;

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function LiveBadge() {
  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
      </span>
      <span
        className="text-[10px] font-black tracking-[0.35em] text-red-400"
        style={{ fontFamily: "'Rajdhani',sans-serif" }}
      >
        LIVE
      </span>
    </div>
  );
}

function RefreshRing({ interval }: { interval: number }) {
  const [pct, setPct] = useState(100);

  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = (Date.now() - start) % interval;
      setPct(100 - (elapsed / interval) * 100);
    }, 500);
    return () => clearInterval(id);
  }, [interval]);

  const r = 9;
  const circ = 2 * Math.PI * r;

  return (
    <svg width="26" height="26" className="rotate-[-90deg]" aria-label="Next refresh">
      <circle cx="13" cy="13" r={r} fill="none" stroke="#1c2333" strokeWidth="2.5" />
      <circle
        suppressHydrationWarning
        cx="13" cy="13" r={r}
        fill="none"
        stroke="#00ffe7"
        strokeWidth="2.5"
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - pct / 100)}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.5s linear" }}
      />
    </svg>
  );
}

function BallChip({ ball, delay = 0 }: { ball: string; delay?: number }) {
  const styles: Record<string, string> = {
    W:   "bg-red-500   text-white border-red-400   shadow-[0_0_14px_rgba(239,68,68,0.8)]",
    "6": "bg-[#00ffe7] text-black border-[#00ffe7] shadow-[0_0_14px_rgba(0,255,231,0.8)]",
    "4": "bg-blue-500  text-white border-blue-400  shadow-[0_0_14px_rgba(96,165,250,0.7)]",
    "0": "bg-[#0d1117] text-slate-600 border-[#1c2333]",
  };
  const cls = styles[ball] ?? "bg-[#0d1117] text-slate-200 border-slate-600";
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, type: "spring", stiffness: 320, damping: 18 }}
      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-black text-sm select-none flex-shrink-0 ${cls}`}
      style={{ fontFamily: "'Rajdhani',sans-serif" }}
    >
      {ball}
    </motion.div>
  );
}

function BatsmanRow({ value, onStrike }: { value: string; onStrike: boolean }) {
  // "Rokon (22*)" → name="Rokon", stat="(22*)"
  const match = value.match(/^(.+?)\s*(\(.*\))?$/);
  const name  = match?.[1]?.trim() ?? value;
  const stat  = match?.[2]?.trim() ?? "";

  return (
    <div
      className={`flex items-center justify-between px-4 py-3.5 border-b border-[#1c2333] last:border-0 transition-colors duration-300 ${
        onStrike ? "bg-[#00ffe7]/5" : ""
      }`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {onStrike ? (
          <span className="w-2 h-2 rounded-full bg-[#00ffe7] animate-pulse flex-shrink-0" />
        ) : (
          <span className="w-2 h-2 flex-shrink-0" />
        )}
        <span
          className="font-semibold text-white text-sm tracking-wide truncate"
          style={{ fontFamily: "'Rajdhani',sans-serif" }}
        >
          {name}
        </span>
      </div>
      <span
        className={`font-black text-base flex-shrink-0 ml-2 ${onStrike ? "text-[#00ffe7]" : "text-slate-300"}`}
        style={{ fontFamily: "'Rajdhani',sans-serif" }}
      >
        {stat}
      </span>
    </div>
  );
}

// Loading skeleton — shown before first successful fetch
function Skeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712] p-4">
      <div
        className="w-full max-w-md overflow-hidden border border-[#1c2333] rounded-sm"
        style={{ background: "linear-gradient(180deg,#0d1117 0%,#080c12 100%)" }}
      >
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#1c2333]">
          <div className="flex items-center gap-3">
            <LiveBadge />
            <div className="h-2 w-28 bg-[#1c2333] rounded animate-pulse" />
          </div>
          <div className="h-6 w-6 rounded-full bg-[#1c2333] animate-pulse" />
        </div>
        <div className="px-5 pt-6 pb-5 space-y-3">
          <div className="h-2 w-24 bg-[#1c2333] rounded animate-pulse" />
          <div className="h-16 w-44 bg-[#1c2333] rounded animate-pulse" />
          <div className="h-3 w-32 bg-[#1c2333] rounded animate-pulse" />
        </div>
        <div className="px-4 py-3.5 border-t border-[#1c2333] flex gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-10 h-10 rounded-full bg-[#1c2333] animate-pulse flex-shrink-0" />
          ))}
        </div>
        <div className="px-4 py-4 border-t border-[#1c2333] space-y-3">
          <div className="h-2 w-20 bg-[#1c2333] rounded animate-pulse" />
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex justify-between">
              <div className="h-3 w-28 bg-[#1c2333] rounded animate-pulse" />
              <div className="h-3 w-14 bg-[#1c2333] rounded animate-pulse" />
            </div>
          ))}
        </div>
        <div className="px-4 py-3.5 border-t border-[#1c2333] flex justify-between items-center">
          <div className="h-3 w-24 bg-[#1c2333] rounded animate-pulse" />
          <div className="h-8 w-24 bg-[#1c2333] rounded animate-pulse" />
        </div>
        <div className="px-4 py-2.5 border-t border-[#1c2333] text-center">
          <span
            className="text-[10px] text-slate-700 tracking-widest"
            style={{ fontFamily: "'Share Tech Mono',monospace" }}
          >
            CONNECTING TO LIVE FEED...
          </span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────
export default function LiveScorecard() {
  const [data,     setData]    = useState<ScorecardData | null>(null);
  const [status,   setStatus]  = useState<"idle" | "loading" | "error">("loading");
  const [errMsg,   setErrMsg]  = useState<string | null>(null);
  const [flashKey, setFlash]   = useState(0);
  const [mounted,  setMounted] = useState(false);

  // Tracks the last-seen data signature to prevent stale-cache jumps
  const prevSigRef = useRef<string>("");

  useEffect(() => { setMounted(true); }, []);

  const load = useCallback(async () => {
    setStatus("loading");
    setErrMsg(null);
    try {
      const fresh = await fetchScorecardFromSheet();

      // Build a signature from the fields most likely to change each over
      const sig = `${fresh.score}|${fresh.overs}|${fresh.recentBalls.join(",")}`;

      // Only update state when data has actually changed
      if (sig !== prevSigRef.current) {
        prevSigRef.current = sig;
        setData(fresh);
        setFlash((k) => k + 1);
      }

      setStatus("idle");
    } catch (e) {
      setErrMsg(e instanceof Error ? e.message : "Fetch failed");
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(load, REFRESH_INTERVAL);
    return () => clearInterval(id);
  }, [load]);

  // Show skeleton while first fetch is in-flight
  if (!data) return <Skeleton />;

  // Safely compute derived values
  const bat1OnStrike   = data.batsman1.includes("*");
  const thisOverRuns   = data.recentBalls
    .filter((b) => b !== "W" && b !== "WD" && b !== "NB")
    .reduce((sum, b) => sum + (parseInt(b, 10) || 0), 0);

  const lastUpdatedStr = mounted
    ? data.lastUpdated.toLocaleTimeString("en-BD", {
        hour: "2-digit", minute: "2-digit", second: "2-digit",
      })
    : "--:--:--";

  return (
    <div
      className="min-h-screen flex items-start sm:items-center justify-center bg-[#030712] p-3 sm:p-6 pt-6"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 50% -10%, rgba(0,255,231,0.05) 0%, transparent 55%)",
      }}
    >
      <div className="w-full max-w-md">

        {/* Error banner */}
        <AnimatePresence>
          {errMsg && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-3 px-4 py-2.5 border border-red-500/30 bg-red-500/5 text-red-400 text-xs rounded flex items-center gap-2"
              style={{ fontFamily: "'Share Tech Mono',monospace" }}
            >
              <span className="text-red-500 flex-shrink-0">✗</span>
              {errMsg} — showing last known data
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Scorecard card ───────────────────────────────────────────────── */}
        <motion.div
          key={flashKey}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="overflow-hidden border border-[#1c2333] rounded-sm"
          style={{
            background: "linear-gradient(180deg, #0d1117 0%, #080c12 100%)",
            boxShadow:
              "0 0 0 1px rgba(0,255,231,0.06), 0 24px 64px rgba(0,0,0,0.8), inset 0 1px 0 rgba(0,255,231,0.07)",
          }}
        >
          {/* Top bar */}
          <div
            className="flex items-center justify-between px-4 py-2.5 border-b border-[#1c2333]"
            style={{ background: "rgba(0,255,231,0.025)" }}
          >
            <div className="flex items-center gap-3">
              <LiveBadge />
              <div className="w-px h-4 bg-[#1c2333]" />
              <span
                className="text-[10px] text-slate-500 tracking-[0.25em]"
                style={{ fontFamily: "'Share Tech Mono',monospace" }}
              >
                T20 · CYBER CUP 2025
              </span>
            </div>
            <div className="flex items-center gap-2">
              {status === "loading" && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-3 h-3 border-2 border-[#00ffe7]/20 border-t-[#00ffe7] rounded-full"
                />
              )}
              <RefreshRing interval={REFRESH_INTERVAL} />
            </div>
          </div>

          {/* Score banner */}
          <div
            className="px-5 pt-6 pb-5 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg,#0d1117 0%,#0a1520 100%)" }}
          >
            <div
              className="absolute -top-8 -right-8 w-48 h-48 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,255,231,0.06) 0%, transparent 70%)",
              }}
            />

            <p
              className="text-[10px] text-slate-500 tracking-[0.4em] mb-1.5"
              style={{ fontFamily: "'Share Tech Mono',monospace" }}
            >
              {data.teamName.toUpperCase()} · BATTING
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={data.score}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-end gap-1"
              >
                <span
                  className="text-[72px] sm:text-8xl font-black text-white leading-none"
                  style={{
                    fontFamily: "'Rajdhani',sans-serif",
                    textShadow: "0 0 40px rgba(255,255,255,0.1)",
                  }}
                >
                  {data.runs}
                </span>
                <span
                  className="text-4xl sm:text-5xl font-black text-slate-500 leading-none mb-2"
                  style={{ fontFamily: "'Rajdhani',sans-serif" }}
                >
                  /{data.wickets}
                </span>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-4 mt-2 flex-wrap">
              <span
                className="text-slate-400 text-sm"
                style={{ fontFamily: "'Share Tech Mono',monospace" }}
              >
                ({data.overs} Ov)
              </span>
              <div className="flex items-center gap-1.5 px-3 py-1 border border-[#1c2333] bg-[#0a0f16] rounded">
                <span
                  className="text-[10px] text-slate-600 tracking-widest"
                  style={{ fontFamily: "'Share Tech Mono',monospace" }}
                >
                  CRR
                </span>
                <span
                  className="text-sm font-black text-[#00ffe7]"
                  style={{ fontFamily: "'Rajdhani',sans-serif" }}
                >
                  {data.crr}
                </span>
              </div>
              <span
                suppressHydrationWarning
                className="text-[10px] text-slate-700 ml-auto"
                style={{ fontFamily: "'Share Tech Mono',monospace" }}
              >
                {lastUpdatedStr}
              </span>
            </div>
          </div>

          {/* Last over balls */}
          <div
            className="px-4 py-3.5 border-t border-b border-[#1c2333] flex items-center gap-2.5 overflow-x-auto"
            style={{ background: "rgba(0,0,0,0.2)" }}
          >
            <span
              className="text-[9px] text-slate-600 tracking-[0.3em] flex-shrink-0 whitespace-nowrap"
              style={{ fontFamily: "'Share Tech Mono',monospace" }}
            >
              LAST OVER
            </span>
            <div className="flex items-center gap-2 flex-shrink-0">
              {data.recentBalls.length === 0 ? (
                <span className="text-slate-700 text-xs">—</span>
              ) : (
                data.recentBalls.map((b, i) => (
                  <BallChip key={i} ball={b} delay={i * 0.05} />
                ))
              )}
              <div className="w-10 h-10 rounded-full border-2 border-dashed border-[#1c2333] flex items-center justify-center flex-shrink-0">
                <span className="text-slate-800 text-xs">›</span>
              </div>
            </div>
          </div>

          {/* Batting */}
          <div>
            <div className="px-4 pt-3 pb-0.5 flex items-center justify-between">
              <span
                className="text-[9px] text-slate-600 tracking-[0.35em]"
                style={{ fontFamily: "'Share Tech Mono',monospace" }}
              >
                AT THE CREASE
              </span>
              <span
                className="text-[9px] text-slate-700 tracking-widest pr-1"
                style={{ fontFamily: "'Share Tech Mono',monospace" }}
              >
                RUNS (BALLS)
              </span>
            </div>
            <BatsmanRow value={data.batsman1} onStrike={bat1OnStrike} />
            <BatsmanRow value={data.batsman2} onStrike={!bat1OnStrike} />
          </div>

          {/* Bowling */}
          <div
            className="border-t border-[#1c2333] px-4 py-3.5 flex items-center justify-between gap-3"
            style={{ background: "rgba(0,0,0,0.15)" }}
          >
            <div>
              <p
                className="text-[9px] text-slate-600 tracking-[0.35em] mb-1"
                style={{ fontFamily: "'Share Tech Mono',monospace" }}
              >
                BOWLING
              </p>
              <p
                className="font-semibold text-white text-sm tracking-wide"
                style={{ fontFamily: "'Rajdhani',sans-serif" }}
              >
                {data.bowler}
              </p>
            </div>
            <div className="flex flex-col items-center px-4 py-2 border border-[#1c2333] bg-[#0a0f16] rounded min-w-[80px]">
              <span
                className="text-[9px] text-slate-600 tracking-widest"
                style={{ fontFamily: "'Share Tech Mono',monospace" }}
              >
                THIS OVER
              </span>
              <span
                className="text-lg font-black text-white"
                style={{ fontFamily: "'Rajdhani',sans-serif" }}
              >
                {thisOverRuns} runs
              </span>
            </div>
          </div>

          {/* Footer bar */}
          <div
            className="px-4 py-2 border-t border-[#1c2333] flex items-center justify-between"
            style={{ background: "rgba(0,0,0,0.35)" }}
          >
            <span
              className="text-[9px] text-slate-700 tracking-widest"
              style={{ fontFamily: "'Share Tech Mono',monospace" }}
            >
              AUTO-REFRESH · 60s
            </span>
            <span
              className="text-[9px] text-slate-700 tracking-widest"
              style={{ fontFamily: "'Share Tech Mono',monospace" }}
            >
              CYBER STRIKERS
            </span>
          </div>
        </motion.div>

        {/* Ball legend */}
        <div className="mt-4 flex items-center justify-center gap-5 flex-wrap">
          {[
            { label: "SIX",    cls: "bg-[#00ffe7]" },
            { label: "FOUR",   cls: "bg-blue-500"  },
            { label: "WICKET", cls: "bg-red-500"   },
            { label: "DOT",    cls: "bg-[#1c2333]" },
          ].map(({ label, cls }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className={`w-2.5 h-2.5 rounded-full ${cls}`} />
              <span
                className="text-[9px] text-slate-700 tracking-widest"
                style={{ fontFamily: "'Share Tech Mono',monospace" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        <p
          className="text-center text-[9px] text-slate-800 mt-3 tracking-wider"
          style={{ fontFamily: "'Share Tech Mono',monospace" }}
        >
          Update Google Sheet after every over · refreshes every 60s
        </p>
      </div>
    </div>
  );
}