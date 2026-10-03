"use client";

import { useState } from "react";
import ScreenHeader from "../ScreenHeader";
import { WALLET_TXNS } from "@/lib/data";
import { useApp } from "@/lib/store";

type Filter = "all" | "credited" | "debited";

export default function Transactions() {
  const pop = useApp((s) => s.pop);
  const [filter, setFilter] = useState<Filter>("all");

  const list = WALLET_TXNS.filter((t) =>
    filter === "all" ? true : filter === "credited" ? t.amt > 0 : t.amt < 0
  );

  return (
    <div className="flex h-full flex-col bg-white">
      <ScreenHeader title="Transactions" onBack={pop} />

      <div className="no-scrollbar flex-1 overflow-y-auto px-4 pb-6">
        <div className="flex gap-[8px] px-1">
          {(
            [
              ["all", "All"],
              ["credited", "Credited"],
              ["debited", "Debited"],
            ] as [Filter, string][]
          ).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className={`h-[36px] rounded-[12px] px-[16px] text-[12.5px] transition-colors ${
                filter === id
                  ? "bg-ir-navy font-bold text-white"
                  : "bg-ir-lav font-semibold text-[#3d3e44]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-4 space-y-[10px]">
          {list.map((t) => (
            <div key={t.id} className="flex items-center gap-3 rounded-[18px] bg-ir-lav px-4 py-[13px]">
              <span
                className={`flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full ${
                  t.amt > 0 ? "bg-ir-chip-green text-ir-green" : "bg-ir-chip-red text-ir-red"
                }`}
              >
                <svg viewBox="0 0 24 24" className={`h-[16px] w-[16px] ${t.amt > 0 ? "" : "rotate-180"}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19V5M6 11l6-6 6 6" />
                </svg>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[14px] font-bold text-ir-text">{t.title}</span>
                <span className="block truncate text-[11.5px] font-medium text-[#8c8d93]">
                  {t.sub} · {t.date}
                </span>
              </span>
              <span className={`text-[14.5px] font-extrabold ${t.amt > 0 ? "text-ir-green" : "text-ir-text"}`}>
                {t.amt > 0 ? "+" : "−"} ₹ {Math.abs(t.amt).toLocaleString("en-IN")}
              </span>
            </div>
          ))}
          {list.length === 0 && (
            <div className="mt-16 text-center text-[14px] font-medium text-[#8c8d93]">No transactions here yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
