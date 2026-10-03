/* Data for the IRCTC Rail Connect app — matches the Final UI Design. */

import type { Station } from "./store";

/* --------------------------------- trains --------------------------------- */

export interface TrainClass {
  code: string;
  name: string;
  price: number;
  status: string;
  state: "available" | "waitlist" | "unavailable";
}

export interface Train {
  id: string;
  name: string;
  badge?: "FASTEST" | "MOST POPULAR";
  from: string;
  to: string;
  dep: string;
  arr: string;
  duration: string;
  classes: TrainClass[];
}

export const TRAINS: Train[] = [
  {
    id: "12952",
    name: "MMCT Tejas Raj",
    badge: "FASTEST",
    from: "NDLS",
    to: "BCT",
    dep: "16:55",
    arr: "08:35",
    duration: "15h 40m",
    classes: [
      { code: "3A", name: "AC 3 Tier", price: 2400, status: "AVL 45", state: "available" },
      { code: "2A", name: "AC 2 Tier", price: 0, status: "Not AVL", state: "unavailable" },
      { code: "1A", name: "AC First", price: 2600, status: "WL 12", state: "waitlist" },
    ],
  },
  {
    id: "12908",
    name: "MHRST SMPRK K EX",
    badge: "MOST POPULAR",
    from: "NDLS",
    to: "BCT",
    dep: "16:30",
    arr: "09:15",
    duration: "16h 45m",
    classes: [
      { code: "SL", name: "Sleeper", price: 615, status: "AVL 45", state: "available" },
      { code: "3E", name: "AC 3 Economy", price: 1510, status: "AVL 40", state: "available" },
      { code: "3A", name: "AC 3 Tier", price: 1610, status: "WL 7", state: "waitlist" },
    ],
  },
  {
    id: "12954",
    name: "AK RAJDHANI EX",
    from: "NDLS",
    to: "BCT",
    dep: "17:40",
    arr: "10:55",
    duration: "17h 15m",
    classes: [
      { code: "3A", name: "AC 3 Tier", price: 2340, status: "AVL 132", state: "available" },
      { code: "2A", name: "AC 2 Tier", price: 3405, status: "AVL 64", state: "available" },
      { code: "1A", name: "AC First", price: 5820, status: "Not AVL", state: "unavailable" },
    ],
  },
  {
    id: "12926",
    name: "PASCHIM EXPRESS",
    from: "NDLS",
    to: "BCT",
    dep: "11:25",
    arr: "16:15",
    duration: "28h 50m",
    classes: [
      { code: "SL", name: "Sleeper", price: 730, status: "AVL 212", state: "available" },
      { code: "3A", name: "AC 3 Tier", price: 1985, status: "WL 34", state: "waitlist" },
      { code: "2A", name: "AC 2 Tier", price: 2870, status: "AVL 12", state: "available" },
    ],
  },
  {
    id: "12138",
    name: "PUNJAB MAIL",
    from: "NDLS",
    to: "BCT",
    dep: "05:15",
    arr: "07:35",
    duration: "26h 20m",
    classes: [
      { code: "SL", name: "Sleeper", price: 665, status: "AVL 88", state: "available" },
      { code: "3A", name: "AC 3 Tier", price: 1810, status: "AVL 23", state: "available" },
      { code: "2S", name: "Second Sitting", price: 385, status: "Not AVL", state: "unavailable" },
    ],
  },
  {
    id: "12290",
    name: "NGP DURONTO EX",
    from: "NDLS",
    to: "BCT",
    dep: "20:05",
    arr: "13:25",
    duration: "17h 20m",
    classes: [
      { code: "3A", name: "AC 3 Tier", price: 2510, status: "AVL 56", state: "available" },
      { code: "SL", name: "Sleeper", price: 0, status: "Not AVL", state: "unavailable" },
      { code: "2A", name: "AC 2 Tier", price: 3645, status: "WL 9", state: "waitlist" },
    ],
  },
  {
    id: "22914",
    name: "BANDRA HUMSAFAR",
    from: "NDLS",
    to: "BCT",
    dep: "23:15",
    arr: "18:00",
    duration: "18h 45m",
    classes: [
      { code: "3A", name: "AC 3 Tier", price: 2190, status: "AVL 120", state: "available" },
      { code: "3E", name: "AC 3 Economy", price: 1745, status: "AVL 78", state: "available" },
      { code: "SL", name: "Sleeper", price: 0, status: "Not AVL", state: "unavailable" },
    ],
  },
  {
    id: "11058",
    name: "DADAR EXPRESS",
    from: "NDLS",
    to: "BCT",
    dep: "23:00",
    arr: "05:30",
    duration: "30h 30m",
    classes: [
      { code: "SL", name: "Sleeper", price: 595, status: "WL 45", state: "waitlist" },
      { code: "3A", name: "AC 3 Tier", price: 1680, status: "AVL 18", state: "available" },
      { code: "2S", name: "Second Sitting", price: 320, status: "AVL 90", state: "available" },
    ],
  },
  {
    id: "12172",
    name: "LTT HW AC EXPRESS",
    from: "NDLS",
    to: "BCT",
    dep: "14:10",
    arr: "12:35",
    duration: "22h 25m",
    classes: [
      { code: "3A", name: "AC 3 Tier", price: 1935, status: "AVL 44", state: "available" },
      { code: "2A", name: "AC 2 Tier", price: 2805, status: "AVL 21", state: "available" },
      { code: "CC", name: "AC Chair Car", price: 1215, status: "Not AVL", state: "unavailable" },
    ],
  },
];

