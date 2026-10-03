"use client";

/** iOS-style status bar: 9:41 + cellular / wifi / battery glyphs */
export default function StatusBar({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const c = tone === "dark" ? "#0b0b0c" : "#ffffff";
  return (
    <div className="relative z-40 flex h-[54px] w-full shrink-0 items-end justify-between px-8 pb-[10px]">
      <span
        className="text-[16px] font-bold tracking-[0.02em]"
        style={{ color: c }}
      >
        9:41
      </span>
      <div className="flex items-center gap-[7px]">
        {/* cellular */}
        <svg width="19" height="12" viewBox="0 0 19 12" fill="none">
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={i * 5}
              y={9 - i * 3}
              width="3.4"
              height={3 + i * 3}
              rx="1"
              fill={c}
            />
          ))}
        </svg>
        {/* wifi */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <path
            d="M8.5 2.6c2.5 0 4.8 1 6.5 2.6l1.4-1.5C14.4 1.7 11.6.5 8.5.5S2.6 1.7.6 3.7L2 5.2C3.7 3.5 6 2.6 8.5 2.6Zm0 4c1.4 0 2.7.6 3.7 1.5l1.4-1.5c-1.4-1.3-3.2-2-5.1-2s-3.7.7-5.1 2l1.4 1.5c1-.9 2.3-1.5 3.7-1.5Zm0 3.9 1.8-1.9c-.5-.5-1.1-.7-1.8-.7s-1.3.2-1.8.7L8.5 10.5Z"
            fill={c}
          />
        </svg>
        {/* battery */}
        <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
          <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke={c} strokeOpacity="0.45" />
          <rect x="2" y="2" width="20" height="9" rx="2.2" fill={c} />
          <path d="M25.5 4.5v4a2.2 2.2 0 0 0 0-4Z" fill={c} fillOpacity="0.45" />
        </svg>
      </div>
    </div>
  );
}
