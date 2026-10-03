"use client";

/* Line icons drawn to match the Final UI Design (2px stroke, rounded caps). */

type P = { className?: string; filled?: boolean };

export const HomeIcon = ({ className, filled }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={filled ? 0 : 1.9} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1v-9.5Z" />
  </svg>
);

export const TicketIcon = ({ className, filled }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8Z" fill={filled ? "currentColor" : "none"} stroke={filled ? "none" : "currentColor"} />
    <path d="M14 6v2.4M14 11v2M14 15.6V18" stroke={filled ? "#131318" : "currentColor"} />
  </svg>
);

export const HeadsetIcon = ({ className, filled }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill={filled ? "currentColor" : "none"} stroke={filled ? "none" : "currentColor"} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 13a8 8 0 1 1 16 0" />
    <rect x="3" y="13" width="4.4" height="6" rx="2.1" />
    <rect x="16.6" y="13" width="4.4" height="6" rx="2.1" />
    {filled && <rect x="3" y="13" width="4.4" height="6" rx="2.1" stroke="currentColor" strokeWidth="1.6" fill="none" />}
  </svg>
);

export const UserIcon = ({ className, filled }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill={filled ? "currentColor" : "none"} stroke={filled ? "none" : "currentColor"} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="3.6" />
    <path d="M4.8 20a7.2 7.2 0 0 1 14.4 0" />
  </svg>
);

export const ChevronLeft = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m14.5 5.5-7 6.5 7 6.5" />
  </svg>
);

export const ChevronRight = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9.5 5.5 7 6.5-7 6.5" />
  </svg>
);

export const ChevronDown = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9.5 6 6 6-6" />
  </svg>
);

export const SwapIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 4.5v13.5M8 18l-3.2-3.2M8 18l3.2-3.2" transform="translate(0 0.5)" />
    <path d="M16.5 19.5V6M16.5 6l-3.2 3.2M16.5 6l3.2 3.2" transform="translate(0 -0.5)" />
  </svg>
);

export const SwapHIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 8.8h14.2M15.4 5.6l3.4 3.2-3.4 3.2" />
    <path d="M20 15.6H5.8M8.6 12.4l-3.4 3.2 3.4 3.2" />
  </svg>
);

export const CalendarIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.6" />
    <path d="M3.5 9.6h17M8 2.8v4M16 2.8v4" />
  </svg>
);

export const FilterIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
    <path d="M4 7.2h9M17.5 7.2H20M4 16.8h2.5M11 16.8h9" />
    <circle cx="15.2" cy="7.2" r="2.3" />
    <circle cx="8.7" cy="16.8" r="2.3" />
  </svg>
);

export const SortIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
    <path d="M5 8h14M8 12.5h8M10.5 17h3" />
  </svg>
);

export const HeartIcon = ({ className, filled }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20.3 4.9 13a4.7 4.7 0 0 1 0-6.6 4.5 4.5 0 0 1 6.5 0l.6.7.6-.7a4.5 4.5 0 0 1 6.5 0 4.7 4.7 0 0 1 0 6.6L12 20.3Z" />
  </svg>
);

export const EyeIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.8 12S6.3 5.9 12 5.9 21.2 12 21.2 12 17.7 18.1 12 18.1 2.8 12 2.8 12Z" />
    <circle cx="12" cy="12" r="2.9" />
  </svg>
);

export const EyeOffIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4.5 20 19.5" />
    <path d="M9.9 6.3A9 9 0 0 1 12 6.1c5.7 0 9.2 6 9.2 6a16.6 16.6 0 0 1-3 3.5M6.3 8A15.8 15.8 0 0 0 2.8 12s3.5 6.1 9.2 6.1a8.7 8.7 0 0 0 3.5-.7" />
    <path d="M10 10.2a2.9 2.9 0 0 0 4 4.1" />
  </svg>
);

export const CopyIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8.5" y="8.5" width="12" height="12" rx="2.4" />
    <path d="M15.5 5.5v-1a2 2 0 0 0-2-2h-9a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h1" transform="translate(1.5 1.5)" />
  </svg>
);

export const SearchIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <path d="m20.5 20.5-4.4-4.4" />
  </svg>
);

export const TrainFrontIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="3.5" width="14" height="14" rx="3.2" />
    <path d="M5 10.5h14M9.5 21l1.6-3.5M14.5 21l-1.6-3.5" />
    <circle cx="9" cy="14" r="0.4" />
    <circle cx="15" cy="14" r="0.4" />
  </svg>
);

