"use client";

import { useState } from "react";
import ScreenHeader from "../ScreenHeader";
import AddPassengerSheet from "../AddPassengerSheet";
import TrainSummary from "../TrainSummary";
import { PlusIcon, MinusIcon } from "../icons";
import { TRAINS, fareFor, fmtHeader } from "@/lib/data";
import { useApp } from "@/lib/store";

export default function Booking() {
  const { pop, push, selectedTrain, fromStation, toStation, journeyDate, journeyClass, passengers, setPassengers } = useApp();
  const [sheet, setSheet] = useState(false);

  const t = TRAINS[selectedTrain ?? 0];
  const cls = journeyClass !== "ALL" && t.classes.some((c) => c.code === journeyClass)
    ? journeyClass
    : (t.classes.find((c) => c.state === "available")?.code ?? t.classes[0].code);
  const fare = fareFor(selectedTrain ?? 0, cls);

  const remove = (i: number) => setPassengers(passengers.filter((_, j) => j !== i));

  return (
    <div className="flex h-full flex-col bg-white">
      <ScreenHeader
        title="Review Journey"
        onBack={pop}
        right={
          <button
            onClick={() => setSheet(true)}
            aria-label="Add passenger"
            className="flex h-9 w-9 items-center justify-center rounded-full text-ir-navy active:bg-black/5"
          >
            <PlusIcon className="h-[19px] w-[19px]" />
          </button>
        }
      />

      <div className="no-scrollbar flex-1 overflow-y-auto px-4 pb-4">
        <TrainSummary
          trainId={t.id}
          trainName={t.name}
          from={fromStation?.code ?? t.from}
          to={toStation?.code ?? t.to}
          dep={t.dep}
          arr={t.arr}
          duration={t.duration}
          cls={cls}
          date={fmtHeader(journeyDate)}
        />

        {/* passengers */}
        <div className="mt-5 flex items-center justify-between px-1">
          <span className="text-[13px] font-bold uppercase tracking-[0.16em] text-ir-label">
            Passengers ({passengers.length})
          </span>
          <button
            onClick={() => setSheet(true)}
            className="flex items-center gap-[6px] text-[13.5px] font-bold text-ir-navy active:opacity-60"
          >
            <PlusIcon className="h-[14px] w-[14px]" />
            Add
          </button>
        </div>

        {passengers.length === 0 && (
          <button
            onClick={() => setSheet(true)}
            className="mx-auto mt-[14px] flex h-[46px] w-[240px] items-center justify-center gap-2 rounded-[20px] bg-ir-navy text-[14.5px] font-bold text-white active:brightness-125"
          >
            <PlusIcon className="h-[16px] w-[16px]" />
            Add New Passenger
          </button>
        )}

        <div className="mt-3 space-y-3">
          {passengers.map((p, i) => (
            <div key={i} className="flex items-center gap-3 rounded-[18px] bg-ir-lav px-4 py-[13px]">
              <span className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-white text-[14px] font-extrabold text-ir-navy">
                {i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[15px] font-bold text-ir-text">{p.name}</span>
                <span className="block text-[12.5px] font-medium text-[#8c8d93]">
                  {p.age} yrs · {p.gender === "M" ? "Male" : p.gender === "F" ? "Female" : "Other"} · {cls}
                </span>
              </span>
              <button
                onClick={() => remove(i)}
                aria-label={`Remove ${p.name}`}
                className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-white text-ir-red active:brightness-95"
              >
                <MinusIcon className="h-[14px] w-[14px]" />
              </button>
            </div>
          ))}
        </div>

        {passengers.length > 0 && (
          <div className="mt-4 flex items-center justify-between rounded-[18px] bg-ir-chip-green px-4 py-[13px]">
            <span className="text-[13.5px] font-semibold text-ir-green">
              {fare.toLocaleString("en-IN")} × {passengers.length} passenger{passengers.length > 1 ? "s" : ""}
            </span>
            <span className="text-[16px] font-extrabold text-ir-green">
              ₹ {(fare * passengers.length).toLocaleString("en-IN")}
            </span>
          </div>
        )}
      </div>

      {/* bottom CTA */}
      <div className="shrink-0 bg-white px-4 pb-6 pt-2">
        <button
          onClick={() => push("seats")}
          disabled={passengers.length === 0}
          className="h-[54px] w-full rounded-[20px] bg-ir-coral text-[16px] font-bold text-white shadow-[0_10px_24px_rgba(251,83,74,0.3)] active:brightness-95 disabled:opacity-45 disabled:shadow-none"
        >
          Proceed to Seat Selection
        </button>
      </div>

      <AddPassengerSheet open={sheet} onClose={() => setSheet(false)} cls={cls} fare={fare} />
    </div>
  );
}
