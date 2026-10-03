"use client";

import { create } from "zustand";
import type { Booking } from "./data";

/* ---------------------------------- types --------------------------------- */

export interface UserProfile {
  name: string;
  email: string;
  mobile: string;
  dob: string;
  city: string;
  gender: "Female" | "Male" | "Other";
}

export type Tab = "home" | "bookings" | "help" | "profile";

export type ScreenId =
  | "splash"
  | "login"
  | "signup"
  | "otp"
  | "bookingdetails"
  | "home"
  | "bookings"
  | "help"
  | "profile"
  | "editprofile"
  | "stations"
  | "trains"
  | "booking"
  | "seats"
  | "review"
  | "paymethods"
  | "success"
  | "ticket"
  | "running"
  | "livetrains"
  | "livemap"
  | "route"
  | "chat"
  | "myprofile"
  | "wallet"
  | "transactions"
  | "authuser"
  | "changepw"
  | "managepay"
  | "masterlist"
  | "loyalty";

export interface Station {
  code: string;
  name: string;
  city: string;
}

export interface SeatPassenger {
  name: string;
  age: string;
  gender: "M" | "F" | "O";
  berth: string;
  seatNo: string;
  coach: string;
  price: number;
}

interface AppState {
  /* navigation */
  stack: ScreenId[];
  params: Record<string, unknown> | null;
  direction: 1 | -1;
  tab: Tab;
  push: (s: ScreenId, params?: Record<string, unknown>) => void;
  pop: () => void;
  resetTo: (s: ScreenId) => void;
  setTab: (t: Tab) => void;

  /* auth */
  loggedIn: boolean;
  login: () => void;
  logout: () => void;

  /* user profile — edited in Edit Profile, reflected app-wide */
  profile: UserProfile;
  updateProfile: (p: Partial<UserProfile>) => void;

  /* booking opened from My Bookings */
  openBooking: Booking | null;
  openBookingDetails: (b: Booking) => void;

  /* journey */
  fromStation: Station | null;
  toStation: Station | null;
  journeyDate: Date;
  journeyClass: string;
  setFromStation: (s: Station) => void;
  setToStation: (s: Station) => void;
  setJourneyDate: (d: Date) => void;
  setJourneyClass: (c: string) => void;
  swapStations: () => void;
  searchTrains: () => void;

  /* train + passengers */
  selectedTrain: number | null;
  selectTrain: (i: number) => void;
  passengers: SeatPassenger[];
  setPassengers: (p: SeatPassenger[]) => void;

  /* favorites */
  favs: boolean[];
  toggleFav: (i: number) => void;

  /* wallet */
  walletBalance: number;
  debitWallet: (n: number) => boolean;
}

/* --------------------------------- store ---------------------------------- */

export const useApp = create<AppState>((set, get) => ({
  stack: ["splash"],
  params: null,
  direction: 1,
  tab: "home",
  push: (s, params) =>
    set((st) => ({ stack: [...st.stack, s], params: params ?? null, direction: 1 })),
  pop: () =>
    set((st) => ({
      stack: st.stack.length > 1 ? st.stack.slice(0, -1) : st.stack,
      direction: -1,
      params: null,
    })),
  resetTo: (s) => set({ stack: [s], direction: -1, params: null }),
  setTab: (t) => {
    const roots: Record<Tab, ScreenId> = {
      home: "home",
      bookings: "bookings",
      help: "help",
      profile: "profile",
    };
    set({ tab: t, stack: [roots[t]], direction: -1, params: null });
  },

  loggedIn: false,
  login: () => set({ loggedIn: true }),
  logout: () =>
    set({ loggedIn: false, stack: ["login"], tab: "home", params: null, direction: -1 }),

  profile: {
    name: "Anuj Jha",
    email: "anujjha1004@gmail.com",
    mobile: "+91 98765 43210",
    dob: "14 Aug 1999",
    city: "Mumbai, Maharashtra",
    gender: "Male",
  },
  updateProfile: (p) => set((st) => ({ profile: { ...st.profile, ...p } })),

  openBooking: null,
  openBookingDetails: (b) =>
    set((st) => ({ openBooking: b, stack: [...st.stack, "bookingdetails" as ScreenId], direction: 1, params: null })),

  fromStation: null,
  toStation: null,
  journeyDate: new Date(2026, 4, 21), // Thu, 21 May 2026 — per design
  journeyClass: "ALL",
  setFromStation: (s) => set({ fromStation: s }),
  setToStation: (s) => set({ toStation: s }),
  setJourneyDate: (d) => set({ journeyDate: d }),
  setJourneyClass: (c) => set({ journeyClass: c }),
  swapStations: () => set((st) => ({ fromStation: st.toStation, toStation: st.fromStation })),
  searchTrains: () => {
    const st = get();
    if (!st.fromStation || !st.toStation) {
      set({
        fromStation: st.fromStation ?? STATION_FALLBACK.from,
        toStation: st.toStation ?? STATION_FALLBACK.to,
      });
    }
    set((s2) => ({ stack: [...s2.stack, "trains" as ScreenId], direction: 1, params: null }));
  },

  selectedTrain: null,
  selectTrain: (i) => set({ selectedTrain: i }),
  passengers: [],
  setPassengers: (p) => set({ passengers: p }),

  favs: [false, false, false, false, false, false, false, false],
  toggleFav: (i) =>
    set((st) => {
      const favs = [...st.favs];
      while (favs.length <= i) favs.push(false);
      favs[i] = !favs[i];
      return { favs };
    }),

  walletBalance: 1414.55,
  debitWallet: (n) => {
    if (get().walletBalance < n) return false;
    set((st) => ({ walletBalance: +(st.walletBalance - n).toFixed(2) }));
    return true;
  },
}));

const STATION_FALLBACK = {
  from: { code: "NDLS", name: "New Delhi", city: "New Delhi" },
  to: { code: "BCT", name: "Mumbai Central", city: "Mumbai" },
};
