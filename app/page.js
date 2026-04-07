"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

export default function Home() {
  const mapRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/navigation-night-v1",
      center: [13.405, 52.52],
      zoom: 12,
    });

    // 👉 WICHTIG: erst nach Laden!
    map.on("load", () => {

      const events = [
        { name: "Techno Night", coords: [13.41, 52.52], genre: "Techno" }
      ];

      events.forEach((event) => {
        const el = document.createElement("div");
        el.className = "custom-marker";

        const inner = document.createElement("div");
        inner.className = "marker-inner";
        inner.style.backgroundImage = "url('/gif.gif')";

        el.appendChild(inner);

        new mapboxgl.Marker(el)
          .setLngLat(event.coords)
          .addTo(map);
      });

    });

    return () => map.remove();
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "100vh" }} />;
}
