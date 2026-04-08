"use client";
import { useEffect } from "react";
import mapboxgl from "mapbox-gl";

// =========================
// 🔐 MAPBOX CONFIG
// =========================
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Home() {

  useEffect(() => {

    // =========================
    // 🗺️ MAP INITIALIZATION
    // =========================
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [13.405, 52.52],
      zoom: 11,
      maxBounds: [
        [13.0884, 52.3383],
        [13.7611, 52.6755]
      ],
      maxZoom: 15,
      minZoom: 10
    });

    map.on("load", () => {

      // =========================
      // 🎬 MAIN GIF PIN
      // =========================

      const el = document.createElement("div");
      // styling...

      new mapboxgl.Marker({
        element: el,
        anchor: "bottom"
      })
      .setLngLat([13.405, 52.52])
      .addTo(map);

      // =========================
      // 🌐 FETCH EVENTS (API)
      // =========================

      fetch("/api/events")
        .then(res => res.json())
        .then(events => {

          console.log("EVENTS:", events);

          // =========================
          // 🔁 LOOP THROUGH EVENTS
          // =========================

          events.forEach(event => {

            // =========================
            // 📍 CREATE PIN ELEMENT
            // =========================

            const pin = document.createElement("div");

            // =========================
            // 🎨 STYLE BY STATUS
            // =========================

            if (event.status === "LIVE TODAY") {
              pin.style.background = "red";
            } else if (event.status === "LIKELY LIVE") {
              pin.style.background = "orange";
            } else {
              pin.style.background = "gray";
            }

            // =========================
            // 📌 ADD MARKER TO MAP
            // =========================

            new mapboxgl.Marker({
              element: pin,
              anchor: "bottom"
            })
            .setLngLat([event.lng, event.lat])
            .addTo(map);

          });

        });

    });

  }, []);

  return <div id="map" style={{ width: "100%", height: "100vh" }} />;
}
