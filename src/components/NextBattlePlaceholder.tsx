"use client";
import React from 'react';
import { motion } from 'framer-motion';

const NextBattlePlaceholder = () => {
  return (
    <div className="relative flex flex-col items-center justify-center py-24 px-4 overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full" />

      {/* Sub-heading with fade-in */}
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-sm tracking-[0.4em] text-cyan-400 uppercase mb-3 font-semibold"
      >
        Next Battle
      </motion.h2>

      {/* Main Title with scaling effect */}
      <motion.h1 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter"
      >
        STAY <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">TUNED</span>
      </motion.h1>

      {/* Animated Card */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative w-full max-w-2xl group"
      >
        {/* Border Animation Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        
        <div className="relative bg-[#0a0f16]/80 border border-white/5 rounded-xl p-12 backdrop-blur-md shadow-2xl">
          <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed">
            The <span className="text-white">Cyber Strikers</span> are currently re-grouping and preparing for the next arena. 
            Fresh match schedules and tournament updates will be revealed shortly.
          </p>
          
          {/* Animated Loading Bar/Indicator */}
          <div className="mt-10 flex justify-center items-center gap-3">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="h-2 w-2 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Decorative Text in background */}
      <div className="absolute bottom-10 left-10 text-[100px] font-bold text-white/[0.02] select-none">
        TITANS
      </div>
    </div>
  );
};

export default NextBattlePlaceholder;