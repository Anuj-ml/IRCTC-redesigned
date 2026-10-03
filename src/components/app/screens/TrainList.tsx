"use client";

import { useMemo, useState } from "react";
import Sheet from "../Sheet";
import CalendarSheet from "../CalendarSheet";
import {
  CalendarIcon,
  ChevronLeft,
  FilterIcon,
  HeartIcon,
  SortIcon,
  SwapHIcon,
} from "../icons";
import { TRAINS, fmtHeader, type Train } from "@/lib/data";
import { useApp } from "@/lib/store";

function ClassChip({ code, price, status, state }: { code: string; price: number; status: string; state: string }) {
  const isAvail = state === "available";
  const isWl = state === "waitlist";
  const bg = isAvail ? "bg-ir-chip-green" : isWl ? "bg-ir-chip-amber" : "bg-ir-chip-red";
  const statusColor = isAvail ? "text-ir-green" : isWl ? "text-ir-amber" : "text-ir-red";
  return (
    <div className={`min-w-0 flex-1 rounded-[16px] ${bg} px-[10px] pb-[8px] pt-[7px]`}>
      {state === "unavailable" ? (
        <>
          <div className="text-[13px] font-bold text-ir-text">{code}</div>
          <div className={`mt-[2px] text-[12.5px] font-semibold leading-none ${statusColor}`}>
            Not AVL
          </div>
        </>
      ) : (
        <>
          <div className="flex items-baseline gap-[5px] whitespace-nowrap">
            <span className="text-[13px] font-bold text-ir-text">{code}</span>
            <span className="text-[9px] text-ir-text">•</span>
            <span className={`text-[12px] font-bold ${statusColor}`}>{status}</span>
          </div>
          <div className="mt-[3px] text-[13px] font-semibold text-ir-text">₹{price.toLocaleString("en-IN")}</div>
        </>
      )}
    </div>
  );
}

function TrainCard({ t, idx }: { t: Train; idx: number }) {
  const { push, selectTrain, favs, toggleFav } = useApp();
  const fav = !!favs[idx];
  return (
    <div
      onClick={() => { selectTrain(idx); push("booking"); }}
      className="cursor-pointer rounded-[24px] bg-ir-lav px-[12px] pb-[14px] pt-[12px] active:brightness-[0.99]"
    >
      <div className="flex items-start justify-between px-[6px]">
        {t.badge ? (
          <span
            className={`rounded-[8px] px-[10px] py-[5px] text-[11.5px] font-extrabold uppercase tracking-[0.06em] ${
              t.badge === "FASTEST"
                ? "bg-ir-badge-yellow text-ir-badge-yellow-text"
                : "bg-ir-badge-blue text-ir-badge-blue-text"
            }`}
          >
            {t.badge}
          </span>
        ) : (
          <span />
        )}
        <button
          onClick={(e) => { e.stopPropagation(); toggleFav(idx); }}
          aria-label="Favorite"
          className={`-mt-[2px] p-1 ${fav ? "text-ir-coral" : "text-[#3d3e44]"} active:scale-90`}
        >
          <HeartIcon className="h-[21px] w-[21px]" filled={fav} />
        </button>
      </div>
      <div className="mt-[6px] flex items-center gap-[8px] px-[6px]">
        <span className="text-[18px] font-extrabold text-ir-text">{t.id}</span>
        <span className="h-[5px] w-[5px] rounded-full bg-[#c9cad1]" />
        <span className="truncate text-[17px] font-extrabold text-ir-text">{t.name}</span>
      </div>

      {/* time card */}
      <div className="mt-[12px] rounded-[18px] bg-white px-4 pb-[13px] pt-[12px]">
        <div className="flex items-center">
          <div className="w-[86px] shrink-0">
            <div className="text-[22px] font-extrabold leading-none text-ir-text">{t.dep}</div>
            <div className="mt-[5px] text-[13.5px] font-medium text-[#8c8d93]">{t.from}</div>
          </div>
          <div className="flex flex-1 items-center px-1">
            <span className="h-px flex-1 bg-[#dcdde1]" />
            <span className="px-[8px] text-[12.5px] font-semibold text-ir-text">{t.duration}</span>
            <span className="h-px flex-1 bg-[#dcdde1]" />
          </div>
          <div className="w-[86px] shrink-0 text-right">
            <div className="text-[22px] font-extrabold leading-none text-ir-text">{t.arr}</div>
            <div className="mt-[5px] text-[13.5px] font-medium text-[#8c8d93]">{t.to}</div>
          </div>
        </div>
      </div>

      {/* class chips */}
      <div className="mt-[10px] flex gap-[9px]">
        {t.classes.map((c, j) => (
          <ClassChip key={j} code={c.code} price={c.price} status={c.status} state={c.state} />
        ))}
      </div>
    </div>
  );
}

