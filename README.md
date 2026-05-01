# 🏏 Cyber Strikers — Cricket Tournament Website

> **Dominate. Disrupt. Destroy.**

A dark-themed, gaming-dashboard-style cricket tournament website built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

---

## 🗂 Folder Structure

```
cyber-strikers/
├── public/                        # Static assets (add player images here)
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout (Navbar + global styles)
│   │   ├── globals.css            # Global CSS, neon effects, scrollbar, animations
│   │   ├── page.tsx               # 🏠 Home Page
│   │   ├── squad/
│   │   │   └── page.tsx           # 👥 Squad Page
│   │   ├── fixtures/
│   │   │   └── page.tsx           # 📅 Fixtures / Knockout Bracket
│   │   └── live-score/
│   │       └── page.tsx           # 📡 Live Score (Mock)
│   ├── components/
│   │   ├── Navbar.tsx             # Navigation bar with active link indicator
│   │   └── Countdown.tsx          # Live countdown timer to next match
│   └── data/
│       └── data.ts                # 📊 All static data (players, fixtures, live score)
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
└── package.json
```

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production

```bash
npm run build
npm start
```

---

## 📄 Pages

| Route         | Page          | Description                                                   |
|---------------|---------------|---------------------------------------------------------------|
| `/`           | Home          | Hero, VS banner, countdown timer, team stats, about section  |
| `/squad`      | Squad         | Player cards with roles, stats, Ugly Meter, skill bars       |
| `/fixtures`   | Fixtures      | 8-team knockout bracket: QF → SF → Final                     |
| `/live-score` | Live Score    | Mock scoreboard: runs, wickets, overs, batsmen, bowler, FoW  |

---

## 🎨 Design System

### Color Palette

| Token         | Value       | Usage                        |
|---------------|-------------|------------------------------|
| `--neon`      | `#00ffe7`   | Primary accent, glows        |
| `dark-base`   | `#030712`   | Page background              |
| `dark-card`   | `#0d1117`   | Card backgrounds             |
| `dark-border` | `#1c2333`   | Borders, dividers            |
| Slate         | `#94a3b8`   | Secondary text               |

### Fonts (Google Fonts)

- **Rajdhani** — Display / headings (bold, wide tracking)
- **Share Tech Mono** — Body text (monospace, cyberpunk feel)
- **Fira Code** — Code-style numbers and stats

### Key CSS Utilities

```css
.neon-text      /* Cyan glow text shadow */
.neon-border    /* Cyan glow border */
.bg-grid        /* Subtle grid pattern overlay */
.clip-card      /* Angled corner clip-path */
.stat-bar       /* Animated progress bar */
.scanlines      /* CRT-style scanline overlay */
```

---

## 📊 Data Structure (`src/data/data.ts`)

### `teamInfo`
General team metadata: name, captain, wins, losses, trophies.

### `upcomingMatch`
Next match details for the VS banner and countdown timer.

### `players[]`
Array of player objects:
```ts
{
  id, name, role, jersey, avatar,
  stats: { runs?, wickets?, average, strikeRate?, economy?, skillLevel, uglyMeter },
  matches, isCaptain
}
```

### `tournament`
Full knockout bracket with `quarterFinals[]`, `semiFinals[]`, and `final`.
Each match has: `teamA`, `teamB`, `date`, `time`, `venue`, `winner`, `scoreA`, `scoreB`.

### `liveScore`
Mock live scoreboard with batsmen, bowler, recent balls, and fall of wickets.

---

## 🧩 Key Components

### `<Navbar />`
- Fixed top nav with scroll-aware blur backdrop
- Active route underline with Framer Motion `layoutId`
- Mobile hamburger menu with animated drawer
- Live Score shows a red pulse dot

### `<Countdown targetDate />`
- Real-time countdown to the next match
- Updates every second using `setInterval`
- Displays DAYS : HRS : MIN : SEC

---

## ⚡ Tech Stack

| Technology      | Version  | Purpose                       |
|-----------------|----------|-------------------------------|
| Next.js         | 14.2.3   | App Router, SSR/SSG           |
| TypeScript      | ^5       | Type safety                   |
| Tailwind CSS    | ^3.4     | Utility-first styling         |
| Framer Motion   | ^11      | Animations & transitions      |
| Lucide React    | ^0.376   | Icon library                  |

---

## 🔧 Customization Tips

1. **Add real player photos**: Place images in `/public/players/` and update `avatar` in `data.ts`
2. **Update match data**: Edit `upcomingMatch` and `tournament` in `data.ts`
3. **Mock live ticker**: Add a `useEffect` interval in `live-score/page.tsx` to simulate score updates
4. **Connect a backend**: Replace `data.ts` imports with `fetch()` calls to your API

---

## 📦 Production Deployment

This is a fully static-compatible Next.js app. Deploy to:
- **Vercel** (recommended): `vercel deploy`
- **Netlify**: Connect repo, set build command `npm run build`, publish dir `.next`
- **GitHub Pages**: Use `next export` with static export config
