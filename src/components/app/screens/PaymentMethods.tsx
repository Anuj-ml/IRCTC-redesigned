"use client";

import { useState } from "react";
import ScreenHeader from "../ScreenHeader";
import { TRAINS, fareFor } from "@/lib/data";
import { useApp } from "@/lib/store";
import { CheckIcon } from "../icons";

const UPI = [
  { id: "gpay", name: "Google Pay", logo: "/assets/logo_gpay.png", sub: "anuj@okhdfcbank" },
  { id: "phonepe", name: "PhonePe", logo: "/assets/logo_phonepe.png", sub: "98•••••2104@ybl" },
  { id: "paytm", name: "Paytm", logo: "/assets/logo_paytm.png", sub: "UPI · Paytm balance" },
];

export default function PaymentMethods() {
  const { pop, push, selectedTrain, passengers, debitWallet } = useApp();
  const [method, setMethod] = useState("gpay");
  const [paying, setPaying] = useState(false);

  const t = TRAINS[selectedTrain ?? 0];
  const perHead = passengers[0]?.price || fareFor(selectedTrain ?? 0, t.classes.find((c) => c.state === "available")?.code ?? t.classes[0].code);
  const total = perHead * Math.max(passengers.length, 1) + Math.min(40 * Math.max(passengers.length, 1), 80) + Math.round(perHead * Math.max(passengers.length, 1) * 0.05);

  const pay = () => {
    setPaying(true);
    setTimeout(() => {
      if (method === "wallet") debitWallet(total);
      push("success");
    }, 900);
  };

  return (
    <div className="flex h-full flex-col bg-white">
      <ScreenHeader title="Payment" onBack={pop} />

      <div className="no-scrollbar flex-1 overflow-y-auto px-4 pb-4">
        {/* amount */}
        <div className="flex items-center justify-between rounded-[20px] bg-ir-lav px-4 py-[14px]">
          <span className="text-[13px] font-bold uppercase tracking-[0.1em] text-ir-label">Amount payable</span>
          <span className="text-[19px] font-extrabold text-ir-text">₹ {total.toLocaleString("en-IN")}</span>
        </div>

        {/* UPI apps */}
        <div className="mt-5 text-[12px] font-bold uppercase tracking-[0.14em] text-ir-label">Pay by UPI</div>
        <div className="mt-3 space-y-[10px]">
          {UPI.map((u) => (
            <button
              key={u.id}
              onClick={() => setMethod(u.id)}
              className={`flex w-full items-center gap-3 rounded-[18px] px-4 py-[13px] text-left transition-colors ${
                method === u.id ? "border-2 border-ir-navy bg-white" : "bg-ir-lav"
              }`}
            >
              <span className="flex h-[44px] w-[52px] shrink-0 items-center justify-center rounded-[12px] bg-white">
                <img src={u.logo} alt={u.name} className="max-h-[26px] max-w-[40px] object-contain" draggable={false} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-bold text-ir-text">{u.name}</span>
                <span className="block truncate text-[12.5px] font-medium text-[#8c8d93]">{u.sub}</span>
              </span>
              <Radio active={method === u.id} />
            </button>
          ))}
        </div>

        {/* wallet */}
        <div className="mt-5 text-[12px] font-bold uppercase tracking-[0.14em] text-ir-label">More ways to pay</div>
        <div className="mt-3 space-y-[10px]">
          <button
            onClick={() => setMethod("wallet")}
            className={`flex w-full items-center gap-3 rounded-[18px] px-4 py-[13px] text-left ${
              method === "wallet" ? "border-2 border-ir-navy bg-white" : "bg-ir-lav"
            }`}
          >
            <span className="flex h-[44px] w-[52px] shrink-0 items-center justify-center rounded-[12px] bg-ir-navy text-[11px] font-extrabold text-white">
              IRCTC
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] font-bold text-ir-text">IRCTC E-Wallet</span>
              <span className="block text-[12.5px] font-medium text-[#8c8d93]">Instant refunds · zero charges</span>
            </span>
            <Radio active={method === "wallet"} />
          </button>
          <button
            onClick={() => setMethod("card")}
            className={`flex w-full items-center gap-3 rounded-[18px] px-4 py-[13px] text-left ${
              method === "card" ? "border-2 border-ir-navy bg-white" : "bg-ir-lav"
            }`}
          >
            <span className="flex h-[44px] w-[52px] shrink-0 items-center justify-center rounded-[12px] bg-white text-[16px]">💳</span>
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] font-bold text-ir-text">Credit / Debit card</span>
              <span className="block text-[12.5px] font-medium text-[#8c8d93]">HDFC •• 4421 · Visa</span>
            </span>
            <Radio active={method === "card"} />
          </button>
        </div>

        <p className="mt-5 px-1 text-[11.5px] font-medium leading-relaxed text-[#8c8d93]">
          Payments are secured by 256-bit encryption. By paying you agree to IRCTC terms and the carrier's cancellation policy.
        </p>
      </div>

      <div className="shrink-0 bg-white px-4 pb-6 pt-2">
        <button
          onClick={pay}
          disabled={paying}
          className="flex h-[54px] w-full items-center justify-center gap-2 rounded-[20px] bg-ir-coral text-[16px] font-bold text-white shadow-[0_10px_24px_rgba(251,83,74,0.3)] active:brightness-95 disabled:opacity-70"
        >
          {paying ? (
            <>
              <span className="h-[18px] w-[18px] animate-spin rounded-full border-[2.5px] border-white/40 border-t-white" />
              Processing…
            </>
          ) : (
            <>Pay ₹ {total.toLocaleString("en-IN")}</>
          )}
        </button>
      </div>
    </div>
  );
}

function Radio({ active }: { active: boolean }) {
  return (
    <span className={`flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full border-2 ${active ? "border-ir-navy" : "border-[#c9cad0] bg-white"}`}>
      {active && <CheckIcon className="h-3 w-3 text-ir-navy" />}
    </span>
  );
}
