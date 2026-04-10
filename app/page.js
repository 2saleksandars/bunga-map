"use client";

// 🟥████████████████████████
// 🟥 IMPORTS
// 🟥████████████████████████
import { useEffect } from "react";
import mapboxgl from "mapbox-gl";

// 🟥████████████████████████
// 🟥 CONFIG ❌ NICHT ÄNDERN
// 🟥████████████████████████
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

// 🟥████████████████████████
// 🟥 MAIN COMPONENT
// 🟥████████████████████████
export default function Home() {

  useEffect(() => {

    // 🟥████████████████████████
    // 🟥 MAP INIT ❌ CORE SYSTEM
    // 🟥████████████████████████
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

    // 🟧────────────────────────
    // 🟧 MAP LOAD EVENT ⚠️ LOGIK
    // 🟧────────────────────────
    map.on("load", () => {

      // 🟩:::::::::::::::::::::::::
      // 🟩 MAIN PIN (UI DESIGN)
      // 🟩:::::::::::::::::::::::::
      createMainPin(map);

      // 🟦~~~~~~~~~~~~~~~~~~~~~~~~~
      // 🟦 LOAD DATA (API)
      // 🟦~~~~~~~~~~~~~~~~~~~~~~~~~
      loadEvents(map);

    });

  }, []);

  // 🟥 RENDER ❌ NICHT ÄNDERN
  return <div id="map" style={{ width: "100%", height: "100vh" }} />;
}

// 🟥████████████████████████
// 🟥 FUNCTION: MAIN PIN
// 🟥████████████████████████
function createMainPin(map) {

  // 🟩:::::::::::::::::::::::::
  // 🟩 PIN CONTAINER (DESIGN)
  // 🟩:::::::::::::::::::::::::
  const el = document.createElement("div");
  el.style.width = "40px";
  el.style.height = "50px";
  el.style.position = "relative";

  // 🟩 POINTER
  const pointer = document.createElement("div");

  // 🟩 BOX
  const box = document.createElement("div");

  // 🟩 INNER GIF
  const inner = document.createElement("div");

  // 🟩 ASSEMBLY
  box.appendChild(inner);
  el.appendChild(box);
  el.appendChild(pointer);
}
// 🟥████████████████████████
// 🟥 FUNCTION: LOAD EVENTS
// 🟥████████████████████████
function loadEvents(map) {

  // 🟦~~~~~~~~~~~~~~~~~~~~~~~~~
  // 🟦 FETCH DATA
  // 🟦~~~~~~~~~~~~~~~~~~~~~~~~~
  fetch("/api/events")
    .then(res => res.json())
    .then(events => {

      console.log("EVENTS:", events);

      // 🟧────────────────────────
      // 🟧 LOOP EVENTS ⚠️ LOGIK
      // 🟧────────────────────────
      console.log("SOURCE EVENT:", event);
      events.forEach(event => {

        const isLiveNow = event.status === "LIVE NOW";
        const isToday = event.status === "LIVE TODAY";

        if (!isLiveNow && !isToday) return;

        createEventPin(map, event);

      });

    });
}

// 🟥████████████████████████
// 🟥 FUNCTION: EVENT PIN
// 🟥████████████████████████
function createEventPin(map, event) {
  // 🟩:::::::::::::::::::::::::
  // 🟩 PIN DESIGN ✅ DECLARE FIRST
  // 🟩:::::::::::::::::::::::::
  const pin = document.createElement("div");
  pin.style.cursor = "pointer";
  pin.style.width = "30px";
  pin.style.height = "30px";
  pin.style.borderRadius = "50%";
  pin.style.border = "3px solid white";
  pin.style.boxShadow = "0 0 20px rgba(0,0,0,0.8)";
  pin.style.position = "relative"; // Vital for tooltip positioning

  // 🟧 STATUS LOGIC ⚠️
  if (event.status === "LIVE NOW") {
    pin.style.background = "red";
  } else if (event.status === "LIVE TODAY") {
    pin.style.background = "orange";
  } else {
    return; // ❌ EXIT IF NEITHER
  }

  // 🟩 HOVER LABEL (STABIL)
  pin.addEventListener("mouseenter", () => {
    if (pin.querySelector(".hover-label")) return;

    const tooltip = document.createElement("div");
    tooltip.innerText = event.name;
    tooltip.className = "hover-label";
    
    // Styling the tooltip
    Object.assign(tooltip.style, {
      position: "absolute",
      bottom: "40px",
      left: "50%",
      transform: "translateX(-50%)",
      background: "black",
      color: "white",
      padding: "4px 8px",
      borderRadius: "6px",
      fontSize: "12px",
      whiteSpace: "nowrap",
      pointerEvents: "none", // Prevents flickering
      zIndex: "10"
    });

    pin.appendChild(tooltip);
  });

  pin.addEventListener("mouseleave", () => {
    const label = pin.querySelector(".hover-label");
    if (label) label.remove();
  });

  // 🟥 MAP ADD ❌ NICHT ÄNDERN
  new mapboxgl.Marker(pin)
    .setLngLat([event.lng, event.lat])
    .addTo(map);

  // 🟩:::::::::::::::::::::::::
  // 🟩 CLICK → POPUP
  // 🟩:::::::::::::::::::::::::
  pin.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevents map click events

    const popupHTML = `
    <div style="font-family: sans-serif; min-width:150px; color: black; padding: 5px;">
      <b style="font-size: 14px;">${event.name}</b><br/><br/>
      <a href="https://www.google.com/maps/dir/?api=1&destination=${event.lat},${event.lng}" 
         target="_blank" style="text-decoration: none; color: #007aff;">
        📍 Route
      </a><br/><br/>
      <a href="${event.website || "#"}" 
         target="_blank" style="text-decoration: none; color: #007aff;">
        🌐 Website
      </a>
    </div>
    `;

    new mapboxgl.Popup({ offset: 25 })
      .setLngLat([event.lng, event.lat])
      .setHTML(popupHTML)
      .addTo(map);
  });
}
