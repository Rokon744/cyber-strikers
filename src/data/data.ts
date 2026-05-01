import teamAlogo from "../app/assets/cyber-strikers.jpg"
import teamBlogo from "../app/assets/7_1_Warriors.jpg"
import teamPhoto from "../app/assets/team-photo.png"
import q1vs from "../app/assets/q1vs.png"
import targetq from "../app/assets/targetq.png"
import jersey from "../app/assets/jersey.png"
import trophys1 from "../app/assets/trophys1.png"
import best_batsman from "../app/assets/best-batsman.png"
import best_bowler from "../app/assets/best-bowler.png"
import captain from "../app/assets/captain.png"

// Squad
import juba from "../app/assets/squad/juba.png"
import shimir from "../app/assets/squad/shimir.png"
import siam from "../app/assets/squad/siam.png"
import sajid from "../app/assets/squad/sajid.png"
import nasim from "../app/assets/squad/nasim.png"
import tareq from "../app/assets/squad/tareq.png"
import sobuj from "../app/assets/squad/sobuj.png"
import nobel from "../app/assets/squad/nobel.png"
import niloy from "../app/assets/squad/niloy.png"
import maruf from "../app/assets/squad/maruf.png"

export const teamInfo = {
  name: "Cyber Strikers",
  tagline: "Dominate. Disrupt. Destroy.",
  founded: "2025",
  captain: "Md Rokon",
  homeGround: "Rajshahi",
  wins: 4,
  losses: 1,
  trophies: 1,
};

export const upcomingMatch = {
  teamA: "Cyber Strikers - CST/5/2",
  teamAlogo:teamAlogo,
  teamB: "7/1 Warriors - CST/7/1",
  teamBlogo:teamBlogo,
  date: "2026-05-02T10:00:00",
  venue: "RPI CENTRAL FIELD, RAJSHAHI",
  tournament: "Tech Titans Trophy 2026 S-2",
  round: "quarter-final",
};

export const players = [
  {
    id: 1,
    name: "Md Rokon",
    role: "Batsman",
    jersey: 10,
    avatar: captain,
    stats: { runs: 397, average: 33.33, strikeRate: 130, skillLevel: 95, uglyMeter: 12 },
    matches: 16,
    isCaptain: true,
  },
  {
    id: 2,
    name: "Jubayer Ahmed",
    role: "Bowler",
    jersey: 11,
    avatar: juba,
    stats: { wickets: 31, economy: 6.2, average: 18.4, strikeRate: 0, skillLevel: 92, uglyMeter: 67 },
    matches: 22,
    isCaptain: false,
  },
  {
    id: 3,
    name: "Taohid",
    role: "Batsman",
    jersey: 17,
    avatar: best_batsman,
    stats: { runs: 512, average: 41.0, strikeRate: 138, skillLevel: 81, uglyMeter: 22 },
    matches: 20,
    isCaptain: false,
  },
  {
    id: 4,
    name: "Tanjit",
    role: "Bowler",
    jersey: 9,
    avatar: best_bowler,
    stats: { wickets: 24, economy: 7.1, average: 21.3, strikeRate: 0, skillLevel: 85, uglyMeter: 41 },
    matches: 19,
    isCaptain: false,
  },
  {
    id: 5,
    name: "Shimir",
    role: "Batsman",
    jersey: 17,
    avatar: shimir,
    stats: { runs: 400, average: 35.0, strikeRate: 138, skillLevel: 81, uglyMeter: 22 },
    matches: 20,
    isCaptain: false,
  },
  {
    id: 6,
    name: "Al Siyam",
    role: "Bowler",
    jersey: 5,
    avatar: siam,
    stats: { wickets: 13, economy: 6.8, average: 23.1, strikeRate: 0, skillLevel: 71, uglyMeter: 88 },
    matches: 17,
    isCaptain: false,
  },
  {
    id: 7,
    name: "Sajid",
    role: "Wicket-Keeper",
    jersey: 5,
    avatar: sajid,
    stats:  { runs: 400, average: 35.0, strikeRate: 138, skillLevel: 81, uglyMeter: 22 },
    matches: 17,
    isCaptain: false,
  },
  {
    id: 8,
    name: "Nasim",
    role: "Bowler",
    jersey: 5,
    avatar: nasim,
    stats: { wickets: 13, economy: 6.8, average: 23.1, strikeRate: 0, skillLevel: 71, uglyMeter: 88 },
    matches: 17,
    isCaptain: false,
  },
  {
    id: 9,
    name: "Tareq",
    role: "Batsman",
    jersey: 17,
    avatar: tareq,
    stats: { runs: 150, average: 41.0, strikeRate: 75, skillLevel: 81, uglyMeter: 22 },
    matches: 20,
    isCaptain: false,
  },
  {
    id: 10,
    name: "Sobuj",
    role: "Batsman",
    jersey: 17,
    avatar: sobuj,
    stats: { runs: 250, average: 61.0, strikeRate: 98, skillLevel: 81, uglyMeter: 22 },
    matches: 20,
    isCaptain: false,
  },
  {
    id: 11,
    name: "Nobel",
    role: "Batsman",
    jersey: 17,
    avatar: nobel,
    stats: { runs: 210, average: 50.0, strikeRate: 98, skillLevel: 91, uglyMeter: 22 },
    matches: 20,
    isCaptain: false,
  },
  {
    id: 12,
    name: "Niloy",
    role: "Batsman",
    jersey: 17,
    avatar: niloy,
    stats: { runs: 160, average: 30.0, strikeRate: 98, skillLevel: 91, uglyMeter: 22 },
    matches: 20,
    isCaptain: false,
  },
  {
    id: 13,
    name: "Maruf",
    role: "Batsman",
    jersey: 17,
    avatar: maruf,
    stats: { runs: 130, average: 30.0, strikeRate: 98, skillLevel: 91, uglyMeter: 22 },
    matches: 10,
    isCaptain: false,
  },
];