export const CLASS_OPTIONS = [
  { code: "SL", name: "Sleeper" },
  { code: "3E", name: "AC 3 Economy" },
  { code: "3A", name: "AC 3 Tier" },
  { code: "2A", name: "AC 2 Tier" },
  { code: "1A", name: "AC First" },
  { code: "CC", name: "AC Chair Car" },
  { code: "2S", name: "Second Sitting" },
];

/* -------------------------------- stations -------------------------------- */

export const STATIONS: Station[] = [
  { code: "NDLS", name: "New Delhi", city: "New Delhi" },
  { code: "BCT", name: "Mumbai Central", city: "Mumbai" },
  { code: "NZM", name: "H Nizamuddin", city: "New Delhi" },
  { code: "CSMT", name: "C Shivaji Mah T", city: "Mumbai" },
  { code: "LTT", name: "Lokmanya Tilak T", city: "Mumbai" },
  { code: "PNBE", name: "Patna Jn", city: "Patna" },
  { code: "HWH", name: "Howrah Jn", city: "Kolkata" },
  { code: "SDAH", name: "Sealdah", city: "Kolkata" },
  { code: "MAS", name: "Mgr Chennai Ctr", city: "Chennai" },
  { code: "SBC", name: "Ksr Bengaluru", city: "Bengaluru" },
  { code: "SC", name: "Secunderabad Jn", city: "Hyderabad" },
  { code: "ADI", name: "Ahmedabad Jn", city: "Ahmedabad" },
  { code: "JP", name: "Jaipur Jn", city: "Jaipur" },
  { code: "LKO", name: "Lucknow Charbagh", city: "Lucknow" },
  { code: "CNB", name: "Kanpur Central", city: "Kanpur" },
  { code: "PNVL", name: "Panvel", city: "Navi Mumbai" },
  { code: "PUNE", name: "Pune Jn", city: "Pune" },
  { code: "BPL", name: "Bhopal Jn", city: "Bhopal" },
  { code: "JBP", name: "Jabalpur Jn", city: "Jabalpur" },
  { code: "ET", name: "Itarsi Jn", city: "Itarsi" },
  { code: "NGP", name: "Nagpur Jn", city: "Nagpur" },
  { code: "BSL", name: "Bhusaval Jn", city: "Bhusaval" },
  { code: "ST", name: "Surat", city: "Surat" },
  { code: "BRC", name: "Vadodara Jn", city: "Vadodara" },
  { code: "KOTA", name: "Kota Jn", city: "Kota" },
  { code: "MTJ", name: "Mathura Jn", city: "Mathura" },
  { code: "AGC", name: "Agra Cantt", city: "Agra" },
  { code: "GWL", name: "Gwalior Jn", city: "Gwalior" },
  { code: "JHS", name: "Jhansi Jn", city: "Jhansi" },
  { code: "ALD", name: "Prayagraj Jn", city: "Prayagraj" },
  { code: "BSB", name: "Varanasi Jn", city: "Varanasi" },
  { code: "GKP", name: "Gorakhpur Jn", city: "Gorakhpur" },
  { code: "ASR", name: "Amritsar Jn", city: "Amritsar" },
  { code: "JAT", name: "Jammu Tawi", city: "Jammu" },
  { code: "CDG", name: "Chandigarh", city: "Chandigarh" },
  { code: "UHL", name: "Una Himachal", city: "Una" },
  { code: "DDN", name: "Dehradun", city: "Dehradun" },
  { code: "HW", name: "Haridwar Jn", city: "Haridwar" },
  { code: "BSBS", name: "Banaras", city: "Varanasi" },
  { code: "CPR", name: "Chhapra", city: "Chhapra" },
  { code: "DNR", name: "Danapur", city: "Patna" },
  { code: "RNC", name: "Ranchi Jn", city: "Ranchi" },
  { code: "TATA", name: "Tatanagar Jn", city: "Jamshedpur" },
  { code: "BBS", name: "Bhubaneswar", city: "Bhubaneswar" },
  { code: "VSKP", name: "Visakhapatnam", city: "Visakhapatnam" },
  { code: "BZA", name: "Vijayawada Jn", city: "Vijayawada" },
  { code: "TEN", name: "Tirunelveli", city: "Tirunelveli" },
  { code: "ERS", name: "Ernakulam Jn", city: "Kochi" },
  { code: "TVC", name: "Thiruvananthapuram", city: "Trivandrum" },
  { code: "MAQ", name: "Mangaluru Ctr", city: "Mangaluru" },
  { code: "UBL", name: "Hubballi Jn", city: "Hubballi" },
  { code: "GIMB", name: "Gandhidham Bg", city: "Gandhidham" },
  { code: "JU", name: "Jodhpur Jn", city: "Jodhpur" },
  { code: "UDZ", name: "Udaipur City", city: "Udaipur" },
  { code: "BKN", name: "Bikaner Jn", city: "Bikaner" },
  { code: "JSM", name: "Jaisalmer", city: "Jaisalmer" },
];

