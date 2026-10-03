/* Render the e-ticket as a PNG via canvas and trigger a download. */
import type { SeatPassenger } from "./store";
import { BOOKINGS, fmtHeader } from "./data";

export interface TicketInfo {
  pnr: string;
  trainId: string;
  trainName: string;
  date: Date;
  from: string;
  to: string;
  cls: string;
  quota: string;
  passengers: SeatPassenger[];
  fare: number;
}

export function downloadTicketPng(info: TicketInfo) {
  const W = 720;
  const H = 1000;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const NAVY = "#02026f";
  const TEXT = "#0c0d14";
  const LABEL = "#7b7d84";
  const CORAL = "#fb534a";
  const LAV = "#f5f5fa";

  // bg
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, W, H);

  // header band
  ctx.fillStyle = NAVY;
  ctx.fillRect(0, 0, W, 150);
  ctx.fillStyle = "#ffffff";
  ctx.font = "800 26px 'Plus Jakarta Sans', Arial, sans-serif";
  ctx.fillText("IRCTC Rail Connect", 36, 62);
  ctx.font = "600 15px 'Plus Jakarta Sans', Arial, sans-serif";
  ctx.fillStyle = "#c9d2ff";
  ctx.fillText("Electronic Reservation Slip", 36, 92);

  ctx.font = "800 18px 'Plus Jakarta Sans', Arial, sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "right";
  ctx.fillText(`PNR ${info.pnr}`, W - 36, 62);
  ctx.font = "600 13px 'Plus Jakarta Sans', Arial, sans-serif";
  ctx.fillStyle = "#c9d2ff";
  ctx.fillText(fmtHeader(info.date), W - 36, 92);
  ctx.textAlign = "left";

  // journey card
  let y = 190;
  ctx.fillStyle = LAV;
  roundRect(ctx, 30, y, W - 60, 130, 22);
  ctx.fill();
  ctx.fillStyle = LABEL;
  ctx.font = "700 12px 'Plus Jakarta Sans', Arial, sans-serif";
  ctx.fillText("FROM", 66, y + 38);
  ctx.fillText("TO", W - 66 - 120, y + 38);
  ctx.fillStyle = TEXT;
  ctx.font = "800 30px 'Plus Jakarta Sans', Arial, sans-serif";
  ctx.fillText(info.from, 66, y + 78);
  const tw = ctx.measureText(info.to).width;
  ctx.fillText(info.to, W - 66 - tw, y + 78);
  ctx.fillStyle = LABEL;
  ctx.font = "600 13px 'Plus Jakarta Sans', Arial, sans-serif";
  ctx.fillText("Boarding", 66, y + 102);
  // arrow
  ctx.strokeStyle = NAVY;
  ctx.lineWidth = 2.4;
  arrow(ctx, W / 2 - 26, y + 66, W / 2 + 26, y + 66);

  // train line
  y += 156;
  ctx.fillStyle = TEXT;
  ctx.font = "800 19px 'Plus Jakarta Sans', Arial, sans-serif";
  ctx.fillText(`${info.trainId} · ${info.trainName}`, 36, y);
  ctx.fillStyle = LABEL;
  ctx.font = "600 13.5px 'Plus Jakarta Sans', Arial, sans-serif";
  ctx.fillText(`Class ${info.cls}   ·   ${info.quota}   ·   ${fmtHeader(info.date)}`, 36, y + 26);

  // divider
  y += 52;
  ctx.strokeStyle = "#e3e3e9";
  ctx.lineWidth = 1.2;
  ctx.setLineDash([6, 6]);
  ctx.beginPath();
  ctx.moveTo(36, y);
  ctx.lineTo(W - 36, y);
  ctx.stroke();
  ctx.setLineDash([]);

  // passengers
  y += 34;
  ctx.fillStyle = LABEL;
  ctx.font = "700 12px 'Plus Jakarta Sans', Arial, sans-serif";
  ctx.fillText("PASSENGERS", 36, y);
  y += 14;
  info.passengers.forEach((p, i) => {
    y += 58;
    ctx.fillStyle = LAV;
    roundRect(ctx, 30, y - 34, W - 60, 48, 14);
    ctx.fill();
    ctx.fillStyle = TEXT;
    ctx.font = "700 15px 'Plus Jakarta Sans', Arial, sans-serif";
    ctx.fillText(`${i + 1}.  ${p.name}`, 52, y);
    ctx.fillStyle = LABEL;
    ctx.font = "600 12.5px 'Plus Jakarta Sans', Arial, sans-serif";
    ctx.fillText(`${p.age} yrs · ${p.gender === "M" ? "Male" : p.gender === "F" ? "Female" : "Other"}`, 52, y + 20 - 34 + 14);
    ctx.textAlign = "right";
    ctx.fillStyle = "#138844";
    ctx.font = "800 13px 'Plus Jakarta Sans', Arial, sans-serif";
    ctx.fillText("CNF", W - 52, y);
    ctx.fillStyle = LABEL;
    ctx.font = "600 12.5px 'Plus Jakarta Sans', Arial, sans-serif";
    ctx.fillText(`${p.coach}/${p.seatNo}`, W - 52, y + 18 - 34 + 14);
    ctx.textAlign = "left";
  });

  // fare row
  y += 84;
  ctx.fillStyle = LAV;
  roundRect(ctx, 30, y, W - 60, 58, 16);
  ctx.fill();
  ctx.fillStyle = LABEL;
  ctx.font = "700 13px 'Plus Jakarta Sans', Arial, sans-serif";
  ctx.fillText("TOTAL FARE PAID", 52, y + 35);
  ctx.textAlign = "right";
  ctx.fillStyle = TEXT;
  ctx.font = "800 20px 'Plus Jakarta Sans', Arial, sans-serif";
  ctx.fillText(`₹ ${info.fare.toLocaleString("en-IN")}`, W - 52, y + 36);
  ctx.textAlign = "left";

  // footer note
  ctx.fillStyle = LABEL;
  ctx.font = "500 11.5px 'Plus Jakarta Sans', Arial, sans-serif";
  ctx.fillText(
    "Carry an original photo ID during the journey. This e-ticket is valid with ID proof.",
    36,
    H - 46
  );
  ctx.fillStyle = CORAL;
  ctx.font = "800 12px 'Plus Jakarta Sans', Arial, sans-serif";
  ctx.fillText("IRCTC RAIL CONNECT", 36, H - 26);

  // export
  const url = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = url;
  a.download = `IRCTC_Ticket_${info.pnr}.png`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function arrow(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x2 - 8, y2 - 6);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x2 - 8, y2 + 6);
  ctx.stroke();
}

export function bookingToTicket(bIdx: number, passengers: SeatPassenger[], fare: number): TicketInfo {
  const b = BOOKINGS[bIdx % BOOKINGS.length];
  return {
    pnr: b.pnr,
    trainId: b.trainId,
    trainName: b.trainName,
    date: new Date(2026, 4, 21),
    from: b.from.code,
    to: b.to.code,
    cls: b.cls,
    quota: b.quota,
    passengers,
    fare,
  };
}
