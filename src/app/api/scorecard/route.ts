import { NextResponse } from "next/server";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzYNTk7NPnwy5RfjQ44GbU6equnAX0aRmpKdE1hzq_N6vEBqXXJ07axyUxxjmu4Gfc/exec";

export async function GET() {
  const bust = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const url  = `${APPS_SCRIPT_URL}?t=${bust}`;

  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma":        "no-cache",
      },
    });

    if (!res.ok) throw new Error(`Apps Script returned HTTP ${res.status}`);

    const json = await res.json();

    return NextResponse.json(json, {
      status: 200,
      headers: {
        "Cache-Control":           "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma":                  "no-cache",
        "Expires":                 "0",
        "CDN-Cache-Control":       "no-store",
        "Vercel-CDN-Cache-Control":"no-store",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Fetch failed" },
      { status: 500 }
    );
  }
}

export const dynamic    = "force-dynamic";
export const fetchCache = "force-no-store";