/* -------------------------- seat selection (S-2) -------------------------- */

export type SeatStatus = "available" | "unavailable" | "women" | "disabled";

export interface Seat {
  num: string;
  berth: "Lower" | "Middle" | "Upper";
  price?: number;
  status: SeatStatus;
}

// S-2 coach seat map (first-version style, matches original mockup)
export const SEAT_ROWS: Seat[][] = [
  [
    { num: "01", berth: "Lower", status: "women" },
    { num: "02", berth: "Middle", status: "women" },
    { num: "03", berth: "Upper", status: "women" },
    { num: "07", berth: "Lower", status: "women" },
  ],
  [
    { num: "04", berth: "Lower", status: "women" },
    { num: "05", berth: "Middle", status: "women" },
    { num: "06", berth: "Upper", status: "women" },
    { num: "08", berth: "Upper", status: "women" },
  ],
  [
    { num: "09", berth: "Lower", price: 100, status: "unavailable" },
    { num: "10", berth: "Middle", price: 25, status: "unavailable" },
    { num: "11", berth: "Upper", price: 50, status: "unavailable" },
    { num: "15", berth: "Lower", status: "disabled" },
  ],
  [
    { num: "12", berth: "Lower", price: 100, status: "unavailable" },
    { num: "13", berth: "Middle", price: 25, status: "unavailable" },
    { num: "14", berth: "Upper", price: 50, status: "unavailable" },
    { num: "16", berth: "Upper", status: "disabled" },
  ],
  [
    { num: "17", berth: "Lower", price: 100, status: "available" },
    { num: "18", berth: "Middle", price: 25, status: "available" },
    { num: "19", berth: "Upper", price: 50, status: "available" },
    { num: "23", berth: "Lower", price: 75, status: "available" },
  ],
  [
    { num: "20", berth: "Lower", price: 100, status: "available" },
    { num: "21", berth: "Middle", price: 25, status: "available" },
    { num: "22", berth: "Upper", price: 50, status: "available" },
    { num: "24", berth: "Upper", price: 25, status: "available" },
  ],
  [
    { num: "25", berth: "Lower", price: 100, status: "available" },
    { num: "26", berth: "Middle", price: 25, status: "available" },
    { num: "27", berth: "Upper", price: 50, status: "available" },
    { num: "31", berth: "Lower", price: 75, status: "available" },
  ],
];

