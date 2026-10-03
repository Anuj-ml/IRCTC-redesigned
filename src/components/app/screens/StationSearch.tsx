"use client";

import { useMemo, useState } from "react";
import ScreenHeader from "../ScreenHeader";
import { SearchIcon, TrainFrontIcon, SwapHIcon, MapPinIcon } from "../icons";
import { STATIONS } from "@/lib/data";
import { useApp, type Station } from "@/lib/store";

export default function StationSearch() {
  const pop = useApp((s) => s.pop);
  const params = useApp((s) => s.params) as { field?: "from" | "to" } | null;
  const setFromStation = useApp((s) => s.setFromStation);
  const setToStation = useApp((s) => s.setToStation);
  const other = useApp((s) => (params?.field === "from" ? s.toStation : s.fromStation));

  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return STATIONS;
    return STATIONS.filter(
      (s) =>
        s.name.toLowerCase().includes(needle) ||
        s.code.toLowerCase().includes(needle) ||
        s.city.toLowerCase().includes(needle)
    );
  }, [q]);

  const pick = (s: Station) => {
    if (other && other.code === s.code) return; // same-station guard
    if (params?.field === "from") setFromStation(s);
    else setToStation(s);
    pop();
  };

  return (
    <div className="flex h-full flex-col bg-white">
      <ScreenHeader title={params?.field === "from" ? "Select Origin" : "Select Destination"} onBack={pop} />

      {/* search box */}
      <div className="px-4 pb-2 pt-1">
        <div className="flex h-[52px] items-center gap-3 rounded-[20px] bg-ir-lav px-5">
          <SearchIcon className="h-[18px] w-[18px] shrink-0 text-[#8c8d93]" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search station / city / code"
            className="h-full w-full bg-transparent text-[15px] font-medium text-ir-text outline-none placeholder:font-medium placeholder:text-[#a3a4ab]"
          />
        </div>
      </div>

      <div className="no-scrollbar flex-1 overflow-y-auto px-4 pb-6">
        {params?.field && other && (
          <div className="mb-3 flex items-center gap-3 rounded-[18px] bg-ir-lav px-4 py-[12px]">
            <MapPinIcon className="h-[17px] w-[17px] shrink-0 text-ir-navy" />
            <span className="text-[13px] font-medium text-[#6d6f76]">
              Destination locked: <span className="font-bold text-ir-text">{other.code} · {other.name}</span>
            </span>
          </div>
        )}
        {results.length === 0 && (
          <div className="mt-16 text-center text-[14.5px] font-medium text-[#8c8d93]">
            No stations found for “{q}”
          </div>
        )}
        {results.map((s) => {
          const disabled = other?.code === s.code;
          return (
            <button
              key={s.code}
              disabled={disabled}
              onClick={() => pick(s)}
              className={`mt-3 flex w-full items-center gap-4 rounded-[18px] px-4 py-[14px] text-left transition-colors ${
                disabled ? "bg-[#f1f1f4] opacity-60" : "bg-ir-lav active:brightness-[0.98]"
              }`}
            >
              <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-white text-ir-navy">
                <TrainFrontIcon className="h-[19px] w-[19px]" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[15.5px] font-bold text-ir-text">{s.name}</span>
                <span className="block truncate text-[12.5px] font-medium text-[#8c8d93]">
                  {s.city} · {s.code}
                </span>
              </span>
              {disabled && <SwapHIcon className="h-[15px] w-[15px] shrink-0 text-[#a3a4ab]" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
