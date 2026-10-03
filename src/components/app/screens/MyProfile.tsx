"use client";

import ScreenHeader from "../ScreenHeader";
import { useApp } from "@/lib/store";

export default function MyProfile() {
  const pop = useApp((s) => s.pop);
  const push = useApp((s) => s.push);
  const profile = useApp((s) => s.profile);

  const FIELDS = [
    { label: "Full Name", value: profile.name },
    { label: "User Name", value: "anujj1004" },
    { label: "Email", value: profile.email },
    { label: "Mobile", value: profile.mobile },
    { label: "Date of Birth", value: profile.dob },
    { label: "Gender", value: profile.gender },
    { label: "City", value: profile.city },
    { label: "Aadhaar Status", value: "Linked · Verified" },
  ];

  return (
    <div className="flex h-full flex-col bg-white">
      <ScreenHeader title="My Profile" onBack={pop} />

      <div className="no-scrollbar flex-1 overflow-y-auto px-4 pb-6">
        {/* hero */}
        <div className="flex flex-col items-center rounded-[24px] bg-ir-lav px-4 pb-5 pt-5">
          <img
            src="/assets/avatar_anuj.png"
            alt={profile.name}
            className="h-[96px] w-[96px] rounded-full object-cover"
            draggable={false}
          />
          <div className="mt-3 text-[19px] font-extrabold text-ir-text">{profile.name}</div>
          <div className="mt-[2px] text-[13px] font-medium text-[#8c8d93]">
            {profile.email} · {profile.mobile}
          </div>
          <button
            onClick={() => push("editprofile")}
            className="mt-3 h-[52px] w-full rounded-[20px] bg-ir-coral text-[16px] font-bold text-white shadow-[0_10px_24px_rgba(251,83,74,0.3)] active:brightness-95"
          >
            Edit Profile
          </button>
        </div>

        {/* fields */}
        <div className="mt-4 rounded-[24px] bg-ir-lav px-[10px] py-[10px]">
          {FIELDS.map((f, i) => (
            <div
              key={f.label}
              className={`flex items-center justify-between rounded-[18px] bg-white px-4 py-[13px] ${i > 0 ? "mt-[8px]" : ""}`}
            >
              <span className="text-[13px] font-bold uppercase tracking-[0.06em] text-ir-label">{f.label}</span>
              <span className="ml-3 truncate text-[14px] font-semibold text-ir-text">{f.value}</span>
            </div>
          ))}
        </div>

        <p className="mt-4 px-2 text-[11.5px] font-medium leading-relaxed text-[#8c8d93]">
          Your IRCTC master data is used for faster bookings. Changes to name and mobile require OTP verification.
        </p>
      </div>
    </div>
  );
}
