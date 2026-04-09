// 🟥████████████████████████
// 🟥 API ROUTE: EVENTS
// 🟥████████████████████████
export async function GET() {

  // 🟦~~~~~~~~~~~~~~~~~~~~~~~~~
  // 🟦 DATA SOURCE LIST
  // 🟦~~~~~~~~~~~~~~~~~~~~~~~~~
  const sources = [
    {
      name: "The Hat Bar",
      url: "https://thehatbar.de/",
      lat: 52.505,
      lng: 13.329
    },
    {
      name: "Schlot Jazzclub",
      url: "https://www.schlot-berlin.de/",
      lat: 52.530,
      lng: 13.385
    },
    {
      name: "Yorckschlösschen",
      url: "https://www.yorckschloesschen.de/",
      lat: 52.493,
      lng: 13.382
    },
    {
      name: "A-Trane",
      url: "https://www.a-trane.de/",
      lat: 52.507,
      lng: 13.319
    },
    {
      name: "Quasimodo",
      url: "https://www.quasimodo.de/",
      lat: 52.506,
      lng: 13.328
    },
    {
      name: "Sowieso",
      url: "https://sowieso-berlin.de/",
      lat: 52.483,
      lng: 13.356
    },
    {
      name: "Kulturhaus Insel",
      url: "https://kulturhaus-insel.de/",
      lat: 52.457,
      lng: 13.300
    },
    {
      name: "Fuchs & Elster",
      url: "https://fuchsundelster.de/",
      lat: 52.498,
      lng: 13.422
    },
    {
      name: "Loophole",
      url: "https://loophole-berlin.com/",
      lat: 52.490,
      lng: 13.417
    },
    {
      name: "Bar Tausend",
      url: "https://www.bartausend.de/",
      lat: 52.510,
      lng: 13.388
    },
    {
      name: "Peppi Guggenheim",
      url: "https://peppi-guggenheim.de/",
      lat: 52.524,
      lng: 13.402
    },
    {
      name: "Schokoladen",
      url: "https://schokoladen-mitte.de/",
      lat: 52.526,
      lng: 13.399
    },
    {
      name: "Junction Bar",
      url: "https://junctionbar.de/",
      lat: 52.493,
      lng: 13.388
    },
    {
      name: "Privatclub",
      url: "https://privatclub-berlin.de/",
      lat: 52.500,
      lng: 13.323
    },
    {
      name: "Madame Claude",
      url: "https://madameclaude.de/",
      lat: 52.493,
      lng: 13.423
    },
    {
      name: "Cassiopeia",
      url: "https://cassiopeia-berlin.de/",
      lat: 52.509,
      lng: 13.454
    }
  ];

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
