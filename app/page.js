"use client";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

export default function Home() {
  const mapRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [13.405, 52.52],
      zoom: 12,
    });

    return () => map.remove();
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "100vh" }} />;
}
// trigger deploy
