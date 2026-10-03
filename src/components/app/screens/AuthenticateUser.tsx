"use client";

import { useState } from "react";
import ScreenHeader from "../ScreenHeader";
import { CheckIcon, ShieldCheckIcon } from "../icons";
import { useApp } from "@/lib/store";

export default function AuthenticateUser() {
  const pop = useApp((s) => s.pop);
  const [pw, setPw] = useState("");
  const [ok, setOk] = useState(false);
  const [error, setError] = useState("");

  const submit = () => {
    if (pw.length < 4) {
      setError("Enter your IRCTC password to continue");
      return;
    }
    setError("");
    setOk(true);
  };

  return (
    <div className="flex h-full flex-col bg-white">
      <ScreenHeader title="Authenticate User" onBack={pop} />

      <div className="no-scrollbar flex-1 overflow-y-auto px-4 pb-6">
        {!ok ? (
          <>
            <div className="rounded-[24px] bg-ir-lav px-4 pb-5 pt-4">
              <div className="flex items-center gap-3">
                <span className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-white text-ir-navy">
                  <ShieldCheckIcon className="h-[19px] w-[19px]" />
                </span>
                <div>
                  <div className="text-[15px] font-extrabold text-ir-text">Verify it's you</div>
                  <div className="text-[12.5px] font-medium text-[#8c8d93]">anujj1004 · IRCTC</div>
                </div>
              </div>
              <div className="mt-4 rounded-[18px] bg-white px-4 pb-[12px] pt-[10px]">
                <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-ir-label">Password</div>
                <input
                  type="password"
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  placeholder="Enter password"
                  className="mt-[4px] h-[30px] w-full bg-transparent text-[15.5px] font-semibold text-ir-text outline-none placeholder:font-medium placeholder:text-[#a3a4ab]"
                />
              </div>
              {error && <div className="mt-2 text-[11.5px] font-medium text-ir-red">{error}</div>}
              <button
                onClick={submit}
                className="mt-5 h-[54px] w-full rounded-[20px] bg-ir-coral text-[16px] font-bold text-white shadow-[0_10px_24px_rgba(251,83,74,0.3)] active:brightness-95"
              >
                Authenticate
              </button>
            </div>
            <p className="mt-4 px-2 text-[11.5px] font-medium leading-relaxed text-[#8c8d93]">
              For your security we ask for your password before showing Aadhaar / PAN / passport numbers saved on your account.
            </p>
          </>
        ) : (
          <div className="rounded-[24px] bg-ir-lav px-4 pb-5 pt-4">
            <div className="flex items-center gap-3">
              <span className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-ir-chip-green text-ir-green">
                <CheckIcon className="h-[18px] w-[18px]" />
              </span>
              <div className="text-[15.5px] font-extrabold text-ir-text">Identity verified</div>
            </div>
            <div className="mt-4 space-y-[10px]">
              {[
                ["Aadhaar", "4821 9930 •••• 7763"],
                ["PAN", "BRZP•••••7K"],
                ["Passport", "N••••428"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between rounded-[18px] bg-white px-4 py-[13px]">
                  <span className="text-[13px] font-bold uppercase tracking-[0.06em] text-ir-label">{k}</span>
                  <span className="text-[14.5px] font-semibold tracking-[0.04em] text-ir-text">{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
