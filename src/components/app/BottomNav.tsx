"use client";

import { motion } from "framer-motion";
import { useApp, type Tab } from "@/lib/store";
import { HomeIcon, TicketIcon, HeadsetIcon, UserIcon } from "./icons";

const TABS: {
  id: Tab;
  label: string;
  icon: (a: { className?: string; filled?: boolean }) => React.ReactNode;
}[] = [
  { id: "home", label: "Home", icon: (a) => <HomeIcon {...a} /> },
  { id: "bookings", label: "Bookings", icon: (a) => <TicketIcon {...a} /> },
  { id: "help", label: "Help", icon: (a) => <HeadsetIcon {...a} /> },
  { id: "profile", label: "Profile", icon: (a) => <UserIcon {...a} /> },
];

/**
 * Floating dark pill navigation (Final UI Design) — 4 icons.
 * Rendered once at App level; the white active circle is a shared layoutId
 * spring that glides between icons while the bar itself never moves.
 */
export default function BottomNav() {
  const tab = useApp((s) => s.tab);
  const setTab = useApp((s) => s.setTab);

  return (
    <div className="pointer-events-none flex justify-center">
      <div className="pointer-events-auto mb-[14px] flex items-center gap-[6px] rounded-full bg-ir-pill p-[7px] shadow-[0_12px_30px_rgba(6,6,20,0.35)]">
        {TABS.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              aria-label={t.label}
              className="relative flex h-[54px] w-[54px] items-center justify-center rounded-full active:scale-95"
            >
              {active && (
                <motion.div
                  layoutId="nav-active-circle"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className="absolute inset-0 rounded-full bg-white"
                />
              )}
              <span
                className={`relative z-10 flex h-full w-full items-center justify-center rounded-full ${
                  active ? "text-[#131318]" : "bg-ir-pill-circle text-[#9d9ea7]"
                }`}
              >
                {t.icon({
                  className: "h-[23px] w-[23px]",
                  filled: active,
                })}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
