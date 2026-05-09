"use client";
// import LiveScorecard from "@/components/LiveScorecard";
import LiveScorecard from "@/components/LiveScorecard";
import NextBattlePlaceholder from "@/components/NextBattlePlaceholder";
import { useState } from "react";
 
export default function ScorecardPage() {
  const [isLive, setIsLive] = useState(false);
  return (
    <section className="min-h-[400px] flex items-center justify-center">
      {isLive ? (
        /* যখন ম্যাচ লাইভ হবে */
        <LiveScorecard />
      ) : (
        /* যখন কোনো ম্যাচ নেই (এখনকার জন্য) */
        <NextBattlePlaceholder />
      )}
    </section>
  );
}