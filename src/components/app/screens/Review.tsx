"use client";

import { useMemo } from "react";
import ScreenHeader from "../ScreenHeader";
import TrainSummary from "../TrainSummary";
import { ChevronDown } from "../icons";
import { TRAINS, fareFor, fmtHeader } from "@/lib/data";
import { useApp } from "@/lib/store";

export default function Review() {
  const { pop, push, selectedTrain, journeyDate, fromStation, toStation, passengers } = useApp();

  const t = TRAINS[selectedTrain ?? 0];
  const cls = passengers[0]?.coach ? null : null;
  const classCode = useMemo(() => {
    const c = t.classes.find((x) => x.code === passengers[0]?.berth);
    return c ? c.code : (t.classes.find((x) => x.state === "available")?.code ?? t.classes[0].code);
  }, [t, passengers]);

  const perHead = passengers[0]?.price || fareFor(selectedTrain ?? 0, classCode);
  const base = perHead * Math.max(passengers.length, 1);
  const reservation = Math.min(40 * Math.max(passengers.length, 1), 80);
  const gst = Math.round(base * 0.05);
  const total = base + reservation + gst;

  return (
    <div className="flex h-full flex-col bg-white">
      <ScreenHeader title="Review & Pay" onBack={pop} />

      <div className="no-scrollbar flex-1 overflow-y-auto px-4 pb-4">
        <TrainSummary
          trainId={t.id}
          trainName={t.name}
          from={fromStation?.code ?? t.from}
          to={toStation?.code ?? t.to}
          dep={t.dep}
          arr={t.arr}
          duration={t.duration}
          cls={classCode}
          date={fmtHeader(journeyDate)}
        />

        {/* passengers + fare */}
        <div className="mt-4 rounded-[24px] bg-ir-lav px-4 pb-[16px] pt-[14px]">
          <div className="text-[12px] font-bold uppercase tracking-[0.14em] text-ir-label">
            Passengers · {passengers.length}
          </div>
          <div className="mt-3 space-y-[10px]">
            {passengers.map((p, i) => (
              <div key={i} className="flex items-center gap-3 rounded-[16px] bg-white px-[14px] py-[12px]">
                <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-ir-lav text-[13.5px] font-extrabold text-ir-navy">
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14.5px] font-bold text-ir-text">{p.name}</span>
                  <span className="block text-[12px] font-medium text-[#8c8d93]">
                    {p.coach}/{p.seatNo} · {p.berth} · {classCode}
                  </span>
                </span>
                <span className="text-[14px] font-bold text-ir-text">₹ {p.price.toLocaleString("en-IN")}</span>
              </div>
            ))}
            {passengers.length === 0 && (
              <div className="rounded-[16px] bg-white px-[14px] py-[12px] text-[13.5px] font-medium text-[#8c8d93]">
                No passengers added yet — go back to add them.
              </div>
            )}
          </div>

          <div className="mt-4 space-y-[9px] border-t border-dashed border-[#d4d5da] pt-[14px] text-[13.5px]">
            <Row label="Ticket fare" value={`₹ ${base.toLocaleString("en-IN")}`} />
            <Row label="Reservation charge" value={`₹ ${reservation}`} />
            <Row label="GST (5%)" value={`₹ ${gst}`} />
            <div className="!mt-[12px] flex items-center justify-between border-t border-[#d4d5da] pt-[12px]">
              <span className="text-[15px] font-extrabold text-ir-text">Total fare</span>
              <span className="text-[18px] font-extrabold text-ir-text">₹ {total.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>

        {/* pay using */}
        <button
          onClick={() => push("paymethods")}
          className="mt-4 flex w-full items-center justify-between rounded-[20px] bg-ir-lav px-4 py-[14px] text-left active:brightness-[0.99]"
        >
          <span className="min-w-0 text-left">
            <span className="text-[10.5px] font-medium uppercase tracking-[0.08em] text-ir-gray">Pay using</span>
            <span className="mt-[2px] flex items-center gap-2">
              <img src="/assets/logo_gpay.png" alt="GPay" className="h-[15px] w-auto max-w-[74px] object-contain" />
              <span className="h-[3px] w-[3px] rounded-full bg-[#c9cad1]" />
              <span className="text-[13px] font-bold text-ir-text">anuj@okhdfcbank</span>
            </span>
          </span>
          <ChevronDown className="h-[17px] w-[17px] shrink-0 rotate-[-90deg] text-ir-text" />
        </button>

        <div className="mt-4 rounded-[18px] bg-ir-chip-amber px-4 py-[12px]">
          <p className="text-[12.5px] font-medium leading-relaxed text-[#8a6d1a]">
            Free cancellation window: cancel before departure to get up to 75% refund as per IRCTC rules.
          </p>
        </div>
      </div>

      {/* pay bar */}
      <div className="flex shrink-0 items-center gap-[10px] bg-white px-4 pb-6 pt-2">
        <button
          onClick={() => push("paymethods")}
          className="flex h-[52px] flex-1 items-center justify-between rounded-[20px] bg-ir-lav px-4 active:brightness-[0.99]"
        >
          <span className="min-w-0 text-left">
            <span className="flex items-center gap-1 text-[10.5px] font-medium text-ir-gray">
              Total <span className="h-[3px] w-[3px] rounded-full bg-[#c9cad1]" /> incl. taxes
            </span>
            <span className="text-[16.5px] font-extrabold text-ir-text">₹ {total.toLocaleString("en-IN")}</span>
          </span>
          <ChevronDown className="h-[16px] w-[16px] shrink-0 rotate-[-90deg] text-ir-text" />
        </button>
        <button
          onClick={() => push("paymethods")}
          className="h-[52px] w-[150px] rounded-[20px] bg-ir-coral text-[15.5px] font-bold text-white shadow-[0_10px_24px_rgba(251,83,74,0.3)] active:brightness-95"
        >
          Pay ₹ {total}
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-medium text-[#6d6f76]">{label}</span>
      <span className="font-bold text-ir-text">{value}</span>
    </div>
  );
}
