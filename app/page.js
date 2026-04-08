"use client";
import { useEffect } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Home() {
  useEffect(() => {

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
      // 🎬 3D SPEECH BUBBLE PIN
      // =========================

      const el = document.createElement("div");
      el.style.width = "50px";
      el.style.height = "60px";
      el.style.position = "relative";

      // Bubble
      const bubble = document.createElement("div");
      bubble.style.width = "50px";
      bubble.style.height = "50px";
      bubble.style.background = "white";
      bubble.style.borderRadius = "18px";
      bubble.style.boxShadow = "0 10px 25px rgba(0,0,0,0.25)";
      bubble.style.display = "flex";
      bubble.style.alignItems = "center";
      bubble.style.justifyContent = "center";
      bubble.style.position = "absolute";
      bubble.style.top = "0";
      bubble.style.border = "1px solid rgba(0,0,0,0.05)";

      // Spitze
      const pointer = document.createElement("div");
      pointer.style.width = "0";
      pointer.style.height = "0";
      pointer.style.borderLeft = "12px solid transparent";
      pointer.style.borderRight = "12px solid transparent";
      pointer.style.borderTop = "18px solid white";
      pointer.style.position = "absolute";
      pointer.style.bottom = "0";
      pointer.style.left = "50%";
      pointer.style.transform = "translateX(-50%)";
      pointer.style.filter = "drop-shadow(0 5px 10px rgba(0,0,0,0.2))";

      // GIF innen
      const inner = document.createElement("div");
      inner.style.width = "34px";
      inner.style.height = "34px";
      inner.style.borderRadius = "10px";
      inner.style.backgroundImage = "url('/gif.gif')";
      inner.style.backgroundSize = "cover";

      bubble.appendChild(inner);
      el.appendChild(bubble);
      el.appendChild(pointer);

      new mapboxgl.Marker({
  element: el,
  anchor: "bottom"
})
.setLngLat([event.lng, event.lat])
.addTo(map);

      // =========================
      // 🔥 AI EVENTS PINS
      // =========================

      fetch("/api/events")
        .then(res => res.json())
        .then(events => {

          console.log("EVENTS:", events);

          events.forEach(event => {

  const el = document.createElement("div");
  el.style.width = "50px";
  el.style.height = "60px";
  el.style.position = "relative";

  // Bubble
  const bubble = document.createElement("div");
  bubble.style.width = "50px";
  bubble.style.height = "50px";
  bubble.style.borderRadius = "18px";
  bubble.style.display = "flex";
  bubble.style.alignItems = "center";
  bubble.style.justifyContent = "center";
  bubble.style.position = "absolute";
  bubble.style.top = "0";

  // 🔥 Farbe nach Status
  if (event.status === "LIVE TODAY") {
    bubble.style.background = "#ff3b30";
    bubble.style.boxShadow = "0 10px 25px rgba(255,0,0,0.5)";
  } else if (event.status === "LIKELY LIVE") {
    bubble.style.background = "#ff9500";
    bubble.style.boxShadow = "0 10px 25px rgba(255,150,0,0.5)";
  } else {
    bubble.style.background = "#cccccc";
    bubble.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";
  }

  // Spitze
  const pointer = document.createElement("div");
  pointer.style.width = "0";
  pointer.style.height = "0";
  pointer.style.borderLeft = "12px solid transparent";
  pointer.style.borderRight = "12px solid transparent";
  pointer.style.borderTop = `18px solid ${bubble.style.background}`;
  pointer.style.position = "absolute";
  pointer.style.bottom = "0";
  pointer.style.left = "50%";
  pointer.style.transform = "translateX(-50%)";

  el.appendChild(bubble);
  el.appendChild(pointer);

  new mapboxgl.Marker(el)
    .setLngLat([event.lng, event.lat])
    .addTo(map);

});

        });

    });

  }, []);

  return <div id="map" style={{ width: "100%", height: "100vh" }} />;
}
