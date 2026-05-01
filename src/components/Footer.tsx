import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-dark-border pt-10 pb-6 px-4 sm:px-6 relative overflow-hidden">
      {/* Top neon line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon/30 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Main footer row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <div className="w-6 h-6 border border-neon/50 rotate-45 flex items-center justify-center">
                <span className="-rotate-45 text-neon font-display font-bold text-[10px]">
                  CS
                </span>
              </div>
              <span className="font-display font-bold text-lg text-white tracking-widest">
                CYBER<span className="text-neon">STRIKERS</span>
              </span>
            </div>
            <p className="text-xs text-slate-700 font-body tracking-[0.3em]">
              DOMINATE · DISRUPT · DESTROY
            </p>
          </div>

          {/* Creator info */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-[10px] text-slate-300 tracking-[0.1em] font-body">
              DESIGNED & DEVELOPED BY
            </p>
            <p className="font-display font-bold text-white text-lg tracking-widest">
              Md Rokon
            </p>
            <div className="flex items-center gap-4">
              {/* Website */}
              <a
                href="https://dev-rokon.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-neon transition-colors duration-200 font-body group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
                <span className="group-hover:underline underline-offset-2">
                  Website
                </span>
              </a>

              <div className="w-px h-3 bg-dark-border" />

              {/* Facebook */}
              <a
                href="https://www.facebook.com/DevRokon"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-400 transition-colors duration-200 font-body group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <span className="group-hover:underline underline-offset-2">
                  Facebook
                </span>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-[10px] text-slate-600 tracking-[0.3em] font-body mb-1">
              QUICK LINKS
            </p>
            {[
              { label: "Squad", href: "/squad" },
              { label: "Fixtures", href: "/fixtures" },
              { label: "Live Score", href: "/live-score" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-xs text-slate-500 hover:text-neon transition-colors duration-200 font-body tracking-widest hover:translate-x-1 transform transition-transform"
              >
                → {label.toUpperCase()}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-dark-border pt-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-display text-slate-700 text-xs tracking-widest">
            © 2025 CYBER STRIKERS. ALL RIGHTS RESERVED.
          </p>
          <p className="text-[10px] text-slate-800 font-body tracking-wider">
            BUILT WITH NEXT.JS · TAILWIND · FRAMER MOTION
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
