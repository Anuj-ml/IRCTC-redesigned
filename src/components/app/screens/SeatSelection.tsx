"use client";

import { useState } from "react";
import ScreenHeader from "../ScreenHeader";
import { type Seat, SEAT_ROWS } from "@/lib/data";
import { TRAINS, fareFor } from "@/lib/data";
import { useApp } from "@/lib/store";

/* first-version seat map colours (IRCTC berth legend) */
const SEAT_STYLES: Record<string, { bg: string; border: string; text: string }> = {
  available: { bg: "bg-ir-seat-green", border: "border-ir-seat-green-border", text: "text-[#1d3b22]" },
  unavailable: { bg: "bg-ir-seat-gray", border: "border-ir-seat-gray-border", text: "text-[#85878e]" },
  women: { bg: "bg-ir-seat-pink", border: "border-ir-seat-pink-border", text: "text-[#4d2530]" },
  disabled: { bg: "bg-ir-seat-blue", border: "border-ir-seat-blue-border", text: "text-[#1e3a66]" },
};

function SeatCell({ seat, selected, onClick }: { seat: Seat; selected: boolean; onClick: () => void }) {
  const selectable = seat.status === "available";
  const style = selected
    ? { bg: "bg-ir-blue", border: "border-ir-blue", text: "text-white" }
    : SEAT_STYLES[seat.status];
  const showNumTop = seat.status === "women" || seat.status === "disabled";
  return (
    <div className="flex flex-col items-center">
      {showNumTop && (
        <span className={`mb-[3px] text-[11px] font-bold leading-none ${style.text}`}>{seat.num}</span>
      )}
      <button
        onClick={onClick}
        disabled={!selectable}
        aria-label={`Seat ${seat.num} ${seat.berth}`}
        className={`relative flex h-[46px] w-[62px] flex-col items-center justify-center rounded-[8px] border ${style.bg} ${style.border} ${
          selectable ? "active:scale-95" : ""
        }`}
        style={{ borderRadius: "10px 10px 12px 12px" }}
      >
        {/* headrest notch */}
        <span
          className={`absolute -bottom-[4px] left-1/2 h-[7px] w-[34px] -translate-x-1/2 rounded-[3px] ${
            selected ? "bg-ir-blue-dark" : style.border
          }`}
          style={{ opacity: 0.55 }}
        />
        {showNumTop ? (
          <span className={`text-[10.5px] font-semibold leading-tight ${style.text}`}>{seat.berth}</span>
        ) : (
          <span className={`text-[10.5px] font-semibold leading-[1.3] ${style.text}`}>{seat.berth}</span>
        )}
      </button>
      {!showNumTop && (
        <span className={`mt-[5px] text-[11px] font-bold leading-none ${style.text}`}>{seat.num}</span>
      )}
    </div>
  );
}

