"use client";

import ScreenHeader from "../ScreenHeader";
import { BellIcon, ClocheIcon, CoachIcon, PhoneIcon, RefreshIcon } from "../icons";
import { ROUTE_STOPS } from "@/lib/data";
import { useApp } from "@/lib/store";

function TrackActionBar({ onMap }: { onMap: () => void }) {
  return (
    <div className="shrink-0 bg-white px-4 pb-7 pt-2">
      <div className="flex items-center justify-between rounded-[22px] bg-ir-lav px-5 py-[11px]">
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
        <button onClick={onMap} className="flex flex-col items-center gap-[3px] px-3 active:opacity-60">
          <span className="flex h-[19px] w-[19px] items-center justify-center">
            <svg viewBox="0 0 24 24" className="h-[19px] w-[19px] text-ir-text" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 20-6 2V5l6-2 6 2 6-2v13l-6 2-6-2Z" />
              <path d="M9 3v17M15 5v17" />
            </svg>
          </span>
          <span className="text-[10.5px] font-semibold text-[#4b4c52]">Live map</span>
        </button>
        <button className="flex flex-col items-center gap-[3px] px-3 active:opacity-60">
          <PhoneIcon className="h-[19px] w-[19px] text-ir-text" />
          <span className="text-[10.5px] font-semibold text-[#4b4c52]">Help</span>
        </button>
      </div>
    </div>
  );
}

export default function TrainRoute() {
  const pop = useApp((s) => s.pop);
  const push = useApp((s) => s.push);

  return (
    <div className="flex h-full flex-col bg-white">
      <ScreenHeader
        title="12952 · Route"
        onBack={pop}
        right={
          <button aria-label="Refresh" className="flex h-9 w-9 items-center justify-center rounded-full text-ir-text active:bg-black/5">
            <RefreshIcon className="h-[18px] w-[18px]" />
          </button>
        }
      />

      <div className="no-scrollbar flex-1 overflow-y-auto px-4 pb-4">
        {/* delay banner */}
        <div className="flex items-center justify-between rounded-[16px] bg-ir-chip-red px-4 py-[11px]">
          <span className="text-[12.5px] font-bold text-ir-red">Running 10 min late</span>
          <button onClick={() => push("livemap")} className="text-[12.5px] font-bold text-ir-navy underline underline-offset-2">
            Live map
          </button>
        </div>

        {/* route timeline */}
        <div className="relative mt-5 pl-[2px]">
          {ROUTE_STOPS.map((s, i) => {
            const done = (s.current ?? false) || i < ROUTE_STOPS.findIndex((x) => x.current);
            const isCurrent = !!s.current;
            return (
              <div key={s.code} className="relative flex gap-4 pb-[22px]">
                {/* rail + dot */}
                <div className="relative flex w-[22px] shrink-0 flex-col items-center">
                  {i > 0 && (
                    <span
                      className={`absolute top-0 h-[14px] w-[3px] rounded-full ${done || isCurrent ? "bg-ir-navy" : "bg-[#d9dade]"}`}
                    />
                  )}
                  {i < ROUTE_STOPS.length - 1 && (
                    <span
                      className={`absolute bottom-0 top-[16px] w-[3px] rounded-full ${done ? "bg-ir-navy" : "bg-[#d9dade]"}`}
                    />
                  )}
                  {isCurrent ? (
                    <span className="relative z-10 mt-[9px] flex h-[21px] w-[21px] items-center justify-center rounded-full bg-ir-coral shadow-[0_0_0_3px_rgba(251,83,74,0.25)]">
                      <svg viewBox="0 0 24 24" className="h-[12px] w-[12px] text-white" fill="currentColor">
                        <path d="M12 3 5 9v9h14V9l-7-6Zm0 6.2 3.4 1.7v2.1L12 14.7l-3.4-1.7v-2.1L12 9.2Z" />
                      </svg>
                    </span>
                  ) : (
                    <span
                      className={`relative z-10 mt-[11px] h-[13px] w-[13px] rounded-full border-[3px] border-white ${
                        done ? "bg-ir-navy" : "bg-[#c9cad1]"
                      }`}
                    />
                  )}
                </div>

                {/* station row */}
                <div className="min-w-0 flex-1 pb-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className={`truncate text-[15px] ${isCurrent ? "font-extrabold text-ir-text" : done ? "font-bold text-ir-text" : "font-semibold text-[#6d6f76]"}`}>
                      {s.name}
                    </span>
                    {isCurrent && (
                      <span className="shrink-0 rounded-[7px] bg-ir-coral px-[8px] py-[3px] text-[10px] font-extrabold uppercase text-white">
                        Here
                      </span>
                    )}
                  </div>
                  <div className="mt-[3px] flex items-center justify-between gap-2">
                    <span className="text-[12px] font-medium text-[#8c8d93]">
                      {s.arr !== "--" && s.dep !== "--" ? `${s.arr} · ${s.dep}` : s.dep !== "--" ? `Dep ${s.dep}` : `Arr ${s.arr}`}
                    </span>
                    <span className={`text-[11.5px] font-bold ${isCurrent ? "text-ir-red" : "text-[#a3a4ab]"}`}>
                      {s.late ? `+${s.late}m` : s.halt !== "--" ? s.halt : "Terminal"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <TrackActionBar onMap={() => push("livemap")} />
    </div>
  );
}
