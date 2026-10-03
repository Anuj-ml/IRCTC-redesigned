"use client";

import { useMemo, useState } from "react";
import Sheet from "../Sheet";
import { CalendarIcon, CopyIcon, FilterIcon, SortIcon, SwapHIcon } from "../icons";
import { BOOKINGS } from "@/lib/data";
import { useApp } from "@/lib/store";

const BADGE_STYLES: Record<string, string> = {
  BOOKED: "bg-ir-chip-green text-ir-green",
  CANCELLED: "bg-ir-chip-red text-ir-red",
  COMPLETED: "bg-ir-lav text-ir-text",
};

export default function Bookings() {
  const openBookingDetails = useApp((s) => s.openBookingDetails);
  const [filter, setFilter] = useState<"all" | "BOOKED" | "CANCELLED" | "COMPLETED">("all");
  const [sortOrder, setSortOrder] = useState<"default" | "upcoming">("default");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const list = useMemo(() => {
    let l = [...BOOKINGS];
    if (filter !== "all") l = l.filter((b) => b.status === filter);
    if (sortOrder === "upcoming") l = l.slice().reverse();
    return l;
  }, [filter, sortOrder]);

  const copyPnr = async (pnr: string) => {
    try {
      await navigator.clipboard.writeText(pnr);
    } catch {
      /* clipboard unavailable — still show feedback */
    }
    setToast(`PNR ${pnr} copied`);
    setTimeout(() => setToast(null), 1600);
  };

  return (
    <div className="relative flex h-full flex-col bg-white">
      <div className="no-scrollbar flex-1 overflow-y-auto px-5 pb-[130px] pt-[64px]">
        <div className="text-[14px] font-extrabold uppercase tracking-[0.16em] text-ir-navy">
          My Bookings
        </div>
        <h1 className="mt-[4px] text-[28px] font-extrabold leading-tight text-ir-text">
          Manage Train Tickets
        </h1>

        {/* filter / sort */}
        <div className="mt-5 flex items-center justify-between">
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

        {/* PNR cards */}
        <div className="mt-5 space-y-4">
          {list.map((b, i) => (
            <div
              key={b.pnr + i}
              onClick={() => openBookingDetails(b)}
              className="cursor-pointer rounded-[24px] bg-ir-lav px-[12px] pb-[12px] pt-[10px] transition-transform active:scale-[0.985]"
            >
              <div className="flex items-center justify-center gap-[7px] py-[8px]">
                <CalendarIcon className="h-[15px] w-[15px] text-ir-label" />
                <span className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-ir-label">
                  {b.date}
                </span>
              </div>
              <div className="rounded-[18px] bg-white px-4 pb-[16px] pt-[13px]">
                <div className="flex items-center justify-between">
                  <button
                    onClick={(e) => { e.stopPropagation(); copyPnr(b.pnr); }}
                    className="flex items-center gap-[7px] text-left active:opacity-70"
                  >
                    <span className="text-[15.5px] font-extrabold text-ir-coral">PNR: {b.pnr}</span>
                    <CopyIcon className="h-[15px] w-[15px] text-ir-text" />
                  </button>
                  <span
                    className={`rounded-[8px] px-[10px] py-[6px] text-[11.5px] font-extrabold uppercase tracking-[0.05em] ${BADGE_STYLES[b.status]}`}
                  >
                    {b.status}
                  </span>
                </div>
                <div className="mt-[6px] flex items-center gap-[7px]">
                  <span className="text-[14px] font-extrabold text-ir-text">{b.trainId}</span>
                  <span className="h-[4px] w-[4px] rounded-full bg-[#c9cad1]" />
                  <span className="truncate text-[14px] font-extrabold text-ir-text">{b.trainName}</span>
                </div>
                <div className="mt-[12px] border-t border-dashed border-[#dcdde1] pt-[12px]">
                  <div className="flex items-center">
                    <div className="min-w-0 flex-1">
                      <div className="text-[10.5px] font-medium uppercase tracking-[0.06em] text-ir-label">From</div>
                      <div className="mt-[1px] truncate text-[21px] font-extrabold leading-tight text-ir-text">{b.from.code}</div>
                      <div className="truncate text-[12.5px] font-medium text-[#8c8d93]">{b.from.name}</div>
                    </div>
                    <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-ir-lav text-ir-text">
                      <SwapHIcon className="h-[14px] w-[14px]" />
                    </span>
                    <div className="min-w-0 flex-1 text-right">
                      <div className="text-[10.5px] font-medium uppercase tracking-[0.06em] text-ir-label">To</div>
                      <div className="mt-[1px] truncate text-[21px] font-extrabold leading-tight text-ir-text">{b.to.code}</div>
                      <div className="truncate text-[12.5px] font-medium text-[#8c8d93]">{b.to.name}</div>
                    </div>
                  </div>
                  <div className="mt-[10px] flex items-center justify-center gap-[6px] text-[11px] font-bold uppercase tracking-[0.08em] text-ir-navy">
                    View ticket details
                    <svg viewBox="0 0 12 12" className="h-[10px] w-[10px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m3 1.5 4.5 4.5L3 10.5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* toast */}
      {toast && (
        <div className="pointer-events-none absolute bottom-[120px] left-1/2 z-40 -translate-x-1/2 rounded-full bg-ir-pill px-4 py-[9px] text-[12.5px] font-semibold text-white shadow-lg">
          {toast}
        </div>
      )}

      {/* filter sheet */}
      <Sheet open={filterOpen} onClose={() => setFilterOpen(false)} title="Filter bookings">
        <div className="space-y-3 px-1 pb-2">
          {(["all", "BOOKED", "CANCELLED", "COMPLETED"] as const).map((id) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className={`mt-3 flex w-full items-center justify-between rounded-[18px] px-4 py-[15px] text-left ${
                filter === id ? "border-2 border-ir-navy bg-white" : "bg-ir-lav"
              }`}
            >
              <span className="text-[15px] font-semibold capitalize text-ir-text">
                {id === "all" ? "All bookings" : id.toLowerCase()}
              </span>
              {filter === id && (
                <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-ir-navy">
                  <svg viewBox="0 0 24 24" className="h-3 w-3 text-white" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12.5 4.5 4.5L19 7.5" />
                  </svg>
                </span>
              )}
            </button>
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
              ["default", "Newest first"],
              ["upcoming", "Earliest journey"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setSortOrder(id)}
              className={`mt-3 flex w-full items-center justify-between rounded-[18px] px-4 py-[15px] text-left ${
                sortOrder === id ? "border-2 border-ir-navy bg-white" : "bg-ir-lav"
              }`}
            >
              <span className="text-[15px] font-semibold text-ir-text">{label}</span>
              {sortOrder === id && (
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
    </div>
  );
}
