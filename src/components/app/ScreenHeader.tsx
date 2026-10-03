"use client";

import { ChevronLeft } from "./icons";

export default function ScreenHeader({
  title,
  onBack,
  right,
}: {
  title: string;
  onBack: () => void;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-[10px] px-5 pb-3 pt-6">
      <button onClick={onBack} aria-label="Back" className="-ml-1 flex h-9 w-9 items-center justify-center rounded-full text-ir-text active:bg-black/5">
        <ChevronLeft className="h-[21px] w-[21px]" />
      </button>
      <span className="flex-1 truncate text-[17px] font-extrabold uppercase tracking-[0.08em] text-ir-text">
        {title}
      </span>
      {right}
    </div>
  );
}
