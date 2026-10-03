"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ScreenHeader from "../ScreenHeader";
import { ChevronDown, LocateIcon, BellIcon, ClocheIcon, CoachIcon, PhoneIcon } from "../icons";
import { LIVE_COORDS, LIVE_PROGRESS, ROUTE_STOPS } from "@/lib/data";
import { useApp } from "@/lib/store";

/* Load Leaflet from CDN (kept out of the bundle) */
declare global {
  interface Window {
    L?: any;
  }
}

function useLeaflet(mapRef: React.RefObject<HTMLDivElement | null>, ready: boolean) {
  const LRef = useRef<any>(null);
  const mapObj = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;
    const load = () =>
      new Promise<void>((resolve, reject) => {
        if (window.L) return resolve();
        const css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(css);
        const js = document.createElement("script");
        js.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        js.onload = () => resolve();
        js.onerror = reject;
        document.head.appendChild(js);
      });

    if (!ready) return;
    load()
      .then(() => {
        if (cancelled || !window.L || !mapRef.current) return;
        const L = window.L;
        LRef.current = L;

        const map = L.map(mapRef.current, {
          zoomControl: false,
          attributionControl: true,
          dragging: true,
        }).setView(interpolate(LIVE_COORDS, LIVE_PROGRESS), 6);

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 18,
          attribution: "© OpenStreetMap",
        }).addTo(map);

        // route line
        L.polyline(LIVE_COORDS, { color: "#02026f", weight: 4, opacity: 0.85, lineJoin: "round" }).addTo(map);

        // station dots
        LIVE_COORDS.forEach((c, i) => {
          L.circleMarker(c, {
            radius: i === 0 || i === LIVE_COORDS.length - 1 ? 6 : 4,
            color: "#ffffff",
            weight: 2,
            fillColor: i === 0 || i === LIVE_COORDS.length - 1 ? "#02026f" : "#02026f",
            fillOpacity: 1,
          }).addTo(map);
        });

        // live train marker
        const pos = interpolate(LIVE_COORDS, LIVE_PROGRESS);
        const icon = L.divIcon({
          className: "",
          html: `<div style="width:38px;height:38px;border-radius:50%;background:#fb534a;border:3px solid #fff;box-shadow:0 6px 16px rgba(251,83,74,.45);display:flex;align-items:center;justify-content:center;">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff"><path d="M12 2 5 8v10h14V8l-7-6Zm0 6.6 3.6 1.8v2.2L12 14.2l-3.6-1.6v-2.2L12 8.6Z"/></svg>
          </div>`,
          iconSize: [38, 38],
          iconAnchor: [19, 19],
        });
        L.marker(pos, { icon }).addTo(map);

        mapObj.current = map;
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
      if (mapObj.current) {
        mapObj.current.remove();
        mapObj.current = null;
      }
    };
  }, [ready, mapRef]);

  return { mapObj, LRef };
}

function interpolate(coords: [number, number][], t: number): [number, number] {
  const seg = Math.min(Math.floor(t * (coords.length - 1)), coords.length - 2);
  const local = t * (coords.length - 1) - seg;
  const [x1, y1] = coords[seg];
  const [x2, y2] = coords[seg + 1];
  return [x1 + (x2 - x1) * local, y1 + (y2 - y1) * local];
}

