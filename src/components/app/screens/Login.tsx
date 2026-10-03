"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "../icons";
import { useApp } from "@/lib/store";

export default function Login() {
  const [tab, setTab] = useState<"user" | "agent">("user");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const push = useApp((s) => s.push);
  const login = useApp((s) => s.login);
  const resetTo = useApp((s) => s.resetTo);
  const profile = useApp((s) => s.profile);

  const go = () => {
    login();
    resetTo("home");
  };

  return (
    <div className="no-scrollbar flex h-full flex-col overflow-y-auto bg-white">
      <div className="pt-[66px]" />

      {/* logo */}
      <div className="mt-[4px] flex w-full items-center justify-center">
        <img
          src="/assets/irctc_logo.png"
          alt="IRCTC"
          className="w-[135px]"
          draggable={false}
        />
      </div>

      <div className="mt-[26px] text-center">
        <div className="text-[14px] font-bold uppercase tracking-[0.2em] text-ir-navy">
          Welcome to
        </div>
        <h1 className="mt-[3px] text-[27px] font-extrabold leading-tight text-ir-navy">
          IRCTC Rail Connect
        </h1>
      </div>

      {/* card 1 — segmented control */}
      <div className="mx-[18px] mt-[22px] rounded-[25px] bg-ir-lav p-[8px]">
        <div className="flex">
          {(["user", "agent"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`h-[68px] flex-1 rounded-[16px] text-[17px] transition-all ${
                tab === t
                  ? "border-2 border-ir-navy bg-white font-bold text-ir-navy"
                  : "font-semibold text-ir-text"
              }`}
            >
              {t === "user" ? "User Login" : "Agent Login"}
            </button>
          ))}
        </div>
      </div>

      {/* card 2 — fields & actions */}
      <div className="mx-[18px] mt-[8px] rounded-[25px] bg-ir-lav px-[8px] pb-[12px] pt-[8px]">
        {/* user name */}
        <div className="rounded-[20px] bg-white px-[18px] pb-[14px] pt-[16px]">
          <div className="text-[11.5px] font-medium uppercase tracking-[0.06em] text-ir-label">
            User Name
          </div>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={tab === "user" ? "Enter your IRCTC User Name" : "Enter your Agent ID"}
            className="mt-[5px] h-[28px] w-full bg-transparent text-[16.5px] font-medium text-ir-text outline-none placeholder:font-medium placeholder:text-ir-text"
          />
        </div>

        {/* password */}
        <div className="mt-[8px] flex items-center rounded-[20px] bg-white px-[18px] pb-[14px] pt-[16px]">
          <div className="min-w-0 flex-1">
            <div className="text-[11.5px] font-medium uppercase tracking-[0.06em] text-ir-label">
              Password
            </div>
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="mt-[5px] h-[28px] w-full bg-transparent text-[16.5px] font-medium text-ir-text outline-none placeholder:font-medium placeholder:text-ir-text"
            />
          </div>
          <button
            onClick={() => setShowPw(!showPw)}
            aria-label="Toggle password visibility"
            className="ml-2 shrink-0 p-1 text-ir-text active:opacity-60"
          >
            {showPw ? <EyeIcon className="h-[22px] w-[22px]" /> : <EyeOffIcon className="h-[22px] w-[22px]" />}
          </button>
        </div>

        {/* remember / forgot */}
        <div className="mt-[11px] flex items-center justify-between px-[10px]">
          <button onClick={() => setRemember(!remember)} className="flex items-center gap-[9px]">
            <span
              className={`flex h-[19px] w-[19px] items-center justify-center rounded-[6px] border transition-colors ${
                remember ? "border-ir-navy bg-ir-navy" : "border-[#d4d4da] bg-white"
              }`}
            >
              {remember && (
                <svg viewBox="0 0 24 24" className="h-3 w-3 text-white" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
              )}
            </span>
            <span className="text-[14.5px] font-medium text-ir-text">Remember Me</span>
          </button>
          <button className="text-[14.5px] font-bold text-ir-navy active:opacity-60">
            Forgot Password?
          </button>
        </div>

        {/* login button */}
        <button
          onClick={go}
          className="mt-[13px] h-[68px] w-full rounded-[25px] bg-ir-coral text-[17.5px] font-bold text-white shadow-[0_8px_22px_rgba(251,83,74,0.28)] active:brightness-95"
        >
          Login Securely
        </button>

        {/* or divider */}
        <div className="mt-[17px] flex items-center gap-3 px-2">
          <span className="h-px flex-1 bg-[#e3e3e9]" />
          <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#9a9ba2]">or</span>
          <span className="h-px flex-1 bg-[#e3e3e9]" />
        </div>

        {/* otp login */}
        <button
          onClick={() => push("otp", { context: "login", mobile: profile.mobile })}
          className="mx-auto mt-[15px] block text-[17px] font-bold text-ir-text underline underline-offset-4 active:opacity-60"
        >
          Login With OTP
        </button>
      </div>

      {/* create account */}
      <div className="mt-[58px] pb-[30px] text-center">
        <div className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-[#9a9ba2]">
          New to IRCTC?
        </div>
        <button
          onClick={() => push("signup")}
          className="mt-[6px] text-[16.5px] font-bold text-ir-navy underline underline-offset-4 active:opacity-60"
        >
          Create Your Account
        </button>
      </div>
    </div>
  );
}
