"use client";
import { useEffect } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Home() {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/dark-v11",
      center: [13.405, 52.52], // Berlin
      zoom: 12,
    });

    map.on("load", () => {
      // 🔥 TEST PIN
      new mapboxgl.Marker()
        .setLngLat([13.405, 52.52])
        .addTo(map);
    });

  }, []);

  return <div id="map" style={{ width: "100%", height: "100vh" }} />;
}