export default function TrainList() {
  const { pop, fromStation, toStation, journeyDate, setJourneyDate, favs } = useApp();
  const [calOpen, setCalOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [acOnly, setAcOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"default" | "departure" | "duration" | "price">("default");

  const trains = useMemo(() => {
    let list = [...TRAINS];
    if (availableOnly) list = list.filter((t) => t.classes.some((c) => c.state === "available"));
    if (acOnly) list = list.filter((t) => t.classes.some((c) => ["3A", "2A", "1A", "3E", "CC", "EC"].includes(c.code)));
    if (sortBy === "duration") list.sort((a, b) => a.duration.localeCompare(b.duration));
    else if (sortBy === "price") list.sort((a, b) => (a.classes[0]?.price ?? 0) - (b.classes[0]?.price ?? 0));
    else if (sortBy === "departure") list.sort((a, b) => a.dep.localeCompare(b.dep));
    return list;
  }, [availableOnly, acOnly, sortBy]);

  return (
    <div className="flex h-full flex-col bg-white">
      {/* back */}
      <div className="flex items-center px-5 pb-3 pt-6">
        <button onClick={pop} aria-label="Back" className="flex items-center gap-[10px] text-ir-text active:opacity-60">
          <ChevronLeft className="h-[22px] w-[22px]" />
          <span className="text-[17px] font-extrabold uppercase tracking-[0.1em] text-ir-text">Back</span>
        </button>
      </div>

      <div className="no-scrollbar flex-1 overflow-y-auto px-4 pb-6">
        {/* route header */}
        <button
          onClick={() => setCalOpen(true)}
          className="block w-full rounded-[24px] bg-ir-lav px-[12px] pb-[12px] pt-[12px] text-left active:brightness-[0.99]"
        >
          <div className="flex items-center justify-center gap-[8px] py-[6px]">
            <CalendarIcon className="h-[16px] w-[16px] text-ir-navy" />
            <span className="text-[14.5px] font-extrabold uppercase tracking-[0.14em] text-ir-navy">
              {fmtHeader(journeyDate)}
            </span>
          </div>
          <div className="mt-[6px] rounded-[18px] bg-white px-4 pb-[16px] pt-[13px]">
            <div className="flex items-center">
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-medium uppercase tracking-[0.06em] text-ir-label">From</div>
                <div className="mt-[1px] truncate text-[24px] font-extrabold leading-tight text-ir-text">
                  {fromStation?.code ?? "NDLS"}
                </div>
                <div className="truncate text-[13.5px] font-medium text-[#8c8d93]">
                  {fromStation?.name ?? "New Delhi"}
                </div>
              </div>
              <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-ir-lav text-ir-text">
                <SwapHIcon className="h-[15px] w-[15px]" />
              </span>
              <div className="min-w-0 flex-1 text-right">
                <div className="text-[11px] font-medium uppercase tracking-[0.06em] text-ir-label">To</div>
                <div className="mt-[1px] truncate text-[24px] font-extrabold leading-tight text-ir-text">
                  {toStation?.code ?? "BCT"}
                </div>
                <div className="truncate text-[13.5px] font-medium text-[#8c8d93]">
                  {toStation?.name ?? "Mumbai Central"}
                </div>
              </div>
            </div>
          </div>
        </button>

        {/* available trains divider */}
        <div className="mt-5 flex items-center gap-3 px-4">
          <span className="h-px flex-1 bg-[#e4e4ea]" />
          <span className="text-[13px] font-bold uppercase tracking-[0.18em] text-ir-text">
            Available Trains
          </span>
          <span className="h-px flex-1 bg-[#e4e4ea]" />
        </div>

        {/* filter / sort */}
        <div className="mt-4 flex items-center justify-between px-1">
          <button
            onClick={() => setFilterOpen(true)}
            className="flex h-[44px] items-center gap-2 rounded-[15px] border-[1.5px] border-[#e3e3e9] bg-white px-4 text-[15px] font-bold text-ir-text active:bg-ir-lav"
          >
            <FilterIcon className="h-[17px] w-[17px]" />
            Filter
          </button>
          <button
            onClick={() => setSortOpen(true)}
            className="flex h-[44px] items-center gap-2 rounded-[15px] border-[1.5px] border-[#e3e3e9] bg-white px-4 text-[15px] font-bold text-ir-text active:bg-ir-lav"
          >
            <SortIcon className="h-[17px] w-[17px]" />
            Sort By
          </button>
        </div>

        {/* train cards */}
        <div className="mt-4 space-y-4">
          {trains.map((t) => (
            <TrainCard key={t.id} t={t} idx={TRAINS.indexOf(t)} />
          ))}
          {favs[0] && <span className="hidden" />}
        </div>
      </div>

      {/* filter sheet */}
      <Sheet open={filterOpen} onClose={() => setFilterOpen(false)} title="Filter trains">
        <div className="space-y-3 px-1 pb-2">
          {[
            { label: "Available only", v: availableOnly, set: setAvailableOnly },
            { label: "AC classes only", v: acOnly, set: setAcOnly },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between rounded-[18px] bg-ir-lav px-4 py-[14px]">
              <span className="text-[15px] font-semibold text-ir-text">{row.label}</span>
              <button
                aria-label={`Toggle ${row.label}`}
                onClick={() => row.set(!row.v)}
                className={`relative h-[24px] w-[42px] rounded-full transition-colors ${
                  row.v ? "bg-ir-navy" : "bg-[#dcdbde]"
                }`}
              >
                <span
                  className={`absolute top-[2px] h-[20px] w-[20px] rounded-full bg-white shadow transition-all ${
                    row.v ? "left-[20px]" : "left-[2px]"
                  }`}
                />
              </button>
            </div>
          ))}
          <button
            onClick={() => setFilterOpen(false)}
            className="mt-6 h-[52px] w-full rounded-[20px] bg-ir-coral text-[16px] font-bold text-white active:brightness-95"
          >
            Apply
          </button>
        </div>
      </Sheet>

      {/* sort sheet */}
      <Sheet open={sortOpen} onClose={() => setSortOpen(false)} title="Sort by">
        <div className="space-y-3 px-1 pb-2">
          {(
            [
              ["default", "Recommended"],
              ["departure", "Departure time"],
              ["duration", "Duration"],
              ["price", "Price (lowest first)"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setSortBy(id)}
              className={`mt-3 flex w-full items-center justify-between rounded-[18px] px-4 py-[15px] text-left ${
                sortBy === id ? "border-2 border-ir-navy bg-white" : "bg-ir-lav"
              }`}
            >
              <span className="text-[15px] font-semibold text-ir-text">{label}</span>
              {sortBy === id && (
                <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-ir-navy">
                  <svg viewBox="0 0 24 24" className="h-3 w-3 text-white" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12.5 4.5 4.5L19 7.5" />
                  </svg>
                </span>
              )}
            </button>
          ))}
          <button
            onClick={() => setSortOpen(false)}
            className="mt-6 h-[52px] w-full rounded-[20px] bg-ir-coral text-[16px] font-bold text-white active:brightness-95"
          >
            Done
          </button>
        </div>
      </Sheet>

      <CalendarSheet open={calOpen} onClose={() => setCalOpen(false)} selected={journeyDate} onSelect={setJourneyDate} />
    </div>
  );
}
