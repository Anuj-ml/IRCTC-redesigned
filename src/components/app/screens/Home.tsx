"use client";

import { useState } from "react";
import CalendarSheet from "../CalendarSheet";
import ClassSheet from "../ClassSheet";
import { CalendarIcon, ChevronDown, SwapIcon } from "../icons";
import { CLASS_OPTIONS, fmtShort } from "@/lib/data";
import { useApp } from "@/lib/store";

const SERVICES = [
  { icon: "/assets/svc_flight.png", label: "Flight", action: null },
  { icon: "/assets/svc_bus.png", label: "Bus", action: null },
  { icon: "/assets/svc_hotel.png", label: "Hotel", action: null },
  { icon: "/assets/svc_food.png", label: "Food", action: null },
  { icon: "/assets/svc_tourism.png", label: "Tourism", action: null },
  { icon: "/assets/svc_track.png", label: "Track", action: "livetrains" },
  { icon: "/assets/svc_pnr.png", label: "PNR", action: "running" },
  { icon: "/assets/svc_deals.png", label: "Deals", action: null },
] as const;

export default function Home() {
  const push = useApp((s) => s.push);
  const firstName = useApp((s) => s.profile.name.split(" ")[0]);
  const fromStation = useApp((s) => s.fromStation);
  const toStation = useApp((s) => s.toStation);
  const journeyDate = useApp((s) => s.journeyDate);
  const journeyClass = useApp((s) => s.journeyClass);
  const setJourneyDate = useApp((s) => s.setJourneyDate);
  const setJourneyClass = useApp((s) => s.setJourneyClass);
  const swapStations = useApp((s) => s.swapStations);
  const searchTrains = useApp((s) => s.searchTrains);

  const [calOpen, setCalOpen] = useState(false);
  const [clsOpen, setClsOpen] = useState(false);

  const classLabel =
    journeyClass === "ALL"
      ? "All Classes"
      : (() => {
          const opt = CLASS_OPTIONS.find((c) => c.code === journeyClass);
          return opt ? `${opt.code} · ${opt.name}` : journeyClass;
        })();

  return (
    <div className="relative flex h-full flex-col bg-white">
      <div className="no-scrollbar flex-1 overflow-y-auto pb-[120px]">
        {/* greeting */}
        <div className="px-[22px] pt-[64px]">
          <div className="text-[15px] font-extrabold uppercase tracking-[0.12em] text-ir-navy">
            Hello, {firstName}!
          </div>
          <h1 className="mt-[4px] text-[28px] font-extrabold leading-tight text-ir-text">
            Where are you going?
          </h1>
        </div>

        {/* booking card */}
        <div className="mx-5 mt-5 rounded-[26px] bg-ir-lav px-[12px] pb-[14px] pt-[12px]">
          <div className="relative">
            {/* FROM */}
            <button
              className="block w-full rounded-[22px] bg-white px-5 pb-[14px] pt-[11px] text-left active:brightness-[0.98]"
              onClick={() => push("stations", { field: "from" })}
            >
              <span className="block text-[11px] font-medium uppercase tracking-[0.06em] text-ir-label">
                From
              </span>
              <span className="mt-[2px] block truncate text-[17px] font-bold text-ir-text">
                {fromStation ? fromStation.name : "Origin Station"}
              </span>
            </button>

            {/* swap */}
            <button
              aria-label="Swap stations"
              onClick={swapStations}
              className="absolute right-[12px] top-[50px] z-10 flex h-[50px] w-[50px] items-center justify-center rounded-[16px] bg-ir-navy text-white shadow-[0_8px_18px_rgba(2,2,111,0.35)] active:brightness-125"
            >
              <SwapIcon className="h-[21px] w-[21px]" />
            </button>

            {/* TO */}
            <button
              className="mt-[10px] block w-full rounded-[22px] bg-white px-5 pb-[14px] pt-[11px] text-left active:brightness-[0.98]"
              onClick={() => push("stations", { field: "to" })}
            >
              <span className="block text-[11px] font-medium uppercase tracking-[0.06em] text-ir-label">
                To
              </span>
              <span className="mt-[2px] block truncate text-[17px] font-bold text-ir-text">
                {toStation ? toStation.name : "Destination Station"}
              </span>
            </button>
          </div>

          {/* date + class */}
          <div className="mt-[10px] flex gap-[10px]">
            <button
              onClick={() => setCalOpen(true)}
              className="flex flex-1 items-center justify-between rounded-[22px] bg-white px-4 pb-[13px] pt-[10px] text-left active:brightness-[0.98]"
            >
              <span className="min-w-0">
                <span className="block text-[11px] font-medium uppercase tracking-[0.06em] text-ir-label">
                  Travel Date
                </span>
                <span className="mt-[2px] block truncate text-[16px] font-bold text-ir-text">
                  {fmtShort(journeyDate)}
                </span>
              </span>
              <CalendarIcon className="ml-1 h-[21px] w-[21px] shrink-0 text-ir-text" />
            </button>
            <button
              onClick={() => setClsOpen(true)}
              className="flex flex-1 items-center justify-between rounded-[22px] bg-white px-4 pb-[13px] pt-[10px] text-left active:brightness-[0.98]"
            >
              <span className="min-w-0">
                <span className="block text-[11px] font-medium uppercase tracking-[0.06em] text-ir-label">
                  Class
                </span>
                <span className="mt-[2px] block truncate text-[16px] font-bold text-ir-text">
                  {classLabel}
                </span>
              </span>
              <ChevronDown className="ml-1 h-[19px] w-[19px] shrink-0 text-ir-text" />
            </button>
          </div>

          {/* search */}
          <button
            onClick={searchTrains}
            className="mt-[12px] h-[68px] w-full rounded-[25px] bg-ir-coral text-[17.5px] font-bold text-white shadow-[0_8px_22px_rgba(251,83,74,0.28)] active:brightness-95"
          >
            Search Trains
          </button>
        </div>

        {/* offer banner — aligned with the card above */}
        <button className="relative mx-5 mt-5 block h-[128px] w-[calc(100%-40px)] overflow-hidden rounded-[20px] bg-ir-banner text-left active:brightness-[0.98]">
          <div className="relative z-10 py-[17px] pl-[18px]">
            <div className="text-[20.5px] font-extrabold leading-tight text-ir-text">
              Get 10% Off
            </div>
            <div className="mt-[2px] text-[14px] font-medium text-ir-text">
              on AC Tickets this week!
            </div>
            <div className="mt-[9px] text-[14.5px] font-bold text-ir-text underline underline-offset-2">
              Book Now
            </div>
          </div>
          {/* exact train cropped from the design */}
          <img
            src="/assets/banner_train.png"
            alt=""
            className="pointer-events-none absolute bottom-0 right-0 h-full w-auto object-cover object-left"
            draggable={false}
          />
          <div className="absolute bottom-[8px] left-[43%] flex items-center gap-[5px]">
            <span className="h-[6px] w-[6px] rounded-full bg-[#f9f1c9]" />
            <span className="h-[7px] w-[7px] rounded-full bg-ir-coral" />
            <span className="h-[6px] w-[6px] rounded-full bg-[#f9f1c9]" />
          </div>
        </button>

        {/* other services */}
        <div className="mt-6 flex items-center gap-3 px-8">
          <span className="h-px flex-1 bg-[#e4e4ea]" />
          <span className="text-[13.5px] font-bold uppercase tracking-[0.2em] text-ir-text">
            Other Services
          </span>
          <span className="h-px flex-1 bg-[#e4e4ea]" />
        </div>

        <div className="mt-4 grid grid-cols-4 gap-[10px] px-4">
          {SERVICES.map((s) => (
            <button
              key={s.label}
              onClick={() => s.action && push(s.action)}
              className="flex flex-col items-center rounded-[22px] bg-ir-lav pb-[10px] pt-[12px] active:brightness-[0.98]"
            >
              <img
                src={s.icon}
                alt=""
                className="h-[50px] w-[50px] object-contain"
                draggable={false}
              />
              <span className="mt-[6px] text-[14px] font-semibold text-ir-text">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      <CalendarSheet open={calOpen} onClose={() => setCalOpen(false)} selected={journeyDate} onSelect={setJourneyDate} />
      <ClassSheet open={clsOpen} onClose={() => setClsOpen(false)} selected={journeyClass} onSelect={setJourneyClass} />
    </div>
  );
}
