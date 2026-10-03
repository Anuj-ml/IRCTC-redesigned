"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ScreenHeader from "../ScreenHeader";
import { CheckIcon } from "../icons";
import { useApp } from "@/lib/store";

type Ctx = "login" | "signup" | "mobile";

/* 6-digit OTP verification — used for Login-with-OTP, signup and mobile-number
   change (IRCTC policy: mobile changes always require OTP). Demo: any 6 digits verify. */
export default function OtpVerify() {
  const { pop, params, login, resetTo, updateProfile } = useApp();
  const ctx = ((params as { context?: Ctx } | null)?.context ?? "login") as Ctx;
  const p = (params as { mobile?: string; name?: string } | null) ?? {};
  const newMobile = p.mobile ?? "+91 98765 43210";
  const newName = p.name;

  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const [err, setErr] = useState("");
  const [shake, setShake] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const [done, setDone] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const setAt = (i: number, v: string) => {
    const clean = v.replace(/\D/g, "");
    if (clean.length > 1) {
      /* paste support */
      const next = [...digits];
      clean.split("").slice(0, 6 - i).forEach((c, j) => (next[i + j] = c));
      setDigits(next);
      inputs.current[Math.min(i + clean.length, 5)]?.focus();
      return;
    }
    const next = [...digits];
    next[i] = clean;
    setDigits(next);
    if (clean && i < 5) inputs.current[i + 1]?.focus();
  };

  const verify = () => {
    if (digits.some((d) => !d)) {
      setErr("Please enter all 6 digits of the OTP");
      setShake((s) => s + 1);
      return;
    }
    setErr("");
    if (ctx === "mobile") updateProfile({ mobile: newMobile.startsWith("+") ? newMobile : `+91 ${newMobile}` });
    if (ctx === "signup") {
      const d = newMobile.replace(/\D/g, "").slice(-10);
      updateProfile({ mobile: `+91 ${d.slice(0, 5)} ${d.slice(5)}`, ...(newName ? { name: newName } : {}) });
    }
    setDone(true);
  };

  const finish = () => {
    if (ctx === "mobile") resetTo("profile");
    else {
      login();
      resetTo("home");
    }
  };

  const sub =
    ctx === "mobile"
      ? `Enter the 6-digit OTP sent to your new number ${newMobile} to update it on your IRCTC account.`
      : ctx === "signup"
        ? `Enter the 6-digit OTP sent to ${newMobile} to verify and activate your account.`
        : `Enter the 6-digit OTP sent to your registered mobile ${newMobile}.`;

  return (
    <div className="flex h-full flex-col bg-white">
      <ScreenHeader title="Verify OTP" onBack={pop} />

      <div className="no-scrollbar flex-1 overflow-y-auto px-5 pb-6">
        {/* shield */}
        <div className="mt-4 flex flex-col items-center">
          <span className="flex h-[74px] w-[74px] items-center justify-center rounded-full bg-ir-lav text-ir-navy">
            <svg viewBox="0 0 24 24" className="h-[34px] w-[34px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2.8 4.8 5.6v5.1c0 4.7 3 9.1 7.2 10.5 4.2-1.4 7.2-5.8 7.2-10.5V5.6L12 2.8Z" />
              <path d="m8.8 12 2.2 2.2 4.2-4.4" />
            </svg>
          </span>
          <h1 className="mt-4 text-[21px] font-extrabold text-ir-text">Verify your number</h1>
          <p className="mt-[6px] text-center text-[13px] font-medium leading-relaxed text-[#6d6f76]">{sub}</p>
        </div>

        {/* otp boxes */}
        <motion.div
          key={shake}
          initial={shake ? { x: 0 } : false}
          animate={shake ? { x: [0, -9, 9, -6, 6, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="mt-7 flex justify-between gap-[8px]"
        >
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                inputs.current[i] = el;
              }}
              value={d}
              onChange={(e) => setAt(i, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !digits[i] && i > 0) inputs.current[i - 1]?.focus();
              }}
              inputMode="numeric"
              maxLength={6}
              aria-label={`OTP digit ${i + 1}`}
              className={`h-[58px] w-full rounded-[14px] border-[1.5px] bg-ir-lav text-center text-[22px] font-extrabold text-ir-text outline-none transition-colors ${
                d ? "border-ir-navy bg-white" : "border-transparent"
              }`}
            />
          ))}
        </motion.div>

        {err && <div className="mt-3 text-center text-[12.5px] font-semibold text-ir-red">{err}</div>}

        {/* resend */}
        <div className="mt-5 text-center text-[13px] font-medium text-[#6d6f76]">
          {seconds > 0 ? (
            <>
              Resend OTP in{" "}
              <span className="font-bold text-ir-navy">
                0:{String(seconds).padStart(2, "0")}
              </span>
            </>
          ) : (
            <button
              onClick={() => setSeconds(30)}
              className="font-bold text-ir-coral underline underline-offset-4"
            >
              Resend OTP
            </button>
          )}
        </div>

        <div className="mt-8 rounded-[14px] bg-ir-chip-amber px-4 py-[11px]">
          <p className="text-[11.5px] font-semibold leading-relaxed text-ir-amber">
            Never share your OTP with anyone. IRCTC staff will never ask for it.
          </p>
        </div>
      </div>

      <div className="shrink-0 px-5 pb-7">
        <button
          onClick={verify}
          className="h-[54px] w-full rounded-[20px] bg-ir-coral text-[16px] font-bold text-white shadow-[0_10px_24px_rgba(251,83,74,0.3)] active:brightness-95"
        >
          Verify OTP
        </button>
      </div>

      {/* success popup */}
      {done && (
        <div className="absolute inset-0 z-50 flex items-end bg-black/35 px-5 pb-10">
          <div className="w-full rounded-[26px] bg-white p-6 text-center shadow-2xl">
            <span className="mx-auto flex h-[46px] w-[46px] items-center justify-center rounded-full bg-ir-chip-green text-ir-green">
              <CheckIcon className="h-[21px] w-[21px]" />
            </span>
            <div className="mt-3 text-[18px] font-extrabold text-ir-text">
              {ctx === "mobile" ? "Number verified" : "OTP verified"}
            </div>
            <p className="mt-[6px] text-[13.5px] font-medium leading-relaxed text-[#6d6f76]">
              {ctx === "mobile"
                ? `Your mobile number has been updated to ${newMobile}.`
                : ctx === "signup"
                  ? "Your account is verified and ready. Welcome to IRCTC Rail Connect!"
                  : "You are signed in securely."}
            </p>
            <button
              onClick={finish}
              className="mt-5 h-[48px] w-full rounded-[20px] bg-ir-coral text-[15px] font-bold text-white active:brightness-95"
            >
              {ctx === "mobile" ? "Done" : "Continue"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