export const tournament = {
  name: "Cyber Cup 2025",
  quarterFinals: [
    {
      id: "qf1",
      teamA: "Disaster Strykers - CST/3/1",
      teamB: "Binary Titans - CST/7/2",
      date: "May 2, 2026",
      time: "08:00 AM",
      venue: "RPI CENTRAL FIELD",
      winner: null,
      scoreA: null,
      scoreB: null,
    },
    {
      id: "qf2",
      teamA: "Cyber Strikers - CST/5/2",
      teamB: "7/1 Warriors - CST/7/1",
      date: "May 2, 2026",
      time: "10:00 AM",
      venue: "RPI CENTRAL FIELD",
      winner: null,
      scoreA: null,
      scoreB: null,
    },
    {
      id: "qf3",
      teamA: "Cyber Warriors - CST/2/2",
      teamB: "Silicon Superstars - CST/3/2",
      date: "May 2, 2026",
      time: "03:00 PM",
      venue: "RPI CENTRAL FIELD",
      winner: null,
      scoreA: null,
      scoreB: null,
    },
    {
      id: "qf4",
      teamA: "Teachers Group",
      teamB: "TBD",
      date: "Auto",
      time: "00:00 PM",
      venue: "RPI CENTRAL FIELD",
      winner: null,
      scoreA: null,
      scoreB: null,
    },
  ],
  semiFinals: [
    {
      id: "sf1",
      teamA: "TBD",
      teamB: "TBD",
      date: "3 May, 2026",
      time: "08:00 AM",
      venue: "RPI CENTRAL FIELD",
      winner: null,
      scoreA: null,
      scoreB: null,
    },
    {
      id: "sf2",
      teamA: "Teachers Group",
      teamB: "TBD",
      date: "3 May, 2026",
      time: "10:00 AM",
      venue: "RPI CENTRAL FIELD",
      winner: null,
      scoreA: null,
      scoreB: null,
    },
  ],
  final: {
    id: "final",
    teamA: "TBD",
    teamB: "TBD",
    date: "3 May, 2026",
    time: "4:00 PM",
    venue: "RPI CENTRAL FIELD",
    winner: null,
    scoreA: null,
    scoreB: null,
  },
};

export const liveScore = {
  match: "Cyber Strikers vs Thunder Bolts",
  tournament: "Cyber Cup 2025 - Quarter Final",
  status: "LIVE",
  innings: 1,
  batting: "Cyber Strikers",
  bowling: "Thunder Bolts",
  score: { runs: 134, wickets: 3, overs: 14.2 },
  target: null,
  crr: 9.24,
  rrr: null,
  batsmen: [
    { name: "Rokon", runs: 67, balls: 43, fours: 7, sixes: 3, strikeRate: 155.8, onStrike: true },
    { name: "Tanvir", runs: 28, balls: 22, fours: 3, sixes: 1, strikeRate: 127.3, onStrike: false },
  ],
  bowler: { name: "Arif Khan", overs: 3.2, maidens: 0, runs: 28, wickets: 1, economy: 8.4 },
  recentBalls: ["1", "4", "W", "2", "6", "1"],
  fallOfWickets: [
    { wicket: 1, score: 23, over: "3.4", batsman: "Sabbir" },
    { wicket: 2, score: 78, over: "9.1", batsman: "Fahim" },
    { wicket: 3, score: 101, over: "12.3", batsman: "Nayeem" },
  ],
};


