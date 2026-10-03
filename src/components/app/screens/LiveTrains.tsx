"use client";

import { useState } from "react";
import ScreenHeader from "../ScreenHeader";
import { TrainFrontIcon } from "../icons";
import { TRAINS } from "@/lib/data";
import { useApp } from "@/lib/store";

const LIVE_LIST = [
  { id: "12951", name: "MMCT Tejas Raj", from: "BCT", to: "NDLS", dep: "05:25", arr: "21:05", progress: 0.62, status: "Running", delay: 0 },
  { id: "12952", name: "MMCT Tejas Raj", from: "NDLS", to: "BCT", dep: "16:55", arr: "08:35", progress: 0.47, status: "Running", delay: 10 },
  { id: "12907", name: "MHRST SMPRK K EX", from: "BCT", to: "NDLS", dep: "17:40", arr: "10:25", progress: 0.31, status: "Running", delay: 4 },
  { id: "12908", name: "MHRST SMPRK K EX", from: "NDLS", to: "BCT", dep: "16:30", arr: "09:15", progress: 0.55, status: "Running", delay: 0 },
  { id: "12009", name: "Shatabdi Express", from: "BCT", to: "ADI", dep: "06:25", arr: "13:05", progress: 0.86, status: "Running", delay: 2 },
];

export default function LiveTrains() {
  const pop = useApp((s) => s.pop);
  const push = useApp((s) => s.push);

  return (
    <div className="flex h-full flex-col bg-white">
      <ScreenHeader title="Live Train Status" onBack={pop} />

      <div className="no-scrollbar flex-1 overflow-y-auto px-4 pb-6">
        <div className="space-y-[14px]">
          {LIVE_LIST.map((t) => (
            <button
              key={t.id}
              onClick={() => push("livemap")}
              className="block w-full rounded-[24px] bg-ir-lav px-[12px] pb-[12px] pt-[12px] text-left active:brightness-[0.99]"
            >
              <div className="px-[6px]">
                <div className="flex items-center gap-[7px]">
                  <span className="text-[15.5px] font-extrabold text-ir-text">{t.id}</span>
                  <span className="h-[4px] w-[4px] rounded-full bg-[#c9cad1]" />
                  <span className="truncate text-[14.5px] font-extrabold text-ir-text">{t.name}</span>
                  <span className="ml-auto flex items-center gap-[5px]">
                    <span className="h-[7px] w-[7px] rounded-full bg-ir-green" />
                    <span className="text-[11.5px] font-bold text-ir-green">{t.status}</span>
                  </span>
                </div>
              </div>

              <div className="mt-[10px] rounded-[18px] bg-white px-4 pb-[12px] pt-[11px]">
                <div className="flex items-center">
                  <div className="w-[76px] shrink-0">
                    <div className="text-[19px] font-extrabold leading-none text-ir-text">{t.dep}</div>
                    <div className="mt-[4px] text-[12.5px] font-medium text-[#8c8d93]">{t.from}</div>
                  </div>
                  <div className="flex-1 px-2">
                    <div className="relative mt-[9px] h-[5px] rounded-full bg-[#e6e7ea]">
                      <div
                        className="absolute inset-y-0 left-0 rounded-full bg-ir-navy"
                        style={{ width: `${t.progress * 100}%` }}
                      />
                      <span
                        className="absolute -top-[6px] flex h-[17px] w-[17px] -translate-x-1/2 items-center justify-center rounded-full border-[3px] border-white bg-ir-navy shadow"
                        style={{ left: `${t.progress * 100}%` }}
                      >
                        <TrainFrontIcon className="h-[9px] w-[9px] text-white" />
                      </span>
                    </div>
                    <div className="mt-[8px] text-center text-[11px] font-semibold text-[#8c8d93]">
                      {t.delay > 0 ? `Delay ${t.delay} min` : "On time"}
                    </div>
                  </div>
                  <div className="w-[76px] shrink-0 text-right">
                    <div className="text-[19px] font-extrabold leading-none text-ir-text">{t.arr}</div>
                    <div className="mt-[4px] text-[12.5px] font-medium text-[#8c8d93]">{t.to}</div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
