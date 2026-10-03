"use client";

import { useState } from "react";
import ScreenHeader from "../ScreenHeader";
import DobSheet from "../DobSheet";
import { CalendarIcon, CheckIcon } from "../icons";
import { useApp } from "@/lib/store";

/* Edit Profile — fields live in the app store, so updates are reflected
   everywhere (Home greeting, Profile, My Profile, Chat, Wallet, Loyalty).
   Mobile-number changes require OTP (IRCTC policy); DOB uses a 2-step
   calendar (year first, then day+month grid). */
export default function EditProfile() {
  const { pop, push, profile, updateProfile } = useApp();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [mobile, setMobile] = useState(profile.mobile);
  const [dob, setDob] = useState(profile.dob);
  const [city, setCity] = useState(profile.city);
  const [gender, setGender] = useState(profile.gender);

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [dobOpen, setDobOpen] = useState(false);

  const save = () => {
    if (name.trim().length < 3) return setError("Enter your full name");
    if (!email.includes("@")) return setError("Enter a valid email address");
    if (mobile.replace(/\D/g, "").length < 10) return setError("Enter a valid 10-digit mobile number");
    setError("");
    updateProfile({ name: name.trim(), email: email.trim(), dob, city: city.trim(), gender });

    const newDigits = mobile.replace(/\D/g, "").slice(-10);
    const oldDigits = profile.mobile.replace(/\D/g, "").slice(-10);
    if (newDigits !== oldDigits) {
      /* mobile changed → OTP verification required before it is saved */
      push("otp", { context: "mobile", mobile: `+91 ${newDigits.slice(0, 5)} ${newDigits.slice(5)}` });
      return;
    }
    setSaved(true);
  };

  return (
    <div className="flex h-full flex-col bg-white">
      <ScreenHeader title="Edit Profile" onBack={pop} />

      <div className="no-scrollbar flex-1 overflow-y-auto px-4 pb-6">
        {/* avatar */}
        <div className="flex flex-col items-center rounded-[24px] bg-ir-lav px-4 pb-5 pt-5">
          <img
            src="/assets/avatar_anuj.png"
            alt={profile.name}
            className="h-[96px] w-[96px] rounded-full object-cover"
            draggable={false}
          />
          <div className="mt-3 text-[15px] font-bold text-ir-navy underline underline-offset-4">Change photo</div>
        </div>

        {/* form */}
        <div className="mt-4 rounded-[24px] bg-ir-lav px-[10px] py-[10px]">
          {(
            [
              ["Full Name", name, setName, "Enter your full name", "text"],
              ["Email", email, setEmail, "Enter your email", "email"],
              ["Mobile", mobile, setMobile, "Enter your mobile number", "tel"],
            ] as const
          ).map(([label, val, setter, ph, mode], i) => (
            <div key={label} className={`rounded-[18px] bg-white px-4 pb-[12px] pt-[10px] ${i > 0 ? "mt-[8px]" : ""}`}>
              <div className="text-[11px] font-bold uppercase tracking-[0.06em] text-ir-label">{label}</div>
              <input
                value={val}
                onChange={(e) => setter(e.target.value)}
                inputMode={mode === "text" ? "text" : mode}
                placeholder={ph}
                className="mt-[4px] h-[30px] w-full bg-transparent text-[15px] font-semibold text-ir-text outline-none placeholder:text-[#a3a4ab]"
              />
            </div>
          ))}

          {/* DOB — calendar picker */}
          <button
            onClick={() => setDobOpen(true)}
            className="mt-[8px] block w-full rounded-[18px] bg-white px-4 pb-[12px] pt-[10px] text-left"
          >
            <div className="text-[11px] font-bold uppercase tracking-[0.06em] text-ir-label">Date of Birth</div>
            <div className="mt-[4px] flex h-[30px] items-center justify-between">
              <span className="text-[15px] font-semibold text-ir-text">{dob}</span>
              <CalendarIcon className="h-[18px] w-[18px] text-ir-navy" />
            </div>
          </button>

          {/* city */}
          <div className="mt-[8px] rounded-[18px] bg-white px-4 pb-[12px] pt-[10px]">
            <div className="text-[11px] font-bold uppercase tracking-[0.06em] text-ir-label">City</div>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter your city"
              className="mt-[4px] h-[30px] w-full bg-transparent text-[15px] font-semibold text-ir-text outline-none placeholder:text-[#a3a4ab]"
            />
          </div>

          {/* gender chips */}
          <div className="rounded-[18px] bg-white px-4 pb-[13px] pt-[10px] mt-[8px]">
            <div className="text-[11px] font-bold uppercase tracking-[0.06em] text-ir-label">Gender</div>
            <div className="mt-[8px] flex gap-[8px]">
              {(["Female", "Male", "Other"] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`h-[38px] flex-1 rounded-[12px] border-[1.5px] text-[13px] font-bold ${
                    gender === g ? "border-ir-navy bg-ir-lav text-ir-navy" : "border-[#e3e3e9] text-ir-text"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>

        {error && <div className="mt-3 px-2 text-[12px] font-medium text-ir-red">{error}</div>}

        <p className="mt-4 px-2 text-[11.5px] font-medium leading-relaxed text-[#8c8d93]">
          Changes to your mobile number require OTP verification as per IRCTC policy. Your details are used for faster bookings.
        </p>

        <button
          onClick={save}
          className="mt-5 h-[54px] w-full rounded-[20px] bg-ir-coral text-[16px] font-bold text-white shadow-[0_10px_24px_rgba(251,83,74,0.3)] active:brightness-95"
        >
          Save changes
        </button>
      </div>

      <DobSheet open={dobOpen} onClose={() => setDobOpen(false)} value={dob} onSelect={setDob} />

      {/* success popup (same-path changes) */}
      {saved && (
        <div className="absolute inset-0 z-50 flex items-end bg-black/35 px-5 pb-10" onClick={() => { setSaved(false); pop(); }}>
          <div className="w-full rounded-[26px] bg-white p-6 text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <span className="mx-auto flex h-[46px] w-[46px] items-center justify-center rounded-full bg-ir-chip-green text-ir-green">
              <CheckIcon className="h-[21px] w-[21px]" />
            </span>
            <div className="mt-3 text-[18px] font-extrabold text-ir-text">Profile updated</div>
            <p className="mt-[6px] text-[13.5px] font-medium leading-relaxed text-[#6d6f76]">
              Your details have been saved and are updated across the app.
            </p>
            <button
              onClick={() => { setSaved(false); pop(); }}
              className="mt-5 h-[48px] w-full rounded-[20px] bg-ir-coral text-[15px] font-bold text-white active:brightness-95"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