export const newsItems = [
  {
    id: 1,
    title: "Cyber Strikers Target Quarter-Final!",
    date: "2026-05-02",
    description:
      `দারুণ ছন্দে থাকা Cyber Strikers এবার চোখ রাখছে Quarter-Final-এর দিকে। টিমের প্রতিটি প্লেয়ার আত্মবিশ্বাসে ভরপুর, আর তাদের লক্ষ্য একটাই — জয়! 💪 ব্যাটিং, বোলিং আর ফিল্ডিং—সব দিক থেকেই নিজেদের সেরা পারফরম্যান্স দিতে প্রস্তুত তারা। প্রতিটি ম্যাচে উন্নতি করে Cyber Strikers প্রমাণ করছে তারা কতটা ডেঞ্জারাস টিম।`,
    image: q1vs,
    category: "Target Match",
  },
  {
    id: 2,
    title: "Cyber Strikers – United We Rise!",
    date: "2025-05-25",
    description:
      `একসাথে আমরা শুধু একটা টিম না, আমরা একটা পরিবার। 💙
      Cyber Strikers-এর প্রতিটি সদস্য নিজেদের সেরাটা দিয়ে তৈরি করেছে এই শক্তিশালী ইউনিট। মাঠে আমাদের লক্ষ্য একটাই—জয়,  কিন্তু তার থেকেও বড় আমাদের ঐক্য, পরিশ্রম আর বিশ্বাস। এই টিমের প্রতিটি মুখের পেছনে আছে কঠোর পরিশ্রম, স্বপ্ন আর জেতার অদম্য ইচ্ছা। Cyber Strikers শুধু খেলতে নামে না, তারা মাঠে নামে নিজেদের প্রমাণ করতে! 🔥`,
    image: teamPhoto,
    category: "Training",
  },
  {
    id: 3,
    title: "Quarter-Final-এর প্রস্তুতি শুরু",
    date: "2025-05-15",
    description:
      "Quarter-Final সামনে রেখে Cyber Strikers শুরু করেছে জোর প্রস্তুতি। 💪 প্রতিদিনের প্র্যাকটিস আর টিমওয়ার্কেই তৈরি হচ্ছে জয়ের পথ! 🔥🏏",
    image: targetq,
    category: "Training",
  },
  {
    id: 4,
    title: "নতুন জার্সি উন্মোচন — Season 2025",
    date: "2025-05-01",
    description:
      "Cyber Strikers-এর নতুন Season 2025 জার্সি আনুষ্ঠানিকভাবে উন্মোচন করা হয়েছে। White and Sky Blue রঙের এই জার্সি টিমের 'Cyber' থিমকে আরও শক্তিশালী করেছে।",
    image: jersey,
    category: "Announcement",
  },
  {
    id: 5,
    title: "Season 1-এর Best Batsman Taohid! 🏏",
    date: "2025-05-01",
    description:
      "পুরো টুর্নামেন্ট জুড়ে তার অসাধারণ ব্যাটিং পারফরম্যান্স দলকে বারবার এনে দিয়েছে শক্ত ভিত। ধারাবাহিক রান, আত্মবিশ্বাসী শট আর চাপের মুহূর্তে দারুণ ইনিংস খেলে তিনি হয়ে উঠেছেন দলের সবচেয়ে ভরসার নাম। 💪 Taohid শুধু রানই করেননি, তিনি ম্যাচের গতি বদলে দিয়েছেন নিজের ব্যাট দিয়েই! 🚀",
    image: best_batsman,
    category: "Best Batsman",
  },
  {
    id: 6,
    title: "Season 1-এর Best Bowler Tanjit! 🏏",
    date: "2025-05-01",
    description:
      "দারুণ লাইন-লেন্থ আর ধারাবাহিক বোলিংয়ে প্রতিপক্ষ ব্যাটসম্যানদের জন্য হয়ে উঠেছিলেন এক দুঃস্বপ্ন। গুরুত্বপূর্ণ সময়ে উইকেট তুলে নিয়ে ম্যাচের মোড় ঘুরিয়ে দিয়েছেন বারবার। 💪🎯",
    image: best_bowler,
    category: "Best Bowler",
  },
  {
    id: 7,
    title: "Best Captain — Season 1 🏆🔥",
    date: "2025-05-01",
    description:
      "Season 1-এর Best Captain — নেতৃত্বে যিনি সবসময় এক ধাপ এগিয়ে! 💪🏏 সঠিক সিদ্ধান্ত, ঠান্ডা মাথা আর দুর্দান্ত টিম ম্যানেজমেন্ট দিয়ে পুরো টুর্নামেন্টে দলকে এগিয়ে নিয়েছেন সাফল্যের পথে। চাপের মুহূর্তেও তিনি ছিলেন দৃঢ়, দলকে দিয়েছেন আত্মবিশ্বাস আর জয়ের অনুপ্রেরণা। তার নেতৃত্বেই টিম পেয়েছে শক্ত ভিত আর জয়ের ধারাবাহিকতা! 🚀",
    image: captain,
    category: "Captain",
  }
];
 
export const galleryItems = [
  {
    id: 1,
    image: q1vs,
    caption: "Target Quarter-Final",
    date: "2026-05-02",
  },
  {
    id: 2,
    image: teamPhoto,
    caption: "Starting Practice",
    date: "2026-04-30",
  },
  {
    id: 3,
    image: jersey,
    caption: "New Jersey",
    date: "2025-11-28",
  },
  {
    id: 4,
    image: trophys1,
    caption: "Season 1 Runner-Up",
    date: "2025-11-28",
  }
];