export const BellIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 10a6 6 0 0 1 12 0c0 4 1.6 5.4 1.6 5.4H4.4S6 14 6 10Z" />
    <path d="M10.3 19a1.9 1.9 0 0 0 3.4 0" />
  </svg>
);

export const ClocheIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 17.5h16M5 17.5a7 7 0 0 1 14 0" />
    <path d="M12 10.5V9M10.4 9h3.2M2.8 20.5h18.4" />
  </svg>
);

export const CoachIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="3.5" width="16" height="13.5" rx="2.4" />
    <path d="M4 9h16M8 20.5h8M9.5 17v3.5M14.5 17v3.5" />
    <path d="M7.5 12.2h3M13.5 12.2h3" />
  </svg>
);

export const PhoneIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5.5 4h3l1.7 4-2 1.6a12.6 12.6 0 0 0 5.2 5.2l1.6-2 4 1.7v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 6.2 2 2 0 0 1 5.5 4Z" />
  </svg>
);

export const RefreshIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 11.5a8 8 0 1 0-1.7 6" />
    <path d="M20 5v6h-6" transform="translate(0 -1)" />
  </svg>
);

export const MapPinIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21.5s7-5.8 7-11a7 7 0 1 0-14 0c0 5.2 7 11 7 11Z" />
    <circle cx="12" cy="10.3" r="2.5" />
  </svg>
);

export const SendIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 3 10.4 13.6M21 3l-6.8 18-3.8-7.4L3 9.8 21 3Z" />
  </svg>
);

export const PlusIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const MinusIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M5 12h14" />
  </svg>
);

export const CheckIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const DownloadIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3.5v11M12 14.5l-4-4M12 14.5l4-4M4.5 19.5h15" />
  </svg>
);

export const QrIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="6.5" height="6.5" rx="1.4" />
    <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.4" />
    <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.4" />
    <path d="M13.5 13.5h3v3h-3zM20 13.5v.01M13.5 20v.01M17 20h3v-3M20 20v.01" />
  </svg>
);

export const WalletIcon = ({ className, filled }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill={filled ? "currentColor" : "none"} stroke={filled ? "none" : "currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="6" width="18" height="14" rx="2.6" />
    <path d="M3 10h18" stroke={filled ? "#fff" : "currentColor"} strokeWidth="0" />
    <path d="M16.2 14.6h2" stroke={filled ? "#fff" : "currentColor"} />
  </svg>
);

export const CardIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5.5" width="18" height="13" rx="2.4" />
    <path d="M3 9.8h18M6.5 15h4" />
  </svg>
);

export const UsersIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="8.5" r="3.1" />
    <path d="M3.4 19.5a5.6 5.6 0 0 1 11.2 0" />
    <path d="M15.4 5.9a3.1 3.1 0 0 1 0 5.2M17.6 14.6a5.6 5.6 0 0 1 3 4.9" />
  </svg>
);

export const MedalIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="14.5" r="4.5" />
    <path d="m8.6 11-3-7h4l2.4 5 2.4-5h4l-3 7" />
  </svg>
);

export const ShieldCheckIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21.5c4.5-1.8 7-5 7-9.5V5.8L12 2.9 5 5.8V12c0 4.5 2.5 7.7 7 9.5Z" />
    <path d="m9 11.8 2.2 2.2L15.4 9.6" />
  </svg>
);

export const LockIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4.5" y="10.5" width="15" height="10" rx="2.4" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    <path d="M12 14.5v2.5" />
  </svg>
);

export const LogoutIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 4H6a1.6 1.6 0 0 0-1.6 1.6v12.8A1.6 1.6 0 0 0 6 20h8" />
    <path d="M10 12h10.5M17 8.5l3.5 3.5-3.5 3.5" />
  </svg>
);

export const ChatIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.5 11.5a7.7 7.7 0 0 1-8 7.5 8.6 8.6 0 0 1-3.2-.6L4 19.5l1.2-4A7 7 0 0 1 4.5 12a7.7 7.7 0 0 1 8-7.5 7.7 7.7 0 0 1 8 7Z" />
  </svg>
);

export const LocateIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21 3-9.5 18-2.4-8.1L1 10.5 21 3Z" />
  </svg>
);
