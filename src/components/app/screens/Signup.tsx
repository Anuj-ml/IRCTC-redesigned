"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, CheckIcon } from "../icons";
import { useApp } from "@/lib/store";

const STEPS = ["Basic", "Personal", "Address"];

export default function Signup() {
  const pop = useApp((s) => s.pop);
  const push = useApp((s) => s.push);
  const [step, setStep] = useState(0);

  const [userId, setUserId] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState<"M" | "F" | "O" | "">("");

  const [addr, setAddr] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");

  const next1 = () => step === 0 && userId.length >= 4 && mobile.length === 10 && email.includes("@") && password.length >= 8 && agree && setStep(1);
  const next2 = () => step === 1 && name.trim().length >= 3 && dob.length >= 8 && gender && setStep(2);
  const finish = () => {
    if (step === 2 && addr.trim().length >= 6 && city.trim() && pin.length === 6) {
      /* verify mobile via OTP before the account is activated */
      push("otp", { context: "signup", mobile: `+91 ${mobile.slice(0, 5)} ${mobile.slice(5)}`, name: name.trim() });
    }
  };

  const stepValid = [next1, next2, finish][step as 0 | 1 | 2];

  return (
    <div className="flex h-full flex-col bg-white">
      {/* header */}
      <div className="flex items-center gap-[10px] px-5 pb-2 pt-6">
        <button onClick={step === 0 ? pop : () => setStep(step - 1)} aria-label="Back" className="-ml-1 flex h-9 w-9 items-center justify-center rounded-full text-ir-text active:bg-ir-lav">
          <ChevronLeft className="h-[21px] w-[21px]" />
        </button>
        <span className="text-[17px] font-extrabold uppercase tracking-[0.08em] text-ir-text">
          Create Account
        </span>
      </div>

      {/* step indicator */}
      <div className="flex items-center px-5 pb-4 pt-2">
        {STEPS.map((label, i) => (
          <div key={label} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-[6px]">
              <span
                className={`flex h-[26px] w-[26px] items-center justify-center rounded-full text-[12px] font-bold transition-colors ${
                  i < step
                    ? "bg-ir-navy text-white"
                    : i === step
                      ? "border-2 border-ir-navy font-extrabold text-ir-navy"
                      : "border-2 border-[#e3e4e8] text-[#a3a4ab]"
                }`}
              >
                {i < step ? <CheckIcon className="h-3 w-3" /> : i + 1}
              </span>
              <span className={`text-[10.5px] font-bold uppercase tracking-[0.08em] ${i <= step ? "text-ir-navy" : "text-[#a3a4ab]"}`}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="mx-2 mt-[13px] h-[3px] flex-1 rounded-full">
                <div className={`h-full rounded-full ${i < step ? "bg-ir-navy" : "bg-[#e3e4e8]"}`} style={{ width: "100%" }} />
              </div>
            )}
          </div>
        ))}
      </div>

      <motion.div
        key={step}
        initial={{ x: 24, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        className="no-scrollbar flex-1 overflow-y-auto px-5 pb-4"
      >
        {step === 0 && (
          <div className="space-y-3">
            <div className="rounded-[18px] bg-ir-lav px-4 pb-[12px] pt-[10px]">
              <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-ir-label">IRCTC User ID</div>
              <input value={userId} onChange={(e) => setUserId(e.target.value.replace(/\s/g, "").slice(0, 20))} placeholder="e.g. anujj1004" className="mt-[4px] h-[30px] w-full bg-transparent text-[15.5px] font-semibold text-ir-text outline-none placeholder:font-medium placeholder:text-[#a3a4ab]" />
            </div>
            <div className="rounded-[18px] bg-ir-lav px-4 pb-[12px] pt-[10px]">
              <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-ir-label">Mobile number</div>
              <input value={mobile} onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))} inputMode="numeric" placeholder="10-digit mobile" className="mt-[4px] h-[30px] w-full bg-transparent text-[15.5px] font-semibold text-ir-text outline-none placeholder:font-medium placeholder:text-[#a3a4ab]" />
            </div>
            <div className="rounded-[18px] bg-ir-lav px-4 pb-[12px] pt-[10px]">
              <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-ir-label">Email</div>
              <input value={email} onChange={(e) => setEmail(e.target.value)} inputMode="email" placeholder="you@mail.com" className="mt-[4px] h-[30px] w-full bg-transparent text-[15.5px] font-semibold text-ir-text outline-none placeholder:font-medium placeholder:text-[#a3a4ab]" />
            </div>
            <div className="rounded-[18px] bg-ir-lav px-4 pb-[12px] pt-[10px]">
              <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-ir-label">Password</div>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 8 characters" className="mt-[4px] h-[30px] w-full bg-transparent text-[15.5px] font-semibold text-ir-text outline-none placeholder:font-medium placeholder:text-[#a3a4ab]" />
            </div>
            <button onClick={() => setAgree(!agree)} className="flex items-start gap-[9px] px-1 pt-1 text-left">
              <span className={`mt-[1px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[6px] border transition-colors ${agree ? "border-ir-navy bg-ir-navy" : "border-[#d4d4da] bg-white"}`}>
                {agree && <CheckIcon className="h-3 w-3 text-white" />}
              </span>
              <span className="text-[12px] font-medium leading-relaxed text-[#6d6f76]">
                I agree to the IRCTC terms of service and privacy policy, and confirm the information provided is accurate.
              </span>
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-3">
            <div className="rounded-[18px] bg-ir-lav px-4 pb-[12px] pt-[10px]">
              <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-ir-label">Full name (as on ID)</div>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Anuj Jha" className="mt-[4px] h-[30px] w-full bg-transparent text-[15.5px] font-semibold text-ir-text outline-none placeholder:font-medium placeholder:text-[#a3a4ab]" />
            </div>
            <div className="rounded-[18px] bg-ir-lav px-4 pb-[12px] pt-[10px]">
              <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-ir-label">Date of birth</div>
              <input value={dob} onChange={(e) => setDob(e.target.value.slice(0, 10))} placeholder="DD/MM/YYYY" inputMode="numeric" className="mt-[4px] h-[30px] w-full bg-transparent text-[15.5px] font-semibold text-ir-text outline-none placeholder:font-medium placeholder:text-[#a3a4ab]" />
            </div>
            <div className="rounded-[18px] bg-ir-lav px-4 pb-[14px] pt-[10px]">
              <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-ir-label">Gender</div>
              <div className="mt-[10px] flex gap-[18px]">
                {(
                  [
                    ["M", "Male"],
                    ["F", "Female"],
                    ["O", "Other"],
                  ] as const
                ).map(([g, label]) => (
                  <button key={g} onClick={() => setGender(g)} className="flex items-center gap-[7px]">
                    <span className={`flex h-[17px] w-[17px] items-center justify-center rounded-full border-2 ${gender === g ? "border-ir-navy" : "border-[#c9cad0]"}`}>
                      {gender === g && <span className="h-[8px] w-[8px] rounded-full bg-ir-navy" />}
                    </span>
                    <span className={`text-[13.5px] ${gender === g ? "font-bold text-ir-text" : "font-medium text-[#6d6f76]"}`}>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="rounded-[18px] bg-ir-lav px-4 pb-[12px] pt-[10px]">
              <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-ir-label">Address</div>
              <input value={addr} onChange={(e) => setAddr(e.target.value)} placeholder="Flat, street, locality" className="mt-[4px] h-[30px] w-full bg-transparent text-[15.5px] font-semibold text-ir-text outline-none placeholder:font-medium placeholder:text-[#a3a4ab]" />
            </div>
            <div className="flex gap-3">
              <div className="flex-1 rounded-[18px] bg-ir-lav px-4 pb-[12px] pt-[10px]">
                <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-ir-label">City</div>
                <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Mumbai" className="mt-[4px] h-[30px] w-full bg-transparent text-[15.5px] font-semibold text-ir-text outline-none placeholder:font-medium placeholder:text-[#a3a4ab]" />
              </div>
              <div className="w-[120px] rounded-[18px] bg-ir-lav px-4 pb-[12px] pt-[10px]">
                <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-ir-label">PIN code</div>
                <input value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))} inputMode="numeric" placeholder="400001" className="mt-[4px] h-[30px] w-full bg-transparent text-[15.5px] font-semibold text-ir-text outline-none placeholder:font-medium placeholder:text-[#a3a4ab]" />
              </div>
            </div>
            <div className="rounded-[16px] bg-ir-chip-green px-4 py-[12px]">
              <p className="text-[12px] font-semibold leading-relaxed text-ir-green">
                Almost done! An OTP will be sent to your mobile for verification.
              </p>
            </div>
          </div>
        )}
      </motion.div>

      <div className="shrink-0 px-5 pb-7 pt-1">
        <button
          onClick={step === 0 ? next1 : step === 1 ? next2 : finish}
          disabled={step === 0 && !agree}
          className="h-[54px] w-full rounded-[20px] bg-ir-coral text-[16px] font-bold text-white shadow-[0_10px_24px_rgba(251,83,74,0.3)] active:brightness-95 disabled:opacity-45 disabled:shadow-none"
        >
          {step === 0 ? "Agree and continue" : step === 1 ? "Continue" : "Create my account"}
        </button>
        {step === 0 && (
          <button onClick={() => { pop(); }} className="mx-auto mt-3 block text-[13.5px] font-semibold text-ir-navy underline underline-offset-2">
            Already registered? Sign in
          </button>
        )}
      </div>
    </div>
  );
}
