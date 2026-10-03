/**
 * Desktop presentation frame — realistic phone bezel only (no fake status bar /
 * dynamic island; real devices show their own chrome). Mobile: full-screen app.
 */
"use client";

import { useEffect, useState } from "react";

export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const fit = () => {
      const s = Math.min(1, (window.innerHeight - 32) / 872, (window.innerWidth - 24) / 436);
      setScale(s);
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <div className="mockup-backdrop flex h-[100dvh] w-full items-center justify-center overflow-hidden">
      <div
        className="relative h-[848px] w-[412px] shrink-0"
        style={{ transform: `scale(${scale})` }}
      >
        {/* titanium bezel */}
        <div className="absolute inset-0 rounded-[68px] bg-[#4a4b4f] shadow-[0_30px_80px_rgba(0,0,0,0.35),inset_0_0_3px_rgba(255,255,255,0.4)]" />
        <div className="absolute inset-[3px] rounded-[65px] bg-[#2a2a2d]" />
        <div className="absolute inset-[13px] overflow-hidden rounded-[55px] bg-black">
          <div className="relative h-full w-full overflow-hidden bg-white">{children}</div>
        </div>
        {/* side buttons */}
        <div className="absolute -left-[3px] top-[168px] h-[32px] w-[4px] rounded-l-sm bg-[#3d3e42]" />
        <div className="absolute -left-[3px] top-[224px] h-[58px] w-[4px] rounded-l-sm bg-[#3d3e42]" />
        <div className="absolute -left-[3px] top-[296px] h-[58px] w-[4px] rounded-l-sm bg-[#3d3e42]" />
        <div className="absolute -right-[3px] top-[248px] h-[92px] w-[4px] rounded-r-sm bg-[#3d3e42]" />
      </div>
    </div>
  );
}
