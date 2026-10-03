"use client";

import { useState } from "react";
import ScreenHeader from "../ScreenHeader";
import { WALLET_TXNS } from "@/lib/data";
import { useApp } from "@/lib/store";

export default function Wallet() {
  const userName = useApp((s) => s.profile.name);
  const pop = useApp((s) => s.pop);
  const balance = useApp((s) => s.walletBalance);
  const [topup, setTopup] = useState(false);

  return (
    <div className="flex h-full flex-col bg-white">
      <ScreenHeader title="IRCTC E-Wallet" onBack={pop} />

      <div className="no-scrollbar flex-1 overflow-y-auto px-4 pb-6">
        {/* balance card */}
        <div className="relative overflow-hidden rounded-[24px] bg-ir-navy px-5 pb-5 pt-5">
          <div className="pointer-events-none absolute -right-8 -top-10 h-[120px] w-[120px] rounded-full bg-white/8" />
          <div className="pointer-events-none absolute -bottom-12 right-10 h-[90px] w-[90px] rounded-full bg-white/6" />
          <div className="text-[12px] font-medium text-white/60">Available balance</div>
          <div className="mt-1 text-[32px] font-extrabold leading-none text-white">₹ {balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</div>
          <div className="mt-3 flex items-center gap-2">
            <span className="rounded-[9px] bg-white/12 px-3 py-[5px] text-[10.5px] font-semibold text-white/85">
              {userName}
            </span>
            <span className="rounded-[9px] bg-white/12 px-3 py-[5px] text-[10.5px] font-semibold text-white/85">
              Wallet ID: IRW88231
            </span>
          </div>
        </div>

        {/* actions */}
        <div className="mt-3 grid grid-cols-2 gap-3">
          <button
            onClick={() => setTopup(!topup)}
            className="h-[50px] rounded-[20px] bg-ir-coral text-[15px] font-bold text-white shadow-[0_10px_24px_rgba(251,83,74,0.3)] active:brightness-95"
          >
            {topup ? "Top-up ₹ 500" : "Top-up wallet"}
          </button>
          <button className="h-[50px] rounded-[20px] border-[1.5px] border-[#e3e3e9] bg-white text-[14px] font-bold text-ir-navy active:bg-ir-lav">
            Pay with wallet
          </button>
        </div>

        {/* activity */}
        <div className="mt-6 text-[12px] font-bold uppercase tracking-[0.14em] text-ir-label">Recent activity</div>
        <div className="mt-3 space-y-[10px]">
          {WALLET_TXNS.map((t) => (
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
                <span className="block truncate text-[11.5px] font-medium text-[#8c8d93]">{t.date}</span>
              </span>
              <span className={`text-[14.5px] font-extrabold ${t.amt > 0 ? "text-ir-green" : "text-ir-text"}`}>
                {t.amt > 0 ? "+" : "−"} ₹ {Math.abs(t.amt).toLocaleString("en-IN")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
