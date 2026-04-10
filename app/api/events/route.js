
// 🟥████████████████████████
// 🟥 API ROUTE: EVENTS
// 🟥████████████████████████
import { sources } from "@/lib/sources";

export async function GET() {

  // 🟦~~~~~~~~~~~~~~~~~~~~~~~~~
  // 🟦 RESULTS ARRAY
  // 🟦~~~~~~~~~~~~~~~~~~~~~~~~~
  const results = [];

  // 🟧────────────────────────
  // 🟧 LOOP SOURCES ⚠️ LOGIK
  // 🟧────────────────────────
  for (const place of sources) {

    // 🟩 PUSH DATA
    results.push({
      name: place.name,
      lat: place.lat,
      lng: place.lng,
      status: "LIVE TODAY"
    });

  }

  // 🟩 RESPONSE RETURN
  return Response.json(results);
  }
  

  // 🟦~~~~~~~~~~~~~~~~~~~~~~~~~
  // 🟦 RESULTS ARRAY
  // 🟦~~~~~~~~~~~~~~~~~~~~~~~~~
  const results = [];

  // 🟧────────────────────────
  // 🟧 LOOP SOURCES ⚠️ LOGIK
  // 🟧────────────────────────
  for (const place of sources) {
    try {

      // 🟦 FETCH WEBSITE
      const res = await fetch(place.url);
      const html = await res.text();
      const text = html.toLowerCase();

      // 🟧 DEBUG HIER 👇
      console.log("PLACE:", place.name);
      console.log("TEXT PREVIEW:", text.slice(0, 200));

      // 🟧 TEXT ANALYSIS ⚠️
      const isLive =
        text.includes("live") ||
        text.includes("jazz") ||
        text.includes("concert") ||
        text.includes("music");

      // 🟧────────────────────────
      // 🟧 ZEIT ANALYSE
      // 🟧────────────────────────

      // 👉 aktuelle Zeit
      const now = new Date();
      const currentHour = now.getHours();

      // 👉 einfache Zeit-Erkennung aus Text
      let eventHour = null;

      // Beispiele: "20:00", "8pm", "21h"
      const timeMatch =
        text.match(/(\d{1,2}):(\d{2})/) ||
        text.match(/(\d{1,2})\s?(pm|am)/) ||
        text.match(/(\d{1,2})h/);

      if (timeMatch) {
        eventHour = parseInt(timeMatch[1]);

        // pm → +12
        if (timeMatch[2] === "pm" && eventHour < 12) {
          eventHour += 12;
        }
      }

      // 👉 HEUTE check (wie vorher)
      const isToday =
        text.includes("today") ||
        text.includes("heute") ||
        text.includes("tonight");

      // 👉 LIVE NOW (Zeitfenster ±2h)
      let isLiveNow = false;

      if (eventHour !== null) {
        if (Math.abs(currentHour - eventHour) <= 2) {
          isLiveNow = true;
        }
      }

      // 🟧 STATUS DECISION ⚠️
      if (isLive) {
        results.push({
          name: place.name,
          lat: place.lat,
          lng: place.lng,
          status: isLiveNow
            ? "LIVE NOW"
            : isToday
              ? "LIVE TODAY"
              : "LIKELY LIVE"
        });
      }

    } catch (e) {

      console.log("Skipped:", place.name);

      // 🟩:::::::::::::::::::::::::
      // 🟩 FALLBACK (ALWAYS SHOW)
      // 🟩:::::::::::::::::::::::::
      results.push({
        name: place.name,
        lat: place.lat,
        lng: place.lng,
        status: "UNKNOWN"
      });
    }
  }

  // 🟥 RESPONSE ❌ NICHT ÄNDERN
  return Response.json(results);
}
