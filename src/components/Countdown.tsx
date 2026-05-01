"use client";

import { useState, useEffect } from "react";

interface CountdownProps {
  targetDate: string;
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculate = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HRS", value: timeLeft.hours },
    { label: "MIN", value: timeLeft.minutes },
    { label: "SEC", value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      {units.map(({ label, value }, i) => (
        <div key={label} className="flex items-center gap-2 sm:gap-4">
          <div className="text-center">
            <div className="relative">
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 bg-dark-card border border-neon/30 flex items-center justify-center clip-card"
                style={{ boxShadow: "0 0 15px rgba(0,255,231,0.1)" }}
              >
                <span className="font-display font-bold text-2xl sm:text-3xl text-neon">
                  {String(value).padStart(2, "0")}
                </span>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 mt-1 tracking-widest font-body">{label}</p>
          </div>
          {i < 3 && (
            <span className="text-neon font-bold text-xl pb-4 animate-pulse">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
