# IRCTC Rail Connect — Run Locally

Independent concept build for the "Build What Moves India" hackathon.
Not affiliated with Indian Railways / CRIS / IRCTC. All data (trains, seats,
payments, OTP, PNR) is clearly-mocked synthetic data — no live government
systems are touched.

## Quick start

Requirements: **Node.js 20 or newer** (https://nodejs.org)

```
npm install
npm run dev
```

Then open http://localhost:3000

The app boots at the splash screen → Log in → full citizen journey
(search → seat selection → mock UPI payment → e-ticket → bookings, live
tracking, profile).

Prefer bun? `bun install && bun run dev` works too.

## Troubleshooting

- **`npm install` fails with an old Node** — upgrade to Node 20+ (`node -v` to check).
- **Stale install** — delete `node_modules` and `package-lock.json`, then `npm install` again.
- **Port 3000 busy** — `npm run dev` uses port 3000; free it or edit the `dev` script in package.json.

## What's inside

- `src/`            — full app source (Next.js App Router + React + TS + Tailwind + zustand + framer-motion)
- `public/assets/`  — exactly the 17 images the app uses
- `all-screens.png` — combined snapshot of every screen (poster)
- configs           — package.json + lockfile, next.config.ts, tailwind.config.ts, tsconfig.json, postcss.config.mjs, eslint.config.mjs

Nothing else — no build scratch files, no old-version assets.
