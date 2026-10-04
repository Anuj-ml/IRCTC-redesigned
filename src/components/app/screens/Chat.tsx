"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ScreenHeader from "../ScreenHeader";
import { SendIcon } from "../icons";
import { POPULAR_QUESTIONS } from "@/lib/data";
import { useApp } from "@/lib/store";

interface Msg {
  id: number;
  from: "bot" | "me";
  text: string;
  time: string;
}

const now = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });

/* keyword → answer index in POPULAR_QUESTIONS, plus extra knowledge */
const KEYWORDS: [RegExp, number][] = [
  [/cancel/i, 0],
  [/tatkal/i, 1],
  [/aadhaa?r/i, 2],
  [/pnr|status/i, 3],
  [/refund/i, 4],
  [/boarding/i, 5],
];

const EXTRA: [RegExp, string][] = [
  [/^(hi|hii+|hello|hey|namaste)\b/i, "Hello! I can help with bookings, PNR status, cancellations, Tatkal and refunds. What do you need?"],
  [/live|where.*(train)|running|late|delay/i, "You can track any train live: Home → Track → enter the train number. It shows the current position, delay and the next 5 stations with ETA."],
  [/seat|berth|coach|confirm/i, "After chart preparation your final berth appears on the E-Ticket (My Bookings → tap the PNR). Before that, the PNR status screen shows prediction chances."],
  [/otp|verif/i, "OTPs are sent only to your registered mobile and expire in 30 minutes. IRCTC staff will NEVER ask for your OTP — if someone does, it's a fraud attempt."],
  [/cancel ticket|need help|human|agent/i, "Sure — connecting you to a human agent. Average wait right now is under 2 minutes. You can also call 1800-110-139 (toll-free, 24x7)."],
  [/thank|thanks/i, "Happy to help! Is there anything else — PNR, Tatkal or refunds?"],
];

function answerFor(q: string): string {
  for (const [re, idx] of KEYWORDS) if (re.test(q)) return POPULAR_QUESTIONS[idx].a;
  for (const [re, a] of EXTRA) if (re.test(q)) return a;
  return "I've noted that! A human agent will follow up in a few minutes. Meanwhile you can check My Bookings for live PNR status, or call 1800-110-139 for urgent help.";
}

function relatedFor(q: string): string[] {
  for (const [re, idx] of KEYWORDS) {
    if (re.test(q)) {
      const pool = POPULAR_QUESTIONS.filter((_, i) => i !== idx);
      return [pool[idx % pool.length].q, pool[(idx + 3) % pool.length].q];
    }
  }
  return ["Where can I find my PNR status?", "What is Tatkal booking timing?"];
}

const TOPICS = [
  { icon: "M9 12.5v-2a3 3 0 0 1 6 0v2M6.5 12.5h11l-.8 6.2a2 2 0 0 1-2 1.8H9.3a2 2 0 0 1-2-1.8L6.5 12.5Z", t: "Cancel a ticket", s: "Steps and charges" },
  { icon: "M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6l1.4 1.4m10 10 1.4 1.4m0-12.8-1.4 1.4m-10 10L5.6 18.4M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z", t: "PNR status", s: "Live chart updates" },
  { icon: "M12 7v5l3.2 1.9M12 3.5a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17Z", t: "Tatkal timings", s: "AC 10 AM · Non-AC 11 AM" },
  { icon: "M12 3v18M8 7.5c0-1.4 1.8-2.5 4-2.5s4 1.1 4 2.5-1.8 2.5-4 2.5-4 1.1-4 2.5 1.8 2.5 4 2.5 4-1.1 4-2.5", t: "Refund policy", s: "How much, how fast" },
];