export const AUTO_SEAT = { num: "19", berth: "Upper" as const, price: 50, status: "available" as const };

/* -------------------------------- bookings -------------------------------- */

export interface Booking {
  pnr: string;
  date: string; // header chip date
  status: "BOOKED" | "CANCELLED" | "COMPLETED";
  trainId: string;
  trainName: string;
  from: Station;
  to: Station;
  cls: string;
  quota: string;
  passengers: string[];
  coach: string;
}

const NDLS: Station = { code: "NDLS", name: "New Delhi", city: "New Delhi" };
const BCT: Station = { code: "BCT", name: "Mumbai Central", city: "Mumbai" };

export const BOOKINGS: Booking[] = [
  {
    pnr: "2341501752",
    date: "THU, 21 MAY 2026",
    status: "BOOKED",
    trainId: "12952",
    trainName: "MMCT Tejas Raj",
    from: NDLS,
    to: BCT,
    cls: "3A",
    quota: "Tatkal",
    passengers: ["Anuj Jha", "Ravi Patoliya"],
    coach: "B3",
  },
  {
    pnr: "4472901834",
    date: "WED, 20 MAY 2026",
    status: "CANCELLED",
    trainId: "12952",
    trainName: "MMCT Tejas Raj",
    from: NDLS,
    to: BCT,
    cls: "2A",
    quota: "General",
    passengers: ["Anuj Jha"],
    coach: "A1",
  },
  {
    pnr: "5810366721",
    date: "TUE, 19 MAY 2026",
    status: "COMPLETED",
    trainId: "12908",
    trainName: "MHRST SMPRK K EX",
    from: BCT,
    to: NDLS,
    cls: "SL",
    quota: "General",
    passengers: ["Anuj Jha", "Meera Sharma"],
    coach: "S4",
  },
];

/* ------------------------------ train route ------------------------------- */

export interface RouteStop {
  code: string;
  name: string;
  arr: string;
  dep: string;
  day: number;
  halt: string;
  km: number;
  current?: boolean;
  late?: number;
}

export const ROUTE_STOPS: RouteStop[] = [
  { code: "NDLS", name: "New Delhi", arr: "--", dep: "16:55", day: 1, halt: "--", km: 0 },
  { code: "MTJ", name: "Mathura Jn", arr: "18:18", dep: "18:20", day: 1, halt: "2 min", km: 134 },
  { code: "AGC", name: "Agra Cantt", arr: "19:05", dep: "19:10", day: 1, halt: "5 min", km: 195 },
  { code: "GWL", name: "Gwalior Jn", arr: "20:45", dep: "20:47", day: 1, halt: "2 min", km: 310 },
  { code: "JHS", name: "Jhansi Jn", arr: "22:20", dep: "22:30", day: 1, halt: "10 min", km: 403 },
  { code: "BPL", name: "Bhopal Jn", arr: "01:50", dep: "02:00", day: 2, halt: "10 min", km: 702, current: true, late: 10 },
  { code: "ET", name: "Itarsi Jn", arr: "03:45", dep: "03:55", day: 2, halt: "10 min", km: 848 },
  { code: "NGP", name: "Nagpur Jn", arr: "07:10", dep: "07:20", day: 2, halt: "10 min", km: 1097 },
  { code: "BSL", name: "Bhusaval Jn", arr: "10:15", dep: "10:20", day: 2, halt: "5 min", km: 1400 },
  { code: "BRC", name: "Vadodara Jn", arr: "13:45", dep: "13:50", day: 2, halt: "5 min", km: 1691 },
  { code: "ST", name: "Surat", arr: "15:35", dep: "15:40", day: 2, halt: "5 min", km: 1823 },
  { code: "BCT", name: "Mumbai Central", arr: "18:10", dep: "--", day: 2, halt: "--", km: 2044 },
];

