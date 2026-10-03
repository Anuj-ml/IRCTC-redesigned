"use client";

import Sheet from "./Sheet";
import { CLASS_OPTIONS } from "@/lib/data";

export default function ClassSheet({
  open,
  onClose,
  selected,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  selected: string;
  onSelect: (c: string) => void;
}) {
  const options = [{ code: "ALL", name: "All Classes" }, ...CLASS_OPTIONS];
  return (
    <Sheet open={open} onClose={onClose} title="Travel class">
      <div className="space-y-3 px-1 pb-2">
        {options.map((c) => {
          const active = selected === c.code;
          return (
            <button
              key={c.code}
              onClick={() => {
                onSelect(c.code);
                onClose();
              }}
              className={`mt-3 flex w-full items-center justify-between rounded-[18px] px-4 py-[15px] text-left ${
                active ? "border-2 border-ir-navy bg-white" : "bg-ir-lav"
              }`}
            >
              <span className="flex items-baseline gap-2">
                <span className="text-[15px] font-extrabold text-ir-text">{c.code}</span>
                {c.code !== "ALL" && (
                  <span className="text-[13px] font-medium text-[#8c8d93]">· {c.name}</span>
                )}
                {c.code === "ALL" && (
                  <span className="text-[13px] font-medium text-[#8c8d93]">— show every class</span>
                )}
              </span>
              <span
                className={`flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full border-2 ${
                  active ? "border-ir-navy" : "border-[#c9cad0]"
                }`}
              >
                {active && <span className="h-[10px] w-[10px] rounded-full bg-ir-navy" />}
              </span>
            </button>
          );
        })}
      </div>
    </Sheet>
  );
}
