"use client";

import { useState } from "react";
import ScreenHeader from "../ScreenHeader";
import { CheckIcon, PlusIcon } from "../icons";
import { useApp } from "@/lib/store";

const CARDS = [
  { brand: "HDFC Visa", last4: "4421", exp: "08/27", upi: false },
  { brand: "ICICI Mastercard", last4: "9034", exp: "11/26", upi: false },
];

const UPI_IDS = [{ id: "anuj@okhdfcbank", primary: true }];

export default function ManagePayments() {
  const pop = useApp((s) => s.pop);
  const [primary, setPrimary] = useState("anuj@okhdfcbank");

  return (
    <div className="flex h-full flex-col bg-white">
      <ScreenHeader title="Payment Methods" onBack={pop} />

      <div className="no-scrollbar flex-1 overflow-y-auto px-4 pb-6">
        {/* UPI ids */}
        <div className="text-[12px] font-bold uppercase tracking-[0.14em] text-ir-label">UPI IDs</div>
        <div className="mt-3 space-y-[10px]">
          {UPI_IDS.map((u) => (
            <button
              key={u.id}
              onClick={() => setPrimary(u.id)}
              className={`flex w-full items-center gap-3 rounded-[18px] px-4 py-[13px] text-left ${
                primary === u.id ? "border-2 border-ir-navy bg-white" : "bg-ir-lav"
              }`}
            >
              <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-white text-ir-navy">
                <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="6" width="18" height="13" rx="2.4" />
                  <path d="M3 10.2h18" />
                </svg>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[14.5px] font-bold text-ir-text">{u.id}</span>
                {primary === u.id && (
                  <span className="text-[11.5px] font-semibold text-ir-green">Primary for one-tap pay</span>
                )}
              </span>
              {primary === u.id && <CheckIcon className="h-[15px] w-[15px] text-ir-navy" />}
            </button>
          ))}
          <button className="flex w-full items-center justify-center gap-2 rounded-[18px] border-[1.5px] border-dashed border-[#c9cad0] px-4 py-[13px] text-[13.5px] font-bold text-[#6d6f76] active:bg-ir-lav">
            <PlusIcon className="h-[15px] w-[15px]" />
            Add UPI ID
          </button>
        </div>

        {/* cards */}
        <div className="mt-6 text-[12px] font-bold uppercase tracking-[0.14em] text-ir-label">Saved cards</div>
        <div className="mt-3 space-y-[10px]">
          {CARDS.map((c) => (
            <div key={c.last4} className="flex items-center gap-3 rounded-[18px] bg-ir-lav px-4 py-[13px]">
              <span className="flex h-[38px] w-[52px] shrink-0 items-center justify-center rounded-[10px] bg-ir-navy text-[9px] font-extrabold tracking-wide text-white">
                {c.brand.split(" ")[0]}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[14px] font-bold text-ir-text">{c.brand} •• {c.last4}</span>
                <span className="block text-[11.5px] font-medium text-[#8c8d93]">Expires {c.exp}</span>
              </span>
            </div>
          ))}
          <button className="flex w-full items-center justify-center gap-2 rounded-[18px] border-[1.5px] border-dashed border-[#c9cad0] px-4 py-[13px] text-[13.5px] font-bold text-[#6d6f76] active:bg-ir-lav">
            <PlusIcon className="h-[15px] w-[15px]" />
            Add new card
          </button>
        </div>

        <p className="mt-5 px-1 text-[11.5px] font-medium leading-relaxed text-[#8c8d93]">
          Card details are tokenised per RBI guidelines — we never store your raw card number or CVV.
        </p>
      </div>
    </div>
  );
}