export default function LiveMap() {
  const pop = useApp((s) => s.pop);
  const push = useApp((s) => s.push);
  const [ready, setReady] = useState(false);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const { mapObj } = useLeaflet(mapRef, ready);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 350); // wait for enter transition
    return () => clearTimeout(t);
  }, []);

  const done = ROUTE_STOPS[Math.max(0, Math.floor(LIVE_PROGRESS * (ROUTE_STOPS.length - 1)))];

  return (
    <div className="relative flex h-full flex-col bg-white">
      <div className="shrink-0 bg-white">
        <ScreenHeader
          title="Live Map · 12952"
          onBack={pop}
          right={
            <button aria-label="Refresh" className="flex h-9 w-9 items-center justify-center rounded-full text-ir-text active:bg-black/5">
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 11.5a8 8 0 1 0-1.7 6" />
                <path d="M20 5v6h-6" transform="translate(0 -1)" />
              </svg>
            </button>
          }
        />
      </div>

      {/* real map */}
      <div className="relative flex-1 overflow-hidden">
        <div ref={mapRef} className="h-full w-full" />
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#e8eef4]">
            <span className="text-[13px] font-semibold text-[#8c8d93]">Loading live map…</span>
          </div>
        )}

        {/* locate FAB */}
        <button
          aria-label="My location"
          onClick={() => mapObj.current?.setView(interpolate(LIVE_COORDS, LIVE_PROGRESS), 7, { animate: true })}
          className="absolute right-4 top-4 z-10 flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white/90 text-ir-text shadow-[0_2px_10px_rgba(0,0,0,0.12)] backdrop-blur active:bg-white"
        >
          <LocateIcon className="h-[17px] w-[17px]" />
        </button>
      </div>

      {/* bottom sheet */}
      <AnimatePresence>
        <motion.div
          initial={{ y: 60 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 32 }}
          className="relative z-20 shrink-0 rounded-t-[26px] bg-white px-5 pb-3 pt-2 shadow-[0_-10px_30px_rgba(12,13,20,0.10)]"
        >
          <div className="mx-auto h-[4px] w-[44px] rounded-full bg-[#dcdbde]" />

          <div className="mt-[10px] flex items-center gap-[8px]">
            <button className="flex items-center gap-[6px] rounded-[10px] border border-ir-border bg-white px-[12px] py-[7px] text-[12px] font-semibold text-ir-text">
              21 May, 26
              <ChevronDown className="h-[13px] w-[13px] text-[#6d6f76]" />
            </button>
            <span className="rounded-[10px] bg-ir-chip-red px-[12px] py-[7px] text-[12px] font-bold text-ir-red">
              Delay: 10 mins
            </span>
          </div>

          {/* progress */}
          <div className="mt-[12px] flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between text-[11px] font-bold text-ir-text">
                <span>NDLS</span>
                <span>BCT</span>
              </div>
              <div className="relative mt-[9px] h-[5px] rounded-full bg-[#e6e7ea]">
                <div className="absolute inset-y-0 left-0 rounded-full bg-ir-navy" style={{ width: `${LIVE_PROGRESS * 100}%` }} />
                <span
                  className="absolute -top-[6.5px] flex h-[18px] w-[18px] -translate-x-1/2 items-center justify-center rounded-full border-[3px] border-white bg-ir-navy shadow"
                  style={{ left: `${LIVE_PROGRESS * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* station preview */}
          <div className="mt-[12px] flex items-center gap-3 rounded-[16px] bg-ir-lav px-4 py-[10px]">
            <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white text-ir-navy">
              <svg viewBox="0 0 24 24" className="h-[16px] w-[16px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 20.5 20 4M4 4h7v7" transform="rotate(90 12 12)" />
                <circle cx="12" cy="12" r="9.2" />
              </svg>
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13.5px] font-bold text-ir-text">
                Next: {done.name} ({done.code})
              </span>
              <span className="block text-[11.5px] font-medium text-[#8c8d93]">
                Arr {done.arr} · Plat 2 · {done.km} km
              </span>
            </span>
          </div>

          {/* action bar */}
          <div className="mt-3 flex items-center justify-between rounded-[22px] bg-ir-lav px-5 py-[11px]">
            {[
              { icon: BellIcon, label: "Notify" },
              { icon: ClocheIcon, label: "Order food" },
              { icon: CoachIcon, label: "Coach" },
            ].map((a) => (
              <button key={a.label} className="flex flex-col items-center gap-[3px] px-3 active:opacity-60">
                <a.icon className="h-[19px] w-[19px] text-ir-text" />
                <span className="text-[10.5px] font-semibold text-[#4b4c52]">{a.label}</span>
              </button>
            ))}
            <span className="h-[38px] w-px bg-[#e3e3e9]" />
            <button onClick={() => push("route")} className="flex flex-col items-center gap-[3px] px-3 active:opacity-60">
              <svg viewBox="0 0 24 24" className="h-[19px] w-[19px] text-ir-text" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="3.5" width="16" height="13.5" rx="2.4" />
                <path d="M4 9h16M8 20.5h8M9.5 17v3.5M14.5 17v3.5" />
              </svg>
              <span className="text-[10.5px] font-semibold text-[#4b4c52]">Route</span>
            </button>
            <button className="flex flex-col items-center gap-[3px] px-3 active:opacity-60">
              <PhoneIcon className="h-[19px] w-[19px] text-ir-text" />
              <span className="text-[10.5px] font-semibold text-[#4b4c52]">Help</span>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
