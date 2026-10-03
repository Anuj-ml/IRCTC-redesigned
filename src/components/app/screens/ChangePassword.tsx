"use client";

import { useState } from "react";
import ScreenHeader from "../ScreenHeader";
import { CheckIcon, LockIcon } from "../icons";
import { useApp } from "@/lib/store";

export default function ChangePassword() {
  const pop = useApp((s) => s.pop);
  const logout = useApp((s) => s.logout);
  const [cur, setCur] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const strength = (() => {
    let s = 0;
    if (next.length >= 8) s++;
    if (/[A-Z]/.test(next) && /[a-z]/.test(next)) s++;
    if (/\d/.test(next)) s++;
    if (/[^A-Za-z0-9]/.test(next)) s++;
    return s;
  })();
  const strengthLabel = ["Too weak", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["bg-[#e0e0e4]", "bg-ir-red", "bg-ir-amber", "bg-[#7aa5f7]", "bg-ir-green"][strength];

  const submit = () => {
    if (cur.length < 4) return setError("Enter your current password");
    if (strength < 3) return setError("Choose a stronger password (8+ chars, mixed case, number)");
    if (next !== confirm) return setError("Passwords do not match");
    setError("");
    setDone(true);
  };

  return (
    <div className="relative flex h-full flex-col bg-white">
      <ScreenHeader title="Change Password" onBack={pop} />

      <div className="no-scrollbar flex-1 overflow-y-auto px-4 pb-6">
        <div className="rounded-[24px] bg-ir-lav px-4 pb-5 pt-4">
            <div className="flex items-center gap-3">
              <span className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white text-ir-navy">
                <LockIcon className="h-[19px] w-[19px]" />
              </span>
              <div className="text-[15px] font-extrabold text-ir-text">Set a new password</div>
            </div>

            <div className="mt-4 space-y-3">
              {(
                [
                  ["Current password", cur, setCur],
                  ["New password", next, setNext],
                  ["Confirm new password", confirm, setConfirm],
                ] as const
              ).map(([label, val, setter]) => (
                <div key={label} className="rounded-[18px] bg-white px-4 pb-[12px] pt-[10px]">
                  <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-ir-label">{label}</div>
                  <input
                    type="password"
                    value={val}
                    onChange={(e) => setter(e.target.value)}
                    placeholder="••••••••"
                    className="mt-[4px] h-[30px] w-full bg-transparent text-[15.5px] font-semibold text-ir-text outline-none placeholder:text-[#a3a4ab]"
                  />
                </div>
              ))}

              {/* strength meter */}
              <div>
                <div className="flex gap-[6px]">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="h-[5px] flex-1 overflow-hidden rounded-full bg-[#e9e9ec]">
                      <div
                        className={`h-full rounded-full transition-all ${strengthColor}`}
                        style={{ width: strength > i ? "100%" : "0%" }}
                      />
                    </div>
                  ))}
                </div>
                {next && (
                  <div className="mt-[6px] text-[11.5px] font-semibold text-[#6d6f76]">
                    Strength: {strengthLabel}
                  </div>
                )}
              </div>

              {error && <div className="text-[11.5px] font-medium text-ir-red">{error}</div>}

              <button
                onClick={submit}
                className="mt-6 h-[54px] w-full rounded-[20px] bg-ir-coral text-[16px] font-bold text-white shadow-[0_10px_24px_rgba(251,83,74,0.3)] active:brightness-95"
              >
                Update password
              </button>
            </div>
          </div>
      </div>

      {/* password-updated popup — once updated, user is logged out */}
      {done && (
        <div className="absolute inset-0 z-50 flex items-end bg-black/35 px-5 pb-10" onClick={() => logout()}>
          <div
            className="w-full rounded-[26px] bg-white p-6 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="mx-auto flex h-[46px] w-[46px] items-center justify-center rounded-full bg-ir-chip-green text-ir-green">
              <CheckIcon className="h-[21px] w-[21px]" />
            </span>
            <div className="mt-3 text-[18px] font-extrabold text-ir-text">Password updated</div>
            <p className="mt-[6px] text-[13.5px] font-medium leading-relaxed text-[#6d6f76]">
              Your password has been changed. For security, please log in again with your new password.
            </p>
            <button
              onClick={logout}
              className="mt-5 h-[48px] w-full rounded-[20px] bg-ir-coral text-[15px] font-bold text-white active:brightness-95"
            >
              Login again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
