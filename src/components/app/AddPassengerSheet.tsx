"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, PlusIcon } from "./icons";
import { useApp } from "@/lib/store";

export default function AddPassengerSheet({
  open,
  onClose,
  cls,
  fare,
}: {
  open: boolean;
  onClose: () => void;
  cls: string;
  fare: number;
}) {
  const { passengers, setPassengers } = useApp();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"M" | "F" | "O">("M");
  const berths = ["No preference", "Lower", "Middle", "Upper", "Side Lower", "Side Upper"];
  const [berth, setBerth] = useState(berths[0]);

  const valid = name.trim().length >= 3 && Number(age) > 0 && Number(age) < 125;

  const save = () => {
    if (!valid) return;
    setPassengers([
      ...passengers,
      { name: name.trim(), age, gender, berth, seatNo: String(3 + passengers.length * 8), coach: "", price: fare },
    ]);
    setName("");
    setAge("");
    setGender("M");
    setBerth(berths[0]);
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
            onClick={onClose}
            className="absolute inset-0 z-40 bg-black/35"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 34 }}
            className="absolute inset-x-0 bottom-0 z-50 rounded-t-[28px] bg-white px-5 pb-8 pt-2"
          >
            <div className="mx-auto mt-2 h-[4px] w-[44px] rounded-full bg-[#dcdbde]" />
            <div className="mt-3 flex items-center justify-between">
              <h3 className="text-[18px] font-extrabold text-ir-text">Add Passenger</h3>
              <button
                onClick={onClose}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-full text-ir-text active:bg-black/5"
              >
                <ChevronLeft className="h-4 w-4 rotate-[-90deg]" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <div className="rounded-[18px] bg-ir-lav px-4 pb-[12px] pt-[10px]">
                <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-ir-label">Name (as on ID)</div>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="mt-[4px] h-[30px] w-full bg-transparent text-[15.5px] font-semibold text-ir-text outline-none placeholder:font-medium placeholder:text-[#a3a4ab]"
                />
              </div>

              <div className="flex gap-3">
                <div className="w-[110px] rounded-[18px] bg-ir-lav px-4 pb-[12px] pt-[10px]">
                  <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-ir-label">Age</div>
                  <input
                    value={age}
                    onChange={(e) => setAge(e.target.value.replace(/\D/g, "").slice(0, 3))}
                    inputMode="numeric"
                    placeholder="0"
                    className="mt-[4px] h-[30px] w-full bg-transparent text-[15.5px] font-semibold text-ir-text outline-none placeholder:font-medium placeholder:text-[#a3a4ab]"
                  />
                </div>
                <div className="flex-1 rounded-[18px] bg-ir-lav px-4 pb-[12px] pt-[10px]">
                  <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-ir-label">Gender</div>
                  <div className="mt-[8px] flex gap-[14px]">
                    {(
                      [
                        ["M", "Male"],
                        ["F", "Female"],
                        ["O", "Other"],
                      ] as const
                    ).map(([g, label]) => (
                      <button key={g} onClick={() => setGender(g)} className="flex items-center gap-[6px]">
                        <span
                          className={`flex h-[17px] w-[17px] items-center justify-center rounded-full border-2 ${
                            gender === g ? "border-ir-navy" : "border-[#c9cad0]"
                          }`}
                        >
                          {gender === g && <span className="h-[8px] w-[8px] rounded-full bg-ir-navy" />}
                        </span>
                        <span className={`text-[13px] ${gender === g ? "font-bold text-ir-text" : "font-medium text-[#6d6f76]"}`}>
                          {label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-[18px] bg-ir-lav px-4 pb-[12px] pt-[10px]">
                <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-ir-label">Berth preference</div>
                <div className="mt-[6px] flex flex-wrap gap-2">
                  {berths.map((b) => (
                    <button
                      key={b}
                      onClick={() => setBerth(b)}
                      className={`rounded-[12px] px-[12px] py-[7px] text-[12.5px] font-semibold transition-colors ${
                        berth === b ? "bg-ir-navy font-bold text-white" : "bg-white font-medium text-[#3d3e44]"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
                <div className="mt-[10px] flex items-center gap-2 text-[12px] font-medium text-[#6d6f76]">
                  <PlusIcon className="h-[12px] w-[12px] text-ir-green" />
                  Class {cls} · ₹ {fare.toLocaleString("en-IN")} per passenger
                </div>
              </div>

              <button
                onClick={save}
                disabled={!valid}
                className="h-[54px] w-full rounded-[20px] bg-ir-coral text-[16px] font-bold text-white shadow-[0_10px_24px_rgba(251,83,74,0.3)] active:brightness-95 disabled:opacity-45 disabled:shadow-none"
              >
                Save Passenger Details
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
