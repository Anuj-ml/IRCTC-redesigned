"use client";

import { useState } from "react";
import { ChevronRight, LogoutIcon, MedalIcon, ShieldCheckIcon, LockIcon, UsersIcon, WalletIcon, UserIcon } from "../icons";
import { useApp } from "@/lib/store";

const MENU = [
  { label: "My Profile", icon: UserIcon, to: "myprofile" as const },
  { label: "IRCTC E-Wallet", icon: WalletIcon, to: "wallet" as const },
  { label: "My Master List", icon: UsersIcon, to: "masterlist" as const },
  { label: "Loyalty", icon: MedalIcon, to: "loyalty" as const },
  { label: "Authenticate User", icon: ShieldCheckIcon, to: "authuser" as const },
  { label: "Change Password", icon: LockIcon, to: "changepw" as const },
  { label: "Logout", icon: LogoutIcon, to: null },
];

export default function Profile() {
  const push = useApp((s) => s.push);
  const logout = useApp((s) => s.logout);
  const { name, email } = useApp((s) => s.profile);
  const [confirmOut, setConfirmOut] = useState(false);

  return (
    <div className="relative flex h-full flex-col bg-white">
      <div className="no-scrollbar flex-1 overflow-y-auto px-5 pb-[130px] pt-[64px]">
        <div className="text-[14px] font-extrabold uppercase tracking-[0.16em] text-ir-navy">
          My Profile
        </div>
        <h1 className="mt-[4px] text-[28px] font-extrabold leading-tight text-ir-text">
          Manage Your Account
        </h1>

        {/* avatar block */}
        <div className="mt-7 flex flex-col items-center">
          <div className="flex h-[112px] w-[112px] items-center justify-center rounded-full bg-[#dfe7fb]">
            <img
              src="/assets/avatar_anuj.png"
              alt={name}
              className="h-[112px] w-[112px] rounded-full object-cover"
              draggable={false}
            />
          </div>
          <div className="mt-4 text-[24px] font-extrabold text-ir-text">{name}</div>
          <div className="mt-[2px] text-[14.5px] font-medium text-[#8c8d93]">
            {email}
          </div>
          <button
            onClick={() => push("editprofile")}
            className="mt-[10px] text-[14px] font-extrabold uppercase tracking-[0.1em] text-ir-navy underline underline-offset-4 active:opacity-60"
          >
            Edit Profile
          </button>
        </div>

        {/* menu */}
        <div className="mt-8 rounded-[26px] bg-ir-lav p-[10px]">
          {MENU.map((m, i) => (
            <button
              key={m.label}
              onClick={() => (m.to ? push(m.to) : setConfirmOut(true))}
              className={`flex h-[62px] w-full items-center gap-4 rounded-[25px] bg-white pl-6 pr-5 text-left active:brightness-[0.98] ${
                i > 0 ? "mt-[10px]" : ""
              }`}
            >
              <m.icon className="h-[21px] w-[21px] shrink-0 text-ir-text" />
              <span className="flex-1 text-[15.5px] font-semibold text-ir-text">{m.label}</span>
              <ChevronRight className="h-[17px] w-[17px] shrink-0 text-ir-text" />
            </button>
          ))}
        </div>
      </div>

      {/* logout confirm */}
      {confirmOut && (
        <div className="absolute inset-0 z-50 flex items-end bg-black/35 px-5 pb-10" onClick={() => setConfirmOut(false)}>
          <div
            className="w-full rounded-[26px] bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-[19px] font-extrabold text-ir-text">Logout?</div>
            <p className="mt-[6px] text-[14.5px] font-medium leading-relaxed text-[#6d6f76]">
              You will be signed out of IRCTC Rail Connect on this device. Your bookings stay safe on your account.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setConfirmOut(false)}
                className="h-[48px] flex-1 rounded-[20px] border-[1.5px] border-[#e3e3e9] bg-white text-[15px] font-bold text-ir-text active:bg-ir-lav"
              >
                Stay
              </button>
              <button
                onClick={() => {
                  setConfirmOut(false);
                  logout();
                }}
                className="h-[48px] flex-1 rounded-[20px] bg-ir-coral text-[15px] font-bold text-white active:brightness-95"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
