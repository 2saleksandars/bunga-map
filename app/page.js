"use client";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

export default function Home() {
  const mapRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
  container: mapRef.current,

  style: "mapbox://styles/mapbox/streets-v12", // 🎨 Farbe

  center: [13.405, 52.52],
  zoom: 12,

  maxBounds: [
    [13.0884, 52.3383],
    [13.7612, 52.6755]
  ],

  minZoom: 10,
  maxZoom: 16
});

    return () => map.remove();
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "100vh" }} />;
}
// trigger deploy
