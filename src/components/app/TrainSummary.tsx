"use client";

import { SwapHIcon } from "./icons";

export default function TrainSummary({
  trainId,
  trainName,
  from,
  to,
  dep,
  arr,
  duration,
  cls,
  date,
}: {
  trainId: string;
  trainName: string;
  from: string;
  to: string;
  dep: string;
  arr: string;
  duration: string;
  cls: string;
  date: string;
}) {
  return (
    <div className="rounded-[24px] bg-ir-lav px-[12px] pb-[14px] pt-[12px]">
      <div className="text-center text-[11.5px] font-bold uppercase tracking-[0.14em] text-ir-label">
        {date}
      </div>
      <div className="mt-[8px] rounded-[18px] bg-white px-4 pb-[14px] pt-[12px]">
        <div className="flex items-center gap-[7px]">
          <span className="text-[15px] font-extrabold text-ir-text">{trainId}</span>
          <span className="h-[4px] w-[4px] rounded-full bg-[#c9cad1]" />
          <span className="truncate text-[15px] font-extrabold text-ir-text">{trainName}</span>
          <span className="ml-auto rounded-[8px] bg-ir-chip-green px-[8px] py-[4px] text-[11px] font-extrabold text-ir-green">
            {cls}
          </span>
        </div>
        <div className="mt-[12px] flex items-center">
          <div className="w-[86px] shrink-0">
            <div className="text-[21px] font-extrabold leading-none text-ir-text">{dep}</div>
            <div className="mt-[4px] text-[13px] font-medium text-[#8c8d93]">{from}</div>
          </div>
          <div className="flex flex-1 items-center px-1">
            <span className="h-px flex-1 bg-[#dcdde1]" />
            <span className="px-[8px] text-[12px] font-semibold text-ir-text">{duration}</span>
            <span className="h-px flex-1 bg-[#dcdde1]" />
          </div>
          <div className="w-[86px] shrink-0 text-right">
            <div className="text-[21px] font-extrabold leading-none text-ir-text">{arr}</div>
            <div className="mt-[4px] text-[13px] font-medium text-[#8c8d93]">{to}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SwapGlyph() {
  return <SwapHIcon className="h-[15px] w-[15px]" />;
}
