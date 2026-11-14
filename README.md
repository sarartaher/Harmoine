# Hermone — frontend

Next.js 16 (App Router) + React 19 + Tailwind 4 + shadcn/ui. All content comes from a backend API.

## Setup

1. `npm install`
2. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_API_BASE_URL` to your backend URL.
3. Fill in the backend paths in `src/lib/endpoints.ts`.
4. `npm run dev` and open http://localhost:3000.

The browser fetches the backend directly, so the backend must allow this site's origin (CORS).

## Pages

| Route             | File                                    |
| ----------------- | --------------------------------------- |
| `/`               | `src/app/page.tsx`                      |
| `/events`         | `src/app/events/page.tsx`               |
| `/events/[slug]`  | `src/app/events/[slug]/page.tsx`        |
| `/account/events` | `src/app/account/events/page.tsx`       |
| `/account/joined` | `src/app/account/joined/page.tsx`       |
| `/sign-in`        | `src/app/sign-in/page.tsx`              |
| `/sign-up`        | `src/app/sign-up/page.tsx`              |

## Scripts

- `npm run dev` — dev server (Turbopack)
- `npm run build` — production build
- `npm run lint` — ESLint
- `npx tsc --noEmit` — typecheck

## Layout

- `src/app/` — routes
- `src/components/` — UI grouped by page (`home/`, `events/`, `account/`, `auth/`, `layout/`) plus `ui/` primitives
- `src/interfaces/` — all shared TypeScript types
- `src/lib/` — API helpers, endpoint paths, formatters

## Notes

- There is no auth or database yet: sign-in, sign-up, and the subscribe form are client-side demos.
- Event images come from the backend; a gradient placeholder is shown when a URL is missing.
