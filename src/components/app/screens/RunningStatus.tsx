"use client";

import { useState } from "react";
import ScreenHeader from "../ScreenHeader";
import { SearchIcon, TrainFrontIcon } from "../icons";
import { useApp } from "@/lib/store";

const RECENTS = [
  { icon: "pnr", label: "PNR · 2341501752" },
  { icon: "train", label: "12952 · MMCT Tejas Raj" },
  { icon: "pnr", label: "PNR · 4472901834" },
];

export default function RunningStatus() {
  const pop = useApp((s) => s.pop);
  const push = useApp((s) => s.push);
  const [q, setQ] = useState("");

  return (
    <div className="flex h-full flex-col bg-white">
      <ScreenHeader title="PNR & Train Status" onBack={pop} />

      <div className="no-scrollbar flex-1 overflow-y-auto px-4 pb-6">
        {/* PNR card */}
        <div className="rounded-[24px] bg-ir-lav px-4 pb-5 pt-4">
          <div className="flex items-center gap-3">
            <span className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-white text-ir-navy">
              <SearchIcon className="h-[17px] w-[17px]" />
            </span>
            <span className="text-[14.5px] font-extrabold uppercase tracking-[0.08em] text-ir-text">
              Check PNR status
            </span>
          </div>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value.replace(/\D/g, "").slice(0, 10))}
            inputMode="numeric"
            placeholder="Enter 10-digit PNR"
            className="mt-3 h-[52px] w-full rounded-[20px] border-2 border-ir-navy bg-white px-4 text-[16px] font-bold tracking-[0.06em] text-ir-text outline-none placeholder:font-semibold placeholder:tracking-normal placeholder:text-[#a3a4ab]"
          />
          <button
            onClick={() => setQ("2341501752")}
            className="mt-[12px] h-[52px] w-full rounded-[20px] bg-ir-coral text-[16px] font-bold text-white shadow-[0_10px_24px_rgba(251,83,74,0.3)] active:brightness-95"
          >
            Check Status
          </button>

          {/* live status preview */}
          {q.length === 10 && (
            <div className="mt-4 rounded-[18px] bg-white px-4 py-[14px]">
              <div className="flex items-center justify-between">
                <span className="text-[13.5px] font-extrabold text-ir-text">PNR {q}</span>
                <span className="rounded-[8px] bg-ir-chip-green px-[9px] py-[5px] text-[11px] font-extrabold text-ir-green">
                  CONFIRMED
                </span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-ir-lav text-ir-navy">
                  <TrainFrontIcon className="h-[17px] w-[17px]" />
                </span>
                <span className="flex-1 text-[13px] font-semibold text-ir-text">
                  12952 MMCT Tejas Raj · 3A
                </span>
                <button onClick={() => push("route")} className="text-[13px] font-bold text-ir-navy underline underline-offset-2">
                  Track
                </button>
              </div>
              <div className="mt-3 flex items-center gap-3 rounded-[14px] bg-ir-lav px-3 py-[9px]">
                <span className="rounded-[8px] bg-ir-chip-red px-[9px] py-[4px] text-[11px] font-bold text-ir-red">
                  Delay 10m
                </span>
                <span className="text-[12px] font-medium text-[#6d6f76]">Arriving Bhopal Jn 01:50, plat 2</span>
              </div>
            </div>
          )}
        </div>

        {/* recents */}
        <div className="mt-5 text-[12px] font-bold uppercase tracking-[0.14em] text-ir-label">Recent searches</div>
        <div className="mt-3 space-y-[10px]">
          {RECENTS.map((r) => (
            <button
              key={r.label}
              onClick={() => push("route")}
              className="flex w-full items-center gap-3 rounded-[20px] bg-ir-lav px-5 py-[6px] text-left active:brightness-[0.98]"
            >
              {r.icon === "pnr" ? (
                <span className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-white text-ir-navy">
                  <SearchIcon className="h-[16px] w-[16px]" />
                </span>
              ) : (
                <span className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-white text-ir-navy">
                  <TrainFrontIcon className="h-[17px] w-[17px]" />
                </span>
              )}
              <span className="text-[14px] font-semibold text-ir-text">{r.label}</span>
            </button>
          ))}
        </div>

        {/* live trains CTA */}
        <button
          onClick={() => push("livetrains")}
          className="mt-6 flex w-full items-center justify-between rounded-[20px] bg-ir-navy px-5 py-[16px] text-left active:brightness-125"
        >
          <span>
            <span className="block text-[15.5px] font-extrabold text-white">Live train running status</span>
            <span className="mt-[2px] block text-[12.5px] font-medium text-white/70">Track any train on the map</span>
          </span>
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9.5 5.5 7 6.5-7 6.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
