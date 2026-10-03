"use client";

import { motion } from "framer-motion";
import { useApp } from "@/lib/store";
import { TRAINS, fareFor } from "@/lib/data";

export default function PaymentSuccess() {
  const { push, resetTo, selectedTrain, passengers, journeyDate } = useApp();

  const t = TRAINS[selectedTrain ?? 0];
  const perHead = passengers[0]?.price || fareFor(selectedTrain ?? 0, t.classes[0].code);
  const n = Math.max(passengers.length, 1);
  const farePart = perHead * n;
  const convFee = Math.min(40 * n, 80);
  const gst = Math.round(farePart * 0.05);
  const total = farePart + convFee + gst;

  const d = journeyDate;
  const dateStr = `${String(d.getDate()).padStart(2, "0")} ${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][d.getMonth()]} ${d.getFullYear()}`;
  const txnId = "8214" + String(567800 + (selectedTrain ?? 0) * 137 + passengers.length * 91).slice(0, 6);

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-white">
      {/* soft backdrop */}
      <div className="absolute inset-x-0 top-0 h-[420px] bg-ir-lav" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-8 pb-4 pt-16">
        {/* animated badge */}
        <div className="relative h-[118px] w-[118px]">
          <span className="absolute inset-0 rounded-full bg-[#f6e492]" />
          <span className="absolute inset-[17px] rounded-full bg-[#fbc9c5]" />
          <motion.span
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="absolute inset-[34px] flex items-center justify-center rounded-full bg-ir-coral shadow-[0_10px_24px_rgba(251,83,74,0.4)]"
          >
            <svg viewBox="0 0 24 24" className="h-8 w-8 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <motion.path
                d="m5 12.5 4.5 4.5L19 7.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.25, duration: 0.45, ease: "easeOut" }}
              />
            </svg>
          </motion.span>
        </div>

        <motion.div
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-7 text-center"
        >
          <h1 className="text-[26px] font-extrabold leading-tight text-ir-text">Payment successful</h1>
          <p className="mt-2 text-[14.5px] font-medium leading-relaxed text-[#6d6f76]">
            Your ticket is confirmed! PNR and details are on the way.
          </p>
        </motion.div>

        {/* ticket stub */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.32 }}
          className="mt-7 w-full rounded-[22px] bg-white p-5 shadow-[0_14px_34px_rgba(12,13,20,0.08)]"
        >
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-bold uppercase tracking-[0.08em] text-ir-label">PNR</span>
            <span className="text-[15px] font-extrabold text-ir-coral">2341501752</span>
          </div>
          <div className="mt-3 flex items-center">
            <div className="min-w-0 flex-1">
              <div className="text-[21px] font-extrabold leading-none text-ir-text">{t.dep}</div>
              <div className="mt-[4px] text-[12.5px] font-medium text-[#8c8d93]">{fromCode()}</div>
            </div>
            <div className="flex-1 px-2 text-center">
              <div className="text-[11px] font-semibold text-[#8c8d93]">{t.duration}</div>
              <div className="my-[4px] h-px w-full bg-[#dcdde1]" />
              <div className="text-[11px] font-bold text-ir-text">{dateStr}</div>
            </div>
            <div className="min-w-0 flex-1 text-right">
              <div className="text-[21px] font-extrabold leading-none text-ir-text">{t.arr}</div>
              <div className="mt-[4px] text-[12.5px] font-medium text-[#8c8d93]">{toCode()}</div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-dashed border-[#dcdde1] pt-3">
            <span className="text-[13px] font-semibold text-ir-text">
              {t.id} · {t.name}
            </span>
            <span className="rounded-[8px] bg-ir-chip-green px-[8px] py-[4px] text-[11px] font-extrabold text-ir-green">
              CNF
            </span>
          </div>

          {/* payment details */}
          <div className="mt-3 space-y-[9px] rounded-[14px] bg-ir-lav px-[14px] py-[13px]">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold text-[#6d6f76]">Payment method</span>
              <span className="flex items-center gap-[7px]">
                <img src="/assets/logo_gpay.png" alt="GPay" className="h-[16px] w-[16px] rounded object-contain" draggable={false} />
                <span className="text-[12.5px] font-bold text-ir-text">GPay ······ 4018</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold text-[#6d6f76]">Transaction ID</span>
              <span className="text-[12.5px] font-bold text-ir-text">IRCTC{txnId}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold text-[#6d6f76]">Paid on</span>
              <span className="text-[12.5px] font-bold text-ir-text">{dateStr} · 04:32 PM</span>
            </div>
            <div className="flex items-center justify-between border-t border-dashed border-[#dcdde1] pt-[9px]">
              <span className="text-[12px] font-semibold text-[#6d6f76]">
                Fare ({passengers.length || 1} × ₹{perHead.toLocaleString("en-IN")})
              </span>
              <span className="text-[12.5px] font-bold text-ir-text">
                ₹ {(perHead * Math.max(passengers.length, 1)).toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold text-[#6d6f76]">Convenience fee</span>
              <span className="text-[12.5px] font-bold text-ir-text">₹ {convFee}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold text-[#6d6f76]">GST (5%)</span>
              <span className="text-[12.5px] font-bold text-ir-text">₹ {gst}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.42 }}
          className="mt-4 text-[13px] font-bold text-ir-text"
        >
          ₹ {total.toLocaleString("en-IN")} paid
        </motion.div>
      </div>

      {/* confetti */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(14)].map((_, i) => (
          <span
            key={i}
            className="confetti-piece"
            style={{
              left: `${6 + i * 6.6}%`,
              width: i % 3 === 0 ? 8 : 6,
              height: i % 3 === 0 ? 8 : 6,
              borderRadius: i % 2 ? "50%" : 2,
              background: ["#fb534a", "#f6e492", "#02026f", "#138844"][i % 4],
              animationDelay: `${(i % 7) * 0.35}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mt-auto space-y-[10px] px-5 pb-7 pt-4">
        <button
          onClick={() => push("ticket")}
          className="h-[54px] w-full rounded-[20px] bg-ir-navy text-[16px] font-bold text-white shadow-[0_10px_24px_rgba(2,2,111,0.3)] active:brightness-125"
        >
          View ticket
        </button>
        <button
          onClick={() => resetTo("home")}
          className="h-[50px] w-full rounded-[20px] bg-ir-lav text-[15.5px] font-bold text-ir-text active:brightness-[0.99]"
        >
          Back home
        </button>
      </div>
    </div>
  );

  function fromCode() {
    return t.from;
  }
  function toCode() {
    return t.to;
  }
}
