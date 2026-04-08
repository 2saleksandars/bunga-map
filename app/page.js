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

      // 🔒 Berlin Begrenzung
      maxBounds: [
        [13.0884, 52.3383],
        [13.7611, 52.6755]
      ],

      maxZoom: 15,
      minZoom: 10
    });

    map.on("load", () => {

      // 🎬 GIF PIN
      const el = document.createElement("div");
      el.style.width = "40px";
      el.style.height = "50px";
      el.style.position = "relative";

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

      const box = document.createElement("div");
      box.style.width = "40px";
      box.style.height = "40px";
      box.style.background = "white";
      box.style.borderRadius = "12px";
      box.style.display = "flex";
      box.style.alignItems = "center";
      box.style.justifyContent = "center";
      box.style.boxShadow = "0 6px 16px rgba(0,0,0,0.3)";

      const inner = document.createElement("div");
      inner.style.width = "30px";
      inner.style.height = "30px";
      inner.style.backgroundImage = "url('/gif.gif')";
      inner.style.backgroundSize = "cover";
      inner.style.borderRadius = "8px";

      box.appendChild(inner);
      el.appendChild(box);
      el.appendChild(pointer);

      new mapboxgl.Marker(el)
        .setLngLat([13.405, 52.52])
        .addTo(map);

      // 🔥 AI EVENTS
      fetch("/api/events")
        .then(res => res.json())
        .then(events => {

          console.log("EVENTS:", events);

          events.forEach(event => {

            const pin = document.createElement("div");
            pin.style.width = "30px";
            pin.style.height = "30px";
            pin.style.borderRadius = "50%";
            pin.style.border = "3px solid white";

            pin.style.background =
              event.status === "LIVE TODAY" ? "red" : "orange";

            pin.style.boxShadow = "0 0 20px rgba(0,0,0,0.8)";

            new mapboxgl.Marker(pin)
              .setLngLat([event.lng, event.lat])
              .addTo(map);

          });

        });

    });

  }, []);

  return <div id="map" style={{ width: "100%", height: "100vh" }} />;
}
