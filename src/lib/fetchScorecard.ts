// src/lib/fetchScorecard.ts
// API returns: { A: team_name, B: score, C: overs, D: batsman_1, E: batsman_2, F: bowler, G: last_over_balls }

export interface ScorecardData {
  teamName:    string;
  score:       string;
  runs:        number;
  wickets:     number;
  overs:       number;
  batsman1:    string;
  batsman2:    string;
  bowler:      string;
  recentBalls: string[];
  crr:         number;
  lastUpdated: Date;
}

export async function fetchScorecardFromSheet(): Promise<ScorecardData> {
  const bust = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const res  = await fetch(`/api/scorecard?t=${bust}`, {
    cache:   "no-store",
    headers: { "Cache-Control": "no-cache" },
  });

  if (!res.ok) {
    let msg = `API error — HTTP ${res.status}`;
    try { const b = await res.json() as { error?: string }; if (b.error) msg = b.error; } catch { /* ignore */ }
    throw new Error(msg);
  }

  const row = await res.json() as Record<string, string>;

  // A=team_name, B=score, C=overs, D=batsman_1, E=batsman_2, F=bowler, G=last_over_balls
  const teamName = String(row["A"] ?? "—").trim();
  const scoreRaw = String(row["B"] ?? "0/0").trim();
  const overs    = parseFloat(String(row["C"] ?? "0")) || 0;
  const batsman1 = String(row["D"] ?? "—").trim();
  const batsman2 = String(row["E"] ?? "—").trim();
  const bowler   = String(row["F"] ?? "—").trim();
  const ballsRaw = String(row["G"] ?? "").trim();

  const [runStr, wktStr] = scoreRaw.replace(/\s/g, "").split("/");
  const runs    = parseInt(runStr  ?? "0", 10) || 0;
  const wickets = parseInt(wktStr ?? "0", 10) || 0;

  const recentBalls = ballsRaw
    .split(",")
    .map((b) => b.trim())
    .filter(Boolean)
    .slice(-6);

  const crr = overs > 0 ? parseFloat((runs / overs).toFixed(2)) : 0;

  return { teamName, score: scoreRaw, runs, wickets, overs, batsman1, batsman2, bowler, recentBalls, crr, lastUpdated: new Date() };
}

export const EMPTY_DATA: ScorecardData = {
  teamName: "—", score: "—", runs: 0, wickets: 0, overs: 0,
  batsman1: "—", batsman2: "—", bowler: "—",
  recentBalls: [], crr: 0, lastUpdated: new Date(0),
};