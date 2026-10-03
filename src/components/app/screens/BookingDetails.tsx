"use client";

import { useState } from "react";
import ScreenHeader from "../ScreenHeader";
import { CheckIcon } from "../icons";
import { BOOKINGS, TRAINS, fareFor } from "@/lib/data";
import { useApp } from "@/lib/store";

/* Full ticket-detail screen opened by tapping a booking card in My Bookings.
   Shows everything about that PNR: journey, class/quota, per-passenger status,
   fare, boarding info + contextual actions (e-ticket / cancel / refund). */

const CLASS_FARE: Record<string, number> = { "1A": 2600, "2A": 2870, "3A": 2400, "3E": 1510, SL: 615, CC: 1215, "2S": 385 };

function pnrSeats(pnr: string, coach: string, count: number) {
  /* deterministic pseudo seat numbers from the PNR (stable per booking) */
  const base = parseInt(pnr.slice(-3), 10);
  return Array.from({ length: count }, (_, i) => {
    const n = ((base + i * 7) % 72) + 1;
    const berth = ["Lower", "Middle", "Upper", "Side Lower"][(n + i) % 4];
    return { seat: String(n).padStart(2, "0"), berth };
  });
}

export default function BookingDetails() {
  const { pop, openBooking, profile } = useApp();
  const b = openBooking ?? BOOKINGS[0];
  const [cancelAsk, setCancelAsk] = useState(false);
  const [cancelDone, setCancelDone] = useState(false);

  const train = TRAINS.find((t) => t.id === b.trainId);
  const duration = train?.duration ?? "--";
  const dep = train?.dep ?? "--";
  const arr = train?.arr ?? "--";
  const fare = CLASS_FARE[b.cls] ?? fareFor(0, b.cls);
  const total = fare * b.passengers.length;
  const seats = pnrSeats(b.pnr, b.coach, b.passengers.length);

  const perPaxStatus =
    b.status === "CANCELLED" ? "CAN" : b.status === "COMPLETED" ? "CNF" : "CNF";

  const badgeCls =
    b.status === "BOOKED"
      ? "bg-ir-chip-green text-ir-green"
      : b.status === "CANCELLED"
        ? "bg-ir-chip-red text-ir-red"
        : "bg-ir-lav text-ir-text";

  return (
    <div className="flex h-full flex-col bg-white">
      <ScreenHeader title="Booking details" onBack={pop} />

      <div className="no-scrollbar flex-1 overflow-y-auto px-4 pb-4">
        <div className="ticket-notch rounded-[24px] bg-ir-lav px-4 pb-5 pt-4">
          {/* PNR + status */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-ir-label">PNR</div>
              <div className="text-[19px] font-extrabold text-ir-coral">{b.pnr}</div>
            </div>
            <span className={`rounded-[8px] px-[10px] py-[6px] text-[11.5px] font-extrabold uppercase ${badgeCls}`}>
              {b.status}
            </span>
          </div>

          {/* train row */}
          <div className="mt-3 flex items-center gap-[7px] rounded-[14px] bg-white/70 px-3 py-[9px]">
            <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] shrink-0 text-ir-navy" fill="currentColor">
              <path d="M12 2c-3.6 0-7 .6-7 3.5v9c0 1.5 1.1 2.7 2.5 2.9L6 19v1h2l2-2h4l2 2h2v-1l-1.5-1.6c1.4-.2 2.5-1.4 2.5-2.9v-9C19 2.6 15.6 2 12 2ZM8.5 4.5h7c.8 0 1.5.7 1.5 1.5v3H7V6c0-.8.7-1.5 1.5-1.5ZM8 13.5A1.5 1.5 0 1 1 8 10.5a1.5 1.5 0 0 1 0 3Zm8 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
            </svg>
            <span className="text-[13.5px] font-extrabold text-ir-text">
              {b.trainId} · {b.trainName}
            </span>
            <span className="ml-auto text-[12px] font-bold text-ir-label">{duration}</span>
          </div>

          {/* journey */}
          <div className="mt-3 flex items-center rounded-[18px] bg-white px-4 py-[14px]">
            <div className="min-w-0 flex-1">
              <div className="text-[20px] font-extrabold leading-none text-ir-text">{dep}</div>
              <div className="mt-[3px] truncate text-[15px] font-extrabold text-ir-text">{b.from.code}</div>
              <div className="truncate text-[11.5px] font-medium text-[#8c8d93]">{b.from.name}</div>
            </div>
            <div className="flex-1 px-2 text-center">
              <div className="text-[11px] font-semibold text-[#8c8d93]">{b.date.slice(0, 12)}</div>
              <div className="my-[4px] flex items-center gap-1">
                <span className="h-px flex-1 bg-[#dcdde1]" />
                <svg viewBox="0 0 24 24" className="h-[13px] w-[13px] text-ir-navy" fill="currentColor">
                  <path d="M12 2 4 8v8l8 6 8-6V8l-8-6Zm0 5.4 4.2 2.1v3L12 14.6l-4.2-2.1v-3L12 7.4Z" />
                </svg>
                <span className="h-px flex-1 bg-[#dcdde1]" />
              </div>
              <div className="text-[11px] font-bold text-ir-text">{b.quota} Quota</div>
            </div>
            <div className="min-w-0 flex-1 text-right">
              <div className="text-[20px] font-extrabold leading-none text-ir-text">{arr}</div>
              <div className="mt-[3px] truncate text-[15px] font-extrabold text-ir-text">{b.to.code}</div>
              <div className="truncate text-[11.5px] font-medium text-[#8c8d93]">{b.to.name}</div>
            </div>
          </div>

          {/* class / coach / pax */}
          <div className="mt-3 grid grid-cols-3 gap-[8px]">
            {[
              ["Class", b.cls],
              ["Coach", b.coach],
              ["Passengers", String(b.passengers.length)],
            ].map(([l, v]) => (
              <div key={l} className="rounded-[14px] bg-white px-3 py-[10px] text-center">
                <div className="text-[10px] font-bold uppercase tracking-[0.08em] text-ir-label">{l}</div>
                <div className="mt-[2px] text-[15px] font-extrabold text-ir-text">{v}</div>
              </div>
            ))}
          </div>

          {/* passengers */}
          <div className="mt-3 space-y-[8px]">
            {b.passengers.map((name, i) => (
              <div key={i} className="flex items-center gap-3 rounded-[16px] bg-white px-[14px] py-[11px]">
                <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-ir-lav text-[12.5px] font-extrabold text-ir-navy">
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px] font-bold text-ir-text">{name}</span>
                  <span className="block text-[11.5px] font-medium text-[#8c8d93]">
                    {seats[i].berth} · {b.coach}/{seats[i].seat}
                  </span>
                </span>
                {b.status === "CANCELLED" ? (
                  <span className="rounded-[8px] bg-ir-chip-red px-[9px] py-[5px] text-[11px] font-extrabold text-ir-red">
                    CAN
                  </span>
                ) : (
                  <span className="rounded-[8px] bg-ir-chip-green px-[9px] py-[5px] text-[11px] font-extrabold text-ir-green">
                    {perPaxStatus}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* fare */}
          <div className="mt-3 flex items-center justify-between rounded-[16px] bg-white px-[14px] py-[12px]">
            <div>
              <div className="text-[10.5px] font-bold uppercase tracking-[0.08em] text-ir-label">
                {b.status === "CANCELLED" ? "Refund processed" : "Total fare"}
              </div>
              <div className="text-[16px] font-extrabold text-ir-text">
                ₹ {(b.status === "CANCELLED" ? Math.round(total * 0.905) : total).toLocaleString("en-IN")}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10.5px] font-bold uppercase tracking-[0.08em] text-ir-label">Booked by</div>
              <div className="text-[13.5px] font-extrabold text-ir-text">{profile.name.split(" ")[0]}</div>
            </div>
          </div>

          {b.status === "CANCELLED" && (
            <div className="mt-3 rounded-[14px] bg-ir-chip-red px-4 py-[11px]">
              <p className="text-[11.5px] font-semibold leading-relaxed text-ir-red">
                Ticket cancelled on 15 May 2026. Refund of ₹{Math.round(total * 0.905).toLocaleString("en-IN")} (after ₹{total - Math.round(total * 0.905)} cancellation charges) was sent to your IRCTC e-Wallet.
              </p>
            </div>
          )}
        </div>

        {/* actions */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          {b.status === "BOOKED" ? (
            <>
              <button
                onClick={() => useApp.getState().push("ticket")}
                className="flex h-[46px] items-center justify-center gap-2 rounded-[16px] bg-ir-navy text-[14px] font-bold text-white active:brightness-125"
              >
                View E-Ticket
              </button>
              <button
                onClick={() => setCancelAsk(true)}
                className="flex h-[46px] items-center justify-center gap-2 rounded-[16px] border-[1.5px] border-[#e3e3e9] bg-white text-[14px] font-bold text-ir-red active:bg-ir-lav"
              >
                Cancel Ticket
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => useApp.getState().push("running")}
                className="flex h-[46px] items-center justify-center gap-2 rounded-[16px] border-[1.5px] border-[#e3e3e9] bg-white text-[14px] font-bold text-ir-navy active:bg-ir-lav"
              >
                {b.status === "COMPLETED" ? "Travel history" : "PNR status"}
              </button>
              <button
                onClick={() => useApp.getState().push("chat", { question: "How can I cancel my ticket?" })}
                className="flex h-[46px] items-center justify-center gap-2 rounded-[16px] border-[1.5px] border-[#e3e3e9] bg-white text-[14px] font-bold text-ir-navy active:bg-ir-lav"
              >
                Need help
              </button>
            </>
          )}
        </div>
      </div>

      {/* cancel confirm */}
      {cancelAsk && (
        <div className="absolute inset-0 z-50 flex items-end bg-black/35 px-5 pb-10" onClick={() => setCancelAsk(false)}>
          <div className="w-full rounded-[26px] bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="text-[19px] font-extrabold text-ir-text">Cancel this ticket?</div>
            <p className="mt-[6px] text-[14px] font-medium leading-relaxed text-[#6d6f76]">
              PNR {b.pnr} · {b.passengers.length} passenger{b.passengers.length > 1 ? "s" : ""} · {b.cls} class. Cancellation charges apply and the refund reaches your account in 3–7 working days.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setCancelAsk(false)}
                className="h-[48px] flex-1 rounded-[20px] border-[1.5px] border-[#e3e3e9] bg-white text-[15px] font-bold text-ir-text active:bg-ir-lav"
              >
                Keep ticket
              </button>
              <button
                onClick={() => { setCancelAsk(false); setCancelDone(true); }}
                className="h-[48px] flex-1 rounded-[20px] bg-ir-coral text-[15px] font-bold text-white active:brightness-95"
              >
                Cancel ticket
              </button>
            </div>
          </div>
        </div>
      )}

      {/* cancel done */}
      {cancelDone && (
        <div className="absolute inset-0 z-50 flex items-end bg-black/35 px-5 pb-10">
          <div className="w-full rounded-[26px] bg-white p-6 text-center shadow-2xl">
            <span className="mx-auto flex h-[46px] w-[46px] items-center justify-center rounded-full bg-ir-chip-green text-ir-green">
              <CheckIcon className="h-[21px] w-[21px]" />
            </span>
            <div className="mt-3 text-[18px] font-extrabold text-ir-text">Cancellation requested</div>
            <p className="mt-[6px] text-[13.5px] font-medium leading-relaxed text-[#6d6f76]">
              PNR {b.pnr} cancelled. Refund of ₹{Math.round(total * 0.905).toLocaleString("en-IN")} will be processed in 3–7 working days.
            </p>
            <button
              onClick={() => { setCancelDone(false); pop(); }}
              className="mt-5 h-[48px] w-full rounded-[20px] bg-ir-coral text-[15px] font-bold text-white active:brightness-95"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
