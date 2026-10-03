"use client";

import ScreenHeader from "../ScreenHeader";
import { PlusIcon, UserIcon } from "../icons";
import { useApp } from "@/lib/store";

const MASTER = [
  { name: "Anuj Jha", age: 24, gender: "M", id: "Aadhaar ••7763" },
  { name: "Ravi Patoliya", age: 54, gender: "M", id: "Aadhaar ••1120" },
  { name: "Meera Sharma", age: 31, gender: "F", id: "PAN •••••7K" },
];

export default function MasterList() {
  const pop = useApp((s) => s.pop);

  return (
    <div className="flex h-full flex-col bg-white">
      <ScreenHeader title="My Master List" onBack={pop} />

      <div className="no-scrollbar flex-1 overflow-y-auto px-4 pb-6">
        <p className="px-1 text-[12.5px] font-medium leading-relaxed text-[#8c8d93]">
          Save frequent co-passengers once — add them to any booking in a single tap.
        </p>

        <div className="mt-4 space-y-[10px]">
          {MASTER.map((m) => (
            <div key={m.name} className="flex items-center gap-3 rounded-[18px] bg-ir-lav px-4 py-[13px]">
              <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-white text-ir-navy">
                <UserIcon className="h-[19px] w-[19px]" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[15px] font-bold text-ir-text">{m.name}</span>
                <span className="block text-[12px] font-medium text-[#8c8d93]">
                  {m.age} yrs · {m.gender === "M" ? "Male" : "Female"} · {m.id}
                </span>
              </span>
              <button className="rounded-[10px] bg-white px-3 py-[7px] text-[12px] font-bold text-ir-navy active:brightness-95">
                Book
              </button>
            </div>
          ))}
        </div>

        <button className="mx-auto mt-6 flex h-[50px] w-[240px] items-center justify-center gap-2 rounded-[20px] border-[1.5px] border-ir-navy bg-white text-[15px] font-bold text-ir-navy active:bg-ir-lav">
          <PlusIcon className="h-[16px] w-[16px]" />
          Add New Passenger
        </button>
      </div>
    </div>
  );
}
