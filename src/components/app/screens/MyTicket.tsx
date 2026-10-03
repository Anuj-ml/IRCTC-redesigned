"use client";

import { useState } from "react";
import ScreenHeader from "../ScreenHeader";
import { QrIcon, DownloadIcon } from "../icons";
import { downloadTicketPng, bookingToTicket } from "@/lib/downloadTicket";
import { useApp } from "@/lib/store";

export default function MyTicket() {
  const { pop, resetTo, selectedTrain, passengers } = useApp();
  const profile = useApp((s) => s.profile);
  const [view, setView] = useState<"ticket" | "qr">("ticket");
  const [saved, setSaved] = useState(false);

  const idx = selectedTrain ?? 0;
  const ticket = bookingToTicket(idx, passengers.length ? passengers : FALLBACK_PAX.map((p) => ({ ...p, name: profile.name })), passengers.length ? passengers.reduce((s, p) => s + p.price, 0) + 80 : 2480);

  const save = () => {
    downloadTicketPng(ticket);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (view === "qr") {
    return (
      <div className="flex h-full flex-col bg-white">
        <ScreenHeader title="E-Ticket · QR" onBack={() => setView("ticket")} />
        <div className="flex flex-1 flex-col items-center justify-center px-8 pb-10">
          <div className="rounded-[26px] bg-white p-6 shadow-[0_14px_34px_rgba(12,13,20,0.08)]">
            <img src="/assets/qr.png" alt="Ticket QR" className="h-[190px] w-[190px] object-contain" draggable={false} />
          </div>
          <p className="mt-5 max-w-[260px] text-center text-[13.5px] font-medium leading-relaxed text-[#6d6f76]">
            Show this QR at the station. PNR <span className="font-bold text-ir-text">{ticket.pnr}</span>
          </p>
        </div>
        <div className="shrink-0 px-5 pb-7">
          <button
            onClick={() => resetTo("home")}
            className="h-[54px] w-full rounded-[20px] bg-ir-navy text-[16px] font-bold text-white active:brightness-125"
          >
            Back home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-white">
      <ScreenHeader title="E-Ticket" onBack={pop} />

      <div className="no-scrollbar flex-1 overflow-y-auto px-4 pb-4">
        <div className="ticket-notch rounded-[24px] bg-ir-lav px-4 pb-5 pt-4">
          {/* header */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-ir-label">PNR</div>
              <div className="text-[19px] font-extrabold text-ir-coral">{ticket.pnr}</div>
            </div>
            <span className="rounded-[8px] bg-ir-chip-green px-[10px] py-[6px] text-[11.5px] font-extrabold uppercase text-ir-green">
              Confirmed
            </span>
          </div>

          {/* journey */}
          <div className="mt-4 flex items-center rounded-[18px] bg-white px-4 py-[14px]">
            <div className="min-w-0 flex-1">
              <div className="text-[20px] font-extrabold leading-none text-ir-text">{ticket.from}</div>
              <div className="mt-[3px] text-[12px] font-medium text-[#8c8d93]">Boarding</div>
            </div>
            <div className="flex-1 px-2 text-center">
              <div className="text-[11px] font-semibold text-[#8c8d93]">{ticket.trainName}</div>
              <div className="my-[4px] flex items-center gap-1">
                <span className="h-px flex-1 bg-[#dcdde1]" />
                <svg viewBox="0 0 24 24" className="h-[13px] w-[13px] text-ir-navy" fill="currentColor">
                  <path d="M12 2 4 8v8l8 6 8-6V8l-8-6Zm0 5.4 4.2 2.1v3L12 14.6l-4.2-2.1v-3L12 7.4Z" />
                </svg>
                <span className="h-px flex-1 bg-[#dcdde1]" />
              </div>
              <div className="text-[11px] font-bold text-ir-text">{String(ticket.date.getDate()).padStart(2, "0")} May 2026</div>
            </div>
            <div className="min-w-0 flex-1 text-right">
              <div className="text-[20px] font-extrabold leading-none text-ir-text">{ticket.to}</div>
              <div className="mt-[3px] text-[12px] font-medium text-[#8c8d93]">Destination</div>
            </div>
          </div>

          {/* passengers */}
          <div className="mt-3 space-y-[8px]">
            {ticket.passengers.map((p, i) => (
              <div key={i} className="flex items-center gap-3 rounded-[16px] bg-white px-[14px] py-[11px]">
                <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-ir-lav text-[12.5px] font-extrabold text-ir-navy">
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px] font-bold text-ir-text">{p.name}</span>
                  <span className="block text-[11.5px] font-medium text-[#8c8d93]">
                    {p.age} yrs · {p.gender === "M" ? "Male" : p.gender === "F" ? "Female" : "Other"}
                  </span>
                </span>
                <span className="text-right">
                  <span className="block text-[12.5px] font-extrabold text-ir-green">CNF</span>
                  <span className="block text-[11.5px] font-semibold text-ir-text">{p.coach}/{p.seatNo}</span>
                </span>
              </div>
            ))}
          </div>

          {/* fare + ids */}
          <div className="mt-3 flex items-center justify-between rounded-[16px] bg-white px-[14px] py-[12px]">
            <div>
              <div className="text-[10.5px] font-bold uppercase tracking-[0.08em] text-ir-label">Total paid</div>
              <div className="text-[16px] font-extrabold text-ir-text">₹ {ticket.fare.toLocaleString("en-IN")}</div>
            </div>
            <div className="text-right">
              <div className="text-[10.5px] font-bold uppercase tracking-[0.08em] text-ir-label">Class · Quota</div>
              <div className="text-[14px] font-extrabold text-ir-text">{ticket.cls} · {ticket.quota}</div>
            </div>
          </div>

          {/* barcode */}
          <div className="mt-3 rounded-[16px] bg-white px-[14px] pb-[12px] pt-[14px]">
            <img
              src="/assets/barcode.png"
              alt="Ticket barcode"
              className="h-[44px] w-full object-fill"
              draggable={false}
            />
            <div className="mt-[6px] text-center text-[10.5px] font-bold uppercase tracking-[0.32em] text-ir-label">
              {ticket.pnr}
            </div>
          </div>
        </div>

        {/* actions row */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            onClick={() => setView("qr")}
            className="flex h-[46px] items-center justify-center gap-2 rounded-[16px] border-[1.5px] border-[#e3e3e9] bg-white text-[14px] font-bold text-ir-navy active:bg-ir-lav"
          >
            <QrIcon className="h-[17px] w-[17px]" />
            View QR
          </button>
          <button
            onClick={save}
            className="flex h-[46px] items-center justify-center gap-2 rounded-[16px] border-[1.5px] border-[#e3e3e9] bg-white text-[14px] font-bold text-ir-navy active:bg-ir-lav"
          >
            <DownloadIcon className="h-[17px] w-[17px]" />
            {saved ? "Saved!" : "Save PNG"}
          </button>
        </div>
      </div>

      <div className="shrink-0 bg-white px-5 pb-7 pt-2">
        <div className="flex gap-3">
          <button
            onClick={save}
            className="h-[52px] flex-1 rounded-[20px] bg-ir-coral text-[15px] font-bold text-white shadow-[0_10px_24px_rgba(251,83,74,0.3)] active:brightness-95"
          >
            Download ticket
          </button>
          <button
            onClick={() => resetTo("home")}
            className="h-[52px] flex-1 rounded-[20px] border-[1.5px] border-[#e3e3e9] bg-white text-[15px] font-bold text-ir-text active:bg-ir-lav"
          >
            Back home
          </button>
        </div>
      </div>
    </div>
  );
}

const FALLBACK_PAX = [
  { name: "Anuj Jha", age: "24", gender: "M" as const, berth: "Lower", seatNo: "12", coach: "B4", price: 2400 },
];