export default function SeatSelection() {
  const { pop, resetTo, push, selectedTrain, journeyClass, passengers, setPassengers } = useApp();
  const [coach, setCoach] = useState("S-2");
  const [picked, setPicked] = useState<Seat[]>([]);
  const [autoAssign, setAutoAssign] = useState(false);
  const [withChild, setWithChild] = useState(false);

  const t = TRAINS[selectedTrain ?? 0];
  const cls =
    journeyClass !== "ALL" && t.classes.some((c) => c.code === journeyClass)
      ? journeyClass
      : (t.classes.find((c) => c.state === "available")?.code ?? t.classes[0].code);
  const fare = fareFor(selectedTrain ?? 0, cls);

  const toggleSeat = (s: Seat) =>
    setPicked((p) => (p.some((x) => x.num === s.num) ? p.filter((x) => x.num !== s.num) : p.length < 6 ? [...p, s] : p));

  const hasSelection = picked.length > 0;

  const applySeats = (seats: Seat[]) => {
    const next = passengers.map((p, i) => ({
      ...p,
      coach: seats[i] ? coach : `S-2`,
      seatNo: seats[i] ? seats[i].num : String(12 + i * 8),
      berth: seats[i] ? seats[i].berth : "Lower",
      price: fare,
    }));
    setPassengers(next);
  };

  const proceed = () => {
    applySeats(picked.slice(0, Math.max(passengers.length, 1)));
    push("review");
  };

  const skip = () => {
    applySeats([]);
    push("review");
  };

  return (
    <div className="flex h-full flex-col bg-ir-bg">
      <ScreenHeader
        title="Seat selection"
        onBack={pop}
        right={
          <button
            onClick={() => resetTo("home")}
            aria-label="Close"
            className="-mr-1 flex h-9 w-9 items-center justify-center rounded-full text-ir-text active:bg-black/5"
          >
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        }
      />

      {/* coach selector */}
      <div className="flex shrink-0 items-center justify-center gap-0 px-6 pb-2 pt-1">
        {/* engine */}
        <div className="flex flex-col items-center opacity-100">
          <svg viewBox="0 0 56 26" className="h-[26px] w-[56px]">
            <path d="M4 24V10c0-3 2-6 8-6h20c8 0 16 4 18 10v10Z" fill="#c9cad0" />
            <rect x="10" y="9" width="7" height="5" rx="1.5" fill="#fff" />
            <rect x="21" y="9" width="7" height="5" rx="1.5" fill="#fff" />
            <rect x="32" y="9" width="7" height="5" rx="1.5" fill="#fff" />
          </svg>
          <span className="mt-[3px] text-[10px] font-medium text-[#9a9ca3]">Engine</span>
        </div>
        <div className="mx-[7px] mb-[16px] h-[3px] w-[10px] bg-[#d3d4d9]" />
        {["S-1", "S-2", "S-3"].map((c) => {
          const active = c === coach;
          return (
            <div key={c} className="flex items-center">
              <button onClick={() => setCoach(c)} className="flex flex-col items-center">
                <div
                  className={`flex h-[26px] w-[58px] items-center justify-center gap-[4px] rounded-[6px] ${
                    active ? "bg-ir-blue" : "bg-[#c9cad0]"
                  }`}
                >
                  {[0, 1, 2, 3].map((w) => (
                    <span key={w} className="h-[8px] w-[8px] rounded-[2px] bg-white" />
                  ))}
                </div>
                <span className={`mt-[3px] text-[10px] font-bold ${active ? "text-ir-blue" : "text-[#9a9ca3]"}`}>
                  {c}
                </span>
              </button>
              {c !== "S-3" && <div className="mx-[7px] mb-[16px] h-[3px] w-[10px] bg-[#d3d4d9]" />}
            </div>
          );
        })}
      </div>

      {/* legend */}
      <div className="mx-4 shrink-0 rounded-[13px] border border-ir-border bg-white px-4 py-[12px]">
        <div className="flex flex-wrap gap-x-5 gap-y-[7px]">
          {[
            { label: "Selected", color: "#1e5adb" },
            { label: "Available", color: "#a3d8a1" },
            { label: "Unavailable", color: "#d9dadd" },
          ].map((l) => (
            <span key={l.label} className="flex items-center gap-[7px]">
              <span className="h-[9px] w-[9px] rounded-full" style={{ background: l.color }} />
              <span className="text-[11px] font-medium text-[#3d3e44]">{l.label}</span>
            </span>
          ))}
        </div>
        <div className="mt-[7px] flex flex-wrap gap-x-5">
          {[
            { label: "Reserved for Women's", color: "#fad0dc" },
            { label: "Reserved for Disabled", color: "#bed8f9" },
          ].map((l) => (
            <span key={l.label} className="flex items-center gap-[7px]">
              <span className="h-[9px] w-[9px] rounded-full" style={{ background: l.color }} />
              <span className="text-[11px] font-medium text-[#3d3e44]">{l.label}</span>
            </span>
          ))}
        </div>
      </div>

      {/* seat grid */}
      <div className="no-scrollbar flex-1 overflow-y-auto px-4 pb-3 pt-3">
        <div className="mx-auto w-fit space-y-[16px]">
          {SEAT_ROWS.map((row, ri) => (
            <div key={ri} className="flex items-end gap-[38px]">
              <div className="flex gap-[13px]">
                {row.slice(0, 3).map((s) => (
                  <SeatCell
                    key={s.num}
                    seat={s}
                    selected={picked.some((x) => x.num === s.num)}
                    onClick={() => toggleSeat(s)}
                  />
                ))}
              </div>
              <SeatCell
                seat={row[3]}
                selected={picked.some((x) => x.num === row[3].num)}
                onClick={() => toggleSeat(row[3])}
              />
            </div>
          ))}
        </div>
      </div>

      {/* bottom */}
      {!hasSelection ? (
        <div className="shrink-0 border-t border-ir-border bg-white px-4 py-3">
          <button
            onClick={skip}
            className="h-[50px] w-full rounded-[13px] bg-ir-blue text-[15.5px] font-semibold text-white shadow-[0_8px_20px_rgba(30,90,219,0.25)] active:brightness-95"
          >
            Skip &amp; Auto assign seats
          </button>
        </div>
      ) : (
        <div className="shrink-0 border-t border-ir-border bg-white px-4 pb-3 pt-[10px]">
          <div className="space-y-[7px]">
            <button onClick={() => setAutoAssign(true)} className="flex items-center gap-[9px]">
              <span className="flex h-[16px] w-[16px] items-center justify-center rounded-full border-[1.5px] border-[#c9cad0] bg-white">
                {autoAssign && <span className="h-[8px] w-[8px] rounded-full bg-ir-blue" />}
              </span>
              <span className="text-[12.5px] font-medium text-ir-text">Auto assign seats</span>
            </button>
            <button onClick={() => setWithChild(!withChild)} className="flex items-center gap-[9px]">
              <span className="flex h-[16px] w-[16px] items-center justify-center rounded-full border-[1.5px] border-[#c9cad0] bg-white">
                {withChild && <span className="h-[8px] w-[8px] rounded-full bg-ir-blue" />}
              </span>
              <span className="text-[12.5px] font-medium text-ir-text">
                Traveling with a child below 5 years
              </span>
            </button>
          </div>
          <div className="mt-[10px] space-y-[5px]">
            <div className="flex justify-between">
              <span className="text-[12.5px] text-ir-gray">Seats selected</span>
              <span className="text-[12.5px] font-bold text-ir-text">
                {picked.map((s) => `${coach}-${s.num}`).join(", ")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[12.5px] text-ir-gray">Ticket price</span>
              <span className="text-[12.5px] font-semibold text-ir-text">
                ₹ {fare * Math.max(passengers.length, 1)}
              </span>
            </div>
          </div>
          <button
            onClick={proceed}
            className="mt-[12px] h-[48px] w-full rounded-[13px] bg-ir-blue text-[15.5px] font-semibold text-white shadow-[0_8px_20px_rgba(30,90,219,0.25)] active:brightness-95"
          >
            Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
}
