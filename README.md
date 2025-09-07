# RateMyStore

## Run
- Install: pnpm install
- Dev server: pnpm dev  → http://localhost:8080
- Production: pnpm build && pnpm start

## What it does
- Authentication (login/signup) with localStorage session
- Role‑based routing
  - Admin: dashboard with stats + sortable/filterable users/stores tables
  - User: browse/search stores, submit/update rating (StarRating)
  - Owner: dashboard with their stores, averages, and ratings list
- Mock API using Express (in‑memory) available at /api
