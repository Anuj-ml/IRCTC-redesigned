"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft } from "./icons";
import { DAYS, MONTHS } from "@/lib/data";

/* Date-of-birth picker per IRCTC-style UX: pick the YEAR first (scrollable grid),
   then the day+month on a calendar grid for the chosen year. */
export default function DobSheet({
  open,
  onClose,
  value,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  value: string; // "14 Aug 1999"
  onSelect: (dob: string) => void;
}) {
  const parsed = useMemo(() => {
    const m = value.match(/^(\d{1,2}) (\w{3}) (\d{4})$/);
    if (!m) return { d: 14, mIdx: 7, y: 1999 };
    return { d: parseInt(m[1], 10), mIdx: MONTHS.indexOf(m[2]), y: parseInt(m[3], 10) };
  }, [value]);

  const [step, setStep] = useState<"year" | "date">("year");
  const [year, setYear] = useState(parsed.y);
  const [month, setMonth] = useState(parsed.mIdx);
  const [day, setDay] = useState<number | null>(parsed.d);

  const YEARS = useMemo(() => Array.from({ length: 76 }, (_, i) => 1950 + i), []);

  const openSheet = (o: boolean) => {
    if (o) {
      setStep("year");
      setYear(parsed.y);
      setMonth(parsed.mIdx);
      setDay(parsed.d);
    }
    onClose();
  };

  const first = new Date(year, month, 1);
  const startDow = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array.from({ length: startDow }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const confirm = () => {
    if (day) onSelect(`${String(day).padStart(2, "0")} ${MONTHS[month]} ${year}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => openSheet(false)}
            className="absolute inset-0 z-40 bg-black/35"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 34 }}
            className="absolute inset-x-0 bottom-0 z-50 max-h-[86%] rounded-t-[28px] bg-white px-5 pb-9 pt-2"
          >
            <div className="mx-auto mt-2 h-[4px] w-[44px] rounded-full bg-[#dcdbde]" />

            {step === "year" ? (
              <>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="text-[16.5px] font-extrabold text-ir-text">Select year</div>
                    <div className="text-[12px] font-medium text-[#8c8d93]">Step 1 of 2 · year of birth</div>
                  </div>
                  <span className="rounded-[9px] bg-ir-chip-green px-3 py-[5px] text-[11px] font-bold text-ir-green">
                    {year}
                  </span>
                </div>
                <div className="no-scrollbar mt-4 max-h-[330px] overflow-y-auto pr-1">
                  <div className="grid grid-cols-4 gap-[9px]">
                    {YEARS.map((y) => (
                      <button
                        key={y}
                        onClick={() => setYear(y)}
                        className={`h-[40px] rounded-[12px] text-[14px] font-bold transition-colors ${
                          y === year
                            ? "bg-ir-navy text-white"
                            : "bg-ir-lav text-ir-text active:brightness-[0.98]"
                        }`}
                      >
                        {y}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setStep("date")}
                  className="mt-5 h-[52px] w-full rounded-[20px] bg-ir-coral text-[16px] font-bold text-white active:brightness-95"
                >
                  Next · pick date
                </button>
              </>
            ) : (
              <>
                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() => setStep("year")}
                    className="flex items-center gap-[6px] text-[13.5px] font-bold text-ir-navy active:opacity-60"
                    aria-label="Back to year selection"
                  >
                    <ChevronLeft className="h-[16px] w-[16px]" />
                    {year}
                  </button>
                  <div className="text-[16.5px] font-extrabold text-ir-text">
                    {MONTHS[month]}
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setMonth((month + 11) % 12)}
                      aria-label="Previous month"
                      className="flex h-8 w-8 items-center justify-center rounded-full text-ir-text active:bg-black/5"
                    >
                      <ChevronLeft className="h-[15px] w-[15px]" />
                    </button>
                    <button
                      onClick={() => setMonth((month + 1) % 12)}
                      aria-label="Next month"
                      className="flex h-8 w-8 items-center justify-center rounded-full text-ir-text active:bg-black/5"
                    >
                      <ChevronLeft className="h-[15px] w-[15px] rotate-180" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-7 gap-y-[6px] text-center">
                  {DAYS.map((d) => (
                    <div key={d} className="text-[11.5px] font-bold uppercase text-ir-label">
                      {d[0]}
                    </div>
                  ))}
                  {cells.map((d, i) => {
                    if (d === null) return <span key={`e${i}`} />;
                    const sel = d === day;
                    return (
                      <button
                        key={i}
                        onClick={() => setDay(d)}
                        className={`mx-auto flex h-[38px] w-[38px] items-center justify-center rounded-full text-[13.5px] transition-colors ${
                          sel
                            ? "bg-ir-navy font-bold text-white"
                            : "font-semibold text-ir-text active:bg-ir-lav"
                        }`}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={confirm}
                  disabled={!day}
                  className="mt-6 h-[52px] w-full rounded-[20px] bg-ir-coral text-[16px] font-bold text-white active:brightness-95 disabled:opacity-40"
                >
                  {day ? `Set ${String(day).padStart(2, "0")} ${MONTHS[month]} ${year}` : "Select a date"}
                </button>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
