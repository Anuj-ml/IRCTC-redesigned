"use client";

import { motion } from "framer-motion";
import { useApp } from "@/lib/store";

/* Welcome/splash screen — first screen of the app, per user-provided design:
   coral duotone train art, IRCTC logo, app name, tagline, "Log in →". */
export default function Splash() {
  const resetTo = useApp((s) => s.resetTo);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="relative flex h-full flex-col overflow-hidden text-white"
      style={{
        background:
          "linear-gradient(180deg, #F16A4D 0%, #F16A4D 11%, #E15F41 36%, #DB573B 60%, #D54F34 100%)",
      }}
    >
      {/* train art (duotone crop from the design) */}
      <img
        src="/assets/splash_train.png"
        alt=""
        className="absolute left-0 top-[11.3%] w-full select-none"
        draggable={false}
      />

      {/* logo + text block — same IRCTC logo as the login page, no badge/border */}
      <div className="absolute inset-x-0 bottom-0 px-[26px] pb-[9%]">
        <img
          src="/assets/irctc_logo.png"
          alt="IRCTC"
          className="w-[84px] select-none"
          draggable={false}
        />
        <h1 className="mt-[18px] text-[25px] font-extrabold leading-tight">
          IRCTC Rail Connect
        </h1>
        <p className="mt-[6px] max-w-[220px] text-[16.5px] font-medium leading-snug text-white/95">
          Online Train Ticket Booking
        </p>

        <button
          onClick={() => resetTo("login")}
          className="mt-[26px] flex items-center gap-[14px] text-[16.5px] font-bold active:opacity-70"
        >
          Log in
          <svg viewBox="0 0 46 10" className="h-[10px] w-[46px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 5h42M39 1.2 44.4 5 39 8.8" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}
