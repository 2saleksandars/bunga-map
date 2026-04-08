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

    setTimeout(() => {

  const el = document.createElement("div");
  el.style.width = "40px";
  el.style.height = "40px";
  el.style.borderRadius = "12px";
  el.style.background = "white";
  el.style.display = "flex";
  el.style.alignItems = "center";
  el.style.justifyContent = "center";
  el.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";

  const inner = document.createElement("div");
  inner.style.width = "30px";
  inner.style.height = "30px";
  inner.style.backgroundImage = "url('/gif.gif')";
  inner.style.backgroundSize = "cover";
  inner.style.borderRadius = "8px";

  el.appendChild(inner);

  new mapboxgl.Marker(el)
    .setLngLat([13.405, 52.52])
    .addTo(map);

}, 1000);

  }, []);

  return <div id="map" style={{ width: "100%", height: "100vh" }} />;
}
