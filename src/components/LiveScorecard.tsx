"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchScorecardFromSheet, type ScorecardData } from "@/lib/fetchScorecard";

const REFRESH_INTERVAL = 60_000;

// ─── LiveBadge ────────────────────────────────────────────────────────────────
function LiveBadge() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
      </span>
      <span className="text-[10px] font-black tracking-[0.3em] text-red-400" style={{ fontFamily: "'Rajdhani',sans-serif" }}>
        LIVE
      </span>
    </div>
  );
}

// ─── RefreshRing ──────────────────────────────────────────────────────────────
function RefreshRing({ interval }: { interval: number }) {
  const [pct, setPct] = useState(100);
  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      setPct(100 - ((Date.now() - start) % interval) / interval * 100);
    }, 500);
    return () => clearInterval(id);
  }, [interval]);
  const r = 8, circ = 2 * Math.PI * r;
  return (
    <svg width="22" height="22" className="rotate-[-90deg]" aria-label="Next refresh">
      <circle cx="11" cy="11" r={r} fill="none" stroke="#1c2333" strokeWidth="2" />
      <circle suppressHydrationWarning cx="11" cy="11" r={r} fill="none" stroke="#00ffe7"
        strokeWidth="2" strokeDasharray={circ} strokeDashoffset={circ * (1 - pct / 100)}
        strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.5s linear" }} />
    </svg>
  );
}

// ─── BallChip ─────────────────────────────────────────────────────────────────
function BallChip({ ball, delay = 0, size = "md" }: { ball: string; delay?: number; size?: "sm" | "md" }) {
  const styles: Record<string, string> = {
    W:   "bg-red-500   text-white border-red-400   shadow-[0_0_10px_rgba(239,68,68,0.7)]",
    "6": "bg-[#00ffe7] text-black border-[#00ffe7] shadow-[0_0_10px_rgba(0,255,231,0.7)]",
    "4": "bg-blue-500  text-white border-blue-400  shadow-[0_0_10px_rgba(96,165,250,0.6)]",
    "0": "bg-[#0d1117] text-slate-600 border-[#1c2333]",
  };
  const cls = styles[ball] ?? "bg-[#0d1117] text-slate-200 border-slate-600";
  const sz  = size === "sm" ? "w-7 h-7 text-xs" : "w-9 h-9 text-sm";
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, type: "spring", stiffness: 320, damping: 18 }}
      className={`${sz} rounded-full border-2 flex items-center justify-center font-black select-none flex-shrink-0 ${cls}`}
      style={{ fontFamily: "'Rajdhani',sans-serif" }}
    >
      {ball}
    </motion.div>
  );
}

