export async function GET() {

  const sources = [
    {
      name: "The Hat Bar",
      url: "https://thehatbar.de/",
      lat: 52.505,
      lng: 13.3291666
    },
    {
      name: "Schlot Jazzclub",
      url: "https://www.schlot-berlin.de/",
      lat: 52.5302249,
      lng: 13.3852899
    },
    {
      name: "Yorckschlösschen",
      url: "https://www.yorckschloesschen.de/",
      lat: 52.4936409,
      lng: 13.3820966
    },
    {
      name: "A-Trane",
      url: "https://www.a-trane.de/",
      lat: 52.5072391,
      lng: 13.3199577
    },
    {
      name: "Quasimodo",
      url: "https://www.quasimodo.de/",
      lat: 52.5058633,
      lng: 13.3284748
    }
  ];

  const results = [];

  for (const place of sources) {
    try {
      const res = await fetch(place.url);
      const html = await res.text();
      const text = html.toLowerCase();

      const isLive =
        text.includes("live") ||
        text.includes("jazz") ||
        text.includes("concert") ||
        text.includes("music");

      const isToday =
        text.includes("today") ||
        text.includes("heute") ||
        text.includes("tonight");

      if (isLive) {
        results.push({
          name: place.name,
          lat: place.lat,
          lng: place.lng,
          status: isToday ? "LIVE TODAY" : "LIKELY LIVE"
        });
      }

    } catch (e) {
      console.log("Error:", place.name);
    }
  }

  return Response.json(results);
}
