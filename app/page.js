"use client";

// =========================
// 📦 IMPORTS
// =========================
import { useEffect } from "react";
import mapboxgl from "mapbox-gl";

// =========================
// 🔐 MAPBOX TOKEN SETUP
// =========================
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

// =========================
// 🧩 MAIN COMPONENT
// =========================
export default function Home() {

  // =========================
  // ⚙️ SIDE EFFECT (MAP START)
  // =========================
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

    // =========================
    // ⏳ MAP LOADED EVENT
    // =========================
    map.on("load", () => {

      // =========================
      // 🎬 GIF PIN (CUSTOM MARKER)
      // =========================

      // Container
      const el = document.createElement("div");
      el.style.width = "40px";
      el.style.height = "50px";
      el.style.position = "relative";

      // 🔻 Pointer (Spitze)
      const pointer = document.createElement("div");
      pointer.style.width = "0";
      pointer.style.height = "0";
      pointer.style.borderLeft = "10px solid transparent";
      pointer.style.borderRight = "10px solid transparent";
      pointer.style.borderTop = "15px solid white";
      pointer.style.position = "absolute";
      pointer.style.bottom = "0";
      pointer.style.left = "50%";
      pointer.style.transform = "translateX(-50%)";

      // ⬜ Box
      const box = document.createElement("div");
      box.style.width = "40px";
      box.style.height = "40px";
      box.style.background = "white";
      box.style.borderRadius = "12px";
      box.style.display = "flex";
      box.style.alignItems = "center";
      box.style.justifyContent = "center";
      box.style.boxShadow = "0 6px 16px rgba(0,0,0,0.3)";

      // 🎬 Inner GIF
      const inner = document.createElement("div");
      inner.style.width = "30px";
      inner.style.height = "30px";
      inner.style.backgroundImage = "url('/gif.gif')";
      inner.style.backgroundSize = "cover";
      inner.style.borderRadius = "8px";

      // Zusammensetzen
      box.appendChild(inner);
      el.appendChild(box);
      el.appendChild(pointer);

      // 📍 Marker hinzufügen
      new mapboxgl.Marker(el)
        .setLngLat([13.405, 52.52])
        .addTo(map);

      // =========================
      // 🌐 FETCH AI EVENTS
      // =========================
      fetch("/api/events")
        .then(res => res.json())

        // =========================
        // 📥 EVENTS VERARBEITEN
        // =========================
        .then(events => {

          console.log("EVENTS:", events);

          // =========================
          // 🔁 LOOP EVENTS
          // =========================
          events.forEach(event => {

            // =========================
            // 📍 PIN ELEMENT
            // =========================
            const pin = document.createElement("div");
            pin.style.width = "30px";
            pin.style.height = "30px";
            pin.style.borderRadius = "50%";
            pin.style.border = "3px solid white";

            // =========================
            // 🎨 STATUS COLOR LOGIC
            // =========================
            pin.style.background =
              event.status === "LIVE TODAY" ? "red" : "orange";

            // =========================
            // 🌑 SHADOW
            // =========================
            pin.style.boxShadow = "0 0 20px rgba(0,0,0,0.8)";

            // =========================
            // 📌 ADD MARKER TO MAP
            // =========================
            new mapboxgl.Marker(pin)
              .setLngLat([event.lng, event.lat])
              .addTo(map);

          });

        });

    });

  }, []);

  // =========================
  // 🧱 RENDER HTML
  // =========================
  return <div id="map" style={{ width: "100%", height: "100vh" }} />;
}
