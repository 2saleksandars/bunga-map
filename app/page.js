"use client";
import { useEffect } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Home() {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [13.405, 52.52], // Berlin
      zoom: 12,
    });

    // 🔥 FIX: wartet bis Map wirklich ready ist
    setTimeout(() => {
      console.log("MAP READY");

      new mapboxgl.Marker()
        .setLngLat([13.405, 52.52])
        .addTo(map);

    }, 1000);

  }, []);

  return <div id="map" style={{ width: "100%", height: "100vh" }} />;
}
