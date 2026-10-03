"use client";

import { useApp } from "@/lib/store";
import { ChatIcon, ChevronRight } from "../icons";
import { POPULAR_QUESTIONS } from "@/lib/data";

export default function Help() {
  const push = useApp((s) => s.push);
  const openChat = (q?: string) => push("chat", q ? { question: q } : undefined);

  return (
    <div className="relative flex h-full flex-col bg-white">
      <div className="no-scrollbar flex-1 overflow-y-auto pb-[130px]">
        {/* hero */}
        <div className="rounded-b-[30px] bg-ir-navy px-5 pb-7 pt-[70px]">
          <div className="text-[14px] font-extrabold uppercase tracking-[0.16em] text-white/70">
            Help & Support
          </div>
          <h1 className="mt-[4px] text-[26px] font-extrabold leading-tight text-white">
            How can we help?
          </h1>
          <button
            onClick={() => openChat()}
            className="mt-5 flex w-full items-center gap-3 rounded-[18px] bg-white/10 px-4 py-[13px] text-left active:brightness-110"
          >
            <span className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
              <ChatIcon className="h-[21px] w-[21px]" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] font-extrabold text-white">Chat with us</span>
              <span className="block text-[12px] font-medium text-white/70">
                Typical reply in under 2 mins · 24x7
              </span>
            </span>
            <ChevronRight className="h-[17px] w-[17px] shrink-0 text-white/80" />
          </button>
        </div>

        {/* FAQs */}
        <div className="px-5 pt-6">
          <div className="text-[12px] font-bold uppercase tracking-[0.14em] text-ir-label">
            Popular questions
          </div>
          <div className="mt-3 space-y-[10px]">
            {POPULAR_QUESTIONS.map((f) => (
              <button
                key={f.q}
                onClick={() => openChat(f.q)}
                className="flex w-full items-center gap-3 rounded-[18px] bg-ir-lav px-4 py-[14px] text-left active:brightness-[0.98]"
              >
                <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-white text-ir-navy">
                  <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9.2" />
                    <path d="M9.6 9.3a2.5 2.5 0 0 1 4.8 1c0 1.6-2.4 2-2.4 3.4M12 17v.01" />
                  </svg>
                </span>
                <span className="min-w-0 flex-1 text-[14px] font-semibold text-ir-text">{f.q}</span>
                <ChevronRight className="h-[16px] w-[16px] shrink-0 text-[#a3a4ab]" />
              </button>
            ))}
          </div>

          {/* contact */}
          <div className="mt-6 text-[12px] font-bold uppercase tracking-[0.14em] text-ir-label">
            Reach IRCTC
          </div>
          <div className="mt-3 rounded-[20px] bg-ir-lav px-4 py-[6px]">
            {[
              ["24x7 Customer Care", "1800-110-139 (toll free)"],
              ["Email", "care@irctc.co.in"],
              ["E-Tickets & refunds", "etickets@irctc.co.in"],
            ].map(([t, s], i) => (
              <div key={t} className={`flex items-center justify-between px-1 py-[11px] ${i > 0 ? "border-t border-[#e3e3e9]" : ""}`}>
                <span className="text-[13.5px] font-semibold text-ir-text">{t}</span>
                <span className="text-[12.5px] font-medium text-[#6d6f76]">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