/* live location along route (0..1) */
export const LIVE_PROGRESS = 0.47;

export const LIVE_COORDS: [number, number][] = [
  [28.6428, 77.2191], // NDLS
  [27.4924, 77.6737], // MTJ
  [27.157, 77.9963], // AGC
  [26.2183, 78.1828], // GWL
  [25.4483, 78.5685], // JHS
  [23.2685, 77.4013], // BPL
  [22.6135, 77.7645], // ET
  [21.1535, 79.0882], // NGP
  [20.0448, 75.7873], // BSL
  [22.3072, 73.1812], // BRC
  [21.205, 72.8372], // ST
  [18.9696, 72.8195], // BCT
];

/* --------------------------------- wallet --------------------------------- */

export const WALLET_TXNS = [
  { id: "t1", title: "Ticket Booking · 12952", sub: "21 May 2026 · 3A", amt: -4820, date: "18 May 2026, 10:24" },
  { id: "t2", title: "Wallet Top-up · UPI", sub: "anuj@okhdfcbank", amt: 5000, date: "18 May 2026, 10:02" },
  { id: "t3", title: "Refund · PNR 4472901834", sub: "Cancelled ticket", amt: 2410, date: "15 May 2026, 18:40" },
  { id: "t4", title: "Ticket Booking · 12908", sub: "19 May 2026 · SL", amt: -1230, date: "12 May 2026, 09:12" },
  { id: "t5", title: "Wallet Top-up · Card", sub: "HDFC •• 4421", amt: 2000, date: "08 May 2026, 14:05" },
];

/* ---------------------------------- chat ---------------------------------- */

export const POPULAR_QUESTIONS: { q: string; a: string }[] = [
  {
    q: "How can I cancel my ticket?",
    a: "To cancel a ticket: go to My Bookings → select the PNR → tap Cancel Ticket. Cancellation charges apply as per class and time left before departure. Refunds reach the source account in 3–7 working days.",
  },
  {
    q: "What is Tatkal booking timing?",
    a: "Tatkal booking opens at 10:00 AM for AC classes (2A, 3A, CC, EC, 3E) and 11:00 AM for non-AC classes (SL, 2S), one day before the journey date (excluding the journey date itself).",
  },
  {
    q: "How do I link Aadhaar to IRCTC?",
    a: "Open My Profile → Link Aadhaar, enter your 12-digit Aadhaar, verify the OTP sent to your Aadhaar-registered mobile, and your user ID becomes Aadhaar-verified. Verified users get faster Tatkal confirmations.",
  },
  {
    q: "Where can I find my PNR status?",
    a: "Tap PNR Status on Home, enter your 10-digit PNR, and you'll see the current chart status, coach and seat details, and any waitlist predictions in real time.",
  },
  {
    q: "How is the refund calculated?",
    a: "Refund = fare paid − clerkage (₹60/₹120 per passenger) − percentage cancellation charge based on how early you cancel (25% >48h, 50% 12–48h, 75% <12h before departure).",
  },
  {
    q: "Can I change my boarding station?",
    a: "Yes — once your ticket is confirmed, you can change the boarding point once online, at least 24 hours before departure. Go to My Bookings → Change Boarding Point and pick a station after your current one.",
  },
];

/* ------------------------------- fare table ------------------------------- */

export function fareFor(trainIdx: number, classCode: string): number {
  const t = TRAINS[trainIdx];
  const c = t?.classes.find((x) => x.code === classCode) ?? t?.classes[0];
  return c?.price && c.price > 0 ? c.price : 2400;
}

/* --------------------------------- format --------------------------------- */

export const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function fmtShort(d: Date): string {
  return `${DAYS[d.getDay()]}, ${String(d.getDate()).padStart(2, "0")} ${MONTHS[d.getMonth()]}`;
}

export function fmtHeader(d: Date): string {
  const day = DAYS[d.getDay()].toUpperCase();
  return `${day}, ${String(d.getDate()).padStart(2, "0")} ${MONTHS[d.getMonth()].toUpperCase()} ${d.getFullYear()}`;
}
