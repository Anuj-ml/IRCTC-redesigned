"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft } from "./icons";
import { DAYS, MONTHS } from "@/lib/data";

export default function CalendarSheet({
  open,
  onClose,
  selected,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  selected: Date;
  onSelect: (d: Date) => void;
}) {
  const [view, setView] = useState(new Date(selected.getFullYear(), selected.getMonth(), 1));

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const first = new Date(view.getFullYear(), view.getMonth(), 1);
  const startDow = first.getDay();
  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(view.getFullYear(), view.getMonth(), d));

  const sameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  const shift = (n: number) =>
    setView(new Date(view.getFullYear(), view.getMonth() + n, 1));

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 z-40 bg-black/35"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 34 }}
            className="absolute inset-x-0 bottom-0 z-50 rounded-t-[28px] bg-white px-5 pb-9 pt-2"
          >
            <div className="mx-auto mt-2 h-[4px] w-[44px] rounded-full bg-[#dcdbde]" />
            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={() => shift(-1)}
                disabled={view.getFullYear() === today.getFullYear() && view.getMonth() === today.getMonth()}
                aria-label="Previous month"
                className="flex h-9 w-9 items-center justify-center rounded-full text-ir-text active:bg-black/5 disabled:opacity-30"
              >
                <ChevronLeft className="h-[18px] w-[18px]" />
              </button>
              <div className="text-[16.5px] font-extrabold text-ir-text">
                {MONTHS[view.getMonth()]} {view.getFullYear()}
              </div>
              <button
                onClick={() => shift(1)}
                aria-label="Next month"
                className="flex h-9 w-9 items-center justify-center rounded-full text-ir-text active:bg-black/5"
              >
                <ChevronLeft className="h-[18px] w-[18px] rotate-180" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-7 gap-y-[6px] text-center">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <div key={i} className="text-[12px] font-bold uppercase text-ir-label">
                  {d}
                </div>
              ))}
              {cells.map((d, i) => {
                if (!d) return <span key={`e${i}`} />;
                const past = d < today;
                const sel = sameDay(d, selected);
                return (
                  <button
                    key={i}
                    disabled={past}
                    onClick={() => {
                      onSelect(d);
                      onClose();
                    }}
                    className={`mx-auto flex h-[38px] w-[38px] items-center justify-center rounded-full text-[13.5px] transition-colors ${
                      sel
                        ? "bg-ir-navy font-bold text-white"
                        : past
                          ? "text-[#c9cad1]"
                          : "font-semibold text-ir-text active:bg-ir-lav"
                    }`}
                  >
                    {d.getDate()}
                  </button>
                );
              })}
            </div>

            <button
              onClick={onClose}
              className="mt-6 h-[52px] w-full rounded-[20px] bg-ir-coral text-[16px] font-bold text-white active:brightness-95"
            >
              Done
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
