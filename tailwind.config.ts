import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyan: {
          400: "#22d3ee",
          500: "#06b6d4",
          900: "#083344",
        },
        neon: "#00ffe7",
        "dark-base": "#030712",
        "dark-card": "#0d1117",
        "dark-border": "#1c2333",
      },
      fontFamily: {
        display: ["'Rajdhani'", "sans-serif"],
        body: ["'Share Tech Mono'", "monospace"],
        mono: ["'Fira Code'", "monospace"],
      },
      animation: {
        "pulse-neon": "pulseNeon 2s ease-in-out infinite",
        scanline: "scanline 3s linear infinite",
        flicker: "flicker 4s linear infinite",
      },
      keyframes: {
        pulseNeon: {
          "0%, 100%": { boxShadow: "0 0 5px #00ffe7, 0 0 20px #00ffe740" },
          "50%": { boxShadow: "0 0 20px #00ffe7, 0 0 60px #00ffe760" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        flicker: {
          "0%, 95%, 100%": { opacity: "1" },
          "96%, 99%": { opacity: "0.4" },
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(0,255,231,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,231,0.03) 1px, transparent 1px)",
        "cyber-gradient":
          "linear-gradient(135deg, #030712 0%, #0d1117 50%, #030712 100%)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
    },
  },
  plugins: [],
};
export default config;
