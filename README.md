# RateMyStore

A modern React + Vite + Tailwind app I built to demo role‑based store ratings with clean UX, axios API calls, and React Router routing. It includes an in‑memory Express API so the whole project works out of the box.

## Tech Stack
- React 18 + Vite + TypeScript
- Tailwind CSS 3
- React Router v6
- Axios
- Express (integrated with Vite) for mock API
- Vitest for tests

## Features
- Authentication (login/signup) with client‑side session (localStorage JWT‑like token)
- Role‑based routing and dashboards
  - Admin: statistics + users/stores tables (sortable/filterable)
  - User: browse/search stores, submit/update rating with an interactive StarRating
  - Store Owner: see their store list with average rating and ratings feed
- Strong client/server validations
  - Name: 20–60 chars
  - Address: ≤ 400 chars
  - Password: 8–16 chars, must include uppercase and special char
  - Email: valid format

## Quick Start
Prereqs: Node 18+, pnpm

```bash
pnpm install
pnpm dev
```
Open http://localhost:8080

Build & run production:
```bash
pnpm build
pnpm start
```

Check types & tests:
```bash
pnpm typecheck
pnpm test
```

## Seed Accounts
- Admin — admin@example.com / Admin#1234
- Owner — owner@example.com / Owner#1234
- User  — user@example.com  / User#1234

## App Routes
- / — Landing
- /login, /signup
- /dashboard — User dashboard
- /owner — Owner dashboard
- /admin — Admin dashboard

## API (Mock, In‑Memory)
Base URL: /api

Auth
- POST /auth/signup — { name, email, password, role, storeName?, storeAddress? }
- POST /auth/login — { email, password }
- GET  /me — returns decoded token payload

Stores / Ratings
- GET  /stores?q= — list/search stores with { avgRating, ratingsCount }
- POST /stores/:storeId/rate — { value, userId } upserts rating, returns { rating, avg }

Owner
- GET /owner/stats?ownerId= — { stores: [{ id, name, address, avgRating, ratings: [...] }] }

Admin
- GET /admin/stats — { totalUsers, totalStores, totalRatings }
- GET /admin/users?q=&sort=name|email|role
- GET /admin/stores?q=&sort=name|address|avgRating

Notes
- The token is a simple unsigned base64 payload for demo only. Replace with real auth for production.
- All data lives in server/data.ts and resets on restart.

## Project Structure
```
client/                # React SPA
  components/
    StarRating.tsx
    StoreCard.tsx
    Table.tsx
  pages/
    Login.tsx
    Signup.tsx
    AdminDashboard.tsx
    UserDashboard.tsx
    OwnerDashboard.tsx
  App.tsx
  global.css
server/                # Express API
  routes/
    auth.ts
    stores.ts
    admin.ts
    demo.ts
  index.ts
  data.ts              # In‑memory DB + validators
shared/
  api.ts               # Shared types
```

## Tailwind
- Design tokens in client/global.css (HSL variables)
- Config in tailwind.config.ts (content: ./client/**/*.{ts,tsx})

## Deployment
Any Node host works. For static hosting with serverless functions, use Netlify/Vercel and run the standard build:
- Build: `pnpm build`
- Start (Node): `pnpm start`

## Customizing
- Swap the mock API with your backend by updating client/lib/api.ts baseURL and replacing server/*.
- Adjust validation rules in server/data.ts → validators.
- Update branding in client/global.css (HSL vars) and header in client/App.tsx.

---
Built by me for the “RateMyStore” challenge — clean, minimal, and production‑ready foundation you can extend.
