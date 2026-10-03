"use client";

import ScreenHeader from "../ScreenHeader";
import { MedalIcon } from "../icons";
import { useApp } from "@/lib/store";

export default function Loyalty() {
  const userName = useApp((s) => s.profile.name);
  const pop = useApp((s) => s.pop);

  return (
    <div className="flex h-full flex-col bg-white">
      <ScreenHeader title="Loyalty" onBack={pop} />

      <div className="no-scrollbar flex-1 overflow-y-auto px-4 pb-6">
        {/* membership card */}
        <div className="relative overflow-hidden rounded-[24px] bg-ir-navy px-5 pb-5 pt-5">
          <div className="pointer-events-none absolute -right-8 -top-10 h-[120px] w-[120px] rounded-full bg-white/8" />
          <div className="flex items-center gap-3">
            <span className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white/12 text-[#f6e492]">
              <MedalIcon className="h-[21px] w-[21px]" />
            </span>
            <div>
              <div className="text-[15px] font-extrabold text-white">{userName}</div>
              <div className="text-[11.5px] font-semibold text-white/60">IRCTC SBI Card · Platinum</div>
            </div>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <div className="text-[11px] font-medium text-white/60">Reward points</div>
              <div className="text-[30px] font-extrabold leading-none text-white">1,240</div>
            </div>
            <div className="text-right">
              <div className="text-[11px] font-medium text-white/60">Membership</div>
              <div className="text-[14px] font-bold text-white">platinum • 8823</div>
            </div>
          </div>
        </div>

        {/* benefits */}
        <div className="mt-5 text-[12px] font-bold uppercase tracking-[0.14em] text-ir-label">Your benefits</div>
        <div className="mt-3 space-y-[10px]">
          {[
            ["1 point / ₹100", "on AC class bookings"],
            ["Free lounge access", "2 visits per quarter"],
            ["Priority Tatkal", "early access window"],
          ].map(([t, s]) => (
            <div key={t} className="flex items-center gap-3 rounded-[18px] bg-ir-lav px-4 py-[13px]">
              <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-white text-ir-navy">
                <MedalIcon className="h-[16px] w-[16px]" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[14px] font-bold text-ir-text">{t}</span>
                <span className="block text-[11.5px] font-medium text-[#8c8d93]">{s}</span>
              </span>
            </div>
          ))}
        </div>

        {/* redeem */}
        <button className="mt-5 h-[52px] w-full rounded-[20px] bg-ir-coral text-[16px] font-bold text-white shadow-[0_10px_24px_rgba(251,83,74,0.3)] active:brightness-95">
          Redeem 1,240 points
        </button>
      </div>
    </div>
  );
}