// ─── BatsmanRow ───────────────────────────────────────────────────────────────
function BatsmanRow({ value, onStrike }: { value: string; onStrike: boolean }) {
  const match = value.match(/^(.+?)\s*(\(.*\))?$/);
  const name  = match?.[1]?.trim() ?? value;
  const stat  = match?.[2]?.trim() ?? "";
  return (
    <div className={`flex items-center justify-between px-4 py-3 border-b border-[#1c2333] last:border-0 transition-colors duration-300 ${onStrike ? "bg-[#00ffe7]/5" : ""}`}>
      <div className="flex items-center gap-2 min-w-0">
        {onStrike
          ? <span className="w-1.5 h-1.5 rounded-full bg-[#00ffe7] animate-pulse flex-shrink-0" />
          : <span className="w-1.5 h-1.5 flex-shrink-0" />}
        <span className="font-semibold text-white text-sm tracking-wide truncate" style={{ fontFamily: "'Rajdhani',sans-serif" }}>
          {name}
        </span>
        {onStrike && <span className="text-[9px] text-[#00ffe7]/60 ml-1 flex-shrink-0" style={{ fontFamily: "'Share Tech Mono',monospace" }}>★</span>}
      </div>
      <span className={`font-black text-base flex-shrink-0 ml-2 ${onStrike ? "text-[#00ffe7]" : "text-slate-300"}`} style={{ fontFamily: "'Rajdhani',sans-serif" }}>
        {stat}
      </span>
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="w-full max-w-md mx-auto overflow-hidden border border-[#1c2333]" style={{ background: "linear-gradient(180deg,#0d1117 0%,#080c12 100%)" }}>
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#1c2333]">
        <div className="flex items-center gap-3"><LiveBadge /><div className="h-2 w-24 bg-[#1c2333] rounded animate-pulse" /></div>
        <div className="h-5 w-5 rounded-full bg-[#1c2333] animate-pulse" />
      </div>
      <div className="px-5 pt-5 pb-4 space-y-3">
        <div className="h-2 w-20 bg-[#1c2333] rounded animate-pulse" />
        <div className="h-14 w-40 bg-[#1c2333] rounded animate-pulse" />
        <div className="h-2 w-28 bg-[#1c2333] rounded animate-pulse" />
      </div>
      <div className="px-4 py-3 border-t border-[#1c2333] flex gap-2">
        {[...Array(6)].map((_, i) => <div key={i} className="w-9 h-9 rounded-full bg-[#1c2333] animate-pulse flex-shrink-0" />)}
      </div>
      <div className="px-4 py-3 border-t border-[#1c2333] space-y-2.5">
        <div className="h-2 w-16 bg-[#1c2333] rounded animate-pulse" />
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="h-3 w-28 bg-[#1c2333] rounded animate-pulse" />
            <div className="h-3 w-12 bg-[#1c2333] rounded animate-pulse" />
          </div>
        ))}
      </div>
      <div className="px-4 py-3 border-t border-[#1c2333] flex justify-between items-center">
        <div className="h-3 w-20 bg-[#1c2333] rounded animate-pulse" />
        <div className="h-7 w-20 bg-[#1c2333] rounded animate-pulse" />
      </div>
      <div className="px-4 py-2 border-t border-[#1c2333] text-center">
        <span className="text-[9px] text-slate-700 tracking-widest animate-pulse" style={{ fontFamily: "'Share Tech Mono',monospace" }}>
          CONNECTING TO LIVE FEED...
        </span>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function LiveScorecard() {
  const [data,     setData]   = useState<ScorecardData | null>(null);
  const [status,   setStatus] = useState<"idle" | "loading" | "error">("loading");
  const [errMsg,   setErrMsg] = useState<string | null>(null);
  const [flashKey, setFlash]  = useState(0);
  const [mounted,  setMounted] = useState(false);
  const prevSigRef = useRef("");

  useEffect(() => { setMounted(true); }, []);

  const load = useCallback(async () => {
    setStatus("loading");
    setErrMsg(null);
    try {
      const fresh = await fetchScorecardFromSheet();
      const sig = `${fresh.score}|${fresh.overs}|${fresh.recentBalls.join(",")}`;
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

  // ── Derived values (safe — only computed when data is non-null below) ────────
  const bat1OnStrike  = data?.batsman1?.includes("*") ?? true;
  const thisOverRuns  = (data?.recentBalls ?? [])
    .filter(b => b !== "W" && b !== "WD" && b !== "NB")
    .reduce((s, b) => s + (parseInt(b, 10) || 0), 0);
  const thisOverWkts  = (data?.recentBalls ?? []).filter(b => b === "W").length;
  const lastUpdatedStr = mounted && data
    ? data.lastUpdated.toLocaleTimeString("en-BD", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    : "--:--:--";

  // ── Page wrapper — fixes mobile layout ───────────────────────────────────────
  // Use py-6 padding instead of min-h-screen centering so card sits naturally
  return (
    <div
      className="w-full bg-[#030712] px-3 py-6 pt-20 pb-10"
      style={{ backgroundImage: "radial-gradient(ellipse at 50% 0%, rgba(0,255,231,0.04) 0%, transparent 60%)" }}
    >
      <div className="max-w-md mx-auto space-y-3">

        {/* Error banner */}
        <AnimatePresence>
          {errMsg && (
            <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="px-4 py-2.5 border border-red-500/30 bg-red-500/5 text-red-400 text-xs flex items-center gap-2"
              style={{ fontFamily: "'Share Tech Mono',monospace" }}>
              <span className="flex-shrink-0">✗</span>
              {errMsg} — showing last known data
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── SCORECARD CARD ─────────────────────────────────────────────────── */}
        {!data ? <Skeleton /> : (
          <motion.div
            key={flashKey}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden border border-[#1c2333]"
            style={{
              background: "linear-gradient(180deg,#0d1117 0%,#080c12 100%)",
              boxShadow: "0 0 0 1px rgba(0,255,231,0.05), 0 16px 48px rgba(0,0,0,0.7), inset 0 1px 0 rgba(0,255,231,0.06)",
            }}
          >
            {/* ── Top bar ────────────────────────────────────────────────────── */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#1c2333]" style={{ background: "rgba(0,255,231,0.02)" }}>
              <div className="flex items-center gap-2.5">
                <LiveBadge />
                <div className="w-px h-3.5 bg-[#1c2333]" />
                <span className="text-[9px] text-slate-500 tracking-[0.25em]" style={{ fontFamily: "'Share Tech Mono',monospace" }}>
                  T8 · Tech Titans Trophy 2025
                </span>
              </div>
              <div className="flex items-center gap-2">
                {status === "loading" && (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-2.5 h-2.5 border-2 border-[#00ffe7]/20 border-t-[#00ffe7] rounded-full" />
                )}
                <RefreshRing interval={REFRESH_INTERVAL} />
              </div>
            </div>

            {/* ── Score banner ───────────────────────────────────────────────── */}
            <div className="px-4 pt-5 pb-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#0d1117 0%,#0a1520 100%)" }}>
              <div className="absolute -top-6 -right-6 w-40 h-40 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle,rgba(0,255,231,0.06) 0%,transparent 70%)" }} />

              {/* Team + innings label */}
              <p className="text-[9px] text-slate-500 tracking-[0.4em] mb-1" style={{ fontFamily: "'Share Tech Mono',monospace" }}>
                {data.teamName.toUpperCase()} · BATTING
              </p>

              {/* Big score */}
              <AnimatePresence mode="wait">
                <motion.div key={data.score} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
                  className="flex items-end gap-1 mb-2">
                  <span className="text-[68px] font-black text-white leading-none" style={{ fontFamily: "'Rajdhani',sans-serif", textShadow: "0 0 30px rgba(255,255,255,0.08)" }}>
                    {data.runs}
                  </span>
                  <span className="text-[38px] font-black text-slate-500 leading-none mb-1.5" style={{ fontFamily: "'Rajdhani',sans-serif" }}>
                    /{data.wickets}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Overs + stats row */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-slate-400 text-xs" style={{ fontFamily: "'Share Tech Mono',monospace" }}>
                  ({data.overs} Ov)
                </span>
                {/* CRR */}
                <div className="flex items-center gap-1 px-2 py-1 border border-[#1c2333] bg-[#0a0f16]">
                  <span className="text-[9px] text-slate-600" style={{ fontFamily: "'Share Tech Mono',monospace" }}>CRR</span>
                  <span className="text-xs font-black text-[#00ffe7]" style={{ fontFamily: "'Rajdhani',sans-serif" }}>{data.crr}</span>
                </div>
                {/* Balls remaining estimate */}
                <div className="flex items-center gap-1 px-2 py-1 border border-[#1c2333] bg-[#0a0f16]">
                  <span className="text-[9px] text-slate-600" style={{ fontFamily: "'Share Tech Mono',monospace" }}>BALLS LEFT</span>
                  <span className="text-xs font-black text-yellow-400" style={{ fontFamily: "'Rajdhani',sans-serif" }}>
                    {Math.max(0, Math.round((8 - data.overs) * 6))}
                  </span>
                </div>
                {/* Last updated */}
                <span suppressHydrationWarning className="text-[9px] text-slate-700 ml-auto" style={{ fontFamily: "'Share Tech Mono',monospace" }}>
                  {lastUpdatedStr}
                </span>
              </div>
            </div>

            {/* ── Over summary strip ─────────────────────────────────────────── */}
            <div className="px-4 py-3 border-t border-[#1c2333] flex items-center gap-2 overflow-x-auto" style={{ background: "rgba(0,0,0,0.2)" }}>
              <span className="text-[9px] text-slate-600 tracking-[0.25em] flex-shrink-0" style={{ fontFamily: "'Share Tech Mono',monospace" }}>
                LAST OVER
              </span>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                {data.recentBalls.length === 0
                  ? <span className="text-slate-700 text-xs ml-2">—</span>
                  : data.recentBalls.map((b, i) => <BallChip key={i} ball={b} delay={i * 0.04} size="sm" />)
                }
                {/* Next ball placeholder */}
                <div className="w-7 h-7 rounded-full border-2 border-dashed border-[#1c2333] flex items-center justify-center flex-shrink-0">
                  <span className="text-slate-800 text-[10px]">›</span>
                </div>
              </div>
              {/* Over summary: X runs, Y wkts */}
              <div className="ml-auto flex-shrink-0 text-right">
                <span className="text-[9px] text-slate-600" style={{ fontFamily: "'Share Tech Mono',monospace" }}>
                  {thisOverRuns}R {thisOverWkts > 0 ? `· ${thisOverWkts}W` : ""}
                </span>
              </div>
            </div>

            {/* ── Batting ────────────────────────────────────────────────────── */}
            <div>
              <div className="px-4 pt-2.5 pb-0.5 flex items-center justify-between">
                <span className="text-[9px] text-slate-600 tracking-[0.3em]" style={{ fontFamily: "'Share Tech Mono',monospace" }}>AT THE CREASE</span>
                <span className="text-[9px] text-slate-700 tracking-widest" style={{ fontFamily: "'Share Tech Mono',monospace" }}>RUNS (BALLS)</span>
              </div>
              <BatsmanRow value={data.batsman1} onStrike={bat1OnStrike} />
              <BatsmanRow value={data.batsman2} onStrike={!bat1OnStrike} />
            </div>

            {/* ── Bowling ────────────────────────────────────────────────────── */}
            <div className="border-t border-[#1c2333] px-4 py-3 flex items-center justify-between gap-3" style={{ background: "rgba(0,0,0,0.15)" }}>
              <div>
                <p className="text-[9px] text-slate-600 tracking-[0.3em] mb-0.5" style={{ fontFamily: "'Share Tech Mono',monospace" }}>BOWLING</p>
                <p className="font-semibold text-white text-sm tracking-wide" style={{ fontFamily: "'Rajdhani',sans-serif" }}>{data.bowler}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex flex-col items-center px-3 py-1.5 border border-[#1c2333] bg-[#0a0f16] min-w-[52px]">
                  <span className="text-[9px] text-slate-600" style={{ fontFamily: "'Share Tech Mono',monospace" }}>RUNS</span>
                  <span className="text-base font-black text-white" style={{ fontFamily: "'Rajdhani',sans-serif" }}>{thisOverRuns}</span>
                </div>
                <div className="flex flex-col items-center px-3 py-1.5 border border-[#1c2333] bg-[#0a0f16] min-w-[52px]">
                  <span className="text-[9px] text-slate-600" style={{ fontFamily: "'Share Tech Mono',monospace" }}>WKTS</span>
                  <span className="text-base font-black text-red-400" style={{ fontFamily: "'Rajdhani',sans-serif" }}>{thisOverWkts}</span>
                </div>
              </div>
            </div>

            {/* ── Match situation bar ────────────────────────────────────────── */}
            <div className="border-t border-[#1c2333] px-4 py-2.5 grid grid-cols-3 divide-x divide-[#1c2333]" style={{ background: "rgba(0,0,0,0.25)" }}>
              {[
                { label: "RUNS",    value: data.runs },
                { label: "WKTS",   value: `${data.wickets}/10` },
                { label: "OVERS",  value: `${data.overs}/8` },
              ].map(({ label, value }) => (
                <div key={label} className="text-center px-2">
                  <p className="text-[8px] text-slate-600 tracking-widest" style={{ fontFamily: "'Share Tech Mono',monospace" }}>{label}</p>
                  <p className="text-sm font-black text-white" style={{ fontFamily: "'Rajdhani',sans-serif" }}>{value}</p>
                </div>
              ))}
            </div>

            {/* ── Footer ─────────────────────────────────────────────────────── */}
            <div className="px-4 py-1.5 border-t border-[#1c2333] flex items-center justify-between" style={{ background: "rgba(0,0,0,0.4)" }}>
              <span className="text-[8px] text-slate-800 tracking-widest" style={{ fontFamily: "'Share Tech Mono',monospace" }}>AUTO-REFRESH · 60s</span>
              <span className="text-[8px] text-slate-800 tracking-widest" style={{ fontFamily: "'Share Tech Mono',monospace" }}>CYBER STRIKERS</span>
            </div>
          </motion.div>
        )}

        {/* ── Ball legend ──────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-center gap-4 flex-wrap pt-1">
          {[
            { label: "SIX",    cls: "bg-[#00ffe7]" },
            { label: "FOUR",   cls: "bg-blue-500"  },
            { label: "WICKET", cls: "bg-red-500"   },
            { label: "DOT",    cls: "bg-[#1c2333]" },
          ].map(({ label, cls }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${cls}`} />
              <span className="text-[9px] text-slate-700 tracking-widest" style={{ fontFamily: "'Share Tech Mono',monospace" }}>{label}</span>
            </div>
          ))}
        </div>

        <p className="text-center text-[8px] text-slate-800 tracking-wider" style={{ fontFamily: "'Share Tech Mono',monospace" }}>
          Update Google Sheet after every over · refreshes every 60s
        </p>

      </div>
    </div>
  );
}