export default function Chat() {
  const pop = useApp((s) => s.pop);
  const params = useApp((s) => s.params) as { question?: string } | null;
  const firstName = useApp((s) => s.profile.name.split(" ")[0]);

  const [msgs, setMsgs] = useState<Msg[]>([
    {
      id: 1,
      from: "bot",
      text: `Hi ${firstName}! I'm the IRCTC assistant. Ask me anything, or pick a topic below.`,
      time: now(),
    },
  ]);
  const [typing, setTyping] = useState(() => Boolean(params?.question));
  const [input, setInput] = useState("");
  const idRef = useRef(2);
  const listRef = useRef<HTMLDivElement | null>(null);

  const showTopics = msgs.length === 1;
  const lastBot = useMemo(() => [...msgs].reverse().find((m) => m.from === "bot"), [msgs]);
  const chips = useMemo(
    () => (lastBot && lastBot.id !== 1 ? relatedFor(lastBot.text) : POPULAR_QUESTIONS.slice(0, 4).map((p) => p.q)),
    [lastBot]
  );

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setInput("");
    setMsgs((m) => [...m, { id: idRef.current++, from: "me", text: t, time: now() }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { id: idRef.current++, from: "bot", text: answerFor(t), time: now() }]);
    }, 850 + Math.min(t.length * 14, 800));
  };

  /* deep-linked question from Help / Booking details */
  useEffect(() => {
    if (!params?.question) return;
    const q = params.question;
    const t = setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [
        ...m,
        { id: idRef.current++, from: "me", text: q, time: now() },
        { id: idRef.current++, from: "bot", text: answerFor(q), time: now() },
      ]);
    }, 500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  return (
    <div className="flex h-full flex-col bg-white">
      <ScreenHeader
        title="IRCTC Support"
        onBack={pop}
        right={
          <span className="rounded-[9px] bg-ir-chip-green px-3 py-[5px] text-[10.5px] font-bold text-ir-green">
            24x7
          </span>
        }
      />

      {/* bot intro row */}
      <div className="flex items-center gap-3 border-b border-ir-border px-5 pb-3">
        <span className="relative flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-ir-navy text-white">
          <svg viewBox="0 0 24 24" className="h-[20px] w-[20px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="7.5" width="14" height="11" rx="3.4" />
            <path d="M12 7.5V4.5M9.5 4.5h5" />
            <circle cx="9.7" cy="12.6" r="0.5" fill="currentColor" />
            <circle cx="14.3" cy="12.6" r="0.5" fill="currentColor" />
          </svg>
          <span className="absolute -bottom-[1px] -right-[1px] h-[11px] w-[11px] rounded-full border-2 border-white bg-ir-green" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[14px] font-bold text-ir-text">IRCTC Support</div>
          <div className="text-[11px] font-medium text-ir-green">Online · replies in under 2 mins</div>
        </div>
      </div>

      {/* messages */}
      <div ref={listRef} className="no-scrollbar flex-1 overflow-y-auto px-4 pb-2">
        <div className="space-y-[10px] pt-3">
          {msgs.map((m) => (
            <motion.div
              key={m.id}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className={`flex flex-col ${m.from === "me" ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-[18px] px-[14px] py-[10px] text-[13.5px] leading-relaxed ${
                  m.from === "me"
                    ? "rounded-br-[6px] bg-ir-navy font-medium text-white"
                    : "rounded-bl-[6px] bg-ir-lav font-medium text-ir-text"
                }`}
              >
                {m.text}
              </div>
              <div className="mt-[3px] flex items-center gap-[4px] px-1">
                <span className="text-[9.5px] font-semibold text-[#a3a4ab]">{m.time}</span>
                {m.from === "me" && (
                  <svg viewBox="0 0 16 10" className="h-[8px] w-[12px] text-ir-coral" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m1 5.2 2.6 2.6L9 2.4M7 5.2l2.6 2.6L15 2.4" />
                  </svg>
                )}
              </div>
            </motion.div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div className="flex items-center gap-[4px] rounded-[18px] rounded-bl-[6px] bg-ir-lav px-[14px] py-[12px]">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-[7px] w-[7px] animate-bounce rounded-full bg-[#b9bbc4]"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* topic cards (before first question) */}
        <AnimatePresence>
          {showTopics && !typing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 grid grid-cols-2 gap-[9px] pb-2"
            >
              {TOPICS.map((t) => (
                <button
                  key={t.t}
                  onClick={() => send(POPULAR_QUESTIONS.find((p) => p.q.toLowerCase().includes(t.t.split(" ")[0].toLowerCase()))?.q ?? t.t)}
                  className="rounded-[16px] bg-ir-lav px-[13px] py-[12px] text-left active:brightness-[0.98]"
                >
                  <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white text-ir-navy">
                    <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d={t.icon} />
                    </svg>
                  </span>
                  <span className="mt-[8px] block text-[13px] font-extrabold text-ir-text">{t.t}</span>
                  <span className="mt-[1px] block text-[10.5px] font-medium text-[#8c8d93]">{t.s}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* contextual quick chips */}
      <div className="shrink-0 px-4 pb-1">
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2">
          {chips.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              className="shrink-0 rounded-[12px] bg-ir-lav px-[13px] py-[8px] text-[12px] font-semibold text-ir-navy active:brightness-[0.98]"
            >
              {q}
            </button>
          ))}
          <button
            onClick={() => send("I want to talk to a human agent")}
            className="shrink-0 rounded-[12px] border-[1.5px] border-[#e3e3e9] bg-white px-[13px] py-[8px] text-[12px] font-bold text-ir-text active:bg-ir-lav"
          >
            Talk to agent
          </button>
        </div>
      </div>

      {/* input */}
      <div className="shrink-0 border-t border-ir-border bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-[46px] flex-1 items-center rounded-[20px] bg-ir-lav px-5">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder={`Ask ${firstName}, how can I help?`}
              className="h-full w-full bg-transparent text-[14.5px] font-medium text-ir-text outline-none placeholder:font-medium placeholder:text-[#a3a4ab]"
            />
          </div>
          <button
            onClick={() => send(input)}
            aria-label="Send message"
            className={`flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full text-white transition-colors ${
              input.trim() ? "bg-ir-coral shadow-[0_6px_16px_rgba(251,83,74,0.35)] active:brightness-95" : "bg-[#c9cad1]"
            }`}
          >
            <SendIcon className="h-[19px] w-[19px]" />
          </button>
        </div>
      </div>
    </div>
  );
}
