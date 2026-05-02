// ─────────────────────────────────────────────────────────────────────────────
// lib/fetchScorecard.ts
//
// Sheet headers (Row 1):
//   team_name | score | overs | batsman_1 | batsman_2 | bowler | last_over_balls
//
// Example Row 2:
//   Cyber Strikers | 45/2 | 6.0 | Rokon (22*) | Tanvir (5) | Fahim | 1,4,0,W,6,2
// ─────────────────────────────────────────────────────────────────────────────

export interface ScorecardData {
  teamName: string;
  score: string;
  runs: number;
  wickets: number;
  overs: number;
  batsman1: string;
  batsman2: string;
  bowler: string;
  recentBalls: string[];
  crr: number;
  lastUpdated: Date;
}

const SHEET_ID   = "1tEYkt6hIZOnRhY855gAqJQXvNw6C49nBkqAGjkBDM0Y";
const SHEET_NAME = "Sheet1";
const CSV_URL    = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(SHEET_NAME)}`;

function parseCSVRow(row: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < row.length; i++) {
    const ch = row[i];
    if (ch === '"') {
      if (inQuotes && row[i + 1] === '"') { current += '"'; i++; }
      else { inQuotes = !inQuotes; }
    } else if (ch === "," && !inQuotes) {
      result.push(current.trim()); current = "";
    } else { current += ch; }
  }
  result.push(current.trim());
  return result;
}

export async function fetchScorecardFromSheet(): Promise<ScorecardData> {
  const res = await fetch(CSV_URL, { cache: "no-store", headers: { "Cache-Control": "no-cache" } });
  if (!res.ok) throw new Error(`Sheet fetch failed — HTTP ${res.status}`);
  const text  = await res.text();
  const lines = text.trim().split("\n").filter((l) => l.trim());
  if (lines.length < 2) throw new Error("Sheet has no data rows yet");

  // Always use the LAST row so you can keep appending without deleting
  const values = parseCSVRow(lines[lines.length - 1]);

  const teamName   = values[0] ?? "Cyber Strikers";
  const scoreRaw   = values[1] ?? "0/0";
  const overs      = parseFloat(values[2] ?? "0") || 0;
  const batsman1   = values[3] ?? "—";
  const batsman2   = values[4] ?? "—";
  const bowler     = values[5] ?? "—";
  const ballsRaw   = values[6] ?? "";

  const [runStr, wktStr] = scoreRaw.replace(/\s/g, "").split("/");
  const runs    = parseInt(runStr  ?? "0", 10) || 0;
  const wickets = parseInt(wktStr ?? "0", 10) || 0;

  const recentBalls = ballsRaw.split(",").map((b) => b.trim()).filter(Boolean).slice(-6);
  const crr = overs > 0 ? parseFloat((runs / overs).toFixed(2)) : 0;

  return { teamName, score: scoreRaw, runs, wickets, overs, batsman1, batsman2, bowler, recentBalls, crr, lastUpdated: new Date() };
}

export const DEMO_DATA: ScorecardData = {
  teamName: "Cyber Strikers", score: "45/2", runs: 45, wickets: 2, overs: 6.0,
  batsman1: "Rokon (22*)", batsman2: "Tanvir (5)", bowler: "Fahim",
  recentBalls: ["1", "4", "0", "W", "6", "2"], crr: 7.5, lastUpdated: new Date(